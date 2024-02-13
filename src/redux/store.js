// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./dataslice";

export const store = configureStore({
  reducer: {
    users: usersReducer,

  },
});
