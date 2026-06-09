import { skills } from '../data';
import { useInView } from '../hooks/useInView';
import { Monitor, Server, Layers, Terminal } from 'lucide-react';
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiRedux, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiGraphql, SiSocketdotio,
  SiMongodb, SiPostgresql, SiRedis, SiFirebase,
  SiGit, SiGithub, SiDocker, SiVercel, SiAmazons3,
  SiFigma, SiJest, SiPostman, SiLinux, SiSwagger,
  SiThunderbird,
} from 'react-icons/si';

const CAPABILITIES = [
  {
    icon: Layers,
    title: 'Full-Stack Systems',
    desc: 'Integrating databases, microservices, secure state management, payment gateways, and end-to-end workflows.',
  },
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Designing scalable RESTful APIs, robust database architectures, and secure server-side logic in Node.js and Express.',
  },
  {
    icon: Monitor,
    title: 'Frontend Development',
    desc: 'Building responsive, pixel-perfect, and highly interactive user interfaces using React, Next.js, and modern CSS.',
  },
];

const SKILL_ICONS = {
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'HTML5': SiHtml5,
  'CSS3': SiCss3,
  'React': SiReact,
  'Redux Toolkit': SiRedux,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': SiSwagger,
  'Socket.io': SiSocketdotio,
  'MongoDB': SiMongodb,
  'Redis': SiRedis,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Vercel': SiVercel,
  'Postman': SiPostman,
  'Thunder Client': SiThunderbird,
};

function SkillLogo({ skill }) {
  const Icon = SKILL_ICONS[skill];
  if (!Icon) return null;

  return (
    <div
      id={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      className="flex items-center justify-center shrink-0 mx-8 md:mx-10"
      title={skill}
      aria-label={skill}
    >
      <Icon className="w-8 h-8 md:w-9 md:h-9 text-[#4a4a4f] dark:text-[#a1a1aa] opacity-70 hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}

export default function Skills() {
  const [sectionRef, inView] = useInView();

  const anim = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(8px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  const logoSkills = skills.filter(skill => SKILL_ICONS[skill]);
  const marqueeItems = [...logoSkills, ...logoSkills];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-4 md:py-8 flex flex-col items-center"
    >
      <div style={anim(0)} className="text-center max-w-[640px] mb-12 px-4">
        <h2 className="font-['Plus_Jakarta_Sans'] text-[1.8rem] md:text-[2.6rem] font-extrabold tracking-[-0.03em] leading-[1.15] text-[#141416] dark:text-[#f4f4f5]">
          Collaborate with brands and agencies to create impactful results.
        </h2>
      </div>

      <div style={anim(0.1)} className="w-full flex items-center justify-center relative my-8 px-4">
        <div className="w-full h-px bg-black/[0.06] dark:bg-white/[0.06]" />
        <span className="absolute px-4 py-1.5 border border-black/[0.06] dark:border-white/[0.06] rounded-full text-[0.68rem] font-bold tracking-widest text-[#7e7e86] dark:text-[#71717a] uppercase select-none bg-[#ececee] dark:bg-[#09090b]">
          Capabilities
        </span>
      </div>

      <div
        style={anim(0.2)}
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 mt-10 px-4"
      >
        {CAPABILITIES.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-3 p-6 md:p-8 rounded-2xl"
            >
              <div className="p-3 border border-black/[0.06] dark:border-white/[0.06] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-[#4a4a4f] dark:text-[#a1a1aa] bg-white dark:bg-[#18181b]">
                <Icon size={18} />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-[1.05rem] font-bold text-[#141416] dark:text-[#f4f4f5] mt-1">
                {cap.title}
              </h3>
              <p className="text-[0.85rem] text-[#4a4a4f] dark:text-[#a1a1aa] leading-[1.6] font-medium">
                {cap.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div style={anim(0.3)} className="w-full flex items-center justify-center relative mt-20 md:mt-28 mb-10 px-4">
        <div className="w-full h-px bg-black/[0.06] dark:bg-white/[0.06]" />
        <span className="absolute px-4 py-1.5 border border-black/[0.06] dark:border-white/[0.06] rounded-full text-[0.68rem] font-bold tracking-widest text-[#7e7e86] dark:text-[#71717a] uppercase select-none bg-[#ececee] dark:bg-[#09090b]">
          Technologies
        </span>
      </div>

      <div style={anim(0.35)} className="w-full overflow-hidden group px-4">
        <div className="flex w-max items-center animate-infinite-scroll group-hover:[animation-play-state:paused]">
          {marqueeItems.map((skill, idx) => (
            <SkillLogo key={`${skill}-${idx}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
