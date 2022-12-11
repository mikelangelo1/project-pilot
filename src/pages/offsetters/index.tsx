// import { useRouter } from "next/router";
// import { useId, useState } from "react";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OffseterLayout from "../../layouts/offsetterLayout";

const OffsetterHome = () => {
  const [home, setHome] = useState("Here is your offsetter compoent");
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setHome("Just Changed the component, YEA!!!");
    }, 2000);
  }, []);

  return (
    <div className="mt-10">
      {home}
      <button type="button" onClick={() => push("offsetters/carbon_emission")}>
        Go to pre-assesment
      </button>
    </div>
  );
};
OffsetterHome.getLayout = (page: any) => <OffseterLayout>{page}</OffseterLayout>;
export default OffsetterHome;
