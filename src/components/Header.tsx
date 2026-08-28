import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  ChevronDown,
  HelpCircle,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [showTopBar, setShowTopBar] = React.useState(true);
  const isMenuOpen = searchParams.get("menu") === "true";
  
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const openLoginModal = () => {
    if (!user) {
      setSearchParams((prev) => {
        prev.set("modal", "login");
        return prev;
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleMenu = () => {
    setSearchParams((prev) => {
      if (isMenuOpen) {
        prev.delete("menu");
      } else {
        prev.set("menu", "true");
      }
      return prev;
    });
  };

  return (
    <header className="w-full flex flex-col font-sans sticky top-0 lg:top-[-40px] z-50">
      {/* Top Bar - Hidden on mobile */}
      {showTopBar && (
        <div className="hidden lg:block w-full text-white/90 text-sm" style={{ background: "linear-gradient(90deg, #0f0f0f 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)" }}>
          <div className="w-full px-5 lg:px-8 h-10 flex items-center justify-between relative">
            <div className="flex h-full gap-6">
              <Link
                to="/products"
                className="h-full flex items-center hover:text-white transition-colors font-bold gap-2"
              >
                Products
                <span style={{
  position: "relative",
  overflow: "hidden",
  display: "inline-block",
  background: "#ef4444",
  color: "white",
  fontSize: "10px",
  fontWeight: "700",
  padding: "2px 6px",
  borderRadius: "4px",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  lineHeight: 1,
}}>
  New
  <span style={{
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "60%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
    animation: "shimmer 1.8s infinite",
  }} />
  <style>{`
    @keyframes shimmer {
      0%   { left: -100%; }
      100% { left: 200%; }
    }
  `}</style>
</span>
              </Link>
              
              <Link
                to="/vibe-code-seminar"
                className="h-full flex items-center hover:text-white transition-colors font-bold gap-2"
              >
                Vibe-Code Seminar
                <span style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-block",
                  background: "linear-gradient(90deg, #9333ea, #3b82f6)",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}>
                  {Math.max(0, Math.ceil((new Date('2026-08-15T00:00:00').getTime() - new Date().getTime()) / (1000 * 3600 * 24)))} days left
                  <span style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "60%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                    animation: "shimmer 1.8s infinite",
                  }} />
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium tracking-wide">
                  Plan your custom software project with precision
                </span>
                <Link
                  to="/estimate"
                  className="font-bold underline text-white hover:text-gray-300 transition-colors ml-1"
                >
                  Estimate Now
                </Link>
              </div>
              <button
                onClick={() => setShowTopBar(false)}
                className="flex items-center justify-center text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div
        className="w-full bg-white border-b border-gray-100 relative z-40"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 h-14 lg:h-20 flex items-center justify-between">
          {/* Logo & Left Nav */}
          <div className="flex items-center gap-8 h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 lg:w-9 lg:h-9 w-6 h-6 bg-black rounded-full flex-shrink-0 overflow-hidden">
                <img
                  src="https://i.ibb.co/1GWbN1WD/blackgiftlogo.png"
                  alt="Blackgift Logo"
                  className="h-[20px] w-[20px] lg:h-[28px] lg:w-[28px] object-contain filter brightness-0 invert"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-hero text-sm lg:text-xl tracking-widest text-black leading-none uppercase">
                  BLACKGIFT
                </span>
              </div>
            </Link>

            {/* Nav Links - Hidden on mobile */}
            <nav className="hidden lg:flex items-center h-full gap-6 text-[15px] font-medium text-gray-800">
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(null)}
              >
                <Link
                  to="/services"
                  className="flex items-center gap-1 hover:text-gray-500 transition-colors cursor-pointer h-full"
                >
                  Services
                </Link>
              </div>
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveDropdown("Solutions")}
              >
                <span className="flex items-center gap-1 hover:text-gray-500 transition-colors cursor-pointer h-full">
                  Solutions{" "}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === "Solutions" ? "rotate-180" : ""}`}
                  />
                </span>
              </div>
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(null)}
              >
                <Link
                  to="/clients"
                  className="flex items-center gap-1 hover:text-gray-500 transition-colors cursor-pointer h-full"
                >
                  Clients
                </Link>
              </div>
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(null)}
              >
                <Link
                  to="/products"
                  className="flex items-center gap-1 hover:text-gray-500 transition-colors cursor-pointer h-full"
                >
                  Products
                </Link>
              </div>
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(null)}
              >
                <Link
                  to="/about"
                  className="flex items-center gap-1 hover:text-gray-500 transition-colors cursor-pointer h-full"
                >
                  About Us
                </Link>
              </div>
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(null)}
              >
                <Link
                  to="/contact"
                  className="flex items-center gap-1 hover:text-gray-500 transition-colors cursor-pointer h-full"
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>

          {/* Right Actions - Hidden on mobile, only show hamburger */}
          <div className="hidden lg:flex items-center gap-6 text-gray-800">
            <button className="flex items-center gap-1 hover:text-gray-500 transition-colors text-[15px] font-medium">
              <HelpCircle className="w-5 h-5" />
              Help
              <ChevronDown className="w-4 h-4 ml-0.5" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button
              onClick={openLoginModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center relative group"
              aria-label="User Account"
            >
              {user ? (
                <>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#f50057] text-white flex items-center justify-center font-bold text-xs uppercase">
                      {user.displayName ? user.displayName[0] : user.email ? user.email[0] : 'U'}
                    </div>
                  )}
                  {/* Logout dropdown */}
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl w-48 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2 truncate">
                      <span className="text-xs font-bold text-gray-500">SIGNED IN AS</span>
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    <div 
                      onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                      className="px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </div>
                  </div>
                </>
              ) : (
                <User className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex lg:hidden items-center">
            <style>{`
              .toggle {
                position: relative;
                width: 20px;
                height: 20px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 5px;
                transition-duration: .3s;
              }
              .bars {
                width: 100%;
                height: 2px;
                background-color: rgb(30, 30, 30);
                border-radius: 5px;
                transition-duration: .3s;
              }
              .toggle-checked #bar2 {
                transform: translateY(7px) rotate(60deg);
                transform-origin: right;
                transition-duration: .3s;
                z-index: 2;
              }
              .toggle-checked #bar1 {
                transform: translateY(14px) rotate(-60deg);
                transition-duration: .3s;
                transform-origin: left;
                z-index: 1;
              }
              .toggle-checked {
                transform: rotate(-90deg);
              }
            `}</style>
            <label
              className={`toggle ${isMenuOpen ? "toggle-checked" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <div id="bar1" className="bars" />
              <div id="bar2" className="bars" />
              <div id="bar3" className="bars" />
            </label>
          </div>
        </div>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeDropdown === "Solutions" && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: {
                  height: "auto",
                  opacity: 1,
                  transition: { duration: 0.3, ease: "easeOut" },
                },
                exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
              }}
              className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden"
              style={{ zIndex: 30 }}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.3, duration: 0.4 },
                    },
                  }}
                  className="w-full md:w-[35%] bg-[#ecfdf5] p-8 rounded-3xl shrink-0"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Our Products
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Explore our suite of battle-tested, out-of-the-box software
                    products designed to streamline complex business operations
                    immediately.
                  </p>
                </motion.div>

                {/* Vertical Divider line */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scaleY: 0 },
                    visible: {
                      opacity: 1,
                      scaleY: 1,
                      transition: {
                        delay: 0.6,
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="hidden md:block w-px bg-gray-200 shrink-0 transform origin-top"
                />

                <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4 content-start">
                  {[
                    {
                      to: "/solutions/school",
                      title: "School Management System",
                    },
                    {
                      to: "/solutions/hospital",
                      title: "Hospital Management Software",
                    },
                    { to: "/solutions/retail", title: "Retail POS Systems" },
                    { to: "/solutions/ai", title: "Smart AI Agents Engine" },
                    { to: "/solutions/ecommerce", title: "eCommerce Portals" },
                  ].map((link, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.8 + i * 0.1, duration: 0.3 },
                        },
                      }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setActiveDropdown(null)}
                        className="font-bold text-gray-900 text-lg hover:text-gray-500 transition-colors block"
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ clipPath: "circle(0% at calc(100% - 24px) 0px)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 24px) 0px)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 24px) 0px)" }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
              className="lg:hidden fixed inset-x-0 top-[56px] max-h-[65vh] bg-white z-40 overflow-y-auto px-4 py-6 shadow-xl flex flex-col rounded-b-[30px]"
            >
              <nav className="flex flex-col space-y-2 mb-4">
                <MobileNavLink
                  to="/services"
                  title="Services"
                  onClick={toggleMenu}
                />
                <MobileDropdownLink 
                  title="Solutions"
                  links={[
                    { to: "/solutions/school", title: "School Management System" },
                    { to: "/solutions/hospital", title: "Hospital Management Software" },
                    { to: "/solutions/retail", title: "Retail POS Systems" },
                    { to: "/solutions/ai", title: "Smart AI Agents Engine" },
                    { to: "/solutions/ecommerce", title: "eCommerce Portals" },
                  ]}
                  onLinkClick={toggleMenu}
                />
                <MobileNavLink
                  to="/clients"
                  title="Clients"
                  onClick={toggleMenu}
                />
                <MobileNavLink
                  to="/products"
                  title="Products"
                  onClick={toggleMenu}
                />
                <MobileNavLink
                  to="/about"
                  title="About Us"
                  onClick={toggleMenu}
                />
                <MobileNavLink
                  to="/contact"
                  title="Contact"
                  onClick={toggleMenu}
                />
              </nav>

              <div className="mt-auto flex flex-col space-y-3 border-t border-gray-100 pt-5">
                <button
                  onClick={() => {
                    toggleMenu();
                    openLoginModal();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 text-gray-800 font-medium"
                >
                  <span className="flex items-center gap-3">
                    <User className="w-5 h-5" /> Sign In
                  </span>
                </button>
                <Link
                  to="/start-project"
                  onClick={toggleMenu}
                  className="flex items-center justify-center p-3 rounded-xl bg-gray-900 text-white font-medium"
                >
                  Start a project
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/20 z-30 top-[56px]"
              onClick={toggleMenu}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ title }: { title: string }) {
  return (
    <button className="flex items-center gap-1 hover:text-gray-500 transition-colors h-full">
      {title}
      <ChevronDown className="w-4 h-4" />
    </button>
  );
}

function MobileNavLink({
  title,
  to,
  onClick,
}: {
  title: string;
  to: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center justify-between py-3 text-lg font-medium text-gray-900 border-b border-gray-50"
    >
      {title}
      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </Link>
  );
}

function MobileDropdownLink({
  title,
  links,
  onLinkClick
}: {
  title: string;
  links: { to: string; title: string }[];
  onLinkClick: () => void;
}) {
  const [isOpen, React_useState] = React.useState(false);
  
  return (
    <div className="flex flex-col border-b border-gray-50">
      <button
        onClick={() => React_useState(!isOpen)}
        className="flex items-center justify-between py-3 text-lg font-medium text-gray-900 w-full"
      >
        {title}
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col overflow-hidden"
          >
            <div className="flex flex-col pl-4 pb-3 space-y-3 pt-1">
              {links.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  onClick={onLinkClick}
                  className="text-base font-medium text-gray-600 hover:text-gray-900 py-1"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChevronRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
