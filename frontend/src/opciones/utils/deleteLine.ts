import { OptionOperations, deleteOperation } from "../../types";

const deleteLine = (
  prevState: OptionOperations,
  { base, tipo, id }: deleteOperation
): OptionOperations => {
  if (!id) return prevState;
  let data = structuredClone(prevState);

  if (!data[base]) return data;

  let operaciones = [...data[base][tipo]];

  let newOper = operaciones.filter((el) => el.id !== id);

  data[base][tipo] = [...newOper];

  return data;
};

export default deleteLine;
