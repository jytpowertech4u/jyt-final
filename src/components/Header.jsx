import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Solar Schemes', path: '/schemes' },
    { name: 'Projects', path: '/projects' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95'
      }`}
    >
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+918135033690"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <Phone size={14} />
              <span className="hidden sm:inline">+91 81350 33690</span>
            </a>
            <a
              href="mailto:jytpowertech@gmail.com"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <Mail size={14} />
              <span className="hidden md:inline">jytpowertech@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">APDCL Vendor Code: 106220</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="./assets/images/logo.png" // ✅ using public/images like in Footer
              alt="JYT PowerTech Logo"
              className="w-14 h-14 rounded-full object-cover bg-white p-1"
            />
            <div>
              <div className="font-bold text-xl text-gray-800">JYT PowerTech</div>
              <div className="text-xs text-green-600">Solar Energy Solutions</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  location.pathname === link.path
                    ? 'text-green-600'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={16} className="mr-1" />
                Locate Us
              </a>
            </Button>
            <Button size="sm" className="solar-gradient text-white" asChild>
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-green-600 ${
                    location.pathname === link.path
                      ? 'text-green-600'
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin size={16} className="mr-1" />
                    Locate Us
                  </a>
                </Button>
                <Button size="sm" className="solar-gradient text-white" asChild>
                  <Link to="/contact">Get Quote</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
