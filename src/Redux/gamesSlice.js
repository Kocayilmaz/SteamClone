import { createSlice } from "@reduxjs/toolkit";
import { fetchDataByCategory } from "../utils/Fetch";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setItems, setLoading, setError } = gamesSlice.actions;

export const fetchAndFilterGames = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fetchDataByCategory();
    dispatch(setItems(data));
  } catch (error) {
    dispatch(setError(error.toString()));
  } finally {
    dispatch(setLoading(false));
  }
};

export default gamesSlice.reducer;
