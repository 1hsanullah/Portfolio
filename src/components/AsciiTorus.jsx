import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';

const SHADES = '.,-~:;=!*#$@';
const R1 = 1;
const R2 = 2;
const K2 = 5;

const readColors = () => {
  const s = getComputedStyle(document.documentElement);
  return { fg: s.getPropertyValue('--fg').trim(), accent: s.getPropertyValue('--accent').trim() };
};

// A real-time ASCII torus, after Andy Sloane's donut.c. Drag (or just move the mouse) to spin it.
export default function AsciiTorus({ className }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const inView = useInView(wrap);
  const state = useRef({ A: 0.6, B: 0.3, vA: 0.012, vB: 0.006, tiltA: 0, tiltB: 0, drag: null, colors: null });

  useEffect(() => {
    const s = state.current;
    s.colors = readColors();
    const onTheme = () => requestAnimationFrame(() => (s.colors = readColors()));
    window.addEventListener('themechange', onTheme);
    return () => window.removeEventListener('themechange', onTheme);
  }, []);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext('2d');
    const s = state.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cols = 0, rows = 0, cw = 0, ch = 0, raf = 0;

    const resize = () => {
      const { width, height } = wrap.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = width * dpr;
      el.height = height * dpr;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const fontSize = width < 500 ? 10 : 12;
      ctx.font = `${fontSize}px "Geist Mono Variable", ui-monospace, monospace`;
      ctx.textBaseline = 'top';
      cw = ctx.measureText('M').width;
      ch = fontSize * 1.1;
      cols = Math.floor(width / cw);
      rows = Math.floor(height / ch);
    };

    const draw = () => {
      const size = cols * rows;
      const out = new Int8Array(size).fill(-1);
      const z = new Float32Array(size);
      const A = s.A + s.tiltA, B = s.B + s.tiltB;
      const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
      const aspect = cw / ch;
      const K1 = (Math.min(cols, rows / aspect) * K2 * 3) / (8 * (R1 + R2));

      for (let t = 0; t < 6.283; t += 0.06) {
        const ct = Math.cos(t), st = Math.sin(t);
        for (let p = 0; p < 6.283; p += 0.018) {
          const cp = Math.cos(p), sp = Math.sin(p);
          const cx = R2 + R1 * ct, cy = R1 * st;
          const x = cx * (cB * cp + sA * sB * sp) - cy * cA * sB;
          const y = cx * (sB * cp - sA * cB * sp) + cy * cA * cB;
          const ooz = 1 / (K2 + cA * cx * sp + cy * sA);
          const xp = Math.floor(cols / 2 + K1 * ooz * x);
          const yp = Math.floor(rows / 2 - K1 * ooz * y * aspect);
          if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue;
          const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
          const i = xp + yp * cols;
          if (L > 0 && ooz > z[i]) {
            z[i] = ooz;
            out[i] = Math.min(11, Math.floor(L * 8));
          }
        }
      }

      const w = cols * cw, h = rows * ch;
      ctx.clearRect(0, 0, w + cw, h + ch);
      const { fg, accent } = s.colors;
      for (let i = 0; i < size; i++) {
        const l = out[i];
        if (l < 0) continue;
        ctx.fillStyle = l >= 10 ? accent : fg;
        ctx.globalAlpha = l >= 10 ? 1 : 0.18 + (l / 11) * 0.7;
        ctx.fillText(SHADES[l], (i % cols) * cw, Math.floor(i / cols) * ch);
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!s.drag) {
        s.A += s.vA;
        s.B += s.vB;
        // ease spin back to cruising speed after a flick
        s.vA += (0.012 - s.vA) * 0.02;
        s.vB += (0.006 - s.vB) * 0.02;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced || !inView) draw();
    });
    ro.observe(wrap.current);

    if (reduced) draw();
    else if (inView) raf = requestAnimationFrame(loop);
    else draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inView]);

  // pointer: hover tilts, drag spins
  useEffect(() => {
    const el = wrap.current;
    const s = state.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      if (s.drag) {
        const dx = e.clientX - s.drag.x, dy = e.clientY - s.drag.y;
        s.B += dx * 0.01;
        s.A += dy * 0.01;
        s.vB = dx * 0.004;
        s.vA = dy * 0.004;
        s.drag = { x: e.clientX, y: e.clientY };
      } else {
        s.tiltB += (nx * 0.8 - s.tiltB) * 0.15;
        s.tiltA += (ny * 0.8 - s.tiltA) * 0.15;
      }
    };
    const onDown = (e) => {
      s.drag = { x: e.clientX, y: e.clientY };
      el.setPointerCapture?.(e.pointerId);
    };
    const onUp = () => (s.drag = null);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div ref={wrap} className={`ascii-torus ${className ?? ''}`} data-cursor="Drag" aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
