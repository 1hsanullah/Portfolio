import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { about, archive, certifications, education, experience, profile, projects, skills, socials } from '../data/content';
import { scrollToId } from '../lib/scroll';
import { toggleTheme } from '../lib/theme';
import { FadeUp } from './ui/Reveal';
import SectionHead from './ui/SectionHead';

const PROMPT = 'guest@ihsan.sys';

const LOGO = String.raw`
 ██╗███████╗
 ██║██╔════╝
 ██║███████╗
 ██║╚════██║
 ██║███████║
 ╚═╝╚══════╝`;

const Link = ({ href, children }) => (
  <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="term__link">
    {children}
  </a>
);

const FILES = {
  'about.txt': () => [about.lead, '', ...about.body],
  'projects.md': () => projects.map((p) => `# ${p.title} (${p.kind}, ${p.year}, ${p.visibility})\n  ${p.description}`),
  'archive.txt': () => archive.map((a) => `${a.year.padEnd(6)}${a.title.padEnd(22)}${a.what}`),
  'experience.log': () => experience.map((e) => `[${e.period}] ${e.role} @ ${e.org}`),
  'skills.json': () => [JSON.stringify(skills, null, 2)],
  'contact.md': () => [`email: ${profile.email}`, ...socials.slice(0, 2).map((s) => `${s.label.toLowerCase()}: ${s.url}`)],
};

const COMMANDS = {
  help: {
    desc: 'list available commands',
    run: () => [
      'available commands:',
      ...Object.entries(COMMANDS)
        .filter(([, c]) => c.desc)
        .map(([name, c]) => (
          <span key={name}>
            <span className="accent">{name.padEnd(12)}</span>
            <span className="muted">{c.desc}</span>
          </span>
        )),
      '',
      <span key="tip" className="muted">
        tip: ↑/↓ for history, tab to autocomplete. some commands are not listed.
      </span>,
    ],
  },
  whoami: { desc: 'who is this?', run: () => [`${profile.name}, ${profile.role} @ ${profile.company}, ${profile.location}.`] },
  about: { desc: 'a little more about me', run: () => FILES['about.txt']() },
  projects: {
    desc: 'selected work',
    run: () =>
      projects.map((p, i) => (
        <span key={p.id}>
          <span className="muted">{String(i + 1).padStart(2, '0')}</span> <span className="accent">{p.title}</span>{' '}
          <span className="muted">[{p.stack.slice(0, 3).join(', ')}]</span>{' '}
          {p.url ? <Link href={p.url}>repo ↗</Link> : <span className="muted">(private)</span>}
        </span>
      )),
  },
  experience: {
    desc: 'where I have worked',
    run: () => experience.map((e) => `${e.period.padEnd(20)} ${e.role} @ ${e.org}`),
  },
  education: {
    desc: 'where I studied',
    run: () => education.map((e) => `${e.years.join('-')}  ${e.degree}, ${e.school} (${e.grade})`),
  },
  skills: {
    desc: 'languages, frameworks, tools',
    run: () => [
      `languages   ${skills.languages.join(', ')}`,
      `frameworks  ${skills.frameworks.join(', ')}`,
      `tools       ${skills.tools.join(', ')}`,
      `also used   ${skills.alsoUsed.join(', ')}`,
      `certs       ${certifications.map((c) => c.issuer).join(', ')}`,
    ],
  },
  contact: {
    desc: 'get in touch',
    run: () => [
      <span key="m">
        email → <Link href={`mailto:${profile.email}`}>{profile.email}</Link>
      </span>,
      ...socials.slice(0, 2).map((s) => (
        <span key={s.label}>
          {s.label.toLowerCase().padEnd(8)}→ <Link href={s.url}>{s.handle}</Link>
        </span>
      )),
    ],
  },
  neofetch: {
    desc: 'system info',
    run: () => [
      <div key="nf" className="term__neofetch">
        <pre className="accent">{LOGO}</pre>
        <div>
          <div>
            <span className="accent">{PROMPT}</span>
          </div>
          <div className="muted">---------------</div>
          <div>
            <span className="accent">OS</span>: ihsan.sys 2.0 (london)
          </div>
          <div>
            <span className="accent">Host</span>: {profile.company}
          </div>
          <div>
            <span className="accent">Uptime</span>: {new Date().getFullYear() - 2021}+ years in CS
          </div>
          <div>
            <span className="accent">Shell</span>: zsh, but this one is React
          </div>
          <div>
            <span className="accent">Languages</span>: {skills.languages.join(', ')}
          </div>
          <div>
            <span className="accent">Status</span>: open to opportunities
          </div>
          <div className="term__swatches">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <i key={i} />
            ))}
          </div>
        </div>
      </div>,
    ],
  },
  ls: { desc: 'list files', run: () => [Object.keys(FILES).join('    ')] },
  cat: {
    desc: 'read a file, e.g. cat about.txt',
    run: (args) => {
      if (!args[0]) return ['usage: cat <file>'];
      const f = FILES[args[0]];
      return f ? f() : [`cat: ${args[0]}: No such file or directory`];
    },
  },
  goto: {
    desc: 'jump to a section, e.g. goto work',
    run: (args) => {
      const ids = ['top', 'about', 'work', 'experience', 'education', 'toolkit', 'contact'];
      if (!ids.includes(args[0])) return [`usage: goto <${ids.join('|')}>`];
      setTimeout(() => scrollToId(args[0]), 200);
      return [`→ navigating to #${args[0]}`];
    },
  },
  theme: { desc: 'invert the colours', run: () => [`theme set to ${toggleTheme()}`] },
  date: { run: () => [new Date().toString()] },
  echo: { run: (args) => [args.join(' ')] },
  pwd: { run: () => ['/home/guest/portfolio'] },
  sudo: {
    run: (args) => {
      if (args.join(' ') !== 'hire-me') {
        return [
          'guest is not in the sudoers file. This incident will be reported.',
          <span key="h" className="muted">
            (psst: try `sudo hire-me`)
          </span>,
        ];
      }
      setTimeout(() => scrollToId('contact'), 900);
      return [
        '[sudo] password for guest: ********',
        <span key="ok" className="accent">
          ✓ access granted. excellent decision.
        </span>,
        '→ opening the contact form…',
      ];
    },
  },
  rm: { run: () => ['nice try.'] },
  vim: { run: () => ['you are now trapped in vim. just kidding, this is a portfolio.'] },
  exit: { run: () => ['there is no escape. try `contact` instead.'] },
  hello: { run: () => ['hey 👋 type `help` to look around.'] },
  coffee: { run: () => ['☕ brewing… this portfolio runs on it.'] },
};
// aliases stay out of `help`
COMMANDS.hi = { run: COMMANDS.hello.run };
COMMANDS.email = { run: COMMANDS.contact.run };

