import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[calc(100%-32px)] sm:w-auto max-w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5"
        >
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-gray-900 font-bold mb-2">Cookie choices</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We use cookies to improve your experience and analyze site performance. By continuing, you agree to our use of cookies.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleDecline}
                className="flex-1 py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 px-4 bg-black border border-black text-white font-bold rounded-xl text-sm hover:bg-gray-900 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
