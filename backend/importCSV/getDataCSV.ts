import XLSX from "xlsx";

export const getDataFromFile = () => {
  try {
    let workbook = XLSX.readFile("./public/data.xlsx");
    let woorksheet = workbook.Sheets[workbook.SheetNames[4]];

    let totalLine = 1;

    while (woorksheet[`A${totalLine}`]) {
      totalLine++;
    }
    let result = []
    for (let index = 1; index < 10; index++) {
      const date = woorksheet[`A${index}`]?.w;
      const value = woorksheet[`B${index}`]?.w;
      if(index===1) 
    }
  } catch (err) {
    console.log("Error: ", err);
    return new Error("Error al leer datos de excel: " + err);
  }
};
