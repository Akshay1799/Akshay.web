import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { navLinks, personalInfo } from '../data';

const SOCIALS = [
  { href: personalInfo.social.github,   Icon: Github,   label: 'GitHub' },
  { href: personalInfo.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  { href: personalInfo.social.twitter,  Icon: Twitter,  label: 'X (Twitter)' },
];

export default function Footer() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer id="contact" style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '3.5rem 0 2rem',
    }}>
      <div className="wrap">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>

          {/* Logo */}
          <button onClick={() => scrollTo('about')} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em',
            color: 'var(--fg)',
          }}>
            {personalInfo.name.split(' ')[0]}<span style={{ color: 'var(--fg-muted)' }}>.</span>
          </button>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {navLinks.map(lnk => (
                <li key={lnk.label}>
                  <button onClick={() => scrollTo(lnk.href.slice(1))} style={{
                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    padding: '6px 10px', borderRadius: 8,
                    fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-3)',
                    transition: 'color 0.2s, background 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.background = 'var(--bg-muted)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-3)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    {lnk.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div id="contact-socials" style={{ display: 'flex', gap: '0.65rem' }}>
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{
                  width: 40, height: 40, borderRadius: 10,
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
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border)', marginBottom: '1.5rem' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            Designed &amp; Built by <strong style={{ color: 'var(--fg-3)' }}>{personalInfo.name}</strong>
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
