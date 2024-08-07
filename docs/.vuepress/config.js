import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  // 请不要忘记设置默认语言
  lang: 'zh-CN',
  theme: plumeTheme({
    plugins: {
      search: false
    },
    darkMode: 'dark', // 设置默认暗黑模式
    navbar: [
      { text: 'Homepage', link: '/' },  // 添加笔记功能导航链接
      { text: 'Blog', link: '/blog/' },  // 添加笔记功能导航链接
      { text: 'Notes', link: '/notes/' },  // 添加笔记功能导航链接
      // 其他导航链接
    ],
    search: false, // 禁用主题中的搜索功能
    profile: {
      name: 'Jason Liu',
      description: '描述文字',
      avatar: 'https://prod-alicdn-community.kurobbs.com/newHead/aki/kakaluo.jpg',
      circle: true, // 是否为圆形头像
    },
    notes: {
      dir: '/notes/', // 声明所有笔记的目录
      link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
      notes: [
        {
          dir: 'typescript', // 声明笔记的目录，相对于 `notes.dir`
          link: '/typescript/', // 声明笔记的链接前缀
          sidebar: [ // 配置侧边栏
            {
              text: '简介',
              icon: 'mdi:language-typescript', // 侧边栏图标
              items: ['foo'] // 简化写法，主题会自动补全为 `foo.md`
            }
          ]
        },
        {
          dir: 'rust',
          link: '/rust/',
          sidebar: [
            { text: '简介', items: ['foo'] }
          ]
        }
      ]
    },
  }),
  bundler: viteBundler(),
})