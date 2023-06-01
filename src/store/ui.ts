import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UiState = {
  errorMessage: string;
};

const initialUiState: UiState = {
  errorMessage: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
