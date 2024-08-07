"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchNews,
  getNews,
  getNewsLength,
  selectNewsError,
  getStatus,
} from "@/store/slices/newsSlice";
import NewsCard from "./NewsCard";

const News = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const articles = useSelector(getNews);
  const articlesLength = useSelector(getNewsLength);
  const status = useSelector(getStatus);
  const error = useSelector(selectNewsError);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchNews("bitcoin"));
  }, [dispatch]);

  const fetchMoreData = () => {
    if (page * pageSize < articlesLength) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const memoArticles = articles.slice(0, page * pageSize);

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
          <div id="scrollableDiv" className="h-[75dvh] overflow-auto">
            <InfiniteScroll
              dataLength={memoArticles.length}
              next={fetchMoreData}
              hasMore={page * pageSize < articlesLength}
              loader={<p>Loading more articles...</p>}
              scrollableTarget="scrollableDiv"
              endMessage={
                <p className="text-center">
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <ul className="grid grid-cols-1 gap-[25px] px-3 lg:grid-cols-3">
                {memoArticles.map((article, index) => (
                  <NewsCard article={article} key={index} />
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
