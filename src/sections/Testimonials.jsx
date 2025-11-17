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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    const shootingStars = [];
    let lastShootingStar = 0;

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        speedX: (Math.random() * 6 + 3) * (Math.random() > 0.5 ? 1 : -1),
        speedY: Math.random() * 3 + 1.5,
        length: Math.random() * 40 + 20,
        opacity: 1,
        life: 1
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();

      if (currentTime - lastShootingStar > 3000 && Math.random() < 0.01) {
        createShootingStar();
        lastShootingStar = currentTime;
      }

      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        star.opacity += star.pulseSpeed * star.pulseDirection;
        if (star.opacity > 0.8 || star.opacity < 0.2) {
          star.pulseDirection *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        star.x += star.speedX;
        star.y += star.speedY;
        star.life -= 0.015;

        if (star.life <= 0 || star.x < 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.speedX * 2, star.y - star.speedY * 2);
        
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.speedX * 2, star.y - star.speedY * 2
        );
        gradient.addColorStop(0, `rgba(100, 200, 255, ${star.life})`);
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a2e, #16213e)' }}
    />
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
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.2
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${item.progress}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: index * 0.2 + 0.3
      }
    }
  };

  const getIcon = (index) => {
    const icons = ["🎓", "💻", "🚀", "⭐"];
    return icons[index] || "🌟";
  };

  const getGradient = (index) => {
    const gradients = [
      "from-blue-500 to-cyan-400",
      "from-green-500 to-emerald-400", 
      "from-purple-500 to-pink-400",
      "from-orange-500 to-red-400"
    ];
    return gradients[index] || "from-gray-500 to-gray-400";
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center justify-center mb-8 md:mb-16"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Timeline Line Connector */}
      {index < myJourney.length - 1 && (
        <div className={`absolute top-16 left-4 md:left-1/2 w-0.5 h-8 md:h-16 bg-gradient-to-b ${getGradient(index)} z-0`} />
      )}

      {/* Main Card */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 w-full max-w-2xl border border-gray-700/50 shadow-xl z-10 ml-12 md:ml-0">
        {/* Icon Badge */}
        <motion.div
          className={`absolute -left-10 md:-left-6 top-4 md:-top-6 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${getGradient(index)} flex items-center justify-center text-xl md:text-2xl shadow-xl border-2 md:border-4 border-gray-900`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200,
            delay: index * 0.2 + 0.1
          }}
        >
          {getIcon(index)}
        </motion.div>

        {/* Progress Ribbon */}
        <div className="absolute -top-2 right-4 md:right-8 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {item.progress}% Complete
        </div>

        {/* Content */}
        <div className="mt-2 md:mt-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 md:mb-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 text-lg md:text-xl font-bold leading-tight pr-4 mb-2 md:mb-0">
              {item.title}
            </h3>
            <span className="text-green-400 font-semibold text-base md:text-lg whitespace-nowrap">
              {item.year}
            </span>
          </div>

          <motion.p 
            className="text-gray-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {item.details}
          </motion.p>

          {/* Animated Progress Bar */}
          <div className="relative">
            <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{item.progress}%</span>
            </div>
            <div className="w-full h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className={`h-2 md:h-3 bg-gradient-to-r ${getGradient(index)} rounded-full`}
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
          </div>
        </div>
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
    }, 400);

    return () => clearTimeout(timer);
  }, [animatedCount]);

  return (
    <section id="journey" className="relative min-h-screen flex items-center justify-center md:p-0 px-4 py-16 md:py-20 overflow-hidden">
      {/* Star Field Background */}
      <StarField />

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
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-4 md:gap-8 bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 border border-gray-700/50">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                {animatedCount}
              </div>
              <div className="text-gray-400 text-xs md:text-sm">Milestones</div>
            </div>
            <div className="w-px h-8 md:h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {myJourney.length}
              </div>
              <div className="text-gray-400 text-xs md:text-sm">Total</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line - Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full z-0 hidden md:block" />
          
          {/* Vertical Left Line - Mobile */}
          <div className="absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 z-0 md:hidden" />

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
                  index % 2 === 0 ? "md:pr-6 lg:pr-12" : "md:pl-6 lg:pl-12"
                }`}>
                  <JourneyCard item={item} index={index} />
                </div>
              </div>
            ))}
          </div>

          {/* Completion Celebration */}
          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: animatedCount === myJourney.length ? 1 : 0, 
              scale: animatedCount === myJourney.length ? 1 : 0.8 
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-green-400/20">
              <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-3 md:mb-4">
                🎉 Journey in Progress!
              </h3>
              <p className="text-gray-300 text-base md:text-lg">
                Every milestone is a step toward greater achievements. The adventure continues...
              </p>
            </div>
          </motion.div>
        </div>

        {/* Simple Scroll to Top Button */}
        <div className="fixed bottom-6 right-6 bg-gray-900/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700/50 shadow-xl cursor-pointer z-30 hidden md:block">
          <div className="text-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="text-green-400 text-sm font-semibold">↑</div>
            <div className="text-white text-xs mt-1">Top</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;