import { useState } from "react";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import GoogleSignInButton from "../components/GoogleSignInButton ";
import React from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await setDoc(doc(db, "users", userCred.user.uid), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        uid: userCred.user.uid,
        createdAt: new Date(),
      });
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/booking");
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="number"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <GoogleSignInButton />

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
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
