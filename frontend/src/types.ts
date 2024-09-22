export interface OpcionesContrato {
  call: OpcionesPrimaCant[];
  put: OpcionesPrimaCant[];
}

export type OpcionesPrimaCant = {
  cantidad: number;
  prima: number;
};

export interface OptionOperations {
  [key: number]: OpcionesContrato;
}

/*--------------------------------*/

export interface OptionCantAcum {
  [key: number]: number;
}

export interface OptionResult {
  base: number;
  callTotal: number;
  putTotal: number;
  total: number;
}
