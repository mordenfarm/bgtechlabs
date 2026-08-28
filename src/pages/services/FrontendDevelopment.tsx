import { Seo } from "../../components/Seo";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layout, Zap, Smartphone, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FrontendDevelopment() {
  return (
    <div className="w-full flex-col flex items-center bg-[#fcfbfa]">
      <Seo title="Frontend Development Services | Blackgift Tech Labs" description="Engaging, high-performance, and responsive frontend applications." />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] bg-[#1c0f2e] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <Link
          to="/services"
          className="absolute top-24 left-6 lg:left-16 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Services</span>
        </Link>
        <div className="absolute inset-0 bg-[#1c0f2e]/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0f2e] to-transparent"></div>
        <div className="w-full px-6 lg:px-16 relative z-10 text-center lg:text-left pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8"
          >
            Frontend <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Development</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 font-medium leading-relaxed"
          >
            We transform bold designs into responsive, high-performing web experiences. Fast, interactive, and beautifully crafted frontend architecture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-pink-500/20"
            >
              Start building
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Approaches Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Our Frontend Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">Developing scalable, user-centric interfaces tailored to your business goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <Layout className="w-8 h-8 text-pink-500" />, title: "Single Page Applications", desc: "Fast and dynamic applications that offer a seamless, app-like experience within the browser." },
              { icon: <Zap className="w-8 h-8 text-orange-500" />, title: "Performance Optimization", desc: "Expert profiling and optimization to ensure 60fps animations and near-instant load times." },
              { icon: <Smartphone className="w-8 h-8 text-purple-500" />, title: "Responsive Web Design", desc: "Perfectly scaled designs that respond to any screen size, from mobile to ultra-wide displays." },
              { icon: <Layers className="w-8 h-8 text-indigo-500" />, title: "Micro-frontends", desc: "Decomposing monolithic frontends into independent, scalable applications for enterprise teams." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-[32px] p-8 md:p-12 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="w-full py-24 bg-[#1c0f2e] text-center">
        <h2 className="text-3xl font-extrabold text-white mb-12">Technologies we master</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto px-6">
          {["React", "Vue.js", "Angular", "TypeScript", "Next.js", "Nuxt.js", "Tailwind CSS", "Framer Motion", "GraphQL"].map((tech) => (
             <span key={tech} className="px-6 py-3 bg-white/10 rounded-full text-white font-bold tracking-wide border border-white/20 hover:bg-pink-500 hover:border-pink-500 cursor-pointer transition-colors">
               {tech}
             </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="w-full bg-gradient-to-r from-pink-600 to-orange-500 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row shadow-2xl relative overflow-hidden text-white min-h-[320px]">
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to reimagine your frontend?</h2>
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed">
                Contact us to discuss your frontend architecture or build your next scalable app block by block.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-pink-900 px-8 py-4 rounded-full font-bold transition-all hover:bg-pink-50 w-fit shrink-0 shadow-lg"
              >
                Discuss project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
