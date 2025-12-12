// src/pages/Home.jsx
import LightRays from "../components/Background";
import Hero from "../components/Hero";
import TechStack from "./TechStack";
import About from "./About";
import Projects from "./Project";
import ContactForm from "./ContactForm";
import ExperienceHome from "./ExperienceHome";

const Home = () => {
  return (
    <div className="relative w-full">
      {/* Fixed Light Rays Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={2}
          rayLength={4}
          fadeDistance={1.5}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <Hero className="relative z-10" />

      <About className="relative z-10" />

      <Projects className="relative z-10" />
      <TechStack className="relative z-10" />
      <ExperienceHome className="relative z-10" />
      <ContactForm className="relative z-10" />
    </div>
  );
};

export default Home;