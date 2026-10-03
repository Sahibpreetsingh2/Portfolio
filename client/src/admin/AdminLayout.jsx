import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Star, Mail, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-paper dark:bg-studio text-ink dark:text-paper">
      <aside className="w-64 shrink-0 border-r border-line dark:border-line-dark flex flex-col">
        <div className="p-6 border-b border-line dark:border-line-dark">
          <p className="font-display text-xl">S.S.Sohanpal</p>
          <p className="text-xs text-ink/40 dark:text-paper/40">Studio admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive ? 'bg-ink text-paper dark:bg-paper dark:text-ink' : 'hover:bg-ink/5 dark:hover:bg-paper/5'
                }`
              }
            >
              <l.icon size={16} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-line dark:border-line-dark space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-ink/5 dark:hover:bg-paper/5">
            <ExternalLink size={16} /> View site
          </a>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-ink/5 dark:hover:bg-paper/5">
            <LogOut size={16} /> Log out
          </button>
          {user && <p className="text-xs text-ink/40 dark:text-paper/40 px-3 pt-2">{user.name}</p>}
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
