import { getCedears } from "./BYMAScrapper/cedears";

getCedears()
  .then((res) => {
    if (res instanceof Error) return;
    console.log(res);
    console.log(res.length);
  })
  .catch((err) => console.error("ERRR", err));
