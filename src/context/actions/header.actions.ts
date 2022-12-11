type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  // eslint-disable-next-line no-unused-vars
  Toggle = "TOGGLE_SHOWN",
}

export type ShownPayload = {
  [Types.Toggle]: {
    value: boolean;
  };
};
export type ShownActions =
  ActionMap<ShownPayload>[keyof ActionMap<ShownPayload>];
