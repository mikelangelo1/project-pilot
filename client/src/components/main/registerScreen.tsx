import { Form, Input } from "antd";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import CustomButton from "../utilities/ButtonUI";
import { User } from "../../models/user";
import { fetcher } from "../../lib/helperFunctions/fetcher";
import { AntFormValidatingProps } from "../../models/utilities";
import { emailPattern } from "../../lib/common/regex";

interface RegisterPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  googleCall: () => void;
  initialValues: { email: string } | null;
}

const RegisterScreen: NextPage<RegisterPropType> = ({
  onSubmit,
  googleCall,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const onError = (err: any) => {
    console.log(err);
  };

  const checkEmail = (val: string) => {
    setValidateStatus("validating");
    fetcher(`Account/check-email/${val}`)
      .then((res) => {
        if (res.code === 200) {
          setValidateStatus("success");
          return;
        }
        setValidateStatus("error");
        form.setFields([{ name: "email", errors: ["Email already taken"] }]);
      })
      .catch(() => {
        setValidateStatus("error");
      });
  };

  const debouncedSave = useCallback(
    debounce((email: string) => checkEmail(email), 800),
    [] // will be created only once initially
  );

  const checkEmailExist = (e: any) => {
    const inputTarget = e.target as HTMLInputElement;
    const email = inputTarget.value;
    setValidateStatus("");
    if (!email.match(emailPattern)) return;
    debouncedSave(email);
  };

  return (
    <div className="flex flex-col justify-start">
      <div className="w-[350px] m-[auto] shadow-1 rounded-lg bg-secondary-high p-6 my-2">
        <h2 className="text-3xl text-bond font-header">Sign Up</h2>
        <p className="text-sm my-4">Create your own secure account</p>
        <CustomButton
          onClickTrigger={googleCall}
          disabled={false}
          bg="secondary-high"
          color="primary-medium"
          htmlType="button"
          width="100%"
          icon="googleIcon.svg"
        >
          Sign Up With Google
        </CustomButton>

        <div className="w-[100%] my-6 opacity-30 items-center flex justify-evenly">
          <span className="border-b w-[45%]" />
          <span className="w-[10%] text-center">OR</span>
          <span className="border-b w-[45%]" />
        </div>
        <Form
          name="basic"
          layout="vertical"
          form={form}
          initialValues={initialValues ?? {}}
          onFinish={onSubmit}
          onFinishFailed={onError}
          autoComplete="off"
        >
          <Form.Item
            label="Email Address"
            name="email"
            validateFirst={true}
            validateStatus={validateStatus}
            rules={[
              { required: true, message: "Kindly input your email address!" },
              { pattern: emailPattern, message: "Invalid Email" },
            ]}
            hasFeedback
          >
            <Input
              disabled={validateStatus === "validating"}
              onChange={checkEmailExist}
              type="email"
            />
          </Form.Item>

          <Form.Item className="mt-4">
            <CustomButton
              disabled={validateStatus !== "success" && !initialValues}
              htmlType="submit"
              width="100%"
            >
              Submit
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterScreen;
