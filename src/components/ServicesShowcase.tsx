import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, animate, motion, useInView, useIsPresent, useMotionValue, useReducedMotion, type Variants } from 'motion/react';

const services = [
  { name: 'Web Development', lead: 'A stronger presence.', title: 'A better website.', description: 'Fast, thoughtful websites that bring your brand to life and turn visitors into customers.', image: 'web', href: '/services/web-development', cta: 'Explore web development' },
  { name: 'Mobile Apps', lead: 'Your next big idea.', title: 'In every pocket.', description: 'Intuitive Android and iOS apps that make everyday tasks easier for your customers and your team.', image: 'mobile', href: '/services/mobile-development', cta: 'Explore mobile apps' },
  { name: 'Enterprise Systems', lead: 'Less busywork.', title: 'More possibilities.', description: 'Custom school, invoicing, and business systems that connect your processes and help your team work smarter.', image: 'enterprise', href: '/services/backend-development', cta: 'Explore custom systems' },
  { name: 'Electronic Security', lead: 'Protect your space.', title: 'Find peace of mind.', description: 'CCTV, biometric access, and connected security systems designed around the people and places that matter.', image: 'security', href: '/contact', cta: 'Plan your security system' },
  { name: 'AI Autonomous Agents', lead: 'Think bigger.', title: 'Let AI take action.', description: 'Personal AI agents and intelligent workflows that handle repetitive tasks and keep your business moving.', image: 'ai', href: '/services/ai-development', cta: 'Explore AI solutions' },
  { name: 'Advertising', lead: 'Stop the scroll.', title: 'Start a conversation.', description: 'Bold digital campaigns, animated adverts, and motion graphics that give your message a lasting impression.', image: 'advertising', href: '/services', cta: 'Explore advertising' },
  { name: 'Videography', lead: 'Every brand has a story.', title: 'Make yours cinematic.', description: 'From product shoots to brand films, we create video that captures attention and brings your story into focus.', image: 'video', href: '/contact', cta: 'Plan your next shoot' },
  { name: 'Branding', lead: 'Make your mark.', title: 'Be remembered.', description: 'Distinctive logos, packaging, and visual identities that give your business a consistent, confident voice.', image: 'branding', href: '/services', cta: 'Explore branding' },
];

const SLIDE_SECONDS = 7;
const accents = ['#36d9dc', '#b49aff', '#48e3b0', '#ffbd59', '#729bff', '#ff7bb4', '#e5ba79', '#c59aff'];
const ease = [0.22, 1, 0.36, 1] as const;

