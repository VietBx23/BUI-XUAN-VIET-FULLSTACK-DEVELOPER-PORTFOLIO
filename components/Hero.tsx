import React, { useMemo } from 'react';
import { ArrowRight, Github, Command, Database, Globe, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const Hero: React.FC = () => {
  // Generate refined meteors for Hero
  const meteors = useMemo(() => new Array(10).fill(true).map((_, idx) => ({
    left: Math.floor(Math.random() * 100) + '%',
    top: Math.floor(Math.random() * 60 - 20) + '%', 
    delay: Math.random() * 2 + 's',
    duration: Math.floor(Math.random() * 6 + 6) + 's', 
  })), []);

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[95vh] flex flex-col justify-center">
      
      {/* Meteor Layer - Specific to Hero (Hidden in Light Mode) */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden z-0">
          {meteors.map((meteor, idx) => (
            <span
              key={`hero-meteor-${idx}`}
              className="absolute h-[1px] w-[80px] bg-gradient-to-r from-slate-200 to-transparent rotate-[215deg] animate-meteor opacity-0"
              style={{
                left: meteor.left,
                top: meteor.top,
                animationDelay: meteor.delay,
                animationDuration: meteor.duration,
              }}
            >
              <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]"></span>
              <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[40px] h-[1px] bg-emerald-400/30 blur-[1px]"></span>
            </span>
          ))}
      </div>
      
      {/* Spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            
            {/* Left: Content */}
            <div className="flex-1 text-center lg:text-left z-20">
                <RevealOnScroll direction="bottom" delay={0}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 backdrop-blur-md mb-8 hover:border-emerald-500/30 transition-colors cursor-default group shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Available for hire</span>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll direction="bottom" delay={100}>
                    <div className="relative mb-6">
                        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] glitch-wrapper">
                            <span className="block text-slate-500 dark:text-slate-500 text-2xl sm:text-4xl font-bold tracking-widest uppercase mb-4">Hello, I am</span>
                            <span className="glitch-text block pb-2" data-text="BUI XUAN VIET">BUI XUAN VIET</span>
                        </h1>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll direction="bottom" delay={200}>
                   <div className="mb-10 relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-lg blur opacity-25"></div>
                        <h2 className="relative text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-slate-800 to-emerald-600 dark:from-emerald-400 dark:via-white dark:to-emerald-400 animate-shimmer bg-[length:200%_100%]">
                            FULLSTACK DEVELOPER
                        </h2>
                   </div>
                </RevealOnScroll>

                <RevealOnScroll direction="bottom" delay={300}>
                    <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light">
                        I’m Bui Xuan Viet, a developer passionate about building reliable backend systems and interactive applications. I specialize in <span className="text-slate-900 dark:text-white font-semibold">.NET Core</span>, <span className="text-slate-900 dark:text-white font-semibold">Java Spring</span>, and <span className="text-slate-900 dark:text-white font-semibold">Fullstack</span> web development.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll direction="bottom" delay={400}>
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                        {/* Primary Button - Premium Style */}
                        <a 
                            href="#projects" 
                            className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-bold tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_0_30px_rgba(16,185,129,0.4)]"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                                View Featured Works
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        {/* Secondary Button - Glass Style */}
                        <a 
                            href={PERSONAL_INFO.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold tracking-wide hover:text-emerald-700 dark:hover:text-white hover:border-emerald-500/50 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 active:scale-[0.98] shadow-lg"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                                <Github className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                GitHub Profile
                            </span>
                        </a>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right: Abstract Tech Visual - Expanded Code Block */}
            <div className="flex-1 w-full relative hidden lg:block perspective-1000">
                 <RevealOnScroll direction="right" delay={200}>
                    <div className="relative w-full max-w-xl mx-auto">
                        
                        {/* 1. Main Glass Card - Code Editor (Longer) */}
                        <div className="relative bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl transform rotate-y-6 rotate-x-3 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 z-20 flex flex-col overflow-hidden h-[600px]">
                            {/* Header */}
                            <div className="h-10 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#020617]/50 flex items-center px-4 justify-between">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                    <Command className="w-3 h-3" /> viet_core.ts
                                </div>
                            </div>
                            
                            {/* Body - Expanded Code */}
                            <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-hidden relative">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_24px] pointer-events-none"></div>
                                <div className="relative z-10 space-y-1">
                                    <div className="text-slate-400 dark:text-slate-500">/**</div>
                                    <div className="text-slate-400 dark:text-slate-500"> * Core configuration for system architecture</div>
                                    <div className="text-slate-400 dark:text-slate-500"> */</div>
                                    <div className="flex gap-2">
                                        <span className="text-purple-600 dark:text-purple-400">import</span> 
                                        <span className="text-slate-800 dark:text-white">{'{'}</span>
                                    </div>
                                    <div className="pl-6">
                                        <span className="text-yellow-600 dark:text-yellow-300">Scalability</span>
                                        <span className="text-slate-400 dark:text-slate-500">,</span>
                                    </div>
                                    <div className="pl-6">
                                        <span className="text-yellow-600 dark:text-yellow-300">Security</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-slate-800 dark:text-white">{'}'}</span>
                                        <span className="text-purple-600 dark:text-purple-400">from</span>
                                        <span className="text-emerald-600 dark:text-emerald-400">'@viet/core'</span>;
                                    </div>
                                    
                                    <div className="h-4"></div>
                                    <div className="text-slate-400 dark:text-slate-500">// Defining the core stack</div>
                                    
                                    <div>
                                        <span className="text-blue-600 dark:text-blue-400">const</span> <span className="text-yellow-600 dark:text-yellow-300">TechStack</span> <span className="text-slate-800 dark:text-white">=</span> <span className="text-slate-800 dark:text-white">[</span>
                                    </div>
                                    <div className="pl-6 text-emerald-600 dark:text-emerald-400">'Java Spring Boot'<span className="text-slate-400 dark:text-slate-500">,</span></div>
                                    <div className="pl-6 text-emerald-600 dark:text-emerald-400">'.NET Core'<span className="text-slate-400 dark:text-slate-500">,</span></div>
                                    <div className="pl-6 text-emerald-600 dark:text-emerald-400">'React / Next.js'<span className="text-slate-400 dark:text-slate-500">,</span></div>
                                    <div className="pl-6 text-emerald-600 dark:text-emerald-400">'Cloud Infrastructure'</div>
                                    <div className="text-slate-800 dark:text-white">];</div>
                                    
                                    <div className="h-4"></div>

                                    <div>
                                        <span className="text-purple-600 dark:text-purple-400">export default</span> <span className="text-blue-600 dark:text-blue-400">class</span> <span className="text-yellow-600 dark:text-yellow-300">Viet</span> <span className="text-slate-800 dark:text-white">{'{'}</span>
                                    </div>
                                    
                                    <div className="pl-6">
                                        <span className="text-blue-600 dark:text-blue-400">constructor</span>() {'{'}
                                    </div>
                                    <div className="pl-12">
                                        <span className="text-blue-600 dark:text-blue-400">this</span>.<span className="text-slate-800 dark:text-white">passion</span> <span className="text-slate-800 dark:text-white">=</span> <span className="text-emerald-600 dark:text-emerald-400">'Clean Code'</span>;
                                    </div>
                                     <div className="pl-12">
                                        <span className="text-blue-600 dark:text-blue-400">this</span>.<span className="text-slate-800 dark:text-white">goal</span> <span className="text-slate-800 dark:text-white">=</span> <span className="text-emerald-600 dark:text-emerald-400">'Excellence'</span>;
                                    </div>
                                    <div className="pl-6 text-slate-800 dark:text-white">{'}'}</div>

                                     <div className="pl-6 mt-2">
                                        <span className="text-blue-600 dark:text-blue-400">async</span> <span className="text-yellow-600 dark:text-yellow-300">buildSystem</span>() {'{'}
                                    </div>
                                    <div className="pl-12 text-slate-400 dark:text-slate-500">// Deploying scalable solutions</div>
                                    <div className="pl-12 text-purple-600 dark:text-purple-400">await <span className="text-yellow-600 dark:text-yellow-300">Scalability</span>.<span className="text-blue-600 dark:text-blue-400">maximize</span>();</div>
                                    <div className="pl-6 text-slate-800 dark:text-white">{'}'}</div>
                                    
                                    <div className="text-slate-800 dark:text-white">{'}'}</div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Floating Elements Behind - Adjusted for light mode */}
                        <div className="absolute -top-8 -right-12 w-48 h-48 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-xl animate-float z-10">
                            <Database className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
                            <span className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Backend</span>
                        </div>

                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-xl animate-float z-30" style={{animationDelay: '1.5s'}}>
                            <Globe className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                            <span className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Web</span>
                        </div>

                        <div className="absolute top-1/2 -right-20 w-44 h-24 bg-emerald-500/90 backdrop-blur-md rounded-2xl flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-float z-40" style={{animationDelay: '0.5s'}}>
                            <Cpu className="w-10 h-10 text-white dark:text-slate-900" />
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-white dark:text-slate-900 uppercase">System</span>
                                <span className="text-xs font-bold text-white/90 dark:text-slate-800">Optimized</span>
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

export default Hero;