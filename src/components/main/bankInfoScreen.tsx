/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { Form, Input, Select } from "antd";

import { NextPage } from "next";
import { useCallback, useState } from "react";

// import { User } from "../../models/user";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import ButtonUI from "../utilities/ButtonUI";
import { BankInfo } from "../../models/listers";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { AntFormValidatingProps } from "../../models/utilities";
import { Dependencies } from "../../models/dependencies";

const { Option } = Select;

interface BankInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: BankInfo) => void;
  bankInfo: BankInfo | undefined;
  dependencies: Dependencies | undefined;
  // eslint-disable-next-line no-unused-vars
}

const BankInfoScreen: NextPage<BankInfoPropType> = ({
  onSubmit,
  bankInfo,
  dependencies,
}) => {
  const [formValues, setFormValues] = useState<BankInfo | null>(null);
  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const [form] = Form.useForm();

  const onError = (err: any) => {
    console.log(err);
  };
  const onFilter = (input: any, option: any) =>
    option.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
    0;
  const onFilterBank = (input: any, option: any) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const [disableAcctNum, setDisableAcctNum] = useState(false);

  const validatingAccount = (accountNumber: string, bankName: string) => {
    const bankCode = dependencies?.banks.find(
      (bank) => bank.name === bankName
    )?.code;
    setValidateStatus("validating");
    setDisableAcctNum(true);
    postApi(`Account/validate-account`, { accountNumber, bankCode })
      .then((res) => {
        if (!res.successful) return;
        form.setFields([{ name: "AccountName", value: res.data.account_Name }]);
        setValidateStatus("success");
      })
      .catch(() => {
        setValidateStatus("error");
        toast.error("Invalid Account");
      })
      .finally(() => setDisableAcctNum(false));
  };
  const debouncedSave = useCallback(
    debounce(
      (acctNum: string, bankName: string) =>
        validatingAccount(acctNum, bankName),
      800
    ),
    []
  );

  const resetAcctNum = () => {
    form.setFields([{ name: "AccountNumber", value: "" }]);
    form.setFields([{ name: "AccountName", value: "" }]);
    setValidateStatus("");
  };

  const validateAccount = (acctNum: string) => {
    setValidateStatus("");
    form.setFields([{ name: "CorporateAccountName", value: "" }]);
    if (Number.isNaN(Number(acctNum))) {
      setValidateStatus("error");
      return;
    }
    if (acctNum.length !== 10) return;
    if (!formValues) return;
    if (!formValues.BankName) {
      toast.error("Kindly select a bank");
      return;
    }
    setValidateStatus("");
    debouncedSave(acctNum, formValues.BankName);
  };

  return (
    <div className="sm:w-[400px] w-[320px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-10 my-2">
      <p className="text-sm my-4">Please input your account details</p>
      <Form
        name="basic"
        form={form}
        layout="vertical"
        initialValues={bankInfo}
        onValuesChange={(_, values) => setFormValues(values)}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Country"
          name="BankCountryName"
          rules={[{ required: true, message: "Kindly select your country!" }]}
        >
          <Select placeholder="Select an option">
            {dependencies &&
              dependencies.countries &&
              dependencies.countries.map((option) => (
                <Option key={option.name} value={option.name}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Account Type"
          name="BankAccountType"
          rules={[
            { required: true, message: "Kindly select an account Type!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Select an account Type"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {dependencies &&
              dependencies.bankAccountTypes &&
              dependencies.bankAccountTypes.map((option) => (
                <Option key={option.key} value={option.key}>
                  <span className="capitalize">{option.value}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Bank Name"
          name="BankName"
          rules={[{ required: true, message: "Kindly select a bank!" }]}
        >
          <Select
            showSearch
            placeholder="Select a bank"
            optionFilterProp="children"
            filterOption={onFilterBank}
            onSelect={() => resetAcctNum()}
          >
            {dependencies &&
              dependencies.banks &&
              dependencies.banks.map((option) => (
                <Option key={option.name} value={option.name}>
                  {option.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          shouldUpdate
          label="Account Number"
          name="AccountNumber"
          rules={[
            {
              required: true,
              message: "Kindly input your organisation account number!",
            },
            {
              max: 10,
              min: 10,
              message: "Account Number must be exactly 10 digits!",
            },
          ]}
          validateStatus={validateStatus}
          hasFeedback
        >
          <Input
            disabled={disableAcctNum}
            onChange={(e) => validateAccount(e.target.value)}
            maxLength={10}
            type="tel"
          />
        </Form.Item>
        <Form.Item
          label="Account Name"
          name="AccountName"
          rules={[
            {
              required: true,
              message: "No organisation account name found!",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item className="mt-4 text-right">
          <ButtonUI htmlType="submit" className="px-8 ">
            Proceed
          </ButtonUI>
        </Form.Item>
      </Form>
    </div>
  );
};
export default BankInfoScreen;
