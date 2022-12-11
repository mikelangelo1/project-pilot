/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { Dispatch } from "react";

import { ShownActions, Types } from "../../context/actions/user.actions";
import { ListerUser, UserPayload } from "../../models/listers";
import { removeUserToken } from "./tokenValidation";

import { useDispatch } from "react-redux";

const excludedPages = ["/confirm-email/", "/reset-password/"];

export default function checkUserData(
  userState: UserPayload | null | {},
  dispatch: Dispatch<ShownActions>,
  push: (url: string) => void,
  layoutType: "listers" | "offsetters" | "default",
  history: string[]
): void {
  if (!userState) {
    // const userData = localStorage.getItem("eko_user");
    // if (!userData) {
    //   if (layoutType === "default" && location.pathname !== "/") return;
    //   return push("/login");
    // }
    // const ekoUser: ListerUser = JSON.parse(userData);
    // dispatch({ type: Types.SetUser, payload: { value: ekoUser } });
    // if (excludedPages.includes(location.pathname)) {
    //   removeUserToken();
    //   return;
    // }
    // if (ekoUser.userType === 3 && layoutType !== "listers") {
    //   push("/listers");
    // }
  }
}

// check if userdata exists(return) or local storage exists(set user data)
// if either exists, check layout type(if it matches, return true)
// if(no match, redirect to path of layout type);
