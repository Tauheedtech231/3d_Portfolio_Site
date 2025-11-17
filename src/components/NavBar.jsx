"use client";

import { useState, useEffect } from "react";
import { navItems } from "../constants";
import { Code, ChevronRight } from "lucide-react";
/* eslint-disable react/no-unknown-property */



const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent py-5"
      } px-5 md:px-10`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo with Animation */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className={`relative transition-all duration-500 ${
              isScrolled ? "scale-90" : "scale-100"
            }`}>
              {/* Animated Background */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              {/* Logo Icon */}
              <div className="relative bg-gray-900 rounded-xl p-2 border border-white/10">
                <Code className="text-white w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300" />
              </div>
              
              {/* Pulsing Dot */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm md:text-base tracking-wide">
                TAUHEED
              </span>
              <span className="text-white/60 text-xs md:text-sm font-medium tracking-wider">
                DEVELOPER
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  activeSection === item.href.substring(1)
                    ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Hover Effect */}
                {activeSection !== item.href.substring(1) && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                )}
                
                {/* Active Indicator - CSS based instead of Framer Motion */}
                {activeSection === item.href.substring(1) && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse-slow" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-20">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative z-50 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 mx-4 rounded-2xl overflow-hidden">
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 group ${
                    activeSection === item.href.substring(1)
                      ? "text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {/* Animated Dot */}
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 scale-125"
                      : "bg-white/30 group-hover:bg-white/50"
                  }`} />
                  
                  <span>{item.name}</span>
                  
                  {/* Arrow Indicator */}
                  <div className={`ml-auto transition-transform duration-300 ${
                    activeSection === item.href.substring(1) ? "rotate-45" : "group-hover:translate-x-1"
                  }`}>
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  </div>
                </a>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="text-center text-white/50 text-sm">
                Crafted with 💻
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          style={{
            width: `${(navItems.findIndex(item => item.href.substring(1) === activeSection) + 1) / navItems.length * 100}%`
          }}
        />
      </div>

      {/* Custom CSS Animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default NavBar;