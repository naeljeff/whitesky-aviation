"use client";

import { formatDateString } from "@/utils/function";
import Link from "next/link";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

const DetailNews = ({ article, category }) => {
  const websiteUrl = article.url;
  const website = websiteUrl.split("https://").pop().split("/")[0];
  const cleanedContent = article.content.replace(/\s*\[\+\d+ chars\]/, '');

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-xl p-5 mb-2">
      {/* Published at */}
      <div className="w-full flex flex-row space-x-5 justify-start items-center lg:w-1/2">
        <p className="text-white tracking-tighter text-lg px-2 py-1 bg-black rounded-md">
          {article.author}
        </p>
        <div className="flex flex-col text-wrap justify-center lg:w-1/2 lg:flex lg:flex-row lg:justify-evenly">
          <p className="uppercase">{category}</p>
          <p>{formatDateString(article.publishedAt)}</p>
        </div>
      </div>

      {/* Image */}
      <div className="w-full flex justify-center items-center py-3 lg:py-0 lg:my-3 lg:h-1/2">
        <div className="w-full lg:w-2/3 lg:h-full">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Source */}
      <div className="w-full flex justify-center py-1 lg:px-5">
        <div className="w-full flex flex-row justify-start items-center space-x-5 py-0.5 lg:w-2/3">
          <img
            src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE%2CSIZE%2CURL&url=http://${website}&size=20`}
            alt={article.source.id}
            className="rounded-full h-7 w-7"
          />
          <span className="text-lg font-semibold">{article.source.name}</span>
        </div>
      </div>

      {/* Title */}
      <div className="w-full py-1 lg:px-5">
        <p className="text-xl font-bold tracking-tighter lg:text-center lg:text-3xl">
          {article.title}
        </p>
      </div>

      <div className="lg:container lg:px-4 lg:py-2">
        {/* Description */}
        <div className="w-full flex flex-row justify-start items-center py-2 lg:py-1">
          <p className="text-lg font-semibold tracking-tight">
            {article.description}
          </p>
        </div>

        {/* Content */}
        <p>{cleanedContent}</p>

        {/* Full Link */}
        <div className="mt-4">
          <p className="tracking-tight">
            Read full article{" "}
            <strong>
              <Link
                href={article.url}
                target="_blank"
                className="text-blue-500 text-lg break-all"
              >
                {article.url}
              </Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailNews;
