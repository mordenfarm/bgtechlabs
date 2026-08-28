import { Seo } from "../components/Seo";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    title: "Team Augmentation",
    description: "We provide experts or teams tailored to your project, ensuring skill and compatibility with your goals and culture. They will collaborate closely, infusing fresh energy and ideas.",
    tags: ["Cultural fit", "Top 1%", "Instant hire"],
    icon: (
      <div className="w-full h-full flex items-center justify-center">
         <img src="/team_aug.png" alt="Team Augmentation" className="w-[100px] h-full object-contain" />
      </div>
    )
  },
  {
    title: "AI Development",
    description: "Our team is experienced in AI, data analysis, and machine learning, implementing cutting-edge technologies.",
    tags: ["LLM", "Tensorflow", "NLP", "Computer vision"],
    icon: (
      <div className="w-full h-full flex items-center justify-center">
         <img src="/aidevlopment.png" alt="AI Development" className="w-[100px] h-full object-contain" />
      </div>
    )
  },
  {
    title: "Frontend Development",
    description: "We are experienced in building modular, high-performance web applications for corporate clients and startups. We utilize modern and robust technology stacks.",
    tags: ["React", "Angular", "Electron", "Vue.js"],
    icon: (
      <div className="w-full h-full flex items-center justify-center">
         <img src="/frontend.png" alt="Frontend Development" className="w-[100px] h-full object-contain" />
      </div>
    )
  },
  {
    title: "Mobile Development",
    description: "We specialize in developing the following native and cross-platform mobile applications for iOS and Android.",
    tags: ["Swift", "Flutter", "Java", "Kotlin", "React Native"],
    icon: (
      <div className="w-full h-full flex items-center justify-center">
         <img src="/mobiledev.png" alt="Mobile Development" className="w-[100px] h-full object-contain" />
      </div>
    )
  },
  {
    title: "Backend Development",
    description: "We are experienced in high-load and complex backend infrastructure development for mobile or web apps and enterprise services.",
    tags: ["Node.js", "Go", "Python", "PHP"],
    icon: (
      <div className="w-full h-full flex items-center justify-center">
         <img src="/backenddev.png" alt="Backend Development" className="w-[100px] h-full object-contain" />
      </div>
    )
  },
  {
    title: "Web Development",
    description: "Our developers can create bespoke web solutions that are tailored to your needs, easy to manage with popular CMS, and which can be combined with your existing internal systems.",
    tags: ["Sitecore", "Contentful", "Magento"],
    icon: (
      <div className="w-full h-full flex items-center justify-center">
         <img src="/webdeve.png" alt="Web Development" className="w-[100px] h-full object-contain" />
      </div>
    )
  }
];

const successStories = [
  {
    company: "Archrival",
    tags: ["Internal Reporting", "Enterprise"],
    title: "Streamlined internal reporting processes ensuring reliable data flow.",
    visualColor: "from-blue-400 via-indigo-400 to-purple-300",
    visualText: "Data flowing seamlessly.",
    bgClass: "bg-[#f0f9ff]",
    borderClass: "border-[#e0f2fe]",
    rightBgClass: "bg-[#e0f2fe]",
    logoInitial: "A"
  },
  {
    company: "AlphaOctal Systems",
    tags: ["Operations", "Corporate"],
    title: "Delivered incredibly smooth system operations with unmatched dedication.",
    visualColor: "from-emerald-400 via-teal-400 to-cyan-300",
    visualText: "Operating at peak performance.",
    bgClass: "bg-[#f0fdf4]",
    borderClass: "border-[#dcfce7]",
    rightBgClass: "bg-[#dcfce7]",
    logoInitial: "A"
  },
  {
    company: "Circle of Hope Academy",
    tags: ["Web App", "Education"],
    title: "Developed a highly intuitive and responsive web application for students.",
    visualColor: "from-rose-400 via-pink-400 to-fuchsia-300",
    visualText: "Empowering modern education.",
    bgClass: "bg-[#fff1f2]",
    borderClass: "border-[#ffe4e6]",
    rightBgClass: "bg-[#ffe4e6]",
    logoInitial: "C"
  },
  {
    company: "Sapphire Surgery",
    tags: ["Digital Presence", "Healthcare"],
    title: "Transformed their digital presence and optimized online processes.",
    visualColor: "from-sky-400 via-blue-400 to-indigo-300",
    visualText: "Precision in digital healthcare.",
    bgClass: "bg-[#f8fafc]",
    borderClass: "border-[#f1f5f9]",
    rightBgClass: "bg-[#f1f5f9]",
    logoInitial: "S"
  },
  {
    company: "ServiceLoop",
    tags: ["Sales Pipeline", "B2B"],
    title: "Built a robust solution to manage their sales pipeline with flawless integration.",
    visualColor: "from-amber-400 via-yellow-400 to-orange-300",
    visualText: "Closing the loop on sales.",
    bgClass: "bg-[#fffbeb]",
    borderClass: "border-[#fef3c7]",
    rightBgClass: "bg-[#fef3c7]",
    logoInitial: "S"
  }
];

