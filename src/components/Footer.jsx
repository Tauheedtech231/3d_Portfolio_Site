const Footer = () => {
  return (
    <footer className="w-full flex-center flex-col md:gap-6 gap-4 bg-black-300 py-10 border-t border-gray-700">
      {/* Email */}
      <a
        href="mailto:tauheeddeveloper13@gmail.com"
        className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 md:text-lg text-sm font-medium hover:opacity-90 transition-opacity"
      >
        tauheeddeveloper13@gmail.com
      </a>

      {/* Phone */}
      <a
        href="tel:+923237594869"
        className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 md:text-lg text-sm font-medium hover:opacity-90 transition-opacity"
      >
        +92 323 7594869
      </a>

      {/* Footer Text */}
      <p className="font-light md:text-lg text-sm text-white/80 mt-4">
        2025 © All rights reserved. Designed & Developed by Tauheed
      </p>
    </footer>
  );
};

export default Footer;
