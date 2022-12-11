// import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlignLeftOutlined,
  BellOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { NextPage } from "next";
import { Avatar, Badge } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import imageLoader from "../../lib/helperFunctions/loader";
import OffsetMenu from "./offsetMenuList";
import DropdownUI from "../utilities/Dropdown";
import { Option } from "../../models/utilities";
import { useUser } from "../../context/userCtx";
import { Types } from "../../context/actions/user.actions";
import { removeUserToken } from "../../lib/helperFunctions/tokenValidation";
// import headerLinks from "../../lib/common/links";
const menu: Option[] = [
  { title: "Profile", value: "profile" },
  { title: "Logout", value: "logout" },
];

const Header: NextPage<any> = ({ toggleSideNav, isSideNavOpen, type }) => {
  const { state: UserState, dispatch } = useUser();
  const { push } = useRouter();
  const [avatarLink, setAvatarLink] = useState<string | undefined>(undefined);

  const onClickAvatar = (opt: Option) => {
    if (opt.value === "logout") {
      push("/login");
      dispatch({ type: Types.SetUser, payload: { value: null } });
      removeUserToken();
    }
    if (opt.value === "profile") {
      push("/listers/profile");
    }
  };

  useEffect(() => {
    if (UserState) {
      setAvatarLink(
        UserState.userPayload?.profile?.company?.profilePicture?.url
      );
    }
  }, [UserState]);

  return (
    <header className="fixed w-[100vw] z-50 bg-tertiary-high sm:px-8 p-1 px-3 flex justify-between items-center text-secondary-mid">
      {toggleSideNav && (
        <AlignLeftOutlined
          onClick={() => toggleSideNav(!isSideNavOpen)}
          className="sm:hidden text-xl"
        />
      )}
      <h2 className="-mb-1">
        <Link href="/">
          <a>
            <Image
              priority={true}
              unoptimized={true}
              loader={imageLoader}
              src="/assets/icons/logo_white.svg"
              alt="Icon"
              width={160}
              height={60}
            />
          </a>
        </Link>
      </h2>
      {type === "entry" && (
        <button
          className="bg-secondary-low px-3 py-2 rounded text-[10px] sm:text-sm"
          type="button"
        >
          Try Our Carbon Calculator
        </button>
      )}
      {type === "offset" && (
        <OffsetMenu
          className="hidden sm:flex sm:text-xs"
          onActiveClass="bg-secondary-low"
          align="flex"
        />
      )}
      {(type === "list" || type === "offset") && (
        <nav className="flex sm:gap-x-8 gap-x-4 items-center text-lg">
          <p id="search">
            <SearchOutlined />
          </p>
          <p id="notification">
            <Badge
              size="small"
              offset={[-2, 5]}
              className="!-mb-5 !text-xs"
              count={5}
              overflowCount={99}
            >
              <BellOutlined className="text-xl text-secondary-high" />
            </Badge>
          </p>
          <p>
            {avatarLink && (
              <DropdownUI menuItem={menu} selectOption={onClickAvatar}>
                <Avatar
                  size={28}
                  className="!bg-transparent border border-secondary-high -mb-1"
                  src={(
                    <Image
                      priority={true}
                      unoptimized={true}
                      alt="User Avatar"
                      loader={imageLoader}
                      width={40}
                      height={40}
                      src={`${avatarLink}`}
                    />
                  )}
                  icon={<UserOutlined />}
                />
              </DropdownUI>
            )}
            {!avatarLink && (
              <DropdownUI menuItem={menu} selectOption={onClickAvatar}>
                <Avatar
                  size={28}
                  className="!bg-transparent border border-secondary-high -mb-1"
                  icon={<UserOutlined />}
                />
              </DropdownUI>
            )}
          </p>
        </nav>
      )}
    </header>
  );
};

export default Header;
