"use client";

import { useState, useEffect } from "react";

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
    <footer className="w-full bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Contact Info */}
        <div className={`flex flex-col lg:flex-row justify-between items-center gap-8 mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            {/* Email */}
            <div className="flex flex-col items-center sm:items-start group cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm font-medium">Email</span>
              </div>
              <a
                href="mailto:tauheeddeveloper13@gmail.com"
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-lg font-semibold hover:from-green-300 hover:to-blue-400 transition-all duration-300 group-hover:scale-105"
              >
                tauheeddeveloper13@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center sm:items-start group cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm font-medium">Phone</span>
              </div>
              <a
                href="tel:+923237594869"
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-lg font-semibold hover:from-blue-300 hover:to-purple-400 transition-all duration-300 group-hover:scale-105"
              >
                +92 323 7594869
              </a>
            </div>
          </div>

          {/* Live Time & Quick Actions */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Live Time */}
            <div className="flex items-center gap-3 bg-gray-800/50 rounded-2xl px-4 py-2 border border-gray-600/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm font-mono">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour12: true, 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group"
            >
              <span className="text-sm">Back to Top</span>
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-8"></div>

        {/* Copyright & Info */}
        <div className={`flex flex-col lg:flex-row justify-between items-center gap-4 text-center transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* Copyright Text */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-white/80 font-light text-sm">
              Crafted with 💻 and ☕ by Tauheed
            </p>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <p className="text-white/60 text-sm">
              © 2025 All rights reserved
            </p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-gray-400 text-sm">Available for projects</span>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="flex justify-center gap-6 mt-8 lg:hidden">
          <a
            href="mailto:tauheeddeveloper13@gmail.com"
            className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 hover:scale-110 transition-transform duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href="tel:+923237594869"
            className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 hover:scale-110 transition-transform duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;