export interface ListerBoard {
  title: string;
  value: number;
  subValue: number;
  direction: "up" | "down";
}

export interface BankInfo {
  BankCountryName: string;
  BankName: string;
  BankAccountType: string;
  AccountNumber: string;
  AccountName: string;
}

export interface ProfileInfo {
  overview: {
    header: string;
    subheader: string;
    summary: string;
  };
  about: {
    header: string;
    summary: string;
    list: string[];
    pictures: string[];
  };
  target: {
    header: string;
    summary: string[];
  };
  extra: {
    header: string;
    summary: string[];
  };
}

export interface BusinessInfo {
  BusinessName: string;
  BusinessAddress: string;
  BusinessEmail: string;
  description: string;
  Website: string;
  Industry: string;
  Summary: string;
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  website: string;
  industry: string;
  summary: string;
  profilePicture: {
    name: string;
    url: string;
  };
}

export interface BusinessRepInfo {
  ProjectScope: string;
  IsBusinessOwner: boolean;
  OwnMoreThanTwentyFivePercent: boolean;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Country: string;
  State: string;
  City: string;
  StreetAddress: string;
  IdentityCardType: string;
  Password: string;
  ConfirmPassword: string;
}
export interface Profile {
  bankInformation: BankInfo;
  company: BusinessInfo;
}
export interface Permission {
  key: string;
  value: string;
}
export interface Role {
  name: string;
  id: number;
  description: string;
  permissions: Permission[];
}
export interface UserPayload {
  type: "listers" | "offsetters";
  jwToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  isVerified: boolean;
  email: string;
}

export interface Lister extends BusinessInfo, BusinessRepInfo, BankInfo {
  IdentityCard: File;
}

export interface ListerUser extends UserPayload {
  profile: Profile;
  summary: string;
  businessName: string;
  userType: number;
  roles: Role;
}

interface Picture {
  idType: number;
  name: string;
  path: string;
  url: string;
}

export interface ListerProject {
  ProjectType: string;
  ProjectName: string;
  ProjectDescription: string;
  CO2Tonnes: number;
  ProjectPicture: File[];
  ExternalLinks: string[];
  Tags: string[];
  IsDraft: boolean;
  name: string;
  approved: boolean;
  archived: boolean;
  cO2Tonnes: number;
  description: [{ details: string }];
  externalLink: { name: string };
  drafted: false;
  lister: null;
  listerId: 5;
  pictures: Picture[];
  projectId: number;
  projectType: string;
  tags: { name: string | null }[];
}
