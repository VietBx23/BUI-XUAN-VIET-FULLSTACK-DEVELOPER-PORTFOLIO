import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, X, Facebook, Send, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-top button after scrolling down 400px
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
        label: 'Phone',
        icon: Phone,
        url: `tel:${PERSONAL_INFO.phone}`,
        className: 'text-emerald-600 hover:bg-emerald-500 hover:text-white',
        delay: '0ms'
    },
    {
        label: 'Telegram',
        icon: Send,
        url: 'https://t.me/xuanviet23',
        className: 'text-[#229ED9] hover:bg-[#229ED9] hover:text-white',
        delay: '50ms'
    },
    {
        label: 'Messenger',
        icon: MessageCircle,
        url: 'https://m.me/BuiXuanViet.6623.BE',
        className: 'text-[#00B2FF] hover:bg-[#00B2FF] hover:text-white',
        delay: '100ms'
    },
    {
        label: 'Zalo',
        // Custom Zalo Text Icon
        icon: (props: any) => <span {...props} className="font-black text-[10px] tracking-tighter flex items-center justify-center w-full h-full border border-current rounded-full px-0.5">Zalo</span>,
        url: 'https://zalo.me/0932718625',
        className: 'text-[#0068FF] hover:bg-[#0068FF] hover:text-white',
        delay: '150ms'
    },
    {
        label: 'Facebook',
        icon: Facebook,
        url: 'https://www.facebook.com/BuiXuanViet.6623.BE/',
        className: 'text-[#1877F2] hover:bg-[#1877F2] hover:text-white',
        delay: '200ms'
    }
  ];

  return (
    <>
      {/* --- Left Side: Chat Widget --- */}
      <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-center gap-4">
          
          {/* Social Icons List (Appears when toggled) */}
          <div className={`flex flex-col-reverse gap-3 transition-all duration-300 ${isChatOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                      <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${link.className}`}
                          style={{ transitionDelay: isChatOpen ? link.delay : '0ms' }}
                          title={link.label}
                      >
                          <Icon size={20} />
                      </a>
                  );
              })}
          </div>

          {/* Main Toggle Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:scale-105 ${isChatOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
          >
              {isChatOpen ? <X size={24} /> : <MessageCircle size={28} className="animate-pulse" />}
          </button>
      </div>


      {/* --- Right Side: Scroll To Top --- */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-700 dark:border-slate-600 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-400 transition-all duration-500 transform group ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>
    </>
  );
};

export default FloatingActions;