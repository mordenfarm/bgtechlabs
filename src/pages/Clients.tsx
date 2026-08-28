import { Seo } from '../components/Seo';
import { useEffect, useRef, useState } from 'react';

const clients = [
  { name: "Circle of Hope Academy", logo: "/coha.png", country: "Zimbabwe" },
  { name: "AlphaOctal Systems", logo: "/alphaoctal.avif", country: "Zimbabwe" },
  { name: "Raphamed Surgery", logo: "/raphamed.png", country: "Zimbabwe" },
  { name: "Sapphire Surgery", logo: "/sapphire-surgery.png", country: "Zimbabwe" },
  { name: "Maranatha Surgery", logo: "/maranatha-surgery.png", country: "Zimbabwe" },
  { name: "ServiceLoop", logo: "/serviceloop.jpeg", country: "Zimbabwe" },
  { name: "Brilliant Chemicals", logo: "/brilliant-chemicals.png", country: "Zimbabwe" },
  { name: "MotionMax Academy", logo: "/motionmaxlgo.png", country: "Zimbabwe" },
  { name: "Lenda Technologies", logo: "/lenda-logo.png", country: "Zimbabwe" },
  { name: "Defined Domain", logo: "/defineddomain.png", country: "Zimbabwe" },
];

export function Clients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>();

  const getRadii = () => {
    const isMobile = window.innerWidth < 768;
    return {
      rx: isMobile ? window.innerWidth * 0.38 : Math.min(window.innerWidth * 0.32, 420),
      ry: isMobile ? window.innerHeight * 0.28 : Math.min(window.innerHeight * 0.32, 220),
      size: isMobile ? 56 : 88,
    };
  };

  useEffect(() => {
    const logos = containerRef.current?.querySelectorAll<HTMLDivElement>('.orbit-logo');
    if (!logos) return;
    const count = logos.length;

    const animate = () => {
      angleRef.current -= 0.004;

      const { rx, ry, size } = getRadii();

      logos.forEach((el, i) => {
        const base = (2 * Math.PI * i) / count;
        const angle = base + angleRef.current;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;
        const depth = (Math.sin(angle) + 1) / 2;
        const scale = 0.6 + 0.4 * depth;

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        el.style.zIndex = String(Math.round(scale * 10));
        el.style.opacity = String(0.5 + 0.5 * depth);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-[#F0EEE8] overflow-hidden relative">
      <Seo
        title="Our Clients | Blackgift Tech Labs"
        description="Discover the amazing companies that trust our software solutions."
      />

      {/* Center text */}
      <div className="text-center z-10 pointer-events-none select-none px-4">
        <p className="text-xs md:text-sm text-gray-400 tracking-wide mb-1 md:mb-2">Trusted by</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          Our Clients
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-2 md:mt-3">
          Empowering businesses across Zimbabwe
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Orbit container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {clients.map((client, i) => (
          <div
            key={i}
            className="orbit-logo absolute rounded-full flex items-center justify-center p-2 md:p-3 shadow-lg border border-black/8 bg-white transition-none"
            title={client.name}
          >
            <img
              src={client.logo}
              alt={client.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}