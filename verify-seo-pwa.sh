#!/bin/bash

# SEO & PWA Verification Script for LoisirsPrivé
# This script checks all SEO and PWA implementations

set -e

echo "🚀 LoisirsPrivé SEO & PWA Verification"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
PASSED=0
FAILED=0

check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description exists"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $description NOT FOUND: $file"
        ((FAILED++))
    fi
}

check_file_content() {
    local file=$1
    local content=$2
    local description=$3
    
    if grep -q "$content" "$file" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $description found in $file"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $description NOT found in $file"
        ((FAILED++))
    fi
}

echo "📂 Checking file structure..."
echo "----"

# Check manifest.json
check_file "public/manifest.json" "manifest.json"
if [ -f "public/manifest.json" ]; then
    check_file_content "public/manifest.json" '"name"' "Manifest name field"
    check_file_content "public/manifest.json" '"display": "standalone"' "Manifest display mode"
fi

# Check robots.txt
check_file "public/robots.txt" "robots.txt"

# Check sitemap.ts
check_file "app/sitemap.ts" "sitemap.ts (dynamic)"

# Check StructuredData component
check_file "components/StructuredData.tsx" "StructuredData component"

# Check updated layout
check_file_content "app/layout.tsx" "metadataBase:" "Metadata base in layout.tsx"
check_file_content "app/layout.tsx" "openGraph:" "OpenGraph config in layout.tsx"
check_file_content "app/layout.tsx" 'twitter:' "Twitter cards in layout.tsx"

# Check homepage integration
check_file_content "app/page.tsx" "StructuredData" "StructuredData in homepage"
check_file_content "app/page.tsx" "organizationSchema" "Organization schema in homepage"

# Check auction detail integration
check_file_content "app/auctions/[id]/page.tsx" "StructuredData" "StructuredData in auction detail"
check_file_content "app/auctions/[id]/page.tsx" "auctionSchema" "Auction schema in detail page"

# Check vercel.json
check_file "vercel.json" "vercel.json (headers & redirects)"
if [ -f "vercel.json" ]; then
    check_file_content "vercel.json" '"headers"' "Security headers in vercel.json"
    check_file_content "vercel.json" '"X-Content-Type-Options"' "X-Content-Type-Options header"
fi

# Check environment example
check_file ".env.example" ".env.example (environment template)"

echo ""
echo "📱 Checking asset files..."
echo "----"

# Check app icons
check_file "public/icon-192.png" "App icon 192x192"
check_file "public/icon-192-maskable.png" "Maskable icon 192x192"
check_file "public/icon-512.png" "App icon 512x512"
check_file "public/icon-512-maskable.png" "Maskable icon 512x512"

# Check other icons
check_file "public/favicon.ico" "Favicon"
check_file "public/apple-touch-icon.png" "Apple Touch Icon"

# Check OG images
check_file "public/og-image.png" "OpenGraph main image (1200x630)"
check_file "public/og-image-square.png" "OpenGraph square image (800x800)"

# Check screenshots
check_file "public/screenshot-mobile.png" "App screenshot (mobile, 540x720)"
check_file "public/screenshot-desktop.png" "App screenshot (desktop, 1280x720)"

echo ""
echo "📚 Checking documentation..."
echo "----"

check_file "SEO_PWA_GUIDE.md" "SEO & PWA implementation guide"
check_file "ASSETS_GUIDE.md" "Assets creation guide"

echo ""
echo "======================================"
echo -e "Results: ${GREEN}${PASSED} passed${NC}, ${RED}${FAILED} failed${NC}"
echo "======================================"

if [ $FAILED -gt 0 ]; then
    echo ""
    echo "❌ Some checks failed. Please review the output above."
    echo ""
    echo "Missing assets? Follow the ASSETS_GUIDE.md for creation instructions."
    exit 1
else
    echo ""
    echo -e "${GREEN}✨ All checks passed! SEO & PWA setup is complete.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. npm run build"
    echo "2. npm run dev (test locally)"
    echo "3. Deploy to production"
    echo "4. Submit sitemap to Google Search Console"
    echo "5. Test PWA installation on mobile"
    echo ""
    exit 0
fi
