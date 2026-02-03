#!/usr/bin/env bash
set -euo pipefail

PORT=${1:-3000}
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to run the Docusaurus dev server."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

URL="http://localhost:${PORT}/"

echo "Starting Docusaurus dev server at $URL"

# Prevent Docusaurus from opening a browser on its own.
BROWSER=none npm run start -- --port "$PORT" &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

if command -v curl >/dev/null 2>&1; then
  for _ in {1..40}; do
    if curl -fsS "$URL" >/dev/null 2>&1; then
      break
    fi
    sleep 0.25
  done
else
  # Fallback wait when curl is not available.
  sleep 2
fi

if command -v open >/dev/null 2>&1; then
  open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL"
else
  echo "Open this URL in your browser: $URL"
fi

wait "$SERVER_PID"
