# 留白 / Margin

个人网站，包含网络日志、Java 知识库与 AI 日报。根据 `D:\Files\Agent\Codex\ui-ux` 中的最新原型迁移，保留首屏文案、三层折页标记、配色、字体栈、栏目布局与移动端交互。旧 VuePress 网站代码已移除，Git 历史保留。

## 技术

- Next.js 16 App Router、React 19、TypeScript（strict）、Tailwind CSS 4。
- React Bits Dither Veil 与 Magnet，统一使用 TS-TW 版本。首页图案使用抖动像素遮罩，随指针显露细节；开始阅读按钮采用磁吸交互。
- Motion 用于首屏入场、滚动揭示和按钮反馈。
- shadcn/ui Dialog（Radix）用于全站搜索，处理焦点锁定、Escape 和滚动锁定。
- React Markdown + remark-gfm 渲染 Markdown 和日报表格。
- GSAP 用于 Dot Grid 点阵的惯性位移。减少动态效果时呈现静态抖动图案和点阵；保留移动端页面滚动。OGL 仅用于 Dither Veil，无需 Three.js。

## 本地开发

需要 Node.js 24 与 npm。

```bash
npm ci
npm run dev
```

打开 http://127.0.0.1:3000 。

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

`build` 先生成 Markdown 模块，再生成 `out/` 静态网站。`preview` 直接服务这些静态文件，可验证深层链接刷新和 404，不依赖 SPA 路由回退。

## 页面与内容

- `/`：首屏与三个栏目入口，博客预览最多两篇。
- `/blog/`：分类、搜索、分页（每页四篇），筛选写入 URL。
- `/java/`：知识总览；`/java/topics/[id]/`：主题笔记。
- `/java/advanced/`、`/java/interviews/`、`/java/updates/`：进阶、面试与最近更新。
- `/articles/[id]/`：独立文章，Java 文章支持目录和相邻文章。
- `/daily/`、`/daily/archive/`：月份筛选与归档（每页十二期）。
- `/daily/[date]/`：日报正文、八个栏目目录、表格与原文下载。

文章元数据、Java 主题、日报索引位于 `src/lib/content.ts`。博客 Markdown 位于 `content/posts/`，日报位于 `content/daily/`，下载文件位于 `public/reports/`。

编辑 Markdown 后运行 `npm run content`（构建会自动执行）。新增文章必须在 `content.ts` 中配置唯一 id；新增日报还需同步日报索引、Markdown 加载规则和下载资源。动态页面的 `generateStaticParams` 在构建时生成全部已知页面。

内容沿用原型：博客及知识笔记是示例，日报是提供的原文，尚未接入 CMS、实时 API 或定时采集。这里的迁移不验证日报中的新闻事实。

深浅色主题与动效偏好保存在本地。默认跟随系统设置；主题初始化脚本减少刷新闪屏。

## 浏览器验证

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

测试覆盖桌面和手机的筛选、分页、历史导航、直接刷新、搜索、主题、减少动态效果、Java 目录、日报锚点、下载和 404，并输出截图至 `test-results/`。

## GitHub Pages

`.github/workflows/deploy.yml` 使用 npm 构建并上传 `out/`，推送 `main` 后部署。仓库 Settings → Pages 的 Source 需选择 **GitHub Actions**。所有路由导出为目录式 HTML，包含 `.nojekyll`；域名元数据默认为 `https://itsaxon.github.io`。

本地修改不会自动提交、推送或触发线上部署。第三方组件来源与许可见 `THIRD_PARTY_NOTICES.md`。

导航参考 React Bits 官网首页：距顶 20px、高 56px；滚动超过 50px 收拢至最大 1276px，使用 blur(24px) saturate(1.4) 玻璃背景与 0.5s 过渡。菜单滑动高亮、移动端下拉、搜索与主题切换均保留。

首屏使用 React Bits Dot Grid（TS-TW）密集点阵：点径 1.6px、间距 18px，暖纸色与陶土色交互，底部淡出。标题采用无衬线双行排版，移除局部下划线；减少动态效果时保留静态点阵。GSAP 同时用于 Dot Grid 的惯性位移。
