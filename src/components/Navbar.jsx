import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "home", id: "hero" },
    { label: "about", id: "about" },
    { label: "projects", id: "projects" },
    { label: "tech stack", id: "techstack" },
    { label: "experience", id: "experience" },
  ];

  const contactItem = { label: "contact me", id: "contactme" };

  const handleNavClick = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
    }

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      let currentSection = "hero";
      navItems.concat(contactItem).forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            currentSection = item.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, height: 0 },
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <nav className="fixed top-2 left-2 right-2 rounded-2xl z-50 bg-white/10 backdrop-blur-md shadow-lg px-4 sm:px-8 md:px-12 py-2.5">
      <div className="flex justify-between items-center">
        {/* Mobile Hamburger Button */}
        <div className="md:hidden z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M 4 6 L 20 6"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 },
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M 4 12 L 20 12"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.15 }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M 4 18 L 20 18"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow items-center">
          <ul className="flex space-x-6 text-white font-semibold">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer capitalize text-sm px-3 py-1.5 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-cyan-400/20 text-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                    : "hover:text-cyan-400"
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* Contact Me Button */}
          <div
            className={`ml-auto cursor-pointer font-semibold capitalize text-sm px-4 py-1.5 rounded-full border transition-all duration-300 ${
              activeSection === contactItem.id
                ? "bg-cyan-400/20 border-cyan-300 text-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                : "text-white border-cyan-400/30 hover:text-cyan-300 hover:bg-cyan-500/10"
            }`}
            onClick={() => handleNavClick(contactItem.id)}
          >
            {contactItem.label}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden mt-3 origin-top"
          >
            <ul className="flex flex-col space-y-2 text-white font-semibold bg-black/50 backdrop-blur-md rounded-lg p-4 shadow-lg ring-1 ring-white/10">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={`cursor-pointer capitalize py-2 px-3 rounded transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-cyan-400/20 text-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                      : "hover:bg-white/10 hover:text-cyan-400"
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </li>
              ))}
              <li
                className={`cursor-pointer capitalize py-2 px-3 rounded border-t border-white/10 pt-3 transition-all duration-300 ${
                  activeSection === contactItem.id
                    ? "bg-cyan-400/20 text-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                    : "hover:bg-white/10 hover:text-cyan-400"
                }`}
                onClick={() => handleNavClick(contactItem.id)}
              >
                {contactItem.label}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
