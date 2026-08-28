import { Seo } from '../components/Seo';
import { motion } from 'motion/react';
import { Code, Music, Radio, Youtube, Bot, Image as ImageIcon, Store, GraduationCap, MessageCircle, Monitor, Smartphone, LayoutGrid, Zap, Cloud, Globe, Shield, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { AnalyticsLink } from '../components/AnalyticsButton';
import { useState } from 'react';

export function Products() {
  const [activeCategory, setActiveCategory] = useState('All programs');

  const products = [
    {
      title: "Sidemann WhatsApp Bot",
      description: "An intelligent WhatsApp bot built to automate support, engagement, and tasks instantly.",
      url: "https://wa.me/+263713952798",
      icon: <MessageCircle className="w-8 h-8 text-black" />,
      image: null,
      bgClass: "bg-[#FFB084]",
      category: "AI Tools",
      isFree: true
    },
    {
      title: "Telos Consultancy",
      description: "A professional corporate website for Telos Consultancy, showcasing services and expertise.",
      url: "#",
      icon: <Globe className="w-8 h-8 text-white" />,
      image: "/logo.png",
      bgClass: "bg-[#0A4BFF]",
      category: "Web Apps",
      isFree: false
    },
    {
      title: "ExamSidemann",
      description: "A comprehensive online learning platform offering courses, exams, and interactive study tools.",
      url: "https://examsidemann.com",
      icon: <GraduationCap className="w-8 h-8 text-black" />,
      image: "https://i.ibb.co/6RdXZMmW/es-logo.png",
      bgClass: "bg-white",
      category: "Web Apps",
      isFree: false
    },
    {
      title: "E-Razor",
      description: "Highly accurate image editor, background remover, image converter, and compressor tool.",
      url: "https://erazer-ten.vercel.app/",
      icon: <ImageIcon className="w-8 h-8 text-white" />,
      image: "/e-razor.png",
      bgClass: "bg-[#2A6B5B]",
      category: "Web Apps",
      isFree: true
    },
    {
      title: "App Store",
      description: "Find and download all our innovative applications safely.",
      url: "https://sidemann-app-store.vercel.app/",
      icon: <Store className="w-8 h-8 text-black" />,
      image: "https://i.ibb.co/1GWbN1WD/blackgiftlogo.png",
      bgClass: "bg-[#F7D2C4]",
      category: "Web Apps",
      isFree: true
    },
    {
      title: "Vidal",
      description: "A fast and reliable YouTube video downloader designed for offline viewing on the go.",
      url: "https://sidemann-app-store.vercel.app/",
      icon: <Youtube className="w-8 h-8 text-white" />,
      image: "https://www.dropbox.com/scl/fi/22fvufov66q9yr8cbw1f9/Screenshot-from-2026-05-22-16-01-32.png?rlkey=bjbsauckjkd7drklf3g74qmv5&st=04qcigo9&raw=1",
      bgClass: "bg-[#E63946]",
      category: "Mobile Apps",
      isFree: true
    },
    {
      title: "Crown Music",
      description: "Play local music, stream, and download without limits.",
      url: "https://sidemann-app-store.vercel.app/",
      icon: <Music className="w-8 h-8 text-black" />,
      image: "https://www.dropbox.com/scl/fi/oz4j0vud9wm6x06ft940n/crown.png?rlkey=rcqpgho4tahaupkjaducv4ozz&st=200rakq4&raw=1",
      bgClass: "bg-[#F4A261]",
      category: "Mobile Apps",
      isFree: true
    },
    {
      title: "Radio Globe",
      description: "Listen to virtually every radio station around the world, completely free.",
      url: "https://sidemann-app-store.vercel.app/",
      icon: <Radio className="w-8 h-8 text-black" />,
      image: "https://i.postimg.cc/SNrvSbZf/radio-globe.png",
      bgClass: "bg-[#E9C46A]",
      category: "Mobile Apps",
      isFree: true
    },
    {
      title: "Code Droid",
      description: "Mobile code editing tool powered by AI for faster development.",
      url: "https://sidemann-app-store.vercel.app/",
      icon: <Code className="w-8 h-8 text-white" />,
      image: "/code-droid.png",
      bgClass: "bg-[#264653]",
      category: "Mobile Apps",
      isFree: false
    },
    {
      title: "Saviour AI",
      description: "Powerful offline AI assistant ensuring total privacy.",
      url: "https://sidemann-app-store.vercel.app/",
      icon: <Bot className="w-8 h-8 text-black" />,
      image: "/saviourai.png",
      bgClass: "bg-white",
      category: "AI Tools",
      isFree: true
    }
  ];

  const categories = ["All programs", "Web Apps", "Mobile Apps", "AI Tools"];

  const filteredProducts = activeCategory === 'All programs' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F0F6FA] w-full overflow-hidden font-sans">
      <Seo 
        title="Our Products | Blackgift Tech Labs"
        description="Explore our portfolio of useful applications and platforms, including Sidemann WhatsApp Bot, E-Razor, Code Droid, and more."
      />

      {/* Hero Section */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#4100D3] via-[#2A16D7] to-[#0A4BFF] text-white pt-24 pb-32">
        {/* Background decorative waves */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <motion.svg 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] opacity-30 mix-blend-overlay" viewBox="0 0 100 100" preserveAspectRatio="none"
          >
            <path d="M0,50 C30,20 70,80 100,50 L100,100 L0,100 Z" fill="#0055FF" />
            <path d="M0,70 C40,90 60,10 100,60 L100,100 L0,100 Z" fill="#4000D3" />
          </motion.svg>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex flex-col items-start pt-10"
          >
            <span className="text-white/80 font-medium tracking-wide uppercase text-sm mb-4">BLACKGIFT PORTFOLIO & PROJECTS</span>
            <h1 className="text-5xl md:text-[64px] font-bold leading-[1.1] mb-8 tracking-tight">
              EXPLORE WHAT WE'VE BUILT.<br />
              PROJECTS & APPS.
            </h1>
            
            <div className="flex flex-wrap gap-8 mb-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <Smartphone className="w-6 h-6 text-white" />
                <span className="text-lg font-medium">Internal Apps<br />& Tools</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <Globe className="w-6 h-6 text-white" />
                <span className="text-lg font-medium">Client Projects<br />& Websites</span>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-2">FROM IDEATION TO LAUNCH</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">100% Quality</span>
              </div>
              <p className="text-sm text-white/70 mt-1">Discover our range of digital solutions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <AnalyticsLink 
                href="#programs"
                className="bg-[#FF0033] hover:bg-[#D6002A] text-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-red-500/30 inline-block"
                buttonName="Explore_Portfolio_Hero"
              >
                Explore Portfolio
              </AnalyticsLink>
            </motion.div>
          </motion.div>

          <div className="w-full lg:w-1/2 relative min-h-[500px] hidden lg:block">
            {/* Floating Cards Graphic */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[500px]">
              {products.slice(0, 4).map((product, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className={`absolute bg-white rounded-2xl p-4 shadow-2xl shadow-black/20 w-[240px] ${
                    i === 0 ? 'top-[10%] right-[40%] z-20 scale-110' : 
                    i === 1 ? 'top-[40%] right-[10%] z-10' : 
                    i === 2 ? 'bottom-[10%] right-[50%] z-30' : 
                    'top-[0%] right-[0%] z-0 scale-90'
                  }`}
                  style={{
                    transform: `translateY(${Math.sin(Date.now() / 1000 + i) * 10}px)`
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${product.bgClass}`}>
                          {product.icon}
                        </div>
                      )}
                    </div>
                    {product.isFree && <span className="bg-[#00D06C] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">FREE</span>}
                  </div>
                  <h4 className="text-gray-900 font-bold text-sm mb-1 line-clamp-1">{product.title}</h4>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{product.category}</span>
                    <button className="border border-blue-500 text-blue-500 rounded-full px-4 py-1 text-xs font-bold hover:bg-blue-50 transition-colors">Launch</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Plenty of Cool Stuff Section */}
      <div className="py-24 bg-[#F0F6FA] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a56db] leading-tight">What We<br />Deliver</h2>
          </motion.div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12">
            {[
              { icon: LayoutGrid, title: "Custom Solutions", desc: "Tailor-made software built specifically to your needs, whether it's an internal tool or a client portal." },
              { icon: Zap, title: "High Performance", desc: "We build extremely fast applications using the latest web technologies to ensure a seamless experience." },
              { icon: Layers, title: "Cross-Platform Excellence", desc: "Whether it's the web, iOS, or Android, our solutions work perfectly across all devices and platforms." },
              { icon: Cloud, title: "Scalable Infrastructure", desc: "Secure, reliable, and scalable infrastructure solutions built to grow alongside your business." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <item.icon className="w-10 h-10 text-[#1a56db] mb-4 stroke-[1.5]" />
                <h3 className="text-xl font-bold text-[#1a56db] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Find Your Programs In Seconds Section */}
      <div id="programs" className="py-24 bg-gradient-to-br from-[#4100D3] via-[#2A16D7] to-[#0A4BFF] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-10">Explore Our Portfolio In Seconds</h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#1a56db] text-white shadow-lg' 
                    : 'bg-white text-[#1a56db] hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform"
              >
                {product.isFree && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 bg-[#00D06C] text-white text-[10px] font-bold px-3 py-1 rounded-b-md">
                    FREE
                  </div>
                )}
                
                <div className="flex items-center gap-4 flex-1 min-w-0 pr-4 z-10 mt-2">
                  <div className="w-[60px] h-[60px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${product.bgClass}`}>
                        {product.icon}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-[16px] font-bold text-gray-900 truncate">{product.title}</h3>
                    <p className="text-[13px] text-gray-500 truncate">{product.category}</p>
                  </div>
                </div>
                
                <AnalyticsLink 
                  href={product.url}
                  target="_blank"
                  className="bg-[#1a56db] hover:bg-[#1546b5] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors z-10 shrink-0"
                  buttonName={`Launch_${product.title.replace(/\s+/g, '_')}`}
                >
                  Launch
                </AnalyticsLink>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button className="border-2 border-white text-white px-10 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              + {products.length} projects
            </button>
          </div>
        </div>
      </div>

      {/* Unlimited Productivity Section */}
      <div className="py-24 bg-gradient-to-br from-[#4100D3] to-[#2A16D7] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Unmatched Quality</h2>
            <p className="text-lg font-medium mb-8">We build responsive, fast, and scalable applications that work flawlessly everywhere!</p>
            
            <h3 className="text-2xl font-bold mb-3">Accessible anywhere</h3>
            <p className="text-white/80 mb-8 max-w-lg">We deliver web and mobile experiences that don't require heavy downloads or complex setup.</p>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden border-4 border-black/80 shadow-2xl bg-black aspect-video max-w-xl group"
            >
              <img src="/saviourai.png" alt="Saviour AI Interface" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                   <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                 </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col gap-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Work Without Limits</h3>
              <p className="text-white/80 mb-6">Our projects scale on any device</p>
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Monitor className="w-10 h-10 text-white" /> {/* Using Monitor as placeholder for laptop */}
                </div>
                <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Cross-Platform Development</h3>
              <p className="text-white/80 mb-6 max-w-lg leading-relaxed">
                Whether you need a web platform, iOS app, or Windows tool, we build solutions that span all operating systems.
              </p>
              <div className="flex flex-wrap gap-4">
                 {/* OS Icons */}
                 {['Windows', 'Apple', 'Linux', 'Chrome', 'Android'].map((os, i) => (
                   <div key={os} className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                     <span className="text-2xl font-bold text-white opacity-50">{os[0]}</span>
                   </div>
                 ))}
              </div>
            </div>

            <button className="bg-[#FF0033] hover:bg-[#D6002A] text-white px-10 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-red-500/30 w-fit">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>

      {/* Power Up Your Devices Section */}
      <div className="py-24 bg-[#F0F6FA] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full lg:w-1/2 relative min-h-[400px]"
          >
             {/* Device Mockups Placeholder */}
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-full max-w-[600px] aspect-[4/3] bg-white rounded-xl shadow-2xl overflow-hidden border-8 border-gray-800 relative z-10 flex flex-col">
                 <div className="h-6 bg-gray-100 flex items-center px-3 gap-1.5 border-b border-gray-200">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                 </div>
                 <div className="flex-1 bg-[#F5F8FA] p-6 grid grid-cols-4 gap-4">
                    {Array(8).fill(0).map((_, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 + (i * 0.05) }}
                        className="bg-white rounded-lg p-3 flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-md"></div>
                        <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
                      </motion.div>
                    ))}
                 </div>
               </div>
               {/* Laptop / Mobile overlay mockups can be added here */}
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a56db] mb-12">Innovative Technologies</h2>
            
            <div className="space-y-10">
              {[
                { icon: Zap, title: "Your Vision, Our Tech", desc: "We leverage the latest frameworks and cloud infrastructure to ensure your ideas are transformed into professional products." },
                { icon: "✕", title: "Maintenance-Free", desc: "We build reliable applications that just work. Our managed solutions require zero technical maintenance on your end." },
                { icon: RefreshCw, title: "Modern Design", desc: "Every project benefits from clean, intuitive design language focused entirely on the user." }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex gap-6"
                >
                  <div className="mt-1">
                    {typeof feature.icon === 'string' ? (
                      <div className="w-8 h-8 rounded-lg border-2 border-[#1a56db] flex items-center justify-center">
                        <span className="text-[#1a56db] font-bold">{feature.icon}</span>
                      </div>
                    ) : (
                      <feature.icon className="w-8 h-8 text-[#1a56db] stroke-[1.5]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1a56db] mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* With Blackgift Section */}
      <div className="py-24 bg-[#F0F6FA] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
         <motion.h2 
           initial={{ opacity: 0, y: -30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.6 }}
           className="text-4xl md:text-5xl font-bold text-[#1a56db] mb-16 leading-tight max-w-3xl"
         >
           With Blackgift, Your Vision<br />Becomes Reality
         </motion.h2>
         
         <motion.div 
           initial={{ opacity: 0, scale: 0.8, y: 50 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: false, amount: 0.3 }}
           transition={{ type: "spring", stiffness: 80, damping: 20 }}
           className="w-full max-w-5xl aspect-[21/9] bg-gradient-to-t from-gray-200 to-transparent mb-16 flex items-end justify-center relative pb-10"
         >
            {/* Very simple abstract representation of devices */}
            <div className="w-[80%] max-w-[600px] aspect-video bg-gray-800 rounded-t-2xl border-[12px] border-b-0 border-gray-900 relative z-10 shadow-2xl flex items-center justify-center">
               <h3 className="text-white text-2xl font-bold opacity-20">WEB PLATFORM</h3>
            </div>
            <div className="w-full max-w-[700px] h-6 bg-gray-300 absolute bottom-4 rounded-b-xl z-20"></div>
         </motion.div>

         <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.6 }}
           className="text-3xl md:text-4xl font-bold text-[#1a56db]"
         >
           Let's Build Something Amazing Together
         </motion.h2>
      </div>

      {/* Footer CTA Section */}
      <div className="py-24 bg-[#F0F6FA] px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
             {[
               { icon: Zap, title: "Get enterprise-level", desc: "quality on every project" },
               { icon: Layers, title: "Build applications", desc: "for any operating system" },
               { icon: Shield, title: "Everything works", desc: "seamlessly. No hassle." }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: false, amount: 0.5 }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 className="bg-white border border-[#1a56db]/20 rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow"
               >
                  <item.icon className="w-6 h-6 text-[#1a56db] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1a56db] font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
               </motion.div>
             ))}
          </div>

          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF0033] hover:bg-[#D6002A] text-white px-12 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-red-500/30 mb-20"
          >
            Start Your Project
          </motion.button>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a56db] w-full max-w-[1000px] rounded-3xl p-12 flex flex-col items-center"
          >
            <h3 className="text-white text-2xl font-light mb-10">Trusted by leading brands</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80">
               {['GOOGLE', 'MICROSOFT', 'VERCEL', 'FIREBASE'].map((brand, i) => (
                 <motion.h4 
                   key={i}
                   initial={{ opacity: 0, filter: "blur(10px)" }}
                   whileInView={{ opacity: 1, filter: "blur(0px)" }}
                   viewport={{ once: false }}
                   transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                   className="text-white text-2xl font-bold tracking-widest"
                 >
                   {brand}
                 </motion.h4>
               ))}
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}

