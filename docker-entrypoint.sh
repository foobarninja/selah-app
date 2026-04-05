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

exec node server.js
