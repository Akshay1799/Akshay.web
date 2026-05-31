import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '../data';

function Typewriter({ texts }) {
  const [idx, setIdx]         = useState(0);
  const [shown, setShown]     = useState('');
  const [phase, setPhase]     = useState('typing');
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let t;
    const word = texts[idx];
    if (phase === 'typing') {
      if (charIdx < word.length) {
        t = setTimeout(() => { setShown(word.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 65);
      } else {
        t = setTimeout(() => setPhase('erasing'), 2200);
      }
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => { setShown(word.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 38);
      } else { setIdx(i => (i + 1) % texts.length); setPhase('typing'); }
    }
    return () => clearTimeout(t);
  }, [phase, charIdx, idx, texts]);

  return (
    <span style={{ color: 'var(--fg-2)', fontWeight: 700 }}>
      {shown}<span className="cursor" />
    </span>
  );
}

const SOCIALS = [
  { key: 'github',   Icon: Github,   label: 'GitHub' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn' },
  { key: 'twitter',  Icon: Twitter,  label: 'X (Twitter)' },
];

export default function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const anim = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, background: 'var(--bg)' }}>
      <div className="wrap" style={{ width: '100%', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.75rem' }}>

          {/* Avatar */}
          <div style={{ ...anim(0), position: 'relative' }}>
            <div style={{
              width: 148, height: 148, borderRadius: '50%', overflow: 'hidden',
              border: '2px solid var(--border-strong)',
              boxShadow: 'var(--shadow-md)',
              background: 'var(--bg-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={personalInfo.avatar} alt={personalInfo.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none';
                  const p = e.target.parentElement;
                  p.style.fontSize = '2.5rem'; p.style.fontWeight = '700';
                  p.style.color = 'var(--fg-3)';
                  p.innerHTML = personalInfo.name.split(' ').map(n => n[0]).join('');
                }}
              />
            </div>
            {/* Status dot */}
            {/* <span style={{
              position: 'absolute', bottom: 8, right: 8,
              width: 14, height: 14, borderRadius: '50%',
              background: 'var(--fg-muted)',
              border: '2px solid var(--bg)',
            }} /> */}
          </div>

          {/* Name */}
          <div style={anim(0.1)}>
            <p style={{ fontSize: '0.9rem', color: 'var(--fg-muted)', marginBottom: '0.4rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Available for work
            </p>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.6rem)',
              fontWeight: 800, color: 'var(--fg)',
              letterSpacing: '-0.035em', lineHeight: 1.05, margin: 0,
            }}>
              {personalInfo.name}
            </h1>
          </div>

          {/* Typewriter */}
          <div style={{ ...anim(0.2), fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', minHeight: '2rem' }}>
            <Typewriter texts={personalInfo.taglines} />
          </div>

          {/* Description */}
          <p style={{ ...anim(0.3), maxWidth: 520, color: 'var(--fg-3)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
            I build fast, accessible, and beautiful web experiences — from database to deployment.
          </p>

          {/* Social icons */}
          <div style={{ ...anim(0.35), display: 'flex', gap: '0.65rem' }}>
            {SOCIALS.map(({ key, Icon, label }) => (
              <a
                key={key} href={personalInfo.social[key]}
                target="_blank" rel="noopener noreferrer"
                aria-label={label} id={`hero-social-${key}`}
                style={{
                  width: 42, height: 42, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                  color: 'var(--fg-3)', textDecoration: 'none',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--fg)';
                  e.currentTarget.style.color = 'var(--bg)';
                  e.currentTarget.style.borderColor = 'var(--fg)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg-subtle)';
                  e.currentTarget.style.color = 'var(--fg-3)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ ...anim(0.4), display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
              Contact Me
            </button>
          </div>

          {/* Scroll indicator */}
          <div style={{ ...anim(0.5) }}>
            <div style={{
              width: 22, height: 36, border: '1.5px solid var(--border-strong)',
              borderRadius: 12, display: 'flex', justifyContent: 'center',
              paddingTop: 5, margin: '0 auto',
            }}>
              <div style={{
                width: 3, height: 7, borderRadius: 2,
                background: 'var(--fg-muted)',
                animation: 'scrollDot 2s ease-in-out infinite',
              }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
