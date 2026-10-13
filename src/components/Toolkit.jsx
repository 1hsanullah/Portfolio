import { certifications, skills } from '../data/content';
import { FadeUp } from './ui/Reveal';
import SectionHead from './ui/SectionHead';

const groups = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Build with' },
  { key: 'tools', label: 'AI, data & tooling' },
];

export default function Toolkit() {
  return (
    <section id="toolkit" className="section toolkit">
      <SectionHead
        index="05"
        label="Toolkit"
        meta="day to day"
        title={[
          <>
            The <em>stack</em>
          </>,
        ]}
      />
      <div className="toolkit__grid">
        {groups.map((g, gi) => (
          <FadeUp key={g.key} className="toolkit__col" delay={gi * 0.08}>
            <h3 className="toolkit__label mono">
              <span className="accent">{`{${gi}}`}</span> {g.label}
            </h3>
            <ul>
              {skills[g.key].map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </FadeUp>
        ))}
        <FadeUp className="toolkit__col" delay={0.24}>
          <h3 className="toolkit__label mono">
            <span className="accent">{'{3}'}</span> Certifications
          </h3>
          <ul className="certs">
            {certifications.map((c) => (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" data-cursor="Verify">
                  <span className="mono muted">{c.issuer}</span>
                  <span>{c.name}</span>
                  <span className="accent">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
      <FadeUp>
        <p className="toolkit__also mono">
          <span className="muted">also used on smaller projects:</span> {skills.alsoUsed.join(' · ')}
        </p>
      </FadeUp>
    </section>
  );
}
