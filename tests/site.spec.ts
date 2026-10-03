import { test, expect } from '@playwright/test';

test('home, persistent theme and reduced motion', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('为知识留白');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused');
  await expect(page.locator('.motion-controls')).toHaveCount(0);
  await expect(page.locator('.dither-veil canvas')).toHaveCount(isMobile ? 0 : 1);
  await expect(page.locator('.reading-specular canvas')).toHaveCount(isMobile ? 0 : 1);
  await expect(page.locator('.veil-static')).toHaveCount(isMobile ? 1 : 0);
  await expect(page.locator('.art-caption')).toHaveCount(0);
  await expect(page.locator('.floating-header .brand-en')).toHaveText('Margin');
  await expect(page.locator('.hero-title .underline')).toHaveCount(0);
  await expect
    .poll(() =>
      page.locator('.hero-dot-background canvas').evaluate((node) => {
        const canvas = node as HTMLCanvasElement;
        const pixels = canvas
          .getContext('2d')!
          .getImageData(0, 0, canvas.width, canvas.height).data;
        return pixels.some((value, index) => index % 4 === 3 && value > 0);
      }),
    )
    .toBe(true);
  await page.getByRole('button', { name: '切换深色模式' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: '开始阅读' }).click();
  await expect(page.getByRole('heading', { name: '从这里，开始阅读' })).toBeInViewport();
  await expect(page.locator('.compact-item')).toHaveCount(2);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'playing');
  expect(errors).toEqual([]);
});

test('blog filters, paging, URL history and independent articles', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.locator('.page-articles .article')).toHaveCount(4);
  await page.getByRole('button', { name: '下一页' }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.locator('.page-articles .article')).toHaveCount(4);
  await page.reload();
  await expect(page.getByText('第 2 页 / 共 2 页')).toBeVisible();
  await page.getByRole('button', { name: '工程实践', exact: true }).click();
  await expect(page.locator('.page-articles .article')).toHaveCount(3);
  await page.getByRole('textbox', { name: '搜索博客' }).fill('API');
  await expect(page.locator('.page-articles .article')).toHaveCount(1);
  await expect(page.getByRole('textbox', { name: '搜索博客' })).toBeFocused();
  await page.locator('.page-articles .article').click();
  await expect(page).toHaveURL(/articles\/api-refactor/);
  await page.reload();
  await expect(page.locator('.markdown-body')).toContainText('统一错误结构');
  await expect(page).toHaveTitle(/API 重构.*留白/);
  await page.goBack();
  await expect(page.getByRole('textbox', { name: '搜索博客' })).toHaveValue('API');
  await page.getByRole('textbox', { name: '搜索博客' }).fill('没有这篇内容');
  await expect(page.getByRole('heading', { name: '暂时没有匹配的内容' })).toBeVisible();
  await page.getByRole('button', { name: '清除筛选' }).click();
  await expect(page.locator('.page-articles .article')).toHaveCount(4);
});

test('search dialog supports keyboard, close and result navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('textbox').fill('HashMap');
  await expect(dialog.getByRole('link')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: '搜索文章', exact: true })).toBeFocused();
  await page.getByRole('button', { name: '搜索文章', exact: true }).click();
  await dialog.getByRole('link').click();
  await expect(page).toHaveURL(/articles\/hashmap/);
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('HashMap');
});

test('Java topics, empty states and advanced notes', async ({ page, isMobile }) => {
  await page.goto('/java/');
  await expect(page.locator('.topic-index > a')).toHaveCount(7);
  await page.locator('.topic-index > a').filter({ hasText: 'Spring 生态' }).click();
  await expect(page.getByRole('heading', { name: '这个主题，还在整理。' })).toBeVisible();
  await page.goto('/java/advanced/');
  await expect(page.locator('.page-articles .article')).toHaveCount(3);
  await page.locator('.page-articles .article').first().click();
  await expect(page).toHaveURL(/articles\/concurrency-backpressure/);
  await expect(page.locator('.detail-body section')).toHaveCount(3);
  await page.reload();
  await expect(page.locator('.detail-body section')).toHaveCount(3);
  if (isMobile) {
    await page.getByRole('button', { name: '知识目录', exact: true }).click();
    await expect(page.getByRole('link', { name: '知识总览', exact: true })).toBeVisible();
    await page.getByRole('button', { name: '本文目录', exact: true }).click();
    await expect(page.locator('.outline-links')).toBeVisible();
  }
});

test('daily report sections, tables, download and missing page', async ({ page }) => {
  await page.goto('/daily/');
  await page.locator('.issue-archive-list > a').click();
  await expect(page.locator('.report-body > section')).toHaveCount(8);
  await expect(page.locator('.report-table table')).toHaveCount(3);
  await page.locator('.report-outline nav a').last().click();
  await expect(page).toHaveURL(/#report-8/);
  await page.reload();
  await expect(page.locator('#report-8')).toBeInViewport();
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: '下载原文' }).click();
  expect((await download).suggestedFilename()).toContain('2026-09-27');
  const response = await page.goto('/articles/nonexistent/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: '这一页，暂时找不到。' })).toBeVisible();
});

test('responsive layouts and screenshots', async ({ page, isMobile }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  for (const [name, route] of [
    ['home', '/'],
    ['blog', '/blog/'],
    ['java', '/java/'],
    ['daily', '/daily/2026-09-27/'],
  ] as const) {
    await page.goto(route);
    await expect(page.locator('main h1')).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(name + '.png'), fullPage: name !== 'daily' });
  }
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: '打开导航' }).click();
    await page
      .getByRole('navigation', { name: '主导航' })
      .getByRole('link', { name: '网络日志' })
      .click();
    await expect(page).toHaveURL(/blog/);
    await expect(page.getByRole('button', { name: '打开导航' })).toBeVisible();
    await page.goto('/');
  }
  await page.getByRole('button', { name: '切换深色模式' }).click();
  await page.screenshot({ path: testInfo.outputPath('home-dark.png'), fullPage: true });
});

test('floating glass navigation follows scrolling and returns to transparent', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const header = page.locator('.floating-header');
  await expect(header).not.toHaveClass(/is-scrolled/);
  await page.evaluate(() => window.scrollTo(0, 350));
  await expect(header).toHaveClass(/is-scrolled/);
  const bar = page.locator('.floating-header .header');
  await expect(bar).toHaveCSS('backdrop-filter', 'blur(10px) saturate(1.7)');
  await expect(bar).toHaveCSS('height', '56px');
  await page.screenshot({ path: testInfo.outputPath('glass-navigation.png') });
  await page.getByRole('button', { name: '切换深色模式' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({ path: testInfo.outputPath('glass-navigation-dark.png') });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).not.toHaveClass(/is-scrolled/);
  await page.getByRole('button', { name: '搜索文章', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('brand mark rotates on hover including reduced-motion settings', async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === 'mobile') return;
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const mark = page.locator('.floating-header .margin-mark');
  const initial = await mark.evaluate((el) => getComputedStyle(el).transform);
  await page.getByRole('link', { name: '留白首页', exact: true }).hover();
  await expect.poll(() => mark.evaluate((el) => getComputedStyle(el).transform)).not.toBe(initial);
  await page.mouse.move(500, 300);
  await expect.poll(() => mark.evaluate((el) => getComputedStyle(el).transform)).toBe(initial);
});

