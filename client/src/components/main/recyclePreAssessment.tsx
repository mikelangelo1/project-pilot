/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Divider, Form, InputNumber, Table } from "antd";
import { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "../../context/loadingCtx";
import { CalculateRecyclableUrl } from "../../lib/common/endpoints";
import PreAssessmentDataSourceGen, {
  PreAssDataSource,
  PreAssessmentColumn,
} from "../../lib/common/preAssessmentDataSourceGen";
import { postApi } from "../../lib/helperFunctions/fetcher";
import { PaystackConfig } from "../../models/utilities";
// import Link from "next/link";
import ButtonUI from "../utilities/ButtonUI";
import ModalPopUp4 from "../utilities/modal4";
import PaystackPaymentButton from "./paystackPayment";

interface RecyclePreAssessmentPropType {
  // eslint-disable-next-line no-unused-vars
  intiateTrans: PaystackConfig;
  paymentButton: string;
}

const RecyclePreAssessment: NextPage<RecyclePreAssessmentPropType> = ({
  intiateTrans,
  paymentButton,
}) => {
  const [formValues, setFormValues] = useState<any>({});
  const { setLoadingStatus } = useLoading();
  const [dataSource, setDataSource] = useState<PreAssDataSource[] | undefined>(
    undefined
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onClose = () => {
    console.warn("Clossed");
  };

  const fetchResult = (values: any) => {
    setLoadingStatus(true);
    postApi(CalculateRecyclableUrl, values)
      .then((res) => {
        if (!res.successful) return;
        toast.success(res.message);
        const data = PreAssessmentDataSourceGen(
          values,
          "recyclableMaterials",
          res.data
        );
        setDataSource(data);
        setIsModalVisible(true);
      })
      .finally(() => setLoadingStatus(false));
  };

  const canMakePayment = (): boolean => {
    if (!Object.keys(formValues).length) {
      toast.error("One or more field(s) is required");
      return false;
    }
    return true;
  };

  const onSuccess = (ref: any) => {
    const vals = Object.keys(formValues).reduce((acc, curr) => {
      if (formValues[curr]) {
        return { ...acc, [curr]: formValues[curr] };
      }
      return acc;
    }, {});
    fetchResult({ ...vals, referenceId: ref.reference });
  };

  return (
    <>
      <ModalPopUp4
        dataSource={dataSource}
        columns={PreAssessmentColumn}
        title="Recyclable Material"
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      >
        <Table
          pagination={false}
          rowClassName={(record) =>
            record.name === "Total" ? "font-header font-semibold" : ""
          }
          dataSource={dataSource}
          columns={PreAssessmentColumn}
        />
      </ModalPopUp4>

      <Divider type="horizontal" />
      <Form
        name="basic"
        layout="vertical"
        onValuesChange={(_, values) => setFormValues(values)}
        autoComplete="off"
      >
        <div className="flex justify-between flex-wrap">
          <Form.Item className="w-[250px]" label="Books (kg)" name="books">
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Cardboards (kg)"
            name="cardboards"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Magazines (kg)"
            name="magazines"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Mixed Paper (kg)"
            name="mixedPaper"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Newspapers (kg)"
            name="newspapers"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Plastics Pets (kg)"
            name="plasticsPets"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Plastics HDPE (kg)"
            name="plasticsHDPE"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Plastics LDPE (kg)"
            name="plasticsLDE"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="LDPE &amp; CLDPE (kg)"
            name="ldpeCldpe"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Plastics PVC (kg)"
            name="plasticsPVC"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Metal Scraps (kg)"
            name="metalScraps"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Metal Mixed Cans (kg)"
            name="metalMixedCans"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Electromagnetic Waste (kg)"
            name="electromagneticWaste"
            className="w-[250px]"
          >
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item label="Glass (kg)" name="glass" className="w-[250px]">
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item label="Mixed Recycling" name="mixedRecycling" className="w-[250px]">
            <InputNumber
              className="w-[100%]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </div>
        <Form.Item className="mt-10 text-right gap-x-8">
          {dataSource && dataSource.length && (
            <ButtonUI
              onClickTrigger={() => setIsModalVisible(true)}
              disabled={false}
              htmlType="button"
              className="!sm:px-10 px-10 border border-primary-mid !text-primary-high !bg-secondary-high mr-2 "
            >
              View recent calculation
            </ButtonUI>
          )}
          <PaystackPaymentButton
            config={intiateTrans}
            buttonTitle={paymentButton}
            canMakePayment={canMakePayment}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default RecyclePreAssessment;
