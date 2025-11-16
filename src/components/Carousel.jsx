"use client";

import { useState, useEffect } from "react";
import { slides } from "../constants";
import gsap from "gsap";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    gsap.to(".slider-container", {
      x: `-${currentSlide * 63}vw`,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [currentSlide]);

  return (
    <div className="relative w-full">
      {/* Carousel Viewport */}
      <div className="w-full relative lg:h-[60vh] md:h-[40vh] h-[60vh] overflow-hidden">
        {/* Gradient overlays */}
        <div className="carousel-gradient-left-box md:w-52 w-16 h-full absolute bottom-0 left-0 z-20"></div>
        <div className="carousel-gradient-right-box md:w-52 w-16 h-full absolute bottom-0 right-0 z-20"></div>

        {/* Slides */}
        <div className="slider-container flex absolute w-max -left-[43vw] top-0 gap-[3vw]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="slider-item w-[60vw] h-full flex-none relative rounded-2xl overflow-hidden"
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-black-300 bg-opacity-90 px-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="md:text-2xl text-white/80">{index + 1}.</p>
                  <p className="md:text-2xl text-white/80">{slide.title}</p>
                </div>
                <div className="flex items-center gap-5">
                  {slide.url && (
                    <a
                      href={slide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hidden md:flex items-center gap-2 text-2xl hover:text-green-400 transition"
                    >
                      Preview Project
                      <img
                        src="/images/arrowupright.svg"
                        alt="arrow"
                        className="w-7 h-7"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="mt-10 flex justify-end gap-5 md:-translate-x-32 -translate-x-5">
        <div
          onClick={prevSlide}
          className="rounded-full cursor-pointer bg-blue-50 hover:bg-pink-100 active:scale-90 transition-all w-12 h-12 flex-center"
        >
          <img src="/images/CaretLeft.svg" alt="left" className="w-5 h-5" />
        </div>
        <div
          onClick={nextSlide}
          className="rounded-full cursor-pointer bg-blue-50 hover:bg-pink-100 active:scale-90 transition-all w-12 h-12 flex-center"
        >
          <img src="/images/CaretRight.svg" alt="right" className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
};

export default Carousel;
