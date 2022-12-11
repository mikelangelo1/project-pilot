/* eslint-disable indent */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { Dispatch } from "react";

import { ShownActions, Types } from "../../context/actions/user.actions";
import { ListerUser, UserPayload } from "../../models/listers";


export default function checkAdminData(
    userState: UserPayload | null | {},
    dispatch: Dispatch<ShownActions>,
    push: (url: string) => void,
    history: string[]
): void {
    if (!userState) {
        const userData = localStorage.getItem("eko_user");
        console.log(location.pathname);
        if (!userData) {
            push("admin/login");
            return;
        }
        const ekoUser: ListerUser = JSON.parse(userData);
        dispatch({ type: Types.SetUser, payload: { value: ekoUser } });

        // check layout type matches with the user data

        // if (layoutType !== ekoUser.type) {
        //   push(`/${layoutType}`);
        // }
    }
}

// check if userdata exists(return) or local storage exists(set user data)
// if either exists, check layout type(if it matches, return true)
// if(no match, redirect to path of layout type);
