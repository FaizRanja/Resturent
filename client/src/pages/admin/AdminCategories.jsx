import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTags, FaEdit, FaTrash, FaTimes, FaPizzaSlice, FaHamburger, FaConciergeBell, FaIceCream } from 'react-icons/fa';
import { CATEGORIES, MENU_ITEMS } from '../../data/menuData';
import { useToast } from '../../context/ToastContext';

const AdminCategories = () => {
  const [categories, setCategories] = useState(CATEGORIES.filter(c => c.id !== 'all'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catName, setCatName] = useState('');
  const [catId, setCatId] = useState('');

  const { addToast } = useToast();

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!catName) return;
    const newCat = {
      id: catId || catName.toLowerCase().replace(/\s+/g, '-'),
      name: catName,
      icon: 'FaUtensils',
      count: 0
    };
    setCategories(prev => [...prev, newCat]);
    addToast(`Category "${catName}" created successfully!`, 'success');
    setIsModalOpen(false);
    setCatName('');
    setCatId('');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      setCategories(prev => prev.filter(c => c.id !== id));
      addToast(`Category "${name}" removed.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-dark dark:text-white">
            Category Management
          </h1>
          <p className="text-xs text-customGray mt-0.5">Organize food sections and culinary categories</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white px-6 py-3 text-xs font-extrabold shadow-lg shadow-primary/25 transition-all"
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const dishCount = MENU_ITEMS.filter(m => m.category === cat.id).length;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold">
                  <FaTags size={20} />
                </div>
                <div>
                  <h3 className="font-montserrat text-base font-bold text-dark dark:text-white">{cat.name}</h3>
                  <span className="text-xs text-customGray font-medium">{dishCount} Dishes Assigned</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                title="Delete Category"
              >
                <FaTrash size={14} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-2xl p-6"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-dark dark:hover:text-white">
                <FaTimes size={16} />
              </button>

              <h3 className="font-montserrat text-xl font-bold text-dark dark:text-white">Create Food Category</h3>

              <form onSubmit={handleAddCategory} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Category Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Seafood Specialties"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-3.5 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button type="submit" className="w-full rounded-xl bg-primary text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/25">
                  Save Category
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategories;
