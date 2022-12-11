/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction } from "react";
import { DownCircleOutlined } from "@ant-design/icons";

import { Select } from "antd";
import { NextPage } from "next";
import { Option as OptionType } from "../../models/utilities";

const { Option } = Select;

const SelectUI: NextPage<{
  menuItem: OptionType[];
  selected: string | null;
  width?: string;
  bg?: string;
  textSize?: string;
  selectOption: Dispatch<SetStateAction<null | string>>;
}> = ({ menuItem = [], selectOption, selected, width, bg, textSize }) => (
  <Select
    className={`${width ?? "w-[120px]"} ${
      textSize ?? "text-xs"
    }  rounded-lg`}
    defaultValue={selected}
    onSelect={selectOption}
  >
    {menuItem.length &&
      menuItem.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.title}
        </Option>
      ))}
  </Select>
);

export default SelectUI;
