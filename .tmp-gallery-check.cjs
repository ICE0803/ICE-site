const { chromium } = require('C:/Users/电脑/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Users/电脑/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe'});
  for (const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
    const page = await browser.newPage({viewport});
    await page.goto('http://localhost:3021/about');
    await page.getByRole('tab', {name:'艺人'}).click();
    const cards = page.locator('.artist-card');
    await cards.first().hover();
    await page.waitForTimeout(250);
    const firstPreview = await page.locator('.interest-preview').evaluate(el => ({visible: el.dataset.visible, text: el.textContent}));
    await cards.nth(1).hover();
    await page.waitForTimeout(250);
    const secondPreview = await page.locator('.interest-preview').evaluate(el => ({visible: el.dataset.visible, text: el.textContent}));
    const box = await page.locator('.artist-gallery').boundingBox();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    console.log(JSON.stringify({viewport, cardCount: await cards.count(), box, overflow, first: firstPreview, second: secondPreview}));
    await page.screenshot({path:`C:/Users/电脑/AppData/Local/Temp/artist-gallery-${viewport.width}.png`, fullPage:true});
    await page.close();
  }
  await browser.close();
})();
