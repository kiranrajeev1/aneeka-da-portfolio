import React from 'react';
import { motion } from 'framer-motion';

const Name = ({ name = 'Aneeka' }) => {
  // Variants for each text element
  const introVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const roleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } },
  };

  return (
    // Reverted to original h-full and pt-25 for desktop, added mobile overrides
    <div className="text-center md:text-left space-y-4 h-full flex flex-col justify-center pt-16 md:pt-16">
      {/* Small intro - Mobile: text-lg, Desktop: md:text-3xl (Original) */}
      <motion.p
        className="text-lg md:text-3xl text-white font-['PT_Serif']"
        variants={introVariants}
        initial="hidden"
        animate="visible"
      >
        Hey, I’m
        {/* Mobile: text-5xl, Desktop: md:text-6xl (Original) */}
        <span className="font-semibold text-5xl md:text-6xl pl-3 md:pl-4 text-cyan-200">{name}</span>
      </motion.p>

      {/* Role - Mobile: text-2xl, Desktop: md:text-4xl (Original) */}
      <motion.p
        className="text-2xl md:text-4xl text-gray-300"
        variants={roleVariants}
        initial="hidden"
        animate="visible"
      >
        Data Analyst | Cloud Data Analytics
      </motion.p>

      {/* Tagline - Mobile: text-2xl, Desktop: md:text-5xl lg:text-6xl (Original) */}
      <motion.p
        className="text-2xl md:text-5xl lg:text-6xl text-gray-400 mt-4 max-w-lg mx-auto md:mx-0 md:max-w-3xl leading-relaxed"
        variants={taglineVariants}
        initial="hidden"
        animate="visible"
      >
      <p>
      Analyzing data.
      </p>
      <p>
      Solving problems.
      </p>
      <p>
      Driving decisions. 
      </p>     
</motion.p>
    </div>
  );
};

export default Name;