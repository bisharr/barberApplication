import { FaCut, FaUsers, FaStar } from "react-icons/fa";
import React from "react";
const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          About <span className="text-red-600">BarberBook</span>
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl mb-12 max-w-3xl mx-auto">
          At BarberBook, we believe that a fresh haircut is more than just a
          trim — it's an experience. With skilled barbers, modern tools, and a
          passion for precision, we make sure you leave feeling confident and
          sharp.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {/* Icon Card 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <FaCut className="text-red-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Precision Cuts
            </h3>
            <p className="text-gray-600">
              From clean fades to stylish trims — we do it all with passion and
              precision.
            </p>
          </div>

          {/* Icon Card 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <FaUsers className="text-red-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Community First
            </h3>
            <p className="text-gray-600">
              We treat our clients like family. Building trust with every visit.
            </p>
          </div>

          {/* Icon Card 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <FaStar className="text-red-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Top Rated Service
            </h3>
            <p className="text-gray-600">
              Don’t take our word for it. Our 5-star reviews speak for
              themselves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
