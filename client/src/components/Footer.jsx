import { Link } from 'react-router-dom';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/web.workstudio?stkn=b21xcXd0dzhqcWRm' },
  // { label: 'Behance', href: 'https://behance.net' },
  // { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sukhraj-singh-598758430/' },
];

const Footer = () => (
  <footer className="border-t border-line dark:border-line-dark mt-32">
    <div className="container-page py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <p className="font-display text-2xl mb-3">S.S.Sohanpal</p>
        <p className="text-sm text-ink/60 dark:text-paper/60 max-w-xs">
          Visual and brand designer working with founders and studios who care about the details.
        </p>
        <p className="text-sm mt-6 text-ink/60 dark:text-paper/60">hello.sohanpal@gmail.com</p>
      </div>

      <div>
        <p className="text-sm mb-4 text-ink/50 dark:text-paper/50">Navigate</p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/work" className="hover:text-signal transition-colors">Work</Link></li>
          <li><Link to="/about" className="hover:text-signal transition-colors">About</Link></li>
          <li><Link to="/services" className="hover:text-signal transition-colors">Services</Link></li>
          <li><Link to="/contact" className="hover:text-signal transition-colors">Contact</Link></li>
        </ul>
      </div>

      <div>
        <p className="text-sm mb-4 text-ink/50 dark:text-paper/50">Elsewhere</p>
        <ul className="space-y-2 text-sm">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="container-page py-6 border-t border-line dark:border-line-dark flex flex-col md:flex-row justify-between gap-2 text-xs text-ink/50 dark:text-paper/50">
      <p>© {new Date().getFullYear()} S.S.Sohanpal. All rights reserved.</p>
      <p>Designed & built with creativity.</p>
    </div>
  </footer>
);

export default Footer;
