"use client";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/ContactExperience";
import ContactForm from "../components/ContactForm";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="flex-center md:p-0 px-5 relative min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #0D0D12, #13131A)'
      }}
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.4, 0.2, 0.4],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="w-full h-full container md:my-20 my-10 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <TitleHeader
            title="Contact Me"
            number="04"
            text="Let's collaborate on tailored, sustainable solutions"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Contact Form - Premium Styling */}
            <motion.div 
              className="xl:col-span-5 lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="bg-[#1A1A22] backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-purple-500/10 shadow-2xl relative overflow-hidden hover:border-purple-500/20 transition-all duration-500 group">
                {/* Form Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full group-hover:bg-red-300 transition-colors duration-300"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full group-hover:bg-yellow-300 transition-colors duration-300"></div>
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full group-hover:bg-green-300 transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500">
                    Send Message
                  </h3>
                </div>
                
                {/* Status Indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-300 text-xs font-medium">Ready</span>
                </div>
                
                {/* Your Existing Form Component */}
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Experience - Premium Styling */}
            <motion.div 
              className="xl:col-span-7 lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-purple-500/10 shadow-2xl bg-[#1A1A22] group hover:border-purple-500/20 transition-all duration-500">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 bg-[#0D0D12] border-b border-purple-500/10 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full group-hover:bg-purple-300 transition-colors duration-300"></div>
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
                        <div className="w-2.5 h-2.5 bg-purple-600 rounded-full group-hover:bg-purple-500 transition-colors duration-300"></div>
                      </div>
                      <span className="text-purple-300 text-sm font-medium">Interactive Experience</span>
                    </div>
                    <div className="text-purple-400 text-xs bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                      Live
                    </div>
                  </div>
                </div>

                {/* Your Existing Experience Component */}
                <div className="w-full h-full pt-12">
                  <ContactExperience />
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#1A1A22] to-transparent pt-8 pb-4 px-4">
                  <div className="flex items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2 text-purple-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                      Active Connection
                    </div>
                    <div className="w-px h-4 bg-purple-500/20"></div>
                    <div className="text-gray-400 text-sm">Real-time Updates</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Quick Contact Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-[#1A1A22] backdrop-blur-sm rounded-xl px-6 py-4 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-sm">Quick Response</span>
            </div>
            <div className="w-px h-4 bg-purple-500/20 hidden sm:block"></div>
            <span className="text-gray-300 text-sm">Typically reply within 24 hours</span>
            <div className="w-px h-4 bg-purple-500/20 hidden sm:block"></div>
            <span className="text-gray-300 text-sm">Available for new projects</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;