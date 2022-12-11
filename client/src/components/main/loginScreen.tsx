import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { Form, Input } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../lib/helperFunctions/loader";
import { User } from "../../models/user";
import ButtonUI from "../utilities/ButtonUI";
import Modal3 from "../utilities/modal3";
import { emailPattern } from "../../lib/common/regex";
import { AntFormValidatingProps } from "../../models/utilities";
import { fetcher, postApi } from "../../lib/helperFunctions/fetcher";
import { ForgotPasswordUrl, VerifyEmailUrl } from "../../lib/common/endpoints";
import { useLoading } from "../../context/loadingCtx";

interface LoginPropType {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (param: User) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (param: any) => void;
  googleCall: () => void;
  onAdmin: boolean;
}

const LoginScreen: NextPage<LoginPropType> = ({
  onSubmit,
  onError,
  googleCall,
  onAdmin,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const { setLoadingStatus } = useLoading();
  const [form] = Form.useForm();
  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");

  const checkEmail = (val: string) => {
    setValidateStatus("validating");
    fetcher(`${VerifyEmailUrl}/${val}`)
      .then((res) => {
        if (res.data) {
          setValidateStatus("success");
          return;
        }
        setValidateStatus("error");
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
  const onResetPassword = () => {
    if (validateStatus !== "success") {
      toast.error("This email does not exist");
      return;
    }
    const { email } = form.getFieldsValue();
    setLoadingStatus(true);
    if (isProcessingRequest) {
      toast.loading("Processing request");
      return;
    }
    setIsProcessingRequest(true);

    postApi(ForgotPasswordUrl, { email })
      .then((res) => {
        if (!res.successful) return;
        toast.success(res.message);
        setIsModalVisible(false);
      })
      .finally(() => {
        setIsProcessingRequest(false);
        setLoadingStatus(false);
      });
  };

  return (
    <>
      <Modal3
        okText="Confirm"
        handleOk={onResetPassword}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="Forgot Password?"
      >
        <>
          <p className="mb-2">
            A reset link will be sent to this email, kindly confirm your email
            address
          </p>
          <Form name="basic" form={form} layout="vertical" autoComplete="off">
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
                disabled={
                  validateStatus === "validating" || isProcessingRequest
                }
                onChange={checkEmailExist}
                className=""
                type="email"
              />
            </Form.Item>
          </Form>
        </>
      </Modal3>
      <div>
        {onAdmin && (
          <Image
            priority={true}
            unoptimized={true}
            loader={imageLoader}
            src="/assets/icons/logo.svg"
            alt="Icon"
            width={160}
            height={60}
          />
        )}
        <div className="w-[350px] m-[auto] boxProps p-6 my-2">
          <h2 className="text-3xl text-bond font-header">Sign in</h2>
          {!onAdmin && <p className="text-sm my-4 mb-8">Sign in now</p>}
          {onAdmin && (
            <p className="text-sm my-4 mb-8">
              Sign in to view your account details
            </p>
          )}
          {!onAdmin && (
            <ButtonUI
              onClickTrigger={googleCall}
              disabled={false}
              bg="secondary-high"
              color="primary-medium"
              htmlType="button"
              width="100%"
              icon="googleIcon.svg"
            >
              Sign In With Google
            </ButtonUI>
          )}
          {!onAdmin && (
            <div className="w-[100%] my-6 opacity-30 items-center flex justify-evenly">
              <span className="border-b  w-[45%]" />
              <span className="w-[10%] text-center">OR</span>
              <span className="border-b w-[45%]" />
            </div>
          )}
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onError}
            autoComplete="off"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Kindly input your email address!" },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Kindly input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <button
              type="button"
              onClick={() => setIsModalVisible(true)}
              className="-mt-[20px] text-xs text-tertiary-high cursor-pointer"
            >
              Forgot Password?
            </button>
            <Form.Item className="mt-4">
              <ButtonUI disabled={false} htmlType="submit" width="100%">
                Submit
              </ButtonUI>
            </Form.Item>
          </Form>
        </div>
        {!onAdmin && (
          <p className="gap-2 pb-4 flex justify-center">
            <span>New to Eko Carbon?</span>
            <Link href="/register">
              <a className="text-tertiary-high">Create an account</a>
            </Link>
          </p>
        )}
      </div>
    </>
  );
};
export default LoginScreen;
