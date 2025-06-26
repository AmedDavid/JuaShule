import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';

function Groups() {
  const { user } = useAuth();
  const { showMessage } = useMessage();
  const [groups, setGroups] = useState([]);
  const [memberships, setMemberships] = useState([]); // group ids the user is a member of
  const [groupMembers, setGroupMembers] = useState({}); // { [groupId]: [members] }
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) fetchMemberships();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    groups.forEach(g => fetchGroupMembers(g.id));
    // eslint-disable-next-line
  }, [groups]);

  const fetchGroups = async () => {
    try {
      const res = await api.get('/groups');
      setGroups(res.data);
    } catch (err) {
      showMessage('Failed to fetch groups', 'error');
    }
  };

  // Fetch memberships for the current user from backend
  const fetchMemberships = async () => {
    try {
      const res = await api.get('/groups/memberships');
      setMemberships(res.data); // array of group ids
    } catch (err) {
      // fallback: do nothing
    }
  };

  // Fetch members for a group
  const fetchGroupMembers = async (groupId) => {
    try {
      const res = await api.get(`/groups/${groupId}/members`);
      setGroupMembers(prev => ({ ...prev, [groupId]: res.data }));
    } catch (err) {
      // fallback: do nothing
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
        await api.put(`/groups/${editingId}`, form);
        showMessage('Group updated!', 'success');
      } else {
        await api.post('/groups', form);
        showMessage('Group created!', 'success');
      }
      setForm({ name: '', description: '' });
      setEditingId(null);
      fetchGroups();
      fetchMemberships();
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to submit group.';
      showMessage(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (g) => {
    setForm({ name: g.name, description: g.description || '' });
    setEditingId(g.id);
  };

  const handleDelete = async (id, isCreator) => {
    if (!window.confirm(isCreator ? 'Are you sure you want to delete this group?' : 'Are you sure you want to leave this group?')) return;
    try {
      await api.delete(`/groups/${id}`);
      showMessage(isCreator ? 'Group deleted!' : 'Left group!', 'success');
      fetchGroups();
      fetchMemberships();
    } catch (err) {
      showMessage(isCreator ? 'Failed to delete group.' : 'Failed to leave group.', 'error');
    }
  };

  const handleCancelEdit = () => {
    setForm({ name: '', description: '' });
    setEditingId(null);
  };

  const handleJoin = async (id) => {
    try {
      const res = await api.patch(`/groups/${id}/join`);
      if (res.data.message === 'Already a member' || res.data.message === 'Joined group') {
        setMemberships(prev => prev.includes(id) ? prev : [...prev, id]);
        showMessage('Joined group!', 'success');
        fetchGroups();
        fetchGroupMembers(id);
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Failed to join group.';
      showMessage(msg, 'error');
    }
  };

  // Helper: is user a member?
  const isMember = (g) => {
    return user && (user.id === g.creator_id || memberships.includes(g.id));
  };

   return (
  <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/groups.jpg')" }}
>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[85%] max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-6 ">{editingId ? 'Edit Group' : 'Create a Group'}</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Group Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Group Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
        </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-[30%] bg-primary text-white py-2 rounded"
              disabled={loading}
            >
              {editingId ? (loading ? 'Updating...' : 'Update') : (loading ? 'Creating...' : 'Create Group')}
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
        <h3 className="text-xl font-bold mb-4">All Groups</h3>
        {groups.length === 0 ? (
          <p className="text-gray-500">No groups yet.</p>
        ) : (
          <ul className="space-y-4">
            {groups.map((g) => (
              <li key={g.id} className="border-b pb-4">
                <div className="font-semibold">{g.name}</div>
                <div className="mb-2">{g.description}</div>
                {groupMembers[g.id] && (
                  <div className="text-sm text-gray-600 mb-2">
                    Members: {groupMembers[g.id].map(m => m.username).join(', ')}
                  </div>
                )}
                {user && user.id === g.creator_id && (
                  <div className="space-x-2">
                    <span className="text-green-700 font-semibold">You are the creator</span>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(g)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(g.id, true)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {user && user.id !== g.creator_id && isMember(g) && (
                  <div className="space-x-2">
                    <span className="text-green-700 font-semibold">You are a member</span>
                    <button
                      className="text-yellow-600 hover:underline"
                      onClick={() => handleDelete(g.id, false)}
                    >
                      Leave
                    </button>
                  </div>
                )}
                {user && !isMember(g) && (
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleJoin(g.id)}
                  >
                    Join
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
  </div>
);
}
export default Groups;