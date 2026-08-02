import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import {
  FaUtensils,
  FaCalendarAlt,
  FaStar,
  FaArrowRight,
  FaQuoteLeft,
  FaInstagram,
  FaFire,
  FaAward,
  FaConciergeBell,
  FaChevronDown
} from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { REVIEWS_LIST, INSTAGRAM_POSTS } from '../data/restaurantData';
import DishCard from '../components/DishCard';
import TextReveal from '../components/TextReveal';
import { useToast } from '../context/ToastContext';
import { mockSubscribeNewsletter } from '../services/api';

const Home = ({ onQuickView }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const popularDishes = activeTab === 'all'
    ? MENU_ITEMS.filter(d => d.isPopular || d.isChefSpecial).slice(0, 8)
    : MENU_ITEMS.filter(d => d.category === activeTab).slice(0, 8);

  const chefSpecialDish = MENU_ITEMS.find(d => d.id === 'p1') || MENU_ITEMS[0];

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubmitting(true);
    try {
      const res = await mockSubscribeNewsletter(newsletterEmail);
      addToast(res.message, 'success');
      setNewsletterEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* =========================================
          HERO SECTION (Fullscreen, Parallax, Floating Foods, Text Reveal)
      ========================================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dark">
        {/* Dark overlay & high-res hero background image with parallax scaling */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Thin Nation Hero Background"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        </div>

        {/* Floating food elements (Smooth Continuous Motion) */}
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 z-10 hidden lg:block"
        >
          <div className="p-3.5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl glow-orange">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80"
              alt="Floating Chocolate Eclair Pizza"
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <span className="text-[10px] font-extrabold text-white uppercase mt-2 block text-center tracking-wider">
              Chocolate Éclair
            </span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 right-12 z-10 hidden lg:block"
        >
          <div className="p-3.5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl glow-gold">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80"
              alt="Floating Smash Beef Pizza"
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <span className="text-[10px] font-extrabold text-white uppercase mt-2 block text-center tracking-wider">
              Smash Beef Pizza
            </span>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/20 backdrop-blur-md mb-6"
          >
            <FaAward className="text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Thin Nation — Thin Crust, Big Flavor
            </span>
          </motion.div>

          <h1 className="font-montserrat text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
            <TextReveal text="Thin Nation Lahore" className="block justify-center" />
            <span className="text-gradient-primary block mt-2">
              <TextReveal text="Thin Crust, Big Flavor." className="block justify-center" stagger={0.08} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Indulge in our famous Chocolate Éclair Pizza, Smash Beef Thin Crust, Alfredo Pasta Bombs, Super Crispy Calzones, and Loaded Fries in Faisal Town, Lahore.
          </motion.p>

          {/* Animated Hero Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/menu"
              className="group flex items-center gap-3 rounded-2xl bg-primary hover:bg-primary-dark text-white px-8 py-4 text-sm font-extrabold tracking-wider uppercase shadow-2xl shadow-primary/40 transition-all transform hover:scale-105 active:scale-95"
            >
              <FaUtensils />
              <span>Explore Our Menu</span>
              <FaArrowRight className="transition-transform group-hover:translate-x-1.5" />
            </Link>

            <Link
              to="/reservation"
              className="flex items-center gap-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 text-sm font-extrabold tracking-wider uppercase backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
            >
              <FaCalendarAlt className="text-secondary" />
              <span>Book Table</span>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-16 flex flex-col items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors"
            onClick={() => window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' })}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">Scroll To Discover</span>
            <FaChevronDown className="text-primary" />
          </motion.div>
        </div>
      </section>

      {/* =========================================
          FEATURED CATEGORIES
      ========================================= */}
      <section className="py-20 bg-light-bg dark:bg-dark border-b border-gray-100 dark:border-dark-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-primary">Thin Nation Specials</span>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-dark dark:text-white mt-1">
              Explore Our Signature Categories
            </h2>
            <p className="text-xs sm:text-sm text-customGray mt-2">
              From thin-crust pizzas to Alfredo pasta bombs and signature dip sauces.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { id: 'pizza', name: 'Signature Pizzas', count: '6 Varieties', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
              { id: 'favorites', name: 'Signature Favorites', count: '5 Varieties', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80' },
              { id: 'sides', name: 'Sides & Dips', count: '4 Varieties', img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80' },
              { id: 'drinks', name: 'Drinks & Beverages', count: '7 Varieties', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80' },
              { id: 'all', name: 'Full Catalog', count: '22 Items', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80' },
            ].map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  to={`/menu?category=${cat.id}`}
                  className="group flex flex-col items-center rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-5 shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all text-center transform hover:-translate-y-2"
                >
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
                    <img src={cat.img} alt={cat.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-montserrat text-sm font-bold text-dark dark:text-white group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-customGray mt-0.5">{cat.count}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          POPULAR DISHES (Filter Tabs + Animated Cards)
      ========================================= */}
      <section className="py-20 bg-white dark:bg-dark-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                <FaFire className="text-primary" /> Most Loved Thin Nation Items
              </span>
              <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-dark dark:text-white mt-1">
                Popular Dishes
              </h2>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-gray-100 dark:bg-dark-card p-1.5 rounded-2xl border border-gray-200 dark:border-dark-border">
              {[
                { id: 'all', label: 'All' },
                { id: 'pizza', label: 'Pizzas' },
                { id: 'favorites', label: 'Favorites' },
                { id: 'sides', label: 'Sides & Dips' },
                { id: 'drinks', label: 'Drinks' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-customGray hover:text-dark dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} onQuickView={onQuickView} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-2xl bg-dark dark:bg-dark-card border border-dark-border text-white px-8 py-4 text-xs font-extrabold tracking-wider uppercase hover:bg-primary hover:border-primary transition-all shadow-xl hover:scale-105"
            >
              <span>View Full Menu Catalog</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          CHEF SPECIAL BANNER
      ========================================= */}
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary/15 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Banner image with glowing border */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/40 group">
                <img
                  src={chefSpecialDish.image}
                  alt={chefSpecialDish.name}
                  className="h-[420px] w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col rounded-3xl bg-slate-900/90 border border-primary/40 p-5 shadow-2xl backdrop-blur-xl text-white">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest">Special Promo</span>
                <span className="font-montserrat text-2xl font-black text-primary">SAVE 25% TODAY</span>
                <span className="text-xs text-gray-400">Use promo code: THINNATION25</span>
              </div>
            </motion.div>

            {/* Banner details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 text-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest border border-primary/30">
                <FaConciergeBell /> Thin Nation Signature Creation
              </span>

              <h2 className="font-montserrat text-3xl sm:text-5xl font-black leading-tight">
                {chefSpecialDish.name}
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                {chefSpecialDish.description} Layered with silky vanilla cream and a vanilla-filled crust, topped with rich chocolate and peanut drizzle.
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div>
                  <span className="text-xs uppercase text-gray-400 font-bold">Price</span>
                  <div className="font-montserrat text-3xl font-black text-primary">
                    Rs. {chefSpecialDish.price.toLocaleString()}
                  </div>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <span className="text-xs uppercase text-gray-400 font-bold">Rating</span>
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-base mt-1">
                    <FaStar /> <span>{chefSpecialDish.rating} / 5.0</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onQuickView(chefSpecialDish)}
                  className="rounded-2xl bg-primary hover:bg-primary-dark text-white px-8 py-4 text-xs font-extrabold tracking-wider uppercase shadow-xl shadow-primary/30 transition-all transform hover:scale-105 active:scale-95"
                >
                  Order Signature Dish
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          TESTIMONIALS SLIDER (Google Maps Reviews)
      ========================================= */}
      <section className="py-20 bg-light-bg dark:bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-primary">Google Maps Reviews (4.7 ★)</span>
            <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-dark dark:text-white mt-1">
              What Thin Nation Guests Say
            </h2>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-14"
          >
            {REVIEWS_LIST.map((rev) => (
              <SwiperSlide key={rev.id}>
                <div className="h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl relative">
                  <FaQuoteLeft className="text-primary/10 text-5xl absolute top-4 right-4" />
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {[...Array(rev.rating)].map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-customGray leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-gray-100 dark:border-dark-border pt-4">
                    <img src={rev.avatar} alt={rev.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/30" />
                    <div>
                      <h4 className="font-montserrat text-xs font-bold text-dark dark:text-white">{rev.name}</h4>
                      <span className="text-[10px] text-customGray font-medium">{rev.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* =========================================
          INSTAGRAM GALLERY GRID
      ========================================= */}
      <section className="py-16 bg-white dark:bg-dark-paper border-t border-gray-100 dark:border-dark-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
            <FaInstagram /> @ThinNationLahore
          </span>
          <h2 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-dark dark:text-white mt-1">
            Follow Thin Nation On Instagram
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {INSTAGRAM_POSTS.map((post) => (
            <div key={post.id} className="group relative aspect-square overflow-hidden bg-gray-900 cursor-pointer">
              <img src={post.image} alt="Insta Post" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                <FaInstagram size={24} />
                <span className="text-xs font-bold">{post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          NEWSLETTER SECTION
      ========================================= */}
      <section className="relative py-20 bg-gradient-to-r from-dark via-slate-900 to-dark text-white overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Thin Nation VIP Dining</span>
          <h2 className="font-montserrat text-3xl sm:text-5xl font-black mt-2">
            Get 15% Off Your Next Meal
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-xl mx-auto">
            Subscribe to Thin Nation secret menu updates and exclusive deals in Faisal Town, Lahore.
          </p>

          <form onSubmit={handleNewsletter} className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full flex-1 rounded-2xl bg-white/10 border border-white/20 px-5 py-4 text-sm text-white placeholder-gray-400 backdrop-blur-md focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-2xl bg-primary hover:bg-primary-dark text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              {isSubmitting ? 'Joining...' : 'Subscribe Now'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
