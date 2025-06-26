import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';

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
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/profile.jpg')" }}
>
    <div className="bg-white p-10 rounded-2xl shadow-lg  w-[85%] max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 ">Profile</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
        </div>
          <div className="mb-6">
          <label className="block text-gray-700 mb-1">School</label>
            <input
              type="text"
              name="school"
              value={form.school}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
        </div>
        <div className="flex justify-center">
            <button
              type="submit"
              className="w-[30%] bg-primary  text-white text-center py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
        </button>
       </div>
      </form>
    </div>
  </div>
);
}
export default Profile;