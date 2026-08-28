import { Seo } from "../components/Seo";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MonitorPlay, ChevronDown, CheckCircle2, ArrowRight, Zap, Code2, Globe, Database, Shield, Smartphone, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';

function useGoogleFonts() {
  useEffect(() => {
    const id = 'seminar-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}

const HexagonIcon = ({ icon: Icon, color, delay }: { icon: any, color: string, delay: number }) => (
  <motion.div 
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
    className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center z-10 shrink-0"
  >
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-xl">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <polygon points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" fill={`url(#grad-${color})`} />
      <polygon points="50 6, 90 27, 90 73, 50 94, 10 73, 10 27" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    </svg>
    <Icon className="w-8 h-8 md:w-12 md:h-12 text-white relative z-20" />
  </motion.div>
);

export function VibeCodeSeminar() {
  useGoogleFonts();
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-08-15T00:00:00').getTime();
    
    // Initial calculation
    const calcTime = () => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) return;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };
    calcTime();
    
    const interval = setInterval(calcTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Do I need any coding experience?",
      answer: "No, absolutely none. We start from scratch and use AI tools to generate the code, so you can focus on the logic and design."
    },
    {
      question: "What do I need to join?",
      answer: "A laptop (or desktop computer), a stable internet connection, and a willingness to build and learn."
    },
    {
      question: "What if I miss a session?",
      answer: "No worries! All sessions are fully recorded, and you get lifetime access to all recordings and resources provided during the seminar."
    },
    {
      question: "Is the $10 a one-time fee?",
      answer: "Yes, it's a flat one-time fee for full access to all 6 sessions and the lifetime recordings."
    }
  ];

  const curriculum = [
    {
      day: "Day 1 (Aug 15)",
      title: "Foundations + AI-Assisted Design",
      icon: Zap,
      color: "#0ea5e9", // sky blue
      desc: "Modern web design in 2026, using AI design tools to generate layouts/wireframes, sourcing design resources (templates, UI kits, icons, fonts)."
    },
    {
      day: "Day 2 (Aug 16)",
      title: "From Design to Code (with AI)",
      icon: Code2,
      color: "#10b981", // emerald
      desc: "Turning designs into HTML/CSS/JS with AI coding assistants, using AI copilots to build pages, structuring a real project."
    },
    {
      day: "Day 3 (Aug 17)",
      title: "Domains & Hosting",
      icon: Globe,
      color: "#f59e0b", // amber
      desc: "Choosing a domain name, where to register, comparing hosting (shared, VPS, cloud), DNS basics, hands-on: register a domain and deploy."
    },
    {
      day: "Day 4 (Aug 18)",
      title: "Databases",
      icon: Database,
      color: "#d946ef", // fuchsia
      desc: "Why/when you need a database, SQL vs NoSQL, basic schema design, connecting a database with AI-assisted queries."
    },
    {
      day: "Day 5 (Aug 19)",
      title: "SEO & Security",
      icon: Shield,
      color: "#ef4444", // red
      desc: "SEO fundamentals, using AI for keyword research, security basics (HTTPS, XSS, SQL injection), backups and hardening checklist."
    },
    {
      day: "Day 6 (Aug 20)",
      title: "Into Mobile Apps",
      icon: Smartphone,
      color: "#8b5cf6", // violet
      desc: "Website to mobile: PWA vs native vs cross-platform, using AI to scaffold a mobile app from the existing project, publishing basics."
    }
  ];

  const ctaLink = "/vibe-code-seminar/register";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 selection:bg-purple-500/30 overflow-hidden" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <Seo title="Vibe-Code Web Design Seminar | BLACKGIFT" description="Learn to design, build, and launch real websites and apps using AI — no prior coding experience required." />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-white">
        {/* Modern Dot Pattern Background */}
        <div 
          className="absolute inset-0 z-0 opacity-60" 
          style={{ backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
        />
        <div 
          className="absolute inset-0 z-0 bg-white" 
          style={{ maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, black 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, black 100%)' }}
        />
        
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[100px] pointer-events-none opacity-60 translate-x-1/3 -translate-y-1/3 z-0" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] pointer-events-none opacity-60 -translate-x-1/3 translate-y-1/3 z-0" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-4 py-2 mb-8 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wide uppercase">Live Online Event</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-gray-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Vibe-Code<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Web Design Seminar
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed"
          >
            Learn to design, build, and launch real websites and apps using AI — no prior coding experience required.
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="flex gap-4 mb-12"
          >
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white shadow-xl shadow-purple-500/10 border border-purple-100 rounded-2xl p-4 w-20 md:w-24">
                <span className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{String(unit.value).padStart(2, '0')}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{unit.label}</span>
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12 text-gray-700 font-medium"
          >
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>August 15–20, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>6:00 PM – 8:00 PM (Daily)</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-5 py-3 border border-gray-200">
              <MonitorPlay className="w-5 h-5 text-purple-600" />
              <span>Fully Recorded</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <Link 
              to={ctaLink}
              className="group relative inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Register Now for $10</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-gray-500 font-medium">$10 flat fee • Full Access + Lifetime Recordings</p>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24 border-y border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What's Required?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Laptop className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Basic Equipment</h3>
              <p className="text-gray-600">A laptop or desktop computer and a stable internet connection.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Code2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Coding Experience</h3>
              <p className="text-gray-600">You don't need to know how to code. If you can type a prompt, you can build!</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <MonitorPlay className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Computer Knowledge</h3>
              <p className="text-gray-600">Basic computer literacy is an added advantage, but we'll guide you step-by-step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap */}
      <section className="py-32 relative bg-gradient-to-b from-white to-[#f0f5ff]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Curriculum Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">6 days. 12 hours. A complete zero-to-launch journey with AI.</p>
          </div>

          <div className="relative">
            {/* The snake path SVG */}
            <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 md:-ml-[1px] bg-gray-200">
              <motion.div 
                className="w-full bg-gradient-to-b from-purple-500 to-blue-500 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ height: '100%' }}
              />
            </div>

            <div className="space-y-12 md:space-y-0">
              {curriculum.map((item, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center md:justify-between md:min-h-[200px] ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Hexagon Icon */}
                  <div className="absolute left-0 md:left-1/2 -ml-0 md:-translate-x-1/2 z-20">
                    <HexagonIcon icon={item.icon} color={item.color} delay={idx * 0.15} />
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                    className={`w-full md:w-[45%] pl-28 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
                  >
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-purple-200 transition-colors">
                      <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: item.color }}>{item.day}</div>
                      <h3 className="text-2xl font-black mb-4 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why $10 & What's Included */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Why just $10?</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We believe AI-powered web design skills should be accessible to everyone. The $10 fee ensures commitment without breaking the bank. It covers the hosting of our live sessions and lifetime recording storage.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Can't make it live every day? No problem. The recordings mean you won't miss a single step, and you can build at your own pace.
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm">
            <h3 className="text-2xl font-bold mb-8 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What's Included</h3>
            <ul className="space-y-4">
              {[
                "6 live intensive sessions (12 hours total)",
                "Lifetime access to all session recordings",
                "Hands-on projects and assignments each day",
                "A real, live website built by the end of the week",
                "Curated lists of AI tools, templates, and resources",
                "Q&A opportunities with the instructor"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-gray-600 text-lg leading-relaxed border-t border-gray-100 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/40" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/40 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to build the future?</h2>
          <p className="text-xl text-white/70 mb-12 font-medium">
            The seminar begins August 15. Secure your spot today and start building with AI.
          </p>
          
          <Link 
            to={ctaLink}
            className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-12 py-5 rounded-full font-black text-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:-translate-y-1"
          >
            <span>Register Now ($10)</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
