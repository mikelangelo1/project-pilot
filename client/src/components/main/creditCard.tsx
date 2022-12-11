/* eslint-disable react/jsx-closing-tag-location */
import { Form, Input } from "antd";
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Cards, { Focused } from "react-credit-cards";
import { FormatNumberOnly } from "../../lib/helperFunctions/numberOnly";
// import { FormatNumberOnly } from "../../lib/helperFunctions/numberOnly";
import ModalPopUp from "../utilities/modal";

interface CreditCardType {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCard = ({ isModalVisible, setIsModalVisible }: CreditCardType) => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [expiry, SetExpiry] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState<Focused | undefined>(undefined);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>(null);
  function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
  }
  const formatExpirationDate = (value: any) => {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
  };

  const handleDate = (e: any) => {
    // SetMonth(e.target.value);
    form.setFields([
      { name: "cardExpiry", value: formatExpirationDate(e.target.value) },
    ]);
    SetExpiry(formatExpirationDate(e.target.value));
  };
  const onSubmit = (values: any) => {
    console.warn(values);
  };
  const onError = (values: any) => {
    console.warn(values, formValues);
  };

  return (
    <ModalPopUp
      setIsModalVisible={setIsModalVisible}
      isModalVisible={isModalVisible}
      title="Payment Details"
    >
      <>
        <div>
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
        </div>

        <br />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          initialValues={{}}
          onValuesChange={(_, values) => setFormValues(values)}
          onFinish={onSubmit}
          onFinishFailed={onError}
          autoComplete="off"
        >
          <Form.Item
            label="Card Name"
            name="cardName"
            rules={[{ required: true, message: "Kindly input your card name!" }]}
          >
            <Input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                SetName(e.target.value);
              }}
              onFocus={() => SetFocus("name")}
            />
          </Form.Item>

          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: "Kindly input your card number!" }]}
          >
            <Input
              type="tel"
              className="form-control"
              value={number}
              name="number"
              maxLength={16}
              pattern="[0-9]+"
              onChange={(e) => {
                if (FormatNumberOnly(form, "cardNumber", e.target.value)) {
                  SetNumber(e.target.value);
                }
              }}
              onFocus={() => SetFocus("number")}
            />
          </Form.Item>
          <Form.Item
            label="Card Expiry"
            name="cardExpiry"
            rules={[{ required: true, message: "Kindly input your card expiry date(MM/YY)!" }]}
          >
            <Input
              type="tel"
              name="expiry"
              className="form-control"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              onChange={handleDate}
            />
          </Form.Item>
          <Form.Item
            label="CVC"
            name="cvc"
            rules={[{ required: true, message: "Kindly input your card CVC!" }]}
          >
            <Input
              type="tel"
              name="cvc"
              maxLength={3}
              className=" form-control card"
              value={cvc}
              pattern="\d*"
              onChange={(e) => {
                if (FormatNumberOnly(form, "cvc", e.target.value)) {
                  SetCvc(e.target.value);
                }
              }}
              onFocus={() => SetFocus("cvc")}
            />
          </Form.Item>
          <Input
            type="submit"
            className="btn btn-secondary form-control"
            value="Submit"
          />
        </Form>
      </>
    </ModalPopUp>
  );
};
export default CreditCard;
