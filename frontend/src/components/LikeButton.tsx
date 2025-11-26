import { useState } from 'react';
import { postsApi } from '../api';
import { useAuth } from '../context/AuthContext';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const { isAuthenticated } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like posts');
      return;
    }

    setLoading(true);
    try {
      const response = await postsApi.toggleLike(postId);
      setLikes(response.data.likes);
      setLiked(response.data.liked);
    } catch (error) {
      console.error('Like error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`like-button ${liked ? 'liked' : ''}`}
      disabled={loading}
    >
      <span className="like-icon">{liked ? '❤️' : '🤍'}</span>
      <span className="like-count">{likes}</span>
    </button>
  );
}
