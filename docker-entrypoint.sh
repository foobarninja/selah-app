#!/bin/sh
set -e

# Copy seed database to volume on first run
if [ ! -f /app/data/selah.db ]; then
  echo "First run — copying seed database to volume..."
  cp /app/seed/selah.db /app/data/selah.db
  echo "Database ready."
fi

# Ensure backups directory exists
mkdir -p /app/backups

# Default auto-update ON for Docker deployments. Operators can pin the
# seed by setting SELAH_AUTO_UPDATE_SEED=0 in their compose env.
# The check+apply pipeline is fail-open: any network/download/merge
# failure logs the error and proceeds to boot on the existing DB.
export SELAH_AUTO_UPDATE_SEED="${SELAH_AUTO_UPDATE_SEED:-1}"

if [ -f /app/scripts/ops/check-app-update.ts ]; then
  /app/node_modules/.bin/tsx /app/scripts/ops/check-app-update.ts || true
fi

if [ -f /app/scripts/ops/check-seed-update.ts ]; then
  echo "[entrypoint] checking seed status (auto-apply: $SELAH_AUTO_UPDATE_SEED)"
  /app/node_modules/.bin/tsx /app/scripts/ops/check-seed-update.ts || \
    echo "[entrypoint] seed check/apply failed; booting on current DB"
fi

# If the caller passed a command (e.g. `docker compose run --rm selah npm run
# seed:update`), exec that. Otherwise start the Next server as the default.
if [ $# -gt 0 ]; then
  exec "$@"
fi
exec node server.js
