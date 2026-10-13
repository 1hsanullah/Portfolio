import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { profile } from '../data/content';
import Magnetic from './ui/Magnetic';
import { FadeUp, MaskReveal } from './ui/Reveal';
import { easeOut } from '../lib/motion';
import SectionHead from './ui/SectionHead';

const EMAILJS = { service: 'service_4yeek4k', template: 'template_w4amtft', key: '02T4vyG4D05x_-h3G' };

const fields = [
  { name: 'from_name', label: "What's your name?", type: 'text', placeholder: 'Jane Doe', autoComplete: 'name' },
  { name: 'reply_to', label: 'Your email', type: 'email', placeholder: 'jane@company.com', autoComplete: 'email' },
  { name: 'message', label: 'Your message', textarea: true, placeholder: 'Hi Ihsan, we are hiring for…' },
];

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs
      .sendForm(EMAILJS.service, EMAILJS.template, form.current, EMAILJS.key)
      .then(() => {
        setStatus('sent');
        form.current.reset();
      })
      .catch(() => setStatus('error'));
  };

  const copy = async (e) => {
    try {
      await navigator.clipboard.writeText(profile.email);
      e.preventDefault();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* fall through to the mailto link */
    }
  };

  return (
    <section id="contact" className="section contact">
      <SectionHead index="07" label="Contact" meta="say hello" />

      <h2 className="contact__title">
        <MaskReveal>Let&apos;s build</MaskReveal>
        <MaskReveal delay={0.08}>
          <em>something</em> good.
        </MaskReveal>
      </h2>

      <div className="contact__grid">
        <FadeUp className="contact__side">
          <p className="contact__lede">
            Hiring, collaborating, or just want to talk shop? My inbox is open, so drop a note here or email me directly.
          </p>
          <a href={`mailto:${profile.email}`} className="contact__email" onClick={copy} data-cursor={copied ? 'Copied ✓' : 'Copy'}>
            {profile.email}
            <AnimatePresence>
              {copied && (
                <motion.span
                  className="contact__copied mono accent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  copied to clipboard
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          {profile.resume && (
            <a href={profile.resume} className="contact__resume mono" download data-cursor="Download">
              ↓ Download résumé
            </a>
          )}
        </FadeUp>

        <FadeUp delay={0.1}>
          <form ref={form} onSubmit={submit} className="form">
            {fields.map((f, i) => (
              <div className="field" key={f.name}>
                <label htmlFor={f.name} className="mono">
                  <span className="accent">{String(i + 1).padStart(2, '0')}</span> {f.label}
                </label>
                {f.textarea ? (
                  <textarea id={f.name} name={f.name} rows={4} required placeholder={f.placeholder} />
                ) : (
                  <input id={f.name} name={f.name} type={f.type} required placeholder={f.placeholder} autoComplete={f.autoComplete} />
                )}
              </div>
            ))}
            <div className="form__foot">
              <AnimatePresence mode="wait">
                {(status === 'sent' || status === 'error') && (
                  <motion.p
                    key={status}
                    className={`form__status mono ${status === 'sent' ? 'accent' : 'error'}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    role="status"
                  >
                    {status === 'sent' ? '✓ Message sent. I will get back to you soon.' : '✕ Something went wrong. Please email me directly.'}
                  </motion.p>
                )}
              </AnimatePresence>
              <Magnetic>
                <button type="submit" className="send" disabled={status === 'sending'} data-cursor="Send">
                  <span>{status === 'sending' ? 'Sending…' : 'Send'}</span>
                  <span className="send__arrow">↗</span>
                </button>
              </Magnetic>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
