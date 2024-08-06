"use client";
import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import Button from "@mui/material/Button";

import PageTransition from "@/components/PageTransition";
import Login from "@/components/LoginForm/Login";
import Register from "@/components/RegisterForm/Register";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleComponentSwap = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <PageTransition />
      <div className="h-screen w-screen bg-[#e5e8f0] flex items-center justify-center">
        <div className="w-full h-4/5 container flex flex-col justify-center items-center bg-[#f8f4fc] shadow-2xl rounded-xl lg:flex-row lg:w-2/3 lg:h-2/3">
          {/* Image */}
          <div className="h-1/3 w-full flex items-start justify-center lg:h-full lg:w-1/2 lg:items-center lg:justify-start">
            <p>hello</p>
          </div>
          {/* Content */}
          <div className="h-2/3 w-full flex items-start justify-center lg:h-full lg:w-1/2 lg:items-center lg:justify-start">
            {isLogin ? (
              <Login onComponentSwap={handleComponentSwap} />
            ) : (
              <Register onComponentSwap={handleComponentSwap} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
