import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useHistory } from "../context/historyCtx";
// import { Types } from "../context/actions/user.actions";
import { useUser } from "../context/userCtx";
import checkUserData from "../lib/helperFunctions/checkUserData";
import imageLoader from "../lib/helperFunctions/loader";

export default function Home() {
  const { history } = useHistory();
  const { push } = useRouter();
  const { state: UserState, dispatch: UserDispatch } = useUser();

  useEffect(() => {
    setTimeout(() => {
      checkUserData(
        UserState.userPayload,
        UserDispatch,
        push,
        "default",
        history
      );
    }, 1000);
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bounce-in-top">
        <Image
          priority={true}
          unoptimized={true}
          loader={imageLoader}
          src="/assets/icons/logo.svg"
          alt="Icon"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
