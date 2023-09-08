import { configureStore } from "@reduxjs/toolkit";
import eventsSliceReducer from "./slices/eventsSlice";

const store = configureStore({
  reducer: {
    events: eventsSliceReducer,
  }
})

export default store;