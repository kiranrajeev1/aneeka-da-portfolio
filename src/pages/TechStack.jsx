import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "../components/Button";

const techStack = [
  "Power BI",
  "Amazon QuickSight",
  "Excel (Power Query, Pivot Tables)",
  "SQL (Athena, Redshift)",
  "Python (Pandas, NumPy)",
  "Data Cleaning & EDA",
  "Data Modeling (Star/Snowflake)",
  "ETL / ELT Pipelines",
  "AWS S3, Glue, Athena, Redshift",
  "Dashboard Design & KPI Tracking",
  "Hypothesis Testing / A/B Testing",
  "Cohort & Retention Analysis",
  "Market Basket Analysis",
  "Demand Forecasting",
  "Prometheus & Grafana",
  "CloudWatch Monitoring",
  "Git & GitHub",
  "Figma, HTML/CSS, React.js",
  "Data Visualization Best Practices",
  "Statistical Analysis",
  "DAX",
  "Storytelling & Reporting",
  "Time Series Analysis",
];

const TechStack = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.5 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, type: "spring" },
    },
  };

  return (
    <section
      id="techstack"
      ref={ref}
      className="w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="w-full max-w-5xl text-white space-y-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-cyan-200 text-center font-['PT_Serif']"
        >
          Tech Stack
        </motion.h2>

        {/* Skills Grid — No Modal */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {techStack.map((skill) => (
            <motion.div key={skill} variants={itemVariants}>
              <Button
                text={skill}
                className="py-2.5 px-4 text-xs sm:text-sm md:text-base
                  text-gray-200 font-medium border border-white/15 bg-white/5 backdrop-blur-md rounded-lg shadow-lg
                  hover:text-cyan-300 hover:bg-white/10 hover:border-cyan-400/50 transform hover:-translate-y-1 
                  transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
