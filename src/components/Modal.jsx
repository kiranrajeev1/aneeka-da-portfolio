import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ title, content, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            relative 
            max-w-2xl 
            w-[90%] 
            bg-gradient-to-br from-[#012226]/90 to-[#001214]/90
            border border-cyan-400/30 
            rounded-2xl 
            shadow-[0_0_25px_rgba(0,255,255,0.25)]
            text-white 
            p-8 
            overflow-hidden
          "
        >
          {/* Shimmer Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>

          {/* Header */}
          <h2 className="text-3xl font-bold text-cyan-300 mb-5 text-center font-['PT_Serif']">
            {title}
          </h2>

          {/* Content */}
          <div className="text-gray-200 leading-relaxed text-base md:text-lg space-y-3 mb-8">
            {content.split("\n").map((line, index) => (
              <p key={index}>{line.trim()}</p>
            ))}
          </div>

          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="
                relative
                px-6 
                py-3 
                font-semibold 
                text-cyan-300 
                border border-cyan-400/40 
                rounded-xl 
                overflow-hidden 
                transition-all 
                duration-300 
                hover:text-black 
                hover:bg-cyan-400 
                hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]
                hover:scale-105
              "
            >
              <span className="relative z-10">Close</span>
              <span
                className="
                  absolute inset-0 
                  bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent 
                  translate-x-[-100%] 
                  group-hover:translate-x-[100%] 
                  transition-transform 
                  duration-700 
                  ease-in-out
                "
              ></span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
