import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { experience } from '../data';
import { useInView } from '../hooks/useInView';

function ExpCard({ item, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      id={item.id}
      ref={ref}
      className="exp-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--fg)', marginBottom: 4 }}>
            {item.company}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-2)', fontWeight: 600 }}>
            {item.role}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--fg-muted)', fontWeight: 500 }}>
            <Calendar size={11} /> {item.startDate} – {item.endDate}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--fg-muted)' }}>
            <MapPin size={11} /> {item.location}
          </span>
        </div>
      </div>

      {/* Bullets */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.25rem' }}>
        {item.description.map((pt, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.65 }}>
            <ChevronRight size={13} style={{ color: 'var(--fg-muted)', flexShrink: 0, marginTop: 3 }} />
            {pt}
          </li>
        ))}
      </ul>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {item.tech.map(t => (
          <span key={t} className="chip" style={{ fontSize: '0.73rem', padding: '3px 10px' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" style={{ padding: '5.5rem 0', background: 'var(--bg-subtle)' }}>
      <div className="wrap">
        <div ref={ref} className="sh" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <h2>Experience</h2>
          <div className="sh-bar" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {experience.map((item, i) => <ExpCard key={item.id} item={item} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}
