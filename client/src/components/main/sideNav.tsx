/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-closing-tag-location */
// import Link from "next/link";

import { NextPage } from "next";
// import { Avatar, Badge } from "antd";
import ListerMenu from "./listerMenu";
import OffsetMenu from "./offsetMenuList";

// import imageLoader from "../../lib/helperFunctions/loader";
// import headerLinks from "../../lib/common/links";

const SideNav: NextPage<any> = ({ isSideNavOpen, setIsSideNavOpen, type }) => (
  <>
    <div
      onClick={() => setIsSideNavOpen(true)}
      className={`w-[100vw] h-[100vh] ${
        !isSideNavOpen ? "opactity-100" : "opacity-0"
      } sm:hidden fixed bg-bg_overlay`}
    ></div>
    {type === "lister" && <ListerMenu />}
    {type === "offsetter" && (
      <OffsetMenu
        className="text-md fixed flex flex-col gap-y-6 w-[220px] bg-secondary-high h-[100vh] top-0 left-0 pt-[15vh] px-[10px]"
        onActiveClass="bg-primary-lower"
        align="block"
      />
    )}
  </>
);

export default SideNav;
