import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, BookOpen, Star, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Logo = ({ className, light = false }: { className?: string; light?: boolean }) => (
  <Link to="/" className={cn("flex items-center gap-2 group", className)}>
    <img 
      src="https://assets.cdn.filesafe.space/JF29jtnubhqtdPivD9K0/media/69c2fb89eaed0641ffa6a9f1.svg" 
      alt="Soul Dog Stories Logo" 
      className="h-10 md:h-12 w-auto object-contain transition-all duration-700 group-hover:scale-105 group-hover:rotate-[-2deg]"
      referrerPolicy="no-referrer"
    />
  </Link>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Books', path: '/#our-books' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Reviews', path: '/#reviews' },
  ];

  return (
    <div className="sticky top-0 z-[60] w-full">
      <div className="bg-navy text-cream py-2 px-4 flex justify-center items-center gap-4 text-[9px] font-bold tracking-[0.4em] uppercase border-b border-white/5 overflow-hidden">
        <div className="flex items-center gap-4">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>The World's Most Personal Legacy</span>
          <Sparkles className="w-3 h-3 text-gold" />
        </div>
      </div>
      
      <header className={cn(
        "transition-all duration-700 px-6 md:px-12 flex justify-between items-center w-full",
        scrolled 
          ? "bg-white/90 backdrop-blur-2xl py-3 shadow-2xl shadow-navy/5 border-b border-gray-100/50" 
          : "bg-white py-5 border-b border-transparent"
      )}>
        <Logo />

        <nav className="hidden md:flex gap-12 text-[10px] font-bold text-navy/60 uppercase tracking-[0.3em]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "hover:text-navy transition-all relative group py-2",
                location.pathname === link.path && "text-navy"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-500 ease-out group-hover:w-full",
                location.pathname === link.path && "w-full"
              )} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <Link 
            to="/customize" 
            className="hidden lg:flex items-center gap-3 text-[10px] font-bold text-navy uppercase tracking-[0.2em] group"
          >
            <span>Start Your Story</span>
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-cream transition-all duration-500">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-navy hover:text-gold transition-all group">
              <ShoppingBag className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xl border-2 border-white">
                0
              </span>
            </button>
            <button 
              className="md:hidden p-2 text-navy hover:bg-gray-50 rounded-full transition-all" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col p-10 gap-8 md:hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-left text-4xl font-display text-navy hover:text-gold transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full"
              >
                <Link
                  to="/customize"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 w-full py-5 bg-navy text-cream text-center rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 group"
                >
                  Start Customizing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white py-16 px-6 md:px-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start">
        <Logo className="mb-4" />
        <p className="text-gray-400 text-sm">© 2026 Soul Dog Stories. All rights reserved.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-navy">
        <Link to="/privacy" className="hover:text-gold">Privacy</Link>
        <Link to="/terms" className="hover:text-gold">Terms</Link>
        <Link to="/contact" className="hover:text-gold">Contact</Link>
        <Link to="/shipping" className="hover:text-gold">Shipping</Link>
      </div>
    </div>
  </footer>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);
