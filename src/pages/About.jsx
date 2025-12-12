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
          I’m Aneeka, a B.Tech Computer Science graduate and a Data Analyst with a strong foundation in SQL, Python, Power BI, Excel, and cloud-based analytics on AWS. I specialize in transforming messy, unstructured data into clean, insightful, and decision-ready intelligence that helps businesses understand performance, spot trends, and make confident choices.
        </p>
        <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
          What drives me as a Data Analyst is the process of digging into data to uncover patterns, solve real problems, and tell clear, meaningful stories through dashboards and reports. I enjoy exploring how data behaves, why certain trends appear, and how those insights can translate into better business outcomes.
        </p>
        <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
          Before transitioning into analytics, I worked for several years as a freelance content writer, where I developed strong communication, attention to detail, and storytelling skills — strengths that now help me present data in a way that is simple, logical, and impactful for stakeholders.
        </p>
        <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
          I’m currently focused on mastering cloud analytics, automated reporting, and scalable data workflows, aiming to blend technical skill with business understanding. I believe in learning by doing, and every project I take on reflects that — from shaping raw data into meaningful insights to building dashboards that drive real results.        </p>
      </div>
    </motion.section>
  );
};

export default About;
