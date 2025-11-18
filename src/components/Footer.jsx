"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="w-full bg-[#0D0D12] backdrop-blur-xl border-t border-purple-500/10 py-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #13131A, #0D0D12)'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <motion.div 
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Contact Info */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            {/* Email */}
            <motion.div 
              className="flex flex-col items-center sm:items-start group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm font-medium">Email</span>
              </div>
              <a
                href="mailto:tauheeddeveloper13@gmail.com"
                className="text-white text-lg font-semibold hover:text-purple-300 transition-all duration-300"
              >
                tauheeddeveloper13@gmail.com
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div 
              className="flex flex-col items-center sm:items-start group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm font-medium">Phone</span>
              </div>
              <a
                href="tel:+923237594869"
                className="text-white text-lg font-semibold hover:text-purple-300 transition-all duration-300"
              >
                +92 323 7594869
              </a>
            </motion.div>
          </div>

          {/* Live Time & Quick Actions */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Live Time */}
            <motion.div 
              className="flex items-center gap-3 bg-[#1A1A22] rounded-xl px-4 py-2 border border-purple-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300 text-sm font-mono">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour12: true, 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-purple-300 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm">Back to Top</span>
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-400 transition-all duration-300 group-hover:scale-110">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent my-8"></div>

        {/* Copyright & Info */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          
          {/* Copyright Text */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-white/80 font-light text-sm">
              Crafted with <span className="text-purple-400">💻</span> and <span className="text-purple-400">☕</span> by Tauheed
            </p>
            <div className="hidden sm:block w-1 h-1 bg-purple-500/30 rounded-full"></div>
            <p className="text-white/60 text-sm">
              © 2025 All rights reserved
            </p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-gray-400 text-sm">Available for projects</span>
            </div>
          </div>
        </motion.div>

        {/* Mobile Quick Actions */}
        <motion.div 
          className="flex justify-center gap-6 mt-8 lg:hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="mailto:tauheeddeveloper13@gmail.com"
            className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.a>
          <motion.a
            href="tel:+923237594869"
            className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;