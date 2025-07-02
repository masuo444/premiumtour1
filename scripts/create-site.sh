#!/bin/bash

# FOMUS Site Generator
# 新しい静的サイトを自動生成・GitHub公開するスクリプト

set -e

# デフォルト値
TEMPLATE_TYPE="landing"
GITHUB_USERNAME="masuo444"
BASE_DIR=$(dirname "$0")/../

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ヘルプ表示
show_help() {
    echo "FOMUS Site Generator"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -n, --name SITE_NAME          サイト名 (例: ai-consulting)"
    echo "  -d, --domain DOMAIN            ドメイン (例: ai-consulting.fomus.jp)"
    echo "  -t, --template TEMPLATE        テンプレート (landing/corporate/product)"
    echo "  -u, --username USERNAME        GitHubユーザー名"
    echo "  -h, --help                     このヘルプを表示"
    echo ""
    echo "Example:"
    echo "  $0 --name ai-consulting --domain ai-consulting.fomus.jp --template landing"
}

# ログ関数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# 引数解析
while [[ $# -gt 0 ]]; do
    case $1 in
        -n|--name)
            SITE_NAME="$2"
            shift 2
            ;;
        -d|--domain)
            DOMAIN="$2"
            shift 2
            ;;
        -t|--template)
            TEMPLATE_TYPE="$2"
            shift 2
            ;;
        -u|--username)
            GITHUB_USERNAME="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# 必須パラメータチェック
if [[ -z "$SITE_NAME" || -z "$DOMAIN" ]]; then
    log_error "サイト名とドメインは必須です"
    show_help
    exit 1
fi

# 対話式入力
if [[ -z "$SITE_NAME" ]]; then
    read -p "サイト名を入力してください: " SITE_NAME
fi

if [[ -z "$DOMAIN" ]]; then
    read -p "ドメインを入力してください (例: service.fomus.jp): " DOMAIN
fi

# 変数設定
REPO_NAME="${SITE_NAME}-site"
SITE_DIR="/tmp/${REPO_NAME}"
SITE_TITLE="${SITE_NAME} - FOMUS"

log_info "サイト生成を開始します..."
log_info "サイト名: $SITE_NAME"
log_info "ドメイン: $DOMAIN"
log_info "テンプレート: $TEMPLATE_TYPE"
log_info "リポジトリ名: $REPO_NAME"

# 1. 一時ディレクトリ作成
log_info "一時ディレクトリを作成中..."
rm -rf "$SITE_DIR"
mkdir -p "$SITE_DIR"

# 2. テンプレートファイルをコピー
log_info "テンプレートファイルをコピー中..."
cp -r "${BASE_DIR}"* "$SITE_DIR/" 2>/dev/null || true
rm -rf "$SITE_DIR/.git"

# 3. 設定ファイル生成
log_info "設定ファイルを生成中..."
cat > "$SITE_DIR/config/site-config.json" << EOF
{
  "site": {
    "name": "$SITE_NAME",
    "title": "$SITE_TITLE",
    "description": "${SITE_NAME}のサービスサイト",
    "domain": "$DOMAIN",
    "template": "$TEMPLATE_TYPE"
  },
  "branding": {
    "logo_text": "$SITE_NAME",
    "tagline": "FOMUS Service",
    "primary_color": "#0ABAB5",
    "secondary_color": "#0A0A0A",
    "accent_color": "#40E0D0"
  },
  "hero": {
    "badge": "🚀 ${SITE_NAME}サービス",
    "title_main": "革新的なソリューションで、",
    "title_highlight": "ビジネスを次のレベルへ",
    "subtitle": "✨ 最新テクノロジーでお客様の課題を解決します",
    "cta_primary": "無料相談を予約",
    "cta_secondary": "詳細を見る"
  },
  "contact": {
    "email": "info@fomus.jp",
    "phone": "03-1234-5678"
  },
  "company": {
    "name": "FOMUS",
    "full_name": "合同会社FOMUS"
  }
}
EOF

# 4. CNAMEファイル作成
log_info "CNAMEファイルを作成中..."
echo "$DOMAIN" > "$SITE_DIR/CNAME"

# 5. package.jsonを更新
log_info "package.jsonを更新中..."
if [[ -f "$SITE_DIR/package.json" ]]; then
    sed -i.bak "s/\"name\": \".*\"/\"name\": \"$REPO_NAME\"/" "$SITE_DIR/package.json"
    rm -f "$SITE_DIR/package.json.bak"
fi

# 6. HTMLファイルの基本置換
log_info "HTMLファイルを更新中..."
find "$SITE_DIR" -name "*.html" -exec sed -i.bak "s/Premium Sake Tourism/$SITE_NAME/g" {} \;
find "$SITE_DIR" -name "*.html" -exec sed -i.bak "s/premium-tourism.fomus.jp/$DOMAIN/g" {} \;
find "$SITE_DIR" -name "*.bak" -delete

# 7. Git初期化
log_info "Gitリポジトリを初期化中..."
cd "$SITE_DIR"
git init
git add .
git commit -m "Initial commit: $SITE_NAME site

Generated using FOMUS Site Generator
- Template: $TEMPLATE_TYPE  
- Domain: $DOMAIN
- Auto-generated static site with GitHub Pages integration

🤖 Generated with FOMUS Site Generator"

# 8. GitHubリポジトリ作成
log_info "GitHubリポジトリを作成中..."
if command -v gh &> /dev/null; then
    gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
    log_success "GitHubリポジトリが作成されました: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
else
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    git branch -M main
    log_warning "GitHub CLIがインストールされていません"
    log_info "手動でリポジトリを作成してから以下のコマンドを実行してください:"
    echo "cd $SITE_DIR && git push -u origin main"
fi

# 9. 完了メッセージ
log_success "サイト生成が完了しました!"
echo ""
echo "📁 サイトディレクトリ: $SITE_DIR"
echo "🌐 ドメイン: https://$DOMAIN"
echo "📱 GitHub: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "次のステップ:"
echo "1. Xサーバーで DNS CNAME レコードを設定"
echo "   名前: $(echo $DOMAIN | cut -d. -f1)"
echo "   値: $GITHUB_USERNAME.github.io"
echo ""
echo "2. GitHub Pages設定 (自動で設定されます)"
echo ""
echo "3. 15分後に https://$DOMAIN でアクセス可能になります"

# クリーンアップオプション
read -p "一時ディレクトリを削除しますか? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$SITE_DIR"
    log_info "一時ディレクトリを削除しました"
fi

log_success "FOMUS Site Generator完了!"