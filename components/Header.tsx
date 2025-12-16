import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Facebook, MessageCircle, Send, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    if (document.documentElement.classList.contains('dark')) {
        setIsDark(true);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'skills', 'experience', 'projects', 'about'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -300 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
      if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          setIsDark(false);
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          setIsDark(true);
      }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'skills', label: 'Stack', href: '#skills' },
    { id: 'experience', label: 'Work', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'about', label: 'About', href: '#about' },
  ];

  // Social Links Configuration
  const socialLinks = [
    {
        label: 'Facebook',
        icon: Facebook,
        url: 'https://www.facebook.com/BuiXuanViet.6623.BE/',
        className: 'hover:text-[#1877F2]'
    },
    {
        label: 'Zalo',
        // Custom Zalo Text Icon
        icon: (props: any) => <span {...props} className="font-black text-[10px] tracking-tighter flex items-center justify-center w-full h-full border border-current rounded-full px-0.5">Zalo</span>,
        url: 'https://zalo.me/0932718625',
        className: 'hover:text-[#0068FF]'
    },
    {
        label: 'Messenger',
        icon: MessageCircle,
        url: 'https://m.me/BuiXuanViet.6623.BE',
        className: 'hover:text-[#00B2FF]'
    },
    {
        label: 'Telegram',
        icon: Send,
        url: 'https://t.me/xuanviet23',
        className: 'hover:text-[#229ED9]'
    },
    {
        label: 'Phone',
        icon: Phone,
        url: `tel:${PERSONAL_INFO.phone}`,
        className: 'hover:text-emerald-500'
    }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-3 shadow-sm' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="w-full px-6 md:px-12 flex items-center justify-between relative">
            
            {/* Logo Area */}
            <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-4 group">
                <div className="flex flex-col justify-center">
                    <span className="text-lg font-black tracking-tight leading-none text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        BUI XUAN VIET
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 tracking-[0.25em] uppercase leading-tight mt-1">
                        Fullstack Developer
                    </span>
                </div>
            </a>

            {/* Desktop Nav - Centered */}
            <nav className="hidden md:flex items-center gap-4">
                <div className="flex items-center bg-slate-100/50 dark:bg-slate-900/50 rounded-full p-1 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className={`relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                                    isActive 
                                    ? 'text-emerald-950' 
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-emerald-400 dark:bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] -z-10 animate-in fade-in zoom-in duration-300"></div>
                                )}
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </nav>

            {/* CTA Mobile */}
            <div className="flex items-center gap-4 md:hidden">
                 <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                    {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>

                <button 
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Desktop Right Side: Social Icons + Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
                {/* 5 Social Icons */}
                {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <a 
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-lg text-slate-500 dark:text-slate-400 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ${link.className}`}
                            title={link.label}
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    );
                })}

                {/* Divider */}
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

                {/* Theme Toggle Button (Moved here) */}
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-white dark:hover:bg-slate-700 transition-all"
                    aria-label="Toggle Theme"
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
        </div>

        {/* Ranger / Reading Progress Bar - Bottom of Header */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-200/50 dark:bg-slate-800/50">
            <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                style={{ width: `${readingProgress}%` }}
            />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="absolute top-[100%] left-0 right-0 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2 duration-200 z-40">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className={`px-4 py-4 rounded-xl text-sm font-bold tracking-wide transition-all border border-transparent ${
                            activeSection === item.id 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 pl-6' 
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        {item.label}
                    </a>
                ))}
                
                {/* Mobile Social Icons Row */}
                <div className="flex items-center justify-around mt-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {socialLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <a 
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all ${link.className}`}
                            >
                                <Icon className="w-6 h-6" />
                            </a>
                        );
                    })}
                </div>
            </div>
        )}
      </header>
    </>
  );
};

export default Header;