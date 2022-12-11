import { UserPayload } from "../../models/listers";

export function getUserToken():null | UserPayload {
  const user = localStorage.getItem("eko_user");
  if (!user) return null;
  return JSON.parse(user);
}
export function setUserToken(user: UserPayload) {
  localStorage.setItem("eko_user", JSON.stringify(user));
}
export function removeUserToken() {
  localStorage.removeItem("eko_user");
}
