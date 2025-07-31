import Navbar from './components/Navbar'
import About from './components/About'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import FloatingActionButton from './components/FloatingActionButton'
import ScrollToTop from './components/ScrollToTop'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import githubIcon from './assets/socials/github.png';
import linkedinIcon from './assets/socials/linkedin.png';
import gmailIcon from './assets/socials/gmail.png';
import githubIconWhite from './assets/socials/github_white.png';
import linkedinIconWhite from './assets/socials/linkedin_white.png';
import gmailIconWhite from './assets/socials/gmail_white.png';
import profileImage from './assets/profile_img.jpg';

function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // Use system preference as fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Set initial dark mode state based on localStorage or system preference
    const savedMode = localStorage.getItem('darkMode');
    let initialDarkMode;
    
    if (savedMode !== null) {
      initialDarkMode = savedMode === 'true';
    } else {
      initialDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    setIsDarkMode(initialDarkMode);

    // Watch for class changes on document element
    const observer = new MutationObserver(() => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDarkMode(hasDarkClass);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Also listen for localStorage changes (in case of manual updates)
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        setIsDarkMode(savedMode === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: isDarkMode ? githubIconWhite : githubIcon,
      url: "https://github.com/1hsanullah",
      alt: "GitHub"
    },
    {
      icon: isDarkMode ? linkedinIconWhite : linkedinIcon,
      url: "https://www.linkedin.com/in/ihsanullah-sadiq-624a5b201/",
      alt: "LinkedIn"
    },
    {
      icon: isDarkMode ? gmailIconWhite : gmailIcon,
      url: "mailto:isadiq715@gmail.com",
      alt: "Email"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden section-spacing pt-28">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-100 dark:from-apple-gray-900 dark:via-apple-gray-800 dark:to-apple-gray-900"
          style={{ y: y1 }}
        ></motion.div>
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,122,255,0.05),transparent_50%)]"
          style={{ y: y2 }}
        ></motion.div>
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,69,19,0.03),transparent_50%)]"
          style={{ y: y3 }}
        ></motion.div>
        
        <div className="relative container mx-auto container-padding">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
            
            {/* Text content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium">
                  Software Engineer
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Hi, I'm{' '}
                <span className="gradient-text">
                  Ihsanullah Sadiq
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-apple-gray-600 dark:text-apple-gray-300 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                A Software Engineer at{' '}
                <span className="font-semibold text-apple-blue">Differentia Consulting</span>{' '}
                who enjoys building amazing digital experiences.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button 
                  onClick={scrollToContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-apple-blue text-white rounded-2xl font-semibold text-lg shadow-apple hover:shadow-apple-hover transition-all duration-300"
                >
                  Get in touch
                </motion.button>
                
                <motion.a
                  href="/resume.pdf" // Add your resume PDF to the public folder
                  download="Ihsanullah_Sadiq_Resume.pdf"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 glass-morphism rounded-2xl font-semibold text-lg text-apple-gray-700 dark:text-apple-gray-200 hover:bg-white/90 dark:hover:bg-apple-gray-800/90 transition-all duration-300 group border-2 border-apple-blue/30 hover:border-apple-blue/60 dark:border-white/20 dark:hover:border-white/40 shadow-apple hover:shadow-apple-hover"
                >
                  <motion.svg 
                    className="w-6 h-6 group-hover:scale-110 transition-transform text-apple-blue" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </motion.svg>
                  <span className="relative group-hover:text-apple-blue transition-colors duration-300">
                    Download Resume
                    <motion.div
                      className="absolute -inset-1 bg-apple-blue/10 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </span>
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-apple-gray-300 dark:border-apple-gray-600 rounded-2xl font-semibold text-lg text-apple-gray-700 dark:text-apple-gray-200 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-800 transition-all duration-300"
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn more
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Profile image and socials */}
            <motion.div 
              className="lg:w-1/2 flex flex-col items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <motion.div 
                className="relative w-80 h-80 mb-8"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-apple-blue/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <motion.div 
                  className="relative w-full h-full rounded-full overflow-hidden shadow-apple-hover border-4 border-white/50 dark:border-apple-gray-700/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>

              {/* Social Icons */}
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 bg-white/90 dark:bg-apple-gray-800/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-apple hover:shadow-apple-hover dark:shadow-apple-dark dark:hover:shadow-apple-dark-hover border border-apple-gray-200/50 dark:border-apple-gray-700/50 transition-all duration-300 group"
                  >
                    <img 
                      src={social.icon} 
                      alt={social.alt}
                      className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <About />
      <Achievements />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <FloatingActionButton />
      <ScrollToTop />
    </div>
  )
}

export default App
