import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const registerAsync = createAsyncThunk(
  "user/registerUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/register`,
        userCredentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "user/loginUser",
  async (loginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        loginCredentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    error: null,
    registerResponse : "",
    loginResponse: "",
    accessToken: null
  },

  extraReducers: (builder) => {
    //for register
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.registerResponse = action.payload.message;
        state.error = action.payload;
      });

      //for login 
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.loginResponse = action.payload.message;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
