import type { Metadata } from 'next';
export const metadata: Metadata = { title: '网络日志', alternates: { canonical: '/blog/' } };
import { Suspense } from 'react';
import { BlogView } from '@/components/page-views';
export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="content-page" role="status">
          正在加载内容…
        </p>
      }
    >
      <BlogView />
    </Suspense>
  );
}
