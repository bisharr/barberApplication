import React from "react";
import Navbar from "./assets/components/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";
import Footer from "./assets/components/Footer";
import SignIn from "./assets/pages/SignIn";
import ForgotPassword from "./assets/pages/ForgotPassword";
import SignUp from "./assets/pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingForm from "./assets/pages/BookingPage";
import Receipt from "./assets/pages/Receipt";
import Dashboard from "./admin/Dashboard";
import AdminRoute from "./routes/AdminRoute";
import Profile from "./assets/pages/Profile";
import WhatsAppButton from "./assets/components/WhatsAppButton";
import InstallPrompt from "./assets/components/InstallPrompt";
function App() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <InstallPrompt />

      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="receipt" element={<Receipt />} />

        <Route
          path="dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route path="signin" element={<SignIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="book" element={<BookingForm />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
