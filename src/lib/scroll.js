import Lenis from 'lenis';

// A single Lenis instance shared by every component that needs to scroll.
let lenis = null;

export function initSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  const raf = (time) => {
    lenis?.raf(time);
    if (lenis) requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export function scrollToId(id, opts = {}) {
  const target = id === 'top' ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -24, ...opts });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
