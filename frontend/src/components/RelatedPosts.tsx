import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsApi } from '../api';
import { useAsync } from '../hooks/useAsync';
import { Post } from '../types';
import { formatDate, calculateReadingTime } from '../utils';

interface RelatedPostsProps {
  postId: string;
}

export default function RelatedPosts({ postId }: RelatedPostsProps) {
  const { data: posts, loading, execute } = useAsync<Post[]>([]);

  useEffect(() => {
    execute(() => postsApi.getRelated(postId).then(r => r.data));
  }, [postId, execute]);

  if (loading || !posts || posts.length === 0) return null;

  return (
    <div className="related-posts">
      <h2>Related Posts</h2>
      <div className="posts-list">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
            <div className="meta">
              By {post.author_username} • {formatDate(post.created_at)} • {calculateReadingTime(post.content)} min read
            </div>
            <p className="excerpt">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
