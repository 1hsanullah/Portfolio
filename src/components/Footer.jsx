import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { profile, socials } from '../data/content';
import useLocalTime from '../hooks/useLocalTime';
import { scrollToId } from '../lib/scroll';
import Scramble from './ui/Scramble';

export default function Footer() {
  const time = useLocalTime(profile.timezone);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-40%', '0%']);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__top">
        <div className="footer__col mono">
          <span className="muted">Socials</span>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
              <Scramble text={s.label} /> ↗
            </a>
          ))}
        </div>
        <div className="footer__col mono">
          <span className="muted">Local time</span>
          <span>
            {time} <span className="muted">London</span>
          </span>
        </div>
        <div className="footer__col mono">
          <span className="muted">Colophon</span>
          <span>React, Framer Motion, Lenis</span>
          <span>Geist &amp; Instrument Serif</span>
        </div>
        <div className="footer__col mono footer__col--end">
          <button onClick={() => scrollToId('top')} data-cursor="Top">
            Back to top ↑
          </button>
          <span className="muted">© {new Date().getFullYear()} {profile.name}</span>
        </div>
      </div>
      <div className="footer__mark" aria-hidden="true">
        <motion.span style={{ y }}>{profile.first}</motion.span>
      </div>
    </footer>
  );
}
