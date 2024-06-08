export type especieData = {
  value: number | undefined;
  fecha: Date;
};

export interface especieDataList {
  [key: string]: especieData[];
}
