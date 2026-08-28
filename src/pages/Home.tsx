import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Seo } from '../components/Seo';
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

const services = [
  {
    title: "Mobile Apps Development",
    tags: ['Enterprise & B2E', 'Logistics & Delivery', 'Digital Banking & Wallets', 'E-Commerce & Retail'],
    description: "We helped with developing comprehensive support solutions for internal processes and collaborative tools.",
    buttonText: "Do a 1-2 Testing",
    flexDirection: "lg:flex-row",
    bgClass: "bg-[#fcf2ae]",
    textPaddingX: "lg:pr-10",
    lgPaddingX: "lg:pl-16 xl:pl-20",
    visualContent: () => (
      <div className="w-[200px] h-[200px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden flex items-center justify-center relative bg-gray-50 border-[4px] border-white/20 shadow-sm">
        <video
          src="/phone.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(1.05) contrast(1.05)" }}
        />
      </div>
    )
  },
  {
    title: "Custom Enterprise Systems",
    tags: ['School Management Systems', 'School Portals', 'Healthcare Systems', 'Custom Business Software'],
    description: "We architect scalable enterprise software solutions to streamline operations, enhance security, and drive digital transformation.",
    buttonText: "Do a 1-2 Testing",
    flexDirection: "lg:flex-row-reverse",
    bgClass: "bg-[#e0f2fe]",
    textPaddingX: "lg:pl-10",
    lgPaddingX: "lg:pr-16 xl:pr-20",
    visualContent: () => (
       <div className="w-[200px] h-[200px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden flex items-center justify-center relative bg-black/5 border-[4px] border-white/40 shadow-sm">
         <video
           src="/laptop.mp4"
           autoPlay
           loop
           muted
           playsInline
           className="absolute inset-0 w-full h-full object-cover"
         />
       </div>
    )
  },
  {
    title: "Electronic Security Systems",
    tags: ['Access Control Systems', 'CCTV Systems (View Anywhere)', 'Telematics Systems'],
    description: "Protect your business assets with advanced security solutions. Monitor state-of-the-art camera feeds straight from your phone, manage who enters your facilities, and reliably track vehicle fleets.",
    buttonText: "View Our Previous Work",
    flexDirection: "lg:flex-row",
    bgClass: "bg-[#ecfdf5]",
    textPaddingX: "lg:pr-10",
    lgPaddingX: "lg:pl-16 xl:pl-20",
    visualContent: () => (
       <div className="relative w-[200px] h-[200px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px]">
         <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative bg-white border-[4px] border-white/40 shadow-sm">
           <img
             src="/facescan.gif"
             alt="Face Scan Security"
             className="absolute inset-0 w-full h-full object-cover"
             style={{ objectPosition: "center" }}
           />
         </div>

         {/* Floating CCTV GIF */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.7 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3, duration: 0.6, type: "spring", bounce: 0.4 }}
           className="absolute -bottom-2 -right-4 sm:bottom-4 sm:-right-4 lg:bottom-10 lg:-right-8 w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] xl:w-[180px] xl:h-[180px] rounded-full overflow-hidden border-[3px] sm:border-[4px] border-white shadow-2xl z-10 bg-white"
         >
           <img src="/cctv.gif" alt="CCTV Feed" className="w-full h-full object-cover" />
         </motion.div>

         {/* Floating Fingerprint GIF */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.7 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.4 }}
           className="absolute -top-2 -left-4 sm:top-4 sm:-left-4 lg:top-10 lg:-left-8 w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[140px] xl:h-[140px] rounded-full overflow-hidden border-[3px] sm:border-[4px] border-gray-900 shadow-[0_0_25px_rgba(59,130,246,0.8)] z-10 bg-black items-center justify-center flex"
         >
           <img src="/fingerprint.gif" alt="Fingerprint Scan" className="w-[80%] h-[80%] object-contain" />
         </motion.div>
       </div>
    )
  },
  {
    title: "AI Autonomous Agents",
    tags: ['Smart Automation', 'Virtual Employees', 'Self-Governing AI'],
    description: "Smart AI programs that understand complex tasks, think for themselves, and take action without needing a human to guide every step.",
    buttonText: "Book a Demo",
    flexDirection: "lg:flex-row-reverse",
    bgClass: "bg-[#f3e8ff]",
    textPaddingX: "lg:pl-10",
    lgPaddingX: "lg:pr-16 xl:pr-20",
    visualContent: () => (
      <div className="w-[200px] h-[200px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden flex items-center justify-center relative bg-white border-[4px] border-white/40 shadow-sm">
        <img
          src="/aivideo.gif"
          alt="AI Agent Interface"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>
    )
  }
];

