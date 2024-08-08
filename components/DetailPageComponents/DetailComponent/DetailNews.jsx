import React from "react";

const DetailNews = ({ article, category }) => {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-xl p-3 mb-2">
        
      <p>
        {article.title} {category}
      </p>
      <p>{article.content}</p>
    </div>
  );
};

export default DetailNews;
