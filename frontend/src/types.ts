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
export type useOperacionesActions =
  | {
      type: "UPDATE_PRIMA_CANTIDAD";
      payload: {
        base: number;
        tipo: "call" | "put";
        name: string;
        value: number;
        id: string;
      };
    }
  | {
      type: "ADD_NEW_LINE";
      payload: {
        base: number;
        tipo: "call" | "put";
      };
    }
  | {
      type: "DELETE_LINE";
      payload: {
        base: number;
        tipo: "call" | "put";
        id: string;
      };
    };

export type OperacionesPayload = Pick<useOperacionesActions, "payload">;

export type OperacionesPayload2 =
  | {
      base: number;
      tipo: "call" | "put";
      name: string;
      value: number;
      id: string;
    }
  | {
      base: number;
      tipo: "call" | "put";
    }
  | {
      base: number;
      tipo: "call" | "put";
      id: string;
    };
