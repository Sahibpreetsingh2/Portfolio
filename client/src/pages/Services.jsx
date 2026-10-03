import { motion } from 'framer-motion';
import { Palette, MonitorSmartphone, Share2, Megaphone, Package, Film, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';

const services = [
  { icon: Palette, title: 'Brand Identity', copy: 'Logo, typography, color system and a complete visual identity built to scale across every touchpoint.' },
  { icon: MonitorSmartphone, title: 'UI/UX Design', copy: 'Modern interfaces and digital experiences designed around how people actually use your product.' },
  { icon: Share2, title: 'Social Media Design', copy: 'Instagram posts, advertisements, campaigns and social media branding that stays consistent at scale.' },
  { icon: Megaphone, title: 'Poster & Campaign Design', copy: 'Creative promotional campaigns and posters built to grab attention in a crowded feed or street.' },
  { icon: Package, title: 'Packaging Design', copy: 'Product packaging and visual presentation designed to earn a second look on the shelf.' },
  { icon: Film, title: 'Motion Graphics', copy: 'Animated graphics and promotional visuals that bring a static identity to life.' },
];

const Services = () => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="container-page py-16 md:py-24">
    <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl mb-6">Design services built around your brand's actual problem.</h1>
    <p className="text-ink/60 dark:text-paper/60 max-w-xl mb-20">
      Every engagement starts with a conversation, not a package. Here's what that usually turns into.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line dark:bg-line-dark">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
          className="bg-paper dark:bg-studio p-10 group hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors duration-300 flex flex-col"
        >
          <s.icon size={22} className="mb-8 text-signal" />
          <h3 className="font-display text-2xl mb-3">{s.title}</h3>
          <p className="text-sm opacity-60 leading-relaxed mb-8 flex-1">{s.copy}</p>
          <Button to="/contact" variant="ghost" className="!px-0 text-sm self-start">
            Discuss a project <ArrowUpRight size={14} />
          </Button>
        </motion.div>
      ))}
    </div>

    <div className="mt-24 text-center">
      <h2 className="font-display text-3xl md:text-5xl max-w-2xl mx-auto leading-tight mb-8">
        Not sure which service fits? Let's talk it through.
      </h2>
      <Button to="/contact">Get in touch <ArrowUpRight size={16} /></Button>
    </div>
  </motion.main>
);

export default Services;
