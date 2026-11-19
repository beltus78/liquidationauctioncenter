#!/bin/bash
# Liquidation Auction Center — publish the latest code:  bash ~/websites/liquidationauctioncenter/deploy.sh
set -euo pipefail
cd "$(dirname "$0")"
export PATH="$PWD/.node/bin:$PATH"
npm install --no-audit --no-fund >/dev/null
npx wrangler d1 migrations apply liquidationauctioncenter --remote
npx wrangler deploy
echo "Done. Open https://liquidationauctioncenter.com"
