import React from 'react';
import { EXPERIENCE } from '../constants';
import RevealOnScroll from './RevealOnScroll';
import { Briefcase, Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll direction="bottom">
            <div className="mb-16">
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                    Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-500 animate-shimmer bg-[length:200%_100%]">Experience</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                    My professional journey in building scalable systems and solving complex engineering problems.
                </p>
            </div>
        </RevealOnScroll>

        <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-slate-300 dark:via-slate-700 to-slate-200 dark:to-slate-800 md:left-1/2 md:-ml-0.5"></div>

            <div className="space-y-12">
                {EXPERIENCE.map((job, index) => (
                  <RevealOnScroll key={index} delay={index * 100} direction="bottom" className="w-full">
                    <div className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* 1. Timeline Dot */}
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#020617] border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center z-10 shadow-xl group-hover:border-emerald-500 transition-colors duration-300">
                             <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                        </div>

                        {/* 2. Empty Space for layout balance */}
                        <div className="hidden md:block w-1/2"></div>

                        {/* 3. Content Card */}
                        <div className="w-full md:w-1/2 pl-12 md:pl-0">
                            <div className={`group relative bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-emerald-500/30 transition-all duration-300 shadow-xl dark:shadow-lg ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                                {/* Gradient Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {job.period}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-slate-500 group-hover:text-emerald-500" />
                                        {job.role}
                                    </h3>
                                    <h4 className="text-base font-semibold text-slate-500 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{job.company}</h4>
                                    
                                    <ul className="space-y-2.5 mb-6">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 opacity-60"></span>
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    {/* Tech Badge Logic */}
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                                         {['Java', '.NET', 'React', 'Node.js', 'SQL', 'CMS', 'PHP', 'Python', 'Web'].map(tech => {
                                             const allText = job.description.join(' ').toLowerCase();
                                             if (allText.includes(tech.toLowerCase())) {
                                                 return (
                                                     <span key={tech} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                                                         {tech}
                                                     </span>
                                                 )
                                             }
                                             return null;
                                         })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </RevealOnScroll>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;