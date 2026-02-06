#!/bin/bash

# LumeJS Docs Update & Deploy Script
# Usage: ./update.sh
#
# 1. git pull (lumejs-docs)
# 2. npm install (의존성 변경 시)
# 3. build:to-landing (lumejs-landing/dist/docs 로 빌드)
# 4. lumejs-landing 서버 재시작

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LANDING_DIR="$(cd "$SCRIPT_DIR/../lumejs-landing" && pwd)"
LOG_FILE="$SCRIPT_DIR/logs/update.log"

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    echo "[ERROR] $1" >> "$LOG_FILE"
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
    echo "[WARN] $1" >> "$LOG_FILE"
}

# 로그 디렉토리 생성
mkdir -p "$SCRIPT_DIR/logs"

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  LumeJS Docs Update & Deploy${NC}"
echo -e "${CYAN}========================================${NC}"

# 1. Git Pull
log "Step 1/4: Pulling latest changes..."
cd "$SCRIPT_DIR"
git fetch origin
git pull origin main || error "Git pull failed"
log "Git pull completed"

# 2. Install Dependencies
log "Step 2/4: Checking dependencies..."
if git diff HEAD@{1} --name-only 2>/dev/null | grep -q "package"; then
    log "package.json changed - installing dependencies..."
    npm install || error "npm install failed"
    log "Dependencies installed"
else
    log "No dependency changes - skipping npm install"
fi

# 3. Build to Landing
log "Step 3/4: Building docs to lumejs-landing..."
if [ ! -d "$LANDING_DIR" ]; then
    error "lumejs-landing not found at: $LANDING_DIR"
fi
npm run build:to-landing || error "Build failed"
log "Build completed -> $LANDING_DIR/dist/docs"

# 4. Restart Landing Server
log "Step 4/4: Restarting lumejs-landing server..."
if [ -f "$LANDING_DIR/manage.sh" ]; then
    "$LANDING_DIR/manage.sh" restart || error "Server restart failed"
    log "Server restarted"

    # 헬스체크
    sleep 3
    if curl -s http://localhost:3021/api/health > /dev/null 2>&1; then
        log "Health check passed"
    else
        warn "Health check failed - please check server status"
    fi
else
    warn "manage.sh not found in lumejs-landing - skipping server restart"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Update & Deploy completed!${NC}"
echo -e "${GREEN}========================================${NC}"
