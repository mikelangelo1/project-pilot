export interface Link {
  title: string;
  link: string;
  active: boolean;
}

export interface ListerLink extends Link {
  children?: ListerLink[];
  type: "link" | "popup" | "dropdown" | "default";
  icon?: string;
}
