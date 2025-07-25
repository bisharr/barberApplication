import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebase/config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check Firestore role
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
  };

  const commonLinks = [
    { name: "Home", to: "/" },
    { name: "Book", to: "/book" },
  ];

  const authLinks = user
    ? [
        ...commonLinks,
        isAdmin && { name: "Admin", to: "/dashboard" },
        { name: "Profile", to: "/profile" },
        { name: "Logout", to: "/", onClick: handleLogout },
      ].filter(Boolean)
    : [...commonLinks, { name: "Sign In", to: "/signin" }];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-red-600 tracking-wide"
        >
          Barber<span className="text-black">Book</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {authLinks.map((link) =>
            link.onClick ? (
              <button
                key={link.name}
                onClick={link.onClick}
                className="text-gray-700 hover:text-red-600 transition duration-300 font-medium"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-700 hover:text-red-600 transition duration-300 font-medium"
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-6 pb-4 shadow-md"
          >
            {authLinks.map((link) =>
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="block w-full text-left py-2 text-gray-700 hover:text-red-600 font-medium transition"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-red-600 font-medium transition"
                >
                  {link.name}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
