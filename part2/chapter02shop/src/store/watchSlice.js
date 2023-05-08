import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  data: [],
};

export const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    addProductId: (state, action) => {
      state.value.push(action.payload);
    },
    addData: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addProductId, addData } = watchSlice.actions;

export default watchSlice.reducer;
