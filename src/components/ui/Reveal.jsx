import { motion } from 'framer-motion';
import { easeOut } from '../../lib/motion';

// Slides content up from behind a mask the first time it scrolls into view.
export function MaskReveal({ children, delay = 0, className = '', as = 'div', once = true }) {
  const Tag = motion[as];
  return (
    <span className={`mask ${className}`}>
      <Tag
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, ease: easeOut, delay }}
        style={{ display: 'block' }}
      >
        {children}
      </Tag>
    </span>
  );
}

export function FadeUp({ children, delay = 0, className, y = 24, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
