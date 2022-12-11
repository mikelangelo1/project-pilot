import { Divider } from "antd";
import Image from "next/image";
import { Step } from "../../models/utilities";
import imageLoader from "../../lib/helperFunctions/loader";

interface StepperProp {
  steps: Step[];
}

export default ({ steps = [] }: StepperProp) => (
  <div>
    {steps.length &&
      steps.map((step, index) => (
        <div key={step.name} className="flex items-start ">
          <Divider
            className={`${
              index === steps.length - 1 && "opacity-0"
            } -mr-5  bg-primary-high h-[70px] opacity-20`}
            type="vertical"
          />
          {step.status && step.status === "approved" && (
            <Image
              unoptimized={true}
              loader={imageLoader}
              src="/assets/icons/approved.svg"
              height={40}
              width={40}
              alt="approved"
            />
          )}
          {step.status && step.status === "rejected" && (
            <Image
              unoptimized={true}
              loader={imageLoader}
              src="/assets/icons/rejected.svg"
              height={40}
              width={40}
              alt="approved"
            />
          )}
          <div className="flex ml-3 flex-col">
            <h4 className="">{step.name}</h4>
            <p className="opacity-70 text-xs">{step.description}</p>
          </div>
        </div>
      ))}
  </div>
);
