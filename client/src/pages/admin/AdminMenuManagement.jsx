import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaStar, FaPizzaSlice } from 'react-icons/fa';
import { MENU_ITEMS, CATEGORIES } from '../../data/menuData';
import { useToast } from '../../context/ToastContext';

const AdminMenuManagement = () => {
  const [dishes, setDishes] = useState(MENU_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishForm, setDishForm] = useState({
    name: '',
    category: 'pizza',
    price: '',
    description: '',
    image: '',
    calories: '800 kcal',
    prepTime: '15-20 min',
    isChefSpecial: false,
    isPopular: false,
  });

  const { addToast } = useToast();

  const handleOpenAdd = () => {
    setEditingDish(null);
    setDishForm({
      name: '',
      category: 'pizza',
      price: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      calories: '800 kcal',
      prepTime: '15-20 min',
      isChefSpecial: false,
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dish) => {
    setEditingDish(dish);
    setDishForm({ ...dish });
    setIsModalOpen(true);
  };

  const handleDeleteDish = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setDishes(prev => prev.filter(d => d.id !== id));
      addToast(`Deleted "${name}" from menu catalog`, 'info');
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!dishForm.name || !dishForm.price) return;

    const parsedPrice = parseFloat(dishForm.price);

    if (editingDish) {
      setDishes(prev => prev.map(d => d.id === editingDish.id ? { ...dishForm, price: parsedPrice } : d));
      addToast(`Updated dish "${dishForm.name}"`, 'success');
    } else {
      const newDishObj = {
        id: 'p-' + Date.now(),
        ...dishForm,
        price: parsedPrice,
        rating: 4.8,
        reviewsCount: 1,
      };
      setDishes([newDishObj, ...dishes]);
      addToast(`Added new dish "${dishForm.name}" to Thin Nation menu!`, 'success');
    }

    setIsModalOpen(false);
  };

  const filteredDishes = dishes.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'all' || d.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl font-black text-dark dark:text-white">Thin Nation Menu Catalog</h1>
          <p className="text-xs text-customGray mt-1">Add, edit, or remove menu items and pricing details.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white px-5 py-3 text-xs font-bold shadow-lg shadow-primary/25 transition-all"
        >
          <FaPlus /> Add New Dish
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-dark-card p-4 rounded-3xl border border-gray-100 dark:border-dark-border shadow-md">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper pl-10 pr-4 py-2.5 text-xs text-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all capitalize ${
                categoryFilter === cat.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 dark:bg-dark-paper text-customGray hover:text-dark dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Table */}
      <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-dark-paper text-customGray uppercase font-bold border-b border-gray-100 dark:border-dark-border">
              <tr>
                <th className="py-4 px-6">Dish</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price (Rs.)</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Badges</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border/40 text-dark dark:text-gray-200">
              {filteredDishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-paper/30 transition-colors">
                  <td className="py-3.5 px-6 font-bold flex items-center gap-3">
                    <img src={dish.image} alt={dish.name} className="h-10 w-10 rounded-xl object-cover" />
                    <div>
                      <span className="block font-montserrat font-bold">{dish.name}</span>
                      <span className="text-[10px] text-customGray font-normal line-clamp-1 max-w-xs">{dish.description}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold uppercase text-primary">{dish.category}</td>
                  <td className="py-3.5 px-4 font-extrabold font-montserrat text-dark dark:text-white">Rs. {dish.price.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-bold text-amber-500">★ {dish.rating}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {dish.isChefSpecial && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">Chef Special</span>}
                      {dish.isPopular && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold">Popular</span>}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(dish)}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-dark-paper hover:bg-primary hover:text-white transition-colors"
                      title="Edit Item"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteDish(dish.id, dish.name)}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-dark-paper hover:bg-rose-500 hover:text-white transition-colors"
                      title="Delete Item"
                    >
                      <FaTrash size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleSubmitForm} className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-montserrat font-bold text-dark dark:text-white text-base">
              {editingDish ? 'Edit Dish Item' : 'Add New Thin Nation Dish'}
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-customGray mb-1">Dish Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Chocolate Eclair Pizza"
                value={dishForm.name}
                onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-customGray mb-1">Category</label>
                <select
                  value={dishForm.category}
                  onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })}
                  className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none"
                >
                  <option value="pizza">Signature Pizzas</option>
                  <option value="favorites">Signature Favorites</option>
                  <option value="sides">Sides & Dips</option>
                  <option value="drinks">Drinks & Beverages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-customGray mb-1">Price in PKR (Rs.)</label>
                <input
                  type="number"
                  required
                  placeholder="1649"
                  value={dishForm.price}
                  onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
                  className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-customGray mb-1">Description</label>
              <textarea
                rows={3}
                required
                placeholder="Freshly baked dessert pizza layered with silky vanilla cream..."
                value={dishForm.description}
                onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-customGray mb-1">Image URL</label>
              <input
                type="text"
                value={dishForm.image}
                onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2 text-xs text-dark dark:text-white">
                <input
                  type="checkbox"
                  checked={dishForm.isChefSpecial}
                  onChange={(e) => setDishForm({ ...dishForm, isChefSpecial: e.target.checked })}
                  className="accent-primary"
                />
                <span>Chef Special</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-dark dark:text-white">
                <input
                  type="checkbox"
                  checked={dishForm.isPopular}
                  onChange={(e) => setDishForm({ ...dishForm, isPopular: e.target.checked })}
                  className="accent-primary"
                />
                <span>Popular Item</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-2xl bg-gray-100 text-dark dark:text-white py-3 text-xs font-bold">Cancel</button>
              <button type="submit" className="flex-1 rounded-2xl bg-primary text-white py-3 text-xs font-bold">{editingDish ? 'Save Changes' : 'Add Dish'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminMenuManagement;
