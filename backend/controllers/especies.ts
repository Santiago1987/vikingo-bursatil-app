import Especie from "../models/especies";
import { especieData } from "../../Types/backend/excel";

//guardar especie y nombre (header)
export const saveEspecieExcel = async (especie: string, name: string) => {
  try {
    if (!especie) throw new Error("especie no puede ser vacio");
    let isSaved = await Especie.findOne({ especie });
    //console.log("isSaved", isSaved);
    if (isSaved) throw new Error("La especie ya esta guardada");
    const especieData = new Especie({ especie, name });

    let result = await especieData.save();

    return result;
  } catch (err) {
    throw new Error("Error al guardar: " + err);
  }
};

// guardar dato de la especie
export const saveEspecieValue = async (
  especie: string,
  valueArr: especieData[]
) => {
  try {
    if (valueArr.length < 1) throw new Error("values parameter required");
    let isSaved = await Especie.findOne({ especie });
    if (!isSaved) throw new Error("La especie no existe");
    // el addToSet se asegura que no haya valores duplocados, como un SET
    let result = await Especie.updateOne(
      { especie },
      { $addToSet: { cotizacionnes: { $each: valueArr } } }
    );
    return result;
  } catch (err) {
    throw new Error("Error al guardar: " + err);
  }
};
