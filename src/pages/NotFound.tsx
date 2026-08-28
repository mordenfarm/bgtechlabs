import { Seo } from "../components/Seo";
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBFBFC] flex flex-col items-center justify-center px-4">
      <Seo title="Page Not Found | Blackgift Tech" description="The page you are looking for doesn't exist or has been moved." robots="noindex, nofollow" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-8xl md:text-9xl font-bold text-gray-200 mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1528] mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-10 text-lg">
          Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="w-full sm:w-auto bg-[#ab5af6] hover:bg-[#9745e3] text-white px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-white border border-gray-200 hover:border-gray-300 text-[#1a1528] px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
