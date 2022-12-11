import { Option } from "../../models/utilities";

export const typeHeader = "What would you like to do ?";
export const typeSubHeader =
  "Share your intent with us for a more customized experience";
export const userTypes: Option[] = [
  {
    title: "List Green Projects",
    description: "Create an account to list your green projects",
    value: "list",
    icon: "bulboutlined",
  },
  {
    title: "Calculate & Offset my Personal Emissions",
    description: "Create an account to calculate and offset your personal footprint",
    value: "offset_personal",
    icon: "pluscircleoutlined",
  },
  {
    title: "Calculate & Offset my Organization Emissions",
    description: "Create an account to calculate and offset your organisation footprint",
    value: "offset_company",
    icon: "pluscircleoutlined",
  },
];
export const offsetTypes: Option[] = [
  {
    title: "Calculate & Offset my Personal Emissions",
    description: "Calculate and offset your carbon footprint",
    value: "personal",
    icon: "pluscircleoutlined",
  },
  {
    title: `Calculate & Offset my Organization Emissions`,
    description: "Calculate and offset your carbon footprint",
    value: "organisation",
    icon: "pluscircleoutlined",
  },
];
