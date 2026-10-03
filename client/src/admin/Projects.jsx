import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/projects/admin/all').then((res) => setProjects(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const togglePublish = async (id) => {
    await api.patch(`/projects/${id}/publish`);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  if (loading) return <Loader label="Loading projects" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Projects</h1>
        <Link to="/admin/projects/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm hover:bg-signal dark:hover:bg-signal dark:hover:text-paper transition-colors">
          <Plus size={16} /> New project
        </Link>
      </div>

      <div className="border border-line dark:border-line-dark rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink/5 dark:bg-paper/5 text-left">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Year</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Views</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-ink/50 dark:text-paper/50">No projects yet. Create your first one.</td></tr>
            )}
            {projects.map((p) => (
              <tr key={p._id} className="border-t border-line dark:border-line-dark">
                <td className="p-4">{p.title}</td>
                <td className="p-4 text-ink/60 dark:text-paper/60">{p.category}</td>
                <td className="p-4 text-ink/60 dark:text-paper/60">{p.year}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${p.published ? 'bg-signal/10 text-signal' : 'bg-ink/10 dark:bg-paper/10 text-ink/50 dark:text-paper/50'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-ink/60 dark:text-paper/60">{p.views}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => togglePublish(p._id)} title={p.published ? 'Unpublish' : 'Publish'}>
                      {p.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <Link to={`/admin/projects/${p._id}/edit`} title="Edit"><Pencil size={16} /></Link>
                    <button onClick={() => remove(p._id)} title="Delete" className="text-clay"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
