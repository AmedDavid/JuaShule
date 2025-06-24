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
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
         
            <>
              <Link to="/questions" className="hover:underline">Questions</Link>
              <Link to="/resources" className="hover:underline">Resources</Link>
              <Link to="/groups" className="hover:underline">Groups</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;