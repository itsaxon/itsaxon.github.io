import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "JavaHub",
      link: "/",
    },
    {
      text: "Java 知识库",
      link: "knowledge_base/knowledge_base",
    },
    {
      text: "Java 核心",
      prefix: "knowledge_base/Java核心/",
      link: "knowledge_base/Java核心/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "数据库",
      prefix: "knowledge_base/数据库/",
      link: "knowledge_base/数据库/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "缺陷修复",
      prefix: "knowledge_base/缺陷修复/",
      link: "knowledge_base/缺陷修复/",
      children: "structure",
      collapsible: true,
    },
  ]
});