// import { useRouter } from "next/router";
// import { useId, useState } from "react";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ListerProfileDetails from "../../../components/main/listerProfileDetails";
import UpdatePassword from "../../../components/main/updatePassword";
import ListerLayout from "../../../layouts/listerLayout";
import { UpdateListerCompanyUrl, UpdatePasswordUrl } from "../../../lib/common/endpoints";

const { TabPane } = Tabs;

const ListerProfile = () => {
  const callback = (key: string) => {
    console.log(key);
  };


  return (
    <div className="mx-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">My Profile</h2>
      </div>
      <div>
        <Tabs className="boxProps mb-4 px-6 py-2" defaultActiveKey="1" onChange={callback}>
          <TabPane tab="My Details" key="1">
            <ListerProfileDetails updateProfileLink={UpdateListerCompanyUrl} />
          </TabPane>
          <TabPane tab="Password" key="2">
            <UpdatePassword updatePasswordLink={UpdatePasswordUrl} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
ListerProfile.getLayout = (page: any) => <ListerLayout>{page}</ListerLayout>;
export default ListerProfile;
