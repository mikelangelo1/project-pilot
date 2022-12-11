import React, { SetStateAction, Dispatch, useRef } from "react";
import { Button, Modal } from "antd";
import { NextPage } from "next";
import ReactToPdf from "react-to-pdf";
import { Excel } from "antd-table-saveas-excel";

interface ModalPopUpType {
  // eslint-disable-next-line no-unused-vars
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactChild;
  title: string;
  dataSource: any;
  columns: any;
}

const ModalPopUp4: NextPage<ModalPopUpType> = ({
  isModalVisible,
  setIsModalVisible,
  title,
  children,
  dataSource,
  columns,
  //   elementCtrl,
}) => {
  //   const showModal = () => {
  //     setIsModalVisible(true);
  //   };

  const printDiv = useRef<HTMLDivElement>(null);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs(`${title.split(" ").join("")}${Date.now().toString()}.xlsx`);
  };

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      closable={false}
      keyboard={false}
      footer={[
        <Button className="rounded" key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <ReactToPdf
          key="downloadPdf"
          targetRef={printDiv}
          filename={`${title.split(" ").join("")}${Date.now().toString()}.pdf`}
        >
          {({ toPdf }) => (
            <Button className="bg-tertiary-high text-secondary-high rounded" key="printPDF" onClick={toPdf}>
              Export(Pdf)
            </Button>
          )}
        </ReactToPdf>,
        <Button className="bg-tertiary-high text-secondary-high rounded" key="printXSLX" onClick={handleExcel}>
          Export(Excel)
        </Button>,
      ]}
    >
      <div ref={printDiv}>{children}</div>
    </Modal>
  );
};

export default ModalPopUp4;
