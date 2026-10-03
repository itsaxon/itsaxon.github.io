import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'AI 日报', alternates: { canonical: '/daily/' } };
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