export function Home() {
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Services Slider State
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [serviceDirection, setServiceDirection] = useState(1);

  const nextService = () => {
    setServiceDirection(1);
    setActiveServiceIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setServiceDirection(-1);
    setActiveServiceIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setServiceDirection(1);
      setActiveServiceIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      <section 
        className="relative w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] overflow-hidden flex items-center justify-between text-white touch-pan-y shadow-inner bg-black will-change-transform"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Darkened Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity will-change-transform"
          >
            <source src="/Fox_howling_at_full_moon.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Layered Cross-fading Backdrop Gradients */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0 z-0 mix-blend-overlay will-change-transform"
            style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)` }}
          />
        </AnimatePresence>

        {/* Ambient Decorative Orbs */}
        <div style={{ animation: 'orb1 12s ease-in-out infinite', background: `radial-gradient(circle, ${c2}cc, transparent 70%)` }}
             className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] rounded-full opacity-20 pointer-events-none z-0" />
        <div style={{ animation: 'orb2 15s ease-in-out infinite', background: `radial-gradient(circle, ${c3}cc, transparent 70%)` }}
             className="absolute bottom-[-5%] right-[10%] w-[40vw] h-[40vw] rounded-full opacity-25 pointer-events-none z-0" />

        {/* Wavy lines decoration */}
        <svg className="absolute bottom-0 left-0 w-full pointer-events-none z-0 opacity-40" viewBox="0 0 1200 300" preserveAspectRatio="none" style={{ height: '40%' }}>
          <path style={{ animation: 'wave1 6s ease-in-out infinite' }} fill="rgba(255,255,255,0.04)"
                d="M0,160 C200,100 400,220 600,160 C800,100 1000,180 1200,160 L1200,300 L0,300 Z" />
          <path style={{ animation: 'wave2 8s ease-in-out infinite' }} fill="rgba(255,255,255,0.06)"
                d="M0,200 C150,140 350,260 550,200 C750,140 950,220 1200,200 L1200,300 L0,300 Z" />
          <path style={{ animation: 'wave3 10s ease-in-out infinite' }} fill="rgba(255,255,255,0.09)"
                d="M0,240 C250,180 450,300 700,240 C900,190 1050,260 1200,240 L1200,300 L0,300 Z" />
        </svg>

        {/* Shimmer layout */}
        <div style={{ animation: 'shimmer 4s ease-in-out infinite', animationDelay: '1s' }}
             className="absolute top-0 left-0 w-1/3 h-full bg-white/5 pointer-events-none z-0" />

        {/* Edge Arrow Buttons (Glassmorphic) */}
        <button 
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className="hidden sm:flex absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-16 sm:h-16 items-center justify-center bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md rounded-full border border-white/20 transition-all z-20 text-white cursor-pointer group shadow-xl"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button 
          onClick={() => setCurrent((current + 1) % slides.length)}
          className="hidden sm:flex absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-16 sm:h-16 items-center justify-center bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md rounded-full border border-white/20 transition-all z-20 text-white cursor-pointer group shadow-xl"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Dynamic Inner Grid */}
        <div className="relative w-full h-full max-w-[1440px] mx-auto px-6 sm:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 sm:gap-12 z-10 pt-16 lg:pt-0 pb-16 lg:pb-0">
          
          {/* Staggered Text Slide Content */}
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left text-white max-w-2xl lg:max-w-2xl select-none z-10 pr-0 lg:pr-8 mt-10 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.05,
                    }
                  },
                  exit: {
                    opacity: 0,
                    x: 50,
                    transition: {
                      duration: 0.25
                    }
                  }
                }}
                className="flex flex-col items-center sm:items-start w-full"
              >
                {/* Badge Tag */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                  }}
                  className="inline-block text-xs sm:text-sm lg:text-xs font-bold uppercase tracking-[0.25em] bg-white/15 border border-white/25 backdrop-blur-sm px-5 py-2 sm:px-4 sm:py-1.5 rounded-full mb-6 sm:mb-8 lg:mb-6"
                >
                  {slide.tag}
                </motion.span>

                {/* Main Dynamic Big Title */}
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 85, damping: 14 } }
                  }}
                  className="text-4xl min-[380px]:text-5xl sm:text-6xl lg:text-[56px] xl:text-[68px] leading-[1.15] sm:leading-[1.1] lg:leading-[1.1] font-hero uppercase tracking-tight mb-6 sm:mb-8 lg:mb-6"
                >
                  {slide.title}
                </motion.h2>

                {/* Subtitle description */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  className="text-base sm:text-xl lg:text-lg leading-relaxed text-white/80 max-w-md sm:max-w-2xl lg:max-w-xl mb-8 sm:mb-12 lg:mb-10"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Call To Action Button */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120 } }
                  }}
                >
                  <Link to={slide.link} className="inline-block text-[13px] sm:text-[15px] lg:text-sm relative overflow-hidden bg-white text-gray-950 font-extrabold px-8 py-4 sm:px-10 sm:py-5 lg:px-8 lg:py-4.5 rounded-full hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl group cursor-pointer tracking-wider">
                    <span className="relative z-10">{slide.cta}</span>
                    <span className="absolute inset-0 bg-white/40 -translate-x-full group-hover:translate-x-full transition-transform duration-600 skew-x-[-15deg]" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Staggered Glassmorphic Illustration */}
          <div className="hidden lg:flex flex-1 relative w-full h-[320px] sm:h-[400px] lg:h-[460px] items-center justify-center max-w-md lg:max-w-lg z-10">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div 
                key={current} 
                className="absolute inset-0 flex items-center justify-center"
              >
                {renderSlideAssets(current)}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Indicators Panel of dots */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`} 
            />
          ))}
        </div>
      </section>


      {/* ── Latest Releases Section ── */}
      <section className="w-full relative py-24 overflow-hidden flex flex-col items-center" style={{
        backgroundColor: '#12122b',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0, 16px 16px'
      }}>
        {/* Subtle top/bottom gradients to blend with adjacent sections if needed */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12122b] via-transparent to-[#12122b] opacity-50 pointer-events-none" />
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-16 relative z-10 tracking-tight"
        >
          Our Latest Releases
        </motion.h2>
        
        <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          
          {/* Card 1: Examsidemann */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-3 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center mb-5 overflow-hidden relative shadow-inner">
              <img src="https://i.ibb.co/6RdXZMmW/es-logo.png" alt="ExamSidemann Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-[#1a1528] font-bold text-[17px] text-center pb-2">Examsidemann</h3>
          </motion.div>

          {/* Card 2: Saviour */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-3 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center mb-5 overflow-hidden relative shadow-inner">
              <img src="/saviourai.png" alt="Saviour Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 rounded-2xl shadow-sm" />
            </div>
            <h3 className="text-[#1a1528] font-bold text-[17px] text-center pb-2">Saviour</h3>
          </motion.div>

          {/* Card 3: E-Razor */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-3 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center mb-5 overflow-hidden relative shadow-inner">
              <img src="/e-razor.png" alt="E-Razor Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 rounded-xl" />
            </div>
            <h3 className="text-[#1a1528] font-bold text-[17px] text-center pb-2">E-Razor</h3>
          </motion.div>

          {/* Card 4: Code Droid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-3 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center mb-5 overflow-hidden relative shadow-inner">
              <img src="/code-droid.png" alt="Code Droid Logo" className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 rounded-xl shadow-sm" />
            </div>
            <h3 className="text-[#1a1528] font-bold text-[17px] text-center pb-2">Code Droid</h3>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 relative z-10"
        >
          <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-[#F99B28] hover:bg-[#E08A20] text-gray-900 font-bold text-[15px] px-8 py-4 rounded-full transition-all shadow-xl hover:-translate-y-1">
            View all products <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* ── Standard Page Content Grid ── */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center">

        {/* Popular Products & Services */}
        <section className="w-full max-w-[1200px] mb-20 px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="flex flex-col items-center justify-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center w-full overflow-hidden">
              <motion.div 
                variants={{ hidden: { x: "-100%" }, visible: { x: 0, transition: { duration: 0.8, ease: "circOut" } } }}
                className="h-px bg-gray-300 flex-grow max-w-[40px] sm:max-w-[200px]" 
              />
              <motion.h2 
                variants={{ 
                  hidden: { y: 80, opacity: 0, rotateX: 60 }, 
                  visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring", bounce: 0.4, duration: 1.2 } } 
                }}
                className="text-lg sm:text-3xl font-bold text-center text-gray-900 px-3 sm:px-6 tracking-tight whitespace-nowrap"
                style={{ transformPerspective: 1000 }}
              >
                Services We Provide
              </motion.h2>
              <motion.div 
                variants={{ hidden: { x: "100%" }, visible: { x: 0, transition: { duration: 0.8, ease: "circOut" } } }}
                className="h-px bg-gray-300 flex-grow max-w-[40px] sm:max-w-[200px]" 
              />
            </div>
            <motion.p 
              variants={{ hidden: { y: 20, opacity: 0, filter: 'blur(5px)' }, visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: "easeOut" } } }}
              className="text-gray-500 text-center text-[11px] sm:text-base max-w-2xl mt-3 sm:mt-5 px-4 leading-relaxed will-change-transform"
            >
              We leverage cutting-edge technology and creative expertise to deliver scalable, high-performance solutions tailored to your unique business goals.
            </motion.p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-2 md:gap-x-4 lg:gap-x-8 pb-4 md:pb-0 px-2 md:px-0 max-w-5xl mx-auto"
            style={{ perspective: '1200px' }}
          >
            <CategoryCard className="w-full" title="Web Dev"         href="/services/web-development" icon={<Code        className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />} />
            <CategoryCard className="w-full" title="Mobile Apps"     href="/services/mobile-development" icon={<Smartphone  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />} />
            <CategoryCard className="w-full" title="Adverts"         href="/services" icon={<MonitorPlay className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />} />
            <CategoryCard className="w-full" title="Videography"     href="/services" icon={<Film        className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />} />
            <CategoryCard className="w-full" title="Branding"        href="/services" icon={<PenTool     className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />} />
            <CategoryCard className="w-full" title="AI Solutions"    href="/services/ai-development" icon={<BrainCircuit className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" />} />
          </motion.div>
        </section>

      </div>

      {/* Services Slider Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-32">
        <div className="relative w-full h-[650px] sm:h-[680px] lg:h-[640px] flex justify-center items-center perspective-1000">
           <AnimatePresence initial={false} custom={serviceDirection}>
             <motion.div
               key={activeServiceIndex}
               custom={serviceDirection}
               variants={{
                 enter: (direction: number) => ({
                   x: direction > 0 ? 1000 : -1000,
                   opacity: 0,
                   scale: 0.8,
                   rotateY: direction > 0 ? 45 : -45,
                   filter: "blur(5px)",
                 }),
                 center: {
                   zIndex: 1,
                   x: 0,
                   opacity: 1,
                   scale: 1,
                   rotateY: 0,
                   filter: "blur(0px)",
                 },
                 exit: (direction: number) => ({
                   zIndex: 0,
                   x: direction < 0 ? 1000 : -1000,
                   opacity: 0,
                   scale: 0.8,
                   rotateY: direction < 0 ? 45 : -45,
                   filter: "blur(5px)",
                 })
               }}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{
                 x: { type: "spring", stiffness: 300, damping: 30 },
                 opacity: { duration: 0.4 },
                 rotateY: { type: "spring", stiffness: 300, damping: 30 },
                 scale: { duration: 0.4 },
                 filter: { duration: 0.4 }
               }}
               className={`absolute w-full rounded-[32px] overflow-hidden flex flex-col ${services[activeServiceIndex].flexDirection} items-center pt-8 lg:pt-0 ${services[activeServiceIndex].lgPaddingX} pb-0 shadow-sm ${services[activeServiceIndex].bgClass} h-full border border-gray-100`}
             >
               {/* Text Side */}
               <div className={`flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left px-5 sm:px-12 lg:px-0 py-5 lg:py-20 ${services[activeServiceIndex].textPaddingX} shrink-0`}>
                 <div className="flex items-center gap-3 mb-4 sm:mb-8 text-center justify-center lg:text-left lg:justify-start">
                   <h2 className="text-[22px] sm:text-3xl lg:text-[32px] font-extrabold text-gray-900 tracking-tight font-hero uppercase leading-tight text-center lg:text-left">
                     {services[activeServiceIndex].title}
                   </h2>
                 </div>
                 
                 <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 mb-5 sm:mb-10 max-w-lg lg:max-w-none">
                   {services[activeServiceIndex].tags.map(tag => (
                     <span key={tag} className="px-3 py-1.5 rounded-full border border-gray-900/10 text-gray-800 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide">
                       {tag}
                     </span>
                   ))}
                 </div>

                 <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-[36px] font-bold text-gray-900 leading-[1.3] max-w-md sm:max-w-xl mb-8">
                   {services[activeServiceIndex].description}
                 </h3>

                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 rounded-full shadow-lg transition-colors cursor-pointer"
                 >
                   {services[activeServiceIndex].buttonText}
                 </motion.button>
               </div>

               {/* Visual Side */}
               <div className="w-full lg:w-[45%] shrink-0 flex items-center justify-center mt-2 lg:mt-0 py-4 lg:py-12 pb-6 lg:pb-12 h-[220px] sm:h-[350px] lg:h-[640px] relative">
                 {services[activeServiceIndex].visualContent()}
               </div>
             </motion.div>
           </AnimatePresence>
        </div>
        
        {/* Navigation Buttons for Services Slider */}
        <div className="flex justify-center items-center gap-6 mt-8">
           <button 
             onClick={prevService}
             className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors z-20 text-gray-600 hover:text-[#3b6ee9]"
             aria-label="Previous Service"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           
           <div className="flex gap-2 relative z-20 items-center">
             {services.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    setServiceDirection(i > activeServiceIndex ? 1 : -1);
                    setActiveServiceIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${activeServiceIndex === i ? 'w-10 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'}`} 
                  aria-label={`Go to service ${i + 1}`}
                />
             ))}
           </div>
           
           <button 
             onClick={nextService}
             className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors z-20 text-gray-600 hover:text-[#3b6ee9]"
             aria-label="Next Service"
           >
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>
      </section>

      {/* Latest Solutions Section */}
      <div className="w-full overflow-hidden bg-[#1D0606] relative text-white border-b border-[#3A1010]">
        {/* Background gradient/glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#4A0A0A]/40 via-[#1D0606] to-[#1D0606]"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-[20px] md:px-[60px] py-16 md:py-24 max-w-[1400px] mx-auto">
          
          <div className="w-full lg:w-[45%] flex flex-col items-start mb-16 lg:mb-0">
            <h2 className="text-4xl md:text-5xl lg:text-[60px] leading-[1.1] font-light tracking-tight mb-6">
              THE FASTEST <br />
              INFERENCE IS <br />
              NOW <br />
              <span className="text-[#FF3B30] font-normal">OFFLINE</span>
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-md mb-8 leading-relaxed">
              Saviour Offline AI is now running locally on your device with LLAMA 1.5B PARAMETER. 10x more private than cloud.
            </p>
            <AnalyticsLink 
              href="https://sidemann-app-store.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-10 py-3 text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors"
              buttonName="Saviour_AI_Read_More"
            >
              READ MORE
            </AnalyticsLink>
          </div>

          <div className="w-full lg:w-[50%] relative flex justify-center items-center min-h-[300px]">
            {/* Glowing Projection Effect */}
            <div className="relative w-full max-w-lg aspect-video flex items-center justify-center">
              <div className="absolute bottom-0 w-3/4 h-1/4 bg-[#FF3B30] rounded-full blur-[100px] opacity-30"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <img src="/saviourai.png" alt="Saviour Offline AI" className="w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-[0_0_50px_rgba(255,59,48,0.3)] object-cover mb-8" />
              </div>
            </div>

            {/* Bottom Logos */}
            <div className="absolute bottom-0 right-0 flex items-center gap-6 pb-4">
              <div className="flex items-center gap-3">
                <img src="/llama-language-model-logo.webp" alt="LLAMA" className="h-10 w-auto object-contain brightness-0 invert" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="text-white font-bold text-2xl tracking-tighter">LLAMA</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="flex items-center gap-2 text-[#4F8AFF]">
                 <span className="text-2xl font-light">1.5B PARAMETER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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