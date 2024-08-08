"use client";

import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import DetailNews from "./DetailComponent/DetailNews";
import Header from "../Header";
import Footer from "../Footer";
import Link from "next/link";

const DetailLayout = ({ article, category }) => {
  if (!article) return <p>Article not found</p>;

  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-[#f8fafc]">
      <div className="w-full flex flex-col justify-start items-start">
        <Header />
      </div>

      {/* Detail News Display */}
      <div className="container h-full w-full flex flex-col justify-start items-start lg:w-3/4">
        <Link
          href={"/main"}
          className="flex flex-row space-x-3 justify-center items-center m-4 cursor-pointer"
        >
          <FaArrowLeftLong size={26} />
          <span className="text-xl">Go Back</span>
        </Link>
        <DetailNews article={article} category={category}/>
      </div>

      <Footer />
    </div>
  );
};

export default DetailLayout;
