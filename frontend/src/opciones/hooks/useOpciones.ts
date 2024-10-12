import {
  useOperacionesActions,
  OpcionesPrimaCant,
  OptionOperations,
  OperacionesPayload,
  OperacionesPayload2,
} from "../../types";

import updatePrimaCant from "../utils/updatePrimaCant";
import addNewLine from "../utils/addNewLine";
import deleteLine from "../utils/deleteLine";

const opciones_actionns_type = {
  UPDATE_PRIMA_CANTIDAD: " UPDATE_PRIMA_CANTIDAD",
  ADD_NEW_LINE: "ADD_NEW_LINE",
  DELETE_LINE: "DELETE_LINE",
};

const initial_state: OpcionesPrimaCant | undefined = undefined;

type state_actions = {
  [x: string]: (
    prevState: OptionOperations,
    payload: OperacionesPayload2
  ) => OptionOperations;
};

const UPDATE_STATE_BY_ACTION: state_actions = {
  [opciones_actionns_type.ADD_NEW_LINE]: addNewLine,
  [opciones_actionns_type.UPDATE_PRIMA_CANTIDAD]: updatePrimaCant,
  [opciones_actionns_type.DELETE_LINE]: deleteLine,
};

const opcionesReducer = (
  state: OptionOperations,
  { type, payload }: useOperacionesActions
) => {
  const updateState = UPDATE_STATE_BY_ACTION[type];
  return updateState ? updateState(state, payload) : state;
};
