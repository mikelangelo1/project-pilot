/* eslint-disable object-curly-newline */
import { Form, Input, Select } from "antd";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import PhoneInput from "react-phone-input-2";

// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { BusinessRepInfo } from "../../models/listers";

import DropFile from "../utilities/DropFile";
import { AntFormValidatingProps, BooleanType } from "../../models/utilities";
import {
  emailPattern,
  passwordPattern,
  phonePattern,
} from "../../lib/common/regex";
import { City, Dependencies, State } from "../../models/dependencies";
import { idType, mockBooleanOptions } from "../../lib/common/dependencies";

const { Option } = Select;

interface BusinessRepPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: BusinessRepInfo) => void;
  goBack: () => void;
  dependencies: Dependencies | undefined;
  businessRep: BusinessRepInfo | undefined;
  setBusinessRep: Dispatch<SetStateAction<BusinessRepInfo | undefined>>;
  setIdFiles: Dispatch<SetStateAction<File[]>>;
  idFiles: File[];
  businessName: string | undefined;
}

const BusinessRepScreen: NextPage<BusinessRepPropType> = ({
  onSubmit,
  goBack,
  businessRep,
  setBusinessRep,
  businessName,
  idFiles,
  setIdFiles,
  dependencies,
}) => {
  const onError = (err: any) => {
    console.log(err);
  };
  const [options, setOptions] = useState<BooleanType[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const [form] = Form.useForm();

  //   call API
  useEffect(() => {
    setOptions(mockBooleanOptions);
  }, []);

  const onCountrySelected = (val: string) => {
    setStates([]);
    setCities([]);
    if (!dependencies || !dependencies.countries) return;
    const selectedCountry = dependencies.countries.find(
      (country) => country.name === val
    );
    if (!selectedCountry) return;
    setStates(selectedCountry.states);
  };
  const onStateSelected = (val: string) => {
    setCities([]);
    const selectedStates = states.find((state) => state.name === val);
    if (!selectedStates) return;
    setCities(selectedStates.cities);
  };

  const confirmPass = (value: string) => {
    const password = businessRep?.Password;
    if (!password) return;
    if (value !== password) {
      setValidateStatus("error");
      return;
    }
    form.setFields([{ name: "ConfirmPassword", errors: [""] }]);
    setValidateStatus("success");
  };

  return (
    <div className="sm:w-[400px] w-[320px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-10 my-2">
      <p className="text-sm my-4">
        “To ensure we keep with regulatory requirements, this stall needs to be
        activated by someone with significant management responsibility or
        control
      </p>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        initialValues={businessRep}
        onValuesChange={(_, values) => setBusinessRep(values)}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Project Scope"
          name="ProjectScope"
          rules={[
            { required: true, message: "Kindly select a project scope!" },
          ]}
        >
          <Select placeholder="Select a project scope">
            {dependencies?.projectScopes &&
              dependencies.projectScopes.map((option) => (
                <Option key={option.key} value={option.key}>
                  <span className="capitalize">{option.value}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={`Are you a business owner at ${businessName ?? ""}`}
          name="IsBusinessOwner"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option">
            {options.length &&
              options.map((option) => (
                <Option key={option.name} value={option.value}>
                  <span className="capitalize">{option.name}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={`Do you own more than 25% at ${businessName ?? ""}`}
          name="OwnMoreThanTwentyFivePercent"
          rules={[{ required: true, message: "Kindly select an option!" }]}
        >
          <Select placeholder="Select an option">
            {options.length &&
              options.map((option) => (
                <Option key={option.name} value={option.value}>
                  <span className="capitalize">{option.name}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="FullName"
          rules={[{ required: true, message: "Kindly input your full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="Email"
          rules={[
            { required: true, message: "Kindly input your email address!" },
            { pattern: emailPattern, message: "Invalid email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="PhoneNumber"
          rules={[
            { required: true, message: "Kindly input your phone number!" },
            { pattern: phonePattern, message: "Invalid phone number!" },
          ]}
        >
          <PhoneInput country="ng" containerClass="w-40px" />
        </Form.Item>
        <Form.Item
          label="Country"
          name="Country"
          rules={[{ required: true, message: "Kindly select your country!" }]}
        >
          <Select
            onSelect={(val: string) => onCountrySelected(val)}
            placeholder="Select an option"
          >
            {dependencies &&
              dependencies.countries &&
              dependencies.countries.map((option) => (
                <Option key={option.name} value={option.name}>
                  <span className="capitalize">{option.name}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="State"
          name="State"
          rules={[{ required: true, message: "Kindly select your state!" }]}
        >
          <Select
            disabled={!states.length}
            onSelect={(val: string) => onStateSelected(val)}
            placeholder="Select an option"
          >
            {states.length &&
              states.map((option) => (
                <Option key={option.name} value={option.name}>
                  <span className="capitalize">{option.name}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="City"
          name="City"
          rules={[{ required: true, message: "Kindly select your city!" }]}
        >
          <Select disabled={!cities.length} placeholder="Select an option">
            {cities.length &&
              cities.map((option) => (
                <Option key={option.name} value={option.name}>
                  <span className="capitalize">{option.name}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Street Address"
          name="StreetAddress"
          rules={[
            { required: true, message: "Kindly input your street address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Select ID Type"
          name="IdentityCardType"
          rules={[{ required: true, message: "Kindly select your id type!" }]}
        >
          <Select placeholder="Select an option">
            {idType.length &&
              idType.map((option) => (
                <Option key={option.value} value={option.value}>
                  <span className="capitalize">{option.name}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div>
          <DropFile
            title="Upload ID"
            acceptedFileTypes={["pdf", "jpeg", "jpg", "png"]}
            files={idFiles}
            setFiles={setIdFiles}
            allowMultiple={false}
          />
        </div>

        <Form.Item
          label="Password"
          name="Password"
          rules={[
            {
              required: true,
              message: "Kindly input a password!",
            },
            {
              pattern: passwordPattern,
              message:
                "Password must contain a minimum of six characters with at least one letter and a number",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="ConfirmPassword"
          validateStatus={validateStatus}
          rules={[
            {
              required: true,
              message: "Password do not match!",
            },
          ]}
        >
          <Input.Password onChange={(e) => confirmPass(e.target.value)} />
        </Form.Item>

        <Form.Item className="mt-10 text-right gap-x-8">
          <ButtonUI
            onClickTrigger={goBack}
            disabled={false}
            htmlType="button"
            className="!sm:px-10 px-7 border border-primary-mid !text-primary-high !bg-secondary-high mr-2 "
          >
            Back
          </ButtonUI>
          <ButtonUI
            disabled={false}
            htmlType="submit"
            className="!sm:px-10 px-7"
          >
            Submit
          </ButtonUI>
        </Form.Item>
      </Form>
    </div>
  );
};
export default BusinessRepScreen;
