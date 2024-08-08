import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Avatar, Input, Alert } from "@material-tailwind/react";

import React, { useState } from "react";

const EditProfileLayout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("+62 - 123123123");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failedAlert, setFailedAlert] = useState(false);

  const handlePhoneNumberInput = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    let withoutPrefix = input.startsWith("62") ? input.slice(2) : input;
    if (withoutPrefix.startsWith("0")) withoutPrefix = withoutPrefix.slice(1);

    setPhoneNumber(`+62 - ${withoutPrefix}`);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if all fields are filled
    if (!name ||!email ||!phoneNumber ||!password) {
      setFailedAlert(true);
      return;
    }
    setSuccessAlert(true);
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-[#f8fafc]">
      <div className="w-full flex flex-col justify-start items-start">
        <Header />
      </div>

      {/* Display Profile */}
      <div className="container h-full w-full flex flex-col justify-start items-start lg:w-3/4">
        <div className="w-full h-full bg-white rounded-2xl shadow-xl pt-2 lg:pt-5 my-3">
          <div className="h-full w-full flex flex-col items-center justify-between">
            <div className="w-full">
              <div className="w-full flex justify-end items-center p-2 text-xl font-semibold text-blue-gray-900 lg:p-4 lg:text-2xl">
                <p className="w-full text-center">Edit Profile</p>
              </div>

              <div className="border-b border-blue-gray-100" />

              <div className="w-full lg:container">
                {/* Profile Picture */}
                <div className="w-full flex items-center justify-center p-3 lg:p-5">
                  <Avatar
                    variant="circular"
                    className="h-24 w-24 rounded-full lg:h-40 lg:w-40 "
                    alt="profile picture"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                  />
                </div>

                {/* Name */}
                <div className="w-full h-20 flex flex-col justify-start items-center mt-1">
                  <div className="w-3/4 space-y-1 lg:space-y-2">
                    <p className="text-sm text-blue-gray-600 -mb-3">Name</p>
                    <Input
                      variant="static"
                      placeholder="Enter your name"
                      type="text"
                      value={name}
                      className="text-xl text-black font-bold px-1 lg:text-2xl"
                      onChange={(e) => setName(e.target.value)}
                      error={name ? false : true}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="w-full h-20 flex flex-col justify-start items-center mt-1">
                  <div className="w-3/4 space-y-1 lg:space-y-2">
                    <p className="text-sm text-blue-gray-600 -mb-3">Email</p>
                    <Input
                      variant="static"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      className="text-xl text-black font-bold px-1 lg:text-2xl"
                      onChange={(e) => setEmail(e.target.value)}
                      error={email ? false : true}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="w-full h-20 flex flex-col justify-start items-center mt-1">
                  <div className="w-3/4 space-y-1 lg:space-y-2">
                    <p className="text-sm text-blue-gray-600 -mb-3">Phone</p>
                    <Input
                      variant="static"
                      placeholder="Enter your phone number"
                      type="text"
                      value={phoneNumber}
                      className="text-xl text-black font-bold px-1 lg:text-2xl"
                      onChange={handlePhoneNumberInput}
                      error={phoneNumber ? false : true}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="w-full h-20 flex flex-col justify-start items-center mt-1">
                  <div className="w-3/4 space-y-1 lg:space-y-2">
                    <p className="text-sm text-blue-gray-600 -mb-3">Password</p>
                    <Input
                      variant="static"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      className="text-xl text-black font-bold px-1 lg:text-2xl"
                      onChange={(e) => setPassword(e.target.value)}
                      error={password ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4">
              <button onClick={handleSaveEdit} className="px-6 py-3 text-xs font-bold uppercase text-white bg-gradient-to-tr from-green-600 to-green-400 rounded-lg shadow-md transition-all hover:shadow-lg active:opacity-85">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {successAlert && (
        <Alert
          open={successAlert}
          onClose={() => setSuccessAlert(false)}
          color="green"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          You have editted your profile successfully!
        </Alert>
      )}

      {failedAlert && (
        <Alert
          open={failedAlert}
          onClose={() => setFailedAlert(false)}
          color="red"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          Error editing profile, make sure all fields are filled!
        </Alert>
      )}

      <Footer />
    </div>
  );
};

export default EditProfileLayout;
