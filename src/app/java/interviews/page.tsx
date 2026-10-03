import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '面试专题',
  alternates: { canonical: '/java/interviews/' },
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
      <JavaView mode="interviews" />
    </Suspense>
  );
}
