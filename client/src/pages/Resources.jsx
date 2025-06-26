import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';

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
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/grouplib.jpg')" }}
>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[85%] max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-6 ">{editingId ? 'Edit Resource' : 'Share a resource'}</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Resource Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">File URL</label>
            <input
              type="text"
              name="file_url"
              value={form.file_url}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
        </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-[30%] bg-primary text-white py-2 rounded"
              disabled={loading}
            >
              {editingId ? (loading ? 'Updating...' : 'Update') : (loading ? 'Sharing...' : 'Share Resource')}
            </button>
            {editingId && (
              <button
                type="button"
                className="w-[30%] bg-gray-400 text-white py-2 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
        </button>
            )}
          </div>
      </form>
    </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[85%] max-w-4xl">
        <h3 className="text-xl font-bold mb-4">All Resources</h3>
        {resources.length === 0 ? (
          <p className="text-gray-500">No resources yet.</p>
        ) : (
          <ul className="space-y-4">
            {resources.map((r) => (
              <li key={r.id} className="border-b pb-4">
                <div className="font-semibold">{r.title}</div>
                <div className="mb-2">
                  <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {r.file_url}
                  </a>
                </div>
                {user && user.id === r.student_id && (
                  <div className="space-x-2">
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
      </div>
  </div>
);
}
export default Resources;