import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useMedia from '../hooks/useMedia';

// Crosshair cursor with a live coordinate readout. Elements opt into a label with
// data-cursor="View" and the ring grows and shows that word instead.
export default function Cursor() {
  const fine = useMedia('(hover: hover) and (pointer: fine)');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });
  const coords = useRef(null);
  const [state, setState] = useState({ mode: 'idle', label: '' });
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add('has-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (coords.current) {
        coords.current.textContent = `${String(Math.round(e.clientX)).padStart(4, '0')} · ${String(Math.round(e.clientY)).padStart(4, '0')}`;
      }
      setVisible(true);
    };
    const over = (e) => {
      const t = e.target;
      const labelled = t.closest?.('[data-cursor]');
      if (labelled) {
        const label = labelled.getAttribute('data-cursor');
        setState(label === 'hide' ? { mode: 'hidden', label: '' } : { mode: 'label', label });
        return;
      }
      if (t.closest?.('input, textarea, [contenteditable]')) return setState({ mode: 'text', label: '' });
      if (t.closest?.('a, button, [role="button"], label, summary')) return setState({ mode: 'hover', label: '' });
      setState({ mode: 'idle', label: '' });
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', press);
    window.addEventListener('mouseup', release);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      window.removeEventListener('mousedown', press);
      window.removeEventListener('mouseup', release);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const size = { idle: 34, hover: 64, label: 96, text: 4, hidden: 0 }[state.mode];

  return (
    <div className={`cursor ${visible ? 'is-visible' : ''} cursor--${state.mode}`} aria-hidden="true">
      <motion.div className="cursor__ring" style={{ x: rx, y: ry }}>
        <motion.div
          className="cursor__ring-inner"
          style={{ x: '-50%', y: '-50%' }}
          animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        >
          <span className="cursor__label">{state.label}</span>
        </motion.div>
        <span ref={coords} className="cursor__coords mono" />
      </motion.div>
      <motion.div className="cursor__dot" style={{ x, y }} />
    </div>
  );
}
