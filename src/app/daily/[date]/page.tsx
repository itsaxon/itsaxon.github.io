import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { issues } from '@/lib/content';
import { DailyDetailView } from '@/components/page-views';
export const dynamicParams = false;
export function generateStaticParams() {
  return issues.map((issue) => ({ date: issue.date }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const issue = issues.find((issue) => issue.date === date);
  if (!issue) notFound();
  return {
    title: issue.title,
    description: issue.summary,
    alternates: { canonical: '/daily/' + date + '/' },
  };
}
export default async function Page({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  if (!issues.some((issue) => issue.date === date)) notFound();
  return <DailyDetailView date={date} />;
}
