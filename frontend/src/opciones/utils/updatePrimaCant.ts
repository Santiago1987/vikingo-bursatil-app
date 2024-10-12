import { OptionOperations, updatePrimaCantidad } from "../../types";

const updatePrimaCant = (
  prevState: OptionOperations,
  { base, tipo, name, value, id }: updatePrimaCantidad
): OptionOperations => {
  if (!id) return prevState;

  const data = structuredClone(prevState);

  let baseOper = { ...data[base] };
  if (!baseOper) return data;

  let operationidx = baseOper[tipo].findIndex((el) => el.id === id);
  if (operationidx < 0) return data;

  let newOper = { ...baseOper[tipo][operationidx] };

  if (name === "cantidad") newOper.cantidad = value ? +value : 0;
  if (name === "prima") newOper.prima = value ? +value : 0;

  baseOper[tipo][operationidx] = newOper;

  data[base] = { ...baseOper };

  return data;
};

export default updatePrimaCant;
