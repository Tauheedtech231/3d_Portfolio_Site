"use client";

import { useEffect, useRef } from "react";
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

const JourneyCard = ({ item }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${item.progress}%` });
    }
  }, [isInView, controls, item.progress]);

  return (
    <div className="relative flex items-start gap-6" ref={ref}>
      {/* Timeline Dot - Properly Aligned */}
      <div className="absolute -left-8 mt-4 w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-2 border-gray-900 shadow-lg z-20"></div>

      {/* Card - Hover animation removed */}
      <motion.div
        className="bg-gray-900/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full border border-gray-700"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 md:text-2xl text-lg font-bold">
            {item.title}
          </h2>
          <span className="text-green-400 font-semibold md:text-lg text-sm">{item.year}</span>
        </div>
        <p className="text-gray-300 mt-2 md:text-base text-sm whitespace-pre-line leading-relaxed">
          {item.details}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
            animate={controls}
            initial={{ width: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Add PropTypes validation
JourneyCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
};

const Testimonials = () => {
  return (
    <section id="journey" className="relative flex-center md:p-0 px-5 py-20">
      {/* Background Spheres */}
      <GradientSpheres
        sphere1Class="journey-gradient-sphere journey-sphere-1"
        sphere2Class="journey-gradient-sphere journey-sphere-2"
      />

      {/* Content */}
      <div className="container relative z-10 md:my-40 my-20">
        <TitleHeader
          title="MY JOURNEY"
          number="02"
          text="Track my coding, internship, and freelancing milestones"
        />

        <div className="mt-24 relative">
          {/* Vertical Progress Line - Adjusted to align with dots */}
          <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-green-400 via-blue-500 to-purple-500 rounded-full z-10"></div>

          <div className="flex flex-col gap-16 md:ml-20 ml-16">
            {myJourney.map((item, index) => (
              <JourneyCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;