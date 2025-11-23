import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          Blog
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>

        <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu} />

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
            ✕
          </button>

          {isAuthenticated ? (
            <>
              <span>Hello, {user?.username}</span>
              <Link to="/create" className="btn" onClick={closeMenu}>
                New Post
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Login</Link>
              <Link to="/register" className="btn" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
