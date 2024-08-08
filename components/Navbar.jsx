"use client";

import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

import { newsList } from "@/utils/newsCategory";

const Navbar = ({ active, setActive, setSelectedCategory, setSearchValue }) => {
  const [anchor, setAnchor] = useState(null);
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("lg"));
  const isMenuOpen = Boolean(anchor);

  const openMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const onCategorySelect = (index, value) => {
    setActive(index);
    setSelectedCategory(value);
    setAnchor(null);
  };
  return (
    <div className="w-full h-20 flex flex-col justify-center items-center bg-white lg:h-22">
      <div className="w-full px-4 mt-2 lg:mt-0 lg:container lg:space-y-2 lg:px-16">
        {/* Search Bar */}
        <div className="container px-8 lg:px-16">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            placeholder="Search by title"
            variant="outlined"
            type="search"
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              borderRadius: "9999px", // Full rounding
              "& .MuiOutlinedInput-root": {
                borderRadius: "9999px",
                height: "30px", // Adjust height of the input
                "& .MuiInputBase-input": {
                  padding: "6px 16px", // Adjust padding for smaller height
                  fontSize: "0.875rem", // Smaller font size
                },
              },
            }}
            fullWidth
          />
        </div>

        {/* Category Selection */}
        <div className="flex items-center justify-between">
          {!isMobileQuery ? (
            <ul className="w-full flex flex-row justify-between px-16">
              {newsList.map((list) => {
                return (
                  <li
                    key={list.id}
                    className={`text-black rounded-full px-2 py-0.5 cursor-pointer ${
                      active === list.id
                        ? "bg-red-600 text-white hover:bg-red-500 hover:shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400 hover:shadow-lg"
                    }`}
                    onClick={() => onCategorySelect(list.id, list.value)}
                  >
                    {list.name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="container flex items-center justify-between px-9">
              <IconButton edge="start" aria-label="menu" onClick={openMenu}>
                <button className="flex items-center gap-3 px-3 py-0.5 bg-black text-white rounded-full text-base font-normal capitalize tracking-normal">
                  {newsList[active - 1].name}{" "}
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </IconButton>

              <Menu anchorEl={anchor} open={isMenuOpen} onClose={closeMenu}>
                {newsList.map((list) => (
                  <MenuItem
                    key={list.id}
                    onClick={() => onCategorySelect(list.id, list.value)}
                    sx={{
                      backgroundColor:
                        active === list.id ? "#ff6b61" : "inherit",
                      color: active === list.id ? "#fff" : "#000",
                      "&:hover": {
                        backgroundColor: "#f44336",
                        color: "#fff",
                      },
                    }}
                  >
                    {list.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
