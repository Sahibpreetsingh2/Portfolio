import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trash2, UploadCloud } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const emptyProject = {
  title: '', category: '', client: '', industry: '', services: '', timeline: '', role: '',
  year: new Date().getFullYear(), description: '', challenge: '', concept: '',
  tags: '', featured: false, published: false,
};

const ProjectForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyProject);
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    api.get('/projects/admin/all').then((res) => {
      const p = res.data.data.find((proj) => proj._id === id);
      if (p) {
        setProject(p);
        setForm({
          ...emptyProject,
          ...p,
          services: (p.services || []).join(', '),
          tags: (p.tags || []).join(', '),
        });
      }
      setLoading(false);
    });
  }, [id, isEdit]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      year: Number(form.year),
      services: form.services.split(',').map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (isEdit) {
        await api.put(`/projects/${id}`, payload);
        navigate('/admin/projects');
      } else {
        const res = await api.post('/projects', payload);
        navigate(`/admin/projects/${res.data.data._id}/edit`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save project');
    } finally {
      setSaving(false);
    }
  };

  const uploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    const res = await api.post(`/projects/${id}/cover`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    setProject(res.data.data);
  };

  const uploadGallery = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const fd = new FormData();
    files.forEach((f) => fd.append('images', f));
    const res = await api.post(`/projects/${id}/gallery`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    setProject(res.data.data);
  };

  const removeGalleryImage = async (imageId) => {
    const res = await api.delete(`/projects/${id}/gallery/${imageId}`);
    setProject(res.data.data);
  };

  if (loading) return <Loader label="Loading project" />;

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl mb-8">{isEdit ? 'Edit project' : 'New project'}</h1>

      <form onSubmit={submit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Title"><input required value={form.title} onChange={(e) => update('title', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" /></Field>
          <Field label="Category">
            <select required value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Client"><input value={form.client} onChange={(e) => update('client', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" /></Field>
          <Field label="Industry"><input value={form.industry} onChange={(e) => update('industry', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" /></Field>
          <Field label="Year"><input type="number" required value={form.year} onChange={(e) => update('year', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" /></Field>
          <Field label="Timeline"><input value={form.timeline} onChange={(e) => update('timeline', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" placeholder="e.g. 6 weeks" /></Field>
        </div>

        <Field label="Services (comma separated)">
          <input value={form.services} onChange={(e) => update('services', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" />
        </Field>
        <Field label="Tags (comma separated)">
          <input value={form.tags} onChange={(e) => update('tags', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" />
        </Field>

        <Field label="Description"><textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors resize-none" /></Field>
        <Field label="Challenge"><textarea rows={3} value={form.challenge} onChange={(e) => update('challenge', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors resize-none" /></Field>
        <Field label="Concept"><textarea rows={3} value={form.concept} onChange={(e) => update('concept', e.target.value)} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors resize-none" /></Field>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} /> Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => update('published', e.target.checked)} /> Published
          </label>
        </div>

        {error && <p className="text-sm text-clay">{error}</p>}

        <button type="submit" disabled={saving} className="px-6 py-3 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm hover:bg-signal dark:hover:bg-signal dark:hover:text-paper transition-colors disabled:opacity-50">
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
        </button>
      </form>

      {isEdit && (
        <div className="mt-14 space-y-10 border-t border-line dark:border-line-dark pt-10">
          <div>
            <p className="text-sm mb-3 text-ink/50 dark:text-paper/50">Cover image</p>
            {project?.coverImage?.url && (
              <img src={project.coverImage.url} alt="Cover" className="w-full max-w-md aspect-video object-cover rounded-md mb-3" />
            )}
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer px-4 py-2 border border-line dark:border-line-dark rounded-full hover:border-signal">
              <UploadCloud size={14} /> Upload cover
              <input type="file" accept="image/*" className="hidden" onChange={uploadCover} />
            </label>
          </div>

          <div>
            <p className="text-sm mb-3 text-ink/50 dark:text-paper/50">Gallery images</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
              {project?.galleryImages?.map((img) => (
                <div key={img._id} className="relative group aspect-square rounded-md overflow-hidden">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(img._id)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-ink/70 text-paper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer px-4 py-2 border border-line dark:border-line-dark rounded-full hover:border-signal">
              <UploadCloud size={14} /> Upload gallery images
              <input type="file" accept="image/*" multiple className="hidden" onChange={uploadGallery} />
            </label>
          </div>
        </div>
      )}

    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm mb-2 text-ink/60 dark:text-paper/60">{label}</label>
    {children}
  </div>
);

export default ProjectForm;
