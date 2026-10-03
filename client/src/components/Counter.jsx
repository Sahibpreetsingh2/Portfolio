import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ to, suffix = '', label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <p className="font-display text-4xl md:text-5xl">
        {value}
        {suffix}
      </p>
      <p className="text-sm text-ink/50 dark:text-paper/50 mt-2">{label}</p>
    </motion.div>
  );
};

export default Counter;
