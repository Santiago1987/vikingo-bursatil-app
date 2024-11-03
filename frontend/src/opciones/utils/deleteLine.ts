import { OptionOperations, deleteOperation } from "../../types";
import { v4 as uuid } from "uuid";

const deleteLine = (
  prevState: OptionOperations,
  { base, tipo, id }: deleteOperation
): OptionOperations => {
  if (!id) return prevState;
  let data = structuredClone(prevState);

  if (!data[base]) return data;

  let operaciones = [...data[base][tipo]];

  let newOper = operaciones.filter((el) => el.id !== id);

  if (newOper.length === 0) newOper.push({ id: uuid(), prima: 0, cantidad: 0 });

  data[base][tipo] = [...newOper];

  return data;
};

export default deleteLine;
