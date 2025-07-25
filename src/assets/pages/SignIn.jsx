import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleSignInButton from "../components/GoogleSignInButton ";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success("Welcome back! ✂️");
      setTimeout(() => {
        navigate("/book");
      }, 2000);
    } catch (err) {
      setError("Invalid email or password", err);
      toast.error("Login failed. Check your credentials.");
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Sign In to BarberBook
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-red-400"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-red-400"
          />
          <button
            disabled={loading}
            type="submit"
            className={`w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition cursor-pointer ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "signIn..." : "SignIn"}
          </button>
        </form>
        <div className="text-sm text-right mt-2">
          <Link to="/forgot" className="text-red-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <GoogleSignInButton />
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
