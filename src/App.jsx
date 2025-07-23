import React from "react";
import Navbar from "./assets/components/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";
import Footer from "./assets/components/Footer";
import SignIn from "./assets/pages/SignIn";
import ForgotPassword from "./assets/pages/ForgotPassword";
import SignUp from "./assets/pages/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
