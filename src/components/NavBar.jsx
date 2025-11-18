"use client";

import { useState, useEffect } from "react";
import { navItems } from "../constants";
import { Code, ChevronRight } from "lucide-react";
/* eslint-disable react/no-unknown-property */

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll detection
  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);

        const sections = navItems.map((item) => item.href.substring(1));
        const current = sections.find((section) => {
          const el = document.getElementById(section);
          if (!el) return false;

          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        });

        if (current) setActiveSection(current);
      }, 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scrolling to section
  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isScrolled
            ? "bg-[#0D0D12]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl"
            : "bg-transparent py-5"
        } px-5 md:px-10`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div
              className={`relative transition-all duration-700 transform-gpu ${
                isScrolled ? "scale-95" : "scale-100"
              }`}
            >
              {/* Purple glow */}
              <div className="absolute -inset-2 bg-[#A855F7] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-all duration-700"></div>

              <div className="relative bg-[#0D0D12] rounded-xl p-2 border border-white/10">
                <Code className="text-[#F5F5F5] w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              </div>

              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#A855F7] rounded-full animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="text-[#F5F5F5] font-bold text-base tracking-wide">
                TAUHEED
              </span>
              <span className="text-[#A1A1AA] text-sm font-medium tracking-wider">
                DEVELOPER
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-[#1A1A22]/50 backdrop-blur-lg rounded-2xl p-1 border border-white/10">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 transform-gpu group ${
                  activeSection === item.href.substring(1)
                    ? "text-[#F5F5F5] bg-[#A855F7]/20 border border-[#A855F7]/40 shadow-lg shadow-[#A855F7]/20"
                    : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/5"
                }`}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Hover Background */}
                {activeSection !== item.href.substring(1) && (
                  <div className="absolute inset-0 rounded-xl bg-[#A855F7]/0 group-hover:bg-[#A855F7]/10 transition-all duration-500"></div>
                )}
              </a>
            ))}
          </div>

        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-20">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-50 bg-[#0D0D12]/95 backdrop-blur-xl border-b border-white/10 mx-4 rounded-2xl overflow-hidden">
            <div className="p-5 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium transition-all duration-500 transform-gpu ${
                    activeSection === item.href.substring(1)
                      ? "text-[#F5F5F5] bg-[#A855F7]/20 border border-[#A855F7]/40"
                      : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      activeSection === item.href.substring(1)
                        ? "bg-[#A855F7]"
                        : "bg-[#A1A1AA]/40"
                    }`}
                  />

                  {item.name}
                  <ChevronRight className="ml-auto w-5 h-5 text-[#A855F7]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-[#A855F7] transition-all duration-500"
          style={{
            width: `${
              ((navItems.findIndex((i) => i.href.substring(1) === activeSection) + 1) /
                navItems.length) *
              100
            }%`,
          }}
        ></div>
      </div>
    </>
  );
};

export default NavBar;
