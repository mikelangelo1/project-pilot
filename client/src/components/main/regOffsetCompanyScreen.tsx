/* eslint-disable implicit-arrow-linebreak */
import { Form, Input, Select } from "antd";
import debounce from "lodash.debounce";
import { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "../../context/loadingCtx";
import { emailPattern, passwordPattern } from "../../lib/common/regex";
import { fetcher, postApi } from "../../lib/helperFunctions/fetcher";
import { Dependencies } from "../../models/dependencies";
import { OffsetterCompany } from "../../models/offsetters";
import { User } from "../../models/user";
import { AntFormValidatingProps } from "../../models/utilities";
import ButtonUI from "../utilities/ButtonUI";

interface RegOffsetCompanyScreenPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  googleCall: () => void;
  dependencies: Dependencies | undefined;
}
const { Option } = Select;

const RegOffsetCompanyScreen: NextPage<RegOffsetCompanyScreenPropType> = ({
  dependencies,
}) => {
  const { setLoadingStatus } = useLoading();
  const [form] = Form.useForm();
  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const [validateCPassStatus, setValidateCPassStatus] =
    useState<AntFormValidatingProps>("");
  const [formValues, setFormValues] = useState<OffsetterCompany | null>(null);
  const [disableEmail, setDisableEmail] = useState(false);

  const onFilter = (input: any, option: any) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const onError = (err: any) => {
    console.log(err);
  };

  const checkEmail = (val: string) => {
    setValidateStatus("validating");
    setDisableEmail(true);
    fetcher(`Account/check-email/${val}`)
      .then((res) => {
        if (res.code === 200) {
          setValidateStatus("success");
          return;
        }
        setValidateStatus("error");
        form.setFields([{ name: "email", errors: ["Email already taken"] }]);
      })
      .finally(() => {
        setDisableEmail(false);
      });
  };

  const debouncedSave = useCallback(
    debounce((email: string) => checkEmail(email), 800),
    []
  );

  const checkEmailExist = (e: any) => {
    const inputTarget = e.target as HTMLInputElement;
    const email = inputTarget.value;
    setValidateStatus("");
    if (!email.match(emailPattern)) return;
    debouncedSave(email);
  };

  const confirmPass = (value: string) => {
    const password = formValues?.Password;
    console.warn(formValues, formValues?.Password);
    if (!password) return;
    if (value !== password) {
      form.setFields([
        { name: "ConfirmPassword", errors: ["Email already taken"] },
      ]);
      setValidateCPassStatus("error");
      return;
    }
    form.setFields([{ name: "ConfirmPassword", errors: [""] }]);
    setValidateCPassStatus("success");
  };

  const googleCall = () => {
    console.log("google called");
  };

  const onSubmit = (values: OffsetterCompany) => {
    if (values.Password !== values.ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoadingStatus(true);
    postApi("Account/register-private-company", values)
      .then((res) => {
        console.log(res);
      })
      .finally(() => setLoadingStatus(false));
  };

  return (
    <div>
      <div className="w-[350px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-6 my-2">
        <h2 className="text-3xl text-bond font-header">Sign Up</h2>
        <p className="text-sm my-4">Create your own secure account</p>
        <ButtonUI
          onClickTrigger={googleCall}
          disabled={false}
          bg="secondary-high"
          color="primary-medium"
          htmlType="button"
          width="100%"
          icon="googleIcon.svg"
        >
          Sign Up With Google
        </ButtonUI>

        <div className="w-[100%] my-6 opacity-30 items-center flex justify-evenly">
          <span className="border-b  w-[45%]" />
          <span className="w-[10%] text-center">OR</span>
          <span className="border-b w-[45%]" />
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={formValues ?? undefined}
          form={form}
          onValuesChange={(_, values) => setFormValues(values)}
          onFinish={onSubmit}
          onFinishFailed={onError}
          autoComplete="off"
        >
          <Form.Item
            label="Business Name"
            name="BusinessName"
            rules={[
              { required: true, message: "Kindly input your business name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Business Email Address"
            name="BusinessEmail"
            validateFirst={true}
            validateStatus={validateStatus}
            rules={[
              { required: true, message: "Kindly input your email address!" },
              { pattern: emailPattern, message: "Invalid email!" },
            ]}
            hasFeedback
          >
            <Input
              disabled={disableEmail}
              type="email"
              onChange={checkEmailExist}
            />
          </Form.Item>
          <Form.Item
            label="Business Address"
            name="BusinessAddress"
            rules={[
              {
                required: true,
                message: "Kindly input your business address!",
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          {/* <Form.Item
            label="RC Number"
            name="RcNumber"
            rules={[
              { required: true, message: "Kindly input your RC number!" },
            ]}
          >
            <Input type="number" />
          </Form.Item> */}
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
            label="Password"
            name="Password"
            rules={[
              { required: true, message: "Kindly input your password!" },
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
            validateStatus={validateCPassStatus}
            rules={[{ required: true, message: "Password do not match!" }]}
          >
            <Input.Password onChange={(e) => confirmPass(e.target.value)} />
          </Form.Item>
          <Form.Item className="mt-4">
            <ButtonUI disabled={false} htmlType="submit" width="100%">
              Submit
            </ButtonUI>
          </Form.Item>
        </Form>
      </div>
      <p className="gap-2 flex justify-center">
        <span>Already have an account?</span>
        <Link href="/login">
          <a className="text-tertiary-high">Sign In</a>
        </Link>
      </p>
    </div>
  );
};
export default RegOffsetCompanyScreen;