function ServiceSlide({ index, direction, reduced }: { key?: number; index: number; direction: number; reduced: boolean }) {
  const service = services[index];
  const present = useIsPresent();
  const text: Variants = {
    enter: { opacity: 0, y: reduced ? 0 : 30, rotateX: reduced ? 0 : -12 },
    center: { opacity: 1, y: 0, rotateX: 0, transition: { duration: reduced ? 0 : 0.8, ease } },
    exit: { opacity: 0, y: reduced ? 0 : -18, transition: { duration: reduced ? 0 : 0.3 } },
  };
  // Alternate the image entrance between a turn, a lift, a sweep, and a zoom.
  const entrances = [
    { x: direction * 130, y: 30, rotateY: direction * -24, rotateZ: direction * 5, scale: 0.82 },
    { x: direction * 35, y: 100, rotateY: direction * 12, rotateZ: direction * -7, scale: 0.9 },
    { x: direction * 160, y: -20, rotateY: direction * -16, rotateZ: 0, scale: 0.94 },
    { x: 0, y: 20, rotateY: direction * 25, rotateZ: direction * 4, scale: 0.68 },
  ];
  return (
    <motion.div
      initial="enter" animate="center" exit="exit"
      variants={{ enter: { opacity: 0 }, center: { opacity: 1, transition: { duration: reduced ? 0 : 0.4, delayChildren: reduced ? 0 : 0.12, staggerChildren: reduced ? 0 : 0.1 } }, exit: { opacity: 0, transition: { duration: reduced ? 0 : 0.4 } } }}
      className="grid w-full items-center gap-7 lg:grid-cols-[0.95fr_1.2fr] lg:gap-12"
      style={{ gridArea: '1 / 1', perspective: 1400, pointerEvents: present ? 'auto' : 'none' }}
      role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${services.length}: ${service.name}`} aria-hidden={!present} inert={!present}
    >
      <div className="text-center lg:text-left lg:py-10" style={{ perspective: 900 }}>
        <motion.p variants={text} className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffc144]">{service.name}</motion.p>
        <h2 className="text-4xl sm:text-5xl xl:text-[62px] leading-[1.1] tracking-tight font-light">
          <span className="block overflow-hidden pb-1"><motion.span variants={text} className="block">{service.lead}</motion.span></span>
          <span className="block overflow-hidden pb-2"><motion.span variants={text} className="block font-bold">{service.title}</motion.span></span>
        </h2>
        <motion.p variants={text} className="mx-auto lg:mx-0 mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-white/85">{service.description}</motion.p>
        <motion.div variants={text}>
          <Link to={service.href} className="group mt-8 inline-flex items-center gap-5 border border-white/75 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-white hover:text-[#052e40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc144]">{service.cta}<ArrowRight className="h-4 w-4 text-[#ffc144] transition-transform group-hover:translate-x-1" /></Link>
        </motion.div>
      </div>
      <motion.div
        className="relative mx-auto w-full"
        variants={{
          enter: { opacity: 0, ...(reduced ? {} : entrances[index % entrances.length]) },
          center: { opacity: 1, x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, transition: { duration: reduced ? 0 : 1.25, ease } },
          exit: { opacity: 0, x: reduced ? 0 : direction * -90, y: reduced ? 0 : -20, rotateY: reduced ? 0 : direction * 16, scale: reduced ? 1 : 1.06, transition: { duration: reduced ? 0 : 0.45, ease } },
        }}
      >
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-[10%] rounded-full opacity-25" style={{ background: `radial-gradient(ellipse, ${accents[index]}, transparent 68%)` }} animate={reduced ? {} : { scale: [0.85, 1.12, 0.85], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.img src={`/services/${service.image}.png`} alt={`${service.name}: custom service illustration`} className="relative mx-auto h-[260px] sm:h-[350px] lg:h-[440px] xl:h-[500px] w-full object-contain" animate={reduced ? {} : { y: [0, -8, 0], rotateZ: [0, 0.6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.25 }} />
      </motion.div>
    </motion.div>
  );
}

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const running = !paused && !hovered && !focused && inView && !reducedMotion;
  const select = useCallback((index: number, travel?: number) => {
    const next = (index + services.length) % services.length;
    if (next === active) return;
    setDirection(travel ?? (next > active ? 1 : -1));
    setActive(next);
  }, [active]);

  useEffect(() => { progress.set(0); }, [active, progress]);
  useEffect(() => {
    if (!running) return;
    const controls = animate(progress, 1, {
      duration: Math.max(0.01, (1 - progress.get()) * SLIDE_SECONDS), ease: 'linear',
      onComplete: () => { setDirection(1); setActive((index) => (index + 1) % services.length); },
    });
    return () => controls.stop();
  }, [active, running, progress]);

  return (
    <section ref={section} aria-label="Services we provide" aria-roledescription="carousel" className="relative isolate w-full overflow-hidden bg-[#052e40] text-white"
      style={{ backgroundImage: 'radial-gradient(ellipse at 85% 35%, #204c5d 0%, #0b3548 45%, #032b3c 85%)' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-full w-2/3 opacity-[0.13]" animate={{ backgroundColor: accents[active], rotate: reducedMotion ? 0 : active % 2 ? 12 : -12 }} transition={{ duration: reducedMotion ? 0 : 1.5 }} style={{ maskImage: 'radial-gradient(ellipse, black, transparent 65%)' }} />
      <div className="relative mx-auto max-w-[1680px] px-8 sm:px-16 lg:px-24 pt-14 lg:pt-20 pb-10">
        <p className="text-center lg:text-left text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/75">Services we provide</p>
        <div className="relative mt-7 grid min-h-[600px] sm:min-h-[690px] lg:min-h-[480px] xl:min-h-[530px]">
          <AnimatePresence initial={false} mode="sync"><ServiceSlide key={active} index={active} direction={direction} reduced={!!reducedMotion || !inView || paused} /></AnimatePresence>
        </div>
        <div className="mt-7 flex flex-wrap justify-center items-center gap-2" aria-label="Select a service">
          {services.map((item, index) => <button key={item.image} type="button" onClick={() => select(index)} aria-label={`Show ${item.name}`} aria-current={index === active ? 'true' : undefined} className="group flex h-10 min-w-7 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffc144]"><span className={`relative block h-2.5 overflow-hidden rounded-full transition-all duration-500 ${index === active ? 'w-12 bg-white/20' : 'w-2.5 bg-white/45 group-hover:bg-white'}`}>{index === active && <motion.span className="absolute inset-0 origin-left rounded-full bg-[#edae18]" style={{ scaleX: reducedMotion ? 1 : progress }} />}</span></button>)}
          <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play service slideshow' : 'Pause service slideshow'} aria-pressed={paused} className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#004353] hover:bg-[#00576a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffc144]">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
        </div>
      </div>
      <button type="button" onClick={() => select(active - 1, -1)} aria-label="Previous service" className="absolute left-0 top-1/2 flex h-14 w-7 sm:w-10 -translate-y-1/2 items-center justify-center bg-black/20 hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffc144]"><ChevronLeft className="h-6 w-6" /></button>
      <button type="button" onClick={() => select(active + 1, 1)} aria-label="Next service" className="absolute right-0 top-1/2 flex h-14 w-7 sm:w-10 -translate-y-1/2 items-center justify-center bg-black/20 hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffc144]"><ChevronRight className="h-6 w-6" /></button>
    </section>
  );
}
