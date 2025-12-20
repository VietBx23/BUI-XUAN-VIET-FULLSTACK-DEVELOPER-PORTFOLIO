import React, { useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import EnhancedEffects from './components/EnhancedEffects';
import SmoothScrollOptimizer from './components/SmoothScrollOptimizer';

const App: React.FC = () => {
  // Generate static twinkling stars (Global)
  const stars = useMemo(() => new Array(70).fill(true).map((_, idx) => ({
    left: Math.floor(Math.random() * 100) + '%',
    top: Math.floor(Math.random() * 100) + '%',
    size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-0.5 h-0.5',
    delay: Math.random() * 5 + 's',
    opacity: Math.random() * 0.5 + 0.3
  })), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-800 dark:selection:text-emerald-200 relative overflow-x-hidden transition-colors duration-300">
      
      {/* Smooth Scroll Optimizer */}
      <SmoothScrollOptimizer />
      
      {/* Enhanced Effects Layer */}
      <EnhancedEffects />
      
      {/* Global Background Ambience (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         {/* 1. Stars - ONLY Visible in Dark Mode */}
         {stars.map((star, idx) => (
             <div 
               key={`star-${idx}`}
               className={`hidden dark:block absolute bg-white rounded-full animate-twinkle ${star.size}`}
               style={{
                   left: star.left,
                   top: star.top,
                   animationDelay: star.delay,
                   opacity: star.opacity
               }}
             ></div>
          ))}

         {/* 3. Glow Orbs - Adjusted for Light/Dark */}
         <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] opacity-40 parallax" data-speed="0.2"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] opacity-30 parallax" data-speed="0.3"></div>
         
         {/* 4. Grid - Darker lines in light mode, Light lines in dark mode */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <main className="space-y-24 lg:space-y-32">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <About />
          <Education />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </div>
  );
};

export default App;