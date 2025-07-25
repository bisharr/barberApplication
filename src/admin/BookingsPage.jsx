// src/admin/BookingsPage.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import Papa from "papaparse";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await getDocs(collection(db, "bookings"));
        const bookingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
        setFiltered(bookingList);
      } catch (err) {
        toast.error("Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  // Filter logic
  useEffect(() => {
    let filteredData = bookings;

    if (search) {
      filteredData = filteredData.filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.phone.includes(search)
      );
    }

    if (filterService) {
      filteredData = filteredData.filter((b) => b.service === filterService);
    }

    if (filterDate) {
      filteredData = filteredData.filter((b) => b.date === filterDate);
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, filterService, filterDate, bookings]);

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    } catch (err) {
      toast.error("Failed to delete booking");
    }
  };

  const markComplete = async (id) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: "Completed" });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "Completed" } : b))
      );
      toast.success("Marked as completed");
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookings.csv";
    link.click();
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentBookings = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 my-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">All Bookings</h1>
          <button
            onClick={exportCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
          >
            <FaDownload /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center bg-white shadow px-3 py-2 rounded w-full sm:w-64">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by name or phone"
              className="w-full outline-none text-sm"
            />
          </div>
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="bg-white shadow px-3 py-2 rounded text-sm w-full sm:w-48"
          >
            <option value="">All Services</option>
            <option value="Haircut & Styling">Haircut</option>
            <option value="Beard Trim & Lineup">Beard Trim</option>
            <option value="Hair Wash & Treatment">Hair Wash</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-white shadow px-3 py-2 rounded text-sm w-full sm:w-48"
          />
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          {filtered.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{b.name}</td>
                    <td className="px-4 py-2">{b.phone}</td>
                    <td className="px-4 py-2">{b.email || "N/A"}</td>
                    <td className="px-4 py-2">{b.service}</td>
                    <td className="px-4 py-2">{b.date}</td>
                    <td className="px-4 py-2">{b.time}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          b.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      {b.status !== "Completed" && (
                        <button
                          onClick={() => markComplete(b.id)}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => deleteBooking(b.id)}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
