import { useEffect, useState } from 'react';
import { FolderKanban, CheckCircle2, FileEdit, Mail, Star, Eye } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const cards = [
  { key: 'totalProjects', label: 'Total projects', icon: FolderKanban },
  { key: 'publishedProjects', label: 'Published', icon: CheckCircle2 },
  { key: 'draftProjects', label: 'Drafts', icon: FileEdit },
  { key: 'totalMessages', label: 'Messages', icon: Mail },
  { key: 'totalTestimonials', label: 'Testimonials', icon: Star },
  { key: 'totalViews', label: 'Total views', icon: Eye },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => setStats(res.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading dashboard" />;

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.key} className="border border-line dark:border-line-dark rounded-lg p-6">
            <c.icon size={18} className="text-signal mb-4" />
            <p className="font-display text-3xl">{stats?.[c.key] ?? 0}</p>
            <p className="text-sm text-ink/50 dark:text-paper/50 mt-1">{c.label}</p>
          </div>
        ))}
      </div>
      {stats?.unreadMessages > 0 && (
        <p className="text-sm text-signal mt-6">{stats.unreadMessages} unread message{stats.unreadMessages > 1 ? 's' : ''} waiting in your inbox.</p>
      )}
    </div>
  );
};

export default Dashboard;
