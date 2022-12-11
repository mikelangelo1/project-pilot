import { createSlice, createAction, createStore } from "@reduxjs/toolkit";
import moment from "moment";

import axios from "axios";
// import { staticConfigs } from "../../utils/configs";

export type userState = {
  loggedIn: boolean;
  userData: undefined | userData;
  loginTime: string;
  rememberMe: boolean;
  //
};

export type userData = {
  token: String;
  refreshToken: String;
  user: Object;
};

let initialState: userState = {
  loggedIn: false,
  userData: undefined,
  loginTime: Date.now().toString(),
  rememberMe: false,
  //
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload?.data;
      state.rememberMe = action.payload?.rememberMe;
      state.loginTime = moment().format();
    },
    logoutSuccess: (state, action) => {
      state.loggedIn = false;
      state.userData = undefined;
    },
    //
    refreshTokenSuccess: (state, action) => {
      let token = action.payload;

      // state.userData = {
      //   ...state.userData,
      //   token,
      // };
    },
  },
});

export const { loginSuccess, logoutSuccess, refreshTokenSuccess } =
  userSlice.actions;
