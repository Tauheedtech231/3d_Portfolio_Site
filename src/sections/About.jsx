"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";

import TitleHeader from "../components/TitleHeader";
import GradientSpheres from "../components/GradientSpheres";
import { bentoSocialLinks } from "../constants";
import { Alien } from "../components/models/Alien";

const About = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  // Filter out WhatsApp from social links and update URLs
  const updatedSocialLinks = bentoSocialLinks
    .filter(link => link.name !== "WhatsApp")
    .map(link => {
      if (link.name === "LinkedIn") {
        return { ...link, url: "https://www.linkedin.com/in/tauheed-khan-0781aa334/" };
      }
      if (link.name === "GitHub") {
        return { ...link, url: "https://github.com/Tauheedtech231" };
      }
      return link;
    });

  // Optimized Intersection Observer with performance improvements
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Use requestAnimationFrame for smoother animation triggering
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first trigger to improve performance
            if (sectionRef.current && observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px' // Trigger animation slightly before element comes into view
      }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const skillsData = {
    frontend: {
      title: "Frontend Architecture",
      tech: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"],
      description: "Building responsive, performant user interfaces with modern frameworks and 3D integrations"
    },
    backend: {
      title: "Backend Systems",
      tech: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis"],
      description: "Scalable server architecture, database design, and API development"
    },
    tools: {
      title: "Dev Tools & DevOps",
      tech: ["Git", "Docker", "AWS", "Vercel", "Figma"],
      description: "End-to-end development workflow and deployment pipeline management"
    }
  };

  // Scroll functions for buttons
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full flex justify-center items-start md:p-0 px-5 py-20 md:py-40 overflow-x-hidden"
      style={{ backgroundColor: '#13131A' }}
    >
      {/* ⭐ Gradient Spheres Background */}
      <GradientSpheres
        sphere1Class="about-gradient-sphere about-sphere-1"
        sphere2Class="about-gradient-sphere about-sphere-2"
      />

      {/* Main container */}
      <div className="container mx-auto relative w-full z-10">
        {/* Section Header */}
        <TitleHeader
          title="About Me"
          number="01"
          text="Full Stack Architect & Digital Innovator"
        />

        {/* MERN Stack Inspired Grid Layout */}
        <div className="mt-10 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">

          {/* Profile Card - MongoDB Inspired */}
          <div className={`lg:col-span-4 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-[#13131A] to-[#1a1a24] backdrop-blur-xl rounded-3xl p-8 w-full h-full border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-2xl shadow-purple-500/20 transition-transform duration-300 hover:scale-105">
                    <span className="text-white text-2xl font-bold">T</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h1 className="text-white text-3xl font-bold mb-2">Tauheed</h1>
                <p className="text-purple-300/80 text-sm font-medium">Full Stack Developer</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center transform transition-all duration-300 hover:scale-110">
                  <div className="text-white text-xl font-bold">5+</div>
                  <div className="text-purple-300/60 text-xs">Projects</div>
                </div>
                <div className="text-center transform transition-all duration-300 hover:scale-110">
                  <div className="text-white text-xl font-bold">2+</div>
                  <div className="text-purple-300/60 text-xs">Years</div>
                </div>
                <div className="text-center transform transition-all duration-300 hover:scale-110">
                  <div className="text-white text-xl font-bold">5+</div>
                  <div className="text-purple-300/60 text-xs">Clients</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/80 text-sm leading-relaxed text-center">
                Crafting digital experiences that blend cutting-edge technology with creative innovation. 
                Passionate about building scalable solutions and interactive web applications.
              </p>
            </div>
          </div>

          {/* 3D Alien & Express.js Inspired - Interactive Panel */}
          <div className={`lg:col-span-5 relative transform transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'
          }`}>
            <div className="bg-gradient-to-br from-[#13131A] to-[#1a1a24] backdrop-blur-xl rounded-3xl w-full h-80 lg:h-full border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 overflow-hidden group cursor-grab hover:shadow-2xl hover:shadow-purple-500/10">
              
              <Canvas
                dpr={[1, 2]} // Optimize for device pixel ratio
                gl={{ antialias: true, alpha: true }}
                performance={{ min: 0.5 }}
              >
                {/* eslint-disable-next-line react/no-unknown-property */}
                <ambientLight intensity={0.7} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <pointLight position={[10, 10, 10]} />
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate 
                  autoRotateSpeed={0.8}
                  enablePan={false}
                  enableDamping
                  dampingFactor={0.05}
                />
                <Alien 
                  scale={1.8} 
                  position={[0, -4, 0]} 
                  rotation={[0, -0.3, 0]} 
                />
              </Canvas>

              {/* Interactive Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-xl p-3 transform transition-transform duration-300 group-hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-white/70 text-xs">Drag to rotate • Scroll to zoom</span>
                </div>
              </div>
              
            </div>
          </div>

          {/* React Inspired - Skills Tabs */}
          <div className={`lg:col-span-3 transform transition-all duration-700 ease-out delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-[#13131A] to-[#1a1a24] backdrop-blur-xl rounded-3xl p-6 w-full h-full border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
              <h3 className="text-white text-lg font-bold mb-4">Tech Stack</h3>
              
              {/* Tabs */}
              <div className="flex flex-col gap-2 mb-4">
                {Object.keys(skillsData).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-left p-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      activeTab === tab
                        ? 'bg-purple-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/10'
                        : 'bg-white/5 hover:bg-white/10 hover:border-purple-400/20'
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      activeTab === tab ? 'text-purple-300' : 'text-white/70'
                    }`}>
                      {skillsData[tab].title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className="space-y-3">
                <p className="text-white/70 text-xs leading-relaxed">
                  {skillsData[activeTab].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillsData[activeTab].tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs border border-purple-400/20 transition-all duration-300 hover:scale-105 hover:bg-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Node.js Inspired - Motivational Terminal */}
          <div className={`lg:col-span-6 transform transition-all duration-700 ease-out delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-[#13131A] to-[#1a1a24] backdrop-blur-xl rounded-3xl p-6 w-full h-full border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 font-mono">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-white/60 text-sm">terminal.js</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white">echo Developer Mindset</span>
                </div>
                <div className="text-purple-300 text-sm ml-4">→ Be Yourself! Be Unique! Build Different!</div>
                
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-green-400">$</span>
                  <span className="text-white">cat philosophy.txt</span>
                </div>
                <div className="text-purple-300 text-sm ml-4">
                  Innovation happens at the intersection of technology and creativity. 
                  Every project is an opportunity to push boundaries and create something remarkable.
                </div>
              </div>
            </div>
          </div>

          {/* Social Links - Modern Grid with Fixed URLs (WhatsApp removed) */}
          <div className={`lg:col-span-6 transform transition-all duration-700 ease-out delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {updatedSocialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-[#13131A] to-[#1a1a24] backdrop-blur-xl rounded-2xl p-5 group cursor-pointer border border-white/10 hover:border-purple-400/40 transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/10">
                      <img src={item.icon} alt={item.name} className="w-6 h-6 filter brightness-0 invert" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{item.name}</h3>
                      <p className="text-purple-300/60 text-xs">Connect →</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Call to Action - Next.js Inspired with Scroll Functions */}
          <div className={`lg:col-span-12 transform transition-all duration-700 ease-out delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-purple-500/10 via-purple-600/10 to-purple-700/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
                Let's collaborate to turn your ideas into exceptional digital experiences
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-95"
                >
                  Start a Project
                </button>
                <button 
                  onClick={scrollToProjects}
                  className="border border-purple-400/30 text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:bg-purple-500/10 hover:border-purple-400/50 active:scale-95"
                >
                  View My Work
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Add CSS for smooth scrolling and performance */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Performance optimizations */
        .transform {
          will-change: transform, opacity;
        }
        
        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #13131A;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #A855F7;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #9333EA;
        }
      `}</style>
    </section>
  );
};

export default About;