export function Services() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const prevStory = () => {
    setActiveStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };
  const nextStory = () => {
    setActiveStoryIndex((prev) => (prev + 1) % successStories.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredServices = servicesList.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Seo title="Our Services | Blackgift Tech Labs" description="Explore our specialized services and enterprise software products." />

      {/* Hero Section with Blurred Gradient Background */}
      <section className="relative w-full overflow-hidden pt-28 pb-10 min-h-screen bg-[#fcfbfa]">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[800px] pointer-events-none opacity-40 mix-blend-multiply" style={{ filter: 'blur(100px)' }}>
          <div className="absolute top-10 left-[20%] w-[40%] h-[60%] bg-[#ffe0b2] rounded-full"></div>
          <div className="absolute top-0 right-[20%] w-[30%] h-[80%] bg-[#bbdefb] rounded-full"></div>
          <div className="absolute -bottom-10 left-[40%] w-[50%] h-[50%] bg-[#e3f2fd] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="w-full bg-[#0d141e] rounded-[24px] overflow-hidden flex flex-col md:flex-row relative shadow-lg h-auto md:h-[220px]">
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center md:items-center relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                How can we help?
              </h2>
              <div className="w-full max-w-[420px] relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Explore Blackgift Tech Labs' Help Center" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f1f3f5] text-gray-900 font-medium rounded-md py-3.5 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                />
                <button className="absolute right-1.5 bg-[#212529] hover:bg-black transition-colors rounded-md w-10 h-10 flex items-center justify-center text-white">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 h-48 md:h-full relative z-10 overflow-hidden hidden md:block">
              {/* Gradient fade to blend image with background */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d141e] to-transparent z-10"></div>
              <img 
                src="/astronaut_pink_planet.jpg" 
                alt="Help Center Astronaut" 
                className="w-full h-full object-cover object-right-top"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-24"
          >
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 tracking-tight leading-tight">
              Our services
            </h1>
          </motion.div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No services found matching "{searchQuery}"</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-20">
              {filteredServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-[5px] p-5 lg:p-6 shadow-sm border border-white/50 flex flex-col group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 flex-1 pr-4">{service.title}</h3>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                  </div>
                </div>

                <p className="text-gray-600 text-[15px] leading-relaxed mb-4 flex-1 min-h-0">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <Link 
                    to="/contact" 
                    className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm transition-colors"
                  >
                    Let's chat <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-white border border-gray-200 hover:border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold text-sm transition-colors text-center"
                  >
                    Learn more
                  </Link>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Banner */}
      <section className="w-full bg-[#1b0e1e] py-16 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden lg:grid max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid-cols-5 gap-8 text-white">
          {[
            { img: "/teamwork.png", title: "Team\nAugmentation" },
            { img: "/aidev.png", title: "AI\nDevelopment" },
            { img: "/fontenddesign.png", title: "Frontend\nDevelopment" },
            { img: "/appdev.png", title: "Mobile\nDevelopment" },
            { img: "/webdev.png", title: "Web\nDevelopment" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-4">
               <div className="h-16 w-16 flex items-center justify-center">
                 <img src={item.img} alt={item.title.replace('\n', ' ')} className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
               </div>
               <p className="font-bold text-base leading-tight whitespace-pre-line">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Mobile View (Infinite Rail) */}
        <div className="lg:hidden w-full flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
            className="flex w-max"
          >
            {[
              { img: "/teamwork.png", title: "Team\nAugmentation" },
              { img: "/aidev.png", title: "AI\nDevelopment" },
              { img: "/fontenddesign.png", title: "Frontend\nDevelopment" },
              { img: "/appdev.png", title: "Mobile\nDevelopment" },
              { img: "/webdev.png", title: "Web\nDevelopment" },
              { img: "/teamwork.png", title: "Team\nAugmentation" },
              { img: "/aidev.png", title: "AI\nDevelopment" },
              { img: "/fontenddesign.png", title: "Frontend\nDevelopment" },
              { img: "/appdev.png", title: "Mobile\nDevelopment" },
              { img: "/webdev.png", title: "Web\nDevelopment" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4 w-[160px] sm:w-[200px] shrink-0 text-white">
                 <div className="h-12 w-12 flex items-center justify-center">
                   <img src={item.img} alt={item.title.replace('\n', ' ')} className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                 </div>
                 <p className="font-bold text-sm leading-tight whitespace-pre-line">{item.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="w-full bg-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight mb-6 md:mb-0">
              Success stories of our clients
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={prevStory}
                className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextStory}
                className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slider Container */}
          <div className={`w-full ${successStories[activeStoryIndex].bgClass} rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-sm border ${successStories[activeStoryIndex].borderClass} transition-colors duration-500`}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStoryIndex}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 transition={{ duration: 0.4 }}
                 className="flex flex-col md:flex-row w-full"
               >
                 {/* Left Content */}
                 <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-8 h-8 bg-gray-900 rounded-full text-white flex items-center justify-center font-bold font-serif italic text-lg">{successStories[activeStoryIndex].logoInitial}</div>
                      <span className="font-bold text-gray-900 text-2xl tracking-widest uppercase">{successStories[activeStoryIndex].company}</span>
                    </div>
                    
                    <div className="flex gap-2 mb-8">
                      {successStories[activeStoryIndex].tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full border border-gray-900/10 text-gray-600 text-xs font-semibold">{tag}</span>
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-gray-900 leading-tight">
                      {successStories[activeStoryIndex].title}
                    </h3>
                 </div>

                 {/* Right Visual */}
                 <div className={`w-full md:w-1/2 relative ${successStories[activeStoryIndex].rightBgClass} h-[300px] md:h-auto min-h-[400px] transition-colors duration-500`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] rounded-[24px] shadow-2xl overflow-hidden transform rotate-[-2deg] bg-gradient-to-br ${successStories[activeStoryIndex].visualColor} p-6 flex flex-col gap-4`}>
                       <div className="w-full h-8 bg-white/40 backdrop-blur rounded flex items-center px-4">
                          <div className="w-16 h-3 bg-white/60 rounded-full"></div>
                       </div>
                       <div className="w-3/4 text-3xl md:text-4xl font-serif text-white leading-tight font-bold">{successStories[activeStoryIndex].visualText}</div>
                       <div className="w-24 h-8 bg-black/40 rounded-full mt-4 mt-auto backdrop-blur"></div>
                    </div>
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Case Studies Banner */}
      <section className="w-full bg-white pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px] mx-auto rounded-[30px] bg-gradient-to-r from-[#ff8c00] to-[#ff0080] py-16 px-8 flex flex-col md:flex-row items-center justify-center md:gap-10 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 opacity-50 block filter blur-[60px] top-1/4 left-1/4 w-1/2 h-1/2" />
          <h2 className="text-2xl md:text-3xl font-bold text-white relative z-10 mb-6 md:mb-0">
            See more our amazing case studies
          </h2>
          <Link 
            to="/portfolio"
            className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors relative z-10 shadow-lg text-sm"
          >
            See more cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Let's build something great together (Contact Section) */}
      <section className="w-full bg-[#5200ff] pt-24 pb-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 lg:gap-24">
           
           {/* Left side */}
           <div className="w-full lg:w-[45%]">
             <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6">
               Let's build something<br/>great together
             </h2>
             <p className="text-purple-100 text-lg leading-relaxed mb-16 max-w-lg">
               We believe in turning ideas into reality and we're ready to join your journey. Reach out to us and let's start discussing your project.
             </p>
             <div className="flex items-center text-purple-400 font-bold text-6xl opacity-50 relative pointer-events-none">
                <span className="font-serif italic lowercase tracking-tighter">d.</span>
             </div>
           </div>

           {/* Right side form */}
           <div className="w-full lg:w-[55%] relative z-10">
             <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                
                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">First name</label>
                  <input type="text" className="w-full bg-transparent border border-[#F5DEB3] hover:border-[#F5DEB3]/80 focus:border-[#F5DEB3] transition-colors rounded-[5px] px-4 py-3 outline-none text-[#F5DEB3] focus:bg-[#F5DEB3]/10" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Last name</label>
                  <input type="text" className="w-full bg-transparent border border-[#F5DEB3] hover:border-[#F5DEB3]/80 focus:border-[#F5DEB3] transition-colors rounded-[5px] px-4 py-3 outline-none text-[#F5DEB3] focus:bg-[#F5DEB3]/10" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-white font-semibold text-sm">Company name (optional)</label>
                  <input type="text" className="w-full bg-transparent border border-[#F5DEB3] hover:border-[#F5DEB3]/80 focus:border-[#F5DEB3] transition-colors rounded-[5px] px-4 py-3 outline-none text-[#F5DEB3] focus:bg-[#F5DEB3]/10" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Work email</label>
                  <input type="email" className="w-full bg-transparent border border-[#F5DEB3] hover:border-[#F5DEB3]/80 focus:border-[#F5DEB3] transition-colors rounded-[5px] px-4 py-3 outline-none text-[#F5DEB3] focus:bg-[#F5DEB3]/10" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white font-semibold text-sm">Phone number</label>
                  <input type="tel" className="w-full bg-transparent border border-[#F5DEB3] hover:border-[#F5DEB3]/80 focus:border-[#F5DEB3] transition-colors rounded-[5px] px-4 py-3 outline-none text-[#F5DEB3] focus:bg-[#F5DEB3]/10" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-white font-semibold text-sm">Tell us about your project (optional)</label>
                  <textarea rows={4} className="w-full bg-transparent border border-[#F5DEB3] hover:border-[#F5DEB3]/80 focus:border-[#F5DEB3] transition-colors rounded-[5px] px-4 py-3 outline-none text-[#F5DEB3] resize-none focus:bg-[#F5DEB3]/10"></textarea>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6 mt-4">
                  <button type="submit" className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-black/10 shrink-0 w-full md:w-auto">
                    Send request <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-purple-300 text-xs leading-relaxed max-w-xs">
                    By sending this form I confirm that I have read and accept the <Link to="/privacy" className="text-white underline hover:text-purple-100">Privacy Policy</Link>.
                  </p>
                </div>

             </form>
           </div>
        </div>
      </section>
    </>
  );
}
