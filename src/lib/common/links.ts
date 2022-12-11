import { Link, ListerLink } from "../../models/link";

const offsetLinks: Link[] = [
  {
    title: "Dashboard",
    link: "/offsetters",
    active: true,
  },
  {
    title: "Carbon Emissions",
    link: "/offsetters/carbon_emission",
    active: false,
  },
  {
    title: "Marketplace",
    link: "marketplace",
    active: false,
  },
  {
    title: "Account",
    link: "account",
    active: false,
  },
];

const listerLinks: ListerLink[] = [
  {
    title: "Ejiro & Sons",
    link: "/listers",
    type: "link",
    active: true,
    icon: "AlignCenterOutlined",
  },
  {
    title: "Pre-Assessment",
    link: "/listers/pre-assessment",
    type: "link",
    active: false,
    icon: "PercentageOutlined",
  },
  {
    title: "Project",
    link: "project",
    type: "dropdown",
    icon: "DropboxOutlined",
    active: false,
    children: [
      // {
      //   title: "Eko Farma",
      //   link: "jnfo4552",
      //   type: "link",
      //   active: false,
      // },
      // {
      //   title: "I meet Farma",
      //   link: "jnfo453744",
      //   type: "link",
      //   active: false,
      // },
      // {
      //   title: "Wellness Plus",
      //   link: "jnfo4529383",
      //   type: "link",
      //   active: false,
      // },
    ],
  },
  {
    title: "Archives",
    link: "/listers/archives",
    type: "link",
    active: false,
    icon: "SaveOutlined",
  },
];

const listerBreadNavDummy:ListerLink[] = [
  {
    title: "Overview",
    link: "/listers/overview",
    type: "link",
    active: true,
  },
  {
    title: "Profile",
    link: "/listers/profile",
    type: "link",
    active: false,
  },
  {
    title: "Offset Bids",
    link: "/listers/offset_bids",
    type: "link",
    active: false,
  },
];

export { offsetLinks, listerLinks, listerBreadNavDummy };
