import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Import the arrow icons
import { Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [

     {
        title: "Retail Sales & Inventory Analysis Dashboard",
        description:
            "Developed a Retail Sales & Inventory dashboard that identified revenue drivers, product performance patterns, and demand trends using Python, Excel, and Power BI.",
        techStack: [
            "Python", "Pandas", "Excel", "Power BI", "Data Visualization", "ETL"
        ],
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
    title: "Movie Recommendation App – Behavioral Analytics & KPI Insights",
    description:
        "Analyzed user engagement patterns, viewing behavior, and preference trends to derive actionable KPIs for optimizing recommendation accuracy and platform performance.",
    techStack: [
        "Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Analytics", "KPI Analysis"
    ],
    image:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1470&q=80",
    },   

    {
        title: "Real-Time Chat Application – Cloud Data Analytics, User Insights & Observability (Chatty)",
        description:
            "Designed an end-to-end analytics and observability framework to measure user behavior, interaction patterns, message flow efficiency, and system performance across a cloud-native chat platform.",
        techStack: [
            "AWS", "Kubernetes", "Prometheus", "Grafana", "ELK Stack", "Python", "Stream Processing", "Data Analytics", "Observability"
        ],
        image:
            "https://plus.unsplash.com/premium_photo-1681487683141-e72c5ccd94e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Wanderlust Travel Application",
        description:
            "A MERN travel blog website demonstrating a full DevSecOps workflow, including CI/CD with Jenkins, security scanning, and Kubernetes deployment with Helm and ArgoCD.",
        techStack: [
            "AWS EKS", "MERN", "Docker", "Jenkins", "ArgoCD", "Redis", "Helm", "Prometheus", "Grafana", "SonarQube",
        ],
        image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1470&q=80",
    },
    {
        title: "AWS Cloud Intelligence Analyzer",
        description:
            "Designed a Python automation workflow to convert AWS configuration data into analyzable datasets, enabling trend analysis, auditing insights, cost visibility, and data-driven decision-making.",
        techStack: [
            "AWS", "Python", "Boto3", "Pandas", "Data Engineering", "Automation", "Cloud Audit", "Cost Analysis"
        ],
        image:
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }



];

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const transitionRef = useRef(false);

    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold: 0.2,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);


    const loopedProjects = useMemo(() => {
        return [projects[projects.length - 1], ...projects, projects[0]];
    }, []);

    const scrollToCard = (index, behavior = "smooth") => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const card = carousel.children[index];
        if (!card) return;

        const carouselCenter = carousel.offsetWidth / 2;
        const cardCenter =
            card.offsetLeft - carousel.offsetLeft + card.offsetWidth / 2;
        const scrollLeft = cardCenter - carouselCenter;

        carousel.scrollTo({ left: scrollLeft, behavior });
    };

    // This useEffect for mouse wheel scrolling has been REMOVED.
    // useEffect(() => { ... onWheel ... }, []);

    useEffect(() => {
        scrollToCard(1, "auto");
    }, []);

    const handleScroll = () => {
        if (transitionRef.current || !carouselRef.current) return;
        const carousel = carouselRef.current;
        const cards = Array.from(carousel.children);

        let closestCardIndex = 0;
        let minDistance = Infinity;
        const carouselCenter = carousel.scrollLeft + carousel.offsetWidth / 2;

        cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(carouselCenter - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestCardIndex = i;
            }
        });

        const newIndex = (closestCardIndex - 1 + projects.length) % projects.length;
        setCurrentIndex(newIndex);

        if (closestCardIndex === 0) {
            transitionRef.current = true;
            setTimeout(() => {
                scrollToCard(projects.length, "auto");
                transitionRef.current = false;
            }, 300);
        } else if (closestCardIndex === loopedProjects.length - 1) {
            transitionRef.current = true;
            setTimeout(() => {
                scrollToCard(1, "auto");
                transitionRef.current = false;
            }, 300);
        }
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        scrollToCard(index + 1);
    };

    // --- NEW: Button Click Handlers ---
    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + projects.length) % projects.length;
        setCurrentIndex(newIndex);
        scrollToCard(newIndex + 1);
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % projects.length;
        setCurrentIndex(newIndex);
        scrollToCard(newIndex + 1);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    // --- NEW: Button Style ---
    const arrowButtonClass = "absolute top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all cursor-pointer";

    return (
        <motion.section
            id="projects"
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
            className="w-full min-h-screen flex flex-col items-center justify-center py-16"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-200 mb-12 text-center font-['PT_Serif']">
                My Projects
            </h2>

            <div className="relative w-full overflow-hidden">
                {/* --- NEW: Previous Button --- */}
                <button
                    onClick={handlePrev}
                    className={`${arrowButtonClass} left-4 md:left-8 lg:left-16`}
                    aria-label="Previous project"
                >
                    <ChevronLeft size={24} />
                </button>

                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory py-8 hide-scrollbar"
                >
                    {loopedProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[45%] lg:w-[35%] snap-center first:ml-[calc(50%-40%)] sm:first:ml-[calc(50%-30%)] md:first:ml-[calc(50%-22.5%)] lg:first:ml-[calc(50%-17.5%)] last:mr-[calc(50%-40%)] sm:last:mr-[calc(50%-30%)] md:last:mr-[calc(50%-22.5%)] lg:last:mr-[calc(50%-17.5%)]"
                            animate={{
                                scale:
                                    currentIndex ===
                                        (index - 1 + projects.length) % projects.length
                                        ? 1
                                        : 0.9,
                                opacity:
                                    currentIndex ===
                                        (index - 1 + projects.length) % projects.length
                                        ? 1
                                        : 0.6,
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        >
                            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-500 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-56 sm:h-64 md:h-72 object-cover"
                                />
                                <div className="p-6 relative z-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-cyan-200 mb-2 ">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm md:text-base mb-4">
                                        {project.description}
                                    </p>
                                    <div className="w-full h-px bg-white/30 my-4 rounded"></div>
                                    {project.techStack && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech) => (
                                                <span 
                                                    key={tech}
                                                    className="bg-cyan-900/50 text-cyan-200 text-xs font-medium px-2.5 py-1 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- NEW: Next Button --- */}
                <button
                    onClick={handleNext}
                    className={`${arrowButtonClass} right-4 md:right-8 lg:right-16`}
                    aria-label="Next project"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="flex space-x-3 mt-6">
                {projects.map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-3 h-3 rounded-full bg-cyan-500 cursor-pointer"
                        onClick={() => handleDotClick(index)}
                        animate={{
                            scale: currentIndex === index ? 1.5 : 1,
                            opacity: currentIndex === index ? 1 : 0.5,
                        }}
                        transition={{ type: "spring", stiffness: 200 }}
                    />
                ))}
            </div>
        </motion.section>
    );
};

export default Projects;