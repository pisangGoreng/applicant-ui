import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  selectedApplicant: null | any;
}

const initialState: initialStateTypes = {
  selectedApplicant: null,
};

export const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    setSelectedApplicant: (state, action: PayloadAction<boolean>) => {
      state.selectedApplicant = action.payload;
    },
  },
});

export const { setSelectedApplicant } = applicantSlice.actions;
export default applicantSlice.reducer;
