// Centralized station data for the Nordic train system
// This data structure is designed to match future API responses

export interface StationInfo {
  id: string;
  name: string;
  country: string;
  region?: string;
  isActive: boolean;
  platforms?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const stationData: StationInfo[] = [
  // Swedish stations
  {
    id: "ALL",
    name: "Alla stationer",
    country: "SE",
    isActive: true,
  },
  {
    id: "Tågholm",
    name: "Tågholm",
    country: "SE",
    region: "Västra",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Rälsby",
    name: "Rälsby", 
    country: "SE",
    region: "Västra",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Ångalund",
    name: "Ångalund",
    country: "SE", 
    region: "Norra",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Lokförberg",
    name: "Lokförberg",
    country: "SE",
    region: "Norra", 
    isActive: true,
    platforms: 2,
  },
  {
    id: "Järnvägshavn",
    name: "Järnvägshavn",
    country: "SE",
    region: "Östra",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Stationsdal",
    name: "Stationsdal",
    country: "SE",
    region: "Östra",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Spåravik",
    name: "Spåravik",
    country: "SE",
    region: "Södra",
    isActive: true,
    platforms: 5,
  },
  {
    id: "Vagnsjö",
    name: "Vagnsjö",
    country: "SE",
    region: "Södra",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Pendeltorp",
    name: "Pendeltorp",
    country: "SE",
    region: "Centrala",
    isActive: true,
    platforms: 6,
  },
  {
    id: "Biljettfors",
    name: "Biljettfors",
    country: "SE",
    region: "Centrala",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Växellunda",
    name: "Växellunda",
    country: "SE",
    region: "Centrala",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Perrongberg",
    name: "Perrongberg", 
    country: "SE",
    region: "Västra",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Signalfält",
    name: "Signalfält",
    country: "SE",
    region: "Västra",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Konduktörsby",
    name: "Konduktörsby",
    country: "SE",
    region: "Norra",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Tunnelö",
    name: "Tunnelö",
    country: "SE",
    region: "Östra",
    isActive: true,
    platforms: 3,
  },

  // Danish stations
  {
    id: "Togø",
    name: "Togø",
    country: "DK",
    region: "Sjælland",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Skinnerup",
    name: "Skinnerup",
    country: "DK",
    region: "Sjælland",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Dampholm",
    name: "Dampholm",
    country: "DK",
    region: "Jylland",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Lokomotivbjerg",
    name: "Lokomotivbjerg",
    country: "DK",
    region: "Jylland",
    isActive: true,
    platforms: 5,
  },
  {
    id: "Jernbanehavn",
    name: "Jernbanehavn",
    country: "DK",
    region: "Fyn",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Sporvig",
    name: "Sporvig",
    country: "DK",
    region: "Sjælland",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Vognssø",
    name: "Vognssø",
    country: "DK",
    region: "Jylland",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Pendlertorp",
    name: "Pendlertorp",
    country: "DK",
    region: "Fyn",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Billetfos",
    name: "Billetfos",
    country: "DK",
    region: "Sjælland",
    isActive: true,
    platforms: 6,
  },
  {
    id: "Skiftemark",
    name: "Skiftemark",
    country: "DK",
    region: "Jylland",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Perronbjerg",
    name: "Perronbjerg",
    country: "DK",
    region: "Fyn",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Signalmark",
    name: "Signalmark",
    country: "DK",
    region: "Sjælland",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Konduktørby",
    name: "Konduktørby",
    country: "DK",
    region: "Jylland",
    isActive: true,
    platforms: 5,
  },

  // Finnish stations
  {
    id: "Junasaari",
    name: "Junasaari",
    country: "FI",
    region: "Etelä-Suomi",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Kiskoila",
    name: "Kiskoila",
    country: "FI",
    region: "Länsi-Suomi",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Höyrylahti",
    name: "Höyrylahti",
    country: "FI",
    region: "Itä-Suomi",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Veturivuori",
    name: "Veturivuori",
    country: "FI",
    region: "Pohjois-Suomi",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Rautatiesatama",
    name: "Rautatiesatama",
    country: "FI",
    region: "Etelä-Suomi",
    isActive: true,
    platforms: 6,
  },
  {
    id: "Asemalaakso",
    name: "Asemalaakso",
    country: "FI",
    region: "Länsi-Suomi",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Raideniemi",
    name: "Raideniemi",
    country: "FI",
    region: "Itä-Suomi",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Vaunujärvi",
    name: "Vaunujärvi",
    country: "FI",
    region: "Pohjois-Suomi",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Pendelöikylä",
    name: "Pendelöikylä",
    country: "FI",
    region: "Etelä-Suomi",
    isActive: true,
    platforms: 5,
  },
  {
    id: "Lippukoski",
    name: "Lippukoski",
    country: "FI",
    region: "Länsi-Suomi",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Vaihdeniitty",
    name: "Vaihdeniitty",
    country: "FI",
    region: "Itä-Suomi",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Laiturikallio",
    name: "Laiturikallio",
    country: "FI",
    region: "Pohjois-Suomi",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Signaalipelto",
    name: "Signaalipelto",
    country: "FI",
    region: "Etelä-Suomi",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Konduktöörikylä",
    name: "Konduktöörikylä",
    country: "FI",
    region: "Länsi-Suomi",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Tunnelinluoto",
    name: "Tunnelinluoto",
    country: "FI",
    region: "Itä-Suomi",
    isActive: true,
    platforms: 5,
  },

  // Norwegian stations
  {
    id: "Oslo",
    name: "Oslo",
    country: "NO",
    region: "Østlandet",
    isActive: true,
    platforms: 12,
  },
  {
    id: "Bergen",
    name: "Bergen",
    country: "NO",
    region: "Vestlandet",
    isActive: true,
    platforms: 8,
  },
  {
    id: "Trondheim",
    name: "Trondheim",
    country: "NO",
    region: "Trøndelag",
    isActive: true,
    platforms: 6,
  },
  {
    id: "Stavanger",
    name: "Stavanger",
    country: "NO",
    region: "Vestlandet",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Drammen",
    name: "Drammen",
    country: "NO",
    region: "Østlandet",
    isActive: true,
    platforms: 5,
  },
  {
    id: "Kristiansand",
    name: "Kristiansand",
    country: "NO",
    region: "Sørlandet",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Bodø",
    name: "Bodø",
    country: "NO",
    region: "Nord-Norge",
    isActive: true,
    platforms: 4,
  },
  {
    id: "Narvik",
    name: "Narvik",
    country: "NO",
    region: "Nord-Norge",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Fauske",
    name: "Fauske",
    country: "NO",
    region: "Nord-Norge",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Tromsø",
    name: "Tromsø",
    country: "NO",
    region: "Nord-Norge",
    isActive: true,
    platforms: 3,
  },
  {
    id: "Halden",
    name: "Halden",
    country: "NO",
    region: "Østlandet",
    isActive: true,
    platforms: 2,
  },
  {
    id: "Moss",
    name: "Moss",
    country: "NO",
    region: "Østlandet",
    isActive: true,
    platforms: 4,
  },
];

// Utility functions for working with station data
export const getStationsByCountry = (countryCode: string): StationInfo[] => {
  if (countryCode === "ALL") {
    return [{ id: "ALL", name: "Alla stationer", country: "ALL", isActive: true }];
  }
  
  return [
    { id: "ALL", name: "Alla stationer", country: countryCode, isActive: true },
    ...stationData.filter(station => station.country === countryCode && station.id !== "ALL")
  ];
};

export const getStationById = (stationId: string, countryCode?: string): StationInfo | undefined => {
  if (stationId === "ALL") {
    return { id: "ALL", name: "Alla stationer", country: countryCode || "ALL", isActive: true };
  }
  
  return stationData.find(station => station.id === stationId);
};

export const searchStations = (query: string, countryCode?: string): StationInfo[] => {
  const searchQuery = query.toLowerCase();
  let stations = stationData;
  
  if (countryCode && countryCode !== "ALL") {
    stations = stations.filter(station => station.country === countryCode);
  }
  
  return stations.filter(station => 
    station.name.toLowerCase().includes(searchQuery) ||
    station.region?.toLowerCase().includes(searchQuery)
  );
};