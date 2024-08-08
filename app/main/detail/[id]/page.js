"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, getNews } from "@/store/slices/newsSlice";
import DetailLayout from "@/components/DetailPageComponents/Detail";

const DetailId = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const url = params.id;

  const categoryFromParam = searchParams.get("category");

  const dispatch = useDispatch();
  const articles = useSelector(getNews);

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (url) {
      dispatch(fetchNews(categoryFromParam)).then(() => {
        const decodedUrl = decodeURIComponent(url);
        const foundArticle = articles.find(
          (article) => article.url === decodedUrl
        );
        setArticle(foundArticle);
        setLoading(false);
      });
    } else setLoading(true);
  }, [url, dispatch, articles]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className="w-full h-screen">
      <DetailLayout article={article} category={categoryFromParam}/>
    </div>
  );
};

export default DetailId;
