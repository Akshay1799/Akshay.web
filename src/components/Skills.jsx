import { skills } from '../data';
import { useInView } from '../hooks/useInView';

export default function Skills() {
  const [titleRef, titleInView] = useInView();
  const [gridRef, gridInView]   = useInView();
  return (
    <section id="skills" style={{ padding: '5.5rem 0', background: 'var(--bg-subtle)' }}>
      <div className="wrap">
        <div ref={titleRef} className="sh" style={{
          opacity: titleInView ? 1 : 0,
          transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <h2>Skills</h2>
          <div className="sh-bar" />
        </div>
        <div ref={gridRef} style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
          opacity: gridInView ? 1 : 0,
          transform: gridInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          {skills.map(skill => (
            <span
              key={skill}
              id={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="chip"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
