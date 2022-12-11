import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { offsetLinks } from "../../lib/common/links";
import { Link } from "../../models/link";
// import headerLinks from "../../lib/common/links";

const OffsetMenu: NextPage<{
  align: "flex" | "block";
  className?: string;
  onActiveClass: string;
}> = ({ align, className, onActiveClass }) => {
  const [menuList, setMenuList] = useState<Link[]>(offsetLinks);
  const { push } = useRouter();
  const goTo = (selectedMenu: Link) => {
    const menus = menuList.map((menu) => {
      if (menu.link === selectedMenu.link) {
        menu.active = true;
        return menu;
      }
      menu.active = false;
      return menu;
    });
    setMenuList(menus);
    push(selectedMenu.link);
  };
  return (
    <nav
      className={`${align === "flex" && "flex items-center"} ${
        className ?? ""
      } gap-3`}
    >
      {menuList &&
        menuList.length &&
        menuList.map((menu) => (
          <button
            key={menu.link}
            onClick={() => goTo(menu)}
            className={`${
              menu.active && onActiveClass
            } px-3 py-2 rounded text-[10px] lg:text-sm`}
            type="button"
          >
            {menu.title}
          </button>
        ))}
    </nav>
  );
};
export default OffsetMenu;
