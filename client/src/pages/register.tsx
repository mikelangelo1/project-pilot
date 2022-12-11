// import { useRouter } from "next/router";
// import { useId, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import RegisterAccountInfoScreen from "../components/main/registerAccountInfoScreen";

// import { useLoading } from "../context/loadingCtx";
import RegisterUserTypeScreen from "../components/main/registerUserTypeScreen";
import RegOffsetCompanyScreen from "../components/main/regOffsetCompanyScreen";
import RegOffsetPersonalScreen from "../components/main/regOffsetPersonalScreen";
import { Types } from "../context/actions/header.actions";
import { useHeader } from "../context/headerCtx";
import { useLoading } from "../context/loadingCtx";
import DefaultLayout from "../layouts/defaultLayout";
import {
  userTypes,
  // eslint-disable-next-line import/named
  typeSubHeader,
  typeHeader,
} from "../lib/common/registerTypes";
import { postApi } from "../lib/helperFunctions/fetcher";
import { Option, ResApi } from "../models/utilities";
import { Dependencies } from "../models/dependencies";
import { DependenciesUrl, RegisterListerUrl } from "../lib/common/endpoints";

// interface Dependencies {
//   bankInfo:
// }

const Register = () => {
  // const { setLoadingStatus } = useLoading();
  // const id = useId();
  const { push } = useRouter();

  const { setLoadingStatus } = useLoading();

  const [step, updateStep] = useState<number>(1);
  const [acctStep, updateAcctStep] = useState<number>(0);
  const [userType, setUserType] = useState<Option | null>(null);
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { dispatch: headerDispatch } = useHeader();

  const { data: dependencies } = useSWR<ResApi<Dependencies> | undefined>(
    DependenciesUrl
  );

  useEffect(() => {
    if (step === 1) {
      headerDispatch({ type: Types.Toggle, payload: { value: false } });
    }
  }, [step, headerDispatch]);

  const onRegAccount = (payload: FormData) => {
    setLoadingStatus(true);
    postApi(RegisterListerUrl, payload)
      .then((res) => {
        if (!res.successful) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
        push(`confirm-email?email=${payload.get("BusinessEmail")}`);
      })
      .finally(() => setLoadingStatus(false));
    // push("listers");
  };
  const selectUserType = (type: Option) => {
    setUserType(type);
    if (type.value === "list") {
      updateStep(2);
      return;
    }
    if (type.value === "offset_personal") {
      updateStep(3);
      return;
    }

    updateStep(4);
  };

  const onRegOffsetPersonal = (values: any) => {
    console.log(values);
    push("offsetters");
  };
  const onRegOffsetCompany = (values: any) => {
    console.log(values);
    push("offsetters");
  };

  const googleCall = () => {
    console.log("register");
  };

  const goBack = () => {
    if (step === 1) {
      push("login");
    }
    if (step === 3 || step === 4) {
      updateStep(1);
      return;
    }
    if (step === 2) {
      if (acctStep === 0) {
        updateStep(step - 1);
        return;
      }
      updateAcctStep(acctStep - 1);
    }
  };

  return (
    <div className="m-[auto] p-5">
      <ArrowLeftOutlined
        className="mb-10 ml-3 rounded-3xl p-2 border border-primary-low"
        onClick={goBack}
      />

      {step === 1 && (
        <RegisterUserTypeScreen
          selected={userType}
          header={typeHeader}
          subHeader={typeSubHeader}
          options={userTypes}
          onSelect={selectUserType}
        />
      )}
      {step === 2 && (
        <RegisterAccountInfoScreen
          dependencies={dependencies?.data}
          currStep={acctStep}
          setCurrStep={updateAcctStep}
          onSubmitReg={onRegAccount}
        />
      )}
      {step === 3 && (
        <RegOffsetPersonalScreen
          googleCall={googleCall}
          onSubmit={onRegOffsetPersonal}
        />
      )}
      {step === 4 && (
        <RegOffsetCompanyScreen
          dependencies={dependencies?.data}
          googleCall={googleCall}
          onSubmit={onRegOffsetCompany}
        />
      )}
    </div>
  );
};
Register.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default Register;
