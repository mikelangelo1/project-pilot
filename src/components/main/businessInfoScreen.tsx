/* eslint-disable implicit-arrow-linebreak */
import { Form, Input, Select } from "antd";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import { useCallback, useState } from "react";
// import Image from "next/image";
// import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import { emailPattern, urlPattern } from "../../lib/common/regex";
import { BusinessInfo } from "../../models/listers";
import { Dependencies } from "../../models/dependencies";
import { fetcher } from "../../lib/helperFunctions/fetcher";
import { AntFormValidatingProps } from "../../models/utilities";
import { VerifyEmailUrl } from "../../lib/common/endpoints";
// import imageLoader from "../../lib/helperFunctions/loader";
// import ImageViewer from "./imageViewer";

const { Option } = Select;

interface BusinessInfoPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: BusinessInfo) => void;
  goBack: () => void;
  businessInfo: BusinessInfo | undefined;
  dependencies: Dependencies | undefined;
}

const BusinessInfoScreen: NextPage<BusinessInfoPropType> = ({
  onSubmit,
  goBack,
  businessInfo,
  dependencies,
}) => {
  const [form] = Form.useForm();
  const onError = (err: any) => {
    console.log(err);
  };
  const onFilter = (input: any, option: any) =>
    option.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
    0;

  // validate email
  const [validateEmailStatus, setValidateEmailStatus] =
    useState<AntFormValidatingProps>("");

  const checkEmail = (val: string) => {
    setValidateEmailStatus("validating");
    fetcher(`${VerifyEmailUrl}/${val}`)
      .then((res) => {
        if (!res.data) {
          setValidateEmailStatus("success");
          return;
        }
        setValidateEmailStatus("error");
        form.setFields([{ name: "email", errors: ["Email already taken"] }]);
      })
      .catch(() => {
        form.setFields([{ name: "email", errors: ["Email already taken"] }]);
        setValidateEmailStatus("error");
      });
  };

  const debouncedSave = useCallback(
    debounce((email: string) => checkEmail(email), 800),
    [] // will be created only once initially
  );

  const checkEmailExist = (e: any) => {
    const inputTarget = e.target as HTMLInputElement;
    const email = inputTarget.value;
    setValidateEmailStatus("");
    if (!email.match(emailPattern)) return;
    debouncedSave(email);
  };
  // validate email ends

  return (
    <div className="sm:w-[400px] w-[320px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-10 my-2">
      <p className="text-sm my-4">Let us know more about your business</p>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        initialValues={businessInfo ?? {}}
        onFinish={onSubmit}
        onFinishFailed={onError}
        autoComplete="off"
      >
        <Form.Item
          label="Registered Business Name"
          name="BusinessName"
          rules={[
            { required: true, message: "Kindly input your business name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Business Email"
          name="BusinessEmail"
          validateFirst={true}
          validateStatus={validateEmailStatus}
          rules={[
            { required: true, message: "Kindly input your business email!" },
            { pattern: emailPattern, message: "Invalid email!" },
          ]}
          hasFeedback
        >
          <Input
            disabled={validateEmailStatus === "validating"}
            onChange={checkEmailExist}
            type="email"
          />
        </Form.Item>
        <Form.Item
          label="Business Address"
          name="BusinessAddress"
          rules={[
            { required: true, message: "Kindly input your business address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Website"
          name="Website"
          rules={[{ pattern: urlPattern, message: "Invalid Web Url!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Industry"
          name="Industry"
          rules={[
            {
              required: true,
              message: "Kindly select your business industry type!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select an industry"
            optionFilterProp="children"
            filterOption={onFilter}
          >
            {dependencies &&
              dependencies.industries &&
              dependencies.industries.map((option) => (
                <Option key={option.key} value={option.key}>
                  <span className="capitalize">{option.value}</span>
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Summary"
          name="Summary"
          rules={[
            {
              required: true,
              message: "Kindly fill in a summary of your company!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
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
export default BusinessInfoScreen;

// const reader = new FileReader();
//     reader.addEventListener("load", (e: any) => {
//       setImage(e.target.result);
//       // if (reader && reader.result && typeof reader.result === 'string') {
//       const { result } = e.target;

//       // }
//     });
//     reader.readAsDataURL(certOfInc);

// <PhotoView src={image}>
//        </PhotoView>
