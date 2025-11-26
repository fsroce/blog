import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import TagInput from '../components/TagInput';

export default function CreatePost() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const { loading, error, execute } = useAsync();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault();
    const post = await execute(() =>
      postsApi.create({ title, content, published: saveAsDraft ? false : published, tags }).then(r => r.data)
    );
    if (post && typeof post === 'object' && 'id' in post) {
      navigate(`/posts/${(post as { id: string }).id}`);
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
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
            />
            <span>Publish immediately</span>
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Saving...' : published ? 'Publish' : 'Save as Draft'}
          </button>
          {published && (
            <button
              type="button"
              onClick={(e: any) => handleSubmit(e, true)}
              className="btn btn-secondary"
              disabled={loading}
            >
              Save as Draft
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
