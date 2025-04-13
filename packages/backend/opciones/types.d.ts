export interface Options {
  id: string;
  quantity: number;
  price: number;
}

export interface OptionsTypes {
  call: Options[];
  put: Options[];
}

export interface OptionsOperations {
  [key: number]: OptionsTypes;
}

export interface coordinates {
  [key: number]: {
    call: number;
    put: number;
    total: number;
  };
}

export interface AccumulatedValues {
  callPrimaTotal: number;
  putPrimaTotal: number;
  totalPrima: number;
  basesQty: {
    [key: number]: {
      callQuantityTotal: number;
      putQuantityTotal: number;
    };
  };
}

export interface OptionDB {
  ticket: string;
  expiration: string;
  operations: {
    base: number;
    type: string;
    quantity: number;
    prima: number;
  }[];
}
