import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaHeart
} from 'react-icons/fa';
import { RESTAURANT_INFO } from '../data/restaurantData';
import ThinNationLogo from './ThinNationLogo';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-dark-border text-gray-400 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-dark-border/60">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/">
              <ThinNationLogo size="md" />
            </Link>
            <p className="text-xs leading-relaxed text-gray-400">
              Thin Crust, Big Flavor. Home of the famous Chocolate Éclair Pizza, Smash Beef Thin Crust, Alfredo Pasta Bombs, and Loaded Fries in Faisal Town, Lahore.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={RESTAURANT_INFO.socials.facebook} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-card text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <FaFacebookF size={13} />
              </a>
              <a href={RESTAURANT_INFO.socials.instagram} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-card text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href={RESTAURANT_INFO.socials.twitter} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-card text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <FaTwitter size={13} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/menu" className="hover:text-primary transition-colors">Our Menu Catalog</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Thin Nation</Link></li>
              <li><Link to="/reservation" className="hover:text-primary transition-colors">Book a Table</Link></li>
              <li><Link to="/offers" className="hover:text-primary transition-colors">Promo Discounts</Link></li>
              <li><Link to="/reviews" className="hover:text-primary transition-colors">Google Reviews (4.7 ★)</Link></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="font-montserrat text-sm font-bold text-white uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <FaClock className="text-primary mt-0.5" size={14} />
                <div>
                  <span className="text-white font-bold block">Daily Service</span>
                  <span className="text-gray-400">01:00 PM – 02:00 AM</span>
                </div>
              </div>
              <div className="rounded-2xl bg-dark-card p-3 border border-dark-border text-[11px]">
                <span className="text-secondary font-bold block">Delivery Available</span>
                <span>Order online directly or via foodpanda.pk</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-montserrat text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-primary mt-0.5" size={14} />
                <span>14-A Usmani Rd, Block A, Faisal Town, Lahore, 54770, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-primary" size={13} />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-primary transition-colors">+92 300 0574779</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-amber-400" size={13} />
                <span>info@thinnation.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Thin Nation Lahore. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <FaHeart className="text-primary" size={12} />
            <span>in Lahore, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
