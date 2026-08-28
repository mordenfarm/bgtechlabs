import { Seo } from "../../components/Seo";
import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Users,
  Lightbulb,
  Rocket,
  Sparkles,
  Stethoscope,
  Briefcase,
  Monitor,
  ShoppingBag,
  GraduationCap,
  Building2,
  Clapperboard,
  ClipboardList,
  Laptop,
  Code2,
} from "lucide-react";

const integrationModels = [
  {
    name: "OpenAI",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    fallback: <Code2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Llama",
    img: "/llama-language-model-logo.webp",
    fallback: <Code2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Anthropic",
    img: "/anthropic.svg",
    fallback: <Code2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Mistral AI",
    img: "/mistral-ai-logo.avif",
    fallback: <Code2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Gemini",
    img: "/gemini.webp",
    fallback: <Code2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Amazon Sagemaker",
    img: "/sagemaker.webp",
    fallback: <Code2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    name: "Azure AI",
    img: "/microsoft-azure-ai.png",
    fallback: <Code2 className="w-8 h-8 text-indigo-600" />,
  },
];

const benefits = [
  {
    title: "Improved Efficiency and Productivity",
    desc: "AI automates routine tasks, improving business efficiency and productivity by enabling employees to concentrate on strategic issues.",
    icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Enhanced Decision Making",
    desc: "AI analyses data for valuable insights, aiding quick, accurate, and informed business decisions.",
    icon: <Target className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Personalized Customer Experience",
    desc: "AI analyses customer behaviors and preferences, enabling tailored recommendations and experiences, improving customer satisfaction and loyalty.",
    icon: <Users className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Innovation and Competitive Advantage",
    desc: "AI adoption promotes business innovation, providing a competitive advantage in the market.",
    icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Scalability",
    desc: "AI solutions scale with your business, managing increased workloads as your business expands.",
    icon: <Rocket className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Quality Assurance",
    desc: "AI automates quality checks across sectors, ensuring high consistency and reducing errors.",
    icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
  },
];

const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Stethoscope className="w-6 h-6" />,
  },
  { id: "finance", name: "Finance", icon: <Briefcase className="w-6 h-6" /> },
  {
    id: "technology",
    name: "Technology",
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    id: "retail",
    name: "Retail and E-commerce",
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: "business",
    name: "Business Services",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: "media",
    name: "Media and Entertainment",
    icon: <Clapperboard className="w-6 h-6" />,
  },
];

const implementationExamples = {
  healthcare: [
    {
      title: "Virtual Health Assistant",
      desc: "Chatbots powered by AI can serve as virtual health assistants, answering patient queries, providing medical advice, and booking appointments 24/7.",
    },
    {
      title: "Health Monitoring and Alerts",
      desc: "AI models can analyze real-time health data from wearable devices to monitor patient health, alerting healthcare providers if any irregularities are detected.",
    },
    {
      title: "Patient Diagnosis Support",
      desc: "AI can analyze patient symptoms and medical history to suggest potential diagnoses, helping doctors make informed decisions quickly.",
    },
    {
      title: "Administrative Automation",
      desc: "AI can automate administrative tasks like patient data entry, appointment scheduling, and billing, reducing human error.",
    },
  ],
  finance: [
    {
      title: "Fraud Detection Engine",
      desc: "Real-time AI monitoring prevents fraudulent transactions.",
    },
    {
      title: "Credit Scoring",
      desc: "Alternative data analysis for better credit risk assessment.",
    },
  ],
  technology: [
    {
      title: "Code Generation",
      desc: "AI assists developers by suggesting code snippets.",
    },
    { title: "Automated QA", desc: "AI-driven automated software testing." },
  ],
  retail: [
    {
      title: "Smart Recommendations",
      desc: "Hyper-personalized product recommendations.",
    },
    {
      title: "Inventory Prediction",
      desc: "AI predicts stock levels based on trends.",
    },
  ],
  education: [
    {
      title: "Personalized Learning",
      desc: "Adaptive AI tailoring difficulty to student progress.",
    },
    {
      title: "Automated Grading",
      desc: "AI assistants scoring assessments quickly.",
    },
  ],
  business: [
    {
      title: "Document Processing",
      desc: "Extracting structured data from unstructured docs.",
    },
    {
      title: "Meeting Summaries",
      desc: "Automated transcriptions and key action items.",
    },
  ],
  media: [
    {
      title: "Content Moderation",
      desc: "Automated filtering of user-generated content.",
    },
    {
      title: "Video Analytics",
      desc: "Extracting scene insights and generating tags.",
    },
  ],
};

