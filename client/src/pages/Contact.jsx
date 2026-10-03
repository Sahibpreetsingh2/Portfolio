import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { ArrowUpRight, CircleCheck } from 'lucide-react';
import api from '../services/api';

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Select a project type'),
  budget: z.string().min(1, 'Select a budget range'),
  message: z.string().min(10, 'Tell me a little more about the project'),
});

const projectTypes = ['Branding', 'Logo Design', 'UI/UX', 'Social Media', 'Packaging', 'Poster', 'Motion Graphics', 'Other'];
const budgets = ['$5–$10', '$10–$50', '$50–$200', '$200+'];

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await api.post('/contact', values);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="container-page py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <span className="inline-flex items-center gap-2 text-sm text-signal mb-6">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" /> Available for freelance projects
          </span>
          <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">Let's work together.</h1>
          <p className="text-ink/60 dark:text-paper/60 max-w-md leading-relaxed mb-10">
            Tell me a bit about your project and timeline. I read every message myself and usually
            reply within two business days.
          </p>
          <div className="space-y-2 text-sm text-ink/60 dark:text-paper/60">
            <p>hello.sohanpal@gmail.com</p>
            <p>Instagram — @web.workstudio</p>
            {/* <p>Behance — dariovoss</p>
            <p>Dribbble — dariovoss</p> */}
            <p>LinkedIn — sukhraj singh</p>
          </div>
        </div>

        <div>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-line dark:border-line-dark p-10 flex flex-col items-start gap-4"
            >
              <CircleCheck className="text-signal" size={28} />
              <p className="font-display text-2xl">Message received.</p>
              <p className="text-ink/60 dark:text-paper/60">
                Thanks! Your message has been received. I'll get back to you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="text-sm text-signal mt-2">
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div>
                <label className="block text-sm mb-2" htmlFor="name">Name</label>
                <input id="name" {...register('name')} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" />
                {errors.name && <p className="text-xs text-clay mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2" htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email')} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" />
                {errors.email && <p className="text-xs text-clay mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2" htmlFor="company">Company (optional)</label>
                <input id="company" {...register('company')} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2" htmlFor="projectType">Project type</label>
                  <select id="projectType" {...register('projectType')} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors">
                    <option value="">Select</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.projectType && <p className="text-xs text-clay mt-1">{errors.projectType.message}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-2" htmlFor="budget">Budget</label>
                  <select id="budget" {...register('budget')} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors">
                    <option value="">Select</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.budget && <p className="text-xs text-clay mt-1">{errors.budget.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" htmlFor="message">Message</label>
                <textarea id="message" rows={4} {...register('message')} className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors resize-none" />
                {errors.message && <p className="text-xs text-clay mt-1">{errors.message.message}</p>}
              </div>

              {serverError && <p className="text-sm text-clay">{serverError}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm hover:bg-signal dark:hover:bg-signal dark:hover:text-paper transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending…' : 'Send message'} <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Contact;
