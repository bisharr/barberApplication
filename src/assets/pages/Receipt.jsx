import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";

const Receipt = () => {
  const { state } = useLocation();
  const receiptRef = useRef();

  if (!state) {
    return (
      <div className="text-center mt-20 text-xl">
        No booking found.{" "}
        <Link to="/booking" className="text-red-600 underline">
          Book again
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const message = `💈 *Booking Confirmation*
---------------------
📄 Booking ID: ${state.bookingId}
👤 Name: ${state.name}
📞 Phone: ${state.phone}
💇 Service: ${state.service}
📅 Date: ${state.date}
⏰ Time: ${state.time}

Thanks for booking with us!`;

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/?text=${encodedMsg}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 flex items-center justify-center">
      <div
        ref={receiptRef}
        className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full text-center print:w-full"
      >
        <h2 className="text-3xl font-bold text-red-600 mb-2">
          🎟️ Booking Receipt
        </h2>
        <p className="text-gray-600 mb-6">Please show this at the shop</p>

        <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3 text-sm sm:text-base">
          <p>
            <span className="font-semibold text-gray-800">Booking ID:</span>{" "}
            <span className="text-red-600">{state.bookingId}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Name:</span>{" "}
            {state.name}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Phone:</span>{" "}
            {state.phone}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Email:</span>{" "}
            {state.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Service:</span>{" "}
            {state.service}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Date:</span>{" "}
            {state.date}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Time:</span>{" "}
            {state.time}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Print / Save PDF
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
          >
            Share via WhatsApp
          </button>

          <Link
            to="/"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
