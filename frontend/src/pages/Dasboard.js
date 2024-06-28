import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import React, { useEffect } from "react";

const Dasboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Dasboard;
