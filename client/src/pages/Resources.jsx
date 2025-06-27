import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

function Resources() {
  const { user } = useAuth();
  const { showMessage } = useMessage();
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ title: '', file_url: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get('/resources');
      setResources(res.data);
    } catch (err) {
      showMessage('Failed to fetch resources', 'error');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/resources/${editingId}`, form);
        showMessage('Resource updated!', 'success');
      } else {
        await api.post('/resources', form);
        showMessage('Resource shared!', 'success');
      }
      setForm({ title: '', file_url: '' });
      setEditingId(null);
      fetchResources();
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to submit resource.';
      showMessage(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (r) => {
    setForm({ title: r.title, file_url: r.file_url });
    setEditingId(r.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      await api.delete(`/resources/${id}`);
      showMessage('Resource deleted!', 'success');
      fetchResources();
    } catch (err) {
      showMessage('Failed to delete resource.', 'error');
    }
  };

  const handleCancelEdit = () => {
    setForm({ title: '', file_url: '' });
    setEditingId(null);
  };

 return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat dark:bg-black/80"
    style={{ backgroundImage: "url('/image/grouplib.jpg')" }}
  >
    <div className="w-full max-w-4xl space-y-8 px-4">
      <Card className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-2xl p-8">
        <CardHeader>
          <CardTitle className="text-zinc-800 dark:text-zinc-100">
            {editingId ? 'Edit Resource' : 'Share a Resource'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">Resource Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">File URL</label>
              <input
                type="text"
                name="file_url"
                value={form.file_url}
                onChange={handleChange}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex space-x-2 justify-center">
              <Button type="submit" disabled={loading} className="w-40">
                {editingId ? (loading ? 'Updating...' : 'Update') : (loading ? 'Sharing...' : 'Share Resource')}
              </Button>
              {editingId && (
                <Button type="button" variant="secondary" className="w-40" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-2xl p-8">
        <CardHeader>
          <CardTitle className="text-zinc-800 dark:text-zinc-100">All Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {resources.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No resources yet.</p>
          ) : (
            <ul className="space-y-6">
              {resources.map((r) => (
                <li key={r.id} className="border-b border-zinc-200 dark:border-zinc-700 pb-4">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-100">{r.title}</div>
                  <div className="mb-2">
                    <a
                      href={r.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {r.file_url}
                    </a>
                  </div>
                  {user && user.id === r.student_id && (
                    <div className="space-x-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(r)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
);
}

export default Resources;