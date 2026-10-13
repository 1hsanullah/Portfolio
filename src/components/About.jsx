import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import profileImg from '../assets/profile_img.jpg';
import { about, profile, stats } from '../data/content';
import AsciiPortrait from './AsciiPortrait';
import Counter from './ui/Counter';
import { FadeUp } from './ui/Reveal';
import SectionHead from './ui/SectionHead';

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="word">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  );
};

// Words light up one by one as the paragraph scrolls through the viewport.
function ScrollParagraph({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="about__lead">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="section about">
      <SectionHead index="01" label="About" meta={profile.location} />

      <div className="about__grid">
        <FadeUp className="about__side">
          <div className="about__card">
            <AsciiPortrait src={profileImg} alt={`Portrait of ${profile.name}`} />
            <dl className="about__whoami mono">
              <div>
                <dt>name</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>role</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>based</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>status</dt>
                <dd>
                  <span className="dot-live" />
                  open to work
                </dd>
              </div>
            </dl>
          </div>
          <div className="about__caption mono muted">fig. 01 · move through it</div>
        </FadeUp>

        <div className="about__text">
          <ScrollParagraph text={about.lead} />
          <div className="about__body">
            {about.body.map((p, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <p>{p}</p>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="about__traits mono">
            {about.traits.map((t, i) => (
              <span key={t}>
                <span className="accent">{String(i + 1).padStart(2, '0')}</span> {t}
              </span>
            ))}
          </FadeUp>
        </div>
      </div>

      <div className="stats">
        {stats.map((s, i) => (
          <FadeUp key={s.label} className="stat" delay={(i % 3) * 0.08}>
            <div className="stat__value">
              {s.text ? <span>{s.text}</span> : <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />}
            </div>
            <div className="stat__label mono">{s.label}</div>
            <div className="stat__note muted">{s.note}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
