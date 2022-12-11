import { useEffect } from "react";
import { useRouter } from "next/router";
// import { Types } from "../context/actions/user.actions";
import { useLoading } from "../../context/loadingCtx";
import { useUser } from "../../context/userCtx";
import { useHistory } from "../../context/historyCtx";
import checkAdminData from "../../lib/helperFunctions/checkAdminData";

export default function Home() {
  const { loading, setLoadingStatus } = useLoading();
  const { push } = useRouter();
  const { history } = useHistory();

  const { state: UserState, dispatch: UserDispatch } = useUser();
  const toggle = () => {
    setLoadingStatus(!loading);
  };

  useEffect(() => {
    checkAdminData(
      UserState.userPayload,
      UserDispatch,
      push,
      history
    );
    console.log(UserState);
  }, []);

  if (!UserState.userPayload) {
    return null;
  }


  return (
    <>
      {JSON.stringify(loading)}
      <div>Hello World</div>
      <button type="button" onClick={toggle}>
        Hello
      </button>
    </>
  );
}
