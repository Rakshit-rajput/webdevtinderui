import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload; // Replace all requests
    },
    addRequest: (state, action) => {
      state.push(action.payload); // Add a single request
    },
    removeRequests: (state, action) => {
      const newArray = state.filter((r) => r._id != action.payload);
      return newArray;
    },
  },
});

export const { addRequests, addRequest, removeRequests } = RequestSlice.actions;
export default RequestSlice.reducer;
