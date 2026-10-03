import { motion } from 'framer-motion';
import Counter from '../components/Counter';
import SectionTitle from '../components/SectionTitle';

const tools = ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Figma', 'Blender', 'Canva'];
const skills = ['Brand Identity', 'Typography', 'Art Direction', 'UI/UX Design', 'Packaging', 'Motion Graphics'];

const timeline = [
  { year: '2026', title: 'Independent Studio', place: 'Remote', type: 'Work', copy: 'Running an independent design practice for founders and product teams.' },
  // { year: '2023–2026', title: 'Senior Visual Designer', place: 'Studio Ferro', type: 'Work', copy: 'Led brand and packaging work across consumer and hospitality clients.' },
  // { year: '2022', title: 'Freelance Illustrator & Designer', place: 'Self-employed', type: 'Freelance', copy: 'Took on editorial illustration and poster commissions.' },
  // { year: '2021', title: 'Adobe Certified Expert', place: 'Certification', type: 'Certification', copy: 'Certified across the Creative Cloud suite.' },
  // { year: '2020', title: 'BA Visual Communication', place: 'Design Academy', type: 'Education', copy: 'Graduated with honors, focus on identity systems.' },
  // { year: '2019', title: 'Young Designer Award', place: 'National Design Council', type: 'Award', copy: 'Recognized for a student branding project.' },
];

const About = () => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="container-page py-16 md:py-24">
    <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
      <div className="aspect-[4/5] overflow-hidden rounded-sm bg-ink/5 dark:bg-paper/5">
        <img src="https://picsum.photos/seed/dario-about/900/1100" alt="S.S.Sohanpal portrait" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          I design brands that feel considered, not decorated.
        </h1>
        <div className="space-y-4 text-ink/60 dark:text-paper/60 leading-relaxed">
          <p>
            I'm S.S.Sohanpal, a visual and brand designer based in Mohali, Punjab (India), working with clients across
            branding, packaging, UI and campaign design.
          </p>
          <p>
            My approach starts with the problem, not the mood board — good design solves something
            before it decorates anything. I believe restraint is a design decision, not an absence
            of one.
          </p>
        </div>
        <p className="text-sm text-ink/40 dark:text-paper/40 mt-6">Based in Mohali, Punjab (India) — available worldwide</p>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-line dark:border-line-dark mb-28">
      <Counter to={30} suffix="+" label="Projects" />
      <Counter to={5} suffix="+" label="Clients" />
      <Counter to={1} suffix="+" label="Years experience" />
      <Counter to={10} suffix="+" label="Design categories" />
    </div>

    <div className="grid md:grid-cols-2 gap-16 mb-28">
      <div>
        <SectionTitle index="Skills" title="What I bring to a project" />
        <ul className="grid grid-cols-2 gap-y-3 text-sm">
          {skills.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-signal" /> {s}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SectionTitle index="Tools" title="Software I work in daily" />
        <ul className="grid grid-cols-2 gap-y-3 text-sm">
          {tools.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-clay" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div id="experience">
      <SectionTitle index="Experience" title="work & recognition" />
      <div className="relative pl-8 border-l border-line dark:border-line-dark space-y-12">
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="relative"
          >
            <span className="absolute -left-[2.05rem] top-1.5 w-2.5 h-2.5 rounded-full bg-signal" />
            <p className="text-sm text-ink/40 dark:text-paper/40 mb-1">{item.year} · {item.type}</p>
            <h3 className="font-display text-xl mb-1">{item.title}</h3>
            <p className="text-sm text-ink/50 dark:text-paper/50 mb-2">{item.place}</p>
            <p className="text-sm text-ink/60 dark:text-paper/60 leading-relaxed max-w-lg">{item.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.main>
);

export default About;
