export interface KeyValue {
    key: string;
    value: string
}


export interface Bank {
    name: string;
    code: string;
    active: string
}

export interface City {
    name: string;
}
export interface State {
    name: string;
    cities: City[]
}
export interface Country {
    name: string;
    phone_code: string;
    states: State[]
}


export interface Dependencies {
    bankAccountTypes: KeyValue[];
    banks: Bank[];
    countries: Country[];
    industries: KeyValue[];
    projectScopes: KeyValue[];
    projectTypes: string[]
}
