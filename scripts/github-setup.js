#!/usr/bin/env node

/**
 * GitHub Repository Setup Automation
 * GitHubリポジトリの作成、Pages設定、CNAME設定を自動化
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class GitHubSetup {
    constructor(options) {
        this.repoName = options.repoName;
        this.domain = options.domain;
        this.username = options.username || 'masuo444';
        this.description = options.description || '';
        this.siteDir = options.siteDir;
        this.isPublic = options.public !== false;
    }

    // GitHubリポジトリ作成
    async createRepository() {
        console.log(`📦 Creating GitHub repository: ${this.repoName}`);
        
        try {
            // GitHub CLIを使用してリポジトリ作成
            const visibility = this.isPublic ? '--public' : '--private';
            const cmd = `gh repo create ${this.repoName} ${visibility} --description "${this.description}"`;
            
            execSync(cmd, { stdio: 'inherit' });
            console.log(`✅ Repository created: https://github.com/${this.username}/${this.repoName}`);
            
            return true;
        } catch (error) {
            console.error('❌ Failed to create repository with GitHub CLI');
            console.log('Please create the repository manually and run the script again.');
            return false;
        }
    }

    // Gitリポジトリ初期化と初回コミット
    initializeGit() {
        console.log('🔄 Initializing Git repository...');
        
        const commands = [
            'git init',
            'git add .',
            `git commit -m "Initial commit: ${this.repoName}

Generated using FOMUS Site Generator
- Domain: ${this.domain}
- Auto-deployed to GitHub Pages

🤖 Generated with FOMUS Site Generator"`,
            `git remote add origin https://github.com/${this.username}/${this.repoName}.git`,
            'git branch -M main'
        ];

        try {
            commands.forEach(cmd => {
                console.log(`Running: ${cmd}`);
                execSync(cmd, { 
                    cwd: this.siteDir,
                    stdio: 'inherit' 
                });
            });
            console.log('✅ Git repository initialized');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Git repository:', error.message);
            return false;
        }
    }

    // GitHubにプッシュ
    pushToGitHub() {
        console.log('📤 Pushing to GitHub...');
        
        try {
            execSync('git push -u origin main', {
                cwd: this.siteDir,
                stdio: 'inherit'
            });
            console.log('✅ Code pushed to GitHub');
            return true;
        } catch (error) {
            console.error('❌ Failed to push to GitHub:', error.message);
            return false;
        }
    }

    // GitHub Pages設定
    async setupGitHubPages() {
        console.log('🌐 Setting up GitHub Pages...');
        
        try {
            // GitHub API経由でPages設定
            const apiUrl = `https://api.github.com/repos/${this.username}/${this.repoName}/pages`;
            const token = process.env.GITHUB_TOKEN;
            
            if (!token) {
                console.log('⚠️  GITHUB_TOKEN not found. Please configure GitHub Pages manually:');
                console.log(`   1. Go to https://github.com/${this.username}/${this.repoName}/settings/pages`);
                console.log(`   2. Set Source to "Deploy from a branch"`);
                console.log(`   3. Select "main" branch and "/ (root)" folder`);
                console.log(`   4. Set custom domain to: ${this.domain}`);
                return false;
            }

            const curlCmd = `curl -X POST \\
  -H "Authorization: token ${token}" \\
  -H "Accept: application/vnd.github.v3+json" \\
  "${apiUrl}" \\
  -d '{"source":{"branch":"main","path":"/"},"cname":"${this.domain}"}'`;

            execSync(curlCmd, { stdio: 'inherit' });
            console.log('✅ GitHub Pages configured');
            return true;
        } catch (error) {
            console.log('⚠️  GitHub Pages setup may require manual configuration');
            console.log(`Please visit: https://github.com/${this.username}/${this.repoName}/settings/pages`);
            return false;
        }
    }

    // DNS設定ガイド表示
    showDNSInstructions() {
        const subdomain = this.domain.split('.')[0];
        
        console.log('\n📋 DNS Configuration Required:');
        console.log('=====================================');
        console.log('Xサーバーで以下のCNAMEレコードを設定してください:');
        console.log('');
        console.log(`名前: ${subdomain}`);
        console.log(`タイプ: CNAME`);
        console.log(`値: ${this.username}.github.io`);
        console.log(`TTL: 3600`);
        console.log('');
        console.log('設定後、15分〜1時間で以下のURLでアクセス可能になります:');
        console.log(`🌐 https://${this.domain}`);
    }

    // 完了レポート
    showCompletionReport() {
        console.log('\n🎉 Site Generation Complete!');
        console.log('=====================================');
        console.log(`📁 Site Directory: ${this.siteDir}`);
        console.log(`📦 GitHub Repository: https://github.com/${this.username}/${this.repoName}`);
        console.log(`🌐 Live URL: https://${this.domain} (after DNS propagation)`);
        console.log(`⚙️  Settings: https://github.com/${this.username}/${this.repoName}/settings/pages`);
        console.log('');
        console.log('Next Steps:');
        console.log('1. Configure DNS CNAME record (see instructions above)');
        console.log('2. Wait 15-60 minutes for DNS propagation');
        console.log('3. Visit your live site!');
        console.log('');
        console.log('To update the site:');
        console.log('1. Edit files and commit changes');
        console.log('2. Push to GitHub');
        console.log('3. Changes will be live in 1-2 minutes');
    }

    // 全体の実行
    async execute() {
        console.log(`🚀 Setting up ${this.repoName} for ${this.domain}`);
        
        // 1. Gitリポジトリ初期化
        if (!this.initializeGit()) {
            process.exit(1);
        }

        // 2. GitHubリポジトリ作成
        if (!await this.createRepository()) {
            process.exit(1);
        }

        // 3. コードをプッシュ
        if (!this.pushToGitHub()) {
            process.exit(1);
        }

        // 4. GitHub Pages設定
        await this.setupGitHubPages();

        // 5. DNS設定ガイド
        this.showDNSInstructions();

        // 6. 完了レポート
        this.showCompletionReport();

        return true;
    }
}

// CLI実行
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 3) {
        console.log('Usage: node github-setup.js <repo-name> <domain> <site-directory> [username]');
        console.log('Example: node github-setup.js ai-consulting-site ai-consulting.fomus.jp /tmp/ai-consulting');
        process.exit(1);
    }

    const options = {
        repoName: args[0],
        domain: args[1],
        siteDir: args[2],
        username: args[3] || 'masuo444',
        description: `${args[0]} - FOMUS Service Site`
    };

    const setup = new GitHubSetup(options);
    setup.execute().catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
    });
}

module.exports = GitHubSetup;