import React, { useState } from "react";
import haircutImg from "/haircut.jpg";
import beardImg from "/beardcut.jpg";
import washImg from "/wash.jpg";
import { Link } from "react-router-dom";

const pricingData = [
  {
    title: "Basic Haircut",
    price: "10,000 UGX",
    image: haircutImg,
    desc: "Clean cut, simple style, done right. Ideal for routine trims and quick fades.",
  },
  {
    title: "Beard Trim + Lineup",
    price: "7,000 UGX",
    image: beardImg,
    desc: "Shape your beard and define your jawline with expert precision.",
  },
  {
    title: "Haircut + Wash Combo",
    price: "15,000 UGX",
    image: washImg,
    desc: "Includes a tailored haircut plus full hair wash & scalp massage.",
  },
  {
    title: "Premium Package",
    price: "30,000 UGX",
    image: haircutImg,
    desc: "Haircut, beard trim, wash, hot towel, and full grooming experience.",
  },
];

const Pricing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pricingData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pricingData.length - 1 ? 0 : prev + 1));
  };

  const current = pricingData[currentIndex];

  return (
    <section id="pricing" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Pricing <span className="text-red-600">Options</span>
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl mb-10">
          Choose a package that fits your style and budget. Simple, transparent
          pricing—no surprises.
        </p>

        {/* Pricing Card */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-2xl mx-auto transition duration-500">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-56 object-cover rounded-md mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {current.title}
          </h3>
          <p className="text-gray-600 mb-4">{current.desc}</p>
          <div className="text-xl font-bold text-red-600 mb-4">
            {current.price}
          </div>
          <Link
            to="/book"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition"
          >
            Book Now
          </Link>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
          >
            Next
          </button>
        </div>

        {/* Page indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {pricingData.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-red-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
