
export interface Country {
  code: string;
  name: string;
  flagUrl: string;
}

export const COUNTRIES: Record<string, Country> = {
  SE: {
    code: "SE",
    name: "Sverige",
    flagUrl: "https://flagcdn.com/w40/se.png"
  },
  NO: {
    code: "NO",
    name: "Norge",
    flagUrl: "https://flagcdn.com/w40/no.png"
  },
  DK: {
    code: "DK",
    name: "Danmark",
    flagUrl: "https://flagcdn.com/w40/dk.png"
  },
  FI: {
    code: "FI",
    name: "Finland",
    flagUrl: "https://flagcdn.com/w40/fi.png"
  },
  ALL: {
    code: "ALL",
    name: "Alla länder",
    flagUrl: "https://flagcdn.com/w40/eu.png"
  }
};
