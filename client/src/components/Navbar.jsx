import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import ModeToggle from './mode-toggle';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full border-b bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-2 md:px-0">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition">JuaShule</Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="hidden md:inline hover:underline">Home</Link>
          {user ? (
            <>
              <Link to="/questions" className="hidden md:inline hover:underline">Questions</Link>
              <Link to="/resources" className="hidden md:inline hover:underline">Resources</Link>
              <Link to="/groups" className="hidden md:inline hover:underline">Groups</Link>
              <Link to="/profile" className="hidden md:inline hover:underline">Profile</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:inline hover:underline">Login</Link>
              <Link to="/signup" className="hidden md:inline hover:underline">Signup</Link>
            </>
          )}
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;