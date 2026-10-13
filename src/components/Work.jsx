import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useState } from 'react';
import { archive, projects } from '../data/content';
import { easeOut } from '../lib/motion';
import { FadeUp } from './ui/Reveal';
import SectionHead from './ui/SectionHead';

const slug = (p) => p.url?.split('github.com/')[1] ?? `1hsanullah/${p.id}`;

// The session the floating terminal "runs" for a project.
function session(p) {
  const lines = [
    { cmd: `cd ~/${p.id}` },
    { cmd: 'ls' },
    { out: p.tree.join('   ') },
    { cmd: 'git rev-list --count HEAD' },
    { out: `${p.commits} commits` },
  ];
  if (p.visibility === 'private') {
    lines.push(
      { cmd: `git clone github.com/${slug(p)}` },
      { out: 'fatal: repository is private', tone: 'accent' },
      { out: 'details on request → scroll to contact', tone: 'muted' }
    );
  } else if (p.run) {
    lines.push({ cmd: p.run[0] }, { out: p.run[1], tone: 'ok' });
  } else {
    lines.push({ cmd: 'open .' }, { out: `github.com/${slug(p)}`, tone: 'ok' });
  }
  return lines;
}

// A terminal window that trails the pointer and types a short session for the hovered project.
function Preview({ active, x, y }) {
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });
  const vx = useVelocity(sx);
  const rotate = useSpring(useTransform(vx, [-2000, 2000], [-8, 8], { clamp: true }), { stiffness: 200, damping: 25 });
  const p = active === null ? null : projects[active];

  return (
    <motion.div className="preview" style={{ x: sx, y: sy, rotate }} aria-hidden="true">
      <motion.div
        className="preview__window"
        initial={false}
        animate={{ scale: p ? 1 : 0, opacity: p ? 1 : 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <div className="preview__chrome mono">
          <span className="preview__dots">
            <i />
            <i />
            <i />
          </span>
          <span>~/{p?.id ?? ''}</span>
          {p && <span className={`preview__vis preview__vis--${p.visibility}`}>{p.visibility}</span>}
        </div>
        <div className="preview__body mono">
          <AnimatePresence mode="wait">
            {p && (
              <motion.div key={p.id} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                {session(p).map((l, i) => (
                  <motion.div
                    key={i}
                    className={`preview__line ${l.tone ? `preview__line--${l.tone}` : ''}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.25 }}
                  >
                    {l.cmd ? (
                      <>
                        <span className="accent">$</span> {l.cmd}
                      </>
                    ) : (
                      l.out
                    )}
                  </motion.div>
                ))}
                <span className="caret" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Row({ project: p, index, onEnter }) {
  const isPublic = p.visibility === 'public';
  const Tag = isPublic ? 'a' : 'div';
  const linkProps = isPublic ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <FadeUp delay={Math.min(index, 3) * 0.05}>
      <div
        className={`row row--${p.visibility}`}
        onMouseEnter={onEnter}
        onClick={(e) => {
          // the whole row opens the repo; inner links keep their own targets
          if (isPublic && !e.target.closest('a')) window.open(p.url, '_blank', 'noopener');
        }}
        data-cursor={isPublic ? 'Open ↗' : 'Private'}
      >
        <span className="row__index mono">{String(index + 1).padStart(2, '0')}</span>
        <div className="row__main">
          <Tag className="row__title-link" {...linkProps}>
            <h3 className="row__title">
              <span className="row__title-text">{p.title}</span>
              {isPublic && <span className="row__arrow accent">↗</span>}
            </h3>
          </Tag>
          <p className="row__desc">{p.description}</p>
          {p.links && (
            <div className="row__links mono">
              {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" data-cursor="Open ↗">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="row__meta mono">
          <span>
            {p.kind} <span className="muted">· {p.year}</span>
          </span>
          <span className={`badge badge--${p.visibility}`}>{isPublic ? 'Public repo' : 'Private'}</span>
          <span className="muted row__stack">{p.stack.join(' · ')}</span>
        </div>
      </div>
    </FadeUp>
  );
}

function Archive() {
  return (
    <div className="archive">
      <div className="archive__head mono">
        <span>
          <span className="accent">$</span> ls ~/archive
        </span>
        <span className="muted">{archive.length} entries</span>
      </div>
      <ul>
        {archive.map((a) => {
          const Tag = a.url ? 'a' : 'div';
          const props = a.url ? { href: a.url, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': 'Open ↗' } : {};
          return (
            <li key={a.title}>
              <Tag className={`archive__row ${a.url ? 'is-link' : ''}`} {...props}>
                <span className="archive__year mono muted">{a.year}</span>
                <span className="archive__title">{a.title}</span>
                <span className="archive__what">{a.what}</span>
                <span className="archive__stack mono muted">{a.stack}</span>
                <span className="archive__go mono">{a.url ? '↗' : '·'}</span>
              </Tag>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const publicCount = projects.filter((p) => p.visibility === 'public').length;

  return (
    <section id="work" className="section work">
      <SectionHead
        index="02"
        label="Selected work"
        meta={`${projects.length} featured · ${publicCount} public`}
        title={[
          <>
            Things I&apos;ve <em>built</em>
          </>,
          'and shipped.',
        ]}
      />
      <div className="rows" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <Row key={p.id} project={p} index={i} onEnter={() => setActive(i)} />
        ))}
      </div>
      <Preview active={active} x={x} y={y} />
      <FadeUp>
        <Archive />
      </FadeUp>
    </section>
  );
}
