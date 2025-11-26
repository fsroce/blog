import { Link } from 'react-router-dom';

interface TagListProps {
  tags: string[];
  clickable?: boolean;
}

export default function TagList({ tags, clickable = true }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="tag-list">
      {tags.map(tag => (
        clickable ? (
          <Link key={tag} to={`/?tag=${tag}`} className="tag">
            {tag}
          </Link>
        ) : (
          <span key={tag} className="tag">
            {tag}
          </span>
        )
      ))}
    </div>
  );
}
