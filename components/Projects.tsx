import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Github, Smartphone, Monitor, ArrowUpRight, Lock, Layers, ChevronLeft, ChevronRight, ImageOff, ExternalLink, Zap, Globe, X } from 'lucide-react';
import { MAIN_PROJECTS, TOOLS_AND_WEBSITES } from '../constants';
import { LinkData } from '../types';
import RevealOnScroll from './RevealOnScroll';

// --- Helper Functions ---
const renderLinkIcon = (type: LinkData['type']) => {
  switch (type) {
    case 'github': return <Github className="h-4 w-4" />;
    case 'android': return <Smartphone className="h-4 w-4" />;
    case 'ios': return <Smartphone className="h-4 w-4" />;
    default: return <Monitor className="h-4 w-4" />;
  }
};

// --- Simple Card Wrapper ---
const ProjectCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

// --- Interactive Iframe Component ---
const InteractiveIframe: React.FC<{ url: string; title: string; index: number }> = ({ url, title, index }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {/* Regular Card View - Clean and elegant */}
            <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden rounded-lg">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Loading preview...</span>
                        </div>
                    </div>
                )}
                {hasError ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 text-slate-600 dark:text-slate-400">
                            <ImageOff className="w-8 h-8 opacity-60" />
                            <span className="text-sm font-medium">Preview unavailable</span>
                            <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium"
                            >
                                Open website <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full h-full p-3">
                        {/* Clean iframe container */}
                        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-md shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                            <iframe
                                src={url}
                                title={title}
                                className="w-full h-full border-0 scale-75 origin-top-left"
                                style={{
                                    width: '133.33%',
                                    height: '133.33%'
                                }}
                                onLoad={() => setIsLoading(false)}
                                onError={() => {
                                    setIsLoading(false);
                                    setHasError(true);
                                }}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                            />
                        </div>
                    </div>
                )}
                
                {/* Elegant expand button */}
                <button
                    onClick={() => setIsExpanded(true)}
                    className="absolute bottom-3 right-3 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm font-medium border border-slate-200 dark:border-slate-600"
                >
                    <Monitor className="w-4 h-4" />
                    View Full
                </button>
            </div>

            {/* Expanded Modal View */}
            {isExpanded && (
                <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Interactive Preview</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Open in New Tab
                                </a>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="flex items-center justify-center w-10 h-10 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Modal Content */}
                        <div className="w-full h-[calc(100%-5rem)]">
                            <iframe
                                src={url}
                                title={title}
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// --- Tools Grid Component ---
const ToolsGrid: React.FC<{ tools: typeof TOOLS_AND_WEBSITES }> = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {tools.map((tool, index) => (
        <RevealOnScroll key={index} delay={index * 100} direction="bottom">
          <div className="group relative mb-8">
            {/* Giant Number Background - Similar to main projects */}
            <div className="absolute -top-16 -right-4 text-[8rem] leading-none font-black text-slate-200/50 dark:text-slate-800/50 select-none z-0 pointer-events-none transition-all duration-700 group-hover:text-slate-300/60 dark:group-hover:text-slate-800/60">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="relative z-10 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full flex flex-col hover:-translate-y-1">
              
              {/* Tool Preview - Desktop-like scaled */}
              <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                {tool.iframeUrl ? (
                  <InteractiveIframe url={tool.iframeUrl} title={tool.title} index={index} />
                ) : (
                  <ImageSlider images={tool.images || []} title={tool.title} />
                )}
                
                {/* Live badge - Smaller */}
                <div className="absolute top-2 right-2 z-20">
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </span>
                </div>
              </div>

              {/* Content - Compact */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-3 h-3 text-emerald-500" />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {tool.period}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {tool.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                  {tool.description}
                </p>

                {/* Tech Stack - Compact */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.tech.slice(0, 2).map((tech, i) => (
                    <span key={i} className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {tech}
                    </span>
                  ))}
                  {tool.tech.length > 2 && (
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1.5 py-0.5">
                      +{tool.tech.length - 2}
                    </span>
                  )}
                </div>

                {/* Links - Compact */}
                <div className="mt-auto">
                  {tool.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-all"
                    >
                      {renderLinkIcon(link.type)}
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Subtle decorative line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Corner number indicator */}
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg blur-md opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Animated dots decoration */}
            <div className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce shadow-lg shadow-emerald-500/50" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce shadow-lg shadow-cyan-500/50" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      ))}
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
                                loading="lazy"
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
                            className="w-full h-full object-cover"
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
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
          {MAIN_PROJECTS.map((project, index) => (
            <RevealOnScroll key={index} delay={index * 50} direction="bottom">
                <div className="group relative">
                    {/* Giant Number Background */}
                    <div className={`absolute top-0 -translate-y-1/2 text-[15rem] leading-none font-black text-slate-200/50 dark:text-slate-800/20 select-none z-0 pointer-events-none transition-all duration-700 group-hover:text-slate-300/50 dark:group-hover:text-slate-800/40 ${index % 2 === 0 ? '-left-20' : '-right-20'}`}>
                        0{index + 1}
                    </div>

                    <div className={`relative z-10 flex flex-col lg:flex-row ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                        
                        {/* Visual Side with Slider */}
                        <div className={`perspective-1000 ${
                          project.title.toLowerCase().includes('mobile')
                            ? 'w-full lg:w-[45%]' // Smaller width for mobile
                            : 'w-full lg:w-[60%]' // Standard width for web/desktop
                        }`}>
                             <ProjectCard>
                                <div className={`relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050914] shadow-2xl dark:shadow-black/50 transition-all duration-500 group ${
                                  project.title.toLowerCase().includes('mobile')
                                    ? 'aspect-[9/19] max-w-[200px] mx-auto' // Very narrow and tall like real phone
                                    : 'aspect-video' // Standard 16:9 for web/desktop
                                }`}>
                                    
                                    {/* Content Display - Iframe or Image Carousel */}
                                    {project.iframeUrl ? (
                                        <InteractiveIframe url={project.iframeUrl} title={project.title} index={index} />
                                    ) : (
                                        <ImageSlider images={project.images || []} title={project.title} />
                                    )}

                                    {/* Glass Shine Effect (on top of slider) */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30"></div>
                                </div>
                             </ProjectCard>
                        </div>

                        {/* Content Side */}
                        <div className={`relative ${
                          project.title.toLowerCase().includes('mobile')
                            ? 'w-full lg:w-[55%]' // Larger content area for mobile
                            : 'w-full lg:w-[40%]' // Standard content area
                        }`}>
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
                                            <ArrowUpRight className="w-4 h-4 opacity-50" />
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

      {/* Tools & Websites Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-32">
        <RevealOnScroll direction="bottom">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Tools & Websites
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-4">
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 animate-shimmer bg-[length:200%_100%]">Demos</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Live tools and websites you can interact with directly. Click and explore the functionality in real-time.
            </p>
          </div>
        </RevealOnScroll>

        <ToolsGrid tools={TOOLS_AND_WEBSITES} />
      </div>
    </section>
  );
};

export default Projects;