import { education } from '../data/content';
import { FadeUp } from './ui/Reveal';
import SectionHead from './ui/SectionHead';

export default function Education() {
  return (
    <section id="education" className="section education">
      <SectionHead index="04" label="Education" meta="London, 2019 - 2024" />
      <div className="edu">
        {education.map((e, i) => (
          <FadeUp key={e.degree} className="edu__card" delay={i * 0.1}>
            <div className="edu__years">
              {e.years[0]}
              <span className="muted"> - </span>
              {e.years[1]}
            </div>
            <div className="edu__head">
              <img src={e.logo} alt="" className="edu__logo" />
              <div>
                <h3 className="edu__degree">{e.degree}</h3>
                <p className="muted">{e.school}</p>
              </div>
            </div>
            <div className="edu__grade mono">
              <span className="muted">grade</span> <span className="accent">{e.grade}</span>
            </div>
            <ul className="edu__items mono">
              {e.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
