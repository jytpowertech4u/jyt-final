import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* ✅ Using direct image path (no import) */}
              <img
                src="./assets/images/logo.png"
                alt="JYT PowerTech Logo"
                className="w-14 h-14 object-contain rounded-full bg-white p-1"
              />
              <div>
                <div className="font-bold text-xl text-white">JYT PowerTech</div>
                <div className="text-xs text-green-400">Solar Energy Solutions</div>
              </div>
            </div>
            <p className="text-sm mb-4">
              Authorized APDCL Solar Vendor (Code: 106220) providing sustainable energy solutions across Assam.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition">Services</Link></li>
              <li><Link to="/schemes" className="hover:text-green-400 transition">Solar Schemes</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-green-400 transition">Rooftop Solar Installation</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition">Maintenance & AMC</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition">Subsidy Assistance</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition">Supply of Electrical Items</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-green-400 flex-shrink-0" />
                <span>Six Mile, VIP Road, Kamrup(M), Guwahati - 22, Assam</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-green-400 flex-shrink-0" />
                <a href="tel:+918135033690" className="hover:text-green-400 transition">
                  +91 81350 33690
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-green-400 flex-shrink-0" />
                <a href="tel:+918876022766" className="hover:text-green-400 transition">
                  +91 88760 22766
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-green-400 flex-shrink-0" />
                <a href="mailto:jytpowertech@gmail.com" className="hover:text-green-400 transition">
                  jytpowertech@gmail.com
                </a>
              </li>
            </ul>
            <p className="text-xs mt-4">
              <span className="font-semibold text-white">Working Hours:</span>
              <br />
              Mon - Sat: 9:00 AM - 6:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 JYT PowerTech. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/privacy" className="hover:text-green-400 transition">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-green-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
