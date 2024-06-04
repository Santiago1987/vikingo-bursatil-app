import XLSX from "xlsx";
import { especieData } from "../../../Types/backend/excel";
import { saveEspecieExcel, saveEspecieValue } from "../../controllers/especies";

export const getDataFromFile = async () => {
  try {
    let workbook = XLSX.readFile(
      "I:/Proyectos/vikingo-bursatil-app/backend/public/data.xlsx"
    );
    let woorksheet = workbook.Sheets[workbook.SheetNames[4]];

    let totalLine = 1;

    while (woorksheet[`A${totalLine}`]) {
      totalLine++;
    }

    let result: especieData[] = [];

    let especie = "AMD";
    let name = "Advance Micro Devices";
    let letra = "DK";
    try {
      await saveEspecieExcel(especie, name);
    } catch (err) {
      console.log("Error: ", err);
      //return new Error("Error al leer datos de excel: " + err);
    }

    for (let index = 2; index < totalLine; index++) {
      let date = woorksheet[`A${index}`]?.w as string;

      if (index !== 1) {
        let val = woorksheet[`${letra}${index}`]?.v;

        let value = val ? parseFloat(val) : -1;

        let dat = date.split("/");
        let fecha = new Date(`${dat[2]}-${dat[1]}-${dat[0]}`);
        result.push({
          value,
          fecha,
        });
      }
    }
    //console.log(result);
    let res = await saveEspecieValue(especie, result);
    return res;
  } catch (err) {
    console.log("Error: ", err);
    return new Error("Error al leer datos de excel: " + err);
  }
};
