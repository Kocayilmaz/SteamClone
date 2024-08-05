import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    search: searchReducer,
  },
});
