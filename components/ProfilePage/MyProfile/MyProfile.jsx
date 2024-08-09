import { Avatar } from "@material-tailwind/react";
import { CiEdit } from "react-icons/ci";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserError,
  selectUserStatus,
} from "@/store/slices/userSlice";

const MyProfile = ({ onClose }) => {
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  if (userStatus === "loading") {
    return <div>Loading...</div>;
  } else if (userStatus === "failed") {
    return <div>{userError}</div>;
  } else {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-11/12 h-4/5 rounded-lg bg-white shadow-2xl lg:h-11/12 lg:w-2/5 lg:min-w-[40%] lg:max-w-[40%]"
        >
          <div className="h-full w-full flex flex-col items-center justify-between">
            <div className="w-full">
              <div className="w-full flex justify-end items-center p-2 text-xl font-semibold text-blue-gray-900 lg:p-4 lg:text-xl">
                <p className="w-full text-center -mr-7">My Profile</p>
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="rounded-full border border-black p-1 mr-2 transition-all duration-300 ease-in-out hover:bg-blue-500/20 hover:border-blue-700"
                >
                  <CiEdit />
                </Link>
              </div>

              <div className="border-b border-blue-gray-100" />

              <div className="w-full lg:container">
                {/* Profile Picture */}
                <div className="w-full flex items-center justify-center p-3 lg:p-5">
                  <Avatar
                    variant="circular"
                    className="h-28 w-28 rounded-full lg:h-36 lg:w-36"
                    alt="profile picture"
                    src={
                      user?.profilePicture ||
                      "https://docs.material-tailwind.com/img/face-2.jpg"
                    }
                  />
                </div>

                {/* Name */}
                <div className="w-full h-20 flex flex-col justify-start items-center">
                  <div className="w-3/4 space-y-1 lg:space-y-2">
                    <p className="text-sm text-blue-gray-600">Name</p>
                    <p className="text-lg font-bold px-1 lg:text-xl">
                      {user?.name || ""}
                    </p>
                    <div className="border-b border-blue-gray-100" />
                  </div>
                </div>

                {/* Email */}
                <div className="w-full h-20 flex flex-col justify-start items-center">
                  <div className="w-3/4 space-y-1 lg:space-y-2">
                    <p className="text-sm text-blue-gray-600">Email</p>
                    <p className="text-lg font-bold px-1 lg:text-xl">
                      {user?.email || ""}
                    </p>
                    <div className="border-b border-blue-gray-100" />
                  </div>
                </div>

                {/* Phone */}
                <div className="w-full h-20 flex flex-col justify-start items-center">
                  <div className="w-3/4 space-y-1 lg:space-y-2">
                    <p className="text-sm text-blue-gray-600">Phone</p>
                    <p className="text-lg font-bold px-1 lg:text-xl">
                      {user?.phone_number || ""}
                    </p>
                    <div className="border-b border-blue-gray-100" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4">
              <button
                onClick={onClose}
                className="px-6 py-3 mb-3 text-xs font-bold uppercase text-red-500 bg-red-500/10 transition-all rounded-lg hover:bg-red-500/30 active:bg-red-500/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyProfile;
