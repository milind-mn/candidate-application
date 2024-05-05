import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobListState {
  jobs: any[];
}

const initialState: JobListState = {
  jobs: [],
};

const jobListSlice = createSlice({
  name: "jobList",
  initialState,
  reducers: {
    fetchJobsSuccess(state, action: PayloadAction<any[]>) {
      state.jobs = [...state.jobs, ...action.payload];
    },
  },
});

export const { fetchJobsSuccess } = jobListSlice.actions;

export default jobListSlice.reducer;
