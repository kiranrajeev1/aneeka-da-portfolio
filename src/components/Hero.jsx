import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Name from "./Name.jsx";
import photo from "../assets/aneeka.jpg";

const Hero = ({ className }) => {
  const controls = useAnimation();

  // Trigger when 50% of the section is visible
  const [ref, inView] = useInView({
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      // Reverting to your original "exit" logic
      controls.start("exit");
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.8 } },
  };

  const photoVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: -100, transition: { duration: 0.8 } },
  };

  // Buttons + socials animation
  const buttonsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  const socials = [
    { label: "GitHub", link: "https://github.com/AneekaSA" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/aneeka-sa/" },
    { label: "Email", link: "mailto:aneeka.sa@gmail.com" },
  ];

return (
  <section
    id="hero"
    // --- CHANGES ARE HERE ---
    className={`w-full min-h-screen flex flex-col justify-center items-center ${className} px-4 sm:px-8 md:px-16 lg:px-24 pb-12`} // Use min-h-screen and add top/bottom padding
    ref={ref}
  >
    <div className="flex flex-col md:flex-row w-full items-center"> {/* Removed h-full */}
      {/* Left: Name + Buttons + Socials */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center text-left p-4 space-y-6"
        variants={textVariants}
        initial="hidden"
        animate={controls}
        exit="exit"
      >
        <Name />

        {/* Buttons + Socials */}
        <motion.div
          className="flex flex-row items-center justify-center md:justify-start gap-4 mt-4 flex-wrap"
          variants={buttonsVariants}
        >
         <a
  href="https://drive.google.com/file/d/18yH2EO7me7dWTyNqDGD3MX8Iot7drwhk/view?usp=drive_link"
  target="blank"
  download
  className="
    relative 
    inline-block  overflow-hidden 
    group
    px-7 
    py-3 
    rounded-xl 
    font-semibold 
    text-cyan-300 
    tracking-wide 
    transition-all 
    duration-300 
    ease-out 
    border 
    border-cyan-400/40 
    shadow-[0_0_10px_rgba(0,255,255,0.2)]
    hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
    hover:border-cyan-400
    hover:text-cyan-200
    bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10
    backdrop-blur-sm
    hover:scale-105
  "
>
  <span
    className="
      absolute 
      inset-0 
      w-full 
      h-full 
      bg-gradient-to-r 
      from-transparent 
      via-cyan-400/30 
      to-transparent 
      translate-x-[-100%] 
      group-hover:translate-x-[100%] 
      transition-transform 
      duration-700 
      ease-in-out
    "
  ></span>
  <span className="relative z-10">Download Resume</span>
</a>

<a
  href="#contact"
  className="
    inline-block  bg-white/10
    backdrop-blur-sm 
    border 
    border-white/20 
    text-white 
    font-semibold 
    py-3  
    px-7 
    rounded-xl 
    shadow-lg 
    hover:bg-white/20 
    hover:text-cyan-300 
    transition-all 
    duration-300
    hover:scale-105
  "
  onClick={(e) => {
    e.preventDefault();
    document.getElementById('contactme')?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  Contact Me
</a>

          {socials.map((social) => (
            <a
              key={social.label}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-200 font-semibold py-2 rounded transition-colors"
            >
              {social.label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Right: Photo */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center pt-8 md:pt-20"
        variants={photoVariants}
        initial="hidden"
        animate={controls}
        exit="exit"
      >
        <img
          src={photo}
          alt="Profile"
          className="rounded-xl w-64 h-64 sm:w-80 sm:h-80 md:w-[32rem] md:h-[32rem] object-cover shadow-2xl"
        />
      </motion.div>
    </div>
  </section>
);

};

export default Hero;
