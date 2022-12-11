// import { useRouter } from "next/router";
// import { useId, useState } from "react";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OffseterLayout from "../../../layouts/offsetterLayout";

const CarbonEmission = () => {
  const [home, setHome] = useState("Here is your pre-assessment component");
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setHome("Just Changed the component, YEA!!!");
    }, 2000);
  }, []);

  return (
    <div>
      {home}

      <button type="button" onClick={() => push("/offsetters")}>
        Go to Back to Offsetters
      </button>
    </div>
  );
};
CarbonEmission.getLayout = (page: any) => <OffseterLayout>{page}</OffseterLayout>;
export default CarbonEmission;
