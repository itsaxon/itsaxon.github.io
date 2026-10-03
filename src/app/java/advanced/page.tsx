import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '进阶知识',
  alternates: { canonical: '/java/advanced/' },
};
import { Suspense } from 'react';
import { JavaView } from '@/components/page-views';
export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="content-page" role="status">
          正在加载内容…
        </p>
      }
    >
      <JavaView mode="advanced" />
    </Suspense>
  );
}
