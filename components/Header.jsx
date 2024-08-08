"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { BiHome } from "react-icons/bi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import MyProfile from "./ProfilePage/MyProfile/MyProfile";

const profileMenuList = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Log Out",
    icon: ArrowRightStartOnRectangleIcon,
  },
];

const Header = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleClickMenu = (label) => {
    switch (label) {
      case "My Profile":
        setShowMyProfile(true);
        break;
      case "Edit Profile":
        router.push("/profile");
        setProfileMenu(false);
        break;
      case "Log Out":
        console.log("Log Out");
        setProfileMenu(false);
        break;
      default:
        return;
    }
  };
  return (
    <div className="w-full h-16 bg-white flex flex-row justify-between items-center px-10 lg:px-36">
      {/* Logo */}
      <Link href={"/main"} className="font-semibold text-xl">
        Whitesky Aviation
      </Link>

      <div className="flex flex-row justify-center items-center space-x-4">
        {/* If in profile page show home button */}
        {pathname === "/profile" && (
          <Link href={"/main"} className="font-semibold text-xl">
            <BiHome size={26}/>
          </Link>
        )}

        {/* Profile Menu */}
        <Menu
          open={profileMenu}
          handler={setProfileMenu}
          placement="bottom-end"
        >
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="profile picture"
                className="border border-blue-600 p-0.5"
                src="https://docs.material-tailwind.com/img/face-2.jpg"
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  profileMenu ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            {profileMenuList.map(({ label, icon }, index) => {
              const logOut = index === profileMenuList.length - 1;
              return (
                <MenuItem
                  key={index}
                  onClick={() => handleClickMenu(label)}
                  className={`flex items-center gap-2 rounded ${
                    logOut ? "hover:bg-red-500/10" : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${logOut ? "text-red-600" : ""}`,
                    strokeWidth: 2,
                  })}

                  {label === "Edit Profile" ? (
                    <Typography
                      as="h2"
                      variant="small"
                      className="font-normal"
                      color={logOut ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  ) : (
                    <Typography
                      as="h2"
                      variant="small"
                      className="font-normal"
                      color={logOut ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  )}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </div>

      {showMyProfile && <MyProfile onClose={() => setShowMyProfile(false)} />}
    </div>
  );
};

export default Header;
