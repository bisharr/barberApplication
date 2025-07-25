// src/admin/Dashboard.jsx
import React, { useState } from "react";
import UsersPage from "./UsersPage";
import BookingsPage from "./BookingsPage";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          Admin Dashboard
        </h1>

        {/* Tab Switch */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded ${
              activeTab === "users"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            👥 Users
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded ${
              activeTab === "bookings"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            📅 Bookings
          </button>
        </div>

        {/* Page Content */}
        <div className="bg-white p-6 rounded shadow">
          {activeTab === "users" ? <UsersPage /> : <BookingsPage />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
