# Releasing Selah

Published images live at `ghcr.io/foobarninja/selah-app`. Tagged releases
are built by `.github/workflows/publish-image.yml` and pushed multi-arch
(linux/amd64, linux/arm64).

## App release

1. Bump `package.json` version.
2. Update `README.md` changelog entry if you keep one.
3. Commit: `chore(release): bump to vX.Y.Z`.
4. Tag: `git tag vX.Y.Z` — **the tag must match package.json** (CI refuses
   to publish otherwise).
5. Push both: `git push && git push --tags`.
6. Watch the workflow. On success: `:X.Y.Z`, `:X.Y`, `:X` (non-0 majors),
   `:latest`, and `:sha-<short>` all land on ghcr.io.

End users get the new version on their next `docker compose pull`.

## Seed release

Seed and app version independently. See README → "Updating the Content
Database" for the user-facing flow. Maintainer flow:

1. Run the ETL / authoring work that changed `data/selah.db`.
2. `npm run seed:prepare` → writes `data/selah-seed.db.xz` and
   `data/manifest.json`. Also runs the additive-only preflight against
   `data/selah-seed-prev.db` if present.
3. `HF_TOKEN=hf_xxx npm run seed:publish` → uploads both artifacts in
   a single commit (atomic on HF's side — users can never see a
   manifest referencing a stale `.xz`). Uses the `@huggingface/hub` JS
   SDK so no Python / `huggingface-cli` is required. Get a write-scoped
   token at <https://huggingface.co/settings/tokens>.
4. Copy the new seed over the preflight baseline:
   `cp data/selah-seed.db data/selah-seed-prev.db`.

## Combined release (schema-breaking change)

When the DB schema changes in a way the app code depends on:

1. Bump `APP_SCHEMA_VERSION` **and** `APP_MIN_SEED_SCHEMA` in
   `src/lib/seed/manifest.ts` to the same new number.
2. Release the seed first (so the manifest's `schemaVersion` exists).
3. Release the app.

Order matters: if the app ships first, users on the old seed see the
"[seed-check] WARNING: local seed schemaVersion N is below this app's
minimum (N+1)" log and the auto-apply fetches the new seed.
