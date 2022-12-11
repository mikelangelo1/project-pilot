import { AnyAction, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

import { userSlice } from "./userSlice";
import { State } from "../models/dependencies";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const reducer = (
  state,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return configureStore({
      reducer: reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }),
    });
  }
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
  // store.__persisitor = persistStore(store);

  return store;
};

type Store = ReturnType<typeof makeStore>;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});
