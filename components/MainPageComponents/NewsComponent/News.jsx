"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNews,
  getNews,
  getNewsLength,
  selectNewsError,
  getStatus,
} from "@/store/slices/newsSlice";

const News = () => {
  const dispatch = useDispatch();
  const articles = useSelector(getNews);
  const articlesLength = useSelector(getNewsLength);
  const status = useSelector(getStatus);
  const error = useSelector(selectNewsError);

  useEffect(() => {
    dispatch(fetchNews("business"));
  }, [dispatch]);

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <div>
          <h1>{articlesLength}</h1>
          {articles.map((article, index) => (
            <div key={index}>
              <h2>{article.title}</h2>
              <a href={article.url}>Read more</a>
            </div>
          ))}
          {/* <button onClick={() => handlePageChange(page + 1)}>Next Page</button> */}
        </div>
      )}
    </div>
  );
};

export default News;