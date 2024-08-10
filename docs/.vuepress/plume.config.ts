import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({

  appearance: false,

  logo: '/logo.png',

  // 导航栏
  navbar: [
    { text: 'Homepage', link: '/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'Notes', link: '/notes/core/java/Java基础.md',activeMatch: '^/core/'},
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
                    text: 'Java 核心',
                    collapsed: false,
                    prefix: 'java',
                    items: ['Java基础','Java集合']
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