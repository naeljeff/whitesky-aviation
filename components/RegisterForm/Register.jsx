"use client";

import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { createNewUser } from "@/store/slices/userSlice";
import { selectUserStatus, selectUserError } from "@/store/slices/userSlice";

const Register = ({ onComponentSwap, onSuccessRegis }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  const handlePhoneNumberInput = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    let withoutPrefix = input.startsWith("62") ? input.slice(2) : input;
    if (withoutPrefix.startsWith("0")) withoutPrefix = withoutPrefix.slice(1);

    setPhoneNumber(`+62 - ${withoutPrefix}`);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (email && password && name && phoneNumber) {
      try {
        console.log(email, password, name, phoneNumber);
        await dispatch(
          createNewUser({ name, email, phoneNumber, password })
        ).unwrap();
        onSuccessRegis();
        alert("User has been registered");
      } catch (error) {
        alert(`Registration failed: ${error}`);
        console.error("Registration failed:", error);
      }
    } else {
      alert("Please fill in all required fields");
      return;
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-2">
      <div className="flex flex-col justify-center items-center space-y-4 mb-3">
        <h2 className="text-black text-3xl font-bold">Welcome!</h2>
        <p className="text-black/70 text-md tracking-tighter text-center">
          Enjoy your adventure with Whitesky Aviation
        </p>
      </div>

      {/* Input Login */}
      <form onSubmit={handleRegister} className="w-4/5 space-y-3 lg:w-2/3">
        {/* Name */}
        <Input
          type="text"
          label="Name"
          placeholder="Enter your name"
          size="md"
          color="red"
          className="bg-white"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="md"
          color="red"
          className="bg-white"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone Number */}
        <div className="relative flex w-full">
          <Input
            type="text"
            label="Phone Number"
            placeholder="Enter your phone number"
            size="md"
            color="red"
            pattern="*[0-9]"
            className="bg-white"
            value={phoneNumber}
            required
            onChange={handlePhoneNumberInput}
          />
        </div>

        {/* Password */}
        <div className="relative flex w-full">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            size="md"
            color="red"
            className="bg-white"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="!absolute right-3 top-3 text-md"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        <Button
          type="submit"
          size="md"
          variant="gradient"
          color="red"
          className="w-full relative flex items-center justify-center gap-3 overflow-hidden pl-[72px]"
        >
          {userStatus === "loading" ? "Registering..." : "Register"}
          <span className="absolute left-0 grid h-full w-12 place-items-center bg-red-700 transition-colors group-hover:bg-red-800">
            <TfiWrite size={22} />
          </span>
        </Button>
      </form>

      <p className="text-black pt-3">
        Have an account?{" "}
        <button
          className="font-semibold text-red-500 hover:text-red-400"
          onClick={() => onComponentSwap(false)}
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default Register;
