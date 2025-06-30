import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

function Profile() {
  const { user } = useAuth();
  const { showMessage } = useMessage();
  const [form, setForm] = useState({ username: '', email: '', school: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        school: user.school || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/profile', form);
      showMessage('Profile updated!', 'success');
    } catch (err) {
      const msg = err.response?.data?.error || 'Profile update failed.';
      showMessage(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat dark:bg-black/80"
      style={{ backgroundImage: "url('/image/profile.jpg')" }}
    >
      <Card className="w-[90%] max-w-3xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-2xl p-8">
        <CardHeader>
          <CardTitle className="text-zinc-800 dark:text-zinc-100">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">Username</label>
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
            <div className="flex justify-center">
              <Button type="submit" disabled={loading} className="w-40">
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default Profile;