export interface opcionesBYMA {
  especie: string;
  ultimo: number;
  cierre: number;
  volumen: number;
  volumenMonto: number;
  fecha: Date;
}

export interface panelBYMA {
  especie: string;
  ultimo: number;
  cierre: number;
  volumen: number;
  volumenMonto: number;
  fecha: Date;
  vencimiento: "24hs" | "C.I.";
}
