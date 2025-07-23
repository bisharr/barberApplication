import React from "react";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/About";
import Services from "../components/Service";
import Pricing from "../components/Pricing";

function LandingPage() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <Services />
      <Pricing />
    </div>
  );
}

export default LandingPage;
