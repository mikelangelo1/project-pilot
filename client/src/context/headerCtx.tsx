import React, {
  createContext,
  Dispatch,
  ReactChild,
  useContext,
  useReducer,
} from "react";
import { ShownActions } from "./actions/header.actions";
import headerReducer from "./reducers/header.reducer";
import { HeaderType, initialState } from "./store/headerStore";

type ContextType = {
  state: HeaderType;
  dispatch: Dispatch<ShownActions>;
};

const initialCtx: ContextType = {
  state: initialState,
  dispatch: () => { },
};

const HeaderContext = createContext<ContextType>(initialCtx);

const HeaderProvider = ({
  children,
}: {
  children: ReactChild | ReactChild[];
}) => {
  const [state, dispatch] = useReducer(headerReducer, initialState);

  return (
    <HeaderContext.Provider value={{ state, dispatch }}>
      <span>{children}</span>
    </HeaderContext.Provider>
  );
};

const useHeader = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeader must be used inside a `HeaderProvider`");
  }
  return context;
};

export { HeaderProvider, useHeader };
