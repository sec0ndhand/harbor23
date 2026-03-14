# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Only install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the compiled output from the build stage
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node_modules/.bin/react-router-serve", "./build/server/index.js"]
