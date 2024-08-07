import axios from "axios";

const NEWS_KEY = process.env.NEXT_PUBLIC_NEWS_KEY || "";

export const fetchNewsData = async ({ category }) => {
  const apiURL = `https://newsapi.org/v2/everything?q=${category}&apiKey=${NEWS_KEY}`;

  try {
    const { data } = await axios.get(apiURL);
    return data;
  } catch (error) {
    console.log(`Error fetching news data: ${error.message}`);
    throw error;
  }
};
