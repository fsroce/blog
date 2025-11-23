import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Blog
        </Link>
        <nav className="nav">
          {isAuthenticated ? (
            <>
              <span>Hello, {user?.username}</span>
              <Link to="/create" className="btn">
                New Post
              </Link>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn">
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
