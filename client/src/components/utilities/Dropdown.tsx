/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { NextPage } from "next";
import { Option } from "../../models/utilities";

const DropdownUI: NextPage<{
  menuItem: Option[];
  children: React.ReactChild;
  selectOption: (param: Option) => void;
}> = ({ children, menuItem = [], selectOption }) => {
  const menu = (
    <Menu>
      {menuItem.length &&
        menuItem.map((item) => (
          <Menu.Item key={item.value} onClick={() => selectOption(item)}>
            {item.title}
          </Menu.Item>
        ))}
    </Menu>
  );

  return <Dropdown overlay={menu}>{children}</Dropdown>;
};
export default DropdownUI;
