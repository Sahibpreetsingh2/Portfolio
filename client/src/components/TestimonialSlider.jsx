import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import api from '../services/api';
import Loader from './Loader';

const TestimonialSlider = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/testimonials')
      .then((res) => setItems(res.data.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading testimonials" />;
  if (items.length === 0) {
    return <p className="text-ink/50 dark:text-paper/50">Testimonials will appear here once added.</p>;
  }

  const current = items[index];
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <div className="max-w-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current._id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < current.rating ? 'fill-signal text-signal' : 'text-ink/20 dark:text-paper/20'} />
            ))}
          </div>
          <p className="font-display text-2xl leading-snug mb-6">"{current.message}"</p>
          <p className="text-sm text-ink/60 dark:text-paper/60">
            {current.clientName}
            {current.designation && `, ${current.designation}`}
            {current.company && ` — ${current.company}`}
          </p>
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="flex gap-3 mt-10">
          <button onClick={prev} aria-label="Previous testimonial" className="w-9 h-9 rounded-full border border-line dark:border-line-dark hover:border-signal flex items-center justify-center transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} aria-label="Next testimonial" className="w-9 h-9 rounded-full border border-line dark:border-line-dark hover:border-signal flex items-center justify-center transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;
