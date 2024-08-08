"use client"

import { formatDateString } from "@/utils/function";
import React from "react";

const DetailNews = ({ article, category }) => {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-xl p-3 mb-2">
        {/* Published at */}
        <div className="w-full flex flex-row space-x-4 justify-start items-center lg:w-1/2">
            <p className="text-white tracking-tighter text-lg px-2 py-1 bg-black rounded-md">{article.author}</p>
            <p>{category}</p>
            <p>{formatDateString(article.publishedAt)}</p>
        </div>
      <p>
        {article.title} {category}
      </p>
      <p>{article.content}</p>
    </div>
  );
};

export default DetailNews;
