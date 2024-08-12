import { defineThemeConfig } from 'vuepress-theme-plume'

export default defineThemeConfig({

  appearance: false,

  logo: '/assets/png/logo.png',

  // 导航栏
  navbar: [
    { text: 'Homepage', link: '/' },
    { text: 'Blog', link: '/blog/' },
    { text: 'Notes', link: '/notes/core/java/基础.md',activeMatch: '^/core/'},
  ],    

  // 个人资料
  profile: {
    name: 'Leo Shuo',
    avatar: '/assets/png/logo.png',
    circle: true, // 是否为圆形头像
    location: 'Chengdu , China',
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
                    icon: '/assets/svg/java.svg',
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
                    icon: '/assets/svg/db.svg',
                    collapsed: true,
                    prefix: 'database',
                    items: ['MySQL','Redis']
                }
                ,
                {
                    text: '框架',
                    icon: '/assets/svg/frame.svg',
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
                    icon: '/assets/svg/middleware.svg',
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
                  icon: '/assets/svg/optimization.svg',
                  collapsed: true,
                  prefix: 'optimization',
                  items: [
                    '分布式系统',
                    '高并发',
                  ]
              },
              {
                text: '操作系统',
                icon: '/assets/svg/computer.svg',
                collapsed: true,
                prefix: 'computer',
                items: [
                  'Linux',
                ]
            },
            {
              text: '大前端技术',
              icon: '/assets/svg/front.svg',
              collapsed: true,
              prefix: 'front',
              items: [
                'Ajax',
              ]
          },
          {
            text: '第三方类库',
            icon: '/assets/svg/third.svg',
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