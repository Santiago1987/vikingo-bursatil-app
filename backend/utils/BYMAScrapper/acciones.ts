import { chromium } from "playwright";
import { panelBYMA } from "../../types";

type vencimiento = "24hs" | "C.I.";

export const getAcciones = async (): Promise<panelBYMA[] | Error> => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ["--start-maximized"],
    });
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();

    await page.goto("https://open.bymadata.com.ar/#/local-stocks-adrs");

    let table = page.locator(".datatable-scroll");

    let aRight = page.locator(".pager").locator(".datatable-icon-right");

    let headers = page.locator("header");

    let resAcciones: panelBYMA[] = [];
    let date = new Date();

    let buttons = headers.nth(0).locator(".buttonFilter");
    await buttons.nth(2).click({ timeout: 9000 });

    buttons = headers.nth(1).locator(".buttonFilter");
    await buttons.nth(2).click({ timeout: 9000 });

    for (let j = 0; j < 4; j++) {
      let tr = table.nth(0).locator(".datatable-row-wrapper");
      let rowCnt = await tr.count();

      for (let i = 0; i < rowCnt; i++) {
        const td = tr
          .nth(i)
          .locator(".datatable-row-center")
          .locator(".datatable-body-cell");

        let elem = td.nth(0).locator(".content");
        let especie = await elem.innerText();

        elem = td.nth(1).locator(".content");
        let vencimiento = (await elem.innerText()) as vencimiento;

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
        let volumen_monto = await elem.innerText();
        let voln2 = parseFloat(volumen_monto);

        let ispresent = resAcciones.find((el) => {
          return el.especie === especie && el.vencimiento === vencimiento;
        });
        if (!ispresent) {
          resAcciones.push({
            especie,
            vencimiento,
            ultimo: ultn,
            cierre: cierren,
            volumen: voln,
            volumenMonto: voln2,
            fecha: date,
          });
        }
      }
      await aRight.nth(0).click({ timeout: 9000 });
    }
    for (let j = 0; j < 6; j++) {
      let tr = table.nth(1).locator(".datatable-row-wrapper");
      let rowCnt = await tr.count();

      for (let i = 0; i < rowCnt; i++) {
        const td = tr
          .nth(i)
          .locator(".datatable-row-center")
          .locator(".datatable-body-cell");

        let elem = td.nth(0).locator(".content");
        let especie = await elem.innerText();

        elem = td.nth(1).locator(".content");
        let vencimiento = (await elem.innerText()) as vencimiento;

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
        let volumen_monto = await elem.innerText();
        let voln2 = parseFloat(volumen_monto);

        let ispresent = resAcciones.find((el) => {
          return el.especie === especie && el.vencimiento === vencimiento;
        });
        if (!ispresent) {
          resAcciones.push({
            especie,
            vencimiento,
            ultimo: ultn,
            cierre: cierren,
            volumen: voln,
            volumenMonto: voln2,
            fecha: date,
          });
        }
      }
      await aRight.nth(1).click({ timeout: 9000 });
    }

    await browser.close();
    return resAcciones;
  } catch (err) {
    return new Error("Algo salio mal: " + err);
  }
};
