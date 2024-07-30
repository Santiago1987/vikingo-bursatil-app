export interface OpcionesContrato {
  call_c: OpcionesPrimaCant[];
  call_v: OpcionesPrimaCant[];
  put_c: OpcionesPrimaCant[];
  put_v: OpcionesPrimaCant[];
}

export type OpcionesPrimaCant = {
  cantidad: number;
  prima: number;
};

export interface OptionOperations {
  [key: number]: OpcionesContrato;
}
