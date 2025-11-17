"use client";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/ContactExperience";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <section id="contact" className="flex-center md:p-0 px-5 relative min-h-screen">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full h-full container md:my-20 my-10 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <TitleHeader
            title="Contact Me"
            number="04"
            text="Let's collaborate on tailored, sustainable solutions"
          />
        </div>

        {/* Main Content Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Contact Form - Enhanced Styling */}
            <div className="xl:col-span-5 lg:col-span-6">
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl relative overflow-hidden">
                {/* Form Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    Send Message
                  </h3>
                </div>
                
                {/* Your Existing Form Component */}
                <ContactForm />
              </div>
            </div>

            {/* Contact Experience - Enhanced Positioning */}
            <div className="xl:col-span-7 lg:col-span-6">
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl bg-gray-900">
                {/* Status Bar */}
                

                {/* Your Existing Experience Component */}
                <div className="w-full h-full">
                  <ContactExperience />
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Quick Response</span>
            </div>
            <div className="w-px h-6 bg-gray-600 hidden sm:block"></div>
            <span className="text-gray-300 text-sm">Typically reply within 24 hours</span>
            <div className="w-px h-6 bg-gray-600 hidden sm:block"></div>
            <span className="text-gray-300 text-sm">Available for new projects</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;