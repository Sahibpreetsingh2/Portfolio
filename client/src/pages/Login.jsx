import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container-page py-24 max-w-md mx-auto">
      <h1 className="font-display text-3xl mb-8">Admin login</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-transparent border-b border-line dark:border-line-dark py-2 outline-none focus:border-signal transition-colors"
          />
        </div>
        {error && <p className="text-sm text-clay">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-ink text-paper dark:bg-paper dark:text-ink text-sm hover:bg-signal dark:hover:bg-signal dark:hover:text-paper transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </motion.main>
  );
};

export default Login;
