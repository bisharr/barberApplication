import { Link } from "react-router-dom";
import GoogleSignInButton from "../components/GoogleSignInButton ";
import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Create an Account
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-red-400"
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-red-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-red-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-red-400"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>
        <GoogleSignInButton />
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-red-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
