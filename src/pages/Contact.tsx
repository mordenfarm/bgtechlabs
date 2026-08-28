import { Seo } from "../components/Seo";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Star, ChevronLeft, ChevronRight } from "lucide-react";
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

const getEmojiFlag = (countryCode: string) => {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
};

const orderedCountries = ["ZW", ...getCountries().filter((c) => c !== "ZW")];

const CustomCountrySelect = ({
  value,
  onChange,
  options,
  iconComponent: Icon,
}: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    options.find((o: any) => o.value === value) || options[0];

  return (
    <div
      className="relative flex items-center h-full pl-2 cursor-pointer"
      ref={ref}
    >
      <div
        className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select country"
      >
        <div className="w-6 h-4 overflow-hidden rounded-sm border border-gray-200">
          <Icon country={value} label={selectedOption?.label} />
        </div>
        <span className="text-[10px] text-gray-500">▼</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-3 w-72 max-h-64 overflow-y-auto bg-white border border-gray-100 shadow-xl rounded-xl z-50 flex flex-col py-2 custom-scrollbar"
          >
            {options.map((option: any) => {
              if (!option.value) return null;
              return (
                <div
                  key={option.value}
                  className={`flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors ${value === option.value ? "bg-blue-50/50" : ""}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 shrink-0 flex items-center justify-center text-lg">
                      {getEmojiFlag(option.value)}
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                      {option.label}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    +{getCountryCallingCode(option.value)}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Contact() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewDirection, setReviewDirection] = useState(1);
  const [phoneValue, setPhoneValue] = useState<string | undefined>("+263");

  const testimonials = [
    {
      text: "Their work has streamlined internal reporting... They are very professional, communicative, and reliable.",
      company: "Archrival",
      name: "Tinashe Makoni",
      location: "Harare, Zimbabwe",
      rating: 5.0,
      image: "https://flagsapi.com/ZW/flat/24.png",
    },
    {
      text: "Since we started working with Blackgift Tech Labs, our system operations have been incredibly smooth. The team's dedication and skill set are unmatched.",
      company: "AlphaOctal Systems",
      name: "Tjiurimo Ndjavera",
      location: "Gaborone, Botswana",
      rating: 5.0,
      image: "https://flagsapi.com/BW/flat/24.png",
    },
    {
      text: "The web application developed exceeded our expectations. Our students and staff find it highly intuitive and responsive. Highly recommended!",
      company: "Circle of Hope Academy",
      name: "Victoria Joel",
      location: "Ongwediva, Namibia",
      rating: 5.0,
      active: true,
      avatar:
        "https://i.ibb.co/p6RQ3D17/Whats-App-Image-2026-04-07-at-12-45-09.jpg",
      image: "https://flagsapi.com/NA/flat/24.png",
    },
    {
      text: "Efficient, detail-oriented, and highly skilled. They completely transformed our digital presence and optimized our online processes seamlessly.",
      company: "Sapphire Surgery",
      name: "Rutendo Chigumba",
      location: "Bulawayo, Zimbabwe",
      rating: 4.8,
      image: "https://flagsapi.com/ZW/flat/24.png",
    },
    {
      text: "We needed a robust solution to manage our sales pipeline and they delivered a flawless integration. Fantastic agency to partner with.",
      company: "ServiceLoop",
      name: "Kudzai Moyo",
      location: "Harare, Zimbabwe",
      rating: 4.9,
      image: "https://flagsapi.com/ZW/flat/24.png",
    },
  ];

  const caseStudies = [
    {
      id: "coha",
      title: "Circle of Hope Academy",
      description:
        "An interactive learning management system designed to track student progress, assignments, and facilitate seamless teacher-parent communication.",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      logo: "/coha.png",
    },
    {
      id: "alphaoctal",
      title: "AlphaOctal Systems",
      description:
        "Enterprise software solutions aimed at providing real-time analytics and scalable infrastructure for modern corporate workflows.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      logo: "/alphaoctal.avif",
    },
    {
      id: "raphamed",
      title: "Raphamed Surgery",
      description:
        "A secure, HIPAA-compliant patient management system streamlining appointment scheduling, medical records, and digital prescriptions.",
      image:
        "https://images.unsplash.com/photo-1538108149393-cebb33a92b23?auto=format&fit=crop&q=80&w=800",
      logo: "/raphamed.png",
    },
    {
      id: "sapphire",
      title: "Sapphire Surgery",
      description:
        "Customized healthcare portaling and diagnostic dashboards for advanced visual tracking of patient recovery pipelines.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
      logo: "/sapphire-surgery.png",
    },
    {
      id: "maranatha",
      title: "Maranatha Surgery",
      description:
        "An intuitive medical booking interface integrating real-time availability of practitioners and secure payment gateways.",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
      logo: "/maranatha-surgery.png",
    },
    {
      id: "serviceloop",
      title: "ServiceLoop",
      description:
        "A comprehensive service dispatching and field technician management application equipped with geolocation routing.",
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800",
      logo: "/serviceloop.jpeg",
    },
    {
      id: "brilliant",
      title: "Brilliant Chemicals",
      description:
        "Inventory tracking and safety compliance dashboards developed to track chemical manufacturing supply chains.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      logo: "/brilliant-chemicals.png",
    },
    {
      id: "motionmax",
      title: "MotionMax Academy",
      description:
        "Dynamic video-hosting and course-delivery platform engineered for high-performance streaming and user engagement.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      logo: "/motionmaxlgo.png",
    },
    {
      id: "lenda",
      title: "Lenda Technologies",
      description:
        "Next-generation fintech solutions facilitating quick, secure microloans and detailed financial user analytics.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
      logo: "/lenda-logo.png",
    },
    {
      id: "defined",
      title: "Defined Domain",
      description:
        "High-end corporate portfolio websites and custom domain management tools for premium B2B enterprises.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      logo: "/defineddomain.png",
    },
  ];

  // Auto-scroll logic for case studies
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveCaseIndex((prev) => (prev + 1) % caseStudies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [caseStudies.length]);

  // Auto-scroll logic for reviews
  React.useEffect(() => {
    const interval = setInterval(() => {
      setReviewDirection(1);
      setActiveReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    
    <div className="w-full flex flex-col font-sans bg-white overflow-hidden">
      <Seo title="Contact Us | Blackgift Tech Labs" description="Get in touch with Blackgift Tech Labs." />
      {/* Hero Section */}
      <section className="bg-[#3b6ee9] w-full py-16 md:py-24 font-sans px-6 lg:px-0">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Logos & Awards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-16"
          >
            <div>
              <h2 className="text-2xl md:text-[28px] font-bold mb-10 tracking-wide">
                YOU ARE IN GOOD COMPANY
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/coha.png"
                      alt="Circle of Hope Academy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    Circle of Hope
                    <br />
                    Academy
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/alphaoctal.avif"
                      alt="AlphaOctal Systems"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    AlphaOctal
                    <br />
                    Systems
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/raphamed.png"
                      alt="Raphamed Surgery"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    Raphamed
                    <br />
                    Surgery
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/sapphire-surgery.png"
                      alt="Sapphire Surgery"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    Sapphire
                    <br />
                    Surgery
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/maranatha-surgery.png"
                      alt="Maranatha Surgery"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    Maranatha
                    <br />
                    Surgery
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/serviceloop.jpeg"
                      alt="ServiceLoop"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    ServiceLoop
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/brilliant-chemicals.png"
                      alt="Brilliant Chemicals"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    Brilliant
                    <br />
                    Chemicals
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/motionmaxlgo.png"
                      alt="MotionMax Academy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    MotionMax
                    <br />
                    Academy
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/lenda-logo.png"
                      alt="Lenda Technologies"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    Lenda
                    <br />
                    Technologies
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/defineddomain.png"
                      alt="Defined Domain"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xs text-center leading-tight">
                    Defined
                    <br />
                    Domain
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded p-8 md:p-12 shadow-2xl relative scroll-mt-24"
            id="contact-form"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
              Contact Us
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="First Name*"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#3b6ee9] focus:ring-1 focus:ring-[#3b6ee9] outline-none transition-all placeholder:text-gray-400 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name*"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#3b6ee9] focus:ring-1 focus:ring-[#3b6ee9] outline-none transition-all placeholder:text-gray-400 text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Business Email*"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#3b6ee9] focus:ring-1 focus:ring-[#3b6ee9] outline-none transition-all placeholder:text-gray-400 text-gray-800"
                  required
                />
              </div>

              <div>
                <PhoneInput
                  international
                  withCountryCallingCode
                  value={phoneValue}
                  onChange={setPhoneValue}
                  defaultCountry="ZW"
                  countries={orderedCountries}
                  countrySelectComponent={CustomCountrySelect}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus-within:border-[#3b6ee9] focus-within:ring-1 focus-within:ring-[#3b6ee9] transition-all bg-white phone-input-container"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#3b6ee9] focus:ring-1 focus:ring-[#3b6ee9] outline-none transition-all placeholder:text-gray-400 text-gray-800"
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder="How we can help you?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#3b6ee9] focus:ring-1 focus:ring-[#3b6ee9] outline-none transition-all placeholder:text-gray-400 text-gray-800 resize-none pb-10"
                ></textarea>
                <button
                  type="button"
                  className="absolute bottom-3 right-4 flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
                >
                  <Paperclip className="w-4 h-4" />
                  Attach file
                </button>
              </div>

              <div className="text-sm text-gray-500 pt-2 leading-relaxed">
                <p>
                  By sending this form I confirm that I have read and accept
                  Blackgift Tech Labs{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="flex items-center gap-3 py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-5 h-5 border-2 border-gray-300 rounded bg-white flex items-center justify-center group-hover:border-blue-400 transition-colors">
                    <input
                      type="checkbox"
                      className="appearance-none absolute inset-0 w-full h-full cursor-pointer peer"
                    />
                    <svg
                      className="w-3 h-3 text-[#f00e4a] opacity-0 peer-checked:opacity-100 transition-opacity"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-600 font-medium select-none">
                    Send NDA
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff004f] hover:bg-[#d40042] text-white font-bold py-4 rounded transition-colors text-lg tracking-wide uppercase mt-4"
              >
                Send
              </button>

              <a
                href="https://wa.me/263713952798"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-4 rounded transition-colors text-lg tracking-wide uppercase mt-4"
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain" />
                WhatsApp Direct
              </a>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Engineer Clients Logos */}
      <section className="py-16 bg-white border-b border-gray-100 border-t w-full overflow-hidden">
        <div className="w-full px-[20px] text-center">
          <h2 className="text-2xl font-bold text-[#1c0f2e] mb-12">
            Our engineers developed products for
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 max-w-[1200px] mx-auto">
            <img src="/coha.png" alt="Circle of Hope Academy" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/alphaoctal.avif" alt="AlphaOctal Systems" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/raphamed.png" alt="Raphamed Surgery" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/sapphire-surgery.png" alt="Sapphire Surgery" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/maranatha-surgery.png" alt="Maranatha Surgery" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/serviceloop.jpeg" alt="ServiceLoop" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 rounded-full" />
            <img src="/brilliant-chemicals.png" alt="Brilliant Chemicals" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/motionmaxlgo.png" alt="MotionMax Academy" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/lenda-logo.png" alt="Lenda Technologies" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            <img src="/defineddomain.png" alt="Defined Domain" className="h-16 md:h-20 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-16 tracking-tight uppercase"
          >
            Reviews
          </motion.h2>

          <div className="relative w-full h-[550px] lg:h-[450px] flex justify-center items-center perspective-1000">
            <AnimatePresence initial={false} custom={reviewDirection}>
              <motion.div
                key={activeReviewIndex}
                custom={reviewDirection}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                    scale: 0.8,
                    rotateY: direction > 0 ? 45 : -45,
                    filter: "blur(10px)",
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    filter: "blur(0px)",
                  },
                  exit: (direction: number) => ({
                    zIndex: 0,
                    x: direction < 0 ? 1000 : -1000,
                    opacity: 0,
                    scale: 0.8,
                    rotateY: direction < 0 ? 45 : -45,
                    filter: "blur(10px)",
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  rotateY: { type: "spring", stiffness: 300, damping: 30 },
                  scale: { duration: 0.4 },
                  filter: { duration: 0.4 },
                }}
                className="absolute w-full max-w-3xl bg-[#f4f7f9] rounded-xl p-8 md:p-12 flex flex-col justify-between shadow-2xl border border-blue-100 h-full"
              >
                <div>
                  <div className="text-blue-200 text-6xl font-serif mb-4 leading-none">
                    "
                  </div>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium mb-10 text-center">
                    {testimonials[activeReviewIndex].text}
                  </p>
                </div>

                <div className="flex flex-col items-center text-center mt-auto pb-2">
                  {testimonials[activeReviewIndex].avatar && (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md mb-3">
                      <img
                        src={testimonials[activeReviewIndex].avatar}
                        alt={testimonials[activeReviewIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h4 className="font-bold text-gray-900 text-xl mb-1">
                    {testimonials[activeReviewIndex].company}
                  </h4>
                  <p className="text-gray-500 text-sm mb-4">
                    {testimonials[activeReviewIndex].name}
                    <br />
                    <span className="text-gray-400 text-xs uppercase flex items-center justify-center gap-1.5 mt-2">
                      <img
                        src={testimonials[activeReviewIndex].image}
                        className="w-4 h-4 object-cover rounded-sm shadow-sm"
                        alt={`${testimonials[activeReviewIndex].location} Flag`}
                      />
                      {testimonials[activeReviewIndex].location}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#3b6ee9] font-bold text-lg">
                      {testimonials[activeReviewIndex].rating.toFixed(1)}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(testimonials[activeReviewIndex].rating) ? "fill-[#3b6ee9] text-[#3b6ee9]" : i < testimonials[activeReviewIndex].rating ? "fill-[#3b6ee9]/50 text-[#3b6ee9]" : "fill-gray-300 text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute right-8 bottom-12 text-blue-200 text-6xl font-serif rotate-180 opacity-50 select-none pointer-events-none">
                  "
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-4 relative z-20 mt-8"
          >
            {/* Pagination lines */}
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setReviewDirection(i > activeReviewIndex ? 1 : -1);
                  setActiveReviewIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeReviewIndex === i ? "w-12 bg-[#3b6ee9]" : "w-8 bg-gray-200 hover:bg-gray-300"}`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-gray-100 shadow-xl rounded-xl overflow-hidden bg-white mb-12 relative h-[550px] lg:h-[400px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
              >
                <div className="h-[250px] lg:h-full overflow-hidden relative">
                  <img
                    src={caseStudies[activeCaseIndex].image}
                    alt={caseStudies[activeCaseIndex].title}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
                <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-white">
                  <h3 className="text-3xl md:text-[34px] font-bold text-gray-900 mb-6">
                    {caseStudies[activeCaseIndex].title}
                  </h3>
                  <p className="text-gray-600 text-[17px] leading-relaxed max-w-sm">
                    {caseStudies[activeCaseIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Logo Tabs - Auto Sliding visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-12 w-full max-w-full overflow-hidden"
          >
            <div className="flex overflow-x-auto no-scrollbar gap-4 py-4 px-4 items-center max-w-5xl snap-x">
              {caseStudies.map((study, i) => (
                <button
                  key={study.id}
                  onClick={() => setActiveCaseIndex(i)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all p-2.5 bg-white shadow-md overflow-hidden shrink-0 snap-center ${activeCaseIndex === i ? "ring-2 ring-offset-2 ring-[#f00e4a] scale-110 z-10" : "hover:scale-105 opacity-60 hover:opacity-100 ring-1 ring-gray-100"}`}
                >
                  <img
                    src={study.logo}
                    alt={study.title}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center">
            <button className="bg-[#3b6ee9] hover:bg-[#2d5cd5] text-white font-semibold flex items-center gap-3 px-10 py-5 rounded shadow-lg shadow-blue-500/30 transition-all uppercase tracking-wide text-sm">
              Explore Our Success Stories{" "}
              <ChevronRight className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
