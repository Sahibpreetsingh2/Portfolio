import { useEffect, useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const empty = { clientName: '', company: '', designation: '', rating: 5, message: '' };

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/testimonials?all=true').then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/testimonials', form);
      setForm(empty);
      setShowForm(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (t) => {
    await api.put(`/testimonials/${t._id}`, { published: !t.published });
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.delete(`/testimonials/${id}`);
    load();
  };

  if (loading) return <Loader label="Loading testimonials" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Testimonials</h1>
        <button onClick={() => setShowForm((s) => !s)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm hover:bg-signal dark:hover:bg-signal dark:hover:text-paper transition-colors">
          <Plus size={16} /> Add testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="border border-line dark:border-line-dark rounded-lg p-6 mb-8 grid sm:grid-cols-2 gap-4">
          <input required placeholder="Client name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal" />
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal" />
          <input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal" />
          <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal">
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
          </select>
          <textarea required placeholder="Review" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="sm:col-span-2 bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal resize-none" />
          <button type="submit" disabled={saving} className="sm:col-span-2 justify-self-start px-5 py-2.5 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm hover:bg-signal dark:hover:bg-signal dark:hover:text-paper transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save testimonial'}
          </button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t._id} className="border border-line dark:border-line-dark rounded-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < t.rating ? 'fill-signal text-signal' : 'text-ink/20 dark:text-paper/20'} />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => togglePublish(t)}>{t.published ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                <button onClick={() => remove(t._id)} className="text-clay"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm mb-3">"{t.message}"</p>
            <p className="text-xs text-ink/50 dark:text-paper/50">{t.clientName}{t.company && ` — ${t.company}`}</p>
          </div>
        ))}
        {items.length === 0 && <p className="text-ink/50 dark:text-paper/50">No testimonials yet.</p>}
      </div>
    </div>
  );
};

export default Testimonials;
