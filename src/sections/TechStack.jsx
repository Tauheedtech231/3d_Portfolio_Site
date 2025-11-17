"use client";

import { useState, useEffect, useRef } from "react";
import TechIcon from "../components/TechIcon";
import TitleHeader from "../components/TitleHeader";
import { iconsList } from "../constants";
import { motion, useInView } from "framer-motion";

const TechStack = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      
      // Sequential animation for icons
      const interval = setInterval(() => {
        setActiveIndex(prev => {
          if (prev >= iconsList.length * 2 - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 100);
    }
  }, [isInView]);

  const duplicatedIcons = [...iconsList, ...iconsList];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"
    >
      {/* Blue Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Blue Background Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-400/10 to-blue-500/5"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        />
        
        {/* Floating Blue Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(blue 1px, transparent 1px),
              linear-gradient(90deg, blue 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <TitleHeader
            title="TECH STACK"
            number="02"
            text="Technologies That Power My Digital Creations"
          />
        </motion.div>

        {/* Main Tech Stack Display */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-20 pointer-events-none"></div>
          
          {/* Blue Pulse Border */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl blur opacity-20"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Marquee Container */}
          <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-8 overflow-hidden">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-blue-400 text-sm font-medium">Tech Stack Active</span>
              </div>
              <div className="text-blue-300 text-xs bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                {iconsList.length}+ Technologies
              </div>
            </div>

            {/* Animated Marquee */}
            <div className="relative h-40 overflow-hidden">
              <motion.div
                className="flex items-center absolute top-0 left-0 h-full"
                animate={isVisible ? { x: ["0%", "-50%"] } : {}}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {duplicatedIcons.map((icon, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 mx-4"
                    initial={{ 
                      opacity: 0, 
                      scale: 0.5,
                      y: 100 
                    }}
                    animate={index <= activeIndex ? { 
                      opacity: 1, 
                      scale: 1,
                      y: 0 
                    } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: Math.floor(index % iconsList.length) * 0.1
                    }}
                    whileHover={{
                      scale: 1.2,
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <TechIcon 
                      icon={icon} 
                      isActive={index <= activeIndex}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                animate={{
                  top: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>

        {/* Floating Tech Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {["💻", "🚀", "⚡", "🔧", "🎨", "📱", "🌐", "💾"][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;