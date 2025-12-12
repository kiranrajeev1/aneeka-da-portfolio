import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "../components/Button";
import Modal from "../components/Modal";

const skillDetails = {
  "AWS Cloud Computing": `
By provisioning EC2 instances, configuring RDS databases, and setting up secure access through IAM roles and policies, I create environments that are both scalable and reliable. I design and manage VPCs to ensure networks are secure, well-structured, and optimized for performance. I can automate workflows with Lambda and manage storage with S3, while leveraging CloudWatch to monitor performance and ensure systems run efficiently. I have worked with AWS databases such as RDS. Working with these services has given me a deep appreciation for designing cloud solutions that are robust, observable, and optimized.
  `,
  "Kubernetes & Docker": `
I specialize in building, containerizing, and orchestrating cloud-native applications using Docker and Kubernetes. With Docker, I design lightweight, reproducible environments through well-structured Dockerfiles and manage multi-service applications with Docker Compose. On Kubernetes, I handle the full orchestration lifecycle — from defining pods, deployments, and services to managing ingress controllers for intelligent traffic routing. I also implement RBAC (Role-Based Access Control) for fine-grained security, configure ConfigMaps and Secrets for environment management, and use Persistent Volumes (PVs) for stable data storage. Beyond deployment, I monitor and optimize workloads with Namespaces, Resource Quotas, and Horizontal Pod Autoscalers (HPA) to ensure performance, scalability, and reliability across clusters.
  `,
  Terraform: `
I leverage Terraform to design and automate cloud infrastructure through Infrastructure as Code (IaC). By creating reusable modules, I have provisioned AWS services like VPCs, EC2 instances, RDS, S3, and IAM; ensuring deployments are consistent and version-controlled. My workflow leverages variables, outputs, and remote state management with S3 and DynamoDB to maintain reliability across multiple environments. I apply workspaces for environment isolation and follow best practices for secure secret management using Terraform variables and AWS KMS. This approach allows me to deliver infrastructure that is scalable, repeatable, and optimized for long-term automation and maintenance.
  `,
  "Jenkins / GitHub Actions": `
I have used Jenkins and GitHub Actions to automate software delivery through CI/CD pipelines. I have built workflows that handle code integration, automated testing, and deployment, ensuring applications move smoothly from development to production. I have configured pipelines to work with Docker containers, cloud environments, and version-controlled repositories, reducing manual effort and deployment errors. I have also implemented automated notifications, conditional steps, and parallel jobs to optimize release cycles and improve overall development efficiency.
  `,
  "AWS Native Services": `
I’m proficient in AWS DevOps tools such as ECS, EKS, CodeBuild, CodeDeploy, CodePipeline, CloudFormation, and CloudFront to design and deploy cloud-native applications. I have containerized and orchestrated applications using ECS and EKS, automated builds and deployments with CodeBuild and CodeDeploy, and managed end-to-end workflows through CodePipeline. I have used CloudFormation for repeatable, version-controlled infrastructure provisioning and configured CloudFront distributions for secure, low-latency content delivery. These tools allow me to streamline software delivery, reduce manual effort, and maintain reliable, production-ready environments.
  `,
  Ansible: `
I have used Ansible to automate server configuration and application deployment across multiple environments. By creating playbooks and roles, I ensure consistency, reduce manual effort, and maintain reliable, scalable, and repeatable systems that integrate seamlessly with CI/CD pipelines and cloud infrastructure.
  `,
  Git: `
I have several years of experience using Git to manage code efficiently and maintain version control across projects. By leveraging branching, merging, and pull requests, I ensure collaborative workflows remain organized, code is reliable and traceable, and integration into CI/CD pipelines is seamless.
  `,
  "Bash Scripting": `
I have several years of experience using Bash scripting to automate complex workflows and manage Linux systems efficiently. I have written scripts for cron jobs, deployments, and system maintenance, consistently reducing manual effort, preventing errors, and improving operational reliability across multiple environments.
  `,
  "Prometheus & Grafana": `
I have extensive experience using Prometheus and Grafana to monitor, analyze, and visualize system and application performance. I have implemented custom metrics, alerts, and dashboards that provide real-time insights, enabling rapid issue detection, performance optimization, and reliable, scalable operations across production environments.
  `,
  Python: `
I have leveraged Python to simplify complex tasks and enhance infrastructure efficiency. From automating cloud workflows to developing backend utilities, I use Python to create reliable, reusable solutions that save time and reduce operational overhead.
  `,
  "MySQL & MongoDB": `
I have significant experience working with MySQL and MongoDB to design, manage, and optimize databases. I write efficient queries, structure data effectively, and ensure data integrity, enabling applications to run reliably and perform efficiently across different environments. I am comfortable working with both relational and NoSQL databases to support scalable, high-performance applications.
  `,
  "Frontend Development": `
I enjoy bringing ideas to life through frontend development, turning thoughtful designs into engaging, intuitive user experiences. With Figma, I craft layouts that prioritize clarity and usability, and I bring them to life using HTML and CSS to create interfaces that are not only visually appealing but also fully responsive. Seeing a design transform into a seamless, interactive experience that complements powerful backend and cloud systems is what excites me most about building user interfaces.
  `,
  ArgoCD: `
I have used ArgoCD to implement GitOps for Kubernetes, enabling declarative, automated deployments. I manage application synchronization, monitor health, and handle rollbacks to ensure reliable, consistent updates across environments.
  `,
  Helm: `
I work with Helm to package and deploy Kubernetes applications efficiently. By creating and customizing charts, I can manage application configurations, handle dependencies, and ensure consistent deployments across environments. Using Helm alongside CI/CD pipelines, I streamline updates and rollbacks, making application management more reliable and repeatable.
  `,
  "AWS EKS, AWS ECS": `
I have experience with AWS EKS and ECS for deploying and managing containerized applications. I configure clusters, orchestrate workloads, and ensure scalable, reliable deployments. I am comfortable integrating these services with CI/CD pipelines, monitoring, and cloud infrastructure to streamline application delivery and maintain high availability.
  `,
  "OS & System Administration": `
I have experience in Linux and Windows system administration, managing servers, configuring environments, and troubleshooting issues to ensure reliable and secure operations. I am skilled in monitoring system performance, automating tasks, and maintaining smooth, efficient workflows to ensure maximum efficiency.
  `,
};

