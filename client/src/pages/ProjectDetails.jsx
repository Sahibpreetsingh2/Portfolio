import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import NotFound from './NotFound';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    api
      .get(`/projects/${slug}`)
      .then((res) => {
        setProject(res.data.data);
        setNextProject(res.data.next);
        document.title = `${res.data.data.title} — S.S.Sohanpal`;
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader label="Loading project" />;
  if (error || !project) return <NotFound />;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section className="container-page pt-14 pb-10">
        <p className="text-sm text-signal mb-4">{project.category}</p>
        <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-4xl mb-8">{project.title}</h1>
        <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-ink/50 dark:text-paper/50">
          {project.client && <span>Client — {project.client}</span>}
          <span>Year — {project.year}</span>
        </div>
      </section>

      <div className="aspect-[16/9] w-full overflow-hidden bg-ink/5 dark:bg-paper/5">
        <img src={project.coverImage?.url} alt={project.coverImage?.alt || project.title} className="w-full h-full object-cover" />
      </div>

      {/* Overview */}
      <section className="container-page py-20 grid md:grid-cols-4 gap-8 border-b border-line dark:border-line-dark">
        {[
          { label: 'Client', value: project.client },
          { label: 'Industry', value: project.industry },
          { label: 'Services', value: project.services?.join(', ') },
          { label: 'Timeline', value: project.timeline },
        ]
          .filter((f) => f.value)
          .map((f) => (
            <div key={f.label}>
              <p className="text-sm text-ink/40 dark:text-paper/40 mb-2">{f.label}</p>
              <p className="font-display text-lg">{f.value}</p>
            </div>
          ))}
      </section>

      {/* Challenge & concept */}
      <section className="container-page py-20 grid md:grid-cols-2 gap-16 border-b border-line dark:border-line-dark">
        {project.challenge && (
          <div>
            <h2 className="font-display text-2xl mb-4">The challenge</h2>
            <p className="text-ink/60 dark:text-paper/60 leading-relaxed">{project.challenge}</p>
          </div>
        )}
        {project.concept && (
          <div>
            <h2 className="font-display text-2xl mb-4">The concept</h2>
            <p className="text-ink/60 dark:text-paper/60 leading-relaxed">{project.concept}</p>
          </div>
        )}
      </section>

      {/* Process */}
      {project.process?.length > 0 && (
        <section className="container-page py-20 border-b border-line dark:border-line-dark">
          <h2 className="font-display text-2xl mb-10">Design process</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {project.process.map((step, i) => (
              <div key={step.stage}>
                <p className="text-signal text-sm mb-2">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-lg mb-2">{step.stage}</h3>
                <p className="text-sm text-ink/60 dark:text-paper/60 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
{project.galleryImages?.length > 0 && (
  <section className="container-page py-20 border-b border-line dark:border-line-dark">

    <div className="mb-12">
      <p className="text-sm text-signal mb-3">
        Selected work
      </p>

      <h2 className="font-display text-3xl md:text-5xl">
        Visual exploration
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...project.galleryImages]
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((image, index) => (
          <motion.div
            key={image._id || `${image.url}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden bg-ink/5 dark:bg-paper/5"
          >
            <img
              src={image.url}
              alt={image.alt || `${project.title} gallery image ${index + 1}`}
              className="w-full h-auto block object-cover transition-transform duration-500 hover:scale-[1.02]"
              loading="lazy"
            />
          </motion.div>
        ))}
    </div>

  </section>
)}

      {/* Next project */}
      {nextProject && (
        <Link to={`/projects/${nextProject.slug}`} className="group block border-t border-line dark:border-line-dark">
          <div className="container-page py-20 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink/40 dark:text-paper/40 mb-3">Next project</p>
              <h2 className="font-display text-3xl md:text-5xl group-hover:text-signal transition-colors">{nextProject.title}</h2>
            </div>
            <ArrowRight size={28} className="shrink-0 group-hover:translate-x-2 transition-transform" />
          </div>
        </Link>
      )}
    </motion.main>
  );
};

export default ProjectDetails;
