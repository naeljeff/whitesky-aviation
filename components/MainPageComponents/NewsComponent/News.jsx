"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsCard from "./NewsCard";

const News = ({ articles, fetchMoreData, hasMore }) => {
  return (
    <div className="flex-1">
      <div id="scrollableDiv" className="h-[70dvh] overflow-auto lg:h-[75dvh]">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading more articles...</p>}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className="text-center">
              <b>You are out of articles...</b>
            </p>
          }
        >
          <ul className="my-3 grid grid-cols-1 gap-[25px] lg:grid-cols-3">
            {articles.map((article, index) => (
              <NewsCard article={article} key={index} />
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default News;
