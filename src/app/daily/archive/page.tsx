import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '日报归档',
  alternates: { canonical: '/daily/archive/' },
};
import { Suspense } from 'react';
import { DailyView } from '@/components/page-views';
export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="content-page" role="status">
          正在加载内容…
        </p>
      }
    >
      <DailyView />
    </Suspense>
  );
}
