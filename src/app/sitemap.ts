import type { MetadataRoute } from 'next';
import { articles, javaTopics, issues } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://itsaxon.github.io';
  return [
    ...[
      '/',
      '/blog/',
      '/java/',
      '/java/advanced/',
      '/java/interviews/',
      '/java/updates/',
      '/daily/',
      '/daily/archive/',
    ].map((route) => ({ url: base + route })),
    ...articles.map((article) => ({
      url: base + '/articles/' + article.id + '/',
      lastModified: article.updatedAt,
    })),
    ...javaTopics.map((topic) => ({ url: base + '/java/topics/' + topic.id + '/' })),
    ...issues.map((issue) => ({
      url: base + '/daily/' + issue.date + '/',
      lastModified: issue.date,
    })),
  ];
}
