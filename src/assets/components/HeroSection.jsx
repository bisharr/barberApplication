import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
// import heroBg from "img/barber-bg.jpeg";

// Replace with your image
const HeroSection = () => {
  return (
    <section
      className="min-h-screen  bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/barber-bg.jpeg')", // Your public image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          Transform Your Look <br />
          <span className="text-blue-500">Book Your Cut Now</span>
        </h1>
        <p className="text-lg bg-gray-900 p-3 rounded sm:text-xl lg:text-2xl mb-8 font-light drop-shadow">
          Get styled by professionals who care about your look.{" "}
          <br className="hidden sm:inline" />
          Clean fades, sharp trims, and on-time service.
        </p>
        <a
          href="/booking"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
        >
          Book Appointment
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
