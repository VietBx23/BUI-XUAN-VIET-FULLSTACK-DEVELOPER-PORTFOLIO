import React from 'react';
import { Target, Rocket, User, MapPin, Coffee, Code, Sparkles, Brain } from 'lucide-react';
import { SUMMARY, CAREER_GOALS, PERSONAL_INFO } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const About: React.FC = () => {
  // Magic border effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    for(const card of target.getElementsByClassName("magic-card") as HTMLCollectionOf<HTMLElement>) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-transparent">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" onMouseMove={handleMouseMove}>
        <div className="mb-20">
          <RevealOnScroll direction="bottom">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 animate-shimmer bg-[length:200%_100%]">Code</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200} direction="bottom">
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                I don't just write functions; I architect solutions. Here's a glimpse into my professional philosophy and future trajectory.
            </p>
          </RevealOnScroll>
        </div>

        {/* Bento Grid Layout - Magic Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Summary Block - Spans 8 cols */}
          <div className="md:col-span-8">
              <RevealOnScroll delay={100} className="h-full">
                <div className="group h-full relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden magic-card magic-border shadow-xl dark:shadow-none">
                    <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">BIO.txt</span>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Architect's Mindset</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">
                                {SUMMARY}
                            </p>
                        </div>
                    </div>
                </div>
              </RevealOnScroll>
          </div>

          {/* Stats / Status - Spans 4 cols */}
          <div className="md:col-span-4">
              <RevealOnScroll delay={200} className="h-full">
                <div className="group h-full relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden magic-card magic-border shadow-xl dark:shadow-none">
                    <div className="relative h-full p-8 flex flex-col justify-between z-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Base</div>
                                    <div className="text-slate-900 dark:text-white font-medium">Ho Chi Minh, VN</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                    <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Focus</div>
                                    <div className="text-slate-900 dark:text-white font-medium">System Architecture</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 dark:text-slate-400 text-sm">Status</span>
                                <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Available
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
              </RevealOnScroll>
          </div>

          {/* Short Term Goals - Spans 6 cols */}
          <div className="md:col-span-6">
              <RevealOnScroll delay={300} className="h-full">
                <div className="group h-full relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden magic-card magic-border shadow-xl dark:shadow-none">
                    <div className="relative h-full p-8 z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2.5 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Current Focus</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {CAREER_GOALS.shortTerm}
                        </p>
                        {/* Visual Progress Bar Decoration */}
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-xs text-slate-500 font-mono">
                                <span>Backend Mastery</span>
                                <span>85%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
              </RevealOnScroll>
          </div>

          {/* Long Term Goals - Spans 6 cols */}
          <div className="md:col-span-6">
              <RevealOnScroll delay={400} className="h-full">
                <div className="group h-full relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden magic-card magic-border shadow-xl dark:shadow-none">
                    <div className="relative h-full p-8 z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                <Rocket className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">North Star</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {CAREER_GOALS.longTerm}
                        </p>
                        {/* Visual Graphic Decoration */}
                        <div className="mt-6 flex gap-2">
                            {[1,2,3,4].map((i) => (
                                <div key={i} className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500/40 w-full animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;