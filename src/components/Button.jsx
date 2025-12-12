import React from 'react';

const Button = ({ text = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        relative 
        overflow-hidden 
        group
        px-7 
        py-3 
        rounded-xl 
        font-semibold 
        text-white 
        tracking-wide 
        transition-all 
        duration-300 
        ease-out 
        border 
        border-cyan-400/40 
        shadow-[0_0_10px_rgba(0,255,255,0.2)]
        hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
        hover:border-cyan-400
        hover:text-cyan-300
        bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10
        backdrop-blur-sm
        hover:scale-105
      "
    >
      {/* Shiny gradient overlay effect */}
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

      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default Button;
