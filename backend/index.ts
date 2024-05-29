import { getAcciones } from "./BYMAScrapper/acciones";

getAcciones()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error("ERRR", err));
