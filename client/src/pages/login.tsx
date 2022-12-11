import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useLoading } from "../context/loadingCtx";
import LoginScreen from "../components/main/loginScreen";
import DefaultLayout from "../layouts/defaultLayout";
import { postApi } from "../lib/helperFunctions/fetcher";
import { User } from "../models/user";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";

const Login = () => {
  const { setLoadingStatus } = useLoading();
  const { push } = useRouter();

  const dispatch = useDispatch()

  const authenticate = (val: User) => {
    console.warn(val);
    setLoadingStatus(true);

    const dummyUser = {
      jwToken: "",
      refreshToken: ""
    }

    dispatch(loginSuccess({
      data: dummyUser
    }))

    push("/listers");

    // localStorage.setItem("eko_user", JSON.stringify(dummyUser))

    // postApi("Account/authenticate", val)
    //   .then((res) => {
    //     if (res.successful) {
    //       toast.success(res.message);
    //       if (res.data.profile?.company) {
    //         localStorage.setItem("eko_user", JSON.stringify(res.data));
    //         // checkUserData(UserState.userData, UserDispatch, push, "listers");
    //         push("/listers");
    //       }
    //     } else {
    //       toast.error(res.message);
    //     }
    //     console.log(res);
    //   })
    //   .finally(() => setLoadingStatus(false));

    setLoadingStatus(false)
  };

  const onSubmit = (values: User) => {
    console.log("Success:", values);
    authenticate(values);
  };

  const onError = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const googleCall = () => {
    console.log("login");
  };

  return (
    <div className="m-[auto] h-[90vh] flex justify-center py-[10vh] p-5">
      <LoginScreen
        onSubmit={onSubmit}
        onError={onError}
        googleCall={googleCall}
        onAdmin={false}
      />
    </div>
  );
};
Login.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default Login;
