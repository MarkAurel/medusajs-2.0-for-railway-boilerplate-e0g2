#!/bin/sh

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# Ensure we're in the correct directory
cd /usr/src/app/.medusa/server || {
  echo "Error: Failed to change to Medusa server directory"
  exit 1
}

# Function to start the service
start_service() {
  local mode=$1
  echo "Starting production ${mode} instance..."
  
  if [ "$mode" = "worker" ]; then
    # Override the start script to avoid directory change
    MEDUSA_WORKER=1 node ./dist/main.js
  else
    # For server/shared mode, run predeploy first
    pnpm run predeploy
    MEDUSA_SERVER=1 node ./dist/main.js
  fi
}

# Check the value of MEDUSA_MODE and start the appropriate service
case "$MEDUSA_MODE" in
  "shared"|"server")
    start_service "$MEDUSA_MODE"
    ;;
  "worker")
    start_service "worker"
    ;;
  *)
    echo "Error: MEDUSA_MODE must be set to either 'shared', 'server', or 'worker'"
    exit 1
    ;;
esac