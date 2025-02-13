import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contact/contactSlice";
import contactOneReducer from "../features/contact/contactOneSlice";
import registerReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    contact: contactReducer, //why is this required
    contactInfo: contactOneReducer,
    user: registerReducer,
  },
});

//action -> reducer -> store
