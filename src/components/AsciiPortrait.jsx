import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';

const RAMP = ' .:-=+*#%@';
const INK = '#121211';
// Crop of the source photo (x, y, w, h as fractions) that frames the portrait.
const CROP = [0.27, 0.24, 0.56, 0.62];
const RADIUS = 46; // px around the pointer that pushes glyphs away

// A small ASCII portrait. Move through it and the characters scatter, then spring back into place.
export default function AsciiPortrait({ src, alt }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const inView = useInView(wrap, '100px');
  const s = useRef({ img: null, lum: null, cols: 0, rows: 0, cw: 0, ch: 0, mx: -999, my: -999, ox: null, oy: null, vx: null, vy: null });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      s.current.img = img;
      s.current.sample?.();
    };
  }, [src]);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext('2d');
    const st = s.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, w = 0, h = 0, accent = '#ff5b1f';

    const readAccent = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || accent;
    };

    // Downsample the cropped photo to one luminance value per character cell.
    st.sample = () => {
      if (!st.img || !st.cols) return;
      const off = document.createElement('canvas');
      off.width = st.cols;
      off.height = st.rows;
      const octx = off.getContext('2d', { willReadFrequently: true });
      const { naturalWidth: iw, naturalHeight: ih } = st.img;
      octx.drawImage(st.img, CROP[0] * iw, CROP[1] * ih, CROP[2] * iw, CROP[3] * ih, 0, 0, st.cols, st.rows);
      const data = octx.getImageData(0, 0, st.cols, st.rows).data;
      const n = st.cols * st.rows;
      const raw = new Float32Array(n);
      for (let i = 0; i < n; i++) raw[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;
      // stretch the histogram so the face fills the ramp
      const sorted = Float32Array.from(raw).sort();
      const lo = sorted[Math.floor(n * 0.03)];
      const hi = sorted[Math.floor(n * 0.97)];
      st.lum = raw.map((l) => Math.pow(Math.min(1, Math.max(0, (l - lo) / (hi - lo || 1))), 0.85));
      st.ox = new Float32Array(n);
      st.oy = new Float32Array(n);
      st.vx = new Float32Array(n);
      st.vy = new Float32Array(n);
    };

    const resize = () => {
      const r = wrap.current.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = w * dpr;
      el.height = h * dpr;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '7px "Geist Mono Variable", ui-monospace, monospace';
      ctx.textBaseline = 'top';
      st.cw = ctx.measureText('M').width;
      st.ch = 7.4;
      st.cols = Math.ceil(w / st.cw);
      st.rows = Math.ceil(h / st.ch);
      st.sample();
      readAccent();
    };

    // Spring every glyph back to its home cell, and push the ones near the pointer outward.
    const step = () => {
      if (!st.lum) return false;
      let moving = false;
      for (let y = 0; y < st.rows; y++) {
        for (let x = 0; x < st.cols; x++) {
          const i = x + y * st.cols;
          const hx = x * st.cw + st.cw / 2, hy = y * st.ch + st.ch / 2;
          const dx = hx + st.ox[i] - st.mx, dy = hy + st.oy[i] - st.my;
          const d2 = dx * dx + dy * dy;
          if (d2 < RADIUS * RADIUS && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / RADIUS) * 2.4;
            st.vx[i] += (dx / d) * f;
            st.vy[i] += (dy / d) * f;
          }
          st.vx[i] = (st.vx[i] - st.ox[i] * 0.06) * 0.84;
          st.vy[i] = (st.vy[i] - st.oy[i] * 0.06) * 0.84;
          st.ox[i] += st.vx[i];
          st.oy[i] += st.vy[i];
          if (Math.abs(st.ox[i]) + Math.abs(st.oy[i]) > 0.05) moving = true;
        }
      }
      return moving;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!st.lum) return;
      for (let y = 0; y < st.rows; y++) {
        for (let x = 0; x < st.cols; x++) {
          const i = x + y * st.cols;
          const l = 1 - st.lum[i]; // ink on paper: darker pixel, denser glyph
          const idx = Math.floor(l * (RAMP.length - 1));
          if (idx <= 0) continue;
          const off = Math.abs(st.ox[i]) + Math.abs(st.oy[i]);
          ctx.fillStyle = off > 3 ? accent : INK;
          ctx.globalAlpha = 0.3 + l * 0.7;
          ctx.fillText(RAMP[idx], x * st.cw + st.ox[i], y * st.ch + st.oy[i]);
        }
      }
      ctx.globalAlpha = 1;
    };

    // Only animate while something is moving; otherwise the canvas sits still.
    let running = false;
    const loop = () => {
      const moving = step();
      draw();
      if (moving || st.mx > -500) raf = requestAnimationFrame(loop);
      else running = false;
    };
    st.kick = () => {
      if (running || reduced || !inView) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap.current);
    const onTheme = () =>
      requestAnimationFrame(() => {
        readAccent();
        draw();
      });
    window.addEventListener('themechange', onTheme);
    const once = () => (st.lum ? draw() : (raf = requestAnimationFrame(once)));
    raf = requestAnimationFrame(once);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      ro.disconnect();
      window.removeEventListener('themechange', onTheme);
    };
  }, [inView]);

  const onMove = (e) => {
    const r = wrap.current.getBoundingClientRect();
    s.current.mx = e.clientX - r.left;
    s.current.my = e.clientY - r.top;
    s.current.kick?.();
  };
  const onLeave = () => {
    s.current.mx = -999;
    s.current.my = -999;
  };

  return (
    <div
      ref={wrap}
      className="ascii-portrait"
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={onLeave}
      onPointerUp={(e) => e.pointerType !== 'mouse' && onLeave()}
      role="img"
      aria-label={alt}
      data-cursor="Scatter"
    >
      <canvas ref={canvas} />
    </div>
  );
}
