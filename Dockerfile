# Use this Dockerfile with Koyeb
FROM oven/bun:1.2 as builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1.2-slim

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Install only production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["bun", "dist/http.js"] 