import { combineReducers } from "@reduxjs/toolkit";
import jobListReducer from "./jobListReducer";

const rootReducer = combineReducers({
  jobList: jobListReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
