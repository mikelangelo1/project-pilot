import { Divider, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "../../context/loadingCtx";
import { passwordPattern } from "../../lib/common/regex";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { AntFormValidatingProps } from "../../models/utilities";
import CustomButton from "../utilities/ButtonUI";

interface ResetPass {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

interface UpdatePasswordPropType {
  updatePasswordLink: string;
  reRouteLink?: string;
}

const UpdatePassword = ({
  updatePasswordLink,
  reRouteLink,
}: UpdatePasswordPropType) => {
  const [form] = Form.useForm();
  const { setLoadingStatus } = useLoading();
  const { push } = useRouter();
  const [validateStatus, setValidateStatus] =
    useState<AntFormValidatingProps>("");
  const [updatePassVal, setUpdatePassVal] = useState<ResetPass | null>(null);

  const onSubmit = (values: ResetPass) => {
    if (values.newPassword !== values.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    delete values.confirmNewPassword;
    setLoadingStatus(true);
    postApi(updatePasswordLink, values)
      .then((res) => {
        if (!res.successful) {
          toast.error(res.message);
          return;
        }
        toast.success(res.message);
        form.resetFields();
        if (reRouteLink) {
          push(reRouteLink);
        }
      })
      .finally(() => setLoadingStatus(false));
    console.warn(values);
  };

  const confirmPass = (value: string) => {
    const password = updatePassVal?.newPassword;
    if (!password) return;
    if (value !== password) {
      setValidateStatus("error");
      return;
    }
    setValidateStatus("success");
  };

  return (
    <div className="flex flex-col justify-start">
      <div className="">
        <h3 className="font-header font-medium text mb-1">Password</h3>
        <p className="text-xs ">
          Please enter your current password to change your password
        </p>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onValuesChange={(_, values) => setUpdatePassVal(values)}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item label="Current password" name="oldPassword">
            <Input.Password />
          </Form.Item>
          <Divider />
          <Form.Item
            label="New password"
            name="newPassword"
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
          <Divider />
          <Form.Item
            label="Confirm new password"
            name="confirmNewPassword"
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

          <Form.Item className="mt-4 text-right">
            <CustomButton
              htmlType="submit"
              bg="secondary-high"
              color="primary-high"
              className="px-8 mx-2"
            >
              Cancel
            </CustomButton>
            <CustomButton htmlType="submit">Update Password</CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
