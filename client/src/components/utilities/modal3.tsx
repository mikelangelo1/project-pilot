import React, { SetStateAction, Dispatch } from "react";
import { Modal } from "antd";
import { NextPage } from "next";

interface ModalPopUpType {
  // eslint-disable-next-line no-unused-vars
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactChild;
  handleOk: () => void;
  title: string;
  okText: string;
}

const ModalPopUp3: NextPage<ModalPopUpType> = ({
  isModalVisible,
  setIsModalVisible,
  title,
  handleOk,
  children,
  okText,
  //   elementCtrl,
}) => {
  //   const showModal = () => {
  //     setIsModalVisible(true);
  //   };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      okButtonProps={{
        className:
          "opacity-70 border-none focus:bg-success bg-success text-secondary-high hover:bg-success hover:text-secondary-high hover:opacity-100",
      }}
      cancelButtonProps={{
        className:
          "opacity-70 hover:text-primary-high hover:border-primary-low  hover:opacity-100",
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalPopUp3;
