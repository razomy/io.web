# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:25-slim AS builder

WORKDIR /app

# 1. Install dependencies
COPY package*.json ./
RUN npm ci

# 2. Copy source code
COPY . .

# 3. Handle BUILD_TIME injection
# We accept the ARG and update/create the .env file exactly like your script
ARG BUILD_TIME
RUN if [ -f .env ]; then \
      sed -i "s/^BUILD_TIME=.*/BUILD_TIME=$BUILD_TIME/" .env; \
    else \
      echo "BUILD_TIME=$BUILD_TIME" > .env; \
    fi

# 4. Build the application (Generates .output directory)
RUN npm run build

# ==========================================
# Stage 2: Production Runner
# ==========================================
FROM node:18-slim

# The script logic implied the final image runs from the root of .output
WORKDIR /

# 1. Environment Configuration
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080
ENV PORT=8080
EXPOSE 8080

# 2. Handle Versioning
ARG NUXT_APP_VERSION
ENV NUXT_APP_VERSION=${NUXT_APP_VERSION}

# 3. Copy only the built artifacts from the builder stage
# This replicates "cd .output" from your script logic
COPY --from=builder /app/.output .

# 4. Start the app
CMD [ "node", "./server/index.mjs" ]