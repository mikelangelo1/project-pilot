import { Step } from "../../models/utilities";

export default (): Step[] => [
  {
    name: "Bank Information",
    description: "Please provide your account information",
  },
  {
    name: "Business Information",
    description: "A few details about your company",
  },
  {
    name: "Business Representative Documentation",
    description: "Onboard management from your team",
  },
];
