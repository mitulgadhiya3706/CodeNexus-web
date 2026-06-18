import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConections: () => null,
    }
});

export const {addConnections, removeConections} = connectionSlice.actions;

export default connectionSlice.reducer;