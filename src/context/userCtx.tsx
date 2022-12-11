import React, {
  createContext,
  Dispatch,
  ReactChild,
  useContext,
  useReducer,
} from "react";
import { ShownActions } from "./actions/user.actions";
import userReducer from "./reducers/user.reducer";
import { UserType, initialState } from "./store/userStore";

type ContextType = {
  state: UserType;
  dispatch: Dispatch<ShownActions>;
};

const initialCtx: ContextType = {
  state: initialState,
  dispatch: () => {},
};

const UserContext = createContext<ContextType>(initialCtx);

const UserProvider = ({
  children,
}: {
  children: ReactChild | ReactChild[];
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <span>{children}</span>
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside a `UserProvider`");
  }
  return context;
};

export { UserProvider, useUser };
