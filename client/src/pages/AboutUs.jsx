import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUtensils, FaUsers, FaCheckCircle, FaStore, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { CHEFS, TIMELINE, COUNTERS } from '../data/restaurantData';

const AboutUs = () => {
  return (
    <div className="pt-28 pb-20 overflow-x-hidden bg-light-bg dark:bg-dark">
      {/* Header Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="text-xs font-black uppercase tracking-widest text-primary">Culinary Heritage & Passion</span>
        <h1 className="font-montserrat text-4xl sm:text-6xl font-black text-dark dark:text-white mt-1">
          Our Culinary Story
        </h1>
        <p className="text-xs sm:text-sm text-customGray mt-3 max-w-2xl mx-auto leading-relaxed">
          Founded in 2015, Savoria was born out of an unyielding passion for artisanal baking, Michelin-grade gastronomy, and authentic hospitality.
        </p>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Savoria Kitchen Craft"
                className="h-[450px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-4 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-5 shadow-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white font-bold">
                <FaAward size={24} />
              </div>
              <div>
                <h4 className="font-montserrat text-sm font-bold text-dark dark:text-white">10+ Years of Excellence</h4>
                <p className="text-xs text-customGray">3 Michelin Stars Recognition</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-montserrat text-3xl font-black text-dark dark:text-white leading-tight">
              Where Ancient Sourdough Techniques Meet Modern Alchemy
            </h2>
            <p className="text-xs sm:text-sm text-customGray leading-relaxed">
              Every dish served at Savoria tells a unique story. From sourcing organic heirloom wheat for our sourdough pizzas to importing black truffles directly from Umbria, we compromise on nothing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                '100% Organic Local Produce',
                'Natural Sourdough Fermentation',
                'Zero-Waste Sustainable Kitchen',
                'Master Artisanal Mixology',
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-dark dark:text-white">
                  <FaCheckCircle className="text-emerald-500" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="bg-dark py-16 mb-24 border-y border-dark-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {COUNTERS.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="font-montserrat text-4xl sm:text-5xl font-black text-gradient-primary">
                  {item.value.toLocaleString()}{item.suffix}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Master Artisans</span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-dark dark:text-white mt-1">
            Meet Our Culinary Directors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHEFS.map((chef) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border/60 overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                <img src={chef.image} alt={chef.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-3 text-white">
                    <a href={chef.socials.instagram} className="hover:text-primary"><FaInstagram size={16} /></a>
                    <a href={chef.socials.twitter} className="hover:text-primary"><FaTwitter size={16} /></a>
                    <a href={chef.socials.linkedin} className="hover:text-primary"><FaLinkedin size={16} /></a>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-montserrat text-base font-bold text-dark dark:text-white">{chef.name}</h3>
                <span className="text-xs text-primary font-semibold block">{chef.role}</span>
                <p className="text-xs text-customGray mt-2 leading-relaxed">{chef.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Milestones</span>
          <h2 className="font-montserrat text-3xl font-extrabold text-dark dark:text-white mt-1">
            The Journey Of Savoria
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-dark-border">
          {TIMELINE.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex items-center justify-between gap-8 ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
            >
              <div className="w-1/2" />
              <div className="absolute left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary ring-4 ring-white dark:ring-dark flex items-center justify-center text-white text-[10px] font-bold" />
              <div className="w-1/2 p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-lg">
                <span className="text-xs font-extrabold text-primary font-montserrat">{item.year}</span>
                <h4 className="font-montserrat text-base font-bold text-dark dark:text-white mt-0.5">{item.title}</h4>
                <p className="text-xs text-customGray mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
