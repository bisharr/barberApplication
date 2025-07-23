import { Link } from "react-router-dom";
import React from "react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Reset Your Password
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-red-400"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Send Reset Link
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Remembered?{" "}
          <Link to="/signin" className="text-red-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
