/* eslint-disable no-unused-vars */
import { ListerUser } from "../../models/listers";
import { UserType } from "../store/userStore";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  SetProjects = "SET_PROJECTS",
  SetUser = "SET_USER",
}

export type ShownPayload = {
  [Types.SetProjects]: {
    value: UserType['projects'];
  };
  [Types.SetUser]: {
    value: UserType['userPayload'];
  };
};
export type ShownActions =
  ActionMap<ShownPayload>[keyof ActionMap<ShownPayload>];
