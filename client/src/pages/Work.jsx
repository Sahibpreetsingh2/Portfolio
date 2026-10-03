import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';

const categories = ['All', 'Branding', 'UI/UX', 'Poster', 'Social Media', 'Packaging', 'Illustration'];

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (active !== 'All') params.set('category', active);
    if (search) params.set('search', search);

    const timeout = setTimeout(() => {
      api
        .get(`/projects?${params.toString()}`)
        .then((res) => setProjects(res.data.data))
        .catch(() => setProjects([]))
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [active, search]);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="container-page py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
        <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-2xl">Selected work across branding, product and campaign design.</h1>
        <div className="flex items-center gap-2 border-b border-line dark:border-line-dark pb-2 md:w-64">
          <Search size={16} className="text-ink/40 dark:text-paper/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects"
            className="bg-transparent outline-none text-sm w-full placeholder:text-ink/30 dark:placeholder:text-paper/30"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-14">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              active === c
                ? 'bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper'
                : 'border-line dark:border-line-dark hover:border-signal hover:text-signal'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Loading projects" />
      ) : projects.length === 0 ? (
        <p className="text-ink/50 dark:text-paper/50 py-16">No projects match that filter yet.</p>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {projects.map((p, i) => (
              <ProjectCard project={p} key={p._id} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.main>
  );
};

export default Work;
