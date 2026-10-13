import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { experience } from '../data/content';
import { FadeUp } from './ui/Reveal';
import { easeOut } from '../lib/motion';
import SectionHead from './ui/SectionHead';

// Deterministic fake commit hash so each role keeps the same id between renders.
const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

function Commit({ item, open, onToggle }) {
  const branch = item.ref && !item.ref.startsWith('HEAD');
  return (
    <li className={`commit ${open ? 'is-open' : ''} ${branch ? 'commit--branch' : ''}`}>
      <div className="commit__graph" aria-hidden="true">
        <span className="commit__node" />
      </div>
      <div className="commit__body">
        <button className="commit__head" onClick={onToggle} aria-expanded={open} data-cursor={open ? 'Close' : 'Expand'}>
          <span className="commit__hash mono accent">{hash(item.role + item.org)}</span>
          {item.ref && <span className="commit__ref mono">({item.ref})</span>}
          <span className="commit__title">
            {item.role} <span className="muted">@</span> {item.org}
          </span>
          <span className="commit__date mono muted">{item.period}</span>
          <span className="commit__toggle mono">{open ? '−' : '+'}</span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="commit__detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <div className="commit__detail-inner">
                <div className="commit__info mono">
                  <img src={item.logo} alt="" className="commit__logo" />
                  <span>{item.type}</span>
                  <span className="muted">{item.location}</span>
                </div>
                <div>
                  <p className="commit__summary">{item.summary}</p>
                  <ul className="commit__points">
                    {item.points.map((p) => (
                      <li key={p}>
                        <span className="accent mono">+</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export default function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" className="section experience">
      <SectionHead
        index="03"
        label="Experience"
        meta={`${experience.length} commits`}
        title={[
          <>
            A short <em>history</em>
          </>,
          'of the work.',
        ]}
      />
      <FadeUp>
        <div className="gitlog">
          <div className="gitlog__cmd mono">
            <span className="accent">~/career</span> <span className="muted">on</span> main <span className="muted">$</span> git log --graph
            --decorate
          </div>
          <ol className="gitlog__list">
            {experience.map((item, i) => (
              <Commit
                key={item.org + item.role}
                item={item}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ol>
        </div>
      </FadeUp>
    </section>
  );
}
