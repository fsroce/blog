import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsApi } from '../api';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author_username: string;
  created_at: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAll();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <h2>No posts yet</h2>
        <p>Be the first to create a post!</p>
      </div>
    );
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <article key={post.id} className="post-card">
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <div className="meta">
            By {post.author_username} • {new Date(post.created_at).toLocaleDateString()}
          </div>
          <p className="excerpt">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export default Home;
