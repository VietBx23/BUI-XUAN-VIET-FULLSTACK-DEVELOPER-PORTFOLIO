import React, { useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import AdminDashboard from './admin/AdminDashboard';

import CursorTrail from './components/CursorTrail';

// Complete Admin Dashboard with Management Features
const CompleteAdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('personal');
  const [saveMessage, setSaveMessage] = React.useState('');

  // Personal Info State
  const [personalInfo, setPersonalInfo] = React.useState({
    email: 'vietbx23@gmail.com',
    phone: '+84 932 718 625',
    location: 'Ho Chi Minh City, Vietnam',
    github: 'https://github.com/VietBx23'
  });

  // Summary State
  const [summary, setSummary] = React.useState("I'm Bui Xuan Viet, a Fullstack Developer experienced in building scalable backend systems, modern frontend applications, and mobile solutions.");

  // Experience State
  const [experiences, setExperiences] = React.useState([
    {
      company: 'THIEN CO TRI LIEN CO., LTD',
      role: 'Fullstack Developer',
      period: '2025 – Present',
      description: 'Deployed and managed websites on VPS using Baota server. Built websites rapidly using multiple CMS platforms.'
    },
    {
      company: 'Solar EV Company',
      role: 'IT Engineer',
      period: '06/2024 – 06/2025',
      description: 'Developed EV Charging Station Management Platform using C#, .NET Core, SQL Server.'
    }
  ]);

  // Projects State
  const [projects, setProjects] = React.useState([
    {
      title: 'EV Charging Station Management Platform',
      period: '06/2024 – 10/2024',
      tech: 'C#, .NET Core, SQL Server, SignalR',
      description: 'A large-scale management platform for electric vehicle charging stations.'
    },
    {
      title: 'SolarEV Mobile Application',
      period: '02/2025 – Present',
      tech: 'React Native, TypeScript, Expo',
      description: 'Cross-platform mobile app enabling EV users to scan QR codes to start charging.'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'XuanViet23@') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_auth', JSON.stringify({ username, timestamp: Date.now() }));
    } else {
      alert('Invalid credentials! Use admin / XuanViet23@');
    }
  };

  const handleSave = (section: string) => {
    setSaveMessage(`${section} saved successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
    
    // Save to localStorage
    const data = { personalInfo, summary, experiences, projects };
    localStorage.setItem('portfolio_admin_data', JSON.stringify(data));
  };

  // Check if already logged in
  React.useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      if (authData.timestamp > Date.now() - 24 * 60 * 60 * 1000) {
        setIsLoggedIn(true);
        setUsername(authData.username);
      }
    }

    // Load saved data
    const savedData = localStorage.getItem('portfolio_admin_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.personalInfo) setPersonalInfo(data.personalInfo);
      if (data.summary) setSummary(data.summary);
      if (data.experiences) setExperiences(data.experiences);
      if (data.projects) setProjects(data.projects);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-slate-400">Portfolio Management System</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-400 mb-2">Demo Credentials:</p>
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div>Username: <span className="text-emerald-400">admin</span></div>
              <div>Password: <span className="text-emerald-400">XuanViet23@</span></div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <a href="/" className="text-blue-400 hover:text-blue-300 text-sm">← Back to Portfolio</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Portfolio Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {username}</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">🎉 Admin Dashboard Working!</h2>
          <p className="text-slate-400 mb-8">You have successfully logged into the admin panel.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
              <p className="text-slate-400 text-sm">Manage contact details and bio</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <p className="text-slate-400 text-sm">Add work experience and roles</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-2">Projects</h3>
              <p className="text-slate-400 text-sm">Showcase portfolio projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  // Check if we're on admin route - simple check
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }

  // Generate static twinkling stars (Global)
  const stars = useMemo(() => new Array(70).fill(true).map((_, idx) => ({
    left: Math.floor(Math.random() * 100) + '%',
    top: Math.floor(Math.random() * 100) + '%',
    size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-0.5 h-0.5',
    delay: Math.random() * 5 + 's',
    opacity: Math.random() * 0.5 + 0.3
  })), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-800 dark:selection:text-emerald-200 relative overflow-x-hidden transition-colors duration-300">
      
      {/* Global Background Ambience (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         {/* 1. Stars - ONLY Visible in Dark Mode */}
         {stars.map((star, idx) => (
             <div 
               key={`star-${idx}`}
               className={`hidden dark:block absolute bg-white rounded-full animate-twinkle ${star.size}`}
               style={{
                   left: star.left,
                   top: star.top,
                   animationDelay: star.delay,
                   opacity: star.opacity
               }}
             ></div>
          ))}

         {/* 3. Glow Orbs - Adjusted for Light/Dark */}
         <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] opacity-40"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] opacity-30"></div>
         
         {/* 4. Grid - Darker lines in light mode, Light lines in dark mode */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <main className="space-y-24 lg:space-y-32">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <About />
          <Education />
        </main>
        <Footer />
        <FloatingActions />
      </div>
      <CursorTrail />

    </div>
  );
}

export default App;