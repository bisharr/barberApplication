import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center text-white pt-16 pb-8 px-4 sm:px-6 lg:px-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1619457064472-898b647c29a1?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="bg-black/70 backdrop-blur-sm p-10 rounded-xl max-w-7xl mx-auto">
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-500">BarberBook</h2>
            <p className="text-sm text-gray-300">
              Precision. Style. Confidence. Book your appointment and experience
              the next level of grooming.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> 123 Fade Street, Ottawa, ON
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt /> +1 (613) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> info@barberbook.ca
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 border-t border-gray-600 pt-6 text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} BarberBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
