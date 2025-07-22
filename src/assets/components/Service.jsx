import { GiHairStrands, GiBeard } from "react-icons/gi";
import { FaHandsWash } from "react-icons/fa";
import haircutImg from "/haircut.jpg";
import beardImg from "/beardcut.jpg";
import washImg from "/wash.jpg";
import { motion } from "framer-motion";
import React from "react";

const Services = () => {
  const services = [
    {
      title: "Haircut & Styling",
      desc: "Custom styles, fades, trims, and scissor cuts tailored just for you.",
      icon: <GiHairStrands className="text-red-600 text-4xl mb-4" />,
      image: haircutImg,
    },
    {
      title: "Beard Trim & Lineup",
      desc: "Perfect your beard with a sharp lineup and detailed shaping.",
      icon: <GiBeard className="text-red-600 text-4xl mb-4" />,
      image: beardImg,
    },
    {
      title: "Hair Wash & Treatment",
      desc: "Refresh your scalp and hair with premium products and expert care.",
      icon: <FaHandsWash className="text-red-600 text-4xl mb-4" />,
      image: washImg,
    },
  ];

  return (
    <section id="services" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-red-600">Services</span>
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From modern fades to classic cuts, we offer premium grooming services
          for the modern man. Walk in looking sharp, walk out feeling
          unstoppable.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col items-center text-center p-6">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
