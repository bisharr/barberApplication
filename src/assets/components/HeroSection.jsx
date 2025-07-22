import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
// import heroBg from "img/barber-bg.jpeg";

// Replace with your image

const HeroSection = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url('/barber-bg.jpeg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <motion.div
        className="relative text-center text-white px-6 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Feel Fresh. Look Sharp. 💈
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover your style with our expert barbers. Book your seat now and
          get the cut you deserve.
        </p>
        <Link
          to="/booking"
          className="inline-block bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
        >
          Book Your Seat
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
