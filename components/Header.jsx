"use client";

import React, {useState} from 'react'
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon
} from "@heroicons/react/24/solid";

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
    icon: PowerIcon,
  },
];

const Header = () =>  {
  const [profileMenu, setProfileMenu] = useState(false);
 
  const handleClickMenu = (label) => {
    console.log(label)
    setProfileMenu(false);
  }
 
  return (
    <div className='w-full bg-white flex flex-row justify-between items-center px-10 lg:px-36'>
      {/* Logo */}
      <h2 className='font-semibold text-xl'>
        Whitesky Aviation
      </h2>

      {/* Profile Menu */}
      <Menu open={profileMenu} handler={setProfileMenu} placement="bottom-end">
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
        {profileMenuList.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuList.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleClickMenu(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
    </div>
    
  );
}

export default Header
