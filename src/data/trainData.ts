
import { Train } from "../types/train";

export const trainData: Train[] = [
  // Swedish stations
  {
    id: "0000000049701",
    operator: "ONRAIL",
    from: "Tågholm",
    to: "Rälsby",
    country: "SE",
    updated: "2025-04-24 00:15",
    highlighted: false,
    arrivalTime: "14:30",
    track: "1"
  },
  {
    id: "0000000049702",
    operator: "ONRAIL",
    from: "Ångalund",
    to: "Lokförberg",
    country: "SE",
    updated: "2025-04-30 13:36",
    highlighted: false,
    arrivalTime: "15:20",
    track: "2"
  },
  {
    id: "02",
    operator: "DBSRS",
    from: "Järnvägshavn",
    to: "Stationsdal",
    country: "SE",
    updated: "06:51",
    highlighted: false,
    arrivalTime: "06:45",
    track: "3"
  },
  {
    id: "0605",
    operator: "CN",
    from: "Spåravik",
    to: "Vagnsjö",
    country: "SE",
    updated: "2025-04-30 12:58",
    highlighted: true,
    arrivalTime: "13:10",
    track: "4",
    newTrack: "6"
  },
  {
    id: "1",
    announcedTrainNumber: "1",
    operator: "SJ",
    from: "Pendeltorp",
    to: "Biljettfors",
    country: "SE",
    latest: "Växellunda",
    updated: "07:17",
    highlighted: false,
    arrivalTime: "07:15",
    track: "1"
  },
  {
    id: "10",
    announcedTrainNumber: "10",
    operator: "SJ",
    from: "Perrongberg",
    to: "Signalfält",
    country: "SE",
    latest: "Konduktörsby",
    updated: "14:12",
    highlighted: false,
    arrivalTime: "14:00",
    track: "2",
    newTime: "14:15"
  },
  {
    id: "100",
    announcedTrainNumber: "100",
    operator: "SJ",
    from: "Tunnelö",
    to: "Tågholm",
    country: "SE",
    latest: "Rälsby",
    updated: "07:52",
    highlighted: false
  },
  
  // Danish stations
  {
    id: "1001",
    announcedTrainNumber: "1001",
    operator: "TDEV",
    from: "Togø",
    to: "Skinnerup",
    country: "DK",
    latest: "Dampholm",
    updated: "04:27",
    highlighted: false,
    arrivalTime: "09:30",
    track: "1"
  },
  {
    id: "1004",
    operator: "TDEV",
    from: "Lokomotivbjerg",
    to: "Jernbanehavn",
    country: "DK",
    latest: "Stationsdal",
    updated: "09:06",
    highlighted: false,
    arrivalTime: "10:15",
    track: "3"
  },
  {
    id: "1005",
    announcedTrainNumber: "1005",
    operator: "TDEV",
    from: "Sporvig",
    to: "Vognssø",
    country: "DK",
    latest: "Pendlertorp",
    updated: "04:51",
    highlighted: true,
    arrivalTime: "12:45",
    track: "2"
  },
  {
    id: "1007",
    announcedTrainNumber: "1007",
    operator: "TDEV",
    from: "Billetfos",
    to: "Skiftemark",
    country: "DK",
    latest: "Perronbjerg",
    updated: "05:07",
    highlighted: false,
    arrivalTime: "13:20",
    track: "4"
  },
  {
    id: "1008",
    announcedTrainNumber: "1008",
    operator: "TDEV",
    from: "Signalmark",
    to: "Konduktørby",
    country: "DK",
    latest: "Tunnelø",
    updated: "09:17",
    highlighted: false,
    arrivalTime: "14:30",
    track: "1"
  },
  
  // Finnish stations
  {
    id: "1010",
    announcedTrainNumber: "1010",
    operator: "TDEV",
    from: "Junasaari",
    to: "Kiskoila",
    country: "FI",
    latest: "Höyrylahti",
    updated: "10:25",
    highlighted: false,
    arrivalTime: "10:15",
    track: "5"
  },
  {
    id: "1245",
    announcedTrainNumber: "1245",
    operator: "SJ",
    from: "Veturivuori",
    to: "Rautatiesatama",
    country: "FI",
    latest: "Asemalaakso",
    updated: "2025-05-02 16:22",
    highlighted: false,
    arrivalTime: "16:45",
    track: "2"
  },
  {
    id: "1375",
    announcedTrainNumber: "1375",
    operator: "SJ",
    from: "Raideniemi",
    to: "Vaunujärvi",
    country: "FI",
    latest: "Pendelöikylä",
    updated: "2025-05-02 18:40",
    highlighted: false,
    arrivalTime: "18:30",
    track: "3",
    newTrack: "5"
  },
  {
    id: "2034",
    announcedTrainNumber: "2034",
    operator: "ONRAIL",
    from: "Lippukoski",
    to: "Vaihdeniitty",
    country: "FI",
    latest: "Laiturikallio",
    updated: "2025-05-03 07:15",
    highlighted: false,
    arrivalTime: "07:00",
    track: "1"
  },
  {
    id: "2156",
    announcedTrainNumber: "2156",
    operator: "DBSRS",
    from: "Signaalipelto",
    to: "Konduktöörikylä",
    country: "FI",
    latest: "Tunnelinluoto",
    updated: "2025-05-03 09:30",
    highlighted: false,
    arrivalTime: "09:15",
    track: "4"
  },
  
  // Norwegian stations
  {
    id: "3201",
    announcedTrainNumber: "3201",
    operator: "CN",
    from: "Oslo",
    to: "Bergen",
    country: "NO",
    latest: "Drammen",
    updated: "2025-05-04 12:10",
    highlighted: true,
    arrivalTime: "11:50",
    track: "6",
    newTime: "12:25"
  },
  {
    id: "4055",
    announcedTrainNumber: "4055",
    operator: "TDEV",
    from: "Trondheim",
    to: "Stavanger",
    country: "NO",
    latest: "Kristiansand",
    updated: "2025-05-04 15:45",
    highlighted: false,
    arrivalTime: "15:30",
    track: "2"
  },
  {
    id: "5123",
    announcedTrainNumber: "5123",
    operator: "SJ",
    from: "Bodø",
    to: "Narvik", 
    country: "NO",
    latest: "Fauske",
    updated: "2025-05-05 11:20",
    highlighted: false,
    arrivalTime: "11:05",
    track: "1"
  },
  {
    id: "6072",
    announcedTrainNumber: "6072",
    operator: "TDEV",
    from: "Tromsø",
    to: "Halden",
    country: "NO",
    latest: "Moss",
    updated: "2025-05-05 14:33",
    highlighted: false,
    arrivalTime: "14:15",
    track: "3"
  }
];
