# Release process

How to cut a new Selah release: scrub the DB, publish the seed to
Hugging Face, bump the version, tag, and let CI ship the Docker image.

**Order matters.** The seed MUST be on Hugging Face *before* the git
tag is pushed. The image-build workflow fetches the current HF
manifest during build; if the tag fires before the seed is published,
the image ships with the old seed.

## Prereqs

- `HF_TOKEN=hf_...` in `.env` at the repo root (scope: **write** to
  `foooobear/selah-db`). `npm run seed:publish` reads this via dotenv.
- Clean working tree on `master`. All feature branches merged, tests
  passing, tsc clean.
- `data/selah.db` in the state you want to ship — any new pre-baked
  content (devotionals, commentary, theme tags) already applied.

## Steps

### 1. Verify tests and typecheck

```bash
npm test
npx tsc --noEmit
```

Both must be clean. If the change touches the DB schema, also run
the migration against `data/selah.db` locally first so the scrub
step sees the new columns:

```bash
npx tsx scripts/etl/add-<feature>-schema.ts
npx prisma generate
```

### 2. Scrub the DB

```bash
npm run seed:scrub
```

Produces `data/selah-seed-src.db` with every user-local table wiped
(profiles, API keys, conversations, notes, reading history, etc.).
The original `data/selah.db` is untouched. Check the console output —
every table that had rows in your dev DB should report "wiped N
row(s)".

### 3. Prepare the seed artifact

```bash
npm run seed:prepare
```

This reads from the scrubbed copy (`selah-seed-src.db` — auto-detected),
VACUUMs, runs the additive-only preflight, xz-compresses, and writes
`data/manifest.json`. Expect a ~70 MB `.xz` for a ~450 MB raw seed.

Copy the just-prepared raw DB to `data/selah-seed-prev.db` **before**
the next release — the additive-only preflight uses it to catch
accidental column removals in the next cycle:

```bash
cp data/selah-seed.db data/selah-seed-prev.db
```

### 4. Publish the seed to Hugging Face

```bash
npm run seed:publish
```

Uploads both files in a single commit to `foooobear/selah-db`. This
step can take several minutes for large seeds.

**If it fails with `UND_ERR_HEADERS_TIMEOUT` or similar** (HF's xet
chunked upload occasionally stalls), fall back to the git-LFS path:

```bash
TOKEN=$(grep '^HF_TOKEN=' .env | cut -d= -f2 | tr -d '\r\n')
cd /tmp && rm -rf hf-publish && mkdir hf-publish && cd hf-publish
GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 \
  "https://USER:${TOKEN}@huggingface.co/datasets/foooobear/selah-db" repo
cd repo
cp /c/dev/selah-app/data/selah-seed.db.xz .
cp /c/dev/selah-app/data/manifest.json .
git lfs install
git lfs track "*.xz" >/dev/null
git add .gitattributes manifest.json selah-seed.db.xz
git -c user.email=release@selah.local -c user.name=selah-release \
    commit -m "Publish seed <YYYY.MM.DD> (schema v<N>)"
git push
```

Verify the upload:

```bash
curl -sL https://huggingface.co/datasets/foooobear/selah-db/resolve/main/manifest.json
```

The returned `sha256` must match `data/manifest.json`'s sha exactly.

### 5. Bump app version

Edit `package.json`:

```diff
-  "version": "0.3.0",
+  "version": "0.3.1",
```

If the release includes DB schema changes that new app code relies on,
also bump `APP_SCHEMA_VERSION` and `APP_MIN_SEED_SCHEMA` (to the same
number) in `src/lib/seed/manifest.ts`. This makes the new app refuse
to boot against a pre-update pinned seed instead of crashing with
Prisma column-not-found at first use.

### 6. Commit and tag

```bash
git add package.json src/lib/seed/manifest.ts
git commit -m "chore(release): X.Y.Z — <short summary>"
git tag vX.Y.Z
git push origin master
git push origin vX.Y.Z
```

The tag must match `package.json` exactly — the workflow fails the
build otherwise (intentional guard).

### 7. Watch the image build

```bash
gh run watch --exit-status
```

The `publish-image.yml` workflow:

1. Fetches the HF manifest to key the seed cache (so new releases
   automatically invalidate — no manual cache-key bump needed)
2. Downloads + verifies the seed sha
3. Runs tests
4. Builds multi-arch (`linux/amd64`, `linux/arm64`)
5. Pushes to `ghcr.io/foobarninja/selah-app` with tags:
   - Versioned release (on `v*.*.*` tag): `:X.Y.Z`, `:X.Y`, `:latest`,
     `:sha-<short>` (the `:X` major tag is guarded off while on 0.x)
   - Master push (no tag): `:dev`, `:sha-<short>`

## Post-release sanity check

Pull the published image on a clean host and boot. Confirm:

- Container entrypoint copies the seed on first run
- App starts and serves `/`
- `/settings` loads without Prisma errors (this is the canary for
  schema / seed version mismatches)

## What can go wrong

**Force-pushing a tag.** Don't. If the workflow fails, cut a patch
release (`vX.Y.(Z+1)`) instead of rewriting the original tag. Tags
are cheap; tag rewrites confuse anyone who consumed the old ref.

**Forgetting to scrub.** The warning in `seed:prepare` catches this
when it falls back to the raw dev DB — heed it. If you've already
published an unscrubbed seed, rotate ALL API keys that were in
`app_settings`, delete the dataset commit from HF, and republish.

**Seed published but tag never fired.** Harmless. The seed on HF
waits for the next release's workflow to pick it up.

**Tag fired but seed wasn't published yet.** Cancel the workflow run
from the GitHub Actions UI before the Docker push step completes.
Then publish the seed, cut a new patch tag, and let that one run.

**Headers-timeout during publish.** See the git-LFS fallback in
step 4. Root cause is undici's default 300 s headers timeout; the
publish script already uses a 15 min custom dispatcher, but HF's xet
endpoint can still stall beyond that on a slow link.
