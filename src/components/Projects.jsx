import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data';
import { useInView } from '../hooks/useInView';

function ProjectCard({ item }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    opacity: inView ? 1 : 0,
    transform: inView
      ? (hovered ? 'translateY(-6px)' : 'translateY(0)')
      : 'translateY(30px)',
    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, box-shadow 0.25s',
  };

  return (
    <article
      id={item.id}
      ref={ref}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.06] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-[0_10px_32px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_10px_32px_rgba(0,0,0,0.3)] flex flex-col h-full"
    >
      <div className="relative h-[200px] overflow-hidden bg-[#1c1c1f]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover grayscale opacity-85 transition-all duration-400 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03]"
          onError={e => {
            e.target.style.display = 'none';
            const parent = e.target.parentElement;
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            parent.style.fontFamily = "'Plus Jakarta Sans', Inter, system-ui, sans-serif";
            parent.style.fontSize = '2.5rem';
            parent.style.fontWeight = '800';
            parent.style.color = '#4a4a4f';
            parent.innerHTML = item.title.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-8 md:p-10 justify-between gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-['Plus_Jakarta_Sans'] text-[1.1rem] font-bold text-[#141416] dark:text-[#f4f4f5] tracking-wide leading-snug">
            {item.title}
          </h3>
          <p className="text-[0.85rem] text-[#4a4a4f] dark:text-[#a1a1aa] leading-[1.6] font-medium">
            {item.description}
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-auto">
          <div className="flex flex-wrap gap-2">
            {item.tech.map(t => (
              <span
                key={t}
                className="inline-flex items-center py-0.5 px-2.5 rounded-full text-[0.7rem] font-semibold border border-black/[0.08] dark:border-white/[0.06] text-[#4a4a4f] dark:text-[#a1a1aa] bg-white dark:bg-[#27272a]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.06] pt-5 mt-1">
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Plus_Jakarta_Sans'] text-[0.8rem] font-bold uppercase tracking-wider text-[#4a4a4f] dark:text-[#a1a1aa] no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#141416] dark:hover:text-[#f4f4f5] flex items-center gap-1.5"
              id={`proj-gh-${item.id}`}
              aria-label={`${item.title} Github Code`}
            >
              <Github size={13} />
              <span>Source</span>
            </a>
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 py-1 px-3.5 text-[0.75rem] font-bold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-white dark:bg-[#27272a] text-[#141416] dark:text-[#f4f4f5] border border-black/10 dark:border-white/[0.08] no-underline cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#141416] dark:hover:bg-[#f4f4f5] hover:text-white dark:hover:text-[#18181b] hover:border-[#141416] dark:hover:border-[#f4f4f5] hover:-translate-y-0.5 hover:scale-[1.02]"
              id={`proj-live-${item.id}`}
              aria-label={`${item.title} Live URL`}
            >
              <span>Demo</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();

  const anim = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  return (
    <section id="projects" className="py-4 md:py-8">
      <div ref={ref} style={anim(0)} className="mb-10 flex flex-col gap-2">
        <h2 className="font-['Plus_Jakarta_Sans'] text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] text-[#141416] dark:text-[#f4f4f5] tracking-[-0.03em]">
          Featured Projects
        </h2>
        <p className="text-[clamp(0.95rem,2vw,1.15rem)] text-[#4a4a4f] dark:text-[#a1a1aa] leading-[1.6] max-w-[500px]">
          A selection of full-stack web applications, tools, and digital platforms I have built.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map(p => (
          <ProjectCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  );
}
