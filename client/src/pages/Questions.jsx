import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

function Questions() {
  const { user } = useAuth();
  const { showMessage } = useMessage();
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ subject: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all questions
  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get('/questions');
      setQuestions(res.data);
    } catch (err) {
      showMessage('Failed to fetch questions', 'error');
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
        await api.put(`/questions/${editingId}`, form);
        showMessage('Question updated!', 'success');
      } else {
        await api.post('/questions', form);
        showMessage('Question posted!', 'success');
      }
      setForm({ subject: '', content: '' });
      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to submit question.';
      showMessage(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (q) => {
    setForm({ subject: q.subject, content: q.content });
    setEditingId(q.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.delete(`/questions/${id}`);
      showMessage('Question deleted!', 'success');
      fetchQuestions();
    } catch (err) {
      showMessage('Failed to delete question.', 'error');
    }
  };

  const handleCancelEdit = () => {
    setForm({ subject: '', content: '' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat dark:bg-black/80" style={{ backgroundImage: "url('/image/students.jpg')" }}>
      <Card className="w-[95%] max-w-2xl mb-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-2xl p-8">
        <CardHeader>
          <CardTitle className="text-zinc-800 dark:text-zinc-100">{editingId ? 'Edit Question' : 'Ask a Question'}</CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">{editingId ? 'Update your question details.' : 'Post a new academic question for the community.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">Your Question</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={3}
                className="w-full border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="w-40">
                {editingId ? (loading ? 'Updating...' : 'Update') : (loading ? 'Posting...' : 'Post Question')}
              </Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={handleCancelEdit} className="w-32">Cancel</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="w-[95%] max-w-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg rounded-2xl p-8">
        <CardHeader>
          <CardTitle className="text-zinc-800 dark:text-zinc-100">All Questions</CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">Browse, edit, or delete your questions.</CardDescription>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">No questions yet.</p>
          ) : (
            <ul className="space-y-6">
              {questions.map((q) => (
                <li key={q.id} className="border-b border-zinc-100 dark:border-zinc-700 pb-4 last:border-b-0">
                  <div className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">{q.subject}</div>
                  <div className="mb-2 text-zinc-500 dark:text-zinc-400">{q.content}</div>
                  {user && user.id === q.student_id && (
                    <div className="flex flex-wrap gap-2 items-center mt-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(q)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(q.id)}>Delete</Button>
                    </div>
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
export default Questions;