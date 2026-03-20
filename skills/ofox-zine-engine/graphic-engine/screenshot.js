const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/**
 * Graphic Engine 截图脚本
 *
 * 用法：
 *   node screenshot.js <html文件> [输出目录名]
 *
 * 示例：
 *   node screenshot.js templates/auto-template.html
 *   node screenshot.js output/ofox/260224-llmfit-b-copper/260224-llmfit-b-copper.html 260224-llmfit-b-copper
 *
 * 输出：
 *   output/{账号}/{输出目录名}/01.png, 02.png, ...
 */

async function takeScreenshots() {
  const args = process.argv.slice(2);

  const htmlFile = args[0];
  let outputName = args[1];

  if (!htmlFile) {
    console.log(`
用法: node screenshot.js <html文件> [输出目录名]

示例:
  node screenshot.js output/ofox/260224-llmfit-b-copper/260224-llmfit-b-copper.html
  node screenshot.js output/poster/260224-kimi-k25/260224-kimi-k25.html
  node screenshot.js output/poster/260224-kimi-k25/260224-kimi-k25.html

输出: 截图保存在 HTML 文件同目录下
    `);
    process.exit(1);
  }

  // 检查文件是否存在
  const htmlPath = path.resolve(__dirname, htmlFile);
  if (!fs.existsSync(htmlPath)) {
    console.error(`错误: 文件不存在 - ${htmlFile}`);
    process.exit(1);
  }

  // 自动检测账号目录
  let accountDir = '';
  if (htmlFile.includes('output/ofox/')) {
    accountDir = 'ofox';
  } else if (htmlFile.includes('output/keyboard/')) {
    accountDir = 'keyboard';
  } else if (htmlFile.includes('output/poster/')) {
    accountDir = 'poster';
  }

  // 输出目录 = HTML 文件所在目录（截图和 HTML 放在一起）
  const outDir = path.dirname(htmlPath);

  // 用于显示的相对路径
  const displayPath = path.relative(__dirname, outDir) + '/';

  console.log(`\n📄 HTML文件: ${htmlFile}`);
  console.log(`📁 输出目录: ${displayPath}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 4倍清晰度
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 4 });

  await page.goto(`file://${htmlPath}`);

  // 等待页面渲染
  await new Promise(r => setTimeout(r, 1500));

  // 智能查找卡片
  const selectors = [
    '.container .card',
    '#output .card',
    '.card-container .card',
    '.card',
    '.poster'
  ];

  let cards = [];
  let usedSelector = '';

  for (const selector of selectors) {
    cards = await page.$$(selector);
    if (cards.length > 0) {
      usedSelector = selector;
      break;
    }
  }

  if (cards.length === 0) {
    console.error('错误: 未找到任何卡片元素');
    await browser.close();
    process.exit(1);
  }

  console.log(`🔍 选择器: ${usedSelector}`);
  console.log(`🎴 找到 ${cards.length} 个卡片\n`);

  // 创建输出目录（如果不存在）
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 清理旧截图（仅 ofox/keyboard 图文目录，poster 不动）
  if (accountDir === 'ofox' || accountDir === 'keyboard') {
    const oldPngs = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
    oldPngs.forEach(f => fs.unlinkSync(path.join(outDir, f)));
  }

  // 截图每个卡片
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const fileName = `${String(i + 1).padStart(2, '0')}.png`;
    const outPath = path.join(outDir, fileName);

    const box = await card.boundingBox();
    if (box) {
      await page.screenshot({
        path: outPath,
        clip: {
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height
        }
      });

      const actualWidth = Math.round(box.width * 4);
      const actualHeight = Math.round(box.height * 4);
      console.log(`  ✅ ${fileName} (${actualWidth}×${actualHeight}px)`);
    }
  }

  await browser.close();

  console.log(`\n🎉 完成！${cards.length} 张图片已保存到 ${displayPath}`);
}

takeScreenshots().catch(err => {
  console.error('截图失败:', err.message);
  process.exit(1);
});
