import { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackConfig } from "../../models/utilities";
import ButtonUI from "../utilities/ButtonUI";

interface PaystackPaymentPropType {
  // eslint-disable-next-line no-unused-vars
  onSuccess: (reference: any) => void;
  onClose: () => void;
  config: PaystackConfig;
  buttonTitle: string;
  className?: string;
  canMakePayment: () => boolean;
}

const PaystackPaymentButton = ({
  onSuccess,
  onClose,
  config,
  buttonTitle,
  className,
  canMakePayment
}: PaystackPaymentPropType) => {
  useEffect(() => {
    console.warn(config);
  }, [config]);

  const initializePayment = usePaystackPayment(config);
  return (
    <ButtonUI
      htmlType="button"
      className={`!sm:px-10 px-7 ${className ?? ""}`}
      onClickTrigger={() => {
        if (!canMakePayment()) return;
        initializePayment(onSuccess, onClose);
      }}
    >
      {buttonTitle}
    </ButtonUI>
  );
};

export default PaystackPaymentButton;
