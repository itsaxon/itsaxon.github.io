# Leo's Personal Wiki

![Banner](https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

![VuePress](https://img.shields.io/badge/VuePress-2.0.0-brightgreen)
![Vue](https://img.shields.io/badge/Plume-1.0.0-brightgreen)
![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)



## 项目简介

欢迎来到我的个人博客项目！这个项目是基于 [VuePress](https://vuepress.vuejs.org/) v2.0.0 搭配开源主题 [vuepress-theme-plume](https://github.com/vuepress-theme-plume/vuepress-theme-plume) 创建的个人博客网站。项目主要分为两个模块：

- **Blog**：包含前后端的技术分享、书籍的理解、技术人生的感悟等内容。
- **Docs**：专注于 Java 语言的学习记录，涵盖基础知识、进阶技巧等。

你也可以通过本项目快速搭建自己的技术博客，并根据需要进行二次开发和个性化定制。

## 功能特性

- **Blog 模块**
  - 技术分享：前端与后端技术栈的最新动态与实战经验。
  - 书籍理解：对各类技术书籍的阅读笔记与心得体会。
  - 技术人生：分享个人在技术道路上的成长与感悟。

- **Docs 模块**
  - Java 学习：系统化的 Java 学习资料，从基础到高级。
  - 实战项目：基于 Java 的实际项目案例，帮助提升编程能力。

## 技术栈

- [VuePress](https://vuepress.vuejs.org/) v2.0.0
- [vuepress-theme-plume](https://github.com/vuepress-theme-plume/vuepress-theme-plume) v1.0.0

## 使用指南

### VuePress v2.0.0

VuePress 是一个静态网站生成器，基于 Vue.js 构建。具体使用教程可参考 VuePress 官方文档。主要步骤包括：

1. **项目结构**：了解 VuePress 的目录结构，如 `docs` 文件夹存放文档内容。
2. **配置文件**：编辑 `.vuepress/config.js` 进行站点配置。
3. **Markdown 文件**：使用 Markdown 语法编写博客文章和文档。

### vuepress-theme-plume 1.0.0

vuepress-theme-plume 是一个功能丰富且美观的 VuePress 主题。使用指南如下：

1. **安装主题**：

   ```
   npm install vuepress-theme-plume
   ```

2. **配置主题**：在 `.vuepress/config.js` 中设置主题为 `plume`，并根据需要调整主题配置项。

   ```
   module.exports = {
     theme: 'plume',
     themeConfig: {
       // 主题配置项
     },
   }
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
- **GitHub**：[itsaxon](https://github.com/itsaxon)

感谢你的关注和支持！
