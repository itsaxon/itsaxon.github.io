# Leo's Personal Wiki

![VuePress](https://img.shields.io/badge/VuePress-2.0.0-brightgreen)
![Vue](https://img.shields.io/badge/Plume-1.0.0-brightgreen)
![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)

## 项目简介

欢迎来到我的个人博客项目！这个项目是基于 [VuePress](https://vuepress.vuejs.org/) v2.0.0 搭配开源主题 [vuepress-theme-plume](https://github.com/vuepress-theme-plume/vuepress-theme-plume) 创建的个人博客网站。项目主要用来记录知识以及分享一些个人思考和经验

你也可以通过本项目快速搭建自己的技术博客，并根据需要进行二次开发和个性化定制。

## 技术栈

- [VuePress](https://vuepress.vuejs.org/) v2.0.0
- [vuepress-theme-plume](https://github.com/vuepress-theme-plume/vuepress-theme-plume) v1.0.0

## 使用指南

### VuePress v2.0.0

VuePress 是一个静态网站生成器，基于 Vue.js 构建。具体使用教程可参考 [VuePress 官方文档](https://vuepress.vuejs.org/)。

### vuepress-theme-plume 1.0.0

vuepress-theme-plume 是一个功能丰富且美观的 VuePress 主题。使用指南如下：

1. **安装主题**：

```bash
# 安装 vuepress
pnpm add -D vuepress@next vue
# 安装 主题和打包工具
pnpm add -D vuepress-theme-plume @vuepress/bundler-vite@next
```

2. **配置主题**：在 `.vuepress/config.js` 中设置主题为 `plume`，并根据需要调整主题配置项。

```typescript
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  // 请不要忘记设置默认语言
  lang: 'zh-CN',
  theme: plumeTheme({
    // more...
  }),
  bundler: viteBundler(),
})
```

3. **自定义主题**：根据官方文档自定义主题样式和功能，满足个人需求。

详细的主题配置和使用方法，请参考 [vuepress-theme-plume 官方文档](https://github.com/vuepress-theme-plume/vuepress-theme-plume)。

## 贡献指南

1. Fork 本项目。
2. 创建你的分支 (`git checkout -b feature/你的功能`)。
3. 提交你的更改 (`git commit -m '添加新功能'`)。
4. 推送到分支 (`git push origin feature/你的功能`)。
5. 打开一个 Pull Request。

请确保你的代码遵循项目的编码规范，并且在提交之前通过了所有测试。

## 许可证

本项目采用 Apache 2.0 许可证。详细信息请参阅 LICENSE 文件。

## 联系方式

如果你有任何问题或建议，欢迎通过以下方式联系我：

- **邮箱**：itsachsen@gmail.com

感谢你的关注和支持！
