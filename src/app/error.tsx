'use client';
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="content-page">
      <div className="page-heading">
        <h1>内容暂时无法打开。</h1>
        <p>请重试，或返回首页继续阅读。</p>
      </div>
      <button className="secondary" onClick={reset}>
        重新加载
      </button>
    </section>
  );
}
