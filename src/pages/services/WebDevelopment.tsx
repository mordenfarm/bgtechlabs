import { Seo } from "../../components/Seo";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Layers, Search, Server, Monitor, Code, Smartphone, Database, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WebDevelopment() {
  return (
    <div className="w-full flex-col flex items-center bg-[#fcfbfa]">
      <Seo title="Web Development Services | Blackgift Tech Labs" description="Custom web solutions tailored to your business needs, easily manageable with popular CMS." />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        <Link
          to="/services"
          className="absolute top-8 left-6 lg:left-16 z-50 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Services</span>
        </Link>

        {/* Semi-circle images container */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[1300px] h-[600px] pointer-events-none z-0 hidden lg:block">
          {/* 1. Left Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -40 }} animate={{ opacity: 1, y: 0, rotate: -30 }} transition={{ delay: 0.1, duration: 0.8 }}
            className="absolute w-[200px] h-[200px] bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-[2.5rem] top-[65%] left-[2%] shadow-2xl flex items-center justify-center" 
          >
            <Code className="w-20 h-20 text-indigo-500" />
          </motion.div>
          
          {/* 2. Left Mid */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -25 }} animate={{ opacity: 1, y: 0, rotate: -15 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute w-[200px] h-[200px] bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-[2.5rem] top-[22%] left-[16%] shadow-2xl flex items-center justify-center" 
          >
            <Smartphone className="w-20 h-20 text-emerald-500" />
          </motion.div>
          
          {/* 3. Top Left */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -15 }} animate={{ opacity: 1, y: 0, rotate: -5 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute w-[200px] h-[200px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-[2.5rem] top-[2%] left-[32%] shadow-2xl flex items-center justify-center" 
          >
            <Globe className="w-20 h-20 text-blue-500" />
          </motion.div>

          {/* 4. Top Right */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 12 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute w-[200px] h-[200px] bg-gradient-to-br from-violet-100 to-violet-200 rounded-[2.5rem] top-[-5%] right-[30%] shadow-2xl flex items-center justify-center" 
          >
            <Server className="w-20 h-20 text-violet-500" />
          </motion.div>

          {/* 5. Right Mid */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 15 }} animate={{ opacity: 1, y: 0, rotate: 25 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute w-[200px] h-[200px] bg-gradient-to-br from-amber-100 to-amber-200 rounded-[2.5rem] top-[25%] right-[14%] shadow-2xl flex items-center justify-center" 
          >
            <Layers className="w-20 h-20 text-amber-500" />
          </motion.div>

          {/* 6. Right Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 30 }} animate={{ opacity: 1, y: 0, rotate: 38 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute w-[200px] h-[200px] bg-gradient-to-br from-rose-100 to-rose-200 rounded-[2.5rem] top-[70%] right-[0%] shadow-2xl flex items-center justify-center" 
          >
            <Monitor className="w-20 h-20 text-rose-500" />
          </motion.div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center text-center mt-12 lg:mt-[40vh] xl:mt-[45vh] px-6 max-w-4xl bg-white/70 backdrop-blur-3xl lg:bg-transparent lg:backdrop-blur-none rounded-[3rem] py-12 lg:py-0 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[2.5rem] sm:text-5xl lg:text-[4.5rem] font-serif tracking-tight text-gray-900 leading-[1.1] mb-6"
          >
            Create Stunning Web<br />Experiences Instantly
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg lg:text-xl text-gray-500 font-medium mb-10 max-w-2xl px-4"
          >
            Transform your ideas into breathtaking web platforms with cutting-edge technology and brilliant design.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#222222] hover:bg-black text-white px-8 py-4 rounded-full font-medium transition-all mb-16 shadow-lg shadow-black/10"
            >
              Start Building Now
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-0 w-full"
          >
            <div className="flex-1 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 px-4 md:px-8">
              <h3 className="font-serif text-[1.35rem] text-gray-900 mb-2">Realistic Results</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">High-performance platforms that look and feel professionally crafted.</p>
            </div>
            <div className="flex-1 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 px-4 md:px-8">
              <h3 className="font-serif text-[1.35rem] text-gray-900 mb-2">Fast Deployment</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">Turn ambitious ideas into robust applications in record scaling time.</p>
            </div>
            <div className="flex-1 flex flex-col items-center px-4 md:px-8">
              <h3 className="font-serif text-[1.35rem] text-gray-900 mb-2">Diverse Architectures</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">Choose from a wide range of architectures and UI components.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Our Web Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">Delivering secure, scalable, and highly functional web platforms for your enterprise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <Globe className="w-8 h-8 text-teal-500" />, title: "Enterprise Web Portals", desc: "Complex web portals that integrate seamlessly with your internal business operations and databases." },
              { icon: <Layers className="w-8 h-8 text-cyan-500" />, title: "CMS Development", desc: "Custom WordPress, Sitecore, and Contentful implementations allowing your team to easily manage content." },
              { icon: <Server className="w-8 h-8 text-sky-500" />, title: "E-Commerce Solutions", desc: "Scalable digital storefronts engineered for high conversions and massive traffic spikes." },
              { icon: <Search className="w-8 h-8 text-blue-500" />, title: "SEO & Accessibility Core", desc: "Sites built from the ground up prioritizing technical SEO and meeting WCAG accessibility guidelines." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f0f9fa] border border-transparent rounded-[32px] p-8 md:p-12 hover:shadow-xl hover:border-teal-100 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 relative z-10">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="w-full bg-[#0d1b2a] rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row shadow-2xl relative overflow-hidden text-white min-h-[320px]">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] via-[#0d1b2a]/90 to-transparent"></div>
            </div>
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Build your digital foundation</h2>
              <p className="text-white/80 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed">
                Connect with us to plan, design, and engineer your next high-performance web platform.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-teal-400 w-fit shrink-0 shadow-lg"
              >
                Start your project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
