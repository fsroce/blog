import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsApi } from '../api';
import { useAuth } from '../context/AuthContext';

interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_username: string;
  created_at: string;
  updated_at: string;
}

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsApi.getOne(id!);
        setPost(response.data);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postsApi.delete(id!);
      navigate('/');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error || !post) {
    return <div className="error">{error || 'Post not found'}</div>;
  }

  const isAuthor = user?.id === post.author_id;

  return (
    <article className="post-detail">
      <h1>{post.title}</h1>
      <div className="meta">
        By {post.author_username} • {new Date(post.created_at).toLocaleDateString()}
        {post.updated_at !== post.created_at && (
          <> • Updated {new Date(post.updated_at).toLocaleDateString()}</>
        )}
      </div>
      <div className="content">{post.content}</div>

      {isAuthor && (
        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="btn">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default PostDetail;
