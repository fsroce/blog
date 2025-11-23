import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsApi } from '../api';
import { useAuth } from '../context/AuthContext';

function CreatePost() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await postsApi.create({ title, content });
      navigate(`/posts/${response.data.id}`);
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>Create New Post</h1>
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
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
