import XLSX from "xlsx";
import { especieData } from "../../types";
import {
  saveEspecieValue,
  saveEspecieExcel,
  getLastDateRegistered,
} from "../../controllers/especies";

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

    let indexList: string[] = getIndexList();

    for (let n = 1; n < indexList.length; n++) {
      let letra = indexList[n];
      let especie = woorksheet[`${letra}1`]?.w;
      let result: especieData[] = [];
      if (especie) {
        try {
          await saveEspecieExcel(especie, especie);
        } catch (err) {
          console.log("Especie ya guardada", especie);
          //return new Error("Error al leer datos de excel: " + err);
        }

        for (let index = 2; index < totalLine; index++) {
          if (letra !== "A") {
            let fechaLimite = await getLastDateRegistered(especie);
            let numberLimit = fechaLimite ? fechaLimite?.getTime() : 0;

            let date = woorksheet[`A${index}`]?.w as string;

            let val = woorksheet[`${letra}${index}`]?.v;

            let value = val ? parseFloat(val) : -1;

            let dat = date.split("/");
            let fecha = new Date(`${dat[2]}-${dat[1]}-${dat[0]}`);
            let time = fecha.getTime();

            if (numberLimit < time) {
              result.push({
                value,
                fecha,
              });
            }
          }
        }
        let res = await saveEspecieValue(especie, result);
        console.log(especie, res);
      }
      if (letra === "DK") return;
    }
  } catch (err) {
    console.log("Error: ", err);
    return new Error("Error al leer datos de excel: " + err);
  }
  return;
};

const getIndexList = () => {
  let res: string[] = [];
  let index = [
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let i = 0; i < 5; i++) {
    for (let j = 1; j < index.length; j++) {
      //console.log(`${index[i]}${index[j]}`);
      res.push(`${index[i]}${index[j]}`);
    }
  }
  return res;
};
