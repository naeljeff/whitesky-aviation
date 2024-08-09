import axios from "axios";

const KEY_ID = process.env.NEXT_PUBLIC_API_KEY || "";

export const createNewUser = async (name, email, phoneNumber, password) => {
  const API_URL = "https://whitesky-aviation-api.vercel.app/api/v1/users/";
  try {
    const response = await axios.post(
      API_URL,
      {
        key_id: KEY_ID,
        name,
        email,
        phone_number: phoneNumber,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(`Error response: ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error(`Error headers: ${error.response.headers}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error(`Error request: ${error.request}`);
    } else {
      // Something else happened in making the request
      console.error(`Error message: ${error.message}`);
    }
    throw error;
  }
};

export const getUserById = async (userId) => {
  const GET_USER_URL = `https://whitesky-aviation-api.vercel.app/api/v1/users/${userId}`;
  try {
    const response = await axios.post(
      GET_USER_URL,
      {
        key_id: KEY_ID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error getting user: ${error.message}`);
    throw error;
  }
};

export const updateUserById = async (
  name,
  email,
  phoneNumber,
  password,
  userId
) => {
  try {
    const UPDATE_USER_URL = `https://whitesky-aviation-api.vercel.app/api/v1/users/${userId}`;
    const response = await axios.put(
      UPDATE_USER_URL,
      {
        key_id: KEY_ID,
        name,
        email,
        phone_number: phoneNumber,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error updating user: ${error.message}`);
    throw error;
  }
};

export const deleteUserById = async (userId) => {
  try {
    const DELETE_USER_URL = `https://whitesky-aviation-api.vercel.app/api/v1/users/delete/${userId}`;
    const response = await axios.post(
      DELETE_USER_URL,
      {
        key_id: KEY_ID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error deleting user: ${error.message}`);
    throw error;
  }
};

export const userLogin = async (email, password) => {
  try {
    const LOGIN_USER_URL =
      "https://whitesky-aviation-api.vercel.app/api/v1/users/login";
    const response = await axios.post(
      LOGIN_USER_URL,
      {
        key_id: KEY_ID,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error response: ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error(`Error headers: ${error.response.headers}`);
    } else if (error.request) {
      console.error(`Error request: ${error.request}`);
    } else {
      console.error(`Error message: ${error.message}`);
    }
    throw error;
  }
};

export const userLogout = async (userId) => {
  try {
    const LOGOUT_USER_URL =
      "https://whitesky-aviation-api.vercel.app/api/v1/users/logout";
    const response = await axios.post(
      LOGOUT_USER_URL,
      {
        key_id: KEY_ID,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error login user: ${error.message}`);
    throw error;
  }
};
