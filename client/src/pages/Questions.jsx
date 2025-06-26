import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessage } from '../context/MessageContext';
import api from '../utils/api';

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
  <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/image/students.jpg')" }}
>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[85%] max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-6 ">{editingId ? 'Edit Question' : 'Ask a Question'}</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Your Question</label>
            <input
              type="text"
              name="content"
              value={form.content}
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
              {editingId ? (loading ? 'Updating...' : 'Update') : (loading ? 'Posting...' : 'Post Question')}
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
        <h3 className="text-xl font-bold mb-4">All Questions</h3>
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions yet.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q) => (
              <li key={q.id} className="border-b pb-4">
                <div className="font-semibold">{q.subject}</div>
                <div className="mb-2">{q.content}</div>
                {user && user.id === q.student_id && (
                  <div className="space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(q)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(q.id)}
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
export default Questions;