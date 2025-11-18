"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowDown, Sparkles } from "lucide-react";
import HeroExperience from "../components/HeroExperience";

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const starsRef = useRef([]);

  const words = ["TAUHEED", "CREATIVE", "INNOVATIVE", "NEXT.JS"];

  // Optimized Starfield Animation - FASTER VERSION
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(); // Reinitialize stars on resize
    };

    // Initialize stars
    const initStars = () => {
      const stars = [];
      const starCount = Math.min(120, Math.floor(window.innerWidth * window.innerHeight / 8000));
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 0.8 + 0.3, // Increased minimum depth for faster movement
          size: Math.random() * 1.5 + 0.5, // Slightly larger stars
          speed: Math.random() * 0.8 + 0.3, // Increased speed range
          opacity: Math.random() * 0.6 + 0.3, // Higher opacity range
          pulseSpeed: Math.random() * 0.03 + 0.01, // Faster pulsing
          pulseDirection: 1
        });
      }
      starsRef.current = stars;
    };

    // Animation function
    const animate = () => {
      // Clear canvas with subtle fade effect for trails
      ctx.fillStyle = 'rgba(13, 13, 18, 0.08)'; // Reduced opacity for shorter trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      
      // Update and draw stars
      stars.forEach(star => {
        // Move star based on depth - FASTER movement
        star.y += star.speed * star.z * 1.5; // 1.5x speed multiplier
        
        // Reset star if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.z = Math.random() * 0.8 + 0.3;
        }

        // Faster pulsing effect
        star.opacity += star.pulseSpeed * star.pulseDirection;
        if (star.opacity > 0.8 || star.opacity < 0.3) {
          star.pulseDirection *= -1;
        }

        // Calculate star properties based on depth
        const size = star.size * star.z;
        const brightness = star.opacity * star.z;

        // Create gradient for star
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, size * 2.5 // Smaller glow for sharper look
        );
        
        // Use the purple color palette with depth-based opacity
        gradient.addColorStop(0, `rgba(168, 85, 247, ${brightness})`);
        gradient.addColorStop(0.7, `rgba(168, 85, 247, ${brightness * 0.2})`);
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Floating particles configuration (faster version)
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 10 + 8, // Faster duration
    delay: Math.random() * 3,
  }));

  // Auto-rotate words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const textVariants = {
    enter: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#0D0D12]"
    >
      {/* ⭐ Faster Starfield Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
      />

      {/* ⭐ Faster Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#A855F7]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ⭐ Ambient Glow Effects - Slightly Faster */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A855F7] rounded-full filter blur-[100px] opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 6, // Faster duration
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A855F7] rounded-full filter blur-[80px] opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 4, // Faster duration
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ===== 3D MODEL LAYER ===== */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="w-full h-full max-w-4xl max-h-4xl scale-125 transform-gpu">
            <HeroExperience />
          </div>
        </motion.div>
      </div>

      {/* ===== MAIN HERO CONTENT ===== */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 md:px-20 mt-20 md:mt-0">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* ---------------- LEFT CONTENT ---------------- */}
            <motion.div 
              className="flex flex-col gap-8 text-center lg:text-left"
              variants={containerVariants}
            >
              {/* Welcome Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg rounded-2xl px-4 py-3 border border-white/10 self-center lg:self-start"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(168, 85, 247, 0.1)",
                  borderColor: "rgba(168, 85, 247, 0.3)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Sparkles className="w-4 h-4 text-[#A855F7]" />
                <span className="text-sm text-[#A1A1AA]">Welcome to My Universe! 🌌</span>
              </motion.div>

              {/* Dynamic Text with Smooth Transition */}
              <motion.div 
                className="space-y-4"
                variants={itemVariants}
              >
                <div className="relative h-24 md:h-32 lg:h-40 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h1 
                      key={currentWordIndex}
                      className="font-black text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight text-white absolute inset-0"
                      variants={textVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {words[currentWordIndex]}
                    </motion.h1>
                  </AnimatePresence>
                </div>
                
                {/* Static Title */}
                <motion.h2 
                  className="font-bold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#A855F7] leading-tight"
                  variants={itemVariants}
                >
                  DEVELOPER
                </motion.h2>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="text-lg md:text-xl text-[#A1A1AA] max-w-lg leading-relaxed"
                variants={itemVariants}
              >
                Crafting digital experiences with modern technologies and creative solutions. 
                Passionate about building the future of the web.
              </motion.p>

              {/* Social Links */}
              <motion.div 
                className="flex gap-4 mt-2 self-center lg:self-start"
                variants={itemVariants}
              >
                <motion.a
                  href="https://github.com/Tauheedtech231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/10 hover:border-[#A855F7]/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Github className="w-5 h-5 text-[#A1A1AA] group-hover:text-white" />
                  <span className="text-sm font-medium text-[#A1A1AA] group-hover:text-white">GitHub</span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/tauheed-khan-0781aa334/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/10 hover:border-[#A855F7]/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Linkedin className="w-5 h-5 text-[#A1A1AA] group-hover:text-white" />
                  <span className="text-sm font-medium text-[#A1A1AA] group-hover:text-white">LinkedIn</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* ---------------- RIGHT CONTENT ---------------- */}
            <motion.div 
              className="flex flex-col items-center lg:items-end gap-8 z-20"
              variants={containerVariants}
            >
              {/* Interactive Orb - Slightly faster pulse */}
              <motion.div 
                className="relative group cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#A855F7] to-[#C084FC] rounded-full flex items-center justify-center shadow-2xl shadow-[#A855F7]/30"
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 0 40px rgba(168, 85, 247, 0.3)",
                      "0 0 60px rgba(168, 85, 247, 0.5)",
                      "0 0 40px rgba(168, 85, 247, 0.3)"
                    ],
                  }}
                  transition={{
                    duration: 3, // Faster pulse
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#0D0D12] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🚀</span>
                  </div>
                </motion.div>
                
                {/* Orb Rings - Faster animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#A855F7]/30 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2, // Faster
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 border border-[#A855F7]/20 rounded-full"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 3, // Faster
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4 text-center z-20"
                variants={itemVariants}
              >
                {[
                  { number: "2+", label: "Years Exp" },
                  { number: "5+", label: "Projects" },
                  { number: "5+", label: "Clients" },
                  { number: "5+", label: "Tech Stack" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-[#A855F7]/30 transition-all duration-300 group"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="text-xl font-bold text-[#A855F7] group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ===== EXPLORE ARROW ===== */}
      <motion.div 
        className="absolute w-full bottom-8 flex justify-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      >
        <motion.button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">Explore My Universe</span>
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-[#A855F7] to-[#C084FC] rounded-full flex items-center justify-center shadow-lg shadow-[#A855F7]/20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} // Faster bounce
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;