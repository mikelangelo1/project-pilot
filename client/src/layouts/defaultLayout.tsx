import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/main/header";
import { useUser } from "../context/userCtx";
import { useHistory } from "../context/historyCtx";
import checkUserData from "../lib/helperFunctions/checkUserData";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { history } = useHistory();
  const { dispatch, state } = useUser();
  const { push } = useRouter();
  // const { state: UserState } = useUser();

  useEffect(() => {
    checkUserData(state.userPayload, dispatch, push, "default", history);
  }, [state]);

  return (
    <div className="layout">
      <Header type="entry" />
      <div
        style={{ width: "100%", height: "100%" }}
        className="pt-[8vh] pb-[20px]"
      >
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;

// const {
//   state: { isShown },
// } = useHeader();
