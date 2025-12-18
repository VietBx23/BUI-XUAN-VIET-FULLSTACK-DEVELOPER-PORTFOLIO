import React, { useMemo } from 'react';
import { ArrowRight, Github, Command } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import RevealOnScroll from './RevealOnScroll';
import MagneticButton from './MagneticButton';


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
                    <div className="relative mb-8">
                        {/* Greeting */}
                        <div className="mb-6">
                            <span className="block text-slate-500 dark:text-slate-400 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-widest uppercase mb-6 animate-fade-in">Hello, I am</span>
                        </div>
                        
                        {/* Name - Two Lines with Glitch Effect */}
                        <h1 className="font-black tracking-tighter text-slate-900 dark:text-white leading-[0.8] glitch-wrapper relative">
                            {/* Background Glow */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 blur-3xl rounded-2xl"></div>
                            
                            <div className="relative">
                                {/* First Line: BUI XUAN - Force single line */}
                                <div className="glitch-text block text-5xl sm:text-7xl lg:text-8xl xl:text-9xl whitespace-nowrap" data-text="BUI XUAN">
                                    BUI XUAN
                                </div>
                                
                                {/* Second Line: VIET */}
                                <div className="glitch-text block text-5xl sm:text-7xl lg:text-8xl xl:text-9xl -mt-2 lg:-mt-4" data-text="VIET">
                                    VIET
                                </div>
                            </div>
                            
                            {/* Enhanced Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-10 h-10 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full animate-pulse delay-1000"></div>
                            <div className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse delay-500"></div>
                        </h1>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll direction="bottom" delay={200}>
                   <div className="mb-12 relative">
                        {/* Enhanced Title */}
                        <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                            <h2 className="relative text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 animate-gradient bg-[length:200%_100%] px-4 py-2">
                                FULLSTACK DEVELOPER
                            </h2>
                        </div>
                        
                        {/* Subtitle */}
                        <div className="mt-6 flex items-center justify-center lg:justify-start gap-4">
                            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent flex-1 max-w-20"></div>
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wider uppercase">Passionate • Innovative • Reliable</span>
                            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent flex-1 max-w-20"></div>
                        </div>
                   </div>
                </RevealOnScroll>

                <RevealOnScroll direction="bottom" delay={300}>
                    <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light">
                        I’m Bui Xuan Viet, a Fullstack Developer with 1+ year of experience across backend and frontend. using <span className="text-slate-900 dark:text-white font-semibold">C#</span>, <span className="text-slate-900 dark:text-white font-semibold">Java</span>, <span className="text-slate-900 dark:text-white font-semibold">Node.js</span>, <span className="text-slate-900 dark:text-white font-semibold">React</span>, <span className="text-slate-900 dark:text-white font-semibold">Next.js</span>, and more.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll direction="bottom" delay={400}>
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                        {/* Primary Button - Premium Style with Magnetic Effect */}
                        <MagneticButton intensity={0.2}>
                            <a 
                                href="#projects" 
                                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-bold tracking-wide text-white overflow-hidden transition-all duration-300 ripple-button block"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_0_30px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-300"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                                    View Featured Works
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </a>
                        </MagneticButton>

                        {/* Secondary Button - Glass Style with Magnetic Effect */}
                        <MagneticButton intensity={0.15}>
                            <a 
                                href={PERSONAL_INFO.github} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold tracking-wide hover:text-emerald-700 dark:hover:text-white hover:border-emerald-500/50 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 shadow-lg hover:shadow-glow-emerald ripple-button block"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                                    <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    GitHub Profile
                                </span>
                            </a>
                        </MagneticButton>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right: Premium IDE-Style Profile Card */}
            <div className="flex-1 w-full relative hidden lg:block perspective-1000">
                 <RevealOnScroll direction="right" delay={200}>
                    <div className="relative w-full max-w-4xl mx-auto">
                        
                        {/* Main IDE-Style Card */}
                        <div className="relative bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-2xl z-20 overflow-hidden group hover:shadow-3xl transition-all duration-700 min-h-[700px]">
                            
                            {/* Enhanced Gradient Border */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-400/30 via-cyan-400/30 to-blue-400/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                            
                            {/* IDE Header */}
                            <div className="relative z-10 h-14 border-b border-slate-200/60 dark:border-slate-700/60 bg-slate-50/80 dark:bg-[#161b22]/80 flex items-center px-6 justify-between backdrop-blur-sm">
                                <div className="flex gap-3">
                                    <div className="w-4 h-4 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"></div>
                                    <div className="w-4 h-4 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                                    <div className="w-4 h-4 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"></div>
                                </div>
                                <div className="text-sm font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <Command className="w-4 h-4" />
                                    <span>developer.profile.tsx</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">Online</span>
                                </div>
                            </div>
                            
                            {/* IDE Body */}
                            <div className="relative z-10 flex min-h-[600px]">
                                {/* Left Sidebar - Avatar & Info */}
                                <div className="w-2/5 bg-slate-50/50 dark:bg-[#0d1117]/50 border-r border-slate-200/60 dark:border-slate-700/60 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                                    {/* Clean Avatar - No Borders */}
                                    <div className="relative mb-6 group/avatar">
                                        {/* Subtle Glow Effect */}
                                        <div className="absolute -inset-6 bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-blue-400/10 blur-3xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-1000"></div>
                                        
                                        {/* Avatar Image - Extra Large with Enhanced Shadow */}
                                        <div className="relative w-72 h-50">
                                            {/* Enhanced Bottom Shadow - Multiple layers for depth */}
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-16 bg-slate-900/20 dark:bg-black/40 rounded-full blur-2xl opacity-60 group-hover/avatar:opacity-80 transition-all duration-700"></div>
                                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-12 bg-slate-700/15 dark:bg-black/30 rounded-full blur-xl opacity-40 group-hover/avatar:opacity-60 transition-all duration-700"></div>
                                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-slate-600/10 dark:bg-black/20 rounded-full blur-lg opacity-30 group-hover/avatar:opacity-50 transition-all duration-700"></div>
                                            
                                            <img 
                                               src="/Images/avatar.png" 
                                                alt="Bui Xuan Viet"
                                                className="relative z-10 w-full h-full object-cover object-center filter brightness-105 contrast-105 saturate-105 drop-shadow-2xl group-hover/avatar:brightness-110 group-hover/avatar:drop-shadow-3xl transition-all duration-700"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/Images/profile-placeholder.svg";
                                                }}
                                            />
                                            
                                            {/* Bottom Fade Shadow - Hides cut edges */}
                                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50/90 via-slate-50/60 to-transparent dark:from-[#0d1117]/90 dark:via-[#0d1117]/60 dark:to-transparent pointer-events-none z-20"></div>
                                        </div>
                                        
                                        {/* Minimal Status Indicator
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover/avatar:scale-110 transition-transform duration-300">
                                            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                                        </div> */}
                                    </div>
                                    
                                    {/* Name & Title */}
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
                                        Bui Xuan Viet
                                    </h3>
                                    <p className="text-lg text-emerald-600 dark:text-emerald-400 font-semibold">
                                        Fullstack Developer
                                    </p>
                                    
                                    {/* Bottom Fade Overlay for entire sidebar */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50/95 via-slate-50/70 to-transparent dark:from-[#0d1117]/95 dark:via-[#0d1117]/70 dark:to-transparent pointer-events-none"></div>
                                </div>
                                
                                {/* Right Code Area */}
                                <div className="flex-1 p-8 font-mono text-base leading-relaxed bg-white/50 dark:bg-[#0d1117]/50">
                                    <div className="space-y-1">
                                        {/* Line Numbers */}
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">1</span>
                                            <div className="flex gap-2">
                                                <span className="text-purple-600 dark:text-purple-400">const</span>
                                                <span className="text-blue-600 dark:text-blue-400">developer</span>
                                                <span className="text-slate-800 dark:text-white">=</span>
                                                <span className="text-slate-800 dark:text-white">{'{'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">2</span>
                                            <div className="pl-4">
                                                <span className="text-red-600 dark:text-red-400">name</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "Bui Xuan Viet"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">3</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">role</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "Fullstack Developer"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">4</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">skills</span>
                                                <span className="text-slate-800 dark:text-white">: [</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">5</span>
                                            <div className="pl-12">
                                                <span className="text-emerald-600 dark:text-emerald-400">"Java Spring Boot"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">6</span>
                                            <div className="pl-12">
                                                <span className="text-emerald-600 dark:text-emerald-400">"C# .NET Core"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">7</span>
                                            <div className="pl-12">
                                                <span className="text-emerald-600 dark:text-emerald-400">"PHP & Laravel"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">8</span>
                                            <div className="pl-12">
                                                <span className="text-emerald-600 dark:text-emerald-400">"WordPress & CMS"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">9</span>
                                            <div className="pl-12">
                                                <span className="text-emerald-600 dark:text-emerald-400">"React & Next.js"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">10</span>
                                            <div className="pl-12">
                                                <span className="text-emerald-600 dark:text-emerald-400">"React Native"</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">11</span>
                                            <div className="pl-6">
                                                <span className="text-slate-800 dark:text-white">],</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">12</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">passion</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "Clean Code & Innovation"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">13</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">status</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "Available for hire"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">14</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">experience</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "2+ years"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">15</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">location</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "Ho Chi Minh City, VN"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">16</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">contact</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "vietbx23@gmail.com"</span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">17</span>
                                            <div className="pl-6">
                                                <span className="text-red-600 dark:text-red-400">github</span>
                                                <span className="text-slate-800 dark:text-white">:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400"> "github.com/VietBx23"</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                            <span className="text-slate-400 dark:text-slate-500 text-sm w-8">18</span>
                                            <div>
                                                <span className="text-slate-800 dark:text-white">{'}'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* IDE Footer */}
                            <div className="relative z-10 h-10 border-t border-slate-200/60 dark:border-slate-700/60 bg-slate-50/80 dark:bg-[#161b22]/80 flex items-center px-6 justify-between text-sm backdrop-blur-sm">
                                <div className="flex items-center gap-6">
                                    <span className="text-slate-500 dark:text-slate-400">TypeScript React</span>
                                    <span className="text-emerald-600 dark:text-emerald-400">✓ No Problems</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500 dark:text-slate-400">Ln 18, Col 1</span>
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                </div>
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
