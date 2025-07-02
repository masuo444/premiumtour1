# FOMUS Site Generator

> 静的サイトをワンコマンドで作成・公開する自動化ツール

## 🚀 クイックスタート

```bash
# 新しいサイトを作成
./create-fomus-site ai-consulting ai-consulting.fomus.jp

# カスタムテンプレートで作成
./create-fomus-site new-product product.fomus.jp product
```

**たったこれだけで、15分後には `https://ai-consulting.fomus.jp` でサイトが公開されます！**

## ✨ 特徴

- 🏃‍♂️ **ワンコマンド実行** - 複雑な設定は不要
- 🌐 **自動GitHub Pages配信** - SSL対応の高速サイト
- 📱 **レスポンシブデザイン** - モバイル完全対応
- 🎨 **カスタマイズ可能** - 色・ロゴ・コンテンツを簡単変更
- 🔄 **自動デプロイ** - Gitプッシュで即座に反映
- 📈 **SEO最適化** - メタタグ・サイトマップ自動生成

## 📋 必要な準備

### 1. 依存関係のインストール
```bash
# Node.js (v14以上)
brew install node

# GitHub CLI
brew install gh

# Git (通常は既にインストール済み)
git --version
```

### 2. GitHub認証
```bash
# GitHub CLIにログイン
gh auth login

# Personal Access Tokenを設定 (オプション)
export GITHUB_TOKEN=your_token_here
```

### 3. DNS設定権限
- XサーバーのDNS管理画面へのアクセス権限

## 🎯 使用方法

### 基本的な使用法

```bash
# サイト作成の基本形
./create-fomus-site <サイト名> <ドメイン> [テンプレート]
```

**パラメータ説明:**
- `サイト名`: プロジェクト名（英数字、ハイフンのみ）
- `ドメイン`: 完全なドメイン名（必ず `.fomus.jp` で終わる）
- `テンプレート`: (省略可) `landing`/`corporate`/`product`

### 実例

```bash
# AIコンサルティングサービスサイト
./create-fomus-site ai-consulting ai-consulting.fomus.jp

# 新商品紹介サイト
./create-fomus-site new-product product.fomus.jp product

# 企業サイト
./create-fomus-site company-profile company.fomus.jp corporate
```

## 🏗️ 生成されるサイト構造

```
your-site/
├── index.html          # メインページ
├── css/
│   └── style.css       # スタイルシート
├── js/
│   └── script.js       # JavaScript
├── config/
│   └── site-config.json # サイト設定
├── CNAME               # GitHub Pages用ドメイン設定
└── README.md           # サイト固有のREADME
```

## ⚙️ 自動化される作業

1. **テンプレート生成** - 設定ファイルベースでHTML/CSS生成
2. **Gitリポジトリ初期化** - `.git`ディレクトリ作成、初回コミット
3. **GitHubリポジトリ作成** - パブリックリポジトリとして自動作成
4. **GitHub Pages設定** - カスタムドメイン含む完全設定
5. **CNAME設定** - DNS連携用ファイル自動配置

## 🎨 カスタマイズ

### 設定ファイルでのカスタマイズ

生成後、`config/site-config.json` を編集してサイトをカスタマイズ：

```json
{
  "branding": {
    "logo_text": "Your Site Name",
    "primary_color": "#0ABAB5",
    "secondary_color": "#0A0A0A"
  },
  "hero": {
    "title_main": "カスタムタイトル",
    "subtitle": "カスタムサブタイトル"
  }
}
```

### Claude Codeでの修正

```bash
# 例: ヘッダーの色を青に変更
# Claude Code: "ヘッダーの背景色を青(#0066CC)に変更して"

git add .
git commit -m "ヘッダー色を青に変更"
git push
# → 1-2分後に自動反映
```

## 🌐 DNS設定手順

サイト作成後、以下のDNS設定が必要です：

### Xサーバーでの設定

1. Xサーバーパネルにログイン
2. 「DNS設定」を選択
3. `fomus.jp` ドメインを選択
4. 「DNSレコード追加」で以下を設定：

```
名前: ai-consulting (サイト名)
タイプ: CNAME
値: masuo444.github.io
TTL: 3600
```

5. 設定保存後、15-60分で反映

## 🔄 日常の更新フロー

```bash
# 1. ファイルを編集 (VS Code、Claude Code等)
echo "新しいコンテンツ" >> index.html

# 2. 変更をコミット
git add .
git commit -m "コンテンツ更新"

# 3. GitHubにプッシュ
git push

# 4. 1-2分後に本番サイトに自動反映 🎉
```

## 📁 利用可能テンプレート

### Landing Page (default)
- **用途**: サービス紹介、LP
- **特徴**: CTA重視、コンバージョン最適化
- **例**: `./create-fomus-site service service.fomus.jp landing`

### Corporate 
- **用途**: 企業サイト、会社紹介
- **特徴**: 信頼性重視、企業情報充実
- **例**: `./create-fomus-site company company.fomus.jp corporate`

### Product
- **用途**: 製品・アプリ紹介
- **特徴**: 機能説明、スクリーンショット重視
- **例**: `./create-fomus-site app-name app.fomus.jp product`

## 🚨 トラブルシューティング

### よくある問題

**Q: GitHubリポジトリ作成に失敗する**
```bash
# GitHub CLIの認証確認
gh auth status

# 再認証
gh auth login
```

**Q: サイトが表示されない**
1. DNS設定を確認（15-60分の反映時間が必要）
2. GitHub Pages設定を確認
3. HTTPS強制が有効か確認

**Q: スクリプト実行権限エラー**
```bash
chmod +x create-fomus-site
```

### デバッグモード

```bash
# 詳細ログ付きで実行
DEBUG=1 ./create-fomus-site site-name domain.fomus.jp
```

## 🛠️ 開発者向け情報

### アーキテクチャ

```
FOMUS Site Generator
├── create-fomus-site           # メインスクリプト
├── scripts/
│   ├── template-processor.js   # テンプレート処理
│   ├── github-setup.js         # GitHub自動化
│   └── create-site.sh          # レガシースクリプト
└── config/
    ├── site-config.json        # 現在の設定
    └── site-config.template.json # テンプレート設定
```

### 新しいテンプレート追加

1. `templates/` ディレクトリに新テンプレート作成
2. `template-processor.js` にテンプレート処理ロジック追加
3. `create-fomus-site` スクリプトにテンプレートオプション追加

### カスタマイズ例

```javascript
// scripts/template-processor.js の拡張例
class CustomTemplateProcessor extends TemplateProcessor {
    generateCustomSection() {
        // カスタムセクション生成ロジック
    }
}
```

## 📊 パフォーマンス

- **生成時間**: 30秒〜2分
- **デプロイ時間**: 1-2分（GitHub Pages）
- **DNS反映時間**: 15-60分（初回のみ）
- **更新反映時間**: 1-2分

## 🎉 成功事例

現在 **premium-tourism.fomus.jp** で実運用中：
- 自動デプロイ: ✅
- レスポンシブ対応: ✅  
- SEO最適化: ✅
- 高速配信: ✅

## 🤝 サポート

問題が発生した場合：

1. このREADMEのトラブルシューティングを確認
2. GitHubリポジトリのIssuesで報告
3. Claude Codeでの修正サポート利用

---

**🚀 FOMUS Site Generator で、あなたのアイデアを瞬時にWebに！**