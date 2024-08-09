import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewUser as apiCreateNewUser,
  getUserById as apiGetUserById,
  updateUserById as apiUpdateUserById,
  deleteUserById as apiDeleteUserById,
  userLogin as apiUserLogin,
  userLogout as apiUserLogout,
} from "@/services/api/users.js";

const initialState = {
  user: null,
  userId: null,
  status: "idle",
  error: null,
};

export const createNewUser = createAsyncThunk(
  "user/createNewUser",
  async ({ name, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      const response = await apiCreateNewUser(name, email, phoneNumber, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create user");
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiGetUserById(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to get user");
    }
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async ({ name, email, phoneNumber, password, userId }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateUserById(name, email, phoneNumber, password, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiDeleteUserById(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiUserLogin(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        await apiUserLogout(userId);
      }
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to logout user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create User
    builder
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createNewUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create user";
      });

    // Get User by ID
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to get user";
      });

    // Update User by ID
    builder
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update user";
      });

    // Delete User by ID
    builder
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = null;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete user";
      });

    // User Login
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.userId = action.payload.user_id; // Store userId
        localStorage.setItem('userId', action.payload.user_id); // Persist userId
        state.error = null;
      })
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to login user";
      });

    // User Logout
    builder
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.userId = null; // Clear userId
        localStorage.removeItem('userId'); // Remove userId from local storage
        state.error = null;
      })
      .addCase(userLogout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to logout user";
      });
  },
});

export const { setUserId } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export default userSlice.reducer;
