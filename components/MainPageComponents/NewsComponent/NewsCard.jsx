import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getSelectedCategory } from "@/store/slices/newsSlice";
import { formatDateString } from "@/utils/function";

const NewsCard = React.memo(({ article, index }) => {
  const selectedCategory = useSelector(getSelectedCategory);

  // Get website base url
  const websiteUrl = article.url;
  const website = websiteUrl.split("https://").pop().split("/")[0];

  // Format published date
  const articleDate = article.publishedAt;
  const formattedDate = formatDateString(articleDate);
  return (
    <Card key={index} className="w-full mt-5 lg:w-81">
      <CardHeader className="relative h-44">
        <img src={article.urlToImage} alt={article.title} />
      </CardHeader>
      <div className="w-full h-full flex flex-col justify-between items-start">
        <CardBody className="flex-1 px-3">
          <div className="w-full h-full flex flex-col justify-between items-start">
            {/* Source */}
            <div className="w-full h-5 flex flex-row space-x-3">
              <img
                src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE%2CSIZE%2CURL&url=http://${website}&size=20`}
                alt={article.source.id}
                className="rounded-full"
              />
              <span>{article.source.name}</span>
            </div>

            {/* Title */}
            <h1 className="h-20 text-xl font-bold tracking-tighter text-ellipsis line-clamp-3">
              {article.title}
            </h1>

            {/* Description */}
            <Typography
              color="textSecondary"
              className="h-18 overflow-hidden text-ellipsis line-clamp-3"
            >
              {article.description}
            </Typography>

            {/* Published At and Author */}
            <div className="flex justify-between items-center px-3 gap-1">
              <div className="flex-1 flex flex-col">
                <p className="font-medium text-[16px]">
                  <span className="blue-text-gradient text-xl">@</span>{" "}
                  {article.author}
                </p>
                <p className="mt-1 text-black text-[12px]">
                  Published at: <span>{formattedDate}</span>
                </p>
              </div>

              <Avatar
                className="h-10 w-10 rounded-full"
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="mx-2 my-3">
          <Link
            href={{
              pathname: `/main/detail/${encodeURIComponent(article.url)}`,
              query: { category: selectedCategory },
            }}
            className="px-4 py-2.5 text-white bg-black rounded-lg hover:drop-shadow-xl hover:bg-slate-900"
          >
            Read More
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
});

export default NewsCard;
