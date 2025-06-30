import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordToken from './pages/ResetPasswordToken';
import Profile from './pages/Profile';
import Questions from './pages/Questions';
import Resources from './pages/Resources';
import Groups from './pages/Groups';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import MessageDisplay from './components/MessageDisplay';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <MessageProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <MessageDisplay />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/reset-password" element={<ResetPasswordToken />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
              <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
              <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
            </Routes>
          </main>
          <footer className="bg-primary text-white py-4 text-center">
            © 2025 JuaShule. All rights reserved.
          </footer>
        </div>
      </MessageProvider>
    </BrowserRouter>
  );
}

export default App;