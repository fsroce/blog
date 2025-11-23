import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsApi } from '../api';
import { useAsync } from '../hooks/useAsync';
import { Post } from '../types';

export default function Home() {
  const { data: posts, loading, error, execute } = useAsync<Post[]>([]);

  useEffect(() => {
    execute(() => postsApi.getAll().then(r => r.data));
  }, [execute]);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!posts?.length) {
    return (
      <div className="empty-state">
        <h2>No posts yet</h2>
        <p>Be the first to create a post!</p>
      </div>
    );
  }

  return (
    <div className="posts-list">
      {posts.map(post => (
        <article key={post.id} className="post-card">
          <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
          <div className="meta">
            By {post.author_username} • {new Date(post.created_at).toLocaleDateString()}
          </div>
          <p className="excerpt">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
