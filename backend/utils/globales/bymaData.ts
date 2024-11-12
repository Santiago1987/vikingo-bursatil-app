import { OpcionesBymaAPI, PanelLider } from "../../types";

export let opcionesValue: OpcionesBymaAPI | undefined = undefined;

export function setOpcionesValues(values: OpcionesBymaAPI) {
  opcionesValue = values;
}

export let panelLider: PanelLider | undefined = undefined;

export function setPanelLider(values: PanelLider) {
  panelLider = values;
}
