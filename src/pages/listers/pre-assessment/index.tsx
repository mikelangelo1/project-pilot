import Axios from "axios";
import { useEffect, useState } from "react";
import EnergyEfficient from "../../../components/main/energyEfficient";
import EnergyPhotovolatic from "../../../components/main/energyphotovolt";
import RecyclePreAssessment from "../../../components/main/recyclePreAssessment";
import SelectUI from "../../../components/utilities/SelectUI";
import { useUser } from "../../../context/userCtx";
import ListerLayout from "../../../layouts/listerLayout";

import ConvertToLowerDenominator from "../../../lib/helperFunctions/moneyConvertion";
// import { fetcher, postApi } from "../../../lib/helperFunctions/fetcher";
import {
  Option as OptionType,
  PaystackConfig,
} from "../../../models/utilities";

const menuItem: OptionType[] = [
  {
    title: "Recyclable Materials",
    value: "recyclableMaterial",
  },
  {
    title: "Energy Photovolatic / Mini-grid",
    value: "energyPhotovolatic",
  },
  {
    title: "Energy Efficient: Clean Cook Stove",
    value: "energyEfficient",
  },
];
const to = "NGN";
const from = "USD";
const amount = 50;

const preAssessmentUrl = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`;
const header = { apikey: "D4QoZilx8e0VWSIumpchiIBOWsZ1rQar" };
const PaymentButton = `Pay $50 to calculate`;

const configDefault: PaystackConfig = {
  publicKey: "pk_test_e9310289d360c39b644784701f697bb22f021fac",
  amount: ConvertToLowerDenominator(50 * 415) ?? 0,
  email: "",
};

const PreAssessment = () => {
  const [selected, selectOption] = useState<null | string>(
    "recyclableMaterial"
  );
  const {
    state: { userPayload },
  } = useUser();

  const [config, setConfig] = useState(configDefault);
  const getConversion = () => {
    const getFromLS = localStorage.getItem("preAs");
    if (getFromLS && JSON.parse(getFromLS)) {
      const val = JSON.parse(getFromLS);
      if (new Date().toDateString() === val.expiry) {
        setConfig({
          ...config,
          amount: val.value,
          email: userPayload?.email ?? "",
        });
        return;
      }
    }
    Axios.get(preAssessmentUrl, { headers: header }).then((res: any) => {
      if (!res.data || !res.data.result) return;
      const amount = ConvertToLowerDenominator(res.data.result);
      const val = {
        value: amount,
        expiry: new Date().toDateString(),
      };
      localStorage.setItem("preAs", JSON.stringify(val));
      setConfig({
        ...config,
        amount,
        email: userPayload?.email ?? "",
      });
    });
  };

  useEffect(() => {
    getConversion();
  }, []);



  return (
    <div className="w-[350px] lg:w-[600px] m-[auto] my-2">
      <div className="">
        <h2 className="font-header text-xl">Pre-Assessment Calculator</h2>
        <p>Get an overview of a pre-assesment calculator</p>
      </div>
      <div className="shadow-1 rounded-lg bg-secondary-high p-6 my-2">
        <p className="my-2">I would liike to pre-assess this project type</p>
        <SelectUI
          width="w-[300px]"
          textSize="text-sm"
          menuItem={menuItem}
          selected={selected}
          selectOption={selectOption}
        />
        {selected === "recyclableMaterial" && (
          <RecyclePreAssessment
            intiateTrans={config}
            paymentButton={PaymentButton}
          />
        )}
        {selected === "energyPhotovolatic" && (
          <EnergyPhotovolatic
            intiateTrans={config}
            paymentButton={PaymentButton}
          />
        )}
        {selected === "energyEfficient" && (
          <EnergyEfficient
            intiateTrans={config}
            paymentButton={PaymentButton}
          />
        )}
      </div>
    </div>
  );
};
PreAssessment.getLayout = (page: any) => <ListerLayout>{page}</ListerLayout>;
export default PreAssessment;
