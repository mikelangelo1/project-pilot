// import { useRouter } from "next/router";
// import { useId, useState } from "react";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Tabs } from "antd";
import ButtonUI from "../../../components/utilities/ButtonUI";
import ListerLayout from "../../../layouts/listerLayout";
import ProjectEntry from "../../../components/main/projectEntry";
import Projects from "../../../components/main/projects";

const { TabPane } = Tabs;

const Archives = () => {
  const callback = (key: string) => {
    console.log(key);
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <>
      <ProjectEntry
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />

      <div className="mx-4 my-6 mt-10">
        <div className="flex justify-between items-center my-6">
          <h2 className="text-xl">Archives</h2>
          <ButtonUI
            onClickTrigger={() => setIsModalVisible(true)}
            className="h-[33px]"
            htmlType="button"
          >
            Add New Project
          </ButtonUI>
        </div>

        <div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Completed" key="1">
              <Projects status="active" />
            </TabPane>
            <TabPane tab="Pending" key="2">
              <Projects status="pending" />
            </TabPane>
            <TabPane tab="Rejected" key="3">
              <Projects status="rejected" />
            </TabPane>
            <TabPane tab="Drafts" key="4">
              <Projects status="draft" />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
Archives.getLayout = (page: any) => <ListerLayout>{page}</ListerLayout>;
export default Archives;
