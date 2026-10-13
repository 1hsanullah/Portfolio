import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { nav, profile, socials } from '../data/content';
import useLocalTime from '../hooks/useLocalTime';
import { lockScroll, scrollToId } from '../lib/scroll';
import { toggleTheme } from '../lib/theme';
import Scramble from './ui/Scramble';
import { ease, easeOut } from '../lib/motion';

export default function Nav({ ready }) {
  const time = useLocalTime(profile.timezone);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progress = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (progress.current) progress.current.textContent = String(Math.round(v * 100)).padStart(3, '0');
  });
  // Tuck the bar away while scrolling down, bring it back on the way up.
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 300);
  });

  useEffect(() => {
    lockScroll(open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // wait for the overlay to start closing before scrolling
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -90 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <a href="#top" className="nav__brand" onClick={go('top')} aria-label="Back to top">
          <span className="nav__mark">IS</span>
          <span className="nav__name">
            <Scramble text={profile.name} />
          </span>
        </a>

        <div className="nav__clock mono">
          <span className="dot-live" /> LDN {time}
        </div>

        <ul className="nav__links mono">
          {nav.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={go(item.id)}>
                <span className="muted">0{i + 1}</span> <Scramble text={item.label} />
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__actions mono">
          <span className="nav__progress" aria-hidden="true">
            <span ref={progress}>000</span>%
          </span>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle colour theme" data-cursor="Invert">
            <span />
          </button>
          <button className="nav__menu" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <ul>
              {nav.map((item, i) => (
                <li key={item.id} className="mask">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: easeOut, delay: 0.2 + i * 0.06 }}
                  >
                    <span className="mono muted">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="menu__foot mono">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
