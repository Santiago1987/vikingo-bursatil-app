import { OptionOperations, addNewOperation } from "../../types";
import { v4 as uuid } from "uuid";

const addNewLine = (
  prevState: OptionOperations,
  { base, tipo }: addNewOperation
): OptionOperations => {
  const data = structuredClone(prevState);

  if (!data[base]) return data;

  data[base][tipo].push({ id: uuid(), prima: 0, cantidad: 0 });

  return data;
};

export default addNewLine;
