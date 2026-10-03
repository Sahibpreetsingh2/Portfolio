import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Button';
import Marquee from '../components/Marquee';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import Counter from '../components/Counter';
import Loader from '../components/Loader';
import TestimonialSlider from '../components/TestimonialSlider';

const processStages = [
  { n: '01', title: 'Discover', copy: 'Understand the brand, the audience and the problem worth solving.' },
  { n: '02', title: 'Define', copy: 'Develop the creative direction and the visual strategy behind it.' },
  { n: '03', title: 'Design', copy: 'Create and refine the visual identity until every detail earns its place.' },
  { n: '04', title: 'Deliver', copy: 'Hand over polished, production-ready assets your team can run with.' },
];

const services = [
  { title: 'Brand Identity', copy: 'Logo, typography, color systems and a complete visual identity.' },
  { title: 'UI/UX Design', copy: 'Modern interfaces and digital product experiences.' },
  { title: 'Social Media', copy: 'Posts, ads and campaign templates that stay on-brand at scale.' },
  { title: 'Packaging', copy: 'Product packaging designed to hold up on a crowded shelf.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [f, r] = await Promise.all([
          api.get('/projects/featured'),
          api.get('/projects?limit=6'),
        ]);
        setFeatured(f.data.data);
        setRecent(r.data.data);
      } catch {
        /* handled by empty state */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section className="container-page pt-16 md:pt-28 pb-16">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight"
          >
            Visual designer creating bold identities, digital experiences & memorable brands.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <p className="text-ink/60 dark:text-paper/60 leading-relaxed">
              I'm S.S.Sohanpal, a brand and visual designer working with founders, studios and ambitious
              teams who care about the details other people skip.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button to="/work">View my work <ArrowUpRight size={16} /></Button>
              <Button to="/contact" variant="outline">Let's work together</Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-14 md:mt-20 aspect-[16/8] w-full overflow-hidden rounded-sm bg-ink/5 dark:bg-paper/5"
        >
          <img
            // src="https://picsum.photos/seed/dario-hero/1800/900"
          src =  "https://res.cloudinary.com/v1epgxfd/image/upload/v1790962386/WhatsApp_Image_2026-10-02_at_10.59.09_PM.jpg"
            
            alt="Featured brand identity artwork"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      <Marquee />

      {/* Featured work */}
      <section className="container-page py-24">
        <SectionTitle index="Featured" title="Selected work" description="A handful of recent projects across branding, product and campaign design." />
        {loading ? (
          <Loader label="Loading projects" />
        ) : featured.length === 0 && recent.length === 0 ? (
          <p className="text-ink/50 dark:text-paper/50">Projects will appear here once the API is connected and seeded.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {(featured.length ? featured : recent).slice(0, 6).map((p, i) => (
              <ProjectCard project={p} key={p._id} index={i} />
            ))}
          </div>
        )}
        <div className="mt-14">
          <Button to="/work" variant="outline">See all projects <ArrowUpRight size={16} /></Button>
        </div>
      </section>

      {/* About preview */}
      <section className="container-page py-24 border-t border-line dark:border-line-dark">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-sm bg-ink/5 dark:bg-paper/5">
            <img
              src="https://picsum.photos/seed/dario-portrait/900/1100"
              alt="S.S.Sohanpal Voss at work"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <SectionTitle index="About" title="Building visual experiences that make brands impossible to overlook." />
            <p className="text-ink/60 dark:text-paper/60 leading-relaxed mb-10">
              Based between studio and screen, I work closely with each client to find the visual
              language their brand actually needs — not the one that's trending this quarter.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <Counter to={30} suffix="+" label="Projects" />
              <Counter to={5} suffix="+" label="Clients" />
              <Counter to={1} suffix="+" label="Years experience" />
              <Counter to={10} suffix="+" label="Design categories" />
            </div>
            <div className="mt-10">
              <Button to="/about" variant="outline">More about me <ArrowUpRight size={16} /></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-24 border-t border-line dark:border-line-dark">
        <SectionTitle index="Services" title="What I can do for your brand" />
        <div className="grid sm:grid-cols-2 gap-px bg-line dark:bg-line-dark">
          {services.map((s) => (
            <div key={s.title} className="bg-paper dark:bg-studio p-8 group hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors duration-300">
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed mb-6">{s.copy}</p>
              <Button to="/services" variant="ghost" className="!px-0 text-sm">Discuss a project <ArrowUpRight size={14} /></Button>
            </div>
          ))}
        </div>
      </section>

      {/* Creative process */}
      <section className="container-page py-24 border-t border-line dark:border-line-dark">
        <SectionTitle index="Process" title="How a project comes together" />
        <div className="grid md:grid-cols-4 gap-10">
          {processStages.map((stage) => (
            <motion.div
              key={stage.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-3xl text-signal mb-4">{stage.n}</p>
              <h3 className="font-display text-xl mb-2">{stage.title}</h3>
              <p className="text-sm text-ink/60 dark:text-paper/60 leading-relaxed">{stage.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-24 border-t border-line dark:border-line-dark">
        <SectionTitle index="Testimonials" title="What clients say" />
        <TestimonialSlider />
      </section>

      {/* CTA */}
      <section className="container-page py-32 border-t border-line dark:border-line-dark text-center">
        <ArrowDown className="mx-auto mb-6 text-signal" size={20} />
        <h2 className="font-display text-4xl md:text-6xl max-w-3xl mx-auto leading-tight mb-10">
          Have a brand or product that needs a clearer visual story?
        </h2>
        <Button to="/contact">Let's work together <ArrowUpRight size={16} /></Button>
      </section>
    </motion.main>
  );
};

export default Home;
