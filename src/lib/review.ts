'use client';

import { useSyncExternalStore } from 'react';
import type { Article } from './content';
import { REVIEW_TAGS } from './content';

export type Familiarity = 'rusty' | 'vague' | 'clear';

export const FAMILIARITY_LABELS: Record<Familiarity, string> = {
  rusty: '生疏',
  vague: '有印象但解释不清',
  clear: '能清楚解释与应用',
};

export const REVIEW_INTERVAL_DAYS: Record<Familiarity, number> = {
  rusty: 7,
  vague: 30,
  clear: 90,
};

export interface ReviewRecord {
  manual?: boolean;
  last?: string;
  level?: Familiarity;
  next?: string;
}

type ReviewQueue = Record<string, ReviewRecord>;

const STORAGE_KEY = 'java-review-queue-v1';
const EMPTY: ReviewQueue = {};
const listeners = new Set<() => void>();
let cache: ReviewQueue | null = null;

function readQueue(): ReviewQueue {
  if (cache) return cache;
  try {
    cache = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}') as ReviewQueue;
  } catch {
    cache = {};
  }
  return cache;
}

function writeQueue(next: ReviewQueue) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* 队列在缺少持久存储时仅保留在内存中。 */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

export function useReviewQueue(): ReviewQueue {
  return useSyncExternalStore(subscribe, readQueue, () => EMPTY);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(date: string, days: number): string {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}

/** 标签驱动（重点 / 易混淆）或手动加入的文章进入回顾队列。 */
export function isInReviewQueue(article: Article, queue: ReviewQueue): boolean {
  return Boolean(queue[article.id]?.manual) || Boolean(article.tags?.some((t) => REVIEW_TAGS.includes(t)));
}

export function isTaggedReview(article: Article): boolean {
  return Boolean(article.tags?.some((t) => REVIEW_TAGS.includes(t)));
}

export function isDue(article: Article, queue: ReviewQueue, date = today()): boolean {
  if (!isInReviewQueue(article, queue)) return false;
  const record = queue[article.id];
  return !record?.next || record.next <= date;
}

export function markReviewed(id: string, level: Familiarity) {
  const date = today();
  const queue = { ...readQueue() };
  queue[id] = {
    ...queue[id],
    last: date,
    level,
    next: addDays(date, REVIEW_INTERVAL_DAYS[level]),
  };
  writeQueue(queue);
}

/** 手动加入 / 移出回顾队列；标签驱动的文章不受影响。 */
export function toggleReview(id: string) {
  const queue = { ...readQueue() };
  const record = queue[id];
  if (record?.manual) {
    const rest: ReviewRecord = { ...record };
    delete rest.manual;
    queue[id] = rest;
    if (!rest.last && !rest.next) delete queue[id];
  } else {
    queue[id] = { ...record, manual: true };
  }
  writeQueue(queue);
}
