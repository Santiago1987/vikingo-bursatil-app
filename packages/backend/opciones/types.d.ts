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
  [key: number]: {
    callPrimaTotal: number;
    putPrimaTotal: number;
    totalPrima: number;
    callQuantityTotal: number;
    putQuantityTotal: number;
    totalQuantity: number;
  };
}
