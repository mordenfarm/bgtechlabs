import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Seo } from '../components/Seo';
import { ServicesShowcase } from '../components/ServicesShowcase';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Smartphone, Code, MonitorPlay, Film, PenTool, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalyticsLink } from '../components/AnalyticsButton';

// ── Slide definitions ──────────────────────────────────────────────────────
const slides = [
  {
    tag: 'Web Development',
    title: 'Stunning Websites That Convert',
    subtitle: 'We design and build fast, modern websites tailored to your brand — from landing pages to full e-commerce platforms.',
    cta: 'Get a Website',
    link: '/services/web-development',
    icon: (c: string) => <Code className="w-40 h-40" style={{ color: c }} strokeWidth={1} />,
    colors: ['#1a2a6c', '#2756b1', '#1565c0'],
    // content: slide-in from left / slide-out upward
    contentIn:  'wd-content-in',
    contentOut: 'wd-content-out',
    // icon: drop from above / fly right
    iconIn:  'wd-icon-in',
    iconOut: 'wd-icon-out',
  },
  {
    tag: 'Mobile Apps',
    title: 'Apps Your Users Will Love',
    subtitle: "iOS and Android apps built for performance and simplicity — putting your business in your customers' pocket.",
    cta: 'Build an App',
    link: '/services/mobile-development',
    icon: (c: string) => <Smartphone className="w-40 h-40" style={{ color: c }} strokeWidth={1} />,
    colors: ['#0d4f3c', '#1a7a5e', '#0e6655'],
    // content: zoom in / shrink out
    contentIn:  'ma-content-in',
    contentOut: 'ma-content-out',
    // icon: full spin in / spin out
    iconIn:  'ma-icon-in',
    iconOut: 'ma-icon-out',
  },
  {
    tag: 'Adverts',
    title: 'Ads That Stop the Scroll',
    subtitle: 'Eye-catching motion graphics and animated adverts designed to capture attention and drive results across every platform.',
    cta: 'Start a Campaign',
    link: '/services',
    icon: (c: string) => <MonitorPlay className="w-40 h-40" style={{ color: c }} strokeWidth={1} />,
    colors: ['#4a1060', '#7b2d8b', '#6a1a7a'],
    // content: 3D Y-flip in / flip out
    contentIn:  'mg-content-in',
    contentOut: 'mg-content-out',
    // icon: blur-scale in / blur-up out
    iconIn:  'mg-icon-in',
    iconOut: 'mg-icon-out',
  },
  {
    tag: 'Videography',
    title: 'Professional Video Production',
    subtitle: 'From brand films to product shoots — we capture compelling stories that connect your brand with your audience.',
    cta: 'Book a Shoot',
    link: '/services',
    icon: (c: string) => <Film className="w-40 h-40" style={{ color: c }} strokeWidth={1} />,
    colors: ['#7a2020', '#b03030', '#921e1e'],
    // content: bounce down from top / fall to bottom
    contentIn:  'vg-content-in',
    contentOut: 'vg-content-out',
    // icon: slide from right / slide back right
    iconIn:  'vg-icon-in',
    iconOut: 'vg-icon-out',
  },
  {
    tag: 'Branding',
    title: 'A Brand Identity That Stands Out',
    subtitle: 'Logos, color systems, and brand guidelines crafted to make your business instantly recognizable and unforgettable.',
    cta: 'Build My Brand',
    link: '/services',
    icon: (c: string) => <PenTool className="w-40 h-40" style={{ color: c }} strokeWidth={1} />,
    colors: ['#1a3a5c', '#c47a1a', '#a06010'],
    // content: glitch/skew in / skew out
    contentIn:  'br-content-in',
    contentOut: 'br-content-out',
    // icon: peel from corner / collapse
    iconIn:  'br-icon-in',
    iconOut: 'br-icon-out',
  },
];

