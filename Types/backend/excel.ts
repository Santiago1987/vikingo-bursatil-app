export enum especie {
  APPL = "APPL",
  ADGO = "ADGO",
  AE38 = "AE38",
  AL29 = "AL29",
  AL30 = "AL30",
  AL35 = "AL35",
}

export type especieData = {
  value: number | undefined;
  fecha: Date;
};

export interface especieDataList {
  [key: string]: especieData[];
}
