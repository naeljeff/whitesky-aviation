"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Header";
import Navbar from "../Navbar";
import News from "./NewsComponent/News";
import Footer from "../Footer";
import {
  fetchNews,
  getNews,
  getNewsLength,
  getStatus,
  selectNewsError,
  setSelectedCategory,
  getSelectedCategory,
} from "@/store/slices/newsSlice";

const MainLayout = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const dispatch = useDispatch();
  const articles = useSelector(getNews);
  const articlesLength = useSelector(getNewsLength);
  const status = useSelector(getStatus);
  const error = useSelector(selectNewsError);
  const selectedCategory = useSelector(getSelectedCategory);

  // Debug: Log selectedCategory whenever it changes
  useEffect(() => {
    dispatch(fetchNews(selectedCategory));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    setPage(1);
  }, [searchValue, selectedCategory]);

  const fetchMoreData = () => {
    if (page * pageSize < articlesLength) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const memoArticles = articles.slice(0, page * pageSize);

  const filteredDataBySearch = () => {
    if (!searchValue) return memoArticles;

    return memoArticles.filter((article) =>
      article.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const displayedData = filteredDataBySearch();

  return (
    <div className="w-full h-full flex flex-col justify-between items-center bg-[#f8fafc]">
      <div className="w-full flex flex-col justify-start items-start">
        <Header />
        {/* Divider */}
        <div className="w-full bg-white">
          <div className="w-4/5 mx-auto border-b border-black" />
        </div>
        <Navbar
          active={activeCategory}
          setActive={setActiveCategory}
          setSelectedCategory={(category) => {
            dispatch(setSelectedCategory(category));
          }}
          setSearchValue={setSearchValue}
        />
      </div>

      {/* News Display */}
      <div className="container w-full flex flex-col justify-center items-center lg:w-3/4">
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
          <News
            articles={displayedData}
            fetchMoreData={fetchMoreData}
            hasMore={page * pageSize < articlesLength}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
