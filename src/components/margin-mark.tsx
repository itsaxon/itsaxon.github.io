// Original brand mark: offset open frames leave a passage through the centre.
export function MarginMark({ className = '' }: { className?: string }) {
  return (
    <span className={`margin-mark ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
