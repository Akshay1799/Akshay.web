import { MapPin, Calendar } from 'lucide-react';
import { experience } from '../data';
import { useInView } from '../hooks/useInView';

function ExpCard({ item, index }) {
  const [ref, inView] = useInView();

  const animStyle = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
  };

  return (
    <div
      id={item.id}
      ref={ref}
      style={animStyle}
      className="relative bg-white dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.06] rounded-[20px] p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col gap-5"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-[1.15rem] font-bold text-[#141416] dark:text-[#f4f4f5] tracking-tight">
            {item.company}
          </h3>
          <p className="text-[0.88rem] text-[#4a4a4f] dark:text-[#a1a1aa] font-semibold mt-0.5">
            {item.role}
          </p>
        </div>
        <div className="flex flex-wrap md:flex-col md:items-end gap-x-4 gap-y-1 text-[0.78rem] text-[#7e7e86] dark:text-[#71717a] font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>{item.startDate} – {item.endDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            <span>{item.location}</span>
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-2.5 pl-1.5 list-none">
        {item.description.map((pt, i) => (
          <li key={i} className="flex gap-2.5 items-start text-[0.875rem] text-[#4a4a4f] dark:text-[#a1a1aa] leading-[1.6] font-medium">
            <span className="text-[#7e7e86] dark:text-[#71717a] select-none mt-0.5">—</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 pt-2">
        {item.tech.map(t => (
          <span
            key={t}
            className="inline-flex items-center py-0.5 px-2.5 rounded-full text-[0.7rem] font-semibold bg-white dark:bg-[#27272a] text-[#4a4a4f] dark:text-[#a1a1aa] border border-black/[0.08] dark:border-white/[0.06] cursor-default transition-all duration-200 hover:bg-[#141416] dark:hover:bg-[#f4f4f5] hover:text-white dark:hover:text-[#18181b] hover:border-[#141416] dark:hover:border-[#f4f4f5] hover:-translate-y-px"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView();

  const anim = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  return (
    <section id="experience" className="py-16 md:py-24">
      <div ref={ref} style={anim(0)} className="mb-12 flex flex-col gap-2">
        <h2 className="font-['Plus_Jakarta_Sans'] text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] text-[#141416] dark:text-[#f4f4f5] tracking-[-0.03em]">
          Work Experience
        </h2>
        <p className="text-[clamp(0.95rem,2vw,1.15rem)] text-[#4a4a4f] dark:text-[#a1a1aa] leading-[1.6] max-w-[500px]">
          My journey working as an intern and developer, building backend systems and frontend components.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {experience.map((item, i) => (
          <ExpCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
