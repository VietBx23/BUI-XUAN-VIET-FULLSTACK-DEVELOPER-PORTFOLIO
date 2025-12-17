import React from 'react';
import { SKILLS } from '../constants';
import RevealOnScroll from './RevealOnScroll';
import { Rocket } from 'lucide-react';

const Skills: React.FC = () => {
  // Calculate the maximum number of skills to ensure equal heights
  const maxSkills = Math.max(...SKILLS.map(category => category.skills.length));
  const cardHeight = 200 + (Math.ceil(maxSkills / 2) * 70); // Base height + skills grid height

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.06),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.03),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Elegant Header */}
        <div className="mb-20 text-center max-w-5xl mx-auto">
          <RevealOnScroll direction="bottom">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/50 mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-sm tracking-wider uppercase">Technical Skills</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
               <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                 My Expertise
               </span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
               Crafting exceptional digital solutions with{' '}
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 font-semibold">
                 cutting-edge technologies
               </span>{' '}
               and modern frameworks
            </p>
          </RevealOnScroll>
        </div>

        {/* Beautiful Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-on-scroll">
          {SKILLS.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <RevealOnScroll key={index} delay={index * 100} direction="bottom">
                <div className="group p-1">
                  {/* Always Visible Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-400/20 to-blue-400/20 rounded-3xl group-hover:from-emerald-500/40 group-hover:via-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-700"></div>
                  
                  {/* Premium Card */}
                  <div 
                    className="group relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 hover:-translate-y-3 hover:scale-[1.03] overflow-hidden flex flex-col card-3d glow-hover"
                    style={{ height: `${cardHeight}px` }}
                  >
                    
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-cyan-50/30 to-blue-50/40 dark:from-emerald-950/10 dark:via-cyan-950/5 dark:to-blue-950/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    
                    {/* Enhanced Gradient Border on Hover */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/30 via-cyan-400/30 to-purple-400/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-emerald-300/15 via-cyan-300/15 to-blue-300/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl"></div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                      <div className="absolute top-6 right-6 w-2 h-2 bg-emerald-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-cyan-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
                      <div className="absolute top-1/2 right-8 w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-900 delay-400"></div>
                    </div>
                    
                    {/* Shimmer Wave */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 rounded-3xl"></div>
                    
                    <div className="relative z-10">
                      {/* Enhanced Header */}
                      <div className="text-center mb-8 flex-shrink-0">
                        <div className="relative inline-block mb-4">
                          <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-cyan-500 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <Icon className="w-9 h-9 text-white drop-shadow-lg" />
                          </div>
                          
                          {/* Glowing Ring */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/40 via-cyan-400/40 to-blue-400/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-300 mb-3 leading-tight group-hover:scale-105 transform">
                          {category.title}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300"></div>
                        </div>
                      </div>
                      
                      {/* Skills Grid */}
                      <div className="flex-1 overflow-hidden">
                        <div className="grid grid-cols-2 gap-3 h-full content-start">
                          {category.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className="group/skill relative min-h-[3rem] flex items-center justify-center overflow-hidden p-0.5"
                              style={{
                                animationDelay: `${idx * 80}ms`
                              }}
                            >
                              {/* Always Visible Gradient Border */}
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-cyan-400/30 to-blue-400/30 rounded-xl group-hover/skill:from-emerald-500/50 group-hover/skill:via-cyan-500/50 group-hover/skill:to-blue-500/50 transition-all duration-500"></div>
                              
                              {/* Enhanced Gradient Border on Hover */}
                              <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-300/20 via-cyan-300/20 to-purple-300/20 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-all duration-700 blur-sm"></div>
                              
                              {/* Main Button */}
                              <div className="relative w-full h-full px-3 py-3 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-lg group-hover/skill:bg-gradient-to-br group-hover/skill:from-white group-hover/skill:to-emerald-50/50 dark:group-hover/skill:from-slate-800 dark:group-hover/skill:to-emerald-900/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-400 shadow-sm group-hover/skill:shadow-lg group-hover/skill:shadow-emerald-500/10 flex items-center justify-center backdrop-blur-sm">
                                
                                <span className="relative z-10 text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover/skill:text-emerald-600 dark:group-hover/skill:text-emerald-400 transition-all duration-400 text-center leading-tight group-hover/skill:scale-105 group-hover/skill:font-bold">
                                  {skill}
                                </span>
                                
                                {/* Enhanced Shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-1000 rounded-lg"></div>
                                
                                {/* Corner Glow */}
                                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover/skill:opacity-100 transition-all duration-500 shadow-sm shadow-emerald-400/50"></div>
                                <div className="absolute bottom-1 left-1 w-1 h-1 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover/skill:opacity-100 transition-all duration-700 delay-100"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Elegant Bottom */}
        <RevealOnScroll delay={600} direction="bottom">
          <div className="mt-24 text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-400/20 rounded-full blur-xl"></div>
              <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-full border border-emerald-200/50 dark:border-emerald-800/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-bold text-lg">
                    Continuously Learning & Growing
                  </span>
                  <Rocket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Skills;