import React from "react";
import Navbar from "./assets/components/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
