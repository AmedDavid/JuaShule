import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">JuaShule</Link>
        <div className="space-x-8">
          <Link to="/" className="hover:text-accent transition">Home</Link>
         
            <>
              <Link to="/questions" className="hover:text-accent transition">Questions</Link>
              <Link to="/resources" className="hover:text-accent transition">Resources</Link>
              <Link to="/groups" className="hover:text-accent transition">Groups</Link>
              <Link to="/profile" className="hover:text-accent transition">Profile</Link>
              <button onClick={handleLogout} className="hover:text-accent transition">Logout</button>
            </>
          
            <>
              <Link to="/login" className="hover:text-accent transition">Login</Link>
              <Link to="/signup" className="hover:text-accent transition">Signup</Link>
            </>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;