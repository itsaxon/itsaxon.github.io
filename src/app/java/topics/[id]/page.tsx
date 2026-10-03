import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { javaTopics } from '@/lib/content';
import { JavaView } from '@/components/page-views';
export const dynamicParams = false;
export function generateStaticParams() {
  return javaTopics.map((topic) => ({ id: topic.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const topic = javaTopics.find((topic) => topic.id === id);
  if (!topic) notFound();
  return {
    title: topic.name,
    description: topic.description,
    alternates: { canonical: '/java/topics/' + id + '/' },
  };
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!javaTopics.some((topic) => topic.id === id)) notFound();
  return (
    <Suspense fallback={<p role="status">正在加载知识笔记…</p>}>
      <JavaView topicId={id} />
    </Suspense>
  );
}
