import { createSlice } from "@reduxjs/toolkit";

const bitRateSlice = createSlice({
  name: "bitRate",
  initialState: {
    value: 0,
  },
  reducers: {
    setBitRate: (state, action) => {
      state.value = action.payload;
    },
    resetBitRate: (state) => {
      state.value = 0;
    },
  },
});

export const { setBitRate, resetBitRate } = bitRateSlice.actions;

export const startBitRateUpdate = () => (dispatch, getState) => {
  if (getState().download.currentDownload) {
    const interval = setInterval(() => {
      const newBitRate = (Math.random() * (30 - 20) + 20).toFixed(2);
      dispatch(setBitRate(newBitRate));
    }, 2000);

    return () => clearInterval(interval);
  }
};

export const stopBitRateUpdate = () => (dispatch) => {
  // This action can be used to stop the bit rate updates.
};

export const resetBitRateOnDownloadComplete = () => (dispatch) => {
  dispatch(resetBitRate());
};

export default bitRateSlice.reducer;