export default function Terminal() {
  const [lines, setLines] = useState(() => [
    { id: 0, kind: 'out', body: <span className="muted">ihsan.sys shell, last login: {new Date().toDateString()}</span> },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const [typing, setTyping] = useState(false);
  const input = useRef(null);
  const body = useRef(null);
  const wrap = useRef(null);
  const id = useRef(1);
  const inView = useInView(wrap, { once: true, margin: '0px 0px -30% 0px' });

  const push = (entries) => setLines((l) => [...l, ...entries.map((body) => ({ id: id.current++, ...body }))]);

  const execute = (raw) => {
    const cmd = raw.trim();
    push([{ kind: 'in', body: cmd }]);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIndex(-1);
    const [name, ...args] = cmd.split(/\s+/);
    if (name === 'clear') {
      setLines([]);
      return;
    }
    const c = COMMANDS[name.toLowerCase()];
    const out = c ? c.run(args) : [`command not found: ${name}. type \`help\` for a list.`];
    push(out.map((o) => ({ kind: 'out', body: o })));
  };

  // Type out a first command when the terminal scrolls into view.
  useEffect(() => {
    if (!inView) return;
    const demo = 'neofetch';
    let i = 0;
    setTyping(true);
    const t = setInterval(() => {
      i++;
      setValue(demo.slice(0, i));
      if (i === demo.length) {
        clearInterval(t);
        setTimeout(() => {
          execute(demo);
          setValue('');
          setTyping(false);
          push([{ kind: 'out', body: <span className="muted">type `help` to see what else this can do.</span> }]);
        }, 350);
      }
    }, 90);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    body.current.scrollTop = body.current.scrollHeight;
  }, [lines]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      execute(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(history.length - 1, hIndex + 1);
      if (history[n] !== undefined) {
        setHIndex(n);
        setValue(history[n]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = hIndex - 1;
      setHIndex(Math.max(-1, n));
      setValue(n < 0 ? '' : history[n]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const [first, ...rest] = value.split(' ');
      const pool = rest.length ? Object.keys(FILES) : Object.keys(COMMANDS).filter((k) => COMMANDS[k].desc);
      const target = rest.length ? rest[rest.length - 1] : first;
      const match = pool.find((k) => k.startsWith(target));
      if (match) setValue(rest.length ? `${first} ${match}` : match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <section id="shell" className="section shell">
      <SectionHead
        index="06"
        label="Shell"
        meta="interactive"
        title={[
          <>
            Prefer the <em>command line?</em>
          </>,
        ]}
      />
      <FadeUp>
        <div className="term" ref={wrap} onClick={() => input.current?.focus({ preventScroll: true })} data-cursor="Type">
          <div className="term__bar mono">
            <span className="preview__dots">
              <i />
              <i />
              <i />
            </span>
            <span>{PROMPT}: zsh, 80×24</span>
            <span className="muted">try: help</span>
          </div>
          <div className="term__body mono" ref={body} data-lenis-prevent>
            {lines.map((l) =>
              l.kind === 'in' ? (
                <div key={l.id} className="term__line">
                  <span className="accent">{PROMPT}</span>
                  <span className="muted">:~$</span> {l.body}
                </div>
              ) : (
                <div key={l.id} className="term__line term__out">
                  {l.body}
                </div>
              )
            )}
            <label className="term__line term__input">
              <span className="accent">{PROMPT}</span>
              <span className="muted">:~$</span>
              <input
                ref={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                readOnly={typing}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Terminal input"
              />
            </label>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
