import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Demo",
      // icon: "vaadin:book",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Demo2",
      // icon: "vaadin:book",
      prefix: "demo2/",
      link: "demo2/",
      children: "structure",
      collapsible: true,
    },
  ],
});
