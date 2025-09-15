import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { navAnimations } from '../utils/animationUtils';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pakketten', path: '/pakketten' },
    { name: 'Boeken', path: '/boeken' },
    { name: 'Reviews', path: '/reviews' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary-dark shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="z-10">
            <Logo size="medium" />
          </Link>

          <button
            className="md:hidden z-10 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary-silver" />
            ) : (
              <Menu className="w-6 h-6 text-primary-silver" />
            )}
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors hover:text-primary-bright relative group ${
                  location.pathname === link.path
                    ? 'text-primary-bright'
                    : 'text-primary-silver'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
            <a 
              href="tel:0685523584" 
              className="hidden lg:flex items-center text-primary-silver hover:text-primary-bright font-medium"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span>06 8552 3584</span>
            </a>
            <Link
              to="/boeken"
              className="bg-gradient-primary text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              Boek Nu
            </Link>
          </nav>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute top-0 left-0 right-0 bg-primary-dark shadow-lg z-0 pt-20 pb-6 px-4 mobile-scroll no-bounce"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg py-2 border-b border-primary-ocean/20 ${
                  location.pathname === link.path
                    ? 'text-primary-bright font-medium'
                    : 'text-primary-silver'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:0685523584"
              className="text-lg py-2 border-b border-primary-ocean/20 flex items-center text-primary-silver"
            >
              <Phone className="w-5 h-5 mr-2" />
              <span>06 8552 3584</span>
            </a>
            <Link
              to="/boeken"
              className="mt-2 bg-gradient-primary text-white py-3 rounded-md font-medium text-center shadow-sm"
            >
              Boek Nu
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;