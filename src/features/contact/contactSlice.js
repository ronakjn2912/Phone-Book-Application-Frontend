import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; //backend url

// Async Thunk for Adding Contacts
export const addContactAsync = createAsyncThunk(
  //3 actions types by createAsyncThunk: pending, fulfilled, rejected - starts lifecycle by pending
  //Used internally by Redux Toolkit to track the action's lifecycle
  "contact/addContact", //Follows the pattern [slice name]/[action name]
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/contacts`,
        contactData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      ); //api is context path in application.properties in spring-boot
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFavoriteContactAsync = createAsyncThunk(
  "contact/addFavoriteContact",
  async (contactID, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/contacts/favorite/${contactID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for Fetching Contacts
export const fetchContactAsync = createAsyncThunk(
  "contact/fetchContacts",
  async (rejectWithValue) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/contacts`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for Deleting Contacts
export const deleteContactAsync = createAsyncThunk(
  "contact/deleteContacts",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/contacts/${contact.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async Thunk for Editing Contacts
export const editContactAsync = createAsyncThunk(
  "contact/editContacts",
  async (EditedContact, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/contacts`,
        EditedContact,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    numberOfContacts: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Add Contact
      .addCase(addContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        state.numberOfContacts.push(action.payload.data);
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        state.status = "failed"; // Update status
        state.error = action.payload; // Store the error message
      });

    //Fetch Contacts
    builder
      .addCase(fetchContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        state.numberOfContacts = action.payload.data;
      })
      .addCase(fetchContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //delete Contact using phone number
    builder
      .addCase(deleteContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        const deletedContact = action.meta.arg; // to access data which is passed as argument when dispatched
        state.numberOfContacts = state.numberOfContacts.filter(
          (contact) => contact.phone !== deletedContact.phone
        );
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //edit Contact using id
    builder
      .addCase(editContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editContactAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        const editedContact = action.meta.arg;
        state.numberOfContacts = state.numberOfContacts.map((contact) => {
          console.log(editedContact);
          return contact.id === editedContact.id ? editedContact : contact;
        });
      })
      .addCase(editContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //add favorite contact using id
    builder
      .addCase(addFavoriteContactAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavoriteContactAsync.fulfilled, (state, action) => {
        state.status = "succeed";
        const favoriteContactID = action.meta.arg;
        state.numberOfContacts = state.numberOfContacts.map((contact) => {
          return contact.id === favoriteContactID
            ? { ...contact, favorite: !contact.favorite }
            : contact;
        });
        //to sort contacts immediately at frontend after adding/removing favorite
        state.numberOfContacts = state.numberOfContacts.sort(
          (a, b) => b.favorite - a.favorite
        );
      })
      .addCase(addFavoriteContactAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
