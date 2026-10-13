import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Nav from './components/Nav';
import Preloader from './components/Preloader';
import Terminal from './components/Terminal';
import Toolkit from './components/Toolkit';
import Work from './components/Work';
import { marquee } from './data/content';
import { destroySmoothScroll, initSmoothScroll, lockScroll } from './lib/scroll';

// Show the boot sequence once per visit, and never to people who prefer less motion.
const shouldBoot = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem('booted');
  } catch {
    return true;
  }
};

export default function App() {
  const [booting, setBooting] = useState(shouldBoot);
  const [ready, setReady] = useState(!booting);

  useEffect(() => {
    initSmoothScroll();
    return destroySmoothScroll;
  }, []);

  useEffect(() => {
    lockScroll(booting);
  }, [booting]);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem('booted', '1');
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
    setBooting(false);
    setTimeout(() => setReady(true), 350);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{booting && <Preloader onDone={finishBoot} />}</AnimatePresence>
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <div className="guides" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee items={marquee} />
        <About />
        <Work />
        <Experience />
        <Education />
        <Toolkit />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
