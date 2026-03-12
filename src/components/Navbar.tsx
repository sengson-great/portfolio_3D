import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home',       id: 'home' },
  { label: 'Skills',     id: 'skills' },
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Education',  id: 'education' },
  { label: 'Languages',  id: 'languages' },
  { label: 'Contact',    id: 'contact' },
];

const NAVBAR_HEIGHT = 72;

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Ref to pause scroll spy during link clicks
  const isClickScrolling = useRef(false);

  // Detect scroll for navbar blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Center-screen active section detector (extremely reliable)
  useEffect(() => {
    const handleScroll = () => {
      // If we are actively scrolling because the user clicked a link, 
      // do not update the active section so the pill doesn't "messily" jump through everything.
      if (isClickScrolling.current) return;

      // A very solid and reliable trigger line at 40% down the screen
      const triggerLine = window.innerHeight * 0.4; 
      let current = 'home';

      // Iterate through links in strict order.
      // The LAST section whose top edge has passed the trigger line is the active one.
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            current = link.id;
          }
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);

    // Pause scroll spy
    isClickScrolling.current = true;
    
    // Resume scroll spy after smooth scroll is likely finished
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    // Perform the scroll
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'navbar-scrolled' : 'navbar-top'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-sm">SV</span>
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:block">
              Seng Vengchhourng
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  activeSection === link.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                    // Snappy spring config to prevent a "messy" laggy animation
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Elegant Sliding Dark/Light Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full border border-border bg-secondary flex items-center transition-all duration-300 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              whileTap={{ scale: 0.93 }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {/* Track icons */}
              <Sun className="absolute left-1.5 w-3.5 h-3.5 text-amber-400 opacity-80" />
              <Moon className="absolute right-1.5 w-3.5 h-3.5 text-indigo-400 opacity-80" />
              {/* Thumb */}
              <motion.span
                className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent shadow-md"
                animate={{ x: theme === 'light' ? 2 : 30 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              />
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg border border-border hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all duration-200"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu fixed top-[72px] left-4 right-4 z-40 rounded-2xl border border-border p-4 shadow-card md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
