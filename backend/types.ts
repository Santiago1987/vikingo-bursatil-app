//BYMA
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

// EXCEL
export type especieData = {
  value: number | undefined;
  fecha: Date;
};

export interface especieDataList {
  [key: string]: especieData[];
}

export interface OpcionesBymaAPI {
  tradeVolume: number;
  symbol: string;
  imbalance: number;
  previousSettlementPrice: number;
  offerPrice: number;
  openInterest: number;
  vwap: number;
  numberOfOrders: number;
  openingPrice: number;
  tickDirection: number;
  underlyingSymbol: string;
  securityDesc: string;
  securitySubType: string;
  maturityDate: Date;
  previousClosingPrice: number;
  settlementType: string;
  quantityOffer: number;
  tradingHighPrice: number;
  denominationCcy: string;
  bidPrice: number;
  tradingLowPrice: number;
  market: string;
  volumeAmount: number;
  volume: number;
  trade: number;
  daysToMaturity: number;
  tradeHour: string;
  securityType: string;
  closingPrice: number;
  settlementPrice: number;
  quantityBid: number;
}

export interface PanelLider {
  tradeVolume: number;
  symbol: string;
  imbalance: number;
  previousSettlementPrice: number;
  offerPrice: number;
  openInterest: number;
  vwap: number;
  numberOfOrders: number;
  openingPrice: number;
  tickDirection: number;
  securityDesc: string;
  securitySubType: string;
  previousClosingPrice: number;
  settlementType: string;
  quantityOffer: number;
  tradingHighPrice: number;
  denominationCcy: string;
  bidPrice: number;
  tradingLowPrice: number;
  market: string;
  volumeAmount: number;
  volume: number;
  trade: number;
  tradeHour: string;
  securityType: string;
  closingPrice: number;
  settlementPrice: number;
  quantityBid: number;
}

