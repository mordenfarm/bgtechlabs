import { Seo } from "../../components/Seo";
import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Server,
  Monitor,
  LayoutDashboard,
  Users,
  Code2,
  Workflow,
  Zap,
  CheckCircle2,
  Apple,
  MessageSquare,
  FileCode2,
  Cloud,
  Box,
  Settings,
  Database,
  BarChart,
  Target,
} from "lucide-react";

const techStack = {
  mobile: [
    { name: "Swift", icon: "/swiftlogo.png" },
    { name: "Java", icon: "/Java-Logo.png" },
    { name: "React Native", icon: "/react-native.png" },
    { name: "Kotlin", icon: "/kotlin-logo-png_seeklogo-324932.png" },
    { name: "Flutter", icon: "/flutter-logo-png_seeklogo-349577.png" },
    { name: "Objective C", icon: "/objective-c.webp" },
  ],
  backend: [
    { name: "Node.js", icon: "/nodejs.jpg" },
    { name: "Nest.js", icon: "/nestjs.png" },
    { name: "Express", icon: "/express-js.png" },
    { name: "PHP", icon: "/php.png" },
    { name: "Python", icon: "/py.png" },
  ],
  devops: [
    { name: "Docker", icon: "/docker.png" },
    { name: "Kubernetes", icon: "/kubernetes.png" },
    { name: "AWS", icon: "/aws.png" },
    { name: "Azure", icon: "/azure.png" },
    { name: "Google Cloud", icon: "/google-cloud.webp" },
  ],
  ai: [
    { name: "OpenAI GPT", icon: "/ChatGPT-Logo.png" },
    { name: "Llama", icon: "/llma.png" },
    { name: "Anthropic", icon: "/anthropic.svg" },
    { name: "Gemini", icon: "/gemini.webp" },
    { name: "Hugging Face", icon: "/huggingface.png" },
    { name: "Hailuo AI", icon: "/hailuoai.jpeg" },
  ],
  qa: [
    { name: "Selenium", icon: "/Selenium.png" },
    { name: "Appium", icon: "/appium.png" },
    { name: "Cypress", icon: "/cypres.png" },
    { name: "JUnit", icon: "/junit.webp" },
    { name: "pytest", icon: "/pytest.png" },
  ],
};

const projectApproaches = [
  {
    title: "Mobile-only",
    desc: "Our team can fully develop and maintain your iOS and Android mobile applications, or we can collaborate with your project team in a joint development effort.",
    icon: <Smartphone className="w-12 h-12 text-rose-500" />,
  },
  {
    title: "Mobile + backend",
    desc: "When you need to develop a backend solution to support your mobile app, our backend engineering team is ready to help.",
    icon: <Server className="w-12 h-12 text-rose-500" />,
  },
  {
    title: "Web version",
    desc: "If you need a web application along with your mobile app, our front-end team will help you achieve your goals.",
    icon: <Monitor className="w-12 h-12 text-rose-500" />,
  },
  {
    title: "Admin panel",
    desc: "We design and develop easy-to-use admin panels for mobile and web apps, using popular UI solutions that are reliable and easy to support and extend.",
    icon: <LayoutDashboard className="w-12 h-12 text-rose-500" />,
  },
];

const benefits = [
  {
    title: "Dedicated and Experienced Teams",
    desc: "With Diffco, you can expect senior expert developers, designers, project managers. These teams are not only leaders in their field but are already attuned to working together. When you work with us, you can leverage this synergy to your advantage.",
    icon: <Users className="w-12 h-12 text-indigo-600" />,
  },
  {
    title: "Streamlined Development Process",
    desc: "Agile project management will keep you in the loop, providing useful feedback during every iteration of your project.",
    icon: <Workflow className="w-12 h-12 text-indigo-600" />,
  },
  {
    title: "Transparent Billing",
    desc: "You will always know what to expect and never face any surprises in the billing department. Understand your charges, both what you're paying for and why.",
    icon: <BarChart className="w-12 h-12 text-indigo-600" />,
  },
  {
    title: "Clear Communication and Detailed Reporting",
    desc: "From the moment we first connect to the moment we deliver exactly what you need, you'll have all the information you need to keep your finger on the pulse of your project.",
    icon: <MessageSquare className="w-12 h-12 text-indigo-600" />,
  },
];

