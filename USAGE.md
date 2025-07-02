# FOMUS Site Generator - 使用方法

## 🚀 グローバルコマンドの使用

### インストール完了！

グローバルコマンド `fomus-create` がインストールされました。  
**どのディレクトリからでも使用可能です。**

## 📋 基本的な使用方法

### 1. 基本コマンド
```bash
fomus-create <サイト名> <ドメイン>
```

### 2. 使用例

```bash
# AIコンサルティングサービス
fomus-create ai-consulting ai-consulting.fomus.jp

# 新商品紹介サイト
fomus-create new-product product.fomus.jp

# 企業情報サイト
fomus-create company-info company.fomus.jp
```

### 3. オプション付きの使用例

```bash
# カレントディレクトリに生成
fomus-create my-site my-site.fomus.jp --here

# ローカルのみ生成（GitHubアップロードなし）
fomus-create test-site test.fomus.jp --local

# 両方のオプション
fomus-create local-test test.fomus.jp --here --local

# テンプレート指定
fomus-create product-site product.fomus.jp --template product
```

## 🎯 実行結果

### 自動で実行される処理
1. ✅ テンプレートサイト生成
2. ✅ GitHubリポジトリ作成
3. ✅ GitHub Pages設定
4. ✅ CNAME設定

### DNS設定（手動）
Xサーバーで以下のCNAMEレコードを設定：
```
名前: ai-consulting
タイプ: CNAME
値: masuo444.github.io
TTL: 3600
```

### 結果
- 📦 GitHub: `https://github.com/masuo444/ai-consulting-site`
- 🌐 公開URL: `https://ai-consulting.fomus.jp` (15分後)

## 🔄 日常の更新フロー

### Claude Codeでの更新
```bash
# 1. Claude Code で修正依頼
# 「ヘッダーの色を青に変更して」

# 2. 自動的にコミット・プッシュ
git add .
git commit -m "ヘッダー色を青に変更"
git push

# 3. 1-2分後に本番サイトに自動反映 🎉
```

### 手動での更新
```bash
# ファイルを編集後
cd ~/ai-consulting-site  # サイトディレクトリに移動
git add .
git commit -m "更新内容"
git push
```

## 📁 利用可能なオプション

| オプション | 説明 | 使用例 |
|----------|------|--------|
| `--here` | カレントディレクトリに生成 | `fomus-create site domain --here` |
| `--local` | ローカルのみ（GitHub無し） | `fomus-create site domain --local` |
| `--template` | テンプレート選択 | `fomus-create site domain --template product` |
| `--help` | ヘルプ表示 | `fomus-create --help` |
| `--version` | バージョン情報 | `fomus-create --version` |

## 🎨 テンプレート種類

- **landing** (デフォルト): サービス紹介・ランディングページ
- **corporate**: 企業サイト・会社紹介
- **product**: 製品・アプリ紹介

## 🚨 トラブルシューティング

### Q: コマンドが見つからない
```bash
# パスを再読み込み
source ~/.zshrc
# または新しいターミナルを開く
```

### Q: GitHub認証エラー
```bash
gh auth status  # 認証状態確認
gh auth login   # 再認証
```

### Q: サイトが表示されない
1. DNS設定確認（15-60分必要）
2. GitHub Pages設定確認
3. HTTPS でアクセス

## 💡 使用シーン

### Claude Code での使用
```bash
# どのディレクトリからでも
fomus-create consulting-site consulting.fomus.jp
```

### ターミナルでの使用
```bash
# プロジェクトディレクトリで
cd ~/projects
fomus-create new-service new-service.fomus.jp --here
```

### 一時的なテスト
```bash
# ローカルテスト用
fomus-create test-site test.fomus.jp --local
```

---

**🎉 これで、どこからでもワンコマンドでサイトが作成できます！**