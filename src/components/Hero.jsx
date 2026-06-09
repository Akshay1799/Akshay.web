import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { personalInfo } from '../data';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);
  const anim = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="about"
      className="bg-white dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.06] rounded-[32px] md:rounded-[48px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] -mt-4 pl-6 md:pl-14 pr-6 md:pr-14 transition-[background-color,border-color,box-shadow,transform] duration-300 flex flex-col min-h-[calc(100dvh-2.5rem)] md:min-h-[calc(100dvh-3.5rem)] pt-4 pb-6 md:pt-5 md:pb-8"
    >
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 md:gap-6 pb-2">
        <div style={anim(0)} className="relative flex justify-center">
          <div className="w-[124px] h-[124px] rounded-full overflow-hidden border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#27272a] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
              onError={e => {
                e.target.style.display = 'none';
                const p = e.target.parentElement;
                p.style.fontSize = '2rem';
                p.style.fontWeight = '700';
                p.style.color = '#4a4a4f';
                p.innerHTML = personalInfo.name.split(' ').map(n => n[0]).join('');
              }}
            />
          </div>
        </div>

        <div style={anim(0.15)} className="max-w-[720px]">
          <h1 className="font-['Plus_Jakarta_Sans'] text-[2.2rem] md:text-[3.8rem] font-extrabold tracking-[-0.015em] leading-[1.05] text-[#141416] dark:text-[#f4f4f5] m-0">
            Building digital products, brands, and experiences.
          </h1>
        </div>

        <p style={anim(0.25)} className="max-w-[500px] text-[#4a4a4f] dark:text-[#a1a1aa] text-[0.95rem] md:text-[1.05rem] leading-[1.7] m-0 font-medium">
          I build fast, responsive, and beautiful full-stack web experiences — from database architecture to smooth frontend deployments.
        </p>

        <div style={anim(0.35)} className="mt-2">
          <button
            onClick={scrollToProjects}
            className="inline-flex items-center justify-center gap-1.5 px-7 py-3 text-[0.9rem] font-bold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-[#141416] dark:bg-[#f4f4f5] text-white dark:text-[#18181b] border-0 cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:opacity-95"
          >
            <span>View Projects</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
