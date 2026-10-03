import { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/contact').then((res) => setMessages(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleRead = async (m) => {
    await api.patch(`/contact/${m._id}/${m.status === 'unread' ? 'read' : 'unread'}`);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/contact/${id}`);
    load();
  };

  if (loading) return <Loader label="Loading messages" />;

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Messages</h1>
      <div className="space-y-3">
        {messages.length === 0 && <p className="text-ink/50 dark:text-paper/50">No messages yet.</p>}
        {messages.map((m) => (
          <div key={m._id} className={`border rounded-lg p-6 ${m.status === 'unread' ? 'border-signal/40 bg-signal/5' : 'border-line dark:border-line-dark'}`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-medium">{m.name} {m.company && <span className="text-ink/40 dark:text-paper/40 font-normal">— {m.company}</span>}</p>
                <p className="text-sm text-ink/50 dark:text-paper/50">{m.email}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => toggleRead(m)} title={m.status === 'unread' ? 'Mark as read' : 'Mark as unread'}>
                  {m.status === 'unread' ? <Mail size={16} /> : <MailOpen size={16} />}
                </button>
                <button onClick={() => remove(m._id)} className="text-clay"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="flex gap-4 text-xs text-ink/50 dark:text-paper/50 mb-3">
              <span>{m.projectType}</span>
              <span>{m.budget}</span>
              <span>{new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-ink/70 dark:text-paper/70">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
