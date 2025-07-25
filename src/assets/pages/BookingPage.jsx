import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  // Auto-fill user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setForm((prev) => ({
          ...prev,
          name: currentUser.displayName || "",
          phone: "", // Set this if phone is saved in user data or Firestore
          email: currentUser.email,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...form,
        uid: user?.uid || null,
        bookingId: Date.now().toString().slice(-6),
        createdAt: serverTimestamp(),
      });

      toast.success("Booking confirmed!");

      setTimeout(() => {
        navigate("/receipt", {
          state: {
            ...form,
            bookingId: docRef.id,
          },
        });
      }, 1500);
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-10">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Book Your Seat
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded text-gray-700"
          >
            <option value="">Choose Service</option>
            <option value="Haircut & Styling">Haircut & Styling</option>
            <option value="Beard Trim & Lineup">Beard Trim & Lineup</option>
            <option value="Hair Wash & Treatment">Hair Wash & Treatment</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />

          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded text-gray-700"
          >
            <option value="">Select Time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
