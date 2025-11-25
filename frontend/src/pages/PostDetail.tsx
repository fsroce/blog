import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { postsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { Post } from '../types';
import CodeBlock from '../components/CodeBlock';
import { calculateReadingTime, formatDate } from '../utils';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: post, loading, error, execute, setError } = useAsync<Post>();

  useEffect(() => {
    execute(() => postsApi.getOne(id!).then(r => r.data));
  }, [id, execute]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await postsApi.delete(id!);
      navigate('/');
    } catch {
      setError('Failed to delete post');
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error || !post) return <div className="error">{error || 'Post not found'}</div>;

  const isAuthor = user?.id === post.author_id;
  const readingTime = calculateReadingTime(post.content);

  return (
    <article className="post-detail">
      <h1>{post.title}</h1>
      <div className="meta">
        By {post.author_username} • {formatDate(post.created_at)}
        {post.updated_at !== post.created_at && (
          <> • Updated {formatDate(post.updated_at)}</>
        )}
        <span className="reading-time"> • {readingTime} min read</span>
      </div>
      <div className="content markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlock
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      {isAuthor && (
        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="btn">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      )}
    </article>
  );
}
