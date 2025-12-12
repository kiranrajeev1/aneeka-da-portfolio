// src/pages/ExperienceHome.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Added FaPencilAlt for the new experience
import { FaAws, FaNetworkWired, FaPencilAlt } from "react-icons/fa";

// Custom hook for media query
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const experiences = [
  {
    role: "Cloud DevOps Trainee",
    company: "Cloudnets Solutions",
    period: "Jan 2025 – Present",
    description:
      "Gained hands-on experience with AWS and DevOps tools, focusing on building scalable cloud infrastructure and CI/CD pipelines.",
    icon: <FaAws className="text-cyan-400 text-lg" />,
  },
  {
    role: "Network Implementation Intern",
    company: "Network Bulls, Delhi",
    period: "Dec 2023",
    description:
      "Acquired practical industry experience in network setup, configuration, and troubleshooting in real-world scenarios.",
    icon: <FaNetworkWired className="text-cyan-400 text-lg" />,
  },
  // --- NEW EXPERIENCE ADDED HERE ---
  {
      role: "Content Writer",
      company: "Freelance",
    period: "2020 – 2023",
    description:
      "Delivering well-researched, engaging, and audience-focused content across diverse industries specializing in both technical and non-technical domains.",
    icon: <FaPencilAlt className="text-cyan-400 text-lg" />,
  },
];

const TimelineItem = ({ exp, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const isOdd = index % 2 !== 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isDesktop ? (isOdd ? 100 : -100) : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.4, ease: "backOut", delay: 0.3 },
    },
  };

  return (
    <div
      ref={ref}
      className={`relative w-full md:flex md:items-center ${
        isOdd ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* --- Icon / Logo Circle (The central anchor) --- */}
      <motion.div
        variants={iconVariants}
        initial="hidden"
        animate={controls}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 bg-black w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-md z-10"
      >
        {exp.icon}
      </motion.div>

      {/* --- Card --- */}
      <div className={`w-full md:w-1/2 p-4 pl-16 md:p-0 ${isOdd ? 'md:pl-12' : 'md:pr-12'}`}>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={controls}
          className={`rounded-2xl p-6 shadow-lg space-y-3 transition-all duration-300 ${
            isDesktop
              ? "bg-black/40 hover:border-cyan-400/50 border border-transparent m-6"
              : "backdrop-blur-lg bg-white/10 hover:border-cyan-400/50 border border-white/10"
          }`}
        >
          <h3 className="text-xl md:text-2xl font-bold text-cyan-200">
            {exp.role} – {exp.company}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{exp.description}</p>
        </motion.div>
      </div>

      {/* --- Date & Spacer Container --- */}
      <div className="w-full h-full md:w-1/2">
        <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={controls}
            className={`
              absolute top-[-1.5rem] left-12 text-xs 
              md:static md:top-auto md:left-auto md:translate-y-0 md:h-full md:text-sm md:flex md:items-center 
              ${isOdd ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}
              text-gray-400 italic
            `}
        >
            {exp.period}
        </motion.div>
      </div>
    </div>
  );
};

const ExperienceHome = () => {
  return (
    <section
      id="experience"
      className="w-full text-white py-24 px-4 md:px-16 overflow-hidden"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 text-center mb-20 font-['PT_Serif']">
        Experience & Training
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Central Line */}
        <div className="absolute h-full w-0.5 bg-cyan-400/30 left-4 md:left-1/2 md:-translate-x-1/2"></div>

        <div className="space-y-20 md:space-y-16">
          {experiences.map((exp, idx) => (
            <TimelineItem key={idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceHome;