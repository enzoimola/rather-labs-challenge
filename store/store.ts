import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {dataSlice} from "./dataSlice";
import {createWrapper} from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [dataSlice.name]: dataSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(makeStore);