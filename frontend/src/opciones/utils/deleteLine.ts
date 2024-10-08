import { OptionOperations } from "../../types";

type payload = {
  base: number;
  tipo: "call" | "put";
  id: string;
};

const deleteLine = (
  prevState: OptionOperations,
  { base, tipo, id }: payload
): OptionOperations => {
  let data = structuredClone(prevState);

  if (!data[base]) return data;

  let operaciones = [...data[base][tipo]];

  let newOper = operaciones.filter((el) => el.id !== id);

  data[base][tipo] = [...newOper];

  return data;
};


export default deleteLine