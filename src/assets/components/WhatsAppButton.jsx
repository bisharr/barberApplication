// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+252907759273"; // Replace with your number
  const message = "Hello! I’d like to book a haircut."; // Optional pre-filled message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsAppButton;
