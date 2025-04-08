#!/bin/sh

# Check the value of MEDUSA_MODE and start the appropriate service
if [ "$MEDUSA_MODE" = "shared" ]; then
  echo "Starting production shared instance..."
  pnpm run predeploy && pnpm run start
fi

if [ "$MEDUSA_MODE" = "server" ]; then
  echo "Starting production server instance..."
  pnpm run predeploy && pnpm run start
fi

if [ "$MEDUSA_MODE" = "worker" ]; then
  echo "Starting production worker instance..."
  pnpm run start
fi
