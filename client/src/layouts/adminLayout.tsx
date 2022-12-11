import React, { useState } from "react";
import Header from "../components/main/header";
import SideNav from "../components/main/sideNav";
// import { useHeader } from "../context/headerCtx";

const OffseterLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  return (
    <div className="layout">
      <Header type="offset" toggleSideNav={setIsSideNavOpen} isSideNavOpen={isSideNavOpen} />

      <div
        className={` sm:hidden fixed ${
          isSideNavOpen ? "-translate-x-96" : "translate-x-0"
        } transition-all duration-200  z-10 `}
      >
        <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} type="offsetter" />
      </div>

      <div style={{ width: "100%", height: "100%" }} className="pt-[6vh]">
        {children}
      </div>
    </div>
  );
};

export default OffseterLayout;
