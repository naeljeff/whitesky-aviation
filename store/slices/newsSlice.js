import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchNewsData } from "@/services/news";

const initialState = {
  articles: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category) => {
    const response = await fetchNewsData({ category });
    // console.log(`Response: ${response.articles}`);
    return response.articles;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.articles = action.payload;
      state.error = null;
    });

    builder.addCase(fetchNews.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchNews.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch news";
    });
  },
});

export const getNews = (state) => state.news.articles;
export const getNewsLength = (state) => state.news.articles.length;
export const getStatus = (state) => state.news.status;
export const selectNewsError = (state) => state.news.error;
export default newsSlice.reducer;
