import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data';
import { useInView } from '../hooks/useInView';

/* Neutral grayscale/slate gradients as fallback backgrounds */
const FALLBACKS = [
  'linear-gradient(135deg, #1e293b 0%, #334155 100%)',  /* slate-800 → slate-700 */
  'linear-gradient(135deg, #27272a 0%, #3f3f46 100%)',  /* zinc-800 → zinc-700 */
  'linear-gradient(135deg, #374151 0%, #4b5563 100%)',  /* gray-700 → gray-600 */
  'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',  /* slate-900 → slate-800 */
];

function ProjectCard({ item, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr]   = useState(false);

  return (
    <article
      id={item.id}
      ref={ref}
      className="proj-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? (hovered ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)')
          : 'translateY(32px)',
        transition: inView
          ? 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.28s ease, opacity 0.001s'
          : `opacity 0.6s ease ${(index % 3) * 0.1}s, transform 0.6s ease ${(index % 3) * 0.1}s`,
        boxShadow: hovered ? 'var(--shadow-xl)' : 'var(--shadow-md)',
        borderColor: hovered ? 'var(--border-strong)' : 'var(--border)',
      }}
    >
      {/* Image zone */}
      <div className="proj-img-wrap">
        {/* Neutral gradient fallback */}
        <div style={{ position: 'absolute', inset: 0, background: FALLBACKS[index % FALLBACKS.length] }} />

        {!imgErr && (
          <img src={item.image} alt={item.title} onError={() => setImgErr(true)} />
        )}

        <div className="proj-img-gradient" />

        {/* Hover overlay */}
        <div className="proj-overlay">
          <p>{item.description}</p>
          {/* <div className="proj-overlay-chips">
            {item.tech.slice(0, 5).map(t => (
              <span key={t} className="proj-overlay-chip">{t}</span>
            ))}
          </div> */}
        </div>

        {/* Live link button */}
        <a
          href={item.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-live-btn"
          id={`proj-live-${item.id}`}
          onClick={e => e.stopPropagation()}
          aria-label={`Open ${item.title}`}
        >
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Card body */}
      <div className="proj-body">
        <h3 className="proj-title">{item.title}</h3>
        <div className="proj-meta">
          <div className="proj-chips-row">
            {item.tech.slice(0, 3).map(t => (
              <span key={t} className="proj-chip">{t}</span>
            ))}
            {item.tech.length > 3 && (
              <span className="proj-chip">+{item.tech.length - 3}</span>
            )}
          </div>
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-github"
            id={`proj-gh-${item.id}`}
            aria-label={`${item.title} source`}
            onClick={e => e.stopPropagation()}
          >
            <Github size={13} /> Code
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{ padding: '5.5rem 0', background: 'var(--bg)' }}>
      <div className="wrap">
        <div ref={ref} className="sh" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <h2>Projects</h2>
          <div className="sh-bar" />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((p, i) => <ProjectCard key={p.id} item={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
