import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Groups from './pages/Groups';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Questions from './pages/Questions';
import ResetPassword from './pages/ResetPassword';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              {<Route path="/login" element={<Login />} /> }
              { <Route path="/signup" element={<Signup />} /> }
               { <Route path="/groups" element={<Groups />} /> }
                { <Route path="/resources" element={<Resources />} /> }
                { <Route path="/profile" element={<Profile />} /> }
                 { <Route path="/questions" element={<Questions />} /> }
                   { <Route path="/resetpassword" element={<ResetPassword />} /> }
            </Routes>
          </main>
          <footer className="bg-primary text-white py-4 text-center">
            © 2025 JuaShule. All rights reserved.
          </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;