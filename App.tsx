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
import PerformanceOptimizer from './components/PerformanceOptimizer';

const App: React.FC = () => {
  // Generate fewer static twinkling stars for better performance
  const stars = useMemo(() => new Array(30).fill(true).map((_, idx) => ({
    left: Math.floor(Math.random() * 100) + '%',
    top: Math.floor(Math.random() * 100) + '%',
    size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-0.5 h-0.5',
    delay: Math.random() * 5 + 's',
    opacity: Math.random() * 0.5 + 0.3
  })), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-800 dark:selection:text-emerald-200 relative overflow-x-hidden transition-colors duration-300">
      
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
      
      {/* Smooth Scroll Optimizer */}
      <SmoothScrollOptimizer />
      
      {/* Enhanced Effects Layer */}
      <EnhancedEffects />
      
      {/* Global Background Ambience (Fixed) - Optimized */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         {/* 1. Stars - ONLY Visible in Dark Mode - Reduced count */}
         {stars.map((star, idx) => (
             <div 
               key={`star-${idx}`}
               className={`hidden dark:block absolute bg-white rounded-full animate-twinkle ${star.size} will-change-opacity`}
               style={{
                   left: star.left,
                   top: star.top,
                   animationDelay: star.delay,
                   opacity: star.opacity
               }}
             ></div>
          ))}

         {/* 3. Glow Orbs - Simplified and optimized */}
         <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/3 dark:bg-emerald-500/8 rounded-full blur-[80px] opacity-30" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/3 rounded-full blur-[60px] opacity-20" />
         
         {/* 4. Grid - Simplified */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] opacity-15"></div>
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