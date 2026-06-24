/**
 * 修复 COS 上所有 HTML 文件的 Content-Disposition 头
 * 将 attachment 改为 inline，让浏览器直接渲染而非下载
 */
const Cos = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  Bucket: 'marathonfirstaid-1305931768',
  Region: 'ap-shanghai',
  localDir: path.resolve(__dirname, '..', 'out'),
};

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

async function main() {
  const secretId = process.env.COS_SECRET_ID;
  const secretKey = process.env.COS_SECRET_KEY;

  if (!secretId || !secretKey) {
    console.error('❌ 请设置环境变量 COS_SECRET_ID 和 COS_SECRET_KEY');
    process.exit(1);
  }

  const cos = new Cos({
    SecretId: secretId,
    SecretKey: secretKey,
  });

  const files = collectFiles(CONFIG.localDir);
  const htmlFiles = files.filter(f => f.relativePath.endsWith('.html'));
  console.log(`找到 ${htmlFiles.length} 个 HTML 文件需要修复\n`);

  let fixed = 0;
  let failed = 0;

  for (const file of htmlFiles) {
    const key = file.relativePath.replace(/\\/g, '/');
    const ext = path.extname(file.absolutePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      // 先复制对象到自身（通过copyObject），同时覆盖元数据
      // COS的copyObject可以用来自我复制并修改元数据
      await copyAndFixHeaders(cos, key, contentType);
      fixed++;
      console.log(`  ✅ [${fixed}/${htmlFiles.length}] ${key}`);
    } catch (err) {
      failed++;
      console.error(`  ❌ [${fixed}/${htmlFiles.length}] ${key}: ${err.message}`);
    }
  }

  console.log(`\n✅ 完成: ${fixed} 成功, ${failed} 失败`);
  console.log('\n🌐 请用无痕模式重新访问:');
  console.log(`   https://${CONFIG.Bucket}.cos-website.${CONFIG.Region}.myqcloud.com`);
}

function copyAndFixHeaders(cos, key, contentType) {
  return new Promise((resolve, reject) => {
    // 使用 putObjectCopy 自我复制，同时设置新的元数据
    cos.putObjectCopy(
      {
        Bucket: CONFIG.Bucket,
        Region: CONFIG.Region,
        Key: key,
        CopySource: `${CONFIG.Bucket}.cos.${CONFIG.Region}.myqcloud.com/${encodeURIComponent(key)}`,
        // 关键：设置 ContentDisposition 为 inline（而不是 attachment）
        ContentDisposition: 'inline',
        ContentType: contentType,
        CacheControl: 'no-cache',
        MetadataDirective: 'Replaced',
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
}

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

main().catch(console.error);
