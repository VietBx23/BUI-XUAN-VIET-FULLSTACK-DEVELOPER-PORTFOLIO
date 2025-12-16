import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Github, Smartphone, Monitor, ArrowUpRight, Lock, Layers, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { PROJECTS } from '../constants';
import { LinkData } from '../types';
import RevealOnScroll from './RevealOnScroll';

// --- 3D Tilt Wrapper ---
const ProjectCard3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        // Limit rotation for subtle effect
        const rotateY = xPct * 3; 
        const rotateX = yPct * -3;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`perspective-1000 ${className}`}
            style={{ perspective: '1000px' }}
        >
            <div
                className="transition-transform duration-500 ease-out transform-style-3d w-full h-full"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.01 : 1})`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </div>
        </div>
    );
};

// --- Image Slider Component ---
const ImageSlider: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (!images || images.length <= 1) return;
        
        // Auto slide every 3.5 seconds if not hovering
        const interval = setInterval(() => {
            if (!isHovering) {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }
        }, 3500);

        return () => clearInterval(interval);
    }, [images, isHovering]);

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
         e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    }

    const handleImageError = (index: number) => {
        setImageErrors(prev => ({ ...prev, [index]: true }));
    };

    if (!images || images.length === 0) {
        return <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />;
    }

    // Fallback image URL (Abstract tech background)
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop";

    return (
        <div 
            className="absolute inset-0 w-full h-full group/slider"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Images - Sliding Effect */}
            {images.map((img, idx) => (
                <div 
                    key={idx}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {imageErrors[idx] ? (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                             <img 
                                src={FALLBACK_IMAGE}
                                alt="Fallback"
                                className="absolute inset-0 w-full h-full object-cover opacity-50"
                             />
                             <div className="z-10 flex flex-col items-center text-slate-400">
                                <ImageOff className="w-12 h-12 mb-2 opacity-50" />
                                <span className="text-xs uppercase tracking-widest font-bold">Image Unavailable</span>
                             </div>
                        </div>
                    ) : (
                        <img 
                            src={img} 
                            alt={`${title} - slide ${idx + 1}`}
                            className="w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear scale-105 group-hover/slider:scale-110" // Slow zoom effect
                            loading="lazy"
                            onError={() => handleImageError(idx)}
                        />
                    )}
                     {/* Overlay Gradient for better text visibility if needed */}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60"></div>
                </div>
            ))}

            {/* Navigation Arrows (Only visible on hover) */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/50 hover:scale-110 duration-200"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/50 hover:scale-110 duration-200"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Indicators / Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); goToSlide(idx); }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Projects: React.FC = () => {
  // Meteors for Project section (sparse)
  const meteors = useMemo(() => new Array(6).fill(true).map((_, idx) => ({
    left: Math.floor(Math.random() * 100) + '%',
    top: Math.floor(Math.random() * 80) + '%', 
    delay: Math.random() * 3 + 's',
    duration: Math.floor(Math.random() * 6 + 6) + 's',
  })), []);

  const renderLinkIcon = (type: LinkData['type']) => {
    switch (type) {
      case 'github': return <Github className="h-4 w-4" />;
      case 'android': return <Smartphone className="h-4 w-4" />;
      case 'ios': return <Smartphone className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <section id="projects" className="py-32 relative bg-transparent overflow-hidden">
      {/* Meteor Layer - Specific to Projects (Hidden in Light Mode) */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden z-0">
          {meteors.map((meteor, idx) => (
            <span
              key={`proj-meteor-${idx}`}
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

      {/* Global Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-24">
        <RevealOnScroll direction="bottom">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/50 pb-8">
                <div>
                    <h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <Layers className="w-4 h-4" />
                         Engineering
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 animate-shimmer bg-[length:200%_100%]">Works</span>
                    </h3>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs ml-auto leading-relaxed">
                        A curated selection of scalable systems, complex integrations, and user-centric applications.
                    </p>
                </div>
            </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-32">
          {PROJECTS.map((project, index) => (
            <RevealOnScroll key={index} delay={index * 50} direction="bottom">
                <div className="group relative">
                    {/* Giant Number Background */}
                    <div className={`absolute top-0 -translate-y-1/2 text-[15rem] leading-none font-black text-slate-200/50 dark:text-slate-800/20 select-none z-0 pointer-events-none transition-all duration-700 group-hover:text-slate-300/50 dark:group-hover:text-slate-800/40 ${index % 2 === 0 ? '-left-20' : '-right-20'}`}>
                        0{index + 1}
                    </div>

                    <div className={`relative z-10 flex flex-col lg:flex-row ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                        
                        {/* Visual Side with Slider */}
                        <div className="w-full lg:w-[60%] perspective-1000">
                             <ProjectCard3D>
                                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050914] shadow-2xl dark:shadow-black/50 group-hover:shadow-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-500 aspect-video group">
                                    
                                    {/* Image Carousel */}
                                    <ImageSlider images={project.images || []} title={project.title} />

                                    {/* Glass Shine Effect (on top of slider) */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30"></div>
                                </div>
                             </ProjectCard3D>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-[40%] relative">
                            {/* Decoration Line */}
                            <div className="w-12 h-1 bg-emerald-500 mb-6"></div>

                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                                    {project.period}
                                </span>
                                {index === 0 && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                                        Latest Build
                                    </span>
                                )}
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                                {project.description}
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="mb-10">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-300 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all cursor-default backdrop-blur-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Links */}
                            <div className="flex flex-wrap gap-4">
                                {project.links.length > 0 ? (
                                    project.links.map((link, i) => (
                                    <a 
                                        key={i} 
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20 overflow-hidden group/btn"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center gap-2">
                                            {renderLinkIcon(link.type)}
                                            {link.label}
                                            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </span>
                                    </a>
                                    ))
                                ) : (
                                    <span className="inline-flex items-center text-slate-500 text-sm font-medium px-6 py-3 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50 cursor-not-allowed">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Private Project
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
          ))}
      </div>
    </section>
  );
};

export default Projects;