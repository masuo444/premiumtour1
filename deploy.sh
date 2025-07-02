#!/usr/bin/env bash
# deploy.sh - Claude Code生成ファイルをGitHub Pagesに自動デプロイ

set -e

# 設定値読み込み（環境変数または.envファイルから）
if [ -f ".env" ]; then
    source .env
fi

# 必須環境変数のチェック
if [ -z "$GH_USER" ] || [ -z "$REPO" ] || [ -z "$GHTOKEN" ]; then
    echo "❌ 必須環境変数が設定されていません"
    echo "   GH_USER, REPO, GHTOKEN を設定してください"
    echo "   例: export GH_USER=your-username"
    echo "   または .env ファイルを作成してください"
    exit 1
fi

# デプロイディレクトリ（デフォルト: dist）
DEPLOY_DIR="${DEPLOY_DIR:-dist}"

echo "🚀 GitHub Pages自動デプロイ開始..."
echo "   ユーザー: $GH_USER"
echo "   リポジトリ: $REPO"
echo "   デプロイディレクトリ: $DEPLOY_DIR"

# デプロイディレクトリの存在確認
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "❌ デプロイディレクトリ '$DEPLOY_DIR' が見つかりません"
    echo "   Claude Codeで生成したファイルを $DEPLOY_DIR に配置してください"
    exit 1
fi

# デプロイディレクトリに移動
cd "$DEPLOY_DIR"

# Gitリポジトリの初期化（初回のみ）
if [ ! -d ".git" ]; then
    echo "📦 Gitリポジトリを初期化中..."
    git init
    git branch -M main
    git remote add origin "https://${GH_USER}:${GHTOKEN}@github.com/${GH_USER}/${REPO}.git"
fi

# ファイルをステージング
echo "📝 変更をステージング中..."
git add -A

# コミットメッセージ生成
COMMIT_MSG="auto: deploy $(date '+%Y-%m-%d_%H:%M') 🤖"

# コミット（変更がない場合はスキップ）
if git diff --cached --quiet; then
    echo "⚠️  変更がないため、デプロイをスキップします"
    exit 0
fi

echo "💾 コミット作成中..."
git commit -m "$COMMIT_MSG"

# GitHub にプッシュ
echo "⬆️  GitHub にプッシュ中..."
git push -u origin main

# 成功メッセージ
echo ""
echo "✅ デプロイ完了！"
echo "🌐 GitHub Pages URL: https://${GH_USER}.github.io/${REPO}/"
echo "📱 数分後に反映されます"