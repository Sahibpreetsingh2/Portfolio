import { motion } from 'framer-motion';
import Button from '../components/Button';

const NotFound = () => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-page py-32 text-center">
    <p className="font-display text-8xl md:text-[10rem] leading-none text-signal mb-6">404</p>
    <h1 className="font-display text-3xl md:text-4xl mb-4">This page wandered off-brand.</h1>
    <p className="text-ink/60 dark:text-paper/60 mb-10">The page you're looking for doesn't exist or has moved.</p>
    <Button to="/">Back to home</Button>
  </motion.main>
);

export default NotFound;
