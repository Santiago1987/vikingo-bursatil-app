import { OptionOperations } from "../../types";

type payload = {
  base: number;
  tipo: "call" | "put";
  name: string;
  value: number;
  id: string;
};

const updatePrimaCant = (
  prevState: OptionOperations,
  { base, tipo, name, value, id }: payload
): OptionOperations => {
  const data = structuredClone(prevState);

  let baseOper = { ...data[base] };
  if (!baseOper) return data;

  let operationidx = baseOper[tipo].findIndex((el) => el.id === id);
  if (operationidx < 0) return data;

  let newOper = { ...baseOper[tipo][operationidx] };

  if (name === "cantidad") newOper.cantidad = +value;
  if (name === "prima") newOper.prima = +value;

  baseOper[tipo][operationidx] = newOper;

  data[base] = { ...baseOper };

  return data;
};

export default updatePrimaCant;
