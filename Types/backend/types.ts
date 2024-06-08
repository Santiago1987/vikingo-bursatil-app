export interface Especie {
  especie: string;
  name: string;
  cotizaciones: [
    {
      fecha: Date;
      value: number;
    }
  ];
}
