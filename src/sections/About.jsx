"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import TitleHeader from "../components/TitleHeader";
import GradientSpheres from "../components/GradientSpheres";
import { bentoSocialLinks } from "../constants";
import { Alien } from "../components/models/Alien";

const About = () => {
  return (
    <section id="about" className="relative w-full md:p-0 px-5 flex-center py-20 md:py-40">
      {/* Gradient spheres */}
      <GradientSpheres
        sphere1Class="about-gradient-sphere about-sphere-1"
        sphere2Class="about-gradient-sphere about-sphere-2"
      />

      <div className="container relative w-full z-10">
        {/* Section Header */}
        <TitleHeader
          title="About Me"
          number="01"
          text="Creative Innovator & Digital Explorer"
        />

        <div className="md:mt-20 mt-10 grid grid-cols-12 gap-5 auto-rows-auto">

          {/* Profile & Intro */}
          <div className="md:col-span-7 col-span-12 row-span-5">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-7 w-full h-full flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <img
                  src="/images/flower.svg"
                  alt="flower"
                  className="md:w-32 w-16 animate-pulse"
                />
                <h1 className="text-gradient md:text-5xl text-3xl font-bold">
                  Tauheed
                </h1>
              </div>
              <p className="md:text-2xl mt-4 text-white/80 leading-relaxed">
                I’m a tech enthusiast and creative explorer, blending design and development to craft interactive experiences. I thrive on building unique digital worlds that engage and inspire.
              </p>
            </div>
          </div>

          {/* 3D Alien Canvas */}
          <div className="md:col-span-5 col-span-12 row-span-5">
            <div className="bg-[#7ED957]/20 rounded-2xl w-full md:h-full h-60 cursor-grab transition-all">
              <Canvas>
                {/* ESLint fix: disable unknown property warning */}
                {/* eslint-disable-next-line react/no-unknown-property */}
                <ambientLight intensity={0.7} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                <Alien scale={2} position={[0, -5.5, 0]} rotation={[0, -0.5, 0]} />
              </Canvas>
            </div>
          </div>

          {/* Skills */}
          <div className="md:col-span-6 col-span-12 row-span-3">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-7 w-full h-full flex flex-col justify-center gap-3">
              <h1 className="gradient-title md:text-3xl text-2xl font-semibold">Web Design & Dev</h1>
              <p className="md:text-2xl text-white/80">
                Crafting clean, conversion-focused, and easy-to-update web experiences.
              </p>
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 row-span-3">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-7 w-full h-full flex flex-col justify-center gap-3">
              <h1 className="gradient-title md:text-3xl text-2xl font-semibold">UX/UI Design</h1>
              <p className="md:text-2xl text-white/80">
                Seamless and intuitive digital experiences to delight users.
              </p>
            </div>
          </div>

          {/* Motivational Blocks */}
          <div className="md:col-span-4 col-span-12 row-span-4 flex flex-col gap-4">
            {["BE YOURSELF!", "BE UNIQUE!", "BUILD DIFFERENT!"].map((text, i) => (
              <div key={i} className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-7 w-full h-full flex items-center justify-center">
                <h1 className="gradient-title md:text-5xl text-3xl font-bold text-center">{text}</h1>
              </div>
            ))}
          </div>

          {/* Social / Contact Blocks */}
          {bentoSocialLinks.map((item, index) => (
            <div key={index} className="md:col-span-4 col-span-12 row-span-2">
              <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-7 w-full h-full group cursor-pointer transition-transform hover:-translate-y-1">
                <div className="flex justify-between items-center h-full">
                  <div className="flex items-center md:gap-5 gap-3">
                    <img src={item.icon} alt={item.name} className="md:w-12 w-8" />
                    <h1 className="gradient-title md:text-3xl text-xl font-medium">{item.name}</h1>
                  </div>
                  <div className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <img src="/images/arrowupright.svg" alt="arrow-up" className="md:scale-100 scale-75" />
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default About;
