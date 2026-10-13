import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { experience, projects } from '../data/content';
import { ease } from '../lib/motion';

const LINES = [
  ['IHSAN.SYS', 'v2.0, cold boot'],
  ['ok', 'mounting /dev/curiosity'],
  ['ok', 'loading modules: react, framer-motion, coffee'],
  ['ok', `compiling experience ........ ${experience.length} roles`],
  ['ok', `indexing projects ........... ${projects.length} featured`],
  ['ok', 'calibrating cursor'],
  ['>', 'ready'],
];

const DURATION = 2100;

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [shown, setShown] = useState(1);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-in-out so the counter hesitates like a real loader
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      setShown(1 + Math.floor(eased * (LINES.length - 1) + 0.0001));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease }}
      onClick={onDone}
      data-cursor="Skip"
    >
      <div className="preloader__log mono">
        {LINES.slice(0, shown).map(([tag, text], i) => (
          <div key={i} className="preloader__line">
            <span className={tag === 'ok' ? 'accent' : ''}>{tag === 'ok' ? '[ ok ]' : tag}</span> {text}
            {i === shown - 1 && <span className="caret" />}
          </div>
        ))}
      </div>
      <div className="preloader__meta mono">
        <span>Ihsanullah Sadiq</span>
        <span>Portfolio ©{new Date().getFullYear()}</span>
      </div>
      <div className="preloader__count">
        {String(count).padStart(3, '0')}
        <span className="accent">%</span>
      </div>
      <motion.div className="preloader__bar" style={{ scaleX: count / 100 }} />
    </motion.div>
  );
}
