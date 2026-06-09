import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-[#141416] dark:bg-[#f4f4f5] z-[9999] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="w-full min-h-screen px-8 pt-4 pb-8 md:px-8 md:pt-5 md:pb-12 bg-[#ececee] dark:bg-[#09090b] text-[#141416] dark:text-[#f4f4f5] font-['Inter',system-ui,sans-serif] antialiased overflow-x-hidden transition-colors duration-300 flex flex-col items-center justify-start">
        <main className="w-full max-w-[1020px] flex flex-col gap-12 md:gap-24 mt-2 md:mt-3">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Footer />
        </main>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-[#141416] dark:text-[#f4f4f5] transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer z-[999] ${
          showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </ThemeProvider>
  );
}
