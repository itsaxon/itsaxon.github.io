import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  description: "Leo's Personal Wiki",
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  theme: plumeTheme({
    plugins: {
      shiki: {
        theme: { light: 'dark-plus', dark: 'dark-plus' },
      },
      search: false,
    },
  })
})