export function AIDevelopment() {
  const [activeIndustry, setActiveIndustry] = useState("healthcare");

  return (
    <>
      <Seo title="AI Development Services | Blackgift Tech Labs" description="Empower Your Business with AI-Driven Software Solutions." />

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] bg-[#fcfbfa] flex items-center overflow-hidden pt-32 pb-20 lg:py-0">
        <Link
          to="/services"
          className="absolute top-24 left-6 lg:left-16 z-50 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Services</span>
        </Link>
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-30 bg-gradient-to-br from-pink-100 via-white to-white pointer-events-none z-0"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex">
          <div className="w-full lg:w-1/2 flex flex-col gap-6 py-12 lg:py-32">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]"
            >
              Empower Your Business with AI-Driven Software Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-800 font-medium leading-relaxed"
            >
              Integrate your products with{" "}
              <span className="font-bold">
                OpenAI, Llama, Anthropic, Mistral AI, Gemini
              </span>{" "}
              and other leading AI models & solutions to streamline operations,
              elevate customer experiences and disrupt the market.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-block mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-8 py-3.5 rounded-xl font-bold transition-all text-sm"
              >
                Let's chat
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right side image */}
        <div className="absolute right-0 top-0 h-full w-[55%] hidden lg:block z-0 pointer-events-none">
          <img
            src="/aiimage.jpg"
            alt="AI Development"
            className="w-full h-full object-cover scale-x-[-1]"
          />
          {/* Mist overlay to fade the image into the background */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#fcfbfa] via-[#fcfbfa]/80 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#fcfbfa] via-[#fcfbfa]/40 to-transparent opacity-80"></div>
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#fcfbfa] via-[#fcfbfa]/60 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#fcfbfa] via-[#fcfbfa]/60 to-transparent"></div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-[#f8f9fc] w-full overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What can be integrated?
          </h2>
          <p className="text-gray-600">
            The Blackgift Info team helps businesses integrate their products
            with industry-leading AI models:
          </p>
        </div>

        <div className="w-full">
          <div className="flex flex-nowrap overflow-x-auto gap-4 lg:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-4 md:px-8 lg:px-12 lg:justify-center">
            {integrationModels.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white px-6 py-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center justify-center min-w-[160px] md:min-w-[170px] gap-4 snap-center shrink-0"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {model.img ? (
                    <img
                      src={model.img}
                      alt={model.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                    />
                  ) : (
                    <span className="text-4xl grayscale opacity-80">
                      {model.fallback}
                    </span>
                  )}
                </div>
                <span className="font-bold text-sm text-gray-900 whitespace-nowrap">
                  {model.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[#f8f9fc] w-full">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-16 text-center">
            How new AI models can help your business?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-32 w-full relative overflow-hidden bg-slate-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none object-cover">
          <img
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2674&auto=format&fit=crop"
            alt="Abstract gradient"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            How it works
          </h2>
          <p className="text-white/80 font-medium mb-16 max-w-2xl mx-auto">
            The integration process is divided into stages to make it smooth and
            effective for your business:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {[
              {
                title: "Initial stage",
                desc: "We study your product and operations, identify opportunities for AI enhancement, and devise a customized strategy, including UI wireframe and PRD for effective prototyping.",
                icon: <ClipboardList className="w-8 h-8 text-indigo-300" />,
              },
              {
                title: "Design and development",
                desc: "Our skilled team designs and develops the AI integration, ensuring compatibility and alignment with your business needs. We will also review and roll out an updated version of your product.",
                icon: <Laptop className="w-8 h-8 text-indigo-300" />,
              },
              {
                title: "Test and Launch",
                desc: "We conduct thorough performance and bug testing before a monitored deployment. Post-launch, we will provide support and ongoing optimization based on live environment data.",
                icon: <Rocket className="w-8 h-8 text-indigo-300" />,
              },
            ].map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl flex flex-col items-center text-center text-white"
              >
                <div className="mb-6 opacity-90">{stage.icon}</div>
                <h3 className="font-bold text-xl mb-4">{stage.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {stage.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Consultation Banner */}
      <section className="w-full">
        <div className="w-full bg-gradient-to-r from-fuchsia-600 to-red-500 py-20 px-0 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Free consultation
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto px-4">
            Get in touch to find out how AI can improve your product and take
            your business to a whole new level.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-rose-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Let's chat
          </Link>
        </div>
      </section>

      {/* Fine-tune Section */}
      <section className="py-24 bg-white w-full pt-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full rounded-[32px] bg-purple-900 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center overflow-hidden p-10 lg:p-16 relative">
            <div className="absolute inset-0 bg-purple-950/60 mix-blend-multiply"></div>
            <div className="relative z-10 max-w-xl text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Train or Fine-tune a model based on your data
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Maximize the value of your proprietary data by training or
                fine-tuning AI models tailored to your specific business needs.
                Our team will help you build custom models or adapt existing
                solutions to perform better on your unique datasets — improving
                accuracy, relevance, and performance.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                Let's chat <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Example Implementation Section */}
      <section className="py-24 bg-[#f8f9fc] w-full">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 lg:gap-8">
          {/* Left Column - Navigation */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Example of AI implementation
            </h2>
            <p className="text-gray-600 mb-10">
              Discover how AI can revolutionize various industries:
            </p>

            <div className="flex flex-col gap-2">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl text-left font-bold transition-all ${
                    activeIndustry === ind.id
                      ? "bg-white shadow-sm text-gray-900 border border-gray-100"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                  }`}
                >
                  <span className="flex items-center justify-center w-6 h-6">
                    {ind.icon}
                  </span>
                  {ind.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Content List */}
          <div className="w-full lg:w-2/3 lg:pl-10 h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {/* @ts-ignore */}
                {implementationExamples[activeIndustry].map(
                  (item: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3"
                    >
                      <h3 className="font-bold text-lg text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ),
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-24 px-0 text-center w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Run the AI-driven version of your product within a few weeks, not a
          few years
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-10 text-sm md:text-base px-4">
          The new generation of AI models can be very fast to integrate! Don't
          lose out to your competitors!
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-purple-900 font-bold px-10 py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
        >
          Let's chat
        </Link>
      </section>

      {/* Scrollbar styling for Example Implementation section */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
    </>
  );
}
