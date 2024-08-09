import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Avatar, Input, Alert } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteUserById,
  selectUser,
  selectUserError,
  selectUserStatus,
  updateUserById,
} from "@/store/slices/userSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const EditProfileLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || "");
  const [password, setPassword] = useState("");
  const userId = user?.user_id;
  const [successAlert, setSuccessAlert] = useState(false);
  const [failedAlert, setFailedAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhoneNumberInput = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    let withoutPrefix = input.startsWith("62") ? input.slice(2) : input;
    if (withoutPrefix.startsWith("0")) withoutPrefix = withoutPrefix.slice(1);

    setPhoneNumber(`+62 - ${withoutPrefix}`);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Check if all fields are filled
    if (!name || !email || !phoneNumber || !password) {
      setFailedAlert(true);
      return;
    }

    try {
      await dispatch(
        updateUserById({ name, email, phoneNumber, password, userId: userId })
      ).unwrap();
      setSuccessAlert(true);
    } catch (err) {
      console.log(err);
      setFailedAlert(true);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirmDelete = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      // Delete the user
      await dispatch(deleteUserById(userId)).unwrap();
      alert("User deleted successfully");
      router.push("/");
    } catch (err) {
      console.error("Error during user deletion", err);
    }

    closeModal();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto lg:w-3/4 p-4">
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
                      disabled
                      readOnly
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

            <div className="flex flex-row items-center justify-center space-x-5 p-4">
              <button
                onClick={handleSaveEdit}
                className="px-6 py-3 text-xs font-bold uppercase text-white bg-gradient-to-tr from-green-600 to-green-400 rounded-lg shadow-md transition-all hover:shadow-lg active:opacity-85"
              >
                {userStatus === "loading" ? "Saving..." : "Save"}
              </button>

              {/* to delete */}
              <button
                onClick={openModal}
                className="px-6 py-3 text-xs font-bold uppercase text-red-500 bg-red-500/10 rounded-lg shadow-md transition-all hover:bg-red-500/30 active:bg-red-500/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <Dialog open={isModalOpen} handler={closeModal}>
          <DialogHeader>Confirm User Deletion</DialogHeader>
          <DialogBody>
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </DialogBody>
          <DialogFooter className="flex flex-row space-x-4">
            <button
              className="px-6 py-3 text-xs font-bold uppercase text-red-500 bg-red-500/10 transition-all rounded-lg hover:bg-red-500/30 active:bg-red-500/30"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 text-xs font-bold uppercase text-white bg-gradient-to-tr from-green-600 to-green-400 rounded-lg shadow-md transition-all hover:shadow-lg active:opacity-85"
              onClick={handleConfirmDelete}
            >
              Confirm
            </button>
          </DialogFooter>
        </Dialog>
      </main>

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
          You have edited your profile successfully!
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
