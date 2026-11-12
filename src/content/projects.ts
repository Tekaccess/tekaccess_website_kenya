import type { PhotoKey } from "./images";
import type { City } from "./geo";

export type Mode = "Truck" | "Ship" | "Rail";

export type Project = {
  slug: string;
  from: string;
  to: string;
  mode: Mode;
  cargo: string;
  km: number; // TODO: approximate route distances, confirm with operations
  countries: string; // place label under the skyline column
  summary: string;
  facts: { label: string; value: string }[];
  started: { title: string; text: string };
  today: { title: string; text: string };
  stops: { stop: string; note: string }[];
  photo: PhotoKey;
  gallery: PhotoKey[];
  strip: { photo: PhotoKey; caption: string }[];
  services: string[]; // service slugs
  path: City[]; // cities in travel order, drawn by ProjectMap
};

export const projects: Project[] = [
  {
    slug: "gisenyi-katana",
    from: "Gisenyi",
    to: "Katana",
    mode: "Ship",
    cargo: "Clinker, gypsum",
    km: 110,
    countries: "Rwanda to DRC",
    summary: "Clinker and gypsum by ship across Lake Kivu, a steady supply line for cement production on the western shore.",
    facts: [
      { label: "Mode", value: "Ship" },
      { label: "From", value: "Gisenyi, Rwanda" },
      { label: "To", value: "Katana, DRC" },
      { label: "Cargo", value: "Clinker, gypsum" },
      { label: "Distance", value: "≈ 110 km" },
      { label: "Crossing", value: "Lake Kivu" },
      { label: "Client", value: "Cement production" },
    ],
    started: {
      title: "When we started this project",
      text: "A cement plant on the western shore needed clinker and gypsum without the long road around the lake. The water was the shortest road, so we built a crossing around it.",
    },
    today: {
      title: "How it runs today",
      text: "Loads reach Gisenyi by road, are weighed and transferred to the vessel, cross to Katana on a schedule agreed with the plant, and are cleared and delivered by our team on the far side.",
    },
    stops: [
      { stop: "Gisenyi quay", note: "Loaded and weighed" },
      { stop: "Lake Kivu", note: "On the water" },
      { stop: "Katana port", note: "Unloaded and cleared" },
      { stop: "Cement plant", note: "Delivered" },
    ],
    photo: "kivuBoats",
    gallery: ["kivuBoats", "kivuHills", "kivuCoast", "kivuIsland", "cementSilos"],
    strip: [
      { photo: "kivuCoast", caption: "Gisenyi shore" },
      { photo: "kivuBoats", caption: "At the quay" },
      { photo: "kivuIsland", caption: "On the lake" },
      { photo: "cementSilos", caption: "Delivery at the plant" },
    ],
    services: ["clinker-supply", "gypsum-supply", "ship-delivery"],
    path: ["Gisenyi", "Katana"],
  },
  {
    slug: "kigali-goma",
    from: "Kigali",
    to: "Goma",
    mode: "Truck",
    cargo: "Mixed cargo",
    km: 160,
    countries: "Rwanda to DRC",
    summary: "The short road west from Kigali to the Goma border, for project cargo and supplies into eastern DRC.", // TODO: confirm this project
    facts: [
      { label: "Mode", value: "Truck" },
      { label: "From", value: "Kigali, Rwanda" },
      { label: "To", value: "Goma, DRC" },
      { label: "Cargo", value: "Mixed cargo" },
      { label: "Distance", value: "≈ 160 km" },
      { label: "Border", value: "Rubavu / Goma" },
    ],
    started: {
      title: "When we started this project",
      text: "Clients in eastern DRC needed one partner on both sides of the border rather than a handover at the gate.",
    },
    today: {
      title: "How it runs today",
      text: "Trucks leave Kigali in the morning, clear at Rubavu with papers prepared the day before, and deliver in Goma the same day where the border allows.",
    },
    stops: [
      { stop: "Kigali", note: "Loaded" },
      { stop: "Musanze", note: "In transit" },
      { stop: "Rubavu", note: "Cleared" },
      { stop: "Goma", note: "Delivered" },
    ],
    photo: "hillsRoad",
    gallery: ["hillsRoad", "fleetYard", "kivuCoast", "fleetFront"],
    strip: [
      { photo: "fleetFront", caption: "Leaving Kigali" },
      { photo: "hillsRoad", caption: "Through the hills" },
      { photo: "kivuCoast", caption: "Near the border" },
      { photo: "fleetQuay", caption: "Delivered" },
    ],
    services: ["truck-delivery"],
    path: ["Kigali", "Goma"],
  },
  {
    slug: "dodoma-kigoma",
    from: "Dodoma",
    to: "Kigoma",
    mode: "Rail",
    cargo: "Gypsum",
    km: 860,
    countries: "Tanzania",
    summary: "Gypsum by rail on Tanzania's central line from Dodoma to Kigoma, under our framework business with cement manufacturers.",
    facts: [
      { label: "Mode", value: "Rail" },
      { label: "From", value: "Dodoma, Tanzania" },
      { label: "To", value: "Kigoma, Tanzania" },
      { label: "Cargo", value: "Gypsum" },
      { label: "Distance", value: "≈ 860 km" },
      { label: "Line", value: "Central line" },
    ],
    started: {
      title: "When we started this project",
      text: "Volumes grew past what road alone could carry economically, so we moved the long middle stretch onto rail.",
    },
    today: {
      title: "How it runs today",
      text: "We book wagon capacity, supervise loading in Dodoma and meet the train at Kigoma, where our trucks carry the gypsum the last miles.",
    },
    stops: [
      { stop: "Dodoma", note: "Loaded" },
      { stop: "Tabora", note: "In transit" },
      { stop: "Kigoma", note: "Railhead" },
      { stop: "Plant", note: "Delivered" },
    ],
    photo: "railYard",
    gallery: ["railYard", "gypsumTrucks", "gypsumLoad", "cementPlant"],
    strip: [
      { photo: "railYard", caption: "Wagons at the yard" },
      { photo: "gypsumLoad", caption: "Loaded and covered" },
      { photo: "forestRoad", caption: "The last miles" },
      { photo: "cementPlant", caption: "Delivery at the plant" },
    ],
    services: ["gypsum-supply", "train-delivery"],
    path: ["Dodoma", "Tabora", "Kigoma"],
  },
  {
    slug: "kenya-kigali",
    from: "Kenya",
    to: "Kigali",
    mode: "Truck",
    cargo: "Clinker",
    km: 1450,
    countries: "Kenya to Rwanda",
    summary: "Clinker on the northern corridor from Kenyan producers through Uganda to Kigali.",
    facts: [
      { label: "Mode", value: "Truck" },
      { label: "From", value: "Kenya" },
      { label: "To", value: "Kigali, Rwanda" },
      { label: "Cargo", value: "Clinker" },
      { label: "Distance", value: "≈ 1,450 km" },
      { label: "Borders", value: "Malaba, Gatuna" },
    ],
    started: {
      title: "When we started this project",
      text: "Rwandan grinding plants needed a dependable clinker supply from Kenya, with one company accountable from producer to silo.",
    },
    today: {
      title: "How it runs today",
      text: "Loads run the northern corridor through Nairobi and Kampala, clear at Malaba and Gatuna with our own team, and report at every handover.",
    },
    stops: [
      { stop: "Kenya", note: "Loaded" },
      { stop: "Malaba", note: "Cleared" },
      { stop: "Kampala", note: "In transit" },
      { stop: "Gatuna", note: "Cleared" },
      { stop: "Kigali", note: "Delivered" },
    ],
    photo: "fleetFront",
    gallery: ["fleetFront", "clinker", "fleetRow", "cementSilos"],
    strip: [
      { photo: "clinker", caption: "Clinker" },
      { photo: "fleetRow", caption: "Our fleet" },
      { photo: "highway", caption: "Northern corridor" },
      { photo: "cementSilos", caption: "Delivery at the plant" },
    ],
    services: ["clinker-supply", "truck-delivery"],
    path: ["Nairobi", "Malaba", "Kampala", "Kigali"],
  },
  {
    slug: "garissa-kigali",
    from: "Garissa",
    to: "Kigali",
    mode: "Truck",
    cargo: "Gypsum",
    km: 1650,
    countries: "Kenya to Rwanda",
    summary: "Gypsum from Garissa's quarries by road through Kenya and Uganda to plants in Rwanda.",
    facts: [
      { label: "Mode", value: "Truck" },
      { label: "From", value: "Garissa, Kenya" },
      { label: "To", value: "Kigali, Rwanda" },
      { label: "Cargo", value: "Gypsum" },
      { label: "Distance", value: "≈ 1,650 km" },
      { label: "Borders", value: "Malaba, Gatuna" },
    ],
    started: {
      title: "When we started this project",
      text: "We built relationships with several Garissa miners so that one slow quarry would never stop a plant.",
    },
    today: {
      title: "How it runs today",
      text: "Gypsum is weighed at the quarry, covered for the road, and runs through Nairobi and Kampala with our team clearing each border.",
    },
    stops: [
      { stop: "Garissa", note: "Loaded" },
      { stop: "Nairobi", note: "In transit" },
      { stop: "Malaba", note: "Cleared" },
      { stop: "Kigali", note: "Delivered" },
    ],
    photo: "gypsumTrucks",
    gallery: ["gypsumTrucks", "gypsumExcavator", "gypsumLoad", "fleetQuay"],
    strip: [
      { photo: "gypsumExcavator", caption: "At the quarry" },
      { photo: "gypsumTrucks", caption: "Loaded" },
      { photo: "highway", caption: "On the road" },
      { photo: "cementPlant", caption: "Delivery at the plant" },
    ],
    services: ["gypsum-supply", "truck-delivery"],
    path: ["Garissa", "Nairobi", "Malaba", "Kampala", "Kigali"],
  },
  {
    slug: "songea-kigali",
    from: "Songea",
    to: "Kigali",
    mode: "Truck",
    cargo: "Coal",
    km: 1900,
    countries: "Tanzania to Rwanda",
    summary: "Coal from the Songea basin north through Tanzania and across Rusumo to Kigali.",
    facts: [
      { label: "Mode", value: "Truck" },
      { label: "From", value: "Songea, Tanzania" },
      { label: "To", value: "Kigali, Rwanda" },
      { label: "Cargo", value: "Coal" },
      { label: "Distance", value: "≈ 1,900 km" },
      { label: "Border", value: "Rusumo" },
    ],
    started: {
      title: "When we started this project",
      text: "Industrial kilns in Rwanda needed coal of a steady grade, delivered on a rhythm they could plan around.",
    },
    today: {
      title: "How it runs today",
      text: "Each batch is sampled and weighed in Songea, runs north through Dodoma, clears at Rusumo and is delivered with a weighbridge ticket and proof of delivery.",
    },
    stops: [
      { stop: "Songea", note: "Loaded" },
      { stop: "Dodoma", note: "In transit" },
      { stop: "Rusumo", note: "Cleared" },
      { stop: "Kigali", note: "Delivered" },
    ],
    photo: "coalStockpile",
    gallery: ["coalStockpile", "coalHeap", "fleetYard", "cementPlant"],
    strip: [
      { photo: "coalHeap", caption: "Stockpile" },
      { photo: "fleetYard", caption: "Covered for the road" },
      { photo: "forestRoad", caption: "Heading north" },
      { photo: "cementPlant", caption: "Delivery at the plant" },
    ],
    services: ["coal-supply", "truck-delivery"],
    path: ["Songea", "Dodoma", "Rusumo", "Kigali"],
  },
];

/** Skyline order: shortest to tallest. */
export const projectsByDistance = [...projects].sort((a, b) => a.km - b.km);
export const projectBySlug = (slug: string) => projects.find((c) => c.slug === slug);
export const nextProject = (slug: string) => {
  const i = projectsByDistance.findIndex((c) => c.slug === slug);
  return projectsByDistance[(i + 1) % projectsByDistance.length];
};
export const projectName = (c: Project) => `${c.from} to ${c.to}`;
