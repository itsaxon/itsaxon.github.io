import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/content';
import { ArticleView } from '@/components/page-views';
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((article) => article.id === id);
  if (!article) notFound();
  return {
    title: article.title,
    description: article.desc,
    alternates: { canonical: '/articles/' + id + '/' },
    openGraph: {
      title: article.title,
      description: article.desc,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((article) => article.id === id);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
