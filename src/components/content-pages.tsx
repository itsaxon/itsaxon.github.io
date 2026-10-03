'use client';
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { Article } from '@/lib/content';
import type { Navigate } from './navigation';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  MagnifyingGlass,
  BookOpen,
  Sparkle,
  CaretDown,
  CalendarBlank,
} from '@phosphor-icons/react';
import { articles, javaTopics, issues, BLOG_PAGE_SIZE, articleUrl } from '@/lib/content';
import { Link } from './navigation';
import { Reveal, ListEntrance, TopicSpotlight } from './motion-ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { dailyMarkdown } from '@/lib/generated-content';
import Magnet from './react-bits/magnet';
import { useMobileEffectsDisabled } from '@/lib/preferences';
import { useSettings } from './site-shell';
function getReportSections(markdown: string) {
  const content = markdown.replace(/^# .+\r?\n/, '');
  const heading = content.match(/^(#{1,2}) /m)?.[1] || '#';
  return content
    .split(new RegExp(`^${heading} `, 'm'))
    .slice(1)
    .map((part, index) => {
      const split = part.indexOf('\n');
      return {
        id: `report-${index + 1}`,
        title: part.slice(0, split).trim(),
        body: part
          .slice(split + 1)
          .replace(/\n---\s*$/, '')
          .trim(),
      };
    });
}
function FullDailyReport({ navigate, markdown }: { navigate: Navigate; markdown: string }) {
  const reportSections = getReportSections(markdown);
  const mobileEffectsDisabled = useMobileEffectsDisabled();
  const { playing } = useSettings();
  return (
    <div className="report-layout">
      <article className="report-body">
        {reportSections.map((section) => (
          <section id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => <h3>{children}</h3>,
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div
                    className="report-table"
                    tabIndex={0}
                    role="region"
                    aria-label="数据指标表格"
                  >
                    <table>{children}</table>
                  </div>
                ),
              }}
            >
              {section.body}
            </ReactMarkdown>
          </section>
        ))}
      </article>
      <aside className="report-outline">
        <details open>
          <summary>本期目录</summary>
          <nav aria-label="日报栏目目录">
            {reportSections.map((s) => (
              <Magnet
                key={s.id}
                disabled={mobileEffectsDisabled || !playing}
                magnetStrength={18}
                maxOffset={3}
                wrapperClassName="report-nav-magnet"
              >
                <a href={`#${s.id}`}>{s.title}</a>
              </Magnet>
            ))}
          </nav>
        </details>
        <Link className="text-link" to="/daily" navigate={navigate}>
          全部日报 <ArrowUpRight size={16} />
        </Link>
      </aside>
    </div>
  );
}

const names: Record<string, string> = { 博客: '网络日志', Java: 'Java 知识库', AI: 'AI 日报' };
const roots: Record<string, string> = { 博客: '/blog', Java: '/java', AI: '/daily' };
export function ArticleList({
  items,
  navigate,
  compact = false,
}: {
  items: Article[];
  navigate: Navigate;
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'compact-list' : 'page-articles'}>
      {items.map((a, index) => (
        <ListEntrance key={a.id} index={index}>
          <Link
            className={compact ? 'compact-item' : 'article'}
            key={a.id}
            to={articleUrl(a)}
            navigate={navigate}
          >
            <div className="article-meta">
              <span>{a.type}</span>
              <span>
                <time dateTime={a.publishedAt}>{a.publishedAt.replaceAll('-', '.')}</time>
              </span>
            </div>
            <h2>{a.title}</h2>
            {!compact && (
              <span className="read-link">
                阅读全文 <ArrowUpRight size={18} />
              </span>
            )}
          </Link>
        </ListEntrance>
      ))}
    </div>
  );
}

