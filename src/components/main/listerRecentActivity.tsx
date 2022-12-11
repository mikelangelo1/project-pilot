import { useState } from "react";
import Image from "next/image";
import { Step } from "../../models/utilities";
import Stepper from "../utilities/StepperUI2";
import imageLoader from "../../lib/helperFunctions/loader";

const steps: Step[] = [
  {
    name: "Project 3 have been approved for listing",
    description: "12, March 2020 6:20pm",
    status: "approved",
  },
  {
    name: "Project 2 have been rejected for listing",
    description: "12, March 2020 6:20pm",
    status: "rejected",
  },
  {
    name: "Project 1 have been rejected for listing",
    description: "12, March 2020 6:20pm",
    status: "rejected",
  },
  {
    name: "Project 5 have been approved for listing",
    description: "12, March 2020 6:20pm",
    status: "approved",
  },
  {
    name: "Project 6 have been approved for listing",
    description: "12, March 2020 6:20pm",
    status: "approved",
  },
  {
    name: "Project 7 have been approved for listing",
    description: "12, March 2020 6:20pm",
    status: "approved",
  },
  {
    name: "Project 14 have been approved for listing",
    description: "12, March 2020 6:20pm",
    status: "approved",
  },
  {
    name: "Project 8 have been approved for listing",
    description: "12, March 2020 6:20pm",
    status: "approved",
  },
  {
    name: "Project 9 have been approved for listing",
    description: "12, March 2020 6:20pm",
    status: "approved",
  },
];

const ListerRecentActivity = () => {
  const [showChart] = useState<boolean>(false);

  return (
    <>
      <div className="ml-2 mb-2">
        <h3 className="text-base mb-5">Recent Activity</h3>
      </div>
      {!showChart && (
        <div className="w-[100%] h-[300px] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Image
              priority={true}
              unoptimized={true}
              loader={imageLoader}
              src="/assets/icons/offsetEmpty.svg"
              alt="Icon"
              width={150}
              height={150}
            />
            <p className="opacity-50 text-center">
              No activity has been carried out on this Project
            </p>
          </div>
        </div>
      )}
      {showChart && (
        <div className="overflow-scroll px-1 pl-3 h-[360px]">
          <Stepper steps={steps} />
        </div>
      )}
    </>
  );
};

export default ListerRecentActivity;
