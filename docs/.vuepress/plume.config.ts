import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({

  appearance: 'force-dark',

  // logo: '/assets/png/logo.png',

  // 导航栏
  navbar: [
    { text: 'Homepage', link: '/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'Notes', link: '/notes/core/java/基础.md',activeMatch: '^/core/'},
  ],    

  // 个人资料
  profile: {
    name: 'Leo',
    // description: '-',
    avatar: '/assets/png/logo.png',
    circle: true, // 是否为圆形头像
    location: 'China，Chengdu',
    // organization: '十次方数科'
  },

  encryptButtonText: 'Confirm',
  encryptPlaceholder: 'Enter Password（手机号后四位）',
  encryptPageText: 'Enter password to access',

  encrypt: {
    rules: {
      '/article/t1fjfnz7/': '5661',
    }
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
                    icon: 'https://fav.farm/%E2%98%95%EF%B8%8F',
                    collapsed: true,
                    prefix: 'java',
                    items: [
                      '基础',
                      '集合框架',
                      '并发编程',
                      '虚拟机',
                      'IO与NIO',
                      '设计模式',
                      '新特性与高级应用',
                      '实践与代码规范',
                      '开发工具',
                      '社区与资源',
                    ]
                },
                {
                    text: '数据库',
                    icon: 'https://fav.farm/%F0%9F%92%BE',
                    collapsed: true,
                    prefix: 'database',
                    items: ['MySQL','Redis']
                }
                ,
                {
                    text: '框架',
                    icon: 'https://fav.farm/%F0%9F%9B%A0%EF%B8%8F',
                    collapsed: true,
                    prefix: 'frame',
                    items: [
                      'Spring',
                      'SpringBoot',
                      'SpringCloud',
                      'Mybatis',
                    ]
                }
                ,
                {
                    text: '中间件',
                    icon: 'https://fav.farm/%F0%9F%94%84',
                    collapsed: true,
                    prefix: 'middle',
                    items: [
                      'RabbitMQ',
                      'Nginx',
                      'ElasticSearch',
                      'Aliware',
                    ]
                },
                {
                  text: '性能优化',
                  icon: 'https://fav.farm/%F0%9F%9A%80',
                  collapsed: true,
                  prefix: 'optimization',
                  items: [
                    '分布式系统',
                    '高并发',
                  ]
              },
              {
                text: '操作系统',
                icon: 'https://fav.farm/%F0%9F%96%A5%EF%B8%8F',
                collapsed: true,
                prefix: 'computer',
                items: [
                  'Linux',
                ]
            },
            {
              text: '前端技术',
              icon: 'https://fav.farm/%F0%9F%8C%90',
              collapsed: true,
              prefix: 'front',
              items: [
                'Ajax',
              ]
          },
          {
            text: '实用类库',
            icon: 'https://fav.farm/%F0%9F%93%A6',
            collapsed: true,
            prefix: 'third',
            items: [
              'Apollo',
            ]
        },
            ]
        },
    ]
  },

  // 页脚
  footer: {
    message: "Leo's Personal Wiki"
  },
  
})