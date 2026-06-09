import { ThemeProvider } from './context/ThemeContext';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen px-8 pt-4 pb-8 md:px-8 md:pt-5 md:pb-12 bg-[#ececee] dark:bg-[#09090b] text-[#141416] dark:text-[#f4f4f5] font-['Inter',system-ui,sans-serif] antialiased overflow-x-hidden transition-colors duration-300 flex flex-col items-center justify-start">
        <main className="w-full max-w-[1020px] flex flex-col gap-12 md:gap-24 mt-2 md:mt-3">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}
