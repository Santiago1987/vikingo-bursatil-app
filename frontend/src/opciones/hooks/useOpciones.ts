import {
  useOperacionesActions,
  OptionOperations,
  OperacionesPayload,
} from "../../types";

import updatePrimaCant from "../utils/updatePrimaCant";
import addNewLine from "../utils/addNewLine";
import deleteLine from "../utils/deleteLine";
import { useCallback, useReducer } from "react";

const opciones_actionns_type = {
  UPDATE_PRIMA_CANTIDAD: "UPDATE_PRIMA_CANTIDAD",
  ADD_NEW_LINE: "ADD_NEW_LINE",
  DELETE_LINE: "DELETE_LINE",
};

const initial_state: OptionOperations = {};

type state_actions = {
  [x: string]: (
    prevState: OptionOperations,
    payload: OperacionesPayload
  ) => OptionOperations;
};

// FUNCIONES
const UPDATE_STATE_BY_ACTION: state_actions = {
  [opciones_actionns_type.UPDATE_PRIMA_CANTIDAD]: updatePrimaCant,
  [opciones_actionns_type.ADD_NEW_LINE]: addNewLine,
  [opciones_actionns_type.DELETE_LINE]: deleteLine,
};

// REDUCER
const opcionesReducer = (
  state: OptionOperations,
  { type, payload }: useOperacionesActions
) => {
  const updateState = UPDATE_STATE_BY_ACTION[type];
  return updateState ? updateState(state, payload) : state;
};

// HOOK
const useOpciones = () => {
  const [operaciones, setOperaciones] = useReducer(
    opcionesReducer,
    initial_state
  );

  const changePrimaCant = useCallback(
    (
      base: number,
      tipo: "call" | "put",
      name: "cantidad" | "prima",
      value: number,
      id: string
    ) => {
      setOperaciones({
        type: opciones_actionns_type.UPDATE_PRIMA_CANTIDAD,
        payload: { base, tipo, name, value, id },
      });
    },
    []
  );

  const addOperation = useCallback((base: number, tipo: "call" | "put") => {
    setOperaciones({
      type: opciones_actionns_type.ADD_NEW_LINE,
      payload: { base, tipo },
    });
  }, []);

  const deleteOperation = useCallback(
    (base: number, tipo: "call" | "put", id: string) => {
      setOperaciones({
        type: opciones_actionns_type.DELETE_LINE,
        payload: { base, tipo, id },
      });
    },
    []
  );

  return { operaciones, changePrimaCant, addOperation, deleteOperation };
};

export default useOpciones;
