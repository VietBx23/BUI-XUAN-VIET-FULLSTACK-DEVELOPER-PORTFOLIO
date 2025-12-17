import React from 'react';
import { SKILLS } from '../constants';
import RevealOnScroll from './RevealOnScroll';
import { 
  Code2, 
  Server, 
  Smartphone, 
  Database, 
  Wrench, 
  Layers,
  Zap,
  Shield,
  Globe,
  Cpu,
  Terminal,
  Palette,
  Cloud,
  GitBranch,
  Settings,
  Rocket
} from 'lucide-react';

const Skills: React.FC = () => {



  const getSkillColor = () => {
    // Simple unified color - only emerald on hover
    return 'text-slate-700 dark:text-slate-300 border-slate-300/40 dark:border-slate-600/40 bg-slate-100/60 dark:bg-slate-800/60 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-500/10 backdrop-blur-sm';
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Enhanced Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-24 text-center max-w-5xl mx-auto">
          <RevealOnScroll direction="bottom">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-wider uppercase">Technical Expertise</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
               <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                 Technical Arsenal
               </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200} direction="bottom">
            <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-light leading-relaxed">
               My comprehensive toolkit for building{' '}
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 font-semibold">
                 scalable, high-performance
               </span>{' '}
               digital solutions
            </p>
          </RevealOnScroll>
        </div>

        {/* Revolutionary Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {SKILLS.map((category, index) => {
            const Icon = category.icon;
            
            // Dynamic gradient colors for each category
            const gradientColors = [
              'from-blue-500/20 via-purple-500/20 to-pink-500/20',
              'from-emerald-500/20 via-teal-500/20 to-cyan-500/20', 
              'from-orange-500/20 via-red-500/20 to-pink-500/20',
              'from-yellow-500/20 via-orange-500/20 to-red-500/20',
              'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
              'from-teal-500/20 via-green-500/20 to-emerald-500/20'
            ];
            
            return (
              <RevealOnScroll key={index} delay={index * 200} direction="bottom">
                <div 
                  className="group relative h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-700/60 rounded-[2rem] p-8 lg:p-10 overflow-hidden hover:border-slate-300/80 dark:hover:border-slate-600/80 transition-all duration-1000 shadow-2xl hover:shadow-4xl hover:-translate-y-3 hover:scale-[1.03]"
                >
                  {/* Simplified Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {/* Dynamic Mesh Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.12] transition-opacity duration-1000">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:32px_32px] group-hover:bg-[size:24px_24px] transition-all duration-1000"></div>
                  </div>
                  
                  {/* Floating Particles Effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300"></div>
                    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500"></div>
                  </div>
                  
                  <div className="relative z-10">
                      {/* Revolutionary Header Design */}
                      <div className="flex items-start gap-6 mb-12">
                        <div className="relative">
                          {/* Main Icon Container */}
                          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-2 border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:border-emerald-400/50 dark:group-hover:border-emerald-500/50">
                              <Icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors duration-500" />
                          </div>
                          
                          {/* Simplified Glowing Ring Effect */}
                          <div className="absolute -inset-3 bg-emerald-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                          
                          {/* Simple Orbiting Dot */}
                          <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-spin origin-[0_40px]"></div>
                          </div>
                        </div>
                        
                        <div className="flex-1 pt-2">
                          <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-slate-100 transition-all duration-500 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:scale-105 origin-left">
                            {category.title}
                          </h3>
                          
                          {/* Simple Animated Underline */}
                          <div className="flex items-center gap-2 mt-3">
                            <div className="h-1 bg-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left flex-1 max-w-[120px]"></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300"></div>
                          </div>
                          

                        </div>
                      </div>
                      
                      {/* Revolutionary Skills Display */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          {category.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className={`group/skill relative px-5 py-3 text-sm font-bold border-2 rounded-2xl transition-all duration-500 cursor-default transform hover:scale-105 hover:-translate-y-1 ${getSkillColor()}`}
                              style={{
                                animationDelay: `${idx * 150}ms`
                              }}
                            >
                              {/* Enhanced Skill Text with Effects */}
                              <span className="relative leading-none font-semibold tracking-wide group-hover/skill:tracking-wider transition-all duration-300">
                                {skill}
                                {/* Text Glow Effect */}
                                <span className="absolute inset-0 leading-none font-semibold tracking-wide group-hover/skill:tracking-wider opacity-0 group-hover/skill:opacity-100 text-emerald-400 blur-sm transition-all duration-300">
                                  {skill}
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Enhanced Bottom Section */}
        <RevealOnScroll delay={800} direction="bottom">
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Always learning, always growing
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Skills;