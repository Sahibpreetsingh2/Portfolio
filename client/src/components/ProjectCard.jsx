import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
  >
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-ink/5 dark:bg-paper/5 aspect-[4/5]">
        <img
          src={project.coverImage?.url}
          alt={project.coverImage?.alt || project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
        <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paper text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl leading-snug">{project.title}</h3>
          <p className="text-sm text-ink/50 dark:text-paper/50 mt-1">{project.category}</p>
        </div>
        <span className="text-sm text-ink/40 dark:text-paper/40 shrink-0">{project.year}</span>
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;
