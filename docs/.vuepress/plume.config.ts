import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({

 appearance: 'force-dark',

  // 导航栏
  navbar: [
    { text: 'Homepage', link: '/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'Notes', link: '/notes/core/java/基础.md',activeMatch: '^/core/'},
  ],    
  // 个人资料
  profile: {
    name: 'leo_shuo',
    avatar: '/logo.png',
    circle: true, // 是否为圆形头像
    location: 'Chengdu,China',
  },

  // 笔记
  notes: {
    dir: 'notes', // 声明所有笔记的目录
    link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
    notes: [
        {
            dir: 'core', // 声明笔记的目录，相对于 `notes.dir`
            link: '/core/', // 声明笔记的链接前缀
            sidebar: [ // 配置侧边栏
                {
                    text: 'Java核心',
                    collapsed: false,
                    prefix: 'java',
                    items: ['基础','集合']
                },
                {
                    text: '数据库',
                    collapsed: false,
                    prefix: 'database',
                    items: ['MySQL']
                }
            ]
        },
    ]
  },

  // 页脚
  footer: {
    message: "Leo's Personal Wiki"
  },
  


})