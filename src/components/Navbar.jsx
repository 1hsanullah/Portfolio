import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const Navbar = () => {
  // Initialize state from localStorage or use system preference as fallback
  const [darkMode, setDarkMode] = useState(() => {
    // Check if we have a saved preference
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode !== null) {
      return savedMode === 'true';
    } else {
      // Use system preference as fallback
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Apply the theme when component mounts and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full top-0 z-50 glass-morphism"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-apple-blue to-blue-600 origin-left"
        style={{ scaleX }}
      />
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Name */}
          <motion.div 
            className="flex-none"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h1 className="text-xl font-bold gradient-text">Ihsanullah Sadiq</h1>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-auto space-x-10">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="relative text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-all duration-200 font-medium text-sm tracking-wide"
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-apple-blue rounded-full"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-apple-gray-600 dark:text-apple-gray-300" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-apple-gray-600 dark:text-apple-gray-300" />
                )}
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-3 rounded-full hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-5 w-5 text-apple-gray-600 dark:text-apple-gray-300" />
                ) : (
                  <Bars3Icon className="h-5 w-5 text-apple-gray-600 dark:text-apple-gray-300" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden glass-morphism border-t border-white/10 dark:border-apple-gray-700/20"
          >
            <div className="container mx-auto container-padding py-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-4 text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue dark:hover:text-apple-blue transition-colors font-medium text-lg"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;