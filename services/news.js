import axios from "axios";

const NEWS_KEY = process.env.NEXT_PUBLIC_NEWS_KEY || "fec7990d0c864c979966598e2a688ca5";

export const fetchNewsData = async ({ category }) => {
  const apiURL = `https://newsapi.org/v2/everything?q=${category}&apiKey=${NEWS_KEY}`;

  try {
    const { data } = await axios.get(apiURL, { timeout: 10000 });
    return data;
  } catch (error) {
    console.log(`Error fetching news data: ${error.message}`);
    throw error;
  }
};
