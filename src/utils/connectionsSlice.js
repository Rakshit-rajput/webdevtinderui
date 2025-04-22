import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSlice = createSlice({
  name: "Connections",
  initialState: null,
  reducers: {
    addConnections: (state, actions) => {
      return actions.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});
export const { addConnections, removeConnections } = ConnectionsSlice.actions;
export default ConnectionsSlice.reducer;
