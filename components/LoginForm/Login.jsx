"use client";

import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { Button } from "@material-tailwind/react";

const Login = ({ onComponentSwap }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
      <div className="flex flex-col justify-center items-center space-y-4 mb-3">
        <h2 className="text-black text-3xl font-bold">Hello There!</h2>
        <p className="text-black/70 text-lg tracking-tighter text-center">
          Welcome back to Whitesky Aviation
        </p>
      </div>

      {/* Input Login */}
      <div className="w-4/5 space-y-3 lg:w-2/3">
        {/* Email */}
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="lg"
          color="blue"
          className="bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative flex w-full">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            size="lg"
            color="blue"
            className="bg-white pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="!absolute right-3 top-3.5 text-lg"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        <Button
          size="lg"
          variant="gradient"
          color="light-blue"
          className="w-full relative flex items-center justify-center gap-3 overflow-hidden pr-[72px]"
        >
          Login
          <span className="absolute right-0 grid h-full w-12 place-items-center bg-light-blue-600 transition-colors group-hover:bg-light-blue-700">
            <MdLogin size={24} />
          </span>
        </Button>
      </div>

      <p className="text-black pt-3">
        Not a member?{" "}
        <button
          className="font-semibold text-blue-500 hover:text-blue-400"
          onClick={() => onComponentSwap(false)}
        >
          Register now
        </button>
      </p>
    </div>
  );
};

export default Login;
