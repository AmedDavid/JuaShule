import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat dark:bg-black/80" style={{ backgroundImage: "url('/image/groups.jpg')" }}>
      <Card className="w-[90%] max-w-2xl mb-8 bg-white/90 dark:bg-zinc-900/90 shadow-xl">
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Group' : 'Create a Group'}</CardTitle>
          <CardDescription>{editingId ? 'Update your group details.' : 'Start a new study group for collaboration.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Group Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 bg-background text-foreground dark:bg-zinc-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Group Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 bg-background text-foreground dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="w-32">
                {editingId ? (loading ? 'Updating...' : 'Update') : (loading ? 'Creating...' : 'Create Group')}
              </Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={handleCancelEdit} className="w-32">Cancel</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="w-[90%] max-w-2xl bg-white/90 dark:bg-zinc-900/90 shadow-xl">
        <CardHeader>
          <CardTitle>All Groups</CardTitle>
          <CardDescription>Browse, join, or manage study groups.</CardDescription>
        </CardHeader>
        <CardContent>
          {groups.length === 0 ? (
            <p className="text-muted-foreground">No groups yet.</p>
          ) : (
            <ul className="space-y-6">
              {groups.map((g) => (
                <li key={g.id} className="border-b pb-4 last:border-b-0">
                  <div className="font-semibold text-lg">{g.name}</div>
                  <div className="mb-2 text-muted-foreground">{g.description}</div>
                  {groupMembers[g.id] && (
                    <div className="text-xs text-muted-foreground mb-2">
                      <span className="font-medium">Members:</span> {groupMembers[g.id].map(m => m.username).join(', ')}
                    </div>
                  )}
                  {user && user.id === g.creator_id && (
                    <div className="flex flex-wrap gap-2 items-center mt-2">
                      <span className="text-green-700 dark:text-green-400 font-semibold">You are the creator</span>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(g)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(g.id, true)}>Delete</Button>
                    </div>
                  )}
                  {user && user.id !== g.creator_id && isMember(g) && (
                    <div className="flex flex-wrap gap-2 items-center mt-2">
                      <span className="text-green-700 dark:text-green-400 font-semibold">You are a member</span>
                      <Button variant="secondary" size="sm" onClick={() => handleDelete(g.id, false)}>Leave</Button>
                    </div>
                  )}
                  {user && !isMember(g) && (
                    <Button variant="default" size="sm" onClick={() => handleJoin(g.id)} className="mt-2">Join</Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default Groups;