import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; //backend url
export const addAlternateContactAsync = createAsyncThunk(
  "contactInfo/addAlternateContactAsync",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/addAlternate`,
        contactData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//to add event date details
export const addEventDateAsync = createAsyncThunk(
  "contactInfo/addEventDateAsync",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/addDate`,
        eventData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContactAsync = createAsyncThunk(
  "contactInfo/fetchContactAsync",
  async (contactID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/allAlternates`, {
        params: { id: contactID },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//to fetch event details
export const fetchEventAsync = createAsyncThunk(
  "contactInfo/fetchEventAsync",
  async(_, {rejectWithValue})=>{
    try{
      const response = await axios.get(`${BASE_URL}/getEvents`);
      return response.data;
    }
    catch(error){
      return rejectWithValue(error.response.data);
    }
  }
)

const contactOneSlice = createSlice({
  name: "contactInfo",
  initialState: {
    userDetails: [],
    userEventDetails: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addAlternateContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAlternateContactAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        state.userDetails.push(action.meta.arg);
      })
      .addCase(addAlternateContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

      builder
      .addCase(addEventDateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEventDateAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        state.userEventDetails.push(action.payload);
      })
      .addCase(addEventDateAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });



    //fetch alternate contact details
    builder
      .addCase(fetchContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        state.userDetails = action.payload;
      })
      .addCase(fetchContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //fetch important date details
    builder
      .addCase(fetchEventAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        state.userEventDetails = action.payload;
      })
      .addCase(fetchEventAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default contactOneSlice.reducer;
