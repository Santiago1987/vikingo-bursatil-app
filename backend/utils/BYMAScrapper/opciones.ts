import { chromium } from "playwright";
import { opcionesBYMA } from "../../../Types/backend/BYMAScrapper";

export const getOpcionesByma = async (): Promise<opcionesBYMA[] | Error> => {
  try {
    const browser = await chromium.launch({
      headless: false,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://open.bymadata.com.ar/#/options");

    let table = page.locator(".datatable-scroll");

    let aRight = page.locator(".pager").locator(".datatable-icon-right");

    let resOptions: opcionesBYMA[] = [];

    let date = new Date();

    for (let i = 0; i < 26; i++) {
      await aRight.click({ timeout: 9000 });
    }
    const tr = table.locator(".datatable-row-wrapper");

    const rowCnt = await tr.count();

    for (let i = 0; i < rowCnt; i++) {
      const td = tr
        .nth(i)
        .locator(".datatable-row-center")
        .locator(".datatable-body-cell");

      let elem = td.nth(0).locator(".content");
      let especie = await elem.innerText();

      elem = td.nth(10).locator(".content");
      let ultimo = await elem.innerText();
      let ultn = parseFloat(ultimo);

      elem = td.nth(12).locator(".content");
      let cierre = await elem.innerText();
      let cierren = parseFloat(cierre);

      elem = td.nth(15).locator(".content");
      let volumen = await elem.innerText();
      let voln = parseFloat(volumen);

      elem = td.nth(16).locator(".content");
      let volumenMonto = await elem.innerText();
      let voln2 = parseFloat(volumenMonto);

      resOptions.push({
        especie,
        ultimo: ultn,
        cierre: cierren,
        volumen: voln,
        volumenMonto: voln2,
        fecha: date,
      });
    }
    await browser.close();
    return resOptions;
  } catch (err) {
    return new Error("Algo salio mal: " + err);
  }
};
