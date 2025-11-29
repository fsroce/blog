import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { Post } from '../types';
import TagInput from '../components/TagInput';

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { loading, error, execute, setError } = useAsync<Post>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    execute(async () => {
      const { data: post } = await postsApi.getOne(id!);
      if (post.author_id !== user?.id) {
        navigate('/');
        throw new Error('Not authorized');
      }
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags || []);
      return post;
    });
  }, [id, isAuthenticated, user, navigate, execute]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await postsApi.update(id!, { title, content, tags });
      navigate(`/posts/${id}`);
    } catch {
      setError('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error && !title) return <div className="error">{error}</div>;

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
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content (Markdown supported)</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <TagInput tags={tags} onChange={setTags} />
        </div>
        <button type="submit" className="btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
