import XLSX from "xlsx";
import { especieData } from "../../../Types/backend/excel";
//import { saveEspecieExcel, saveEspecieValue } from "../../controllers/especies";

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

    //let especie = "AMD";
    //let name = "Advance Micro Devices";
    //let letra = "DK";
    /*try {
      await saveEspecieExcel(especie, name);
    } catch (err) {
      console.log("Error: ", err);
      //return new Error("Error al leer datos de excel: " + err);
    }*/

    for (let n = 1; n < indexList.length; n++) {
      let letra = indexList[n];
      let especie = woorksheet[`${letra}1`]?.w;
      let result: especieData[] = [];
      for (let index = 2; index < totalLine; index++) {
        if (letra !== "A") {
          let date = woorksheet[`A${index}`]?.w as string;

          let val = woorksheet[`${letra}${index}`]?.v;

          let value = val ? parseFloat(val) : -1;

          let dat = date.split("/");
          let fecha = new Date(`${dat[2]}-${dat[1]}-${dat[0]}`);
          result.push({
            value,
            fecha,
          });
        }

        //let res = await saveEspecieValue(especie, result);
        //return res;
      }
      console.log(especie, result, result.length);
      //if (n === 2) return;
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

  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < index.length; j++) {
      console.log(`${index[i]}${index[j]}`);
      res.push(`${index[i]}${index[j]}`);
    }
  }
  return res;
};
