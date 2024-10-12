export interface OpcionesContrato {
  call: OpcionesPrimaCant[];
  put: OpcionesPrimaCant[];
}

export type OpcionesPrimaCant = {
  id: string;
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

//-----------------------------------------
export type OperacionesPayload = {
  base: number;
  tipo: "call" | "put";
  name?: "cantidad" | "prima";
  value?: number;
  id?: string;
};

export interface useOperacionesActions {
  type: string;
  payload: OperacionesPayload;
}

export interface deleteOperation {
  base: number;
  tipo: "call" | "put";
  id?: string;
}

export interface updatePrimaCantidad {
  base: number;
  tipo: "call" | "put";
  name?: "cantidad" | "prima";
  value?: number;
  id?: string;
}

export interface addNewOperation {
  base: number;
  tipo: "call" | "put";
}
