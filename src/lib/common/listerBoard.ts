import { ListerBoard, ProfileInfo } from "../../models/listers";

const listerDummy: ListerBoard[] = [
  {
    title: "Total Views",
    value: 2003030,
    subValue: 40,
    direction: "up",
  },
  {
    title: "Project 1",
    value: 2003030,
    subValue: 40,
    direction: "down",
  },
  {
    title: "Project 2",
    value: 3003030,
    subValue: 40,
    direction: "up",
  },
  {
    title: "Project 3",
    value: 13030,
    subValue: 40,
    direction: "up",
  },
];
const dummyProfileInfo: ProfileInfo = {
  overview: {
    header: "Company Overview",
    subheader: "An overview of the project, goals and outcomes",
    summary:
      "lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur",
  },
  about: {
    header: "About the company",
    summary: `lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur lorem ipsum dolor amet conecticur`,
    list: [
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
      `Natalie loves older men`,
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor`,
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
    ],
    pictures: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740",
    ],
  },
  target: {
    header: "Target Audience",
    summary: [
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
    ],
  },
  extra: {
    header: "What does success look like?",
    summary: [
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
      `lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur lorem ipsum dolor conecticur`,
    ],
  },
};

export { listerDummy, dummyProfileInfo };
