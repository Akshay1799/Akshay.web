import { useEffect, useRef, useState } from 'react';
import { Search, Sun, Moon, Menu, X, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { navLinks, personalInfo, projects, experience, skills } from '../data';

function SearchDropdown({ results, onClose, onSelect }) {
  const ref = useRef(null);
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [onClose]);

  const grouped = results.reduce((acc, r) => {
    (acc[r.group] = acc[r.group] || []).push(r);
    return acc;
  }, {});

  return (
    <div className="search-drop" ref={ref}>
      {results.length === 0 ? (
        <p style={{ padding: '1rem', textAlign: 'center', fontSize: '0.82rem', color: 'var(--fg-muted)' }}>No results</p>
      ) : (
        Object.entries(grouped).map(([grp, items]) => (
          <div key={grp}>
            <div className="sdrop-label">{grp}</div>
            {items.map(item => (
              <div
                key={item.id} className="sdrop-item"
                onClick={() => onSelect(item)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSelect(item)}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--fg-muted)', flexShrink: 0 }} />
                {item.label}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery]       = useState('');
  const [results, setResults]   = useState([]);
  const [showDrop, setShowDrop] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setShowDrop(false); return; }
    const q = query.toLowerCase();
    const pr = projects
      .filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q)))
      .map(p => ({ id: p.id, label: p.title, group: 'Projects', section: 'projects', highlight: p.id }));
    const er = experience
      .filter(e => e.company.toLowerCase().includes(q) || e.role.toLowerCase().includes(q))
      .map(e => ({ id: e.id, label: `${e.role} @ ${e.company}`, group: 'Experience', section: 'experience', highlight: e.id }));
    const sr = skills.filter(s => s.toLowerCase().includes(q)).slice(0, 5)
      .map(s => ({ id: `sk-${s}`, label: s, group: 'Skills', section: 'skills', highlight: null }));
    const all = [...pr, ...er, ...sr];
    setResults(all); setShowDrop(all.length > 0);
  }, [query]);

  const scrollTo = id => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelect = item => {
    scrollTo(item.section);
    if (item.highlight) {
      setTimeout(() => {
        const el = document.getElementById(item.highlight);
        if (el) {
          el.style.outline = '2px solid var(--border-strong)';
          el.style.outlineOffset = '4px';
          setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = ''; }, 2000);
        }
      }, 650);
    }
    setQuery(''); setShowDrop(false);
  };

  const iconBtnStyle = {
    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    color: 'var(--fg-3)', display: 'flex', alignItems: 'center',
    padding: 7, borderRadius: 8, transition: 'color 0.2s, background 0.2s, transform 0.3s',
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 16 }}>

        {/* Logo */}
        <button onClick={() => scrollTo('about')} style={{
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em',
          color: 'var(--fg)', flexShrink: 0,
        }}>
          {personalInfo.name.split(' ')[0]}<span style={{ color: 'var(--fg-muted)' }}>.</span>
        </button>

        {/* Desktop nav links */}
        <ul className="desktop-only" style={{ display: 'flex', listStyle: 'none', gap: 2, flex: 1 }}>
          {navLinks.map(lnk => (
            <li key={lnk.label}>
              <button onClick={() => scrollTo(lnk.href.slice(1))} style={{
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                padding: '6px 12px', borderRadius: 8,
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

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>

          {/* Resume */}
          <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary desktop-only"
            style={{ padding: '7px 16px', fontSize: '0.8rem', borderRadius: 8 }}
          >
            <ExternalLink size={13} /> Resume
          </a>

          {/* Search */}
          <div style={{ position: 'relative' }} className="desktop-only">
            <div className="search-pill">
              <Search size={14} style={{ color: 'var(--fg-muted)', flexShrink: 0 }} />
              <input
                type="text" placeholder="Search…" value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => query.trim() && setShowDrop(true)}
                aria-label="Search projects, skills, experience"
              />
              {query && (
                <button onClick={() => { setQuery(''); setShowDrop(false); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)', display: 'flex', padding: 0 }}>
                  <X size={12} />
                </button>
              )}
            </div>
            {showDrop && <SearchDropdown results={results} onSelect={handleSelect} onClose={() => setShowDrop(false)} />}
          </div>

          {/* Theme toggle */}
          <button
            id="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme"
            style={iconBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.background = 'var(--bg-muted)'; e.currentTarget.style.transform = 'rotate(22deg)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-3)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'rotate(0)'; }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Hamburger */}
          <button id="hamburger" className="mobile-only" onClick={() => setMenuOpen(o => !o)} aria-label="Menu"
            style={{ ...iconBtnStyle, color: 'var(--fg)' }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          background: 'var(--nav-bg)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)', animation: 'slideDown 0.22s ease',
        }}>
          <ul style={{ listStyle: 'none', padding: '0.5rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column' }}>
            {navLinks.map(lnk => (
              <li key={lnk.label}>
                <button onClick={() => scrollTo(lnk.href.slice(1))} style={{
                  width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  padding: '0.75rem 0', fontSize: '1rem', fontWeight: 500,
                  color: 'var(--fg)', borderBottom: '1px solid var(--border)',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--fg-3)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--fg)'}
                >
                  {lnk.label}
                </button>
              </li>
            ))}
            <li style={{ paddingTop: '1rem' }}>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <ExternalLink size={14} /> Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
