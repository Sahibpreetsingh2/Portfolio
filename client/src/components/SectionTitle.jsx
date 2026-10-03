import { motion } from 'framer-motion';

const SectionTitle = ({ index, title, description, align = 'left' }) => (
  <div className={`mb-14 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="flex items-baseline gap-3"
    >
      {index && <span className="text-sm text-signal font-medium">{index}</span>}
      <h2 className="font-display text-3xl md:text-4xl leading-tight">{title}</h2>
    </motion.div>
    {description && (
      <p className="mt-4 text-ink/60 dark:text-paper/60 leading-relaxed">{description}</p>
    )}
  </div>
);

export default SectionTitle;
