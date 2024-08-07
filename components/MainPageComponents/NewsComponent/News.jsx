"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  fetchNews,
  getNews,
  getNewsLength,
  selectNewsError,
  getStatus,
} from "@/store/slices/newsSlice";
import NewsCard from "./NewsCard";

const News = () => {
  const dispatch = useDispatch();
  const articles = useSelector(getNews);
  const articlesLength = useSelector(getNewsLength);
  const status = useSelector(getStatus);
  const error = useSelector(selectNewsError);

  useEffect(() => {
    dispatch(fetchNews("bitcoin"));
  }, [dispatch]);

  return (
    <div>
      {status === "loading" && (
        <p className="w-full h-full flex justify-center items-center">
          Loading...
        </p>
      )}
      {status === "failed" && (
        <p className="w-full h-full flex justify-center items-center">
          {error}
        </p>
      )}
      {status === "succeeded" && (
        <div className="w-full min-h-[80dvh]">
          <ScrollArea className="h-[75dvh] px-3">
            <ul className="grid grid-cols-1 gap-[25px] lg:grid-cols-3">
              {articles.map((article, index) => {
                return <NewsCard article={article} key={index} />;
              })}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default News;
