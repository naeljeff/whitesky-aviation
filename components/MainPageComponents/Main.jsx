"use client";

import React from "react";

import Header from "../Header";
import Navbar from "../Navbar";
import News from "./NewsComponent/News";

const MainLayout = () => {
  return (
    <div className="w-full h-screen">
      <Header />
      <Navbar />

      {/* News Display */}
      <div className="container">
        <News />
      </div>
    </div>
  );
};

export default MainLayout;
