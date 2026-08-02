import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight, FaUser, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import ThinNationLogo from '../components/ThinNationLogo';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loginUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        if (result.role === 'admin') {
          // If logged in as Admin, redirect directly to Admin Dashboard
          navigate('/admin/dashboard', { replace: true });
        } else {
          // If logged in as Customer, redirect to Website
          navigate(from === '/admin' || from.startsWith('/admin') ? '/' : from, { replace: true });
        }
      } else {
        addToast('Invalid email or password', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCustomer = () => {
    setEmail('rashid@gmail.com');
    setPassword('password123');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@savoria.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white/10 dark:bg-dark-card/90 border border-white/20 dark:border-dark-border p-8 shadow-2xl backdrop-blur-2xl text-white space-y-6"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <ThinNationLogo size="lg" />
          <h1 className="font-montserrat text-2xl font-black text-white mt-4">
            Sign In to Thin Nation
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Enter your email and password. System will automatically direct you to your account or executive dashboard.
          </p>
        </div>

        {/* Demo shortcuts */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={fillDemoCustomer}
            className="py-2.5 px-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-amber-500/20 transition-colors"
          >
            <FaUser size={11} /> User Login
          </button>
          <button
            type="button"
            onClick={fillDemoAdmin}
            className="py-2.5 px-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-red-500/20 transition-colors"
          >
            <FaShieldAlt size={11} /> Admin Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" size={14} />
              <input
                type="email"
                required
                placeholder="user@gmail.com or admin@savoria.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" size={14} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl bg-white/10 border border-white/20 pl-10 pr-10 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white py-4 text-xs font-extrabold tracking-wider uppercase shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In To Thin Nation'}</span>
            <FaArrowRight size={13} />
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
