"use client";

import React from "react";

import Header from "../Header";
import Navbar from "../Navbar";
import News from "./NewsComponent/News";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <div className="w-full h-full bg-[#f8fafc]">
      <Header />
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-11/12 border-b border-black" />
      </div>
      <Navbar />

      {/* News Display */}
      <div className="container w-full flex flex-col justify-center items-center lg:w-2/3">
        <News />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
