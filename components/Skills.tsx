import React from 'react';
import { SKILLS } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const Skills: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const getSkillColor = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes('react') || s.includes('typescript')) return 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/40';
    if (s.includes('java') || s.includes('spring')) return 'text-orange-600 dark:text-orange-400 border-orange-500/20 bg-orange-500/5 group-hover:bg-orange-500/10 group-hover:border-orange-500/40';
    if (s.includes('.net') || s.includes('c#')) return 'text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/5 group-hover:bg-purple-500/10 group-hover:border-purple-500/40';
    if (s.includes('node') || s.includes('mongo') || s.includes('emerald')) return 'text-green-600 dark:text-green-400 border-green-500/20 bg-green-500/5 group-hover:bg-green-500/10 group-hover:border-green-500/40';
    return 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-emerald-500/20 hover:text-emerald-600 dark:hover:text-emerald-300';
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 md:text-center max-w-4xl mx-auto">
          <RevealOnScroll direction="bottom">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter glitch-wrapper">
               <span className="glitch-text" data-text="Technical Arsenal">Technical Arsenal</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200} direction="bottom">
            <p className="text-slate-600 dark:text-slate-400 text-xl font-light">
               My comprehensive toolkit for forging <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-500 font-semibold animate-shimmer bg-[length:200%_100%]">scalable, high-performance</span> digital solutions.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((category, index) => {
            const Icon = category.icon;
            return (
              <RevealOnScroll key={index} delay={index * 100} direction="bottom">
                <div 
                  onMouseMove={handleMouseMove}
                  className="group spotlight-card relative h-full bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-500 shadow-xl dark:shadow-none"
                >
                  {/* Spotlight Effect */}
                  <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                       style={{
                         background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.1), transparent 40%)`
                       }}
                  />
                  
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="relative z-10">
                      <div className="flex items-center gap-5 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md dark:shadow-xl group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-emerald-400 transition-all duration-300">
                            <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-white transition-colors tracking-tight">{category.title}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, idx) => (
                          <span 
                          key={idx} 
                          className={`px-4 py-2 text-sm font-medium border rounded-xl transition-all duration-300 cursor-default ${getSkillColor(skill)} backdrop-blur-md`}
                          >
                          {skill}
                          </span>
                      ))}
                      </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;