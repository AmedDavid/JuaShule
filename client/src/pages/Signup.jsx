import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', school: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Signup request using axios helper
      const res = await api.post('/students', form);
      showMessage('Signup successful! Logging you in...', 'success');
      // Auto-login after signup
      await login(form.email, form.password);
      navigate('/profile');
    } catch (err) {
      const msg = err.response?.data?.error || 'Signup failed. Please try again.';
      showMessage(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/image/background.jpg')" }}>
      <Card className="w-full max-w-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-2xl p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100 mb-2">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">UserName</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 pr-12 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full bg-transparent text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">School</label>
              <input
                type="text"
                name="school"
                value={form.school}
                onChange={handleChange}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Signup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default Signup;