// ── All keyframes injected once as a <style> tag ───────────────────────────
const KEYFRAMES = `
  /* Waves */
  @keyframes wave1 {
    0%,100% { d: path("M0,160 C200,100 400,220 600,160 C800,100 1000,180 1200,160 L1200,300 L0,300 Z"); }
    50%      { d: path("M0,180 C200,240 400,120 600,180 C800,240 1000,140 1200,180 L1200,300 L0,300 Z"); }
  }
  @keyframes wave2 {
    0%,100% { d: path("M0,200 C150,140 350,260 550,200 C750,140 950,220 1200,200 L1200,300 L0,300 Z"); }
    50%      { d: path("M0,220 C150,280 350,160 550,220 C750,280 950,180 1200,220 L1200,300 L0,300 Z"); }
  }
  @keyframes wave3 {
    0%,100% { d: path("M0,240 C250,180 450,300 700,240 C900,190 1050,260 1200,240 L1200,300 L0,300 Z"); }
    50%      { d: path("M0,255 C250,310 450,200 700,255 C900,310 1050,225 1200,255 L1200,300 L0,300 Z"); }
  }
  /* Orbs */
  @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.1)} 66%{transform:translate(-20px,15px) scale(.95)} }
  @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(1.05)} 66%{transform:translate(20px,-15px) scale(1.1)} }
  /* Shimmer */
  @keyframes shimmer { 0%{opacity:0;transform:translateX(-120%) skewX(-15deg)} 50%{opacity:1} 100%{opacity:0;transform:translateX(230%) skewX(-15deg)} }
  /* Float */
  @keyframes floatB { 0%,100%{transform:rotate(-6deg) translate(-10%,10%)} 50%{transform:rotate(-8deg) translate(-10%,2%)} }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* ── Slide 0 — Web Dev ── */
  @keyframes wd-content-in  { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:translateX(0)} }
  @keyframes wd-content-out { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-60px)} }
  @keyframes wd-icon-in     { from{opacity:0;transform:translateY(-90px)} to{opacity:1;transform:translateY(0)} }
  @keyframes wd-icon-out    { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(130px)} }

  /* ── Slide 1 — Mobile Apps ── */
  @keyframes ma-content-in  { from{opacity:0;transform:scale(.65)} to{opacity:1;transform:scale(1)} }
  @keyframes ma-content-out { from{opacity:1;transform:scale(1) translateX(0)} to{opacity:0;transform:scale(.55) translateX(50px)} }
  @keyframes ma-icon-in     { from{opacity:0;transform:rotate(-200deg) scale(.3)} to{opacity:1;transform:rotate(0deg) scale(1)} }
  @keyframes ma-icon-out    { from{opacity:1;transform:rotate(0deg) scale(1)} to{opacity:0;transform:rotate(200deg) scale(.3)} }

  /* ── Slide 2 — Adverts ── */
  @keyframes mg-content-in  { from{opacity:0;transform:perspective(700px) rotateY(-90deg)} to{opacity:1;transform:perspective(700px) rotateY(0deg)} }
  @keyframes mg-content-out { from{opacity:1;transform:perspective(700px) rotateY(0deg)} to{opacity:0;transform:perspective(700px) rotateY(90deg)} }
  @keyframes mg-icon-in     { from{opacity:0;filter:blur(14px);transform:scale(1.4)} to{opacity:1;filter:blur(0);transform:scale(1)} }
  @keyframes mg-icon-out    { from{opacity:1;filter:blur(0);transform:translateY(0)} to{opacity:0;filter:blur(10px);transform:translateY(-70px)} }

  /* ── Slide 3 — Videography ── */
  @keyframes vg-content-in  { from{opacity:0;transform:translateY(-80px)} to{opacity:1;transform:translateY(0)} }
  @keyframes vg-content-out { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(80px)} }
  @keyframes vg-icon-in     { from{opacity:0;transform:translateX(120px)} to{opacity:1;transform:translateX(0)} }
  @keyframes vg-icon-out    { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(120px)} }

  /* ── Slide 4 — Branding ── */
  @keyframes br-content-in  {
    0%  {opacity:0;transform:translateX(20px) skewX(-8deg)}
    45% {opacity:1;transform:translateX(-5px) skewX(3deg)}
    75% {transform:translateX(3px) skewX(-1deg)}
    100%{opacity:1;transform:translateX(0) skewX(0)}
  }
  @keyframes br-content-out {
    0%  {opacity:1;transform:translateX(0) skewX(0)}
    40% {opacity:.5;transform:translateX(-12px) skewX(5deg)}
    100%{opacity:0;transform:translateX(35px) skewX(-7deg)}
  }
  @keyframes br-icon-in  {
    0%  {opacity:0;transform:translate(50px,70px) scale(.4) rotate(25deg)}
    65% {transform:translate(-4px,-5px) scale(1.05) rotate(-2deg)}
    100%{opacity:1;transform:translate(0,0) scale(1) rotate(0deg)}
  }
`;

