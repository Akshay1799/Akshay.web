import { Handshake, Mail, MessageSquare } from 'lucide-react';
import { personalInfo } from '../data';
import { useInView } from '../hooks/useInView';

export default function Footer() {
  const [ref, inView] = useInView();

  const anim = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(8px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  return (
    <footer id="contact" ref={ref} className="w-full flex flex-col gap-10 mt-12 pb-8">
      <div
        style={anim(0)}
        className="bg-white dark:bg-[#18181b] border border-black/[0.06] dark:border-white/[0.06] rounded-[32px] md:rounded-[48px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] -mt-4 pl-6 md:pl-14 pr-6 md:pr-14 pb-4 transition-[background-color,border-color,box-shadow,transform] duration-300 text-center flex flex-col items-center justify-center gap-7 py-12 md:py-20"
      >
        <div className="w-[72px] h-[72px] rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#27272a] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] select-none">
          <Handshake size={32} className="text-[#4a4a4f] dark:text-[#a1a1aa]" />
        </div>

        <h2 className="font-['Plus_Jakarta_Sans'] text-[2rem] md:text-[3.4rem] font-extrabold tracking-[-0.015em] leading-tight  text-[#141416] dark:text-[#f4f4f5] max-w-[560px] m-0">
          Tell me about your next project
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <a
            href="mailto:akshayladne@gmail.com"
            className="inline-flex items-center justify-center gap-1.5 px-7 py-3 text-[0.875rem] font-bold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-[#141416] dark:bg-[#f4f4f5] text-white dark:text-[#18181b] no-underline cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:opacity-95"
          >
            <Mail size={16} />
            <span>Email Me</span>
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-7 py-3 text-[0.875rem] font-bold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-white dark:bg-[#27272a] text-[#141416] dark:text-[#f4f4f5] border border-black/10 dark:border-white/[0.08] no-underline cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#141416] dark:hover:bg-[#f4f4f5] hover:text-white dark:hover:text-[#18181b] hover:border-[#141416] dark:hover:border-[#f4f4f5] hover:-translate-y-0.5"
          >
            <MessageSquare size={16} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div
        style={anim(0.15)}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] text-[#7e7e86] dark:text-[#71717a] font-medium text-[0.8rem]"
      >
        <div className="select-none text-center md:text-left">
          <span>© {new Date().getFullYear()} Akshay Ladne.</span>
          <span className="block md:inline md:ml-1">All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Plus_Jakarta_Sans'] text-[0.8rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
          >
            LinkedIn
          </a>
          {/* <span className="text-[#7e7e86]/40 dark:text-[#71717a]/40 select-none">/</span> */}
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Plus_Jakarta_Sans'] text-[0.8rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
          >
            GitHub
          </a>
          {/* <span className="text-[#7e7e86]/40 dark:text-[#71717a]/40 select-none">/</span> */}
          <a
            href={personalInfo.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Plus_Jakarta_Sans'] text-[0.8rem] font-medium text-[#4a4a4f] dark:text-[#a1a1aa] no-underline bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#141416] dark:hover:text-[#f4f4f5]"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
