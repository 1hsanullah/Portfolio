import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { profile } from '../data/content';
import { scrollToId } from '../lib/scroll';
import AsciiTorus from './AsciiTorus';
import { easeOut } from '../lib/motion';

const Letters = ({ word, delay, ready }) => (
  <span className="hero__word" aria-hidden="true">
    {word.split('').map((c, i) => (
      <span key={i} className="mask">
        <motion.span
          initial={{ y: '105%' }}
          animate={ready ? { y: '0%' } : {}}
          transition={{ duration: 1.1, ease: easeOut, delay: delay + i * 0.035 }}
        >
          {c}
        </motion.span>
      </span>
    ))}
  </span>
);

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const torusY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const appear = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease: easeOut, delay },
  });

  return (
    <section id="top" className="hero" ref={ref}>
      <motion.div className="hero__meta mono" {...appear(0.9)}>
        <span>{profile.coords}</span>
        <span>
          {profile.role} @ {profile.company}
        </span>
        <span className="hero__status">
          <span className="dot-live" /> Open to opportunities
        </span>
      </motion.div>

      <div className="hero__stage">
        <motion.div
          className="hero__torus"
          style={{ y: torusY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.6, ease: easeOut, delay: 0.5 }}
        >
          <AsciiTorus />
          <span className="hero__torus-cap mono muted">fig. 00 · torus.c, live ascii · drag me</span>
        </motion.div>

        <motion.h1 className="hero__name" style={{ y: nameY, opacity: fade }} aria-label={profile.name}>
          <Letters word={profile.first} delay={0.1} ready={ready} />
          <Letters word={profile.last} delay={0.35} ready={ready} />
        </motion.h1>
      </div>

      <div className="hero__foot">
        <motion.p className="hero__intro" {...appear(1.2)}>
          I build reliable software and <em>thoughtful</em> digital experiences, from neural networks to the
          interfaces people touch.
        </motion.p>
        <motion.button className="hero__scroll mono" onClick={() => scrollToId('about')} {...appear(1.35)} data-cursor="Scroll">
          <span className="hero__scroll-line" />
          Scroll to explore
        </motion.button>
      </div>
    </section>
  );
}
