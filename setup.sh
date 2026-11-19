#!/bin/bash
# Liquidation Auction Center — one-time setup and first publish on Cloudflare.
# Run from Terminal:  bash ~/websites/liquidationauctioncenter/setup.sh
set -euo pipefail
cd "$(dirname "$0")"
bold() { printf "\n\033[1m%s\033[0m\n" "$1"; }
export PATH="$PWD/.node/bin:$PATH"
if ! command -v node >/dev/null 2>&1 || [ "$(node -p 'parseInt(process.versions.node)')" -lt 20 ]; then
  case "$(uname -m)" in arm64) arch=arm64 ;; *) arch=x64 ;; esac
  base="https://nodejs.org/dist/latest-v22.x"
  file=$(curl -fsSL "$base/SHASUMS256.txt" | awk -v a="darwin-$arch.tar.gz" '$2 ~ a {print $2}')
  sum=$(curl -fsSL "$base/SHASUMS256.txt" | awk -v a="darwin-$arch.tar.gz" '$2 ~ a {print $1}')
  echo "Downloading $file (about 45 MB)…"
  curl -fL --progress-bar "$base/$file" -o /tmp/lac-node.tar.gz
  echo "$sum  /tmp/lac-node.tar.gz" | shasum -a 256 -c - >/dev/null || { echo "Download check failed. Run the script again."; exit 1; }
  rm -rf .node && mkdir .node && tar -xzf /tmp/lac-node.tar.gz -C .node --strip-components 1 && rm /tmp/lac-node.tar.gz
fi
echo "Node $(node -v)"

bold "1/5  Installing packages"
npm install --no-audit --no-fund

bold "2/5  Signing in to Cloudflare"
if npx wrangler whoami 2>/dev/null | grep -q "You are logged in"; then echo "Already signed in."; else npx wrangler login; fi

bold "3/5  Creating the database"
if grep -q REPLACE_WITH_DATABASE_ID wrangler.jsonc; then
  out=$(npx wrangler d1 create liquidationauctioncenter 2>&1 || true)
  id=$(printf "%s" "$out" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -1)
  if [ -z "$id" ]; then id=$(npx wrangler d1 list --json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const d=JSON.parse(s).find(x=>x.name==="liquidationauctioncenter");console.log(d?d.uuid:"")})'); fi
  [ -n "$id" ] || { echo "$out"; echo "Could not create the database."; exit 1; }
  sed -i '' "s/REPLACE_WITH_DATABASE_ID/$id/" wrangler.jsonc
  echo "  ✓ Database created ($id)"
fi
npx wrangler d1 migrations apply liquidationauctioncenter --remote

bold "4/5  Publishing the site"
npx wrangler deploy

bold "5/5  Email key (Resend)"
read -r -s -p "Resend API key (Enter to skip for now): " key; echo
if [ -n "$key" ]; then printf "%s" "$key" | npx wrangler secret put RESEND_API_KEY >/dev/null && echo "  ✓ saved"; else echo "  – skipped (orders are still saved in the database)"; fi

bold "Done — open the workers.dev address printed in step 4. Next: README.md → 'Connect the domain'."
