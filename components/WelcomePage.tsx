import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin, Calendar, Code, Coffee } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface WelcomePageProps {
  onEnter: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Animation delay
    const timer = setTimeout(() => setIsLoaded(true), 500);
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Ho_Chi_Minh'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-emerald-400/30 rotate-45 animate-float"></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 border-2 border-cyan-400/30 rotate-12 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Profile Image */}
            <div className={`relative transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}>
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
                  {/* Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 rounded-3xl animate-gradient-border p-1">
                    <div className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden">
                      {/* Profile Image */}
                      <img 
                        src="/Images/avatar.png" 
                        alt="Bui Xuan Viet"
                        className="w-full h-full object-cover profile-image-glow"
                        onError={(e) => {
                          // Fallback to SVG placeholder if image doesn't exist
                          (e.target as HTMLImageElement).src = "/Images/profile-placeholder.svg";
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Floating Status Indicators */}
                  <div className={`absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-5 scale-75'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Available
                    </div>
                  </div>
                  
                  <div className={`absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-75'}`}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Ho Chi Minh City
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Information */}
            <div className="space-y-8">
              
              {/* Greeting */}
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-semibold transition-all duration-800 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  <Coffee className="w-4 h-4" />
                  Welcome to my portfolio
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className={`block text-slate-400 text-lg font-normal mb-2 transition-all duration-800 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>Hello, I'm</span>
                  <span className={`bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                    BUI XUAN VIET
                  </span>
                </h1>
                
                <div className="space-y-2">
                  <h2 className={`text-2xl lg:text-3xl font-bold text-emerald-400 transition-all duration-800 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    Fullstack Developer
                  </h2>
                  <p className={`text-slate-300 text-lg leading-relaxed max-w-lg transition-all duration-800 delay-1300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    Passionate about building scalable backend systems and interactive applications. 
                    Specializing in <span className="text-emerald-400 font-semibold">.NET Core</span>, 
                    <span className="text-cyan-400 font-semibold"> Java Spring</span>, and 
                    <span className="text-blue-400 font-semibold"> Modern Web Technologies</span>.
                  </p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-800 delay-1500 info-card-hover ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Experience</div>
                      <div className="font-bold text-white">2+ Years</div>
                    </div>
                  </div>
                </div>
                
                <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-800 delay-1700 info-card-hover ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Local Time</div>
                      <div className="font-bold text-white font-mono">{formatTime(currentTime)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className={`space-y-3 transition-all duration-800 delay-1900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h3 className="text-lg font-semibold text-slate-300">Get in touch</h3>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className={`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-lg transition-all duration-800 delay-2100 text-sm ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </a>
                  
                  <a 
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-lg transition-all duration-800 delay-2300 text-sm ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Current Date */}
              <div className={`text-sm text-slate-400 border-t border-white/10 pt-4 transition-all duration-800 delay-2500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                {formatDate(currentTime)}
              </div>

              {/* Enter Button */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={onEnter}
                  className={`group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-xl font-bold text-lg transition-all duration-1000 delay-2700 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 overflow-hidden enter-button ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    Enter Portfolio
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                
                <div className={`text-center transition-all duration-800 delay-2900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                  <button
                    onClick={() => {
                      localStorage.setItem('skip_welcome', 'true');
                      onEnter();
                    }}
                    className="text-sm text-slate-400 hover:text-slate-300 transition-colors duration-300 underline"
                  >
                    Skip welcome page in the future
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>
    </div>
  );
};

export default WelcomePage;