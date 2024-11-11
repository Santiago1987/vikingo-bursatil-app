import { OpcionesBymaAPI, PanelLider } from "../../types";

export let opcionesValue: OpcionesBymaAPI[] = [];

export function setOpcionesValues(values: OpcionesBymaAPI[]) {
  opcionesValue = values;
}

export let panelLider: PanelLider[] = [];

export function setPanelLider(values: PanelLider[]) {
  panelLider = values;
}
