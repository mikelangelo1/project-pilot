import { useMemo, useState } from "react";
import ListerBreadNav from "../../components/main/listerBreadNav";
import ListerOverview from "../../components/main/listerOverview";
import Profile from "../../components/main/profile";

import ListerLayout from "../../layouts/listerLayout";
import { listerBreadNavDummy } from "../../lib/common/links";
import { ListerLink } from "../../models/link";

const ListerHome = () => {
  const [links, setActiveLink] = useState<ListerLink[]>(listerBreadNavDummy);
  const [showDate, setShowDate] = useState<boolean>(true);

  const goTo = (selectedLink: string) => {
    if (selectedLink === "/listers/overview") {
      setShowDate(true);
    } else {
      setShowDate(false);
    }
    const allLinks = links.map((link) => {
      if (link.link === selectedLink) return { ...link, active: true };
      return { ...link, active: false };
    });
    setActiveLink(allLinks);
  };

  const currentNav = useMemo(() => {
    const selectedLink = links.find((link) => link.active);
    return selectedLink?.link;
  }, [links]);

  return (
    <div>
      <ListerBreadNav goTo={goTo} links={links} showDate={showDate} />
      {currentNav && currentNav === "/listers/overview" && <ListerOverview />}
      {currentNav && currentNav === "/listers/profile" && <Profile />}
    </div>
  );
};

ListerHome.getLayout = (page: any) => <ListerLayout>{page}</ListerLayout>;
export default ListerHome;
