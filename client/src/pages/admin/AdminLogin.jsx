import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import ThinNationLogo from '../../components/ThinNationLogo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@savoria.com');
  const [password, setPassword] = useState('admin123');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loginAdmin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await loginAdmin(email, password);
      if (success) {
        addToast('Welcome to Thin Nation Executive Portal!', 'success');
        navigate('/admin/dashboard');
      } else {
        addToast('Invalid admin credentials!', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white/10 dark:bg-dark-card/80 border border-white/20 dark:border-dark-border p-8 shadow-2xl backdrop-blur-2xl text-white"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <ThinNationLogo size="lg" />
          <h2 className="font-montserrat text-2xl font-black mt-4">Executive Admin Portal</h2>
          <p className="text-xs text-gray-400 mt-1">Management login for Thin Nation Lahore</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Admin Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" size={14} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" size={14} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-[11px] text-gray-300 flex items-center gap-2">
            <FaShieldAlt className="text-secondary" />
            <span>Preset Credentials: admin@savoria.com / admin123</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-primary hover:bg-primary-dark text-white py-3.5 text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-primary/30 transition-all hover:scale-[1.02]"
          >
            {isSubmitting ? 'Authenticating...' : 'Access Admin Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
