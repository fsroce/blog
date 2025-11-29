export function SkeletonPost() {
  return (
    <article className="post-card skeleton">
      <div className="skeleton-title" />
      <div className="skeleton-meta" />
      <div className="skeleton-text" />
      <div className="skeleton-text" />
      <div className="skeleton-tags" />
    </article>
  );
}

export function SkeletonPostDetail() {
  return (
    <article className="post-detail skeleton">
      <div className="skeleton-title skeleton-title-large" />
      <div className="skeleton-meta" />
      <div className="skeleton-tags" />
      <div className="skeleton-text" />
      <div className="skeleton-text" />
      <div className="skeleton-text" />
      <div className="skeleton-text" />
      <div className="skeleton-text skeleton-text-short" />
    </article>
  );
}
