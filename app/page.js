"use client";
import React, { useState } from "react";
import Image from "next/image";

import PageTransition from "@/components/PageTransition";
import Login from "@/components/LoginForm/Login";
import Register from "@/components/RegisterForm/Register";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleComponentSwap = () => {
    setIsLogin(!isLogin);
  };

  const handleSuccessRegister = () => {
    setIsLogin(true); 
  };

  return (
    <>
      <PageTransition />
      <div className="h-screen w-screen bg-[#e5e8f0] flex items-center justify-center">
        {/* //TODO: Masih kurang animasi waktu geser */}
        <div
          className={`w-full h-4/5 container flex flex-col justify-center items-center bg-[#f8f4fc] shadow-2xl rounded-xl  transition-all duration-500 ease-in-out lg:flex-row lg:w-2/3 lg:h-2/3 ${
            isLogin ? "flex-col" : "flex-col-reverse"
          }`}
        >
          {/* Image */}
          <div
            className={`hidden relative overflow-hidden lg:py-7 lg:flex lg:h-full lg:w-1/2 ${
              isLogin ? "order-1" : "order-2"
            }`}
          >
            <div className="w-full h-full relative rounded-xl overflow-hidden">
              <Image
                src={isLogin ? "/loginImage1.jpeg" : "/loginImage2.jpeg"}
                layout="fill"
                objectFit="cover"
                alt="Login Image"
                className="absolute inset-0"
              />
            </div>
          </div>
          {/* Content */}
          <div
            className={`h-full w-full flex items-center justify-center lg:h-full lg:w-1/2 ${
              isLogin ? "order-2" : "order-1"
            }`}
          >
            {isLogin ? (
              <Login onComponentSwap={handleComponentSwap} />
            ) : (
              <Register onComponentSwap={handleComponentSwap} onSuccessRegis={handleSuccessRegister} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
