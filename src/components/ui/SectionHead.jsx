import { motion } from 'framer-motion';
import { MaskReveal } from './Reveal';
import { easeOut } from '../../lib/motion';

// "(02)  Selected work ............ 4 projects"
export default function SectionHead({ index, label, title, meta }) {
  return (
    <header className="section-head">
      <div className="section-head__bar mono">
        <span>({index})</span>
        <span>{label}</span>
        <motion.span
          className="section-head__line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeOut }}
        />
        {meta && <span className="muted">{meta}</span>}
      </div>
      {title && (
        <h2 className="section-head__title">
          {title.map((line, i) => (
            <MaskReveal key={i} delay={i * 0.08}>
              {line}
            </MaskReveal>
          ))}
        </h2>
      )}
    </header>
  );
}