const AnimatedTimecode = () => {
  const [time, setTime] = useState(Date.now());
  
  useEffect(() => {
    const t = setInterval(() => setTime(Date.now()), 33);
    return () => clearInterval(t);
  }, []);
  
  const d = new Date(time);
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(Math.floor(d.getMilliseconds() / 1000 * 60)).padStart(2, '0');
  return <span className="font-bold tracking-wider">01:24:{s}:{ms}</span>;
}

const renderSlideAssets = (index: number) => {
  // Back card springs
  const backCardVariants = {
    hidden: { opacity: 0, x: 80, y: 50, rotate: -35, scale: 0.8 },
    visible: { 
      opacity: 0.8, 
      x: 0, 
      y: 0, 
      rotate: -12, 
      scale: 0.95,
      transition: { type: "spring", damping: 18, stiffness: 85, delay: 0.15 } 
    },
    exit: { opacity: 0, x: -80, y: -30, rotate: 5, scale: 0.8, transition: { duration: 0.3 } }
  };

  // Front card springs
  const frontCardVariants = {
    hidden: { opacity: 0, x: 120, y: 80, rotate: 15, scale: 0.85 },
    visible: { 
      opacity: 0.95, 
      x: 0, 
      y: 0, 
      rotate: 6, 
      scale: 1,
      transition: { type: "spring", damping: 15, stiffness: 95, delay: 0.25 } 
    },
    exit: { opacity: 0, x: -120, y: -40, rotate: -15, scale: 0.85, transition: { duration: 0.35 } }
  };

  switch (index) {
    case 0: // Web Dev
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none z-10">
          {/* Back Card: Wireframe/Grid */}
          <motion.div
            variants={backCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-6 overflow-hidden"
          >
            <div className="w-full h-32 border border-white/10 rounded-2xl mb-4 relative overflow-hidden flex" style={{ background: 'linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.02) 75%, transparent 75%, transparent)' }}>
            </div>
            <div className="w-3/4 h-2 bg-white/10 rounded-[4px] mb-3" />
            <div className="w-1/2 h-2 bg-white/10 rounded-[4px]" />
            <div className="w-full h-2 bg-white/5 rounded-[4px] mt-2 block" />
            <div className="w-5/6 h-2 bg-white/5 rounded-[4px] mt-2 block" />
          </motion.div>

          {/* Front Card: Code Snippet / Animated UI bars */}
          <motion.div
            variants={frontCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-5 overflow-hidden justify-between"
          >
            <div className="flex gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex flex-col gap-3 flex-1 overflow-hidden mt-2">
              <div className="w-full h-8 bg-white/10 rounded-lg animate-pulse" />
              <div className="w-5/6 h-4 bg-white/5 rounded-md" />
              <div className="flex gap-2">
                <div className="w-16 h-4 bg-emerald-500/20 rounded-md" />
                <div className="w-24 h-4 bg-blue-500/20 rounded-md" />
              </div>
              <div className="w-4/5 h-4 bg-white/5 rounded-md" />
              <div className="w-full h-4 bg-white/5 rounded-md" />
              <div className="w-2/3 h-4 bg-white/5 rounded-md" />
              <div className="mt-auto h-24 bg-white/5 rounded-xl flex items-end p-2 gap-1.5 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 bg-white/20 rounded-t-sm" 
                    animate={{ height: ["30%", "80%", "40%", "100%", "50%"] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.2, yoyo: true }}
                    style={{ minHeight: '10%' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      );

    case 1: // Mobile App
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none z-10">
          {/* Back Card: App wireframe components */}
          <motion.div
            variants={backCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-4 overflow-hidden items-center"
          >
            <div className="flex w-full justify-between mb-8 opacity-40">
              <div className="w-6 h-6 rounded-full bg-white/20" />
              <div className="w-16 h-4 bg-white/20 rounded-md mt-1" />
            </div>
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-white/15 animate-[spin_10s_linear_infinite]" />
          </motion.div>

          {/* Front Card: Mobile app UI representation with animated bars */}
          <motion.div
            variants={frontCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[38px] shadow-2xl h-76 w-52 sm:h-[400px] sm:w-[260px] lg:h-[480px] lg:w-[290px] flex flex-col p-5 overflow-hidden"
          >
            <div className="w-16 h-1.5 bg-white/20 mx-auto rounded-full mb-6" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500/80 to-orange-400/80 p-0.5">
                <div className="w-full h-full bg-black/20 rounded-[10px] backdrop-blur-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="w-20 h-3 bg-white/40 rounded-sm" />
                <div className="w-12 h-2 bg-white/20 rounded-sm" />
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full h-[60px] bg-white/5 rounded-xl border border-white/10 p-3 flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-center w-full">
                      <div className="w-8 h-8 rounded-lg bg-white/10" />
                      <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden relative">
                         <motion.div 
                           className="absolute top-0 left-0 bottom-0 bg-white/60 rounded-full"
                           animate={{ width: ["20%", "90%", "40%"] }}
                           transition={{ repeat: Infinity, duration: 4 + i, ease: "linear" }}
                         />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto flex justify-between px-2 pt-4 border-t border-white/10">
              <div className="w-6 h-6 rounded-md bg-white/30" />
              <div className="w-6 h-6 rounded-md bg-white/10" />
              <div className="w-6 h-6 rounded-md bg-white/10" />
              <div className="w-6 h-6 rounded-md bg-white/10" />
            </div>
          </motion.div>
        </div>
      );

    case 2: // Adverts
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
          {/* Back Card: Curve/Frequency grids */}
          <motion.div
            variants={backCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-4 sm:p-6 overflow-hidden justify-center"
          >
            <svg viewBox="0 0 100 40" className="w-full h-24 text-white/10 mb-4">
              <path d="M 0,20 Q 25,5 50,20 T 100,20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3" />
              <path d="M 0,20 Q 25,35 50,20 T 100,20" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="text-[9px] text-center font-mono text-white/35">TIMELINE SPECS: 60 FPS</span>
          </motion.div>

          {/* Front Card: Media play controller */}
          <motion.div
            variants={frontCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-5 overflow-hidden justify-between"
          >
            <div className="w-full h-full relative flex flex-col justify-between z-10">
              <div className="h-32 sm:h-44 bg-black/15 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 shadow-lg text-white">
                  <MonitorPlay className="w-6 h-6 ml-1" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[68%] h-full bg-white rounded-full relative" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between text-[8px] font-mono text-white/40">
                  <span>00:00:00</span>
                  <span>00:04:12</span>
                </div>
                <div className="flex gap-1 h-3 items-end">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-white/20 rounded-t-sm" 
                      style={{ height: `${(i % 3 === 0 ? 100 : i % 2 === 0 ? 60 : 35)}%` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      );

    case 3: // Videography
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
          {/* Back Card: Camera viewport aspect guidelines */}
          <motion.div
            variants={backCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-4 overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-8 bg-black/15 flex items-center justify-between px-4 text-[9px] font-mono text-white/30 border-b border-white/5">
              <span>9:16 SAFEZONE</span>
              <span>2.35:1 CINEMA</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-16 h-16 border border-dashed border-white/15 rounded-full" />
            </div>
          </motion.div>

          {/* Front Card: Cinema Viewfinder overlay */}
          <motion.div
            variants={frontCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-4 overflow-hidden justify-between animate-none"
          >
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/40" />

            <div className="flex items-center justify-between w-full z-10 px-2 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-mono text-white tracking-widest font-bold">REC</span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white font-bold">4K 60FPS</span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-4 h-px bg-white" />
              <div className="h-4 w-px bg-white mx-[-2px]" />
            </div>

            <div className="w-full z-10 px-2 pb-2 mt-auto">
              <div className="flex justify-between items-end text-[10px] font-mono text-white/80">
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/40">TIMECODE</span>
                  <AnimatedTimecode />
                </div>
                <div className="flex gap-0.5 items-end h-6 bg-black/10 px-1.5 py-1 rounded">
                  <motion.div className="w-[3px] bg-emerald-500 rounded-sm" animate={{ height: ["30%", "70%", "40%", "90%", "30%"] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ minHeight: "20%" }} />
                  <motion.div className="w-[3px] bg-emerald-500 rounded-sm" animate={{ height: ["70%", "30%", "80%", "40%", "70%"] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ minHeight: "20%" }} />
                  <motion.div className="w-[3px] bg-emerald-500 rounded-sm" animate={{ height: ["90%", "40%", "100%", "60%", "90%"] }} transition={{ repeat: Infinity, duration: 1.1 }} style={{ minHeight: "20%" }} />
                  <motion.div className="w-[3px] bg-emerald-500 rounded-sm" animate={{ height: ["50%", "100%", "40%", "80%", "50%"] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ minHeight: "20%" }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      );

    case 4: // Branding
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
          {/* Back Card: Graphic design grid sheet */}
          <motion.div
            variants={backCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px] opacity-75" />
            <div className="flex-1 flex items-center justify-center">
              <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-white/10 transform rotate-45" />
              </div>
            </div>
            <span className="text-[8px] font-mono text-center text-white/30 z-10 uppercase tracking-[0.2em] mb-2">Technical Alignment Matrix</span>
          </motion.div>

          {/* Front Card: Graphic design letter template layout */}
          <motion.div
            variants={frontCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl h-72 w-56 sm:h-96 sm:w-72 lg:h-[420px] lg:w-[316px] flex flex-col p-6 items-center justify-center overflow-hidden animate-none"
          >
            <div className="absolute inset-4 border border-dashed border-white/10 pointer-events-none" />
            
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              <span className="text-[8px] font-mono text-white/40 tracking-[0.3em]">GLYPH RATIO</span>
            </div>

            <div className="relative flex flex-col items-center">
              <span className="text-8xl sm:text-9xl font-serif font-black text-white/95 leading-none drop-shadow-2xl">B</span>
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-emerald-400 border border-white rounded-full shadow" />
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-emerald-400 border border-white rounded-full shadow" />
            </div>

            <div className="absolute bottom-4 flex justify-between w-full px-6 text-[8px] font-mono text-white/50">
              <span>R: 1.618 (GOLDEN)</span>
              <span>ANGLE: 0.00&deg;</span>
            </div>
          </motion.div>
        </div>
      );

    default:
      return null;
  }
};

export function Home() {
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const navigate = useCallback((to: number) => {
    setCurrent(to);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      setCurrent((current + 1) % slides.length);
    } else if (distance < -50) {
      setCurrent((current - 1 + slides.length) % slides.length);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // auto-advance
  useEffect(() => {
    const t = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];
  const [c1, c2, c3] = slide.colors;

  return (
    <div className="w-full bg-[#fcfcfc] overflow-x-hidden min-h-screen">
      <style>{KEYFRAMES}</style>
      <Seo
        title="Digital Tech & Branding Agency"
        description="Blackgift Tech is a premier digital agency specializing in website development, mobile apps, motion graphics, videography, and innovative branding solutions."
        keywords="digital agency, tech company, branding agency, website development, mobile app development, motion graphics, videography services, Blackgift Tech"
        canonical="/"
      />
      <h1 className="sr-only">Blackgift Tech Labs - Digital Tech & Branding Agency</h1>

      {/* ── Advanced Full-Viewport Slider Hero ── */}
      <section className="relative w-full h-[calc(100svh-164px)] md:h-[calc(100svh-168px)] lg:h-[calc(100svh-192px)]">
        <img
          src="/robotics-lab.png"
          alt="Modern Robotics and Learning Lab"
          className="w-full h-full object-cover object-[54%_100%] block"
        />
        <h2 className="absolute top-6 md:top-10 lg:top-14 inset-x-0 px-4 text-center font-hero text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl tracking-widest text-white leading-tight uppercase">
          <span className="block md:inline">Software</span>
          <span className="hidden md:inline"> · </span>
          <span className="block md:inline">Robotics</span>
          <span className="hidden md:inline"> · </span>
          <span className="block md:inline">Media</span>
        </h2>
      </section>


      {/* ── Latest Releases Section ── */}
      <section className="w-full relative pt-0 pb-8 overflow-hidden flex flex-col items-center bg-white">
        {/* White strip rail of product logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-white px-4 sm:px-6 py-4 relative z-10"
        >
          <h2 className="text-xl md:text-2xl font-extrabold text-[#1a1528] mb-4 text-center tracking-tight">WE CREATED</h2>
          <div className="overflow-hidden">
            <div className="flex w-max animate-logo-rail">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {[
                    { src: '/logos/rail/examsidemann.png', width: 305, alt: 'ExamSidemann — the handheld teacher', name: 'Examsidemann' },
                    { src: '/logos/rail/saviour.png', width: 79, alt: 'Saviour Logo', name: 'Saviour' },
                    { src: '/logos/rail/e-razor.png', width: 121, alt: 'E-Razor Logo', name: 'E-Razor' },
                    { src: '/logos/rail/code-droid.png', width: 65, alt: 'Code Droid Logo', name: 'Code Droid' },
                    { src: '/logos/rail/defined-domains.png', width: 64, alt: 'Defined Domains Inclusive School Logo', name: 'Defined Domains' },
                    { src: '/logos/rail/coha.png', width: 70, alt: 'Circle of Hope Academy Logo', name: 'COHA' },
                    { src: '/logos/rail/vocal-sign.png', width: 68, alt: 'Vocal Sign red hands logo', name: 'Vocal Sign' },
                    { src: '/logos/rail/knockout.png', width: 132, alt: 'Knockout Logo', name: 'Knockout Invoicing App' },
                    { src: '/logos/rail/matina.png', width: 90, alt: 'Matina Logo', name: 'Matina Invoicing App' },
                    { src: '/logos/rail/siesta.png', width: 65, alt: 'Siesta Logo', name: 'Siesta' },
                    { src: '/logos/rail/service-loop.png', width: 65, alt: 'Service Loop Logo', name: 'Service Loop' },
                    { src: '/logos/rail/maguna.png', width: 65, alt: 'maguna Logo', name: 'maguna' },
                    { src: '/logos/rail/ritz.png', width: 65, alt: 'Ritz temporary web file sharing app logo', name: 'Ritz' },
                    { src: '/logos/rail/lado.png', width: 65, alt: 'Lado learn coding app logo', name: 'Lado' },
                    { src: '/logos/rail/robo-spark.png', width: 65, alt: 'Robo-Spark robotics guided learning app logo', name: 'Robo-Spark' },
                    { src: '/logos/rail/vmax.png', width: 65, alt: 'VMax autonomous personal AI agent logo', name: 'VMax' },
                  ].map((logo) => (
                    <div key={logo.name} className="flex shrink-0 flex-col items-center min-w-44 px-6">
                      <img src={logo.src} alt={logo.alt} width={Math.round(logo.width * 0.75)} height={48} style={{ width: Math.round(logo.width * 0.75), height: 48 }} className="block shrink-0 object-contain" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <ServicesShowcase />

      {/* Saviour Offline AI */}
      <section aria-labelledby="offline-ai-heading" className="relative w-full overflow-hidden border-b border-gray-200 bg-white text-[#1a1528]">
        <div className="mx-auto grid max-w-[1500px] items-center gap-12 px-6 py-16 sm:px-12 lg:grid-cols-[0.85fr_1.3fr] lg:gap-14 lg:px-16 lg:py-24">
          <div className="text-center lg:text-left">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-purple-700">Saviour Offline AI</p>
            <h2 id="offline-ai-heading" className="text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl xl:text-[58px]">
              YOUR AI.<br />ON YOUR DEVICE.<br /><span className="font-medium text-[#FF174D]">EVEN OFFLINE.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-gray-600 lg:mx-0">
              Ask questions, draft ideas, and get help without an internet connection. Saviour runs AI locally on your device after setup.
            </p>
            <div className="mt-7 space-y-5 text-left">
              <div className="border-l-2 border-purple-600 pl-4">
                <h3 className="font-bold">On your phone</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">Chat with Saviour directly on a compatible phone. The AI runs on the phone itself, so local chats work without Wi-Fi or mobile data.</p>
              </div>
              <div className="border-l-2 border-[#FF174D] pl-4">
                <h3 className="font-bold">From your USB drive</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">Carry the AI app and model on a flash drive. Plug it into a compatible computer to run your offline assistant. The USB stores the kit; the computer runs the AI.</p>
              </div>
            </div>
            <AnalyticsLink href="https://sidemann-app-store.vercel.app/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center gap-4 bg-black px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-purple-800" buttonName="Saviour_AI_Read_More">
              Explore Saviour AI <ArrowRight className="h-4 w-4" />
            </AnalyticsLink>
          </div>
          <div className="relative grid grid-cols-[0.85fr_1.15fr] items-center gap-3 sm:gap-6">
            <div aria-hidden="true" className="pointer-events-none absolute inset-[10%] rounded-full bg-purple-100/70 blur-3xl" />
            <figure className="relative min-w-0 self-start">
              <img src="/saviour/phone-chat.png" alt="Saviour AI chat interface on a phone, showing an offline indicator and a daily planning conversation" className="h-[290px] w-full object-contain sm:h-[430px] lg:h-[460px]" loading="lazy" />
              <figcaption className="mt-4 text-center text-sm font-semibold text-[#1a1528]">AI on your phone<span className="mt-1 block text-xs font-normal text-gray-500">Chat locally. No connection needed.</span></figcaption>
            </figure>
            <figure className="relative min-w-0 self-end">
              <img src="/saviour/usb-kit.png" alt="Black and red Saviour USB flash drive beside a laptop running the offline AI chat interface" className="h-[250px] w-full object-contain sm:h-[350px] lg:h-[380px]" loading="lazy" />
              <figcaption className="mt-4 text-center text-sm font-semibold text-[#1a1528]">AI you can carry<span className="mt-1 block text-xs font-normal text-gray-500">Your USB kit. Your computer.</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Let's Talk Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full relative bg-[#06243d] overflow-hidden flex items-center min-h-[300px]"
      >
        {/* Wavy Background Pattern */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 1.2 },
            visible: { opacity: 0.3, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
          }}
          className="absolute top-1/2 left-1/2 md:left-auto md:right-0 w-[200vw] md:w-[120%] h-[250%] -translate-y-1/2 -translate-x-1/2 md:translate-x-[10%] pointer-events-none z-0 flex items-center justify-center overflow-visible mix-blend-overlay will-change-transform"
        >
          <svg className="w-full h-full transform origin-center rotate-[15deg] md:rotate-[20deg]" viewBox="0 0 1000 800" fill="none" stroke="white" strokeWidth="1" preserveAspectRatio="none">
            {Array.from({ length: 70 }).map((_, i) => {
              const y = i * 14 - 100;
              const waveY1 = Math.sin(i * 0.1) * 90;
              const waveY2 = Math.cos(i * 0.15) * 70;
              const waveY3 = Math.sin(i * 0.12) * 110;
              const wavexOffset = Math.sin(i * 0.08) * 60;

              return (
                <path 
                  key={i} 
                  d={`
                    M -200,${y + waveY1} 
                    C ${150 + wavexOffset},${y - 150 + waveY2} 
                      ${450 - wavexOffset},${y + 200 + waveY3} 
                      ${700 + wavexOffset},${y + waveY1} 
                    S ${950 - wavexOffset},${y + 150 - waveY2} 
                      1300,${y + waveY3}
                  `} 
                />
              );
            })}
          </svg>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20">
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.5, rotate: -30, x: -80, filter: 'blur(10px)' },
              visible: { opacity: 1, scale: 1, rotate: 0, x: 0, filter: 'blur(0px)', transition: { type: "spring", bounce: 0.5, duration: 1.2 } }
            }}
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-[280px] md:h-[280px] rounded-full overflow-hidden shadow-2xl shrink-0 border border-white/5 relative bg-white/5 will-change-transform"
          >
            <img 
              src="/womman-doing-business.png" 
              alt="Consultant" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 50, filter: 'blur(8px)', rotateX: 45 },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0, transition: { delay: 0.2, type: "spring", bounce: 0.4, duration: 1 } }
              }}
              style={{ transformPerspective: 1000 }}
              className="text-3xl sm:text-4xl md:text-[44px] font-bold text-white mb-6 md:mb-8 tracking-wide !leading-tight font-hero uppercase will-change-transform"
            >
              Let's talk about your project
            </motion.h2>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.4, type: "spring", bounce: 0.6, duration: 0.8 } }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-[#e4002b] hover:bg-[#c20024] cursor-pointer transition-colors text-white font-bold text-sm sm:text-[15px] tracking-[0.06em] px-8 py-3.5 sm:px-10 sm:py-4 rounded shadow-lg flex items-center justify-center uppercase"
              >
                Schedule a Call
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function CategoryCard({ title, icon, className, href = "#" }: { title: string; icon: React.ReactNode; className?: string; href?: string }) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={cardRef} 
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 80, rotateY: 30, rotateX: 30, filter: 'blur(10px)' },
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotateY: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          transition: { type: "spring", bounce: 0.45, duration: 1.2 } 
        }
      }}
      whileHover={{ y: -8, scale: 1.05, filter: 'brightness(1.05)' }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`flex flex-col items-center group will-change-transform ${className || ''}`}
    >
      <Link to={href} className="flex flex-col items-center group w-full h-full">
        <div className={`w-20 h-20 sm:w-32 sm:h-32 mb-3 sm:mb-4 relative flex items-center justify-center transform sm:group-hover:-translate-y-2 transition-transform duration-300 ${isActive ? 'max-sm:-translate-y-2' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-50 rounded-full shadow-inner" />
          <div className={`absolute -bottom-1 sm:-bottom-2 h-3 sm:h-4 bg-black/10 blur-md rounded-full sm:group-hover:w-16 transition-all duration-300 w-16 sm:w-20 ${isActive ? 'max-sm:!w-12' : ''}`} />
          <div className={`relative z-10 w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-50 flex items-center justify-center transform sm:group-hover:rotate-0 transition-transform duration-300 rotate-12 ${isActive ? 'max-sm:!rotate-0' : ''}`}>
            <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-xl sm:rounded-2xl" />
            <div className="relative z-10">{icon}</div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 bg-gray-200 rounded-full -z-10 blur-lg opacity-60" />
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 text-center text-[10px] sm:text-xs md:text-sm whitespace-nowrap leading-tight px-1 uppercase mt-3 drop-shadow-sm font-sans tracking-wide">{title}</h3>
      </Link>
    </motion.div>
  );
}
