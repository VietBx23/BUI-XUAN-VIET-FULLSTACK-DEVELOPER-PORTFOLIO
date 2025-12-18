import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header giống Experience */}
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

        {/* Skills Grid - Minimal & Clean */}
        <RevealOnScroll direction="bottom" delay={200}>
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Programming Languages */}
              <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      💻
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      Programming Languages
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {['Java', 'C#', 'PHP', 'Python', 'JavaScript', 'TypeScript', 'C'].map((skill, index) => (
                      <div key={skill} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Backend Frameworks */}
              <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      ⚙️
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      Backend Frameworks
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {['Spring Boot', '.NET Core', 'ASP.NET', 'Node.js', 'Express', 'Hibernate', 'RESTful APIs', 'WebSocket', 'SignalR', 'Spring Security'].map((skill, index) => (
                      <div key={skill} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frontend & Mobile */}
              <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      📱
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      Frontend & Mobile
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {['ReactJS', 'React Native', 'AngularJS', 'Bootstrap', 'Thymeleaf', 'JSP/Servlet', 'XXF Themes'].map((skill, index) => (
                      <div key={skill} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Databases */}
              <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      🗄️
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      Databases
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {['SQL Server', 'MySQL', 'Firebase'].map((skill, index) => (
                      <div key={skill} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testing & Tools */}
              <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      🔧
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      Testing & Tools
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {['JUnit', 'TestNG', 'Selenium', 'Postman', 'Swagger', 'SEO Tools'].map((skill, index) => (
                      <div key={skill} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DevOps & CMS */}
              <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      🚀
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      DevOps & CMS
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {['WordPress', 'Baota Server', 'VPS', 'SEO Optimization', 'GitHub', 'Agile', 'Scrum', 'CMS Development'].map((skill, index) => (
                      <div key={skill} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>

        {/* Stats Section - Unified */}
        <RevealOnScroll delay={400} direction="bottom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">15+</span>
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-2">Technologies</div>
                <div className="text-slate-600 dark:text-slate-400">Mastered & Growing</div>
              </div>
            </div>

            <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">5+</span>
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-2">Frameworks</div>
                <div className="text-slate-600 dark:text-slate-400">Full-Stack Expertise</div>
              </div>
            </div>

            <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-300/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-transparent dark:from-emerald-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">2+</span>
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-2">Years</div>
                <div className="text-slate-600 dark:text-slate-400">Professional Experience</div>
              </div>
            </div>

          </div>
        </RevealOnScroll>
        
      </div>
    </section>
  );
};

export default Skills;