import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../components/main/header";
import SideNav from "../components/main/sideNav";
import { Types } from "../context/actions/user.actions";
import { useHistory } from "../context/historyCtx";
import { useUser } from "../context/userCtx";
import { GetUserDetailsUrl } from "../lib/common/endpoints";
import checkUserData from "../lib/helperFunctions/checkUserData";
// import { useHeader } from "../context/headerCtx";

const ListerLayout = ({ children }: { children: React.ReactNode }) => {
  const { history } = useHistory();
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const { push } = useRouter();

  const { state: UserState, dispatch: UserDispatch } = useUser();

  // const { data } = useSWR(GetUserDetailsUrl);

  const data = {}

  useEffect(() => {
    // checkUserData(
    //   UserState.userPayload,
    //   UserDispatch,
    //   push,
    //   "listers",
    //   history
    // );
  }, []);

  useEffect(() => {
    // if (UserState.userPayload && data) {
    //   const user = {
    //     ...UserState.userPayload,
    //     profile: data.data.profile,
    //   };
    //   UserDispatch({ type: Types.SetUser, payload: { value: user } });
    // }
  }, [data]);

  // if (!UserState.userPayload) {
  //   return null;
  // }

  return (
    <div className="layout">
      <Header
        type="list"
        toggleSideNav={setIsSideNavOpen}
        isSideNavOpen={isSideNavOpen}
      />

      <div
        className={`fixed ${isSideNavOpen ? "-translate-x-96" : "translate-x-0"
          } transition-all duration-200  z-10 `}
      >
        <SideNav
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
          type="lister"
        />
      </div>

      <div
        style={{ width: "100%", height: "100%" }}
        className="pt-[10vh] xl:pt-[12vh] lg:pt-[14vh] px-2 sm:px-8 sm:pl-[29vw] md:pl-[30vw] lg:pl-[23vw] xl:pl-[17vw]"
      >
        {children}
      </div>
    </div>
  );
};

export default ListerLayout;