// ESPECIES
export enum CEDEARList {
  ALL = "ALL",
  APP = "APP",
  AAPL = "APPL",
  ABBV = "ABBV",
  ABEV = "ABEV",
  ABNB = "ABNB",
  ABT = "ABT",
  ACN = "ACN",
  ACBE = "ACBE",
  ADGO = "ADGO",
  ADI = "ADI",
  ADP = "ADP",
  AEG = "AEG",
  AEM = "AEM",
  AIG = "AIG",
  "AKO.B" = "AKO.B",
  AMAT = "AMAT",
  AMD = "AMD",
  AMGN = "AMGN",
  AMX = "AMX",
  AMZN = "AMZN",
  ANF = "ANF",
  AOCA = "AOCA",
  ARCO = "ARCO",
  ARKK = "ARKK",
  ASR = "ASR",
  AVGO = "AVGO",
  AVY = "AVY",
  AXP = "AXP",
  AZN = "AZN",
  BA = "BA",
  BABA = "BABA",
  BAD = "BAD",
  BAK = "BAK",
  BB = "BB",
  BBD = "BBD",
  BBV = "BBV",
  BCS = "BCS",
  BHP = "BHP",
  BIDU = "BIDU",
  BIIB = "BIIB",
  BIOX = "BIOX",
  BITF = "BITF",
  BK = "BK",
  BMY = "BMY",
  BNG = "BNG",
  BP = "BP",
  BRFS = "BRFS",
  BRKB = "BRKB",
  BSBR = "BSBR",
  C = "C",
  CAAP = "CAAP",
  CAH = "CAH",
  CAR = "CAR",
  CAT = "CAT",
  CCL = "CCL",
  CDE = "CDE",
  CL = "CL",
  COIN = "COIN",
  COST = "COST",
  CRM = "CRM",
  CSCO = "CSCO",
  CVS = "CVS",
  CVX = "CVX",
  CX = "CX",
  DAL = "DAL",
  DD = "DD",
  DE = "DE",
  DEO = "DEO",
  DESP = "DESP",
  DIA = "DIA",
  DISN = "DISN",
  DOCU = "DOCU",
  DOW = "DOW",
  E = "E",
  EA = "EA",
  EBAY = "EBAY",
  EBR = "EBR",
  EEM = "EEM",
  EFX = "EFX",
  ELP = "ELP",
  ERIC = "ERIC",
  ERJ = "ERJ",
  ETSY = "ETSY",
  EWZ = "EWZ",
  F = "F",
  FCX = "FCX",
  FD = "FD",
  FDX = "FDX",
  FMX = "FMX",
  FSLR = "FSLR",
  GE = "GE",
  GFI = "GFI",
  GGB = "GGB",
  GILD = "GILD",
  GLOB = "GLOB",
  GLW = "GLW",
  GM = "GM",
  GOOGL = "GOOGL",
  GPRK = "GPRK",
  GRMN = "GRMN",
  GS = "GS",
  GSK = "GSK",
  HAL = "HAL",
  HD = "HD",
  HL = "HL",
  HMC = "HMC",
  HMY = "HMY",
  HOG = "HOG",
  HON = "HON",
  HPQ = "HPQ",
  HSBC = "HSBC",
  HSY = "HSY",
  HUT = "HUT",
  HWM = "HWM",
  IBM = "IBM",
  IBN = "IBN",
  IFF = "IFF",
  INFY = "INFY",
  ING = "ING",
  INTC = "INTC",
  IP = "IP",
  ITUB = "ITUB",
  IWM = "IWM",
  JD = "JD",
  JMIA = "JMIA",
  JNJ = "JNJ",
  JPM = "JPM",
  KB = "KB",
  KEP = "KEP",
  KGC = "KGC",
  KMB = "KMB",
  KO = "KO",
  KOFM = "KOFM",
  LAC = "LAC",
  LLY = "LLY",
  LMT = "LMT",
  LND = "LND",
  LRCX = "LRCX",
  LVS = "LVS",
  LYG = "LYG",
  MA = "MA",
  MAD = "MAD",
  MCD = "MCD",
  MDLZ = "MDLZ",
  MDT = "MDT",
  MELI = "MELI",
  META = "META",
  MFG = "MFG",
  MMC = "MMC",
  MMM = "MMM",
  MO = "MO",
  MOS = "MOS",
  MRK = "MRK",
  MRNA = "MRNA",
  MRVL = "MRVL",
  MSFT = "MSFT",
  MSI = "MSI",
  MSTR = "MSTR",
  MU = "MU",
  MUFG = "MUFG",
  MUX = "MUX",
  NEM = "NEM",
  NFLX = "NFLX",
  NG = "NG",
  NIO = "NIO",
  NKE = "NKE",
  NMR = "NMR",
  NOKA = "NOKA",
  NTES = "NTES",
  NU = "NU",
  NUE = "NUE",
  NVDA = "NVDA",
  NVS = "NVS",
  ORAN = "ORAN",
  ORCL = "ORCL",
  OXY = "OXY",
  PAAS = "PAAS",
  PAC = "PAC",
  PAGS = "PAGS",
  PANW = "PANW",
  PBI = "PBI",
  PBR = "PBR",
  PCAR = "PCAR",
  PEP = "PEP",
  PFE = "PFE",
  PG = "PG",
  PHG = "PHG",
  PKS = "PKS",
  PLTR = "PLTR",
  PM = "PM",
  PSX = "PSX",
  PYPL = "PYPL",
  QCOM = "QCOM",
  QQQ = "QQQ",
  RACE = "RACE",
  RBLX = "RBLX",
  RIO = "RIO",
  RIOT = "RIOT",
  ROKU = "ROKU",
  ROST = "ROST",
  RTX = "RTX",
  SAN = "SAN",
  SAP = "SAP",
  SATL = "SATL",
  SBS = "SBS",
  SBUX = "SBUX",
  SCCO = "SCCO",
  SDA = "SDA",
  SE = "SE",
  SHEL = "SHEL",
  SHOP = "SHOP",
  SHPW = "SHPW",
  SID = "SID",
  SLB = "SLB",
  SNA = "SNA",
  SNOW = "SNOW",
  SONY = "SONY",
  SPCE = "SPCE",
  SPGI = "SPGI",
  SPOT = "SPOT",
  SPY = "SPY",
  SQ = "SQ",
  STLA = "STLA",
  STNE = "STNE",
  SUZ = "SUZ",
  SWKS = "SWKS",
  SYY = "SYY",
  T = "T",
  TEFO = "TEFO",
  TEN = "TEN",
  TGT = "TGT",
  TM = "TM",
  TMO = "TMO",
  TRIP = "TRIP",
  TSLA = "TSLA",
  TSM = "TSM",
  TTE = "TTE",
  TV = "TV",
  TWLO = "TWLO",
  TXN = "TXN",
  TXR = "TXR",
  UAL = "UAL",
  UBER = "UBER",
  UGP = "UGP",
  UL = "UL",
  UNH = "UNH",
  UNP = "UNP",
  UPST = "UPST",
  URBN = "URBN",
  USB = "USB",
  V = "V",
  VALE = "VALE",
  VD = "VD",
  VIST = "VIST",
  VIV = "VIV",
  VOD = "VOD",
  VRSN = "VRSN",
  VZ = "VZ",
  WBA = "WBA",
  WBO = "WBO",
  WFC = "WFC",
  WMT = "WMT",
  X = "X",
  XLE = "XLE",
  XLF = "XLF",
  XOM = "XOM",
  XP = "XP",
  XROX = "XROX",
  YY = "YY",
  ZM = "ZM",
}
