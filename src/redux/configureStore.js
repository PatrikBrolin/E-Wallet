import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice";

const store = configureStore({
  reducer: {
    cardsSlice: cardsSlice
  }
})

export default store;