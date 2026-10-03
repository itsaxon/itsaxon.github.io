'use client';

import { useSearchParams } from 'next/navigation';
import type { Article } from '@/lib/content';
import { useNavigate } from './navigation';
import { HomeContent, BlogPage, JavaPage, DailyPage, ArticlePage, NotFound } from './content-pages';

export function HomeView() {
  return <HomeContent navigate={useNavigate()} />;
}
export function BlogView() {
  const params = useSearchParams();
  return <BlogPage navigate={useNavigate()} params={new URLSearchParams(params.toString())} />;
}
export function JavaView({ mode, topicId }: { mode?: string; topicId?: string }) {
  const params = useSearchParams();
  return (
    <JavaPage
      navigate={useNavigate()}
      mode={mode}
      topicId={topicId}
      params={new URLSearchParams(params.toString())}
    />
  );
}
export function DailyView() {
  const params = useSearchParams();
  return <DailyPage navigate={useNavigate()} params={new URLSearchParams(params.toString())} />;
}
export function DailyDetailView({ date }: { date: string }) {
  return <DailyPage navigate={useNavigate()} date={date} />;
}
export function ArticleView({ article }: { article: Article }) {
  return <ArticlePage article={article} navigate={useNavigate()} />;
}
export function MissingView() {
  return <NotFound navigate={useNavigate()} />;
}
