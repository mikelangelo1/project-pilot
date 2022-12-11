import React, { SetStateAction, Dispatch } from "react";
import { Modal } from "antd";
import { NextPage } from "next";

interface ModalPopUpType {
  // eslint-disable-next-line no-unused-vars
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactChild;
  title: string;
}

const ModalPopUp: NextPage<ModalPopUpType> = ({
  isModalVisible,
  setIsModalVisible,
  title,
  children,
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
      onCancel={handleCancel}
      footer={[]}
    >
      {children}
    </Modal>
  );
};

export default ModalPopUp;
