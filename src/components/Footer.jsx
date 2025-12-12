import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// SVG Icon Components
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// --- NEW: Email Icon ---
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.107 10-8.107v11.817h-20z"/>
  </svg>
);


const Footer = () => {
  // --- UPDATED: Replaced Twitter with Email ---
  const socials = [
    { label: "GitHub", link: "https://github.com/AneekaSA", icon: <GitHubIcon /> },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/aneeka-sa/", icon: <LinkedInIcon /> },
    { label: "Email", link: "mailto:aneeka.sa@gmail.com", icon: <EmailIcon /> }, 
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // Reset when it goes out of view
    }
  }, [controls, inView]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.footer
      ref={ref}
      variants={footerContainerVariants}
      initial="hidden"
      animate={controls}
      className="w-full text-white p-6 mt-16 bg-black/20 backdrop-blur-lg border-t border-t-cyan-400/20 shadow-[0_-5px_15px_-5px_rgba(0,255,255,0.1)]"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <motion.p variants={itemVariants} className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Aneeka S A. All Rights Reserved.
        </motion.p>
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.link}
              target={social.label === "Email" ? "_self" : "_blank"} // Open mailto links in the same tab
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -4 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
        <motion.button
          variants={itemVariants}
          onClick={scrollToTop}
          className="text-gray-300 hover:text-cyan-400 font-semibold transition-colors duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          Back to Top
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </motion.button>
      </div>
    </motion.footer>
  );
};

export default Footer;
