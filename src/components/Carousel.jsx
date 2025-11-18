"use client";

import { useState, useEffect, useCallback } from "react";
import { slides } from "../constants";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Stacked Cards Effect for Desktop - PREMIUM STYLING
  const DesktopView = () => (
    <div className="hidden md:block relative h-[500px] w-full max-w-5xl mx-auto px-4">
      {/* Main Active Card - PREMIUM STYLING */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-[85%] max-w-4xl h-[450px] transition-all duration-500 group">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 bg-[#1A1A22] group-hover:border-purple-400/40 group-hover:shadow-purple-500/10 transition-all duration-500">
          <img
            src={slides[currentSlide].img}
            alt={slides[currentSlide].title}
            className="w-full h-full object-contain bg-black transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A22] via-[#1A1A22]/90 to-transparent p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-white text-2xl font-bold">
                {slides[currentSlide].title}
              </h3>
              {slides[currentSlide].url && (
                <a
                  href={slides[currentSlide].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500/10 backdrop-blur-sm text-purple-300 px-6 py-3 rounded-xl hover:bg-purple-500/20 hover:text-white border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 flex items-center gap-2 text-sm hover:scale-105"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Previous Card (Left Stack) */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[75%] h-[400px] z-20 opacity-60 blur-[1px] group">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl bg-[#1A1A22] border border-purple-500/10 group-hover:border-purple-500/20 transition-all duration-500">
          <img
            src={slides[(currentSlide - 1 + slides.length) % slides.length].img}
            alt="previous"
            className="w-full h-full object-contain bg-black opacity-80"
          />
        </div>
      </div>

      {/* Next Card (Right Stack) */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[75%] h-[400px] z-10 opacity-40 blur-[2px] group">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-[#1A1A22] border border-purple-500/10 group-hover:border-purple-500/20 transition-all duration-500">
          <img
            src={slides[(currentSlide + 1) % slides.length].img}
            alt="next"
            className="w-full h-full object-contain bg-black opacity-60"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
        <button
          onClick={prevSlide}
          className="bg-[#1A1A22] shadow-2xl rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:bg-purple-500/10 border border-purple-500/20 hover:border-purple-400/40 group"
          aria-label="Previous project"
        >
          <svg className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex gap-2 bg-[#1A1A22] backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/20">
          <span className="text-purple-300 font-bold text-sm">{currentSlide + 1}</span>
          <span className="text-white/70 mx-1">/</span>
          <span className="text-white/70 text-sm">{slides.length}</span>
        </div>

        <button
          onClick={nextSlide}
          className="bg-[#1A1A22] shadow-2xl rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:bg-purple-500/10 border border-purple-500/20 hover:border-purple-400/40 group"
          aria-label="Next project"
        >
          <svg className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Additional Indicators */}
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-purple-400 scale-125 shadow-sm shadow-purple-400/50' 
                : 'bg-white/40 hover:bg-purple-300/60 hover:scale-110'
            }`}
            aria-label={`View project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  // Mobile View - PREMIUM STYLING
  const MobileView = () => (
    <div className="block md:hidden w-full px-4">
      {/* Current Slide - PREMIUM STYLING */}
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-2xl mb-6 bg-[#1A1A22] border border-purple-500/20 group hover:border-purple-400/40 transition-all duration-500">
        <img
          src={slides[currentSlide].img}
          alt={slides[currentSlide].title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A22] to-transparent p-4">
          <h3 className="text-white text-lg font-bold mb-2 truncate">
            {slides[currentSlide].title}
          </h3>
          {slides[currentSlide].url && (
            <a
              href={slides[currentSlide].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-purple-500/10 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-lg text-xs hover:bg-purple-500/20 hover:text-white border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
            >
              View Project
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Thumbnail Grid - PREMIUM STYLING */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 border-2 group ${
              index === currentSlide 
                ? 'border-purple-400 scale-105 shadow-lg shadow-purple-500/20' 
                : 'border-purple-500/20 hover:border-purple-400/40 hover:scale-102'
            }`}
            aria-label={`Select project ${index + 1}`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-purple-500/10 transition-all duration-300">
              <span className={`text-white font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-purple-500' 
                  : 'bg-black/50 group-hover:bg-purple-500/80'
              }`}>
                {index + 1}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Navigation - PREMIUM STYLING */}
      <div className="flex justify-between items-center bg-[#1A1A22] backdrop-blur-sm rounded-2xl p-3 border border-purple-500/10">
        <button
          onClick={prevSlide}
          className="flex items-center gap-2 text-purple-300 text-sm bg-purple-500/10 rounded-full px-4 py-2 hover:bg-purple-500/20 hover:text-white border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
          aria-label="Previous project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-purple-300 font-bold">{currentSlide + 1}</span>
          <span className="text-white/60">/</span>
          <span className="text-white/60">{slides.length}</span>
        </div>

        <button
          onClick={nextSlide}
          className="flex items-center gap-2 text-purple-300 text-sm bg-purple-500/10 rounded-full px-4 py-2 hover:bg-purple-500/20 hover:text-white border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
          aria-label="Next project"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full py-8 bg-[#13131A] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Click on any project to view details or visit the live demo
          </p>
        </div>

        {/* Carousel */}
        {isMobile ? <MobileView /> : <DesktopView />}

        {/* Project Info */}
        <div className="text-center mt-16 px-4">
          <div className="inline-flex items-center gap-4 bg-[#1A1A22] backdrop-blur-sm rounded-2xl px-6 py-3 border border-purple-500/10">
            <div className="flex items-center gap-2 text-purple-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Click thumbnails to navigate</span>
            </div>
            <div className="w-px h-4 bg-purple-500/20"></div>
            <div className="text-white/60 text-sm">
              {currentSlide + 1} of {slides.length} projects
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;