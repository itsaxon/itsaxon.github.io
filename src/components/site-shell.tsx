'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowUpRight, MagnifyingGlass, Sun, Moon, List, X } from '@phosphor-icons/react';
import { articles, articleUrl } from '@/lib/content';
import {
  savePreference,
  useMotionChoice,
  useTheme,
  useSystemReducedMotion,
} from '@/lib/preferences';
import { MarginMark } from './margin-mark';
import { MotionPreference, SparkControls } from './motion-ui';
import { Link } from './navigation';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';

const Settings = createContext({ playing: false });
const categoryNames = { 博客: '网络日志', Java: 'Java 知识库', AI: 'AI 日报' };
export const useSettings = () => useContext(Settings);

function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const results = articles.filter((article) =>
    (article.title + article.desc + article.type + article.category)
      .toLowerCase()
      .includes(normalized),
  );
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <>
      <button aria-label="搜索文章" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <MagnifyingGlass size={20} />
        <kbd>⌘ K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document.querySelector<HTMLButtonElement>('[aria-label="搜索文章"]')?.focus();
          }}
        >
          <DialogTitle>寻找一点灵感。</DialogTitle>
          <DialogDescription className="sr-only">
            搜索网络日志、Java 知识库与 AI 日报，使用 Escape 关闭。
          </DialogDescription>
          <label className="search-field">
            <MagnifyingGlass size={22} />
            <input
              aria-label="搜索文章关键词"
              placeholder="搜索网络日志、Java 知识库、AI 日报…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p className="search-count" aria-live="polite">
            {results.length} 篇可以阅读的文章
            {results.length > 50 && ' · 展示前 50 篇，请缩小搜索范围'}
          </p>
          <div className="search-results">
            {results.slice(0, 50).map((article) => (
              <DialogClose asChild key={article.id}>
                <Link to={articleUrl(article)}>
                  <span>
                    {categoryNames[article.category]} · {article.type}
                  </span>
                  <h3>{article.title}</h3>
                  <ArrowUpRight size={20} />
                </Link>
              </DialogClose>
            ))}
            {!results.length && (
              <p className="no-results">没有找到匹配内容，试试「Java」或「好奇」。</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Header() {
  const pathname = usePathname();
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 50));
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    if (sentinel.current) observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);
  const [menu, setMenu] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  // Close mobile navigation immediately when navigation changes, without an effect.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenu(false);
  }
  const article = articles.find((article) => pathname.startsWith('/articles/' + article.id));
  const active =
    pathname.startsWith('/blog') || article?.category === '博客'
      ? '博客'
      : pathname.startsWith('/java') || article?.category === 'Java'
        ? 'Java'
        : pathname.startsWith('/daily') || article?.category === 'AI'
          ? 'AI'
          : null;
  useEffect(() => {
    if (!menu) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [menu]);
  return (
    <>
      <div className="header-space">
        <div ref={sentinel} className="header-sentinel" />
      </div>
      <header className={`floating-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header">
          <div className="header-left">
            <Link className="brand" to="/" aria-label="留白首页">
              <MarginMark />
              <span>
                留白<span className="brand-en"> Margin</span>
              </span>
            </Link>
            <span className="header-divider" aria-hidden="true">
              /
            </span>
            <nav
              onMouseLeave={() => setHovered(null)}
              id="primary-navigation"
              className={menu ? 'nav open' : 'nav'}
              aria-label="主导航"
            >
              {[
                { name: '网络日志', category: '博客', to: '/blog' },
                { name: 'Java 知识库', category: 'Java', to: '/java' },
                { name: 'AI 日报', category: 'AI', to: '/daily' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onMouseEnter={() => setHovered(item.category)}
                  onFocus={() => setHovered(item.category)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setMenu(false)}
                  className={active === item.category ? 'active' : ''}
                  aria-current={active === item.category ? 'page' : undefined}
                >
                  {(hovered ? hovered === item.category : active === item.category) && (
                    <motion.span
                      className="nav-highlight"
                      layoutId="navigation-highlight"
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                  <span className="nav-label">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <SparkControls>
            <SearchDialog />
            <span className="tool-line" />
            <button
              aria-label={theme === 'light' ? '切换深色模式' : '切换浅色模式'}
              onClick={() => savePreference('theme', theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Sun size={21} /> : <Moon size={21} />}
            </button>
            <button
              className="mobile-menu"
              aria-label={menu ? '关闭导航' : '打开导航'}
              aria-controls="primary-navigation"
              aria-expanded={menu}
              onClick={() => setMenu((value) => !value)}
            >
              {menu ? <X size={23} /> : <List size={23} />}
            </button>
          </SparkControls>
        </div>
      </header>
    </>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const motionChoice = useMotionChoice();
  const systemReduce = useSystemReducedMotion();
  const playing = motionChoice === null ? !systemReduce : motionChoice === 'true';
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.motion = playing ? 'playing' : 'paused';
  }, [playing]);
  return (
    <Settings.Provider
      value={{
        playing,
      }}
    >
      <MotionPreference.Provider value={playing}>
        <MotionConfig reducedMotion={playing ? 'never' : 'always'}>
          <div className="site">
            <a className="skip-link" href="#main-content">
              跳到正文
            </a>
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <footer>
              <Link className="brand" to="/">
                <MarginMark />
                <span>
                  留白<span className="brand-en"> Margin</span>
                </span>
              </Link>
              <span>一个开发者的数字花园</span>
              <span>为知识留白，让思考成形。</span>
            </footer>
          </div>
        </MotionConfig>
      </MotionPreference.Provider>
    </Settings.Provider>
  );
}
