import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { EDUCATION } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-slate-50 dark:bg-[#020617] relative transition-colors duration-300">
       {/* Ambient Light */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-12 bg-slate-300 dark:bg-slate-800"></div>
            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Academic Background</span>
            <div className="h-px w-12 bg-slate-300 dark:bg-slate-800"></div>
        </div>

        {/* Certificate Card */}
        <RevealOnScroll direction="bottom">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                
                <div className="relative bg-white dark:bg-[#0a0f1c] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 overflow-hidden shadow-2xl dark:shadow-none">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    {/* Giant Watermark */}
                    <GraduationCap className="absolute -right-12 -top-12 w-96 h-96 text-slate-100 dark:text-slate-800/20 rotate-12 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                        
                        {/* Icon Box */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg relative group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl animate-pulse"></div>
                                <GraduationCap className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                                
                                {/* Decorative Corner accents */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-md"></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-md"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-500/50 rounded-bl-md"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500/50 rounded-br-md"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{EDUCATION.school}</h3>
                                <div className="text-xl text-emerald-600 dark:text-emerald-400 font-medium">{EDUCATION.major}</div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800/50">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm font-mono">{EDUCATION.period}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 bg-yellow-500/5 px-4 py-2 rounded-lg border border-yellow-500/10">
                                    <Award className="w-4 h-4" />
                                    <span className="text-sm font-bold">GPA: {EDUCATION.gpa}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Education;