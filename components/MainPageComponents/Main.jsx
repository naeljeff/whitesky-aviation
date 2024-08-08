"use client";

import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import News from "./NewsComponent/News";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-[#f8fafc]">
      <div className="w-full flex flex-col justify-start items-start">
        <Header />
        {/* Divider */}
        <div className="w-full bg-white">
          <div className="w-4/5 mx-auto border-b border-black" />
        </div>
        <Navbar />
      </div>

      {/* News Display */}
      <div className="container w-full flex flex-col justify-center items-center lg:w-3/4">
        <News />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
