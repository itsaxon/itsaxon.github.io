import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  description: "",
  theme,
  head: [
     // 预连接
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    // 苹果设备图标
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    // 现代浏览器图标
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/logo.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/logo.png" }],
   ],
});
