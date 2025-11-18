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
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

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
      }, 80); // Slightly faster for smoother feel
    }
  }, [isInView]);

  const duplicatedIcons = [...iconsList, ...iconsList];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D12]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Purple Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/3 via-purple-400/5 to-purple-500/3"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        {/* Floating Purple Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#A855F7 1px, transparent 1px),
              linear-gradient(90deg, #A855F7 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <TitleHeader
            title="TECH STACK"
            number="02"
            text="Technologies That Power My Digital Creations"
          />
        </motion.div>

        {/* Main Tech Stack Display */}
        <div className="relative max-w-6xl mx-auto">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#0D0D12] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#0D0D12] to-transparent z-20 pointer-events-none"></div>
          
          {/* Purple Glow Border */}
          <motion.div
            className="absolute -inset-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur-xl opacity-0"
            animate={isVisible ? {
              opacity: [0, 0.15, 0],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Marquee Container */}
          <div className="relative bg-[#1A1A22] backdrop-blur-xl rounded-xl border border-purple-500/10 p-8 overflow-hidden group hover:border-purple-500/20 transition-all duration-500">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-purple-300 text-sm font-medium">Tech Stack Active</span>
              </div>
              <div className="text-purple-300 text-xs bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20 group-hover:border-purple-500/30 transition-colors duration-300">
                {iconsList.length}+ Technologies
              </div>
            </div>

            {/* Animated Marquee */}
            <div className="relative h-32 overflow-hidden">
              <motion.div
                className="flex items-center absolute top-0 left-0 h-full"
                animate={isVisible ? { x: ["0%", "-50%"] } : {}}
                transition={{
                  x: {
                    duration: 40, // Slower for more premium feel
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {duplicatedIcons.map((icon, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 mx-6" // Increased spacing
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8,
                      y: 20 
                    }}
                    animate={index <= activeIndex ? { 
                      opacity: 1, 
                      scale: 1,
                      y: 0 
                    } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                      delay: Math.floor(index % iconsList.length) * 0.08
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
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
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                animate={{
                  top: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-purple-500/10">
              <span className="text-white/60 text-sm">Continuously Expanding</span>
              <span className="text-purple-300 text-sm font-medium">Always Learning</span>
            </div>
          </div>
        </div>

        {/* Tech Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {[
            { title: "Frontend", count: "12+", color: "from-purple-500/10 to-purple-600/5" },
            { title: "Backend", count: "8+", color: "from-purple-600/10 to-purple-700/5" },
            { title: "Tools", count: "6+", color: "from-purple-700/10 to-purple-800/5" }
          ].map((category, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${category.color} backdrop-blur-sm rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 group cursor-pointer`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors duration-300">
                  {category.title}
                </h3>
                <span className="text-purple-300 text-xs bg-purple-500/10 px-2 py-1 rounded group-hover:bg-purple-500/20 transition-colors duration-300">
                  {category.count}
                </span>
              </div>
              <div className="mt-2 w-full bg-white/10 rounded-full h-1">
                <motion.div
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-1 rounded-full"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${70 + index * 10}%` } : {}}
                  transition={{ delay: 0.8 + index * 0.2, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subtle Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl opacity-10 text-purple-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 180, 360],
                scale: [0.7, 1.1, 0.7],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            >
              {["⚡", "🚀", "💎", "✨", "🔮", "🌟"][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;