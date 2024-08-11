import axios from "axios";

// const NEWS_KEY = process.env.NEXT_PUBLIC_NEWS_KEY || "fec7990d0c864c979966598e2a688ca5";

export const fetchNewsData = async ({ category }) => {
  const apiURL = `https://whitesky-aviation-api.vercel.app/api/v1/news/${category}`;

  try {
    const { data } = await axios.get(apiURL, { timeout: 10000 });
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(`Error fetching news data: ${error.message}`);
    throw error;
  }
};
