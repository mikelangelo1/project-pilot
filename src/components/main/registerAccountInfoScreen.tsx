/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Stepper from "../utilities/StepperUI";
import BankInfoScreen from "./bankInfoScreen";
import BusinessInfoScreen from "./businessInfoScreen";
import BusinessRepScreen from "./businessRepScreen";
import accountInfoSteps from "../../lib/common/accountInfoSteps";
import { Step } from "../../models/utilities";
import {
  BankInfo,
  BusinessInfo,
  BusinessRepInfo,
  Lister,
} from "../../models/listers";
import { Dependencies } from "../../models/dependencies";

interface RegisterAccountInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmitReg: (val: FormData) => void;
  setCurrStep: Dispatch<SetStateAction<number>>;
  currStep: number;
  dependencies: Dependencies | undefined;
}
const RegisterAccountInfoScreen: NextPage<RegisterAccountInfoPropType> = ({
  onSubmitReg,
  currStep,
  setCurrStep,
  dependencies,
}) => {
  const [bankInfo, setBankInfo] = useState<BankInfo | undefined>(undefined);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | undefined>(
    undefined
  );
  const [businessRep, setBusinessRep] = useState<BusinessRepInfo | undefined>(
    undefined
  );
  const [idFiles, setIdFiles] = useState<File[]>([]);
  const onSubmit = (type: string, formData: BankInfo | any) => {
    if (type === "bank") {
      setCurrStep(currStep + 1);
      setBankInfo(formData);
      return;
    }
    if (type === "info") {
      setCurrStep(currStep + 1);
      setBusinessInfo(formData);
      return;
    }
    if (!idFiles.length) {
      toast.error("No uploaded file found");
      return;
    }
    if (businessRep?.Password !== businessRep?.ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setBusinessRep(formData);
    if (!bankInfo || !businessInfo || !businessRep) return;
    const payload: Lister = {
      ...bankInfo,
      ...businessInfo,
      ...businessRep,
      IdentityCard: idFiles[0],
    };
    const formDataVal = new FormData();

    Object.entries(payload).forEach((val) => {
      formDataVal.append(val[0], val[1]);
    });
    onSubmitReg(formDataVal);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper steps={accountInfoSteps()} currStep={currStep} />
      {currStep === 0 && (
        <BankInfoScreen
          dependencies={dependencies}
          bankInfo={bankInfo}
          onSubmit={(formData) => onSubmit("bank", formData)}
        />
      )}
      {currStep === 1 && (
        <BusinessInfoScreen
          dependencies={dependencies}
          businessInfo={businessInfo}
          goBack={() => setCurrStep(currStep - 1)}
          onSubmit={(formData) => onSubmit("info", formData)}
        />
      )}
      {currStep > 1 && (
        <BusinessRepScreen
          idFiles={idFiles}
          setIdFiles={setIdFiles}
          dependencies={dependencies}
          businessRep={businessRep}
          setBusinessRep={setBusinessRep}
          businessName={businessInfo?.BusinessName}
          goBack={() => setCurrStep(currStep - 1)}
          onSubmit={(formData) => onSubmit("rep", formData)}
        />
      )}
    </div>
  );
};

export default RegisterAccountInfoScreen;
