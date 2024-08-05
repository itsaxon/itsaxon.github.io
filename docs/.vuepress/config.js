import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'itsaxon',
  description: 'itsaxon blog',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/get-started'],
  }),
  themeConfig: {
    nav: [
        { text: '首页', link: '/' },
        { 
            text: '冴羽的 JavaScript 博客', 
            items: [
                { text: 'Github', link: 'https://github.com/mqyqingfeng' },
                { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
            ]
        }
    ]
},

  bundler: viteBundler(),
})
