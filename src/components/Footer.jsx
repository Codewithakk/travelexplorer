import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Send,
  MapPin,
  Phone,
  Plane
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="h-8 w-8 text-primary-400" />
              <h3 className="text-2xl font-display font-bold">Travel Explorer</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discover the world's most beautiful destinations through the lens of talented photographers. Start your next adventure today.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors duration-300 group"
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'Popular Destinations',
                'Travel Guides',
                'Photography Tips',
                'About Us',
                'Contact',
                'Blog'
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Destinations */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6">Top Destinations</h4>
            <ul className="space-y-3">
              {[
                'Bali, Indonesia',
                'Paris, France',
                'Tokyo, Japan',
                'New York, USA',
                'Swiss Alps',
                'Maldives'
              ].map((destination, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary-400" />
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-6">
              Get the latest travel inspiration and photography tips delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={subscribed}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-colors duration-300 ${subscribed
                  ? 'bg-green-600 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
              >
                <Send className="h-5 w-5" />
                <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
              </motion.button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+91 9876543210</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Travel Explorer. All rights reserved.
          </p>

          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;