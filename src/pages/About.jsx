import React from 'react';
import Button from '../components/Button.jsx';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5, 
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
  ref={ref}
  id="about"
  className="w-full min-h-[600px] flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-16"
  variants={containerVariants}
  initial="hidden"
  animate={controls}
>

      <div className="text-justify text-white space-y-6 p-5 rounded-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-200 text-center font-['PT_Serif']">
          About Me
        </h2>
        <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
          I’m Aneeka, a B.Tech Computer Science graduate with a strong foundation in DevOps, Cloud (AWS), Orchestration, and Linux systems. I enjoy understanding how things work under the hood — from containers to infrastructure automation — and applying that knowledge to build efficient, reliable solutions.
        </p>
        <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
          Before transitioning into tech, I worked for several years as a freelance content writer, creating clear, engaging, and SEO-optimized content across various domains — an experience that strengthened my communication skills and attention to detail.
        </p>
        <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
          I’m currently focused on mastering infrastructure automation and scalable deployments, aiming to combine technical depth with problem-solving that delivers real business impact. I believe in learning by doing, and every project I take on reflects that mindset.        </p>       
      </div>
    </motion.section>
  );
};

export default About;
