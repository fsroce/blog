import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsApi } from '../api';
import { useAuth } from '../context/AuthContext';

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsApi.getOne(id!);
        const post = response.data;

        if (post.author_id !== user?.id) {
          navigate('/');
          return;
        }

        setTitle(post.title);
        setContent(post.content);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchPost();
    } else {
      navigate('/login');
    }
  }, [id, isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await postsApi.update(id!, { title, content });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error && !title) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="card">
      <h1>Edit Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
