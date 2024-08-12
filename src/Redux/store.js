import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import searchReducer from "./searchSlice";
import downloadReducer from "./downloadSlice";
import downloadedGamesReducer from "./downloadedGamesSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    search: searchReducer,
    download: downloadReducer,
    downloadedGames: downloadedGamesReducer,
  },
});
