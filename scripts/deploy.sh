#!/usr/bin/env bash
# Deploy todo: the EliteDesk clone at ~/todo pulls main from GitHub,
# restarts the todo service, and must pass the health gate.
set -euo pipefail

# The runner is a system service with no login session: systemctl --user
# needs the runtime dir pointed out explicitly (linger keeps it alive).
export XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/run/user/$(id -u)}"

APP_DIR=/home/ab/todo
SERVICE=todo
HEALTH_URL=http://127.0.0.1:8082/

cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main
systemctl --user restart "$SERVICE"

for i in $(seq 1 15); do
  if curl -sf "$HEALTH_URL" | grep -qi '<title>Todo</title>'; then
    echo "deploy OK: $(git log -1 --oneline)"
    exit 0
  fi
  sleep 2
done
echo "deploy FAILED health check: $SERVICE" >&2
systemctl --user status "$SERVICE" --no-pager | tail -20 >&2
exit 1
