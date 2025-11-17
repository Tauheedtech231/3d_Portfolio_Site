"use client";

import { useState, useEffect, useRef } from "react";
import GradientSpheres from "../components/GradientSpheres";
import HeroExperience from "../components/HeroExperience";
import { Github, Linkedin, ArrowDown, Sparkles } from "lucide-react";
/* eslint-disable react/no-unknown-property */

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);

  const words = ["TAUHEED", "CREATIVE", "INNOVATIVE", "NEXT.JS"];
  const currentWord = words[currentWordIndex];

  // Starfield Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star particles
    const stars = [];
    const starCount = 200;

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    // Shooting stars
    const shootingStars = [];
    let lastShootingStar = 0;

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        speedX: (Math.random() * 8 + 4) * (Math.random() > 0.5 ? 1 : -1),
        speedY: Math.random() * 4 + 2,
        length: Math.random() * 50 + 30,
        opacity: 1,
        life: 1
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();

      // Create occasional shooting stars
      if (currentTime - lastShootingStar > 2000 && Math.random() < 0.02) {
        createShootingStar();
        lastShootingStar = currentTime;
      }

      // Draw and update stars
      stars.forEach(star => {
        // Update star position
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Pulsing effect
        star.opacity += star.pulseSpeed * star.pulseDirection;
        if (star.opacity > 0.8 || star.opacity < 0.3) {
          star.pulseDirection *= -1;
        }

        // Draw star with glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Create gradient for star glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        // Update position
        star.x += star.speedX;
        star.y += star.speedY;
        star.life -= 0.02;

        if (star.life <= 0 || star.x < 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw shooting star with trail
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.speedX * 2, star.y - star.speedY * 2);
        
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.speedX * 2, star.y - star.speedY * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.life})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
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

  // Typewriter effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWord]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden text-white"
    >
      {/* ⭐ Animated Starfield Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a2e, #16213e)' }}
      />

      {/* ⭐ Floating Gradient Spheres */}
      <GradientSpheres
        sphere1Class="gradient-sphere sphere-1"
        sphere2Class="gradient-sphere sphere-2"
      />

      {/* ===== MAIN HERO CONTENT ===== */}
      {/* Added mt-20 to push content below navbar */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 md:px-20 mt-20 md:mt-0">

        {/* Main Content Container */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* ---------------- LEFT CONTENT ---------------- */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              {/* Welcome Badge - Now properly positioned */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20 self-center lg:self-start">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-sm opacity-90">Welcome to My Universe! 🌌</span>
              </div>

              {/* Dynamic Typing Text */}
              <div className="space-y-2">
                <h1 className="font-black text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight">
                  {displayText}
                  <span className={`inline-block w-0.5 h-12 bg-gradient-to-b from-green-400 to-blue-500 ml-1 animate-pulse`}></span>
                </h1>
                
                {/* Static Title */}
                <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 leading-tight">
                  DEVELOPER
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl opacity-80 max-w-lg leading-relaxed">
                Crafting digital experiences with modern technologies and creative solutions. 
                Passionate about building the future of the web.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-4 self-center lg:self-start">
                <a
                  href="https://github.com/Tauheedtech231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:border-green-400/50 hover:bg-green-400/10 transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/tauheed-khan-0781aa334/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* ---------------- RIGHT CONTENT ---------------- */}
            <div className="flex flex-col items-center lg:items-end gap-6">
              {/* Interactive Orb */}
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 animate-pulse-slow group-hover:scale-110 transition-transform duration-500">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🚀</span>
                  </div>
                </div>
                
                {/* Orb Rings */}
                <div className="absolute inset-0 border-2 border-green-400/30 rounded-full animate-ping-slow group-hover:border-blue-400/50"></div>
                <div className="absolute inset-4 border-2 border-blue-400/20 rounded-full animate-ping-slower group-hover:border-purple-400/50"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 text-center">
                {[
                  { number: "2+", label: "Years Exp", color: "from-green-400 to-emerald-500" },
                  { number: "5+", label: "Projects", color: "from-blue-400 to-cyan-500" },
                  { number: "5+", label: "Clients", color: "from-purple-400 to-pink-500" },
                  { number: "5+", label: "Tech Stack", color: "from-orange-400 to-red-500" }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform`}>
                      {stat.number}
                    </div>
                    <div className="text-xs opacity-70 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 3D MODEL LAYER ===== */}
      <div className="absolute inset-0 z-5 pointer-events-none opacity-70">
        <HeroExperience />
      </div>

      {/* ===== EXPLORE ARROW ===== */}
      <div className="absolute w-full bottom-8 flex justify-center z-10">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300"
        >
          <span className="text-sm opacity-90 group-hover:opacity-100">Explore My Universe</span>
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-green-500/20 transition-all duration-300 animate-bounce">
            <ArrowDown className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;