// --- FIXED Desktop Layout (Diamond) ---
    const diamondLayout = [
    ["AWS Cloud Computing", "AWS Native Services", "AWS EKS, AWS ECS", "Kubernetes & Docker"],
    ["Prometheus & Grafana", "Jenkins / GitHub Actions", "ArgoCD", "Helm", "Ansible"],
    ["Git", "Bash Scripting", "MySQL & MongoDB", "Terraform"],
    ["Frontend Development", "Python"],
    ["OS & System Administration"],
    ];

// --- Flat Array for Mobile Layout ---
const gridSkills = Object.keys(skillDetails);

const TechStack = () => {
  const [modalSkill, setModalSkill] = useState(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03, when: "beforeChildren" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 150, damping: 12 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" } }),
  };

  const mobileButtonClass = `py-2.5 px-4 text-xs sm:py-3 sm:px-5 sm:text-sm
    text-center text-gray-200 font-medium border border-white/15 bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl shadow-lg
    hover:text-cyan-300 hover:bg-white/10 hover:border-cyan-400/50 transform hover:-translate-y-1 transition-all duration-300`;

  const desktopButtonClass = `py-2 px-3 text-xs sm:py-2.5 sm:px-4 sm:text-sm md:py-3 md:px-5 md:text-base
    text-gray-200 font-medium border border-white/15 bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl shadow-lg
    hover:text-cyan-300 hover:bg-white/10 hover:border-cyan-400/50 transform hover:-translate-y-1 transition-all duration-300`;

  return (
    <section
      id="techstack"
      ref={ref}
      className="w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-20 sm:py-24 relative overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="w-full max-w-5xl text-white space-y-10 md:space-y-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-cyan-200 text-center font-['PT_Serif']"
        >
          Tech Stack
        </motion.h2>

        {/* --- Mobile Flex Wrap Layout --- */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:hidden">
          {gridSkills.map((skill) => (
            <motion.div key={skill + "-mobile"} variants={itemVariants}>
              <Button
                text={skill}
                onClick={() => setModalSkill(skill)}
                className={mobileButtonClass}
              />
            </motion.div>
          ))}
        </div>

        {/* --- Desktop Diamond Layout (optimized with rowVariants) --- */}
        <div className="hidden md:flex flex-col items-center gap-4">
          {diamondLayout.map((row, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate={controls}
              className="flex justify-center flex-wrap gap-3"
            >
              {row.map((skill) => (
                <Button
                  key={skill + "-desktop"}
                  text={skill}
                  onClick={() => setModalSkill(skill)}
                  className={desktopButtonClass}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {modalSkill && (
        <Modal
          title={modalSkill}
          content={skillDetails[modalSkill]}
          onClose={() => setModalSkill(null)}
        />
      )}
    </section>
  );
};

export default TechStack;
