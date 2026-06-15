import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import filterReducer from "./slices/filterSlice";
import bagReducer from "./slices/bagSlice";
import productReducer from "./slices/productSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  whitelist: ["bag"],
};

const rootReducer = combineReducers({
  product: productReducer,
  bag: bagReducer,
  filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
