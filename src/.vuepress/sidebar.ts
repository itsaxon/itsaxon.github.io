import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Demo",
      prefix: "doc/demo/",
      link: "doc/demo/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Demo2",
      prefix: "doc/demo2/",
      link: "doc/demo2/",
      children: "structure",
      collapsible: true,
    },
  ],
  "/blog/": "structure",
});
