import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <RevealOnScroll direction="bottom">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-500 animate-shimmer bg-[length:200%_100%]">Expertise</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
              My technical skills and expertise in building scalable systems and modern applications.
            </p>
          </div>
        </RevealOnScroll>

        {/* Skills Grid - Simple Border Effect Only */}
        <RevealOnScroll direction="bottom" delay={200}>
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Programming Languages */}
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-2xl p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">
                    💻
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300">
                    Programming Languages
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Java', icon: '☕' },
                    { name: 'C#', icon: '🔷' },
                    { name: 'PHP', icon: '🐘' },
                    { name: 'Python', icon: '🐍' },
                    { name: 'JavaScript', icon: '🟨' },
                    { name: 'TypeScript', icon: '🔵' },
                    { name: 'C', icon: '⚡' }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Frameworks */}
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-2xl p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">
                    ⚙️
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300">
                    Backend Frameworks
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Spring Boot', icon: '🍃' },
                    { name: '.NET Core', icon: '🔷' },
                    { name: 'ASP.NET', icon: '🌐' },
                    { name: 'Node.js', icon: '🟢' },
                    { name: 'Express', icon: '⚡' },
                    { name: 'Hibernate', icon: '💾' },
                    { name: 'RESTful APIs', icon: '🔗' },
                    { name: 'WebSocket', icon: '🔌' },
                    { name: 'SignalR', icon: '📡' },
                    { name: 'Spring Security', icon: '🔒' }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend & Mobile */}
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-2xl p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">
                    📱
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300">
                    Frontend & Mobile
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'ReactJS', icon: '⚛️' },
                    { name: 'React Native', icon: '📱' },
                    { name: 'AngularJS', icon: '🅰️' },
                    { name: 'Bootstrap', icon: '🎨' },
                    { name: 'Thymeleaf', icon: '🌿' },
                    { name: 'JSP/Servlet', icon: '☕' },
                    { name: 'XXF Themes', icon: '🎭' }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-2xl p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">
                    🗄️
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300">
                    Databases
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'SQL Server', icon: '🗄️' },
                    { name: 'MySQL', icon: '🐬' },
                    { name: 'Firebase', icon: '🔥' }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testing & Tools */}
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-2xl p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">
                    🔧
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300">
                    Testing & Tools
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'JUnit', icon: '🧪' },
                    { name: 'TestNG', icon: '✅' },
                    { name: 'Selenium', icon: '🤖' },
                    { name: 'Postman', icon: '📮' },
                    { name: 'Swagger', icon: '📋' },
                    { name: 'SEO Tools', icon: '🔍' }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DevOps & CMS */}
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 rounded-2xl p-8 shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg">
                    🚀
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-cyan-700 dark:from-emerald-300 dark:to-cyan-300">
                    DevOps & CMS
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'WordPress', icon: '📝' },
                    { name: 'Baota Server', icon: '🖥️' },
                    { name: 'VPS', icon: '☁️' },
                    { name: 'SEO Optimization', icon: '📈' },
                    { name: 'GitHub', icon: '🐙' },
                    { name: 'Agile', icon: '🔄' },
                    { name: 'Scrum', icon: '🏃' },
                    { name: 'CMS Development', icon: '🏗️' }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>


        
      </div>
    </section>
  );
};

export default Skills;