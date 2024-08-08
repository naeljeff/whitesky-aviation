import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchNewsData } from "@/services/news";
import { newsList } from "@/utils/newsCategory";

const initialState = {
  articles: [],
  status: "idle",
  error: null,
  selectedCategory: newsList[0].value,
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
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    }
  },
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

export const { setSelectedCategory } = newsSlice.actions;
export const getNews = (state) => state.news.articles;
export const getNewsLength = (state) => state.news.articles.length;
export const getStatus = (state) => state.news.status;
export const selectNewsError = (state) => state.news.error;
export const getSelectedCategory = (state) => state.news.selectedCategory
export default newsSlice.reducer;
