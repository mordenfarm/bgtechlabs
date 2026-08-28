import { Seo } from "../components/Seo";
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle2, Lightbulb, CheckCircle, Smartphone, Code, Cpu, LineChart, Globe, Zap, LayoutTemplate, Activity, Users, Shield, ArrowUpRight } from 'lucide-react';

export function About() {
  const team = [
    {
      name: 'P. Tinashe Kunyadini',
      role: 'CEO',
      image: '/tinashe.jpg'
    },
    {
      name: 'Haward C Manyuchi',
      role: 'Director',
      image: '/haward.png'
    }
  ];

  const goals = [
    "Providing scalable software solutions",
    "Building Trust and reliability",
    "Enhancing User Engagement",
    "Community Involvement",
    "Promoting Tech Education",
    "Security and Privacy first"
  ];

  const visions = [
    { num: "001", title: "Path to Innovation", desc: "Our vision is to empower businesses through personalized technological care and strategy." },
    { num: "002", title: "Cloud Services", desc: "Scalable cloud architectures ensuring uptime and robust data management capabilities." },
    { num: "003", title: "Diagnostic Services", desc: "Rigorous code reviews and tests used to identify technical debt and vulnerabilities." },
    { num: "004", title: "Beyond Code", desc: "We are ready to serve you with pleasure, rapid responses, and dedicated support." },
    { num: "005", title: "Agile Development", desc: "Comprehensive iteration services for startups, enterprises, and independent projects." },
    { num: "006", title: "Remote Workflows", desc: "Remote consultations, daily standups, and transparent follow-up appointments via video." },
    { num: "007", title: "Future of Product", desc: "We are ready to serve you with futuristic implementations avoiding legacy pitfalls." },
    { num: "008", title: "Holistic Architecture", desc: "Holistic development is an approach to technical well-being that considers long-term scale." },
  ];

  return (
    
    <div className="w-full flex flex-col font-sans bg-[#FBFBFC] text-[#111111] overflow-hidden">
      <Seo title="About Us | Blackgift Tech Labs" description="Learn about Blackgift Tech Labs, our team, and our mission." />
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Abstract pink gradient background centered behind text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#ffc4f4]/40 via-[#e0c3fc]/20 to-transparent blur-[100px] rounded-full pointer-events-none z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 border border-purple-200 text-purple-600 bg-white rounded-full px-4 py-1.5 text-sm font-medium mb-8 shadow-sm">
            <Star className="w-4 h-4 fill-current" />
            About Us
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#1a1528] mb-6 leading-[1.1] max-w-[900px]">
            Discover Our Mission and Values in Innovative Tech Solutions
          </h1>
          
          <p className="text-gray-500 text-lg max-w-2xl mb-10 font-medium">
            We are dedicated to providing exceptional software services through a collaborative, client-centered approach.
          </p>
          
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#ab5af6] hover:bg-[#9745e8] text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg shadow-purple-500/20 mb-20 z-10">
            Contact us <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Hero Image Layout */}
        <div className="relative w-full max-w-[1300px] flex justify-center items-center gap-6 z-10">
          {/* Left partial image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="w-1/4 h-[400px] md:h-[500px] rounded-[40px] overflow-hidden hidden md:block"
          >
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" className="w-full h-full object-cover" alt="Team meeting" />
          </motion.div>

          {/* Center main image */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 h-[400px] md:h-[500px] rounded-[40px] overflow-hidden relative shadow-2xl"
          >
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" className="w-full h-full object-cover" alt="Collaboration" />
            
            {/* Overlays */}
            <div className="absolute right-6 bottom-20 flex flex-col gap-3">
              <div className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg">
                <span className="font-bold">100%</span> Fast Delivery
              </div>
              <div className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg">
                <span className="font-bold">90%</span> Satisfied Clients
              </div>
            </div>
            
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl hidden md:flex">
              <ArrowUpRight className="w-8 h-8 text-gray-900" />
            </div>
          </motion.div>

          {/* Right partial image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="w-1/4 h-[400px] md:h-[500px] rounded-[40px] overflow-hidden hidden md:block"
          >
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069" className="w-full h-full object-cover" alt="Developer" />
          </motion.div>
        </div>
      </section>

      {/* Trusted Provider Section */}
      <section className="py-20 px-6 max-w-[1300px] mx-auto w-full">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left text column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="bg-transparent rounded-[40px] p-8 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-medium text-[#1a1528] leading-[1.1] tracking-tight mb-6">
                Your Trusted<br/>Technology<br/>Partner
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
                Blackgift Tech Labs was born in the heart of Masvingo Hillside in 2019, starting as a passion project helping students and enthusiasts build custom software. We've grown into a full tech startup working with ambitious minds — bringing rigorous engineering to every engagement.
              </p>
              <Link to="/contact" className="inline-flex items-center justify-between bg-[#ab5af6] hover:bg-[#9745e8] text-white px-8 py-4 rounded-full font-medium transition-colors w-fit shadow-lg shadow-purple-500/20">
                <span>Make a schedule</span>
                <ArrowRight className="w-5 h-5 ml-4" />
              </Link>
            </motion.div>

            {/* Middle app column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-[#ab5af6] to-[#8031e0] rounded-[40px] p-8 pb-0 flex flex-col relative overflow-hidden h-[450px]">
               <h3 className="text-white text-2xl font-medium mb-3 relative z-10">Very fast and accurate service with us</h3>
               <p className="text-white/80 text-sm max-w-[250px] relative z-10 mb-8">
                 Connect with our professional engineers who are ready to help you build your digital product.
               </p>
               {/* Faux App UI */}
               <div className="bg-white rounded-t-3xl w-full flex-1 flex flex-col p-6 shadow-2xl relative z-10 overflow-hidden transform translate-y-4">
                  <div className="flex justify-between items-center mb-6 text-gray-900">
                    <p className="font-bold text-lg">Hi, Customer</p>
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-5 text-white flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <span className="text-xs font-medium uppercase tracking-wider">Milestone</span>
                    <p className="font-bold text-sm">Target Sprint Beta</p>
                    <p className="text-xs text-white/80">Active Phase</p>
                  </div>
               </div>
            </motion.div>

            {/* Right stats column */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
               className="bg-white rounded-[40px] p-8 flex flex-col h-[450px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
               <h3 className="text-[#1a1528] text-2xl font-medium mb-3">Analysis your project performance <span className="text-gray-500">from anywhere</span></h3>
               <p className="text-gray-500 text-sm mb-12">
                 Real-time progress tracking, code metrics, and sprint deliveries.
               </p>
               
               <div className="flex items-end justify-between px-4 mt-auto">
                 {/* Fake bar charts */}
                 <div className="flex flex-col items-center gap-3">
                   <img src="https://ui-avatars.com/api/?name=Martin&background=0D8ABC&color=fff" className="w-10 h-10 rounded-full" alt="User" />
                   <div className="w-6 h-32 bg-emerald-400 rounded-full"></div>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                   <img src="https://ui-avatars.com/api/?name=Alex&background=FF8A65&color=fff" className="w-10 h-10 rounded-full" alt="User" />
                   <div className="w-6 h-16 bg-blue-400 rounded-full"></div>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                   <img src="https://ui-avatars.com/api/?name=Sarah&background=FFB300&color=fff" className="w-10 h-10 rounded-full" alt="User" />
                   <div className="w-6 h-20 bg-pink-400 rounded-full"></div>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                   <img src="https://ui-avatars.com/api/?name=John&background=4CAF50&color=fff" className="w-10 h-10 rounded-full" alt="User" />
                   <div className="w-6 h-24 bg-amber-400 rounded-full"></div>
                 </div>
               </div>
            </motion.div>
         </div>

         {/* Stats Row */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
               className="bg-white rounded-[32px] p-8 flex flex-col justify-between h-[160px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
               <div className="flex justify-between items-start">
                 <h4 className="text-4xl font-medium text-[#1a1528] tracking-tight">• 100%</h4>
                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                   <CheckCircle2 className="w-6 h-6" />
                 </div>
               </div>
               <div className="flex justify-between items-end">
                 <p className="text-gray-500 font-medium font-serif text-lg">• Our Devs Certified</p>
                 <span className="text-gray-200 font-bold text-3xl font-mono">001</span>
               </div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
               className="bg-white rounded-[32px] p-8 flex flex-col justify-between h-[160px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
               <div className="flex justify-between items-start">
                 <h4 className="text-4xl font-medium text-[#1a1528] tracking-tight">• 50+</h4>
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                   <Globe className="w-6 h-6" />
                 </div>
               </div>
               <div className="flex justify-between items-end">
                 <p className="text-gray-500 font-medium font-serif text-lg">• Happy global clients</p>
                 <span className="text-gray-200 font-bold text-3xl font-mono">002</span>
               </div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
               className="bg-white rounded-[32px] p-8 flex flex-col justify-between h-[160px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
               <div className="flex justify-between items-start">
                 <h4 className="text-4xl font-medium text-[#1a1528] tracking-tight">• 99%</h4>
                 <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                   <Activity className="w-6 h-6" />
                 </div>
               </div>
               <div className="flex justify-between items-end">
                 <p className="text-gray-500 font-medium font-serif text-lg">• Satisfying deployment</p>
                 <span className="text-gray-200 font-bold text-3xl font-mono">003</span>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Main Goal Section */}
      <section className="py-20 px-6 max-w-[1300px] mx-auto w-full">
         <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-white rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-medium text-[#1a1528] leading-[1.1] tracking-tight mb-8">
                Let's know about our main goal
              </h2>
              <p className="text-gray-500 text-lg mb-12">
                At Blackgift Tech Labs, our mission is to innovate and evolve, crafting digital solutions that withstand the test of time. We're dedicated to fostering honest client relationships, providing tailored strategies and cutting-edge technology solutions across diverse domains.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                {goals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 shrink-0" />
                    <span className="text-[#1a1528] font-medium">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-end">
               <img 
                 src="/banner.png" 
                 alt="Engineer explaining" 
                 className="w-full max-w-[500px] h-[500px] object-cover rounded-3xl"
               />
            </div>
         </motion.div>
      </section>

      {/* Meet Our Expert Team */}
      <section className="py-24 px-6 max-w-[1300px] mx-auto w-full bg-[#FBFBFC]">
         <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-[#1a1528] tracking-tight mb-4">Meet our expert team</h2>
            <p className="text-gray-500 font-medium">We aim to share information about our talented engineers</p>
         </motion.div>

         <div className="flex flex-col md:flex-row justify-center gap-6 max-w-3xl mx-auto">
           {team.map((member, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                key={i} className={`bg-white rounded-[40px] p-4 pb-8 flex flex-col items-center w-full md:w-1/2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50`}>
                <div className={`w-full aspect-square rounded-[32px] overflow-hidden mb-6 bg-gray-100`}>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1528] mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{member.role}</p>
                <div className="flex gap-2">
                  <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 border border-gray-100 hover:bg-gray-100 cursor-pointer text-sm">in</span>
                  <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 border border-gray-100 hover:bg-gray-100 cursor-pointer text-sm">ig</span>
                  <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 border border-gray-100 hover:bg-gray-100 cursor-pointer text-sm">x</span>
                </div>
              </motion.div>
           ))}
         </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-6 max-w-[1300px] mx-auto w-full">
         <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-[#1a1528] tracking-tight mb-4">Here are some key vision</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">We are committed to upholding the highest standards of technical excellence while ensuring each client feels valued and heard.</p>
         </motion.div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {visions.map((vision, i) => (
             <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
               key={i} className="bg-white rounded-[32px] p-8 flex flex-col items-start shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="flex w-full justify-between items-center mb-6">
                 <span className="text-gray-300 font-mono text-sm">{vision.num}</span>
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shadow-inner">
                   <Lightbulb className="w-5 h-5 text-gray-600" />
                 </div>
               </div>
               <h3 className="text-[#1a1528] font-medium text-xl mb-3">{vision.title}</h3>
               <p className="text-gray-500 text-sm leading-relaxed">{vision.desc}</p>
             </motion.div>
           ))}
         </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-12 px-6 max-w-[1300px] mx-auto w-full mb-20">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-[#ab5af6] rounded-[48px] p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden shadow-2xl shadow-purple-500/30">
            {/* Abstract background shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-10 max-w-3xl relative z-10 leading-[1.1]">
              Bring your digital products to the next level of excellence.
            </h2>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-[#ab5af6] hover:bg-gray-50 px-8 py-4 rounded-full font-medium transition-colors relative z-10 shadow-lg">
              Make a schedule
              <div className="w-8 h-8 rounded-full bg-[#ab5af6] flex items-center justify-center text-white ml-2">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
         </motion.div>
      </section>

    </div>
  );
}
