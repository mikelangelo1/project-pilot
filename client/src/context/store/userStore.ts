import { ListerProject, ListerUser } from "../../models/listers";

export interface UserType {
  userPayload: ListerUser | null;
  projects: ListerProject[];
}

export const initialState: UserType = {
  userPayload: null,
  projects: [],
};
