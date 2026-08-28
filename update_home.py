with open("src/pages/Home.tsx", "r") as f:
    content = f.read()

injection = """
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
              <GraduationCap className="w-24 h-24 text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
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
              <ShieldCheck className="w-24 h-24 text-red-500 relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#1a1528] font-bold text-[17px] text-center pb-2">Saviour</h3>
          </motion.div>

          {/* Card 3: Vibe Code */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-3 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center mb-5 overflow-hidden relative shadow-inner">
              <Code2 className="w-24 h-24 text-purple-600 relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#1a1528] font-bold text-[17px] text-center pb-2">Vibe Code</h3>
          </motion.div>

          {/* Card 4: Zimsec Hub */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-3 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-full aspect-square rounded-[20px] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center mb-5 overflow-hidden relative shadow-inner">
              <BookOpen className="w-24 h-24 text-emerald-600 relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-[#1a1528] font-bold text-[17px] text-center pb-2">Zimsec Hub</h3>
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
"""

content = content.replace("      {/* ── Standard Page Content Grid ── */}", injection + "\n      {/* ── Standard Page Content Grid ── */}")

with open("src/pages/Home.tsx", "w") as f:
    f.write(content)
