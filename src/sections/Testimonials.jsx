"use client";

import { useEffect, useRef, useState } from "react";
import GradientSpheres from "../components/GradientSpheres";
import TitleHeader from "../components/TitleHeader";
import { motion, useAnimation, useInView } from "framer-motion";
import PropTypes from 'prop-types';

const myJourney = [
  {
    title: "Comsats University Vehari Campus - SE Admission",
    year: "2023",
    details: "Started my software engineering journey.",
    progress: 10,
  },
  {
    title: "Started Coding Journey",
    year: "2nd Semester",
    details: "Learned C++, HTML, CSS, JavaScript, and built small projects.",
    progress: 30,
  },
  {
    title: "Internship at Largify Solutions | Remote",
    year: "4th Semester | June 2025 – August 2025",
    details: `• Developed ERP and POS features, improving efficiency by 35%.
• Collaborated in an agile team and met project milestones.
• Implemented JWT authentication and optimized performance.`,
    progress: 70,
  },
  {
    title: "Freelancer & Current Projects",
    year: "Present",
    details: "Working as a freelancer, building full-stack web apps and contributing to real projects.",
    progress: 100,
  },
];

const StarField = () => {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const starsRef = useRef([]);

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
      const starCount = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 10000));
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 0.8 + 0.3,
          size: Math.random() * 1.2 + 0.3,
          speed: Math.random() * 0.6 + 0.2,
          opacity: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulseDirection: 1
        });
      }
      starsRef.current = stars;
    };

    // Animation function
    const animate = () => {
      // Clear canvas with subtle fade effect for trails
      ctx.fillStyle = 'rgba(13, 13, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      
      // Update and draw stars
      stars.forEach(star => {
        // Move star based on depth
        star.y += star.speed * star.z * 1.5;
        
        // Reset star if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.z = Math.random() * 0.8 + 0.3;
        }

        // Pulsing effect
        star.opacity += star.pulseSpeed * star.pulseDirection;
        if (star.opacity > 0.7 || star.opacity < 0.2) {
          star.pulseDirection *= -1;
        }

        // Calculate star properties based on depth
        const size = star.size * star.z;
        const brightness = star.opacity * star.z;

        // Create gradient for star
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, size * 2.5
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// Floating particles for additional depth
const FloatingParticles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 3,
  }));

  return (
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
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15],
            opacity: [0.1, 0.2, 0.1],
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
  );
};

const JourneyCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.15
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${item.progress}%`,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: index * 0.15 + 0.3
      }
    }
  };

  const getIcon = (index) => {
    const icons = ["🎓", "💻", "🚀", "⭐"];
    return icons[index] || "🌟";
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center justify-center mb-8 md:mb-12"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Timeline Line Connector */}
      {index < myJourney.length - 1 && (
        <motion.div 
          className="absolute top-16 left-4 md:left-1/2 w-0.5 h-8 md:h-12 bg-gradient-to-b from-[#A855F7]/40 to-[#C084FC]/40 z-0"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.15 + 0.5,
            ease: "easeOut"
          }}
        />
      )}

      {/* Main Card */}
      <div className="relative bg-[#1A1A22]/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-6 w-full max-w-2xl border border-[#A855F7]/10 shadow-lg hover:shadow-[#A855F7]/5 hover:border-[#A855F7]/20 transition-all duration-300 z-10 ml-12 md:ml-0 group">
        {/* Icon Badge */}
        <motion.div
          className="absolute -left-10 md:-left-6 top-4 md:-top-6 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#A855F7] to-[#C084FC] flex items-center justify-center text-lg md:text-xl shadow-lg border-2 border-[#1A1A22] group-hover:scale-110 transition-transform duration-300"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 20,
            delay: index * 0.15 + 0.2
          }}
          whileHover={{
            scale: 1.15,
            rotate: 5,
            transition: { duration: 0.3 }
          }}
        >
          {getIcon(index)}
        </motion.div>

        {/* Progress Ribbon */}
        <motion.div 
          className="absolute -top-2 right-4 md:right-6 bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          {item.progress}% Complete
        </motion.div>

        {/* Content */}
        <div className="mt-2 md:mt-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <motion.h3 
              className="text-white text-base md:text-lg font-semibold leading-tight pr-4 mb-2 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              {item.title}
            </motion.h3>
            <motion.span 
              className="text-[#C084FC] font-medium text-sm md:text-base whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.35 }}
            >
              {item.year}
            </motion.span>
          </div>

          <motion.p 
            className="text-[#A1A1AA] leading-relaxed mb-4 text-sm md:text-base whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {item.details}
          </motion.p>

          {/* Animated Progress Bar */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            <div className="flex justify-between text-xs text-[#A1A1AA] mb-2">
              <span>Progress</span>
              <span>{item.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#0D0D12] rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] rounded-full shadow-sm"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#A855F7]/0 via-[#A855F7]/5 to-[#A855F7]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

JourneyCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Journey = () => {
  const containerRef = useRef(null);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animatedCount < myJourney.length) {
        setAnimatedCount(prev => prev + 1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [animatedCount]);

  // Ambient glow effects
  const AmbientGlow = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#A855F7] rounded-full filter blur-[80px] opacity-5"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-[#A855F7] rounded-full filter blur-[60px] opacity-5"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.05, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );

  return (
    <section id="journey" className="relative min-h-screen flex items-center justify-center md:p-0 px-4 py-16 md:py-20 overflow-hidden bg-[#0D0D12]">
      {/* Star Field Background */}
      <StarField />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Ambient Glow Effects */}
      <AmbientGlow />

      {/* Background Spheres */}
      <GradientSpheres
        sphere1Class="journey-gradient-sphere journey-sphere-1"
        sphere2Class="journey-gradient-sphere journey-sphere-2"
      />

      {/* Content */}
      <div className="container relative z-10 max-w-6xl mx-auto" ref={containerRef}>
        <TitleHeader
          title="MY JOURNEY"
          number="04"
          text="From aspiring student to professional developer - The evolution continues"
        />

        {/* Animated Counter */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-4 md:gap-8 bg-[#1A1A22]/80 backdrop-blur-lg rounded-lg md:rounded-xl px-6 md:px-8 py-3 md:py-4 border border-[#A855F7]/10 hover:border-[#A855F7]/20 transition-all duration-300">
            <div className="text-center">
              <motion.div 
                className="text-2xl md:text-3xl font-bold text-[#A855F7]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  delay: 0.2
                }}
              >
                {animatedCount}
              </motion.div>
              <div className="text-[#A1A1AA] text-xs md:text-sm">Milestones</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-[#A855F7]/20"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#A855F7]">
                {myJourney.length}
              </div>
              <div className="text-[#A1A1AA] text-xs md:text-sm">Total</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line - Desktop */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#A855F7]/30 via-[#C084FC]/30 to-[#A855F7]/30 z-0 hidden md:block"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          
          {/* Vertical Left Line - Mobile */}
          <motion.div 
            className="absolute left-4 top-0 w-0.5 h-full bg-gradient-to-b from-[#A855F7]/30 to-[#C084FC]/30 z-0 md:hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Journey Cards */}
          <div className="space-y-2 md:space-y-0">
            {myJourney.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div className={`w-full md:w-5/6 lg:w-1/2 ${
                  index % 2 === 0 ? "md:pr-6 lg:pr-8" : "md:pl-6 lg:pl-8"
                }`}>
                  <JourneyCard item={item} index={index} />
                </div>
              </div>
            ))}
          </div>

          {/* Completion Celebration */}
          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: animatedCount === myJourney.length ? 1 : 0, 
              scale: animatedCount === myJourney.length ? 1 : 0.9,
              y: animatedCount === myJourney.length ? 0 : 20
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-[#1A1A22]/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-6 border border-[#A855F7]/20 hover:border-[#A855F7]/30 transition-all duration-300">
              <h3 className="text-lg md:text-xl font-semibold text-[#C084FC] mb-3">
                🎉 Journey in Progress!
              </h3>
              <p className="text-[#A1A1AA] text-sm md:text-base">
                Every milestone is a step toward greater achievements. The adventure continues...
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll to Top Button */}
        <motion.div 
          className="fixed bottom-6 right-6 bg-[#1A1A22]/80 backdrop-blur-xl rounded-lg p-3 border border-[#A855F7]/20 shadow-lg cursor-pointer z-30 hidden md:block hover:border-[#A855F7]/40 hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="text-center">
            <div className="text-[#A855F7] text-sm font-semibold">↑</div>
            <div className="text-white text-xs mt-1">Top</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;