export function HomeContent({ navigate }: { navigate: Navigate }) {
  const latestBlogs = articles
    .filter((a) => a.category === '博客')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 2);
  const latest = issues.find((i) => i.supplied) || issues[0];
  return (
    <section className="home-content" id="reading" aria-label="内容入口">
      <Reveal>
        <h2 className="home-content-title">从这里，开始阅读</h2>
      </Reveal>
      <Reveal className="portal-row blog-portal">
        <div className="portal-heading">
          <h3>网络日志</h3>
          <Link className="portal-link" to="/blog" navigate={navigate}>
            查看全部 <ArrowRight size={18} />
          </Link>
        </div>
        <ArticleList compact items={latestBlogs} navigate={navigate} />
      </Reveal>
      <Reveal className="portal-row java-portal">
        <div className="portal-heading">
          <h3>Java 知识库</h3>
          <Link className="portal-link" to="/java" navigate={navigate}>
            查看全部 <ArrowRight size={18} />
          </Link>
        </div>
        <div className="portal-java">
          <div className="topic-shortcuts">
            {javaTopics.slice(0, 4).map((t) => (
              <Link to={`/java/topics/${t.id}`} navigate={navigate} key={t.id}>
                <span>{t.name}</span>
              </Link>
            ))}
          </div>
          <Link className="advanced-link" to="/java/advanced" navigate={navigate}>
            进阶知识 <ArrowRight size={18} />
          </Link>
        </div>
      </Reveal>
      <Reveal className="portal-row daily-portal">
        <div className="portal-heading">
          <h3>AI 日报</h3>
          <Link className="portal-link" to="/daily" navigate={navigate}>
            查看全部 <ArrowRight size={18} />
          </Link>
        </div>
        <div className="portal-issue">
          <div className="article-meta">
            <span>本期日报</span>
            <time dateTime={latest.date}>{latest.date.replaceAll('-', '.')}</time>
          </div>
          <Link to={`/daily/${latest.date}`} navigate={navigate}>
            <h3>{latest.title}</h3>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <h1 tabIndex={-1}>{title}</h1>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
function Breadcrumb({ children, navigate }: { children: ReactNode; navigate: Navigate }) {
  return (
    <nav className="breadcrumbs" aria-label="面包屑">
      <Link to="/" navigate={navigate}>
        首页
      </Link>
      <span>/</span>
      {children}
    </nav>
  );
}
export function EmptyContent({
  title = '暂时没有匹配的内容',
  description = '换一个关键词，或回到全部内容。',
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="content-empty">
      <BookOpen size={33} />
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

function Pager({
  page,
  totalPages,
  onPage,
  label,
}: {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
  label: string;
}) {
  if (totalPages < 2) return null;
  return (
    <nav className="pagination" aria-label={label}>
      <button disabled={page === 1} onClick={() => onPage(page - 1)}>
        <ArrowLeft size={17} />
        上一页
      </button>
      <span>
        第 {page} 页 / 共 {totalPages} 页
      </span>
      <button disabled={page === totalPages} onClick={() => onPage(page + 1)}>
        下一页
        <ArrowRight size={17} />
      </button>
    </nav>
  );
}

function pageNumber(params: URLSearchParams, totalPages: number) {
  return Math.min(totalPages, Math.max(1, Math.floor(Number(params.get('page'))) || 1));
}

export function BlogPage({ navigate, params }: { navigate: Navigate; params: URLSearchParams }) {
  const query = params.get('q') || '',
    category = params.get('category') || '全部';
  const categories = ['全部', '随笔', '工程实践', '读书笔记'];
  const items = articles
    .filter(
      (a) =>
        a.category === '博客' &&
        (category === '全部' || a.type === category) &&
        (a.title + a.desc).toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const totalPages = Math.max(1, Math.ceil(items.length / BLOG_PAGE_SIZE));
  const page = pageNumber(params, totalPages);
  const update = (patch: Record<string, string | number>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value && value !== '全部') next.set(key, String(value));
      else next.delete(key);
    }
    navigate(`/blog${next.size ? '?' + next : ''}`, { replace: 'q' in patch, scroll: false });
  };
  return (
    <section className="content-page blog-page">
      <Breadcrumb navigate={navigate}>
        <span>网络日志</span>
      </Breadcrumb>
      <PageHeading title="网络日志" />
      <div className="blog-workspace">
        <div>
          <div className="blog-tools">
            <div className="category-tabs" role="group" aria-label="博客分类">
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  className={category === c ? 'selected' : ''}
                  onClick={() => update({ category: c, page: '' })}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="inline-search">
              <MagnifyingGlass size={18} />
              <input
                aria-label="搜索博客"
                placeholder="搜索"
                value={query}
                onChange={(e) => update({ q: e.target.value, page: '' })}
              />
            </label>
          </div>
          <div className="list-summary">
            <span>{items.length} 篇文章</span>
            <span>按发布时间排列</span>
          </div>
          {items.length ? (
            <ArticleList
              items={items.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE)}
              navigate={navigate}
            />
          ) : (
            <EmptyContent>
              <button className="secondary" onClick={() => navigate('/blog', { scroll: false })}>
                清除筛选
              </button>
            </EmptyContent>
          )}
          {items.length > BLOG_PAGE_SIZE && (
            <nav className="pagination" aria-label="博客分页">
              <button
                disabled={page === 1}
                onClick={() => {
                  update({ page: page - 1 });
                  document.querySelector('.blog-tools')?.scrollIntoView({ block: 'start' });
                }}
              >
                <ArrowLeft size={17} />
                上一页
              </button>
              <span>
                第 {page} 页 / 共 {totalPages} 页
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => {
                  update({ page: page + 1 });
                  document.querySelector('.blog-tools')?.scrollIntoView({ block: 'start' });
                }}
              >
                下一页
                <ArrowRight size={17} />
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

export function JavaDirectory({
  navigate,
  activeTopic,
  activeArticle,
  mode,
}: {
  navigate: Navigate;
  activeTopic?: string | null;
  activeArticle?: string;
  mode?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <aside className={`java-sidebar ${open ? 'directory-open' : ''}`} aria-label="Java 知识目录">
      <button className="directory-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        知识目录 <CaretDown size={17} />
      </button>
      <div className="tree-links">
        <Link
          className={`directory-home ${mode === 'overview' ? 'current' : ''}`}
          to="/java"
          navigate={navigate}
        >
          知识总览
        </Link>
        {javaTopics.map((t) => {
          const entries = articles.filter((a) => a.category === 'Java' && a.topic === t.id);
          const preview = entries.slice(0, 6);
          if (activeArticle && !preview.some((a) => a.id === activeArticle)) {
            const current = entries.find((a) => a.id === activeArticle);
            if (current) preview[preview.length - 1] = current;
          }
          return (
            <details key={t.id} open={activeTopic === t.id}>
              <summary>
                <span>{t.name}</span>
                {!entries.length && <small>待整理</small>}
              </summary>
              <Link
                to={`/java/topics/${t.id}`}
                navigate={navigate}
                className={activeTopic === t.id && !activeArticle ? 'current' : ''}
              >
                主题概览
              </Link>
              {preview.map((a) => (
                <Link
                  key={a.id}
                  className={activeArticle === a.id ? 'current' : ''}
                  aria-current={activeArticle === a.id ? 'page' : undefined}
                  to={articleUrl(a)}
                  navigate={navigate}
                >
                  {a.title}
                </Link>
              ))}
              {entries.length > 6 && (
                <Link to={`/java/topics/${t.id}`} navigate={navigate}>
                  查看该主题全部 {entries.length} 篇笔记
                </Link>
              )}
            </details>
          );
        })}
        <div className="directory-special">
          <Link
            className={mode === 'advanced' ? 'current' : ''}
            to="/java/advanced"
            navigate={navigate}
          >
            进阶知识
          </Link>
          <Link
            className={mode === 'interviews' ? 'current' : ''}
            to="/java/interviews"
            navigate={navigate}
          >
            面试专题
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function JavaPage({
  navigate,
  topicId,
  mode = 'overview',
  params = new URLSearchParams(),
}: {
  navigate: Navigate;
  topicId?: string;
  mode?: string;
  params?: URLSearchParams;
}) {
  const topic = javaTopics.find((t) => t.id === topicId);
  if (topicId && !topic) return <NotFound navigate={navigate} />;
  const query = params.get('q') || '';
  const entries = articles.filter(
    (a) =>
      a.category === 'Java' &&
      (topic
        ? a.topic === topic.id
        : mode === 'advanced'
          ? a.advanced === true
          : mode === 'interviews'
            ? a.type === '面试专题'
            : true) &&
      (a.title + a.desc + a.type).toLowerCase().includes(query.toLowerCase()),
  );
  if (mode === 'updates') entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const totalPages = Math.max(1, Math.ceil(entries.length / 4)),
    page = pageNumber(params, totalPages);
  const base = topic ? `/java/topics/${topic.id}` : mode === 'overview' ? '/java' : `/java/${mode}`;
  const update = (patch: Record<string, string | number>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, String(value));
      else next.delete(key);
    }
    navigate(`${base}${next.size ? '?' + next : ''}`, { replace: 'q' in patch, scroll: false });
  };
  const title = topic
    ? topic.name
    : mode === 'advanced'
      ? '进阶知识'
      : mode === 'interviews'
        ? '面试，从理解开始。'
        : mode === 'updates'
          ? '最近更新'
          : query
            ? '搜索知识'
            : 'Java 知识库';
  return (
    <section className="content-page java-page">
      <Breadcrumb navigate={navigate}>
        {topic || mode !== 'overview' ? (
          <>
            <Link to="/java" navigate={navigate}>
              Java 知识库
            </Link>
            <span>/</span>
            <span>
              {topic?.name ||
                (mode === 'advanced'
                  ? '进阶知识'
                  : mode === 'interviews'
                    ? '面试专题'
                    : '最近更新')}
            </span>
          </>
        ) : (
          <span>Java 知识库</span>
        )}
      </Breadcrumb>
      <div className="java-layout">
        <JavaDirectory navigate={navigate} activeTopic={topicId} mode={mode} />
        <div className="java-main">
          <PageHeading title={title} />
          <label className="inline-search java-search">
            <MagnifyingGlass size={18} />
            <input
              aria-label="搜索知识笔记"
              placeholder="搜索"
              value={query}
              onChange={(e) => update({ q: e.target.value, page: '' })}
            />
          </label>
          {mode === 'overview' && !topic && !query ? (
            <>
              <div className="topic-index">
                {javaTopics.map((t, i) => {
                  const count = articles.filter(
                    (a) => a.category === 'Java' && a.topic === t.id,
                  ).length;
                  return (
                    <TopicSpotlight key={t.id}>
                      <Link to={`/java/topics/${t.id}`} navigate={navigate}>
                        <span className="topic-index-number">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <h2>{t.name}</h2>
                        </div>
                        <span className="topic-count">{count ? `${count} 篇笔记` : '待整理'}</span>
                        <ArrowUpRight size={20} />
                      </Link>
                    </TopicSpotlight>
                  );
                })}
              </div>
            </>
          ) : entries.length ? (
            <>
              <div className="list-summary">
                <span>
                  {entries.length} 篇{mode === 'interviews' ? '面试笔记' : '知识笔记'}
                </span>
                <span>{mode === 'updates' ? '按更新时间排列' : '按主题阅读'}</span>
              </div>
              <ArticleList items={entries.slice((page - 1) * 4, page * 4)} navigate={navigate} />
              <Pager
                page={page}
                totalPages={totalPages}
                label="知识笔记分页"
                onPage={(p) => {
                  update({ page: p });
                  document.querySelector('.java-search')?.scrollIntoView({ block: 'start' });
                }}
              />
            </>
          ) : (
            <EmptyContent
              title={query ? '没有找到匹配的笔记' : '这个主题，还在整理。'}
              description={
                query ? '换一个关键词，或清除搜索。' : '已预留目录位置，新的笔记会在这里归档。'
              }
            >
              {query ? (
                <button className="secondary" onClick={() => update({ q: '', page: '' })}>
                  清除搜索
                </button>
              ) : (
                <Link className="secondary" to="/java" navigate={navigate}>
                  回到知识总览 <ArrowRight size={17} />
                </Link>
              )}
            </EmptyContent>
          )}
        </div>
      </div>
    </section>
  );
}

function IssueArchive({ navigate, current }: { navigate: Navigate; current: string }) {
  return (
    <aside className="issue-sidebar">
      <h2>其他日报</h2>
      <span className="archive-month">最近期次</span>
      {issues.slice(0, 5).map((issue) => (
        <Link
          key={issue.date}
          className={current === issue.date ? 'current' : ''}
          to={`/daily/${issue.date}`}
          navigate={navigate}
        >
          <time dateTime={issue.date}>{issue.date.slice(5).replace('-', ' / ')}</time>
          <span>{issue.title}</span>
        </Link>
      ))}
      <Link className="text-link" to="/daily" navigate={navigate}>
        阅读全部日报 <ArrowUpRight size={16} />
      </Link>
    </aside>
  );
}

function DailyOverview({ navigate, params }: { navigate: Navigate; params: URLSearchParams }) {
  const month = params.get('month') || '全部';
  const filtered = issues.filter((i) => month === '全部' || i.date.startsWith(month));
  const totalPages = Math.max(1, Math.ceil(filtered.length / 12)),
    page = pageNumber(params, totalPages);
  const update = (patch: Record<string, string | number>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value && value !== '全部') next.set(key, String(value));
      else next.delete(key);
    }
    navigate(`/daily${next.size ? '?' + next : ''}`, { scroll: false });
  };
  return (
    <section className="content-page archive-page">
      <Breadcrumb navigate={navigate}>
        <span>AI 日报</span>
      </Breadcrumb>
      <PageHeading title="AI 日报" />
      <div className="archive-toolbar">
        <label>
          月份{' '}
          <select
            aria-label="归档月份"
            value={month}
            onChange={(e) => update({ month: e.target.value, page: '' })}
          >
            <option>全部</option>
            {[...new Set(issues.map((i) => i.date.slice(0, 7)))].map((m) => (
              <option key={m} value={m}>
                {m.replace('-', ' 年 ')} 月
              </option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length ? (
        <div className="issue-archive-list">
          {filtered.slice((page - 1) * 12, page * 12).map((i, index) => (
            <ListEntrance key={i.date} index={index}>
              <Link key={i.date} to={`/daily/${i.date}`} navigate={navigate}>
                <time dateTime={i.date}>
                  <span>{i.date.slice(8)}</span>
                  {i.date.slice(0, 7).replace('-', ' / ')}
                </time>
                <div>
                  <h2>{i.headline}</h2>
                </div>
                <ArrowUpRight size={23} />
              </Link>
            </ListEntrance>
          ))}
        </div>
      ) : (
        <EmptyContent title="这个月还没有日报" description="换一个月份，或阅读全部日报。">
          <button className="secondary" onClick={() => update({ month: '全部', page: '' })}>
            查看全部
          </button>
        </EmptyContent>
      )}
      <Pager
        page={page}
        totalPages={totalPages}
        label="日报归档分页"
        onPage={(p) => {
          update({ page: p });
          document.querySelector('.archive-toolbar')?.scrollIntoView({ block: 'start' });
        }}
      />
    </section>
  );
}

export function DailyPage({
  navigate,
  date,
  params,
}: {
  navigate: Navigate;
  date?: string | null;
  params?: URLSearchParams;
}) {
  if (!date) return <DailyOverview navigate={navigate} params={params || new URLSearchParams()} />;
  const issue = date
    ? issues.find((i) => i.date === date)
    : issues.find((i) => i.supplied) || issues[0];
  if (!issue) return <NotFound navigate={navigate} />;

  const index = issues.indexOf(issue),
    entries = issue.articleIds
      .map((id) => articles.find((a) => a.id === id))
      .filter((entry): entry is Article => Boolean(entry));
  const markdown = dailyMarkdown[issue.date] || '';
  const reportMetadata = {
    date: markdown.match(/发布日期：\s*(.+)/)?.[1].trim() || issue.date,
    type: markdown.match(/报告类型：\s*(.+)/)?.[1].trim(),
    range: markdown.match(/数据范围：\s*(.+)/)?.[1].trim(),
  };
  if (issue.supplied)
    return (
      <section className="content-page daily-page supplied-daily">
        <Breadcrumb navigate={navigate}>
          <Link to="/daily" navigate={navigate}>
            AI 日报
          </Link>
          <span>/</span>
          <span>{issue.date}</span>
        </Breadcrumb>
        <div className="daily-datebar">
          <span>
            <CalendarBlank size={18} />
            <time dateTime={issue.date}>{issue.date.replaceAll('-', ' / ')}</time>
          </span>
          <Link className="text-link" to="/daily" navigate={navigate}>
            阅读全部日报 <ArrowUpRight size={16} />
          </Link>
        </div>
        <PageHeading title={issue.title} />
        <div className="report-meta">
          <span>发布日期：{reportMetadata.date}</span>
          <span>报告类型：{reportMetadata.type}</span>
          <span>数据范围：{reportMetadata.range}</span>
          <a href={`/reports/${issue.date}.md`} download>
            下载原文 ↗
          </a>
        </div>
        <FullDailyReport navigate={navigate} markdown={markdown} />
      </section>
    );
  return (
    <section className="content-page daily-page">
      <Breadcrumb navigate={navigate}>
        <span>AI 日报</span>
      </Breadcrumb>
      <div className="daily-layout">
        <div>
          <div className="daily-datebar">
            <span>
              <CalendarBlank size={18} />
              <time dateTime={issue.date}>{issue.date.replaceAll('-', ' / ')}</time>
            </span>
            <label>
              选择日期
              <select
                aria-label="选择日报日期"
                value={issue.date}
                onChange={(e) => navigate(`/daily/${e.target.value}`)}
              >
                {issues.map((i) => (
                  <option key={i.date} value={i.date}>
                    {i.date}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <PageHeading title={issue.title} />
          <div className="issue-stories">
            {entries.map((a) => (
              <article key={a.id}>
                <div className="story-category">
                  <Sparkle size={19} />
                  {a.type}
                </div>
                <Link to={articleUrl(a)} navigate={navigate}>
                  <h2>{a.title}</h2>
                </Link>
                <p>{a.body[1]}</p>
                <Link to={articleUrl(a)} navigate={navigate} className="read-link">
                  阅读全文 <ArrowUpRight size={18} />
                </Link>
              </article>
            ))}
          </div>
          <nav className="issue-pagination" aria-label="日报期次导航">
            {issues[index + 1] ? (
              <Link to={`/daily/${issues[index + 1].date}`} navigate={navigate}>
                <ArrowLeft size={17} />
                上一期
              </Link>
            ) : (
              <span>已到最早一期</span>
            )}
            {issues[index - 1] ? (
              <Link to={`/daily/${issues[index - 1].date}`} navigate={navigate}>
                下一期
                <ArrowRight size={17} />
              </Link>
            ) : (
              <span>已是最新一期</span>
            )}
          </nav>
        </div>
        <IssueArchive navigate={navigate} current={issue.date} />
      </div>
    </section>
  );
}

export function ArticlePage({ article, navigate }: { article: Article; navigate: Navigate }) {
  const same = articles.filter((a) => a.category === article.category),
    index = same.findIndex((a) => a.id === article.id),
    prev = same[index - 1],
    next = same[index + 1];
  const [outlineOpen, setOutlineOpen] = useState(false);
  return (
    <section
      className={`content-page article-page ${article.category === 'Java' ? 'java-article' : article.category === '博客' ? 'journal-article' : ''}`}
    >
      <Breadcrumb navigate={navigate}>
        <Link to={roots[article.category]} navigate={navigate}>
          {names[article.category]}
        </Link>
        <span>/</span>
        <span>阅读正文</span>
      </Breadcrumb>
      <div className="detail-layout">
        {article.category === 'Java' && (
          <JavaDirectory
            navigate={navigate}
            activeTopic={article.topic}
            activeArticle={article.id}
          />
        )}
        <article className="detail-content">
          <div className="detail-meta">
            <span>{article.type}</span>
            <time dateTime={article.publishedAt}>{article.publishedAt.replaceAll('-', '.')}</time>
          </div>
          <h1 tabIndex={-1}>{article.title}</h1>
          <div className="detail-body markdown-body">
            {article.category === '博客' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.markdown || article.body.join('\n\n')}
              </ReactMarkdown>
            ) : (
              article.sections.map((s) => (
                <section key={s.id} id={s.id}>
                  <h2>{s.heading}</h2>
                  <p>{s.text}</p>
                </section>
              ))
            )}
          </div>
          <nav className="article-neighbours" aria-label="相邻文章">
            {prev ? (
              <Link to={articleUrl(prev)} navigate={navigate}>
                <small>
                  <ArrowLeft size={15} />
                  上一篇
                </small>
                <span>{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link to={articleUrl(next)} navigate={navigate}>
                <small>
                  下一篇
                  <ArrowRight size={15} />
                </small>
                <span>{next.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
          <Link
            className="text-link return-column"
            to={roots[article.category]}
            navigate={navigate}
          >
            <ArrowLeft size={17} />
            返回{names[article.category]}
          </Link>
        </article>
        {article.category !== '博客' && (
          <aside className={`article-outline ${outlineOpen ? 'outline-open' : ''}`}>
            <button
              className="directory-toggle"
              onClick={() => setOutlineOpen(!outlineOpen)}
              aria-expanded={outlineOpen}
            >
              本文目录
              <CaretDown size={16} />
            </button>
            <div className="outline-links">
              <h2>本文目录</h2>
              {article.sections.map((s) => (
                <a href={`#${s.id}`} key={s.id} onClick={() => setOutlineOpen(false)}>
                  {s.heading}
                </a>
              ))}
              <Link to={roots[article.category]} navigate={navigate} className="outline-back">
                返回栏目
              </Link>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}

export function NotFound({ navigate }: { navigate: Navigate }) {
  return (
    <section className="content-page missing-page">
      <PageHeading title="这一页，暂时找不到。" description="地址可能有误，或内容尚未整理。" />
      <Link className="secondary" to="/" navigate={navigate}>
        回到首页 <ArrowRight size={18} />
      </Link>
    </section>
  );
}
