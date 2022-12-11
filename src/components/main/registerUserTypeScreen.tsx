/* eslint-disable no-unused-vars */
import { NextPage } from "next";
import { useState } from "react";
import { Option } from "../../models/utilities";
import { UserType } from "../../models/user";
import OptionsUI from "../utilities/OptionsUI";

// import icons needed for the logic

interface RegisterUserTypePropType {
  // eslint-disable-next-line no-unused-vars
  onSelect: (param: Option) => void;
  header: string;
  subHeader: string;
  options: Option[];
  selected: Option | null
}

const RegisterUserTypeScreen: NextPage<RegisterUserTypePropType> = ({
  onSelect,
  header,
  subHeader,
  options,
  selected,
}) => (
  <div className="flex flex-col items-center">
    <h2 className="text-xl sm:text-2xl font-header font-normal">{header}</h2>
    <p className="font-light mb-10 text-center">{subHeader}</p>
    <div>
      <OptionsUI selected={selected} options={options} select={onSelect} />
    </div>
  </div>
);
export default RegisterUserTypeScreen;
