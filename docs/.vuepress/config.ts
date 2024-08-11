import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  description: "Leo's Personal Wiki",
  head: [
    ['link', { rel: 'icon', href: '/assets/png/logo.png' }]
  ],
  theme: plumeTheme({
    plugins: {
      search: false,
    },
  })
})