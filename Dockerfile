# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

# Stage 3: Production
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=4610

# xz is used by the seed-update tooling to decompress downloaded artifacts.
RUN apk add --no-cache xz

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy seed database (will be copied to volume on first run)
COPY --from=builder /app/data/selah.db /app/seed/selah.db

# Seed-update TS scripts + the library they import. Entrypoint runs the
# check (and auto-apply when SELAH_AUTO_UPDATE_SEED=1, default for Docker);
# users can also run `docker compose run --rm selah npm run seed:update`.
COPY --from=builder /app/scripts /app/scripts
COPY --from=builder /app/src/lib/seed /app/src/lib/seed
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/tsconfig.json /app/tsconfig.json

# tsx is needed at runtime to run the TS seed scripts. It's not traced by
# Next's standalone tracer because nothing in the Next app imports it.
RUN npm install --no-save --production tsx@4.21.0

# Create data and backup directories
RUN mkdir -p /app/data /app/backups && \
    chown -R nextjs:nodejs /app/data /app/backups /app/seed /app/scripts /app/src

# Copy entrypoint. Strip any CRLF that snuck in from a Windows checkout —
# Alpine's /bin/sh won't tolerate \r in the shebang.
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh && chmod +x /app/docker-entrypoint.sh

USER nextjs
EXPOSE 4610

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4610/ || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]
