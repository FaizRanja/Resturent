import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import ThinNationLogo from '../components/ThinNationLogo';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      addToast('Passwords do not match!', 'warning');
      return;
    }

    if (password.length < 6) {
      addToast('Password must be at least 6 characters long', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await registerUser(name, email, password, phone);
      if (success) {
        navigate('/');
      } else {
        addToast('Registration failed. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden py-12">
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
            Create Thin Nation Account
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Join Thin Nation VIP dining club to unlock discount vouchers and site access.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-gray-400" size={13} />
              <input
                type="text"
                required
                placeholder="Rashid Khan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-2xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" size={13} />
              <input
                type="email"
                required
                placeholder="rashid@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-2xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-4 top-3.5 text-gray-400" size={13} />
              <input
                type="tel"
                required
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-2xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-3.5 text-gray-400" size={12} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-2xl bg-white/10 border border-white/20 pl-9 pr-3 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-3.5 text-gray-400" size={12} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full rounded-2xl bg-white/10 border border-white/20 pl-9 pr-3 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white py-4 text-xs font-extrabold tracking-wider uppercase shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
            <FaArrowRight size={13} />
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Sign In Instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
