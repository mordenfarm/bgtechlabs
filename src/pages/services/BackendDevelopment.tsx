import { Seo } from "../../components/Seo";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Database, Server, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BackendDevelopment() {
  return (
    <div className="w-full flex-col flex items-center bg-[#fcfbfa]">
      <Seo title="Backend Development Services | Blackgift Tech Labs" description="High-load and complex backend infrastructure development." />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] bg-[#222831] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop')] bg-cover bg-center">
        <Link
          to="/services"
          className="absolute top-24 left-6 lg:left-16 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Services</span>
        </Link>
        <div className="absolute inset-0 bg-[#222831]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#222831] to-transparent"></div>
        <div className="w-full px-6 lg:px-16 relative z-10 text-center lg:text-left pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8"
          >
            Backend <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">Development</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 font-medium leading-relaxed"
          >
            High-load, complex backend infrastructures built for extreme scalability, rapid data processing, and foolproof security.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-[#222831] px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-emerald-500/20"
            >
              Consult experts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Technical Approach Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Robust Core Architecture</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">We design resilient technical foundations capable of handling massive traffic spikes and data throughput.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <Database className="w-8 h-8 text-emerald-500" />, title: "Data Architecture", desc: "Relational and NoSQL database modeling engineered for fast querying and reliable local/cloud replication." },
              { icon: <Server className="w-8 h-8 text-cyan-500" />, title: "Microservices & APIs", desc: "Building scalable microservices architectures perfectly integrated through secure GraphQL and REST RESTful APIs." },
              { icon: <ShieldCheck className="w-8 h-8 text-lime-500" />, title: "Security & Compliance", desc: "Implementing enterprise-grade encryption, role-based access controls, and compliance-driven firewalls." },
              { icon: <Activity className="w-8 h-8 text-teal-500" />, title: "DevOps & Cloud Orchestration", desc: "Automating deployment pipelines through CI/CD, Kubernetes, and seamless AWS/GCP integrations." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-[32px] p-8 md:p-12 hover:bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="w-full py-24 bg-[#222831] text-center relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-12">Backend Stack</h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto px-6">
            {["Node.js", "Python", "Go", "Java", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "Google Cloud"].map((tech) => (
               <span key={tech} className="px-6 py-3 bg-[#31363F] rounded-full text-white font-bold tracking-wide border border-white/5 hover:border-emerald-400 cursor-pointer transition-colors shadow-lg">
                 {tech}
               </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="w-full bg-gradient-to-r from-teal-900 to-[#222831] rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row shadow-2xl relative overflow-hidden text-white min-h-[320px]">
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Scale without limits</h2>
              <p className="text-white/80 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed">
                Whether you're dealing with concurrent data processing or cloud migrations, we can architect the perfect backend.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-emerald-400 w-fit shrink-0 shadow-lg"
              >
                Discuss backend needs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