export function MobileDevelopment() {
  return (
    <>
      <Seo title="Mobile App Development | Blackgift Tech Labs" description="Native and cross-platform mobile app development for iOS and Android" />

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] bg-[#1a1a1a] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <Link
          to="/services"
          className="absolute top-24 left-6 lg:left-16 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Services</span>
        </Link>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="w-full  px-6 lg:px-16 relative z-10 text-center lg:text-left pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight lg:max-w-4xl"
          >
            <span className="text-yellow-400">Native</span> and cross-platform
            mobile{" "}
            <span className="text-rose-500">
              app development for iOS and Android
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 mb-10 lg:max-w-3xl leading-relaxed"
          >
            Our mobile development team is fluent in the mobile guidelines, UI
            standards, and best practices of Apple and Google. With our
            extensive experience, we manage every detail to make your apps
            powerful, user-friendly, and successful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-fuchsia-600 to-red-500 text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Let's chat <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          {/* Cards under hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-24"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center text-white flex flex-col items-center justify-center gap-3 hover:bg-white/15 transition-colors">
              <Apple className="w-8 h-8" />
              <span className="font-semibold">Native iOS</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center text-white flex flex-col items-center justify-center gap-3 hover:bg-white/15 transition-colors">
              <Smartphone className="w-8 h-8" />
              <span className="font-semibold">Native Android</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center text-white flex flex-col items-center justify-center gap-3 hover:bg-white/15 transition-colors">
              <Code2 className="w-8 h-8" />
              <span className="font-semibold">React Native</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Approaches */}
      <section className="w-full py-24 bg-white">
        <div className="w-full  px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Project Approaches
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-12">
            {/* Left tall card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 group relative overflow-hidden rounded-[32px] bg-[#1c0f2e] flex flex-col min-h-[520px] cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
                  alt={projectApproaches[0].title}
                  className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c0f2e] via-[#1c0f2e]/60 to-transparent" />
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full text-white">
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 text-[11px] font-semibold tracking-wide w-fit mb-auto">
                  Mobile Only
                </span>
                <div className="mt-auto">
                  <h3 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
                    {projectApproaches[0].title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-xs">
                    {projectApproaches[0].desc}
                  </p>
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-gray-900" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right stacked cards */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {projectApproaches.slice(1).map((item, i) => {
                const bgs = [
                  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
                ];
                const overlays = ["#00477a", "#1a1a1a", "#0f3460"];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-[28px] flex flex-row min-h-[155px] cursor-pointer"
                    style={{ background: overlays[i] }}
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={bgs[i]}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    </div>
                    <div className="relative z-10 p-7 flex flex-col justify-between text-white flex-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 text-[11px] font-semibold tracking-wide w-fit mb-3">
                        {["Mobile + Backend", "Web Version", "Admin Panel"][i]}
                      </span>
                      <div>
                        <h3 className="text-xl font-extrabold mb-1 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed max-w-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                     
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-fuchsia-600 to-red-500 text-white font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Request a quote{" "}
              <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="w-full py-24 bg-white border-t border-gray-100">
        <div className="w-full  px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            Technical stack
          </h2>

          <div className="flex flex-col gap-12">
            {Object.entries(techStack).map(([category, items], i) => (
              <div key={category}>
                <h3 className="text-xl font-bold text-gray-900 mb-6 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-x-8 gap-y-12 sm:gap-x-12 md:gap-x-20 lg:gap-x-32 items-start">
                  {items.map((item, j) => (
                    <motion.div
                      key={j}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: j * 0.2,
                      }}
                      className="group flex flex-col items-center justify-start cursor-pointer w-24"
                    >
                      <div className="w-24 h-24 shrink-0 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border border-gray-50 transition-transform duration-300 group-hover:scale-110 p-4">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="mt-5 flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-800 text-center">
                          {item.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  <div className="group flex flex-col items-center justify-start cursor-pointer w-24">
                    <button className="w-24 h-24 shrink-0 rounded-full bg-white shadow-lg flex flex-col items-center justify-center border border-gray-50 hover:bg-gray-50 transition-colors self-start">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </button>
                    <div className="mt-5 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-800 text-center">
                        Show more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#f8f9fc] rounded-3xl p-10 text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Don't see the tech stack you are looking for?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl text-sm leading-relaxed">
              Our team has experience finding candidates for custom requirements
              and various tech stacks. Please contact us, and let's find you a
              perfect candidate.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-fuchsia-600 to-red-500 text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Let's chat <ArrowRight className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>



      {/* Project Stages and Flow */}
      <section className="w-full py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1c0f2e] tracking-tight mb-6">
              Project  Design Approach
            </h2>
            <p className="text-gray-600 max-w-2xl text-lg font-medium">
              Based on your current project stage, we will propose the most
              effective plan to achieve your objectives—within your timeframe
              and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {/* Stage 1: Initial Planning (Tall Left) */}
            <div className="lg:col-span-5 md:row-span-2 group relative overflow-hidden rounded-[32px] bg-[#3a373b] flex flex-col min-h-[550px] shadow-lg cursor-pointer">
              <div className="absolute inset-0 z-0 flex items-end">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" alt="Planning" className="w-full h-3/4 object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-b from-[#3a373b] via-[#3a373b]/90 to-transparent"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full text-white">
                <span className="inline-flex items-center justify-center px-4 py-1 rounded-full border border-white/40 text-xs font-semibold tracking-wide bg-transparent w-fit mb-8">
                  Stage 01
                </span>
                <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-none">
                  Initial stage
                </h3>
                <p className="text-white/80 text-lg leading-relaxed mb-auto max-w-sm font-medium">
                  We ensure your project's success with careful planning. We collaborate to align functionality, performance, and design before starting work.
                </p>
                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </div>

            {/* Stage 2: Design (Wide Top Right) */}
            <div className="lg:col-span-7 group relative overflow-hidden rounded-[32px] bg-[#00477a] flex flex-col md:flex-row min-h-[340px] shadow-lg cursor-pointer">
              <div className="absolute inset-0 z-0">
                 <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Design" className="w-full h-full object-cover object-right-top group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-r from-[#00477a] via-[#00477a]/90 to-transparent md:w-3/4"></div>
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full text-white w-full md:w-2/3">
                <span className="inline-flex items-center justify-center px-4 py-1 rounded-full border border-white/40 text-xs font-semibold tracking-wide bg-transparent w-fit mb-6">
                  Stage 02
                </span>
                <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight shadow-sm">
                  Design stage
                </h3>
                <p className="text-white/90 text-[17px] leading-relaxed mb-auto max-w-md font-medium">
                  After developing a prototype wireframe, our design team starts to create your application style with a full set of UI screens.
                </p>
                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5 text-[#00477a]" />
                </div>
              </div>
            </div>

            {/* Stage 3: Development & Support (Wide Bottom Right) */}
            <div className="lg:col-span-7 group relative overflow-hidden rounded-[32px] bg-[#53504e] flex flex-col md:flex-row min-h-[340px] shadow-lg cursor-pointer">
              <div className="absolute inset-0 z-0">
                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Development" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-r from-[#53504e] via-[#53504e]/90 to-transparent md:w-3/4"></div>
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full text-white w-full md:w-2/3">
                <span className="inline-flex items-center justify-center px-4 py-1 rounded-full border border-white/40 text-xs font-semibold tracking-wide bg-transparent w-fit mb-6">
                  Stage 03
                </span>
                <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight shadow-sm">
                  Development & Support
                </h3>
                <p className="text-white/90 text-[17px] leading-relaxed mb-auto max-w-md font-medium">
                  Progressive releases through Agile sprints and ongoing maintenance of the latest version with continuous iterations.
                </p>
                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5 text-[#53504e]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Development Formats */}
      <section className="w-full py-24 bg-white border-t border-gray-100">
        <div className="w-full  px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Development Formats and Billing
          </h2>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Time & Materials
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  An exceptional, user-friendly front-end environment requires
                  agile, flexible ideation, and an ability to pivot and adapt
                  according to changing needs. With our 'time and materials'
                  approach, you won't need to overpay for risk contingencies you
                  may not need.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Read our blog for a full analysis.
                </p>
              </div>
              <div className="flex-1 w-full lg:w-1/2 relative bg-[#fcfcfc] rounded-2xl p-6 border border-gray-100 flex items-center justify-center min-h-[300px]">
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <svg viewBox="0 0 400 200" className="w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="tmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d946ef" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                      <linearGradient id="tmFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d946ef" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                      </linearGradient>
                      <clipPath id="tmClip">
                        <motion.rect
                          x="0" y="0" height="200"
                          initial={{ width: 0 }}
                          whileInView={{ width: 400 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.8, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                    {/* Grid lines */}
                    {[40, 80, 120, 160].map(y => (
                      <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                    ))}
                    {/* Fill area */}
                    <path
                      d="M0,140 Q50,100 80,120 T160,80 T240,100 T320,60 T400,40 L400,200 L0,200 Z"
                      fill="url(#tmFill)"
                      clipPath="url(#tmClip)"
                    />
                    {/* Main curve */}
                    <path
                      d="M0,140 Q50,100 80,120 T160,80 T240,100 T320,60 T400,40"
                      fill="none"
                      stroke="url(#tmGrad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      clipPath="url(#tmClip)"
                    />
                    {/* Animated dot at end */}
                    <motion.circle
                      cx="400" cy="40" r="5"
                      fill="#ef4444"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.8, duration: 0.3 }}
                    />
                    {/* Y-axis labels */}
                    <text x="8" y="38" fontSize="10" fill="#9ca3af">High</text>
                    <text x="8" y="198" fontSize="10" fill="#9ca3af">Low</text>
                    <text x="0" y="215" fontSize="10" fill="#9ca3af">Start</text>
                    <text x="360" y="215" fontSize="10" fill="#9ca3af">Finish</text>
                  </svg>
                  <p className="text-center text-xs text-gray-400 mt-2 font-medium">Flexible cost over project timeline</p>
                </motion.div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Agile</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  We believe in Agile development. Agile front-end development
                  involves the use of a series of short sprints, which allow for
                  quick and transparent progress in your project. We apply our
                  nimble and responsive ideologies to each front-end project.
                  Rather than relying on the restrictive linear Waterfall
                  approach, Agile ensures we can provide a flexible service
                  resulting in a custom front-end solution, which earns your
                  approval at every stage.
                </p>
              </div>
              <div className="flex-1 w-full lg:w-1/2 relative bg-[#fcfcfc] rounded-2xl p-6 border border-gray-100 flex items-center justify-center min-h-[300px]">
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <svg viewBox="0 0 400 220" className="w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <clipPath id="agileClip">
                        <motion.rect
                          x="0" y="0" height="220"
                          initial={{ width: 0 }}
                          whileInView={{ width: 400 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.8, ease: "easeInOut" }}
                        />
                      </clipPath>
                      <clipPath id="waterfallClip">
                        <motion.rect
                          x="0" y="0" height="220"
                          initial={{ width: 0 }}
                          whileInView={{ width: 400 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                        />
                      </clipPath>
                    </defs>
                    {/* Grid */}
                    {[40, 80, 120, 160].map(y => (
                      <line key={y} x1="30" y1={y} x2="400" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                    ))}
                    <line x1="30" y1="20" x2="30" y2="180" stroke="#e5e7eb" strokeWidth="0.5" />
                    {/* Waterfall dashed line */}
                    <path
                      d="M30,175 L140,145 L260,110 L390,70"
                      fill="none"
                      stroke="#fca5a5"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      clipPath="url(#waterfallClip)"
                    />
                    {/* Agile curve */}
                    <path
                      d="M30,175 Q100,150 160,120 T290,65 T390,30"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      strokeLinecap="round"
                      clipPath="url(#agileClip)"
                    />
                    {/* Agile end dot */}
                    <motion.circle
                      cx="390" cy="30" r="5"
                      fill="#ef4444"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.8, duration: 0.3 }}
                    />
                    {/* Labels */}
                    <text x="35" y="195" fontSize="10" fill="#9ca3af">Start</text>
                    <text x="355" y="195" fontSize="10" fill="#9ca3af">Finish</text>
                    {/* Legend */}
                    <line x1="35" y1="212" x2="60" y2="212" stroke="#06b6d4" strokeWidth="2.5" />
                    <text x="65" y="215" fontSize="10" fill="#6b7280">Agile</text>
                    <line x1="115" y1="212" x2="140" y2="212" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 3" />
                    <text x="145" y="215" fontSize="10" fill="#6b7280">Waterfall</text>
                  </svg>
                  <p className="text-center text-xs text-gray-400 mt-2 font-medium">Agile vs Waterfall delivery speed</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Approaches */}
      <section className="w-full py-24 bg-white pt-10">
        <div className="w-full  px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            We offer{" "}
            <span className="relative inline-block">
              <span className="relative z-10">2 approaches</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 to-fuchsia-500 opacity-50"></span>
            </span>{" "}
            to developing your project
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1c0f2e] text-white rounded-[32px] p-10 pb-0 flex flex-col justify-between overflow-hidden relative min-h-[450px]">
              <div className="relative z-10 pb-10">
                <h3 className="text-3xl font-bold mb-6 max-w-[200px]">
                  Project development
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Project development provides a fully dedicated team to bring
                  your vision to life, ensuring seamless delivery and alignment
                  with your goals.
                </p>
              </div>
              {/* 3D Sphere placeholder */}
              <div className="w-full h-48 mt-auto flex justify-center items-end relative z-0">
                <div className="w-[120%] h-64 bg-gradient-to-t from-purple-700 to-indigo-600 rounded-t-full absolute -bottom-10 blur-xl opacity-50"></div>
                <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-indigo-900 rounded-full border border-white/10 shadow-2xl relative"></div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-10 pb-0 flex flex-col justify-between overflow-hidden min-h-[450px] shadow-sm">
              <div className="relative z-10 pb-10">
                <h3 className="text-3xl font-bold mb-6 max-w-[200px] text-gray-900">
                  Team augmentation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Team augmentation allows us to integrate skilled professionals
                  into your team, increasing capacity and expertise to
                  accelerate project development.
                </p>
              </div>

              <div className="w-full h-48 mt-auto flex justify-center items-end relative z-0">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                  alt="Team members"
                  className="object-cover h-full w-full rounded-t-2xl mask-image-bottom opacity-90"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to top, transparent, black 40%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-24 bg-white border-t border-gray-100">
        <div className="w-full  px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Benefits of Working with Blackgift Tech Labs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm flex flex-col sm:flex-row gap-6 items-start hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {benefit.desc}
                  </p>
                </div>
                <div className="hidden sm:flex shrink-0">{benefit.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full py-24 bg-white">
        <div className="w-full  px-6 lg:px-16">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Success stories of our clients
            </h2>
            <div className="hidden md:flex gap-4">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                ←
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                →
              </button>
            </div>
          </div>

          <div className="w-full bg-[#ff0a2f] rounded-[40px] p-8 md:p-10 flex flex-col lg:flex-row shadow-2xl relative overflow-hidden text-white min-h-[200px]">
            {/* Abstract BG pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

            <div className="lg:w-1/2 flex flex-col justify-center relative z-10 pb-12 lg:pb-0">
              <div className="bg-white text-red-600 font-bold text-xl px-4 py-2 rounded-xl inline-block w-max mb-8 shadow-sm">
                WYA
              </div>
              <div className="flex gap-3 mb-6">
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-white/30 bg-black/10">
                  iOS Application
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-white/30 bg-black/10">
                  Social Media App
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold mb-10 leading-tight">
                We developed an iOS app for socializing with like-minded people
                by participating in engaging events
              </h3>
              <div>
                <Link
                  to="/contact"
                  className="inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-sm"
                >
                  See case study{" "}
                  <ArrowRight className="inline-block w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 relative min-h-[300px] md:min-h-0 flex items-center justify-center">
              {/* Mockup placehloder */}
              <div className="w-[60%] aspect-[1/2] bg-gray-900 rounded-[40px] border-8 border-black shadow-2xl relative z-20 flex flex-col overflow-hidden">
                <div className="bg-gray-800 p-2 text-[10px] text-center font-bold">
                  9:41
                </div>
                <div className="flex-1 bg-red-50 p-4">
                  <div className="w-full h-8 bg-white rounded-lg mb-2"></div>
                  <div className="w-full h-24 bg-white rounded-xl mb-4"></div>
                  <div className="w-full h-8 bg-white rounded-lg mb-2"></div>
                  <div className="flex gap-2">
                    <div className="w-1/2 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="w-1/2 h-20 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="w-[55%] aspect-[1/2] bg-gray-900 rounded-[40px] border-8 border-black shadow-xl absolute right-0 top-10 z-10 rotate-12 blur-[1px] opacity-80 flex flex-col overflow-hidden">
                <div className="bg-gray-800 p-2 text-[10px] text-center font-bold">
                  9:41
                </div>
                <div className="flex-1 bg-gray-100 p-4">
                  <div className="w-full h-32 bg-gray-300 rounded-xl mb-4"></div>
                  <div className="w-full h-8 bg-gray-200 rounded-lg mb-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need other services? */}
      <section className="w-full py-24 bg-white pt-10">
        <div className="w-full  px-6 lg:px-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Need other services?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Team Augmentation",
                desc: "We provide engineers or teams tailored to your project, ensuring skill and compatibility with your goals and culture.",
                icon: <Users className="w-10 h-10 text-rose-500 mb-6" />,
              },
              {
                title: "Back-end Development",
                desc: "We are experienced in high-load and complex backend infrastructure development for mobile or web apps.",
                icon: <Database className="w-10 h-10 text-rose-500 mb-6" />,
              },
              {
                title: "Web Development",
                desc: "Our developers can create web solutions that are tailored to your needs, easy to manage with popular CMS.",
                icon: <Monitor className="w-10 h-10 text-rose-500 mb-6" />,
              },
              {
                title: "Front-end development",
                desc: "We are experienced in building modular, high-performance web applications for corporate clients and startups.",
                icon: (
                  <LayoutDashboard className="w-10 h-10 text-rose-500 mb-6" />
                ),
              },
            ].map((svc, i) => (
              <div
                key={i}
                className="bg-[#f8f9fc] rounded-3xl p-8 hover:shadow-md transition-shadow"
              >
                {svc.icon}
                <h3 className="font-bold text-lg mb-4 text-gray-900">
                  {svc.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
