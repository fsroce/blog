import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { postsApi } from '../api';
import { useAsync } from '../hooks/useAsync';
import { Post } from '../types';
import SearchBar from '../components/SearchBar';
import TagList from '../components/TagList';
import { SkeletonPost } from '../components/Skeleton';
import { calculateReadingTime, formatDate } from '../utils';

export default function Home() {
  const { data: posts, loading, error, execute } = useAsync<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag');

  useEffect(() => {
    execute(() => postsApi.getAll(selectedTag || undefined).then(r => r.data));
  }, [execute, selectedTag]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!searchQuery) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author_username.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  if (loading) {
    return (
      <div className="posts-list">
        {[1, 2, 3].map(i => <SkeletonPost key={i} />)}
      </div>
    );
  }

  if (error) return <div className="error">{error}</div>;

  return (
    <>
      {selectedTag && (
        <div className="filter-info">
          Filtered by tag: <strong>{selectedTag}</strong>
          <button onClick={() => setSearchParams({})} className="btn-link">Clear filter</button>
        </div>
      )}

      {posts && posts.length > 0 && (
        <SearchBar onSearch={setSearchQuery} />
      )}

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <h2>{searchQuery ? 'No posts found' : 'No posts yet'}</h2>
          <p>{searchQuery ? 'Try a different search term' : 'Be the first to create a post!'}</p>
        </div>
      ) : (
        <div className="posts-list">
          {filteredPosts.map(post => (
            <article key={post.id} className="post-card">
              <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
              <div className="meta">
                By {post.author_username} • {formatDate(post.created_at)} • {calculateReadingTime(post.content)} min read
                {post.viewCount > 0 && <> • {post.viewCount} views</>}
              </div>
              <p className="excerpt">{post.excerpt}</p>
              <TagList tags={post.tags} />
              <div className="post-stats">
                <span className="likes">❤️ {post.likes}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
