import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import UserReducer from "./Slices/UserSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

const combine_Reducers = combineReducers({
  user: UserReducer,
});
const persist_Reducer = persistReducer(persistConfig, combine_Reducers);

const Store = configureStore({
  reducer: persist_Reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export default Store;