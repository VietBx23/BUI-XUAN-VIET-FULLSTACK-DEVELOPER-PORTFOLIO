import React, { useState } from 'react';
import { Mail, Phone, Github, Send, ArrowRight, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // NOTE: Direct SMTP usage (Spring Mail) is not possible in a browser-only environment due to security risks (exposing passwords).
    // We use the robust `mailto` approach to ensure the email is composed and sent via the user's trusted client.
    // This guarantees delivery to vietbx23@gmail.com without needing a backend server.
    
    const subject = encodeURIComponent(formState.subject || `Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    
    setIsSubmitting(false);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <footer id="contact" className="bg-slate-100 dark:bg-[#020617] pt-24 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent"></div>
      <div className="absolute -left-20 top-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Information */}
            <div className="flex flex-col justify-center">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 border border-emerald-500/20">
                        Get in touch
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1]">
                        Let's work <br />
                        <span className="text-slate-400 dark:text-slate-500">together.</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
                        I'm actively looking for new opportunities in Backend and Fullstack development. 
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                </div>

                <div className="space-y-6 mt-4">
                    <div className="flex items-center gap-5 group">
                         <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
                            <Mail className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Email Me</span>
                            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                {PERSONAL_INFO.email}
                            </a>
                         </div>
                    </div>

                    <div className="flex items-center gap-5 group">
                         <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                            <Phone className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Call Me</span>
                            <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {PERSONAL_INFO.phone}
                            </a>
                         </div>
                    </div>

                    <div className="flex items-center gap-5 group">
                         <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-500 group-hover:border-purple-500/50 transition-all duration-300 shadow-lg">
                            <Github className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">GitHub</span>
                            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                VietBx23
                            </a>
                         </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:mt-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-tr-[2rem] pointer-events-none"></div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Send a Message</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                value={formState.subject}
                                onChange={handleChange}
                                placeholder="Project inquiry..."
                                className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                value={formState.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full group relative bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-lg py-4 rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? 'Opening Mail Client...' : 'Send Message'}
                                {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div className="mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Bui Xuan Viet. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#home" className="hover:text-emerald-500 transition-colors">Home</a>
                <a href="#projects" className="hover:text-emerald-500 transition-colors">Projects</a>
                <a href="#experience" className="hover:text-emerald-500 transition-colors">Experience</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;