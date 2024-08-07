import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'


export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    plugins: [backToTopPlugin()],
    prevLinks: true,
    nextLinks: true,
    navbar: [
      { text: 'Homepage', link: '/' },
      { 
        text: 'AboutMe', 
        children: [
          { text: 'Github', link: 'https://github.com/itsaxon' },
          { text: 'Gitee', link: 'https://gitee.com/itsaxon' },
          { text: 'Juejin', link: 'https://juejin.cn/user/1574156383554909' },
        ]
      }
    ],
    sidebar: [
      {
        text: 'Personal Growth',
        link: '/',
        collapsible: true // 不折叠
      },
      {
        text: "Core Java",
        link: '/personal_growth/core_java/Java基础',
        collapsible: false, // 不折叠
        children: [
          { text: "Java基础", link: "/personal_growth/core_java/Java基础" },
          { text: "Java集合", link: "/personal_growth/core_java/Java集合" }
        ]
      }
    ]
  }),
  title: "Leo's Personal Wiki",
})