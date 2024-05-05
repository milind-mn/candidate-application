import jobListReducer from "./jobListReducer";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  jobList: jobListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
