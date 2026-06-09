import { useEffect, useRef, useState } from 'react';
import { Search, Sun, Moon, X, FileText, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, projects, experience, skills } from '../data';

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
    <div
      className="absolute top-[calc(100%+8px)] right-0 w-[290px] bg-white dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.06] rounded-[18px] shadow-[0_10px_32px_rgba(0,0,0,0.07)] dark:shadow-[0_10px_32px_rgba(0,0,0,0.3)] overflow-hidden z-[200] animate-slide-down"
      ref={ref}
    >
      {results.length === 0 ? (
        <p className="p-4 text-center text-[0.8rem] text-[#7e7e86] dark:text-[#71717a]">No results found</p>
      ) : (
        Object.entries(grouped).map(([grp, items]) => (
          <div key={grp} className="border-b border-black/[0.06] dark:border-white/[0.06] last:border-0">
            <div className="py-2 px-3.5 pb-1 text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#7e7e86] dark:text-[#71717a]">
              {grp}
            </div>
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-2 py-[9px] px-3.5 text-[0.8rem] text-[#4a4a4f] dark:text-[#a1a1aa] cursor-pointer transition-[background-color,color] duration-[120ms] hover:bg-white dark:hover:bg-[#27272a] hover:text-[#141416] dark:hover:text-[#f4f4f5]"
                onClick={() => onSelect(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSelect(item)}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#7e7e86] dark:bg-[#71717a] shrink-0" />
                <span>{item.label}</span>
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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setResults(all);
    setShowDrop(all.length > 0);
  }, [query]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelect = item => {
    scrollTo(item.section);
    if (item.highlight) {
      setTimeout(() => {
        const el = document.getElementById(item.highlight);
        if (el) {
          el.style.outline = '2px solid rgba(0, 0, 0, 0.12)';
          el.style.outlineOffset = '4px';
          setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = ''; }, 2000);
        }
      }, 650);
    }
    setQuery('');
    setShowDrop(false);
    setMenuOpen(false);
  };

  return (
    <header className="w-full flex flex-col pt-1 md:pt-2 pb-3 md:pb-4 relative">
      <div className="w-full flex items-center justify-between">
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-[#4a4a4f] dark:text-[#a1a1aa] hover:text-[#141416] dark:hover:text-[#f4f4f5] transition-all duration-200 cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop links & search (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4 md:gap-5">
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Plus_Jakarta_Sans'] text-[0.85rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Plus_Jakarta_Sans'] text-[0.85rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
            >
              GitHub
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Plus_Jakarta_Sans'] text-[0.85rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
            >
              Twitter
            </a>
            <div className="relative">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#27272a] border border-black/[0.08] dark:border-white/[0.06] rounded-full transition-[border-color,box-shadow] duration-200 focus-within:border-[#141416] dark:focus-within:border-[#f4f4f5]">
                <Search size={13} className="text-[#7e7e86] dark:text-[#71717a] shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => query.trim() && setShowDrop(true)}
                  aria-label="Search"
                  className="bg-transparent border-0 outline-none text-[0.8rem] text-[#141416] dark:text-[#f4f4f5] w-[100px] font-['Plus_Jakarta_Sans'] placeholder:text-[#7e7e86] dark:placeholder:text-[#71717a]"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); setShowDrop(false); }}
                    className="bg-transparent border-0 cursor-pointer text-[#7e7e86] dark:text-[#71717a] flex p-0 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              {showDrop && (
                <SearchDropdown
                  results={results}
                  onSelect={handleSelect}
                  onClose={() => setShowDrop(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* CV button and Theme Toggle (Always visible in navbar) */}
        <div className="flex items-center gap-3.5 md:gap-5">
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-1 px-3.5 text-[0.75rem] font-bold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-white dark:bg-[#27272a] text-[#141416] dark:text-[#f4f4f5] border border-black/10 dark:border-white/[0.08] no-underline cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#141416] dark:hover:bg-[#f4f4f5] hover:text-white dark:hover:text-[#18181b] hover:border-[#141416] dark:hover:border-[#f4f4f5] hover:-translate-y-0.5 hover:scale-[1.02]"
            aria-label="Open resume"
          >
            <FileText size={12} />
            <span>CV</span>
          </a>
          <button
            onClick={toggleTheme}
            className="rounded-full hover:bg-white dark:hover:bg-[#27272a] text-[#4a4a4f] dark:text-[#a1a1aa] hover:text-[#141416] dark:hover:text-[#f4f4f5] transition-all duration-200 p-1 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-3 p-4 bg-white dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.06] rounded-[20px] shadow-[0_10px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_32px_rgba(0,0,0,0.25)] overflow-visible z-[100] animate-slide-down">
          {/* Search bar inside mobile menu */}
          <div className="relative w-full">
            <div className="flex items-center gap-1.5 px-3.5 py-2 bg-[#f4f4f5] dark:bg-[#27272a] border border-black/[0.04] dark:border-white/[0.04] rounded-full focus-within:bg-white dark:focus-within:bg-[#1f1f23] focus-within:border-black/[0.08] dark:focus-within:border-white/[0.08] transition-all duration-200">
              <Search size={14} className="text-[#7e7e86] dark:text-[#71717a] shrink-0" />
              <input
                type="text"
                placeholder="Search projects, skills..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => query.trim() && setShowDrop(true)}
                aria-label="Search"
                className="bg-transparent border-0 outline-none text-[0.85rem] text-[#141416] dark:text-[#f4f4f5] w-full font-['Plus_Jakarta_Sans'] placeholder:text-[#7e7e86] dark:placeholder:text-[#71717a]"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setShowDrop(false); }}
                  className="bg-transparent border-0 cursor-pointer text-[#7e7e86] dark:text-[#71717a] flex p-0 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            {showDrop && (
              <SearchDropdown
                results={results}
                onSelect={handleSelect}
                onClose={() => setShowDrop(false)}
              />
            )}
          </div>

          {/* Social Links inside mobile menu */}
          <div className="flex flex-col gap-1">
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-['Plus_Jakarta_Sans'] text-[0.85rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:text-[#141416] dark:hover:text-[#f4f4f5] transition-colors duration-150"
            >
              <span>LinkedIn</span>
              <span className="text-[#7e7e86] dark:text-[#71717a] text-[10px]">↗</span>
            </a>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-['Plus_Jakarta_Sans'] text-[0.85rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:text-[#141416] dark:hover:text-[#f4f4f5] transition-colors duration-150"
            >
              <span>GitHub</span>
              <span className="text-[#7e7e86] dark:text-[#71717a] text-[10px]">↗</span>
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-['Plus_Jakarta_Sans'] text-[0.85rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:text-[#141416] dark:hover:text-[#f4f4f5] transition-colors duration-150"
            >
              <span>Twitter</span>
              <span className="text-[#7e7e86] dark:text-[#71717a] text-[10px]">↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
