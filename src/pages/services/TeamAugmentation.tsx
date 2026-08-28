import { Seo } from "../../components/Seo";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Users, Zap, Shield, Clock, Layout, Database, Smartphone, Cloud, BarChart, Cpu, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TeamAugmentation() {
  return (
    <div className="w-full flex-col flex items-center bg-[#fcfbfa]">
      <Seo title="Team Augmentation Services | Blackgift Tech Labs" description="Scale your engineering capacity with our elite team augmentation services." />

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] bg-[#fcfbfa] flex items-center overflow-hidden pt-32 pb-20 lg:py-0">
        <Link
          to="/services"
          className="absolute top-24 left-6 lg:left-16 z-50 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Services</span>
        </Link>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 bg-gradient-to-bl from-blue-100 via-white to-white pointer-events-none z-0"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex justify-end">
          <div className="w-full lg:w-[45%] flex flex-col gap-6 py-12 lg:py-32">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]"
            >
              Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Augmentation</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-800 font-medium leading-relaxed"
            >
              Scale your engineering capacity quickly. We provide dedicated, highly skilled technical experts who seamlessly integrate with your existing team and processes to accelerate delivery.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-emerald-500 hover:opacity-90 text-white px-8 py-3.5 rounded-xl font-bold transition-all text-sm"
              >
                Hire our experts
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Left side image */}
        <div className="absolute left-0 top-0 h-full w-[55%] hidden lg:block z-0 pointer-events-none">
          <img
            src="/teamaug.jpg"
            alt="Team Augmentation"
            className="w-full h-full object-cover"
          />
          {/* Mist overlay to fade the image into the background */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#fcfbfa] via-[#fcfbfa]/80 to-transparent"></div>
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#fcfbfa] via-[#fcfbfa]/40 to-transparent opacity-80"></div>
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#fcfbfa] via-[#fcfbfa]/60 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#fcfbfa] via-[#fcfbfa]/60 to-transparent"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Why Augment With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">Bypass the lengthy hiring process and onboarding overhead. Get immediate access to top talent tailored to your stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="w-8 h-8 text-amber-500" />, title: "Fast Onboarding", desc: "Our engineers adapt quickly to new environments and hit the ground running." },
              { icon: <Users className="w-8 h-8 text-blue-500" />, title: "Cultural Fit", desc: "We select candidates who align with your company's values and working style." },
              { icon: <Shield className="w-8 h-8 text-emerald-500" />, title: "Zero Risk", desc: "No long-term commitments. Scale your team up or down based on project needs." },
              { icon: <Clock className="w-8 h-8 text-purple-500" />, title: "Time Zone Alignment", desc: "We provide resources that overlap with your core working hours." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Categories */}
      <section className="w-full py-12 px-6 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto bg-[#13121d] rounded-[48px] p-10 md:p-16 lg:p-20 relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col gap-20">
            
            {/* Shop by product -> Engineers We Provide */}
            <div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 tracking-tight">Engineers We Provide</h2>
               <div className="flex flex-wrap gap-5">
                  {[
                    { role: "Frontend Developers", icon: <Layout className="w-7 h-7 text-white/80" /> },
                    { role: "Backend Engineers", icon: <Database className="w-7 h-7 text-white/80" /> },
                    { role: "Mobile Developers", icon: <Smartphone className="w-7 h-7 text-white/80" /> },
                    { role: "Cloud Architects", icon: <Cloud className="w-7 h-7 text-white/80" /> },
                    { role: "Data Scientists", icon: <BarChart className="w-7 h-7 text-white/80" /> },
                    { role: "AI Specialists", icon: <Cpu className="w-7 h-7 text-white/80" /> },
                    { role: "QA Engineers", icon: <ShieldCheck className="w-7 h-7 text-white/80" /> }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 bg-[#2b2a33] hover:bg-[#383742] transition-colors rounded-3xl p-4 pr-8 cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-[#1e1d27] rounded-2xl flex items-center justify-center shadow-inner">
                         {item.icon}
                      </div>
                      <span className="text-white font-semibold text-lg">{item.role}</span>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Shop by brand -> Technologies We Master */}
            <div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 tracking-tight">Technologies We Master</h2>
               <div className="flex flex-wrap gap-5">
                  {[
                    "React", "Node.js", "Python", "Vue", "Angular", "Go", "AWS", "Google Cloud", "Flutter", "React Native", "TensorFlow", "OpenAI"
                  ].map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-center bg-[#2b2a33] hover:bg-[#383742] transition-colors rounded-[32px] px-10 py-5 cursor-pointer"
                    >
                      <span className="text-white font-bold text-xl tracking-wide">{tech}</span>
                    </motion.div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row shadow-2xl relative overflow-hidden text-white min-h-[320px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Need dedicated engineers?</h2>
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed">
                Contact us today to review CVs and interview available developers matching your requirements.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-full font-bold transition-all hover:bg-blue-50 w-fit shrink-0 shadow-lg"
              >
                Let's discuss your team
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
