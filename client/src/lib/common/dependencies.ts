import { BooleanType } from "../../models/utilities";

export const mockBooleanOptions: BooleanType[] = [
  {
    name: "Yes",
    value: true,
  },
  {
    name: "No",
    value: false,
  },
];
export const idType: { name: string; key: string; value: number }[] = [
  {
    name: "Drivers License",
    key: "DriversLicence",
    value: 0,
  },
  {
    name: "Voters Card",
    key: "VotersCard",
    value: 1,
  },
  {
    name: "International Passport",
    key: "InternationalPassport",
    value: 2,
  },
  {
    name: "National Identity Card",
    key: "NationalIdentificationNumber",
    value: 3,
  },
  {
    name: "Certificate",
    key: "CertificateOfInc",
    value: 4,
  },
  {
    name: "Others",
    key: "Picture",
    value: 5,
  },
];
