import { ShownActions, Types } from "../actions/user.actions";
import { UserType } from "../store/userStore";
// import { UserType } from "../store/userStore";

export default function userReducer(state: UserType, action: ShownActions):UserType {
  if (action.type === Types.SetUser) {
    return { ...state, userPayload: action.payload.value };
  }
  if (action.type === Types.SetProjects) {
    return { ...state, projects: action.payload.value };
  }
  return state;
}
