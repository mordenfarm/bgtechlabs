import { Seo } from "../../components/Seo";
import React from 'react';
import { motion } from 'framer-motion';

export function GenericService({ title }: { title: string }) {
  return (
    <>
      <Seo title={`${title} | Blackgift Tech Labs`} description={`Explore our ${title} services.`} />
      
      <section className="relative w-full overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-[60vh] bg-[#fcfbfa] flex items-center justify-center">
        <div className="absolute inset-0 block filter blur-[100px] opacity-40 mix-blend-multiply pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[30%] h-[50%] bg-[#ffe0b2] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-[#bbdefb] rounded-full"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We are working on this page. Check back soon for more details about our {title} services.
          </motion.p>
        </div>
      </section>
    </>
  );
}
