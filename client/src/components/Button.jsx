import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm transition-colors duration-200';

const variants = {
  primary: 'bg-ink text-paper dark:bg-paper dark:text-ink hover:bg-signal dark:hover:bg-signal dark:hover:text-paper',
  outline: 'border border-ink/30 dark:border-paper/30 hover:border-signal hover:text-signal',
  ghost: 'hover:text-signal',
};

const Button = ({ to, href, onClick, type = 'button', variant = 'primary', className = '', children, ...rest }) => {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
