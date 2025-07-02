#!/usr/bin/env node

/**
 * FOMUS Template Processor
 * 設定ファイルベースでHTMLテンプレートを処理
 */

const fs = require('fs');
const path = require('path');

class TemplateProcessor {
    constructor(configPath) {
        this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.baseDir = path.dirname(configPath) + '/../';
    }

    // テンプレート変数を置換
    replaceVariables(content) {
        const replacements = {
            '{{SITE_NAME}}': this.config.site.name,
            '{{SITE_TITLE}}': this.config.site.title,
            '{{SITE_DESCRIPTION}}': this.config.site.description,
            '{{DOMAIN}}': this.config.site.domain,
            '{{LOGO_TEXT}}': this.config.branding.logo_text,
            '{{TAGLINE}}': this.config.branding.tagline,
            '{{PRIMARY_COLOR}}': this.config.branding.primary_color,
            '{{HERO_BADGE}}': this.config.hero.badge,
            '{{HERO_TITLE_MAIN}}': this.config.hero.title_main,
            '{{HERO_TITLE_HIGHLIGHT}}': this.config.hero.title_highlight,
            '{{HERO_SUBTITLE}}': this.config.hero.subtitle,
            '{{CTA_PRIMARY}}': this.config.hero.cta_primary,
            '{{CTA_SECONDARY}}': this.config.hero.cta_secondary,
            '{{CONTACT_EMAIL}}': this.config.contact.email,
            '{{CONTACT_PHONE}}': this.config.contact.phone,
            '{{COMPANY_NAME}}': this.config.company.name,
            '{{COMPANY_FULL_NAME}}': this.config.company.full_name
        };

        let result = content;
        for (const [placeholder, value] of Object.entries(replacements)) {
            result = result.replace(new RegExp(placeholder, 'g'), value);
        }

        return result;
    }

    // 機能リストを生成
    generateFeatures() {
        if (!this.config.features) return '';
        
        return this.config.features.map(feature => `
                        <div class="hero-feature-item">
                            <div class="feature-icon">${feature.icon}</div>
                            <div class="feature-content">
                                <h3>${feature.title}</h3>
                                <p>${feature.description}</p>
                            </div>
                        </div>`).join('');
    }

    // 料金プランを生成
    generatePricing() {
        if (!this.config.pricing?.plans) return '';
        
        return this.config.pricing.plans.map(plan => `
                <div class="pricing-card${plan.popular ? ' popular' : ''}">
                    ${plan.popular ? '<div class="popular-badge">人気</div>' : ''}
                    <div class="plan-header">
                        <h3>${plan.name}</h3>
                        <div class="price">
                            <span class="price-main">${plan.price}</span>
                            <span class="price-period">/${plan.period}</span>
                        </div>
                        <div class="price-renewal">
                            <span class="renewal-text">2年目以降：${plan.renewal}/年</span>
                        </div>
                    </div>
                    <ul class="plan-features">
                        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <a href="${plan.link}" class="plan-cta">詳細を見る</a>
                </div>`).join('');
    }

    // HTMLファイルを処理
    processHTMLFile(filePath, outputPath) {
        console.log(`Processing: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 基本的な変数置換
        content = this.replaceVariables(content);
        
        // 機能リストの置換
        if (content.includes('{{FEATURES_GRID}}')) {
            content = content.replace('{{FEATURES_GRID}}', this.generateFeatures());
        }
        
        // 料金プランの置換
        if (content.includes('{{PRICING_GRID}}')) {
            content = content.replace('{{PRICING_GRID}}', this.generatePricing());
        }
        
        // CSSカラー変数の更新
        if (content.includes(':root')) {
            content = content.replace(
                /--color-accent: #[0-9A-Fa-f]{6};/g,
                `--color-accent: ${this.config.branding.primary_color};`
            );
        }
        
        fs.writeFileSync(outputPath, content);
        console.log(`Generated: ${outputPath}`);
    }

    // CSSファイルの色を更新
    processCSSFile(filePath, outputPath) {
        console.log(`Processing CSS: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // カラー変数の置換
        content = content.replace(
            /--color-accent: #[0-9A-Fa-f]{6};/g,
            `--color-accent: ${this.config.branding.primary_color};`
        );
        content = content.replace(
            /--color-primary: #[0-9A-Fa-f]{6};/g,
            `--color-primary: ${this.config.branding.secondary_color};`
        );
        
        fs.writeFileSync(outputPath, content);
        console.log(`Generated CSS: ${outputPath}`);
    }

    // 全ファイルを処理
    processAll(outputDir) {
        // 出力ディレクトリ作成
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // HTMLファイルを処理
        const htmlFiles = ['index.html'];
        htmlFiles.forEach(file => {
            const inputPath = path.join(this.baseDir, file);
            const outputPath = path.join(outputDir, file);
            if (fs.existsSync(inputPath)) {
                this.processHTMLFile(inputPath, outputPath);
            }
        });

        // CSSファイルを処理
        const cssDir = path.join(outputDir, 'css');
        if (!fs.existsSync(cssDir)) {
            fs.mkdirSync(cssDir, { recursive: true });
        }
        
        const cssInputPath = path.join(this.baseDir, 'css/style.css');
        const cssOutputPath = path.join(cssDir, 'style.css');
        if (fs.existsSync(cssInputPath)) {
            this.processCSSFile(cssInputPath, cssOutputPath);
        }

        // その他のファイルをコピー
        this.copyStaticFiles(outputDir);

        // CNAMEファイル作成
        fs.writeFileSync(path.join(outputDir, 'CNAME'), this.config.site.domain);

        console.log(`\n✅ Site generation completed!`);
        console.log(`📁 Output directory: ${outputDir}`);
        console.log(`🌐 Domain: https://${this.config.site.domain}`);
    }

    // 静的ファイルをコピー
    copyStaticFiles(outputDir) {
        const staticDirs = ['js', 'images', 'assets'];
        const staticFiles = ['README.md', 'package.json'];
        
        staticDirs.forEach(dir => {
            const srcDir = path.join(this.baseDir, dir);
            const destDir = path.join(outputDir, dir);
            
            if (fs.existsSync(srcDir)) {
                this.copyRecursive(srcDir, destDir);
            }
        });
        
        staticFiles.forEach(file => {
            const srcFile = path.join(this.baseDir, file);
            const destFile = path.join(outputDir, file);
            
            if (fs.existsSync(srcFile)) {
                fs.copyFileSync(srcFile, destFile);
            }
        });
    }

    // ディレクトリを再帰的にコピー
    copyRecursive(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                this.copyRecursive(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

// CLI実行
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('Usage: node template-processor.js <config-file> <output-directory>');
        console.log('Example: node template-processor.js config/site-config.json ./output');
        process.exit(1);
    }

    const configPath = args[0];
    const outputDir = args[1];

    try {
        const processor = new TemplateProcessor(configPath);
        processor.processAll(outputDir);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

module.exports = TemplateProcessor;