import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.origin + url;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const nativeShare = async () => {
    if ('share' in navigator) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <div className="share-button">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="btn btn-secondary"
      >
        Share 🔗
      </button>

      {showMenu && (
        <div className="share-menu">
          <button onClick={copyToClipboard} className="share-option">
            {copied ? '✓ Copied!' : '📋 Copy Link'}
          </button>
          <button onClick={shareOnTwitter} className="share-option">
            🐦 Twitter
          </button>
          <button onClick={shareOnLinkedIn} className="share-option">
            💼 LinkedIn
          </button>
          {'share' in navigator && (
            <button onClick={nativeShare} className="share-option">
              📱 More Options
            </button>
          )}
        </div>
      )}
    </div>
  );
}
