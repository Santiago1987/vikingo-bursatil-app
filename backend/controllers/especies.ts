import Especie from "../models/especies";
import { especieData } from "../../Types/backend/excel";
import { Especie as typEspec } from "../../Types/backend/types";

type hitoric = Omit<typEspec, "name" | "especie">[] | undefined;

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
    if (!isSaved) throw new Error("La especie no existe: " + especie);
    // el addToSet se asegura que no haya valores duplocados, como un SET
    let result = await Especie.updateOne(
      { especie },
      { $addToSet: { cotizaciones: { $each: valueArr } } }
    );
    return result;
  } catch (err) {
    throw new Error("Error al guardar: " + err);
  }
};

// obtener toda la cotizacion historica de una determinada espexie
export const getEspecieHistorico = async (especie: string) => {
  try {
    if (!especie) throw new Error("especie no puede ser vacio");
    let result = (await Especie.find({ especie }).select(
      "cotizaciones"
    )) as unknown as hitoric;
    return result;
  } catch (err) {
    throw new Error("Error al buscar info: " + err);
  }
};

//Utima fecha registrada
export const getLastDateRegistered = async (
  especie: string
): Promise<Date | undefined> => {
  try {
    let res = await getEspecieHistorico(especie);
    if (!res) return;
    let { cotizaciones } = res[0];
    if (cotizaciones.length > 0) {
      if (!cotizaciones[0]) return;
      let { fecha } = cotizaciones[0];
      return fecha;
    }
    return;
  } catch (err) {
    return;
  }
};
