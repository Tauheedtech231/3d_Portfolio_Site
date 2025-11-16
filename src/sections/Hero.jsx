"use client";

import GradientSpheres from "../components/GradientSpheres";
import HeroExperience from "../components/HeroExperience";
import StarsCanvas from "../components/StarsCanvas";
import { Github, Linkedin } from "lucide-react"; // LinkedIn icon

const Hero = () => {
  return (
    <section
      id="home"
      className="w-screen h-dvh overflow-hidden relative text-white md:p-0 px-5"
    >
      {/* Stars Background */}
      <StarsCanvas />

      <div className="gradient-box w-full h-96 absolute bottom-0 left-0 z-20"></div>

      <GradientSpheres
        sphere1Class="gradient-sphere sphere-1"
        sphere2Class="gradient-sphere sphere-2"
      />

      <div className="w-full h-full flex-center relative z-30">
        <div className="container relative w-full h-full">
          <div className="md:mt-40 mt-20 space-y-4">

            {/* Intro Text */}
            <p className="font md:text-xl text-base text-white tracking-wide">
              👋 Hey, I am Here
            </p>

            {/* Name */}
            <h1 className="font-extrabold md:text-7xl text-4xl text-white leading-tight tracking-tight">
              TAUHEED
            </h1>

            {/* Title */}
            <h1 className="font-extrabold md:text-7xl text-4xl text-white leading-tight tracking-tight">
              NEXT.JS
            </h1>

          </div>

          <div className="absolute w-full z-30 bottom-20 right-0">
            <div className="flex justify-between items-end">

              {/* Explore Section */}
              <div className="flex flex-col items-center md:gap-5 gap-1">
                <p className="md:text-base text-xs text-white tracking-wide">Explore</p>
                <img
                  src="/images/arrowdown.svg"
                  alt="arrowdown"
                  className="size-7 animate-bounce"
                />
              </div>

              {/* Developer Text + GitHub & LinkedIn Buttons */}
              <div className="flex flex-col items-end gap-4">
                <img src="/images/shape.svg" alt="shape" />
                <h1 className="font-extrabold md:text-7xl text-4xl text-white leading-tight tracking-tight">
                  DEVELOPER
                </h1>

                <div className="flex gap-3">
                  {/* GitHub Button */}
                  <a
                    href="https://github.com/Tauheedtech231"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Github className="text-white w-6 h-6" />
                  </a>

                  {/* LinkedIn Button */}
                  <a
                    href="https://www.linkedin.com/in/tauheed-khan-0781aa334/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Linkedin className="text-white w-6 h-6" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Experience Layer */}
      <div className="w-full h-full absolute top-0 left-0 z-10">
        <HeroExperience />
      </div>
    </section>
  );
};

export default Hero;
