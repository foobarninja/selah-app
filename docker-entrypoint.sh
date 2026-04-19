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

# Non-blocking check for a newer seed on Hugging Face. Log-only;
# applying updates happens via `docker compose run --rm selah ...`
# or from outside the container. Failures are swallowed.
if [ -f /app/scripts/ops/docker-check-seed.cjs ]; then
  node /app/scripts/ops/docker-check-seed.cjs || true
fi

exec node server.js
