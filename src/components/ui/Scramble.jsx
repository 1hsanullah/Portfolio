import { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&01';

// Text that briefly decodes through random glyphs, on hover, or when `trigger` flips true.
export default function Scramble({ text, as: Tag = 'span', trigger, hover = true, duration = 600, className, ...rest }) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      let s = '';
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        s += i < settled || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, duration]);

  useEffect(() => {
    if (trigger) run();
  }, [trigger, run]);

  useEffect(() => {
    setOut(text);
    return () => cancelAnimationFrame(frame.current);
  }, [text]);

  return (
    <Tag className={className} onMouseEnter={hover ? run : undefined} aria-label={text} {...rest}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
