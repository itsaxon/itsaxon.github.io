import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteShell } from '@/components/site-shell';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://itsaxon.github.io'),
  title: { default: '留白 Margin', template: '%s · 留白 Margin' },
  description: '留白，一位 Java 开发者的个人博客、知识体系与 AI 阅读笔记。',
  alternates: { canonical: '/' },
  openGraph: { siteName: '留白 Margin', locale: 'zh_CN', type: 'website' },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var m=localStorage.getItem('margin-motion');document.documentElement.dataset.motion=(m===null?matchMedia('(prefers-reduced-motion: reduce)').matches:m!=='true')?'paused':'playing';}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
