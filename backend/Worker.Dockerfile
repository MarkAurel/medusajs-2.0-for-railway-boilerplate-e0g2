# Use Node.js base image
FROM node:20-alpine
LABEL authors="clait"

# Install dependencies only once
RUN apk add --no-cache curl && corepack enable

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files first to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Medusa application
RUN pnpm run build

# Install Medusa dependencies
WORKDIR /usr/src/app/.medusa/server
RUN pnpm install

# Expose the default Medusa API port
EXPOSE 9000

# Command to run in production
CMD ["sh", "-c", "pnpm run start"]