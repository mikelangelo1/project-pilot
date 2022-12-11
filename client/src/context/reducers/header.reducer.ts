import { ShownActions, Types } from "../actions/header.actions";
import { HeaderType } from "../store/headerStore";

export default function headerReducer(state: HeaderType, action: ShownActions) {
  if (action.type === Types.Toggle) {
    return { ...state, isShown: action.payload.value };
  }
  return state;
}
