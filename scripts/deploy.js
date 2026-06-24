/**
 * 腾讯云 COS 自动化部署脚本
 *
 * 使用方法：
 *   1. 设置环境变量：
 *      export COS_SECRET_ID="你的SecretId"
 *      export COS_SECRET_KEY="你的SecretKey"
 *
 *   2. 构建并部署：
 *      npm run deploy
 *
 *   3. 仅部署（不重新构建）：
 *      npm run deploy:only
 */

const Cos = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ==================== 配置 ====================
const CONFIG = {
  Bucket: 'marathonfirstaid-1305931768',
  Region: 'ap-shanghai',
  // 本地构建输出目录（项目根目录下的 out/）
  localDir: path.resolve(__dirname, '..', 'out'),
  // 是否先执行构建
  buildFirst: true,
};

// 需要设置特殊 Content-Type 的文件扩展名
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

// ==================== 主流程 ====================
async function main() {
  console.log('🚀 马拉松医疗保障网站 — 部署到腾讯云 COS\n');

  // 1. 检查环境变量
  const secretId = process.env.COS_SECRET_ID;
  const secretKey = process.env.COS_SECRET_KEY;

  if (!secretId || !secretKey) {
    console.error('❌ 缺少腾讯云密钥！请设置环境变量：');
    console.error('   export COS_SECRET_ID="你的SecretId"');
    console.error('   export COS_SECRET_KEY="你的SecretKey"');
    process.exit(1);
  }

  // 2. 构建（如需要）
  const skipBuild = process.argv.includes('--no-build');
  if (!skipBuild) {
    console.log('📦 Step 1/3: 构建项目...');
    try {
      execSync('npx next build', {
        cwd: path.resolve(__dirname),
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: '' },
      });
      console.log('✅ 构建完成\n');
    } catch (err) {
      console.error('❌ 构建失败');
      process.exit(1);
    }
  } else {
    console.log('⏭️  跳过构建，直接部署\n');
  }

  // 3. 收集文件
  console.log('📋 Step 2/3: 扫描文件...');
  const files = collectFiles(CONFIG.localDir);
  console.log(`   找到 ${files.length} 个文件\n`);

  // 4. 上传
  console.log('☁️  Step 3/3: 上传到 COS...');

  const cos = new Cos({
    SecretId: secretId,
    SecretKey: secretKey,
  });

  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const key = file.relativePath.replace(/\\/g, '/');
    const ext = path.extname(file.absolutePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      await uploadFile(cos, file.absolutePath, key, contentType);
      uploaded++;
      if (uploaded % 10 === 0) {
        console.log(`   [${uploaded}/${files.length}] ${key}`);
      }
    } catch (err) {
      failed++;
      console.error(`   ❌ 上传失败: ${key} — ${err.message}`);
    }
  }

  console.log(`\n✅ 部署完成: ${uploaded} 成功, ${failed} 失败`);

  // 5. 输出访问地址
  const websiteUrl = `https://${CONFIG.Bucket}.cos-website.${CONFIG.Region}.myqcloud.com`;
  const cosUrl = `https://${CONFIG.Bucket}.cos.${CONFIG.Region}.myqcloud.com/zh.html`;
  console.log('\n🌐 访问地址:');
  console.log(`   静态网站: ${websiteUrl}`);
  console.log(`   直接访问: ${cosUrl}`);
  console.log('\n⚠️  如需自定义域名，请在 COS 控制台配置「静态网站」和「自定义域名」。');
}

// ==================== 工具函数 ====================

function collectFiles(dir, base = dir) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...collectFiles(fullPath, base));
    } else {
      result.push({
        absolutePath: fullPath,
        relativePath: path.relative(base, fullPath),
      });
    }
  }

  return result;
}

function uploadFile(cos, filePath, key, contentType) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: CONFIG.Bucket,
        Region: CONFIG.Region,
        Key: key,
        Body: fs.createReadStream(filePath),
        ContentType: contentType,
        CacheControl: 'no-cache',
        ACL: 'public-read',
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
}

main().catch(console.error);
