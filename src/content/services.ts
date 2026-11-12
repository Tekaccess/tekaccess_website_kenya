import type { PhotoKey } from "./images";

export type Service = {
  slug: string;
  no: string;
  group: "Supply" | "Logistics";
  title: string;
  summary: string; // one line, used in rows (first clause of the original description)
  lead: string; // page head summary: original TekAccess site copy, word for word
  intro: string; // 24px overview paragraph
  howSource: { title: string; text: string };
  howReach: { title: string; text: string };
  facts: { label: string; value: string }[];
  included: string[];
  route: { stop: string; note: string }[];
  photos: PhotoKey[]; // carousel, first is the hero
  strip: { photo: PhotoKey; caption: string }[];
  projects: string[]; // project slugs this service runs on
};

const included = {
  supply: [
    "Sourcing from vetted miners",
    "Quality check at source",
    "Weighing and loading",
    "Export and import paperwork",
    "Customs clearing",
    "Truck or rail transport",
    "Transit updates at every handover",
    "Proof of delivery and one invoice",
  ],
  transport: [
    "Route and capacity planning",
    "Loading supervision",
    "Weighbridge tickets",
    "Border and customs paperwork",
    "Customs clearing",
    "Transit updates at every handover",
    "Safe, insured carriage", // TODO(real): confirm insurance cover
    "Proof of delivery and one invoice",
  ],
};

export const services: Service[] = [
  {
    slug: "gypsum-supply",
    no: "01",
    group: "Supply",
    title: "Gypsum Supply",
    summary: "Gypsum supply sourced in Garissa, Kenya.",
    lead: "Gypsum supply sourced in Garissa, Kenya — our extensive network with the region’s leading miners ensures a consistent and high-quality supply for industrial needs.",
    intro: "Our network with Garissa's leading miners keeps gypsum moving even when a single quarry slows down.",
    howSource: {
      title: "How we source it",
      text: "We buy from several established miners around Garissa rather than one, check every load at the quarry face and weigh it before it leaves. If one site slows down, another fills the order.",
    },
    howReach: {
      title: "How it reaches you",
      text: "Gypsum travels by road through Kenya and Uganda, or by rail on the Tanzanian central line where that is faster. Our clearing team handles every border, so the load arrives with its papers done.",
    },
    facts: [
      { label: "Source", value: "Garissa, Kenya" },
      { label: "Material", value: "Raw gypsum" },
      { label: "Modes", value: "Truck, rail" },
      { label: "Delivered to", value: "Rwanda, Tanzania, DRC, Uganda" },
      { label: "Used for", value: "Cement production" },
      { label: "Lead time", value: "On request" },
    ],
    included: included.supply,
    route: [
      { stop: "Garissa", note: "Loaded" },
      { stop: "Nairobi", note: "In transit" },
      { stop: "Malaba", note: "Cleared" },
      { stop: "Kigali", note: "Arrived" },
      { stop: "Your site", note: "Delivered" },
    ],
    photos: ["gypsumExcavator", "gypsumTrucks", "gypsumLoad", "gypsumRock"],
    strip: [
      { photo: "gypsumRock", caption: "At the quarry face" },
      { photo: "gypsumExcavator", caption: "Loading" },
      { photo: "gypsumTrucks", caption: "Weighed and covered" },
      { photo: "cementSilos", caption: "Delivery at the plant" },
    ],
    projects: ["garissa-kigali", "dodoma-kigoma", "gisenyi-katana"],
  },
  {
    slug: "coal-supply",
    no: "02",
    group: "Supply",
    title: "Coal Supply",
    summary: "Coal supply sourced in Songea, Tanzania.",
    lead: "Coal supply sourced in Songea, Tanzania — our extensive network with the region’s leading miners places us in the best position to deliver consistent quality and reliability to our clients.",
    intro: "Kilns cannot wait for coal. We keep stock moving from Songea so a slow week at one mine never reaches your plant.",
    howSource: {
      title: "How we source it",
      text: "We work with established miners in the Songea basin, sample each batch and weigh every truck before dispatch, so the calorific value you ordered is the one you burn.",
    },
    howReach: {
      title: "How it reaches you",
      text: "Coal moves north by road through Tanzania to the Rusumo border and on to Kigali, with our team clearing each crossing and reporting every handover.",
    },
    facts: [
      { label: "Source", value: "Songea, Tanzania" },
      { label: "Material", value: "Industrial coal" },
      { label: "Modes", value: "Truck" },
      { label: "Delivered to", value: "Rwanda, DRC, Uganda" },
      { label: "Used for", value: "Kilns and boilers" },
      { label: "Lead time", value: "On request" },
    ],
    included: included.supply,
    route: [
      { stop: "Songea", note: "Loaded" },
      { stop: "Dodoma road", note: "In transit" },
      { stop: "Rusumo", note: "Cleared" },
      { stop: "Kigali", note: "Arrived" },
      { stop: "Your site", note: "Delivered" },
    ],
    photos: ["coalPile", "coalStockpile", "coalHeap", "fleetQuay", "cementPlant"],
    strip: [
      { photo: "coalHeap", caption: "Stockpile" },
      { photo: "coalStockpile", caption: "Ready to load" },
      { photo: "fleetYard", caption: "Covered for the road" },
      { photo: "cementPlant", caption: "Delivery at the plant" },
    ],
    projects: ["songea-kigali"],
  },
  {
    slug: "clinker-supply",
    no: "03",
    group: "Supply",
    title: "Clinker Supply",
    summary: "Clinker supply sourced in Kenya.",
    lead: "Clinker supply sourced in Kenya — our extensive network with the region’s leading miners ensures a consistent and high-quality supply for industrial needs.",
    intro: "Clinker is the heart of cement. We move it from Kenyan producers to grinding plants on both sides of Lake Kivu.",
    howSource: {
      title: "How we source it",
      text: "We buy from established Kenyan producers, confirm the grade against your specification and weigh each load before it leaves.",
    },
    howReach: {
      title: "How it reaches you",
      text: "Clinker travels the northern corridor by road to Rwanda. For plants on the western shore, it crosses Lake Kivu by ship from Gisenyi to Katana.",
    },
    facts: [
      { label: "Source", value: "Kenya" },
      { label: "Material", value: "Cement clinker" },
      { label: "Modes", value: "Truck, ship" },
      { label: "Delivered to", value: "Rwanda, DRC" },
      { label: "Used for", value: "Cement grinding" },
      { label: "Lead time", value: "On request" },
    ],
    included: included.supply,
    route: [
      { stop: "Kenya", note: "Loaded" },
      { stop: "Malaba", note: "Cleared" },
      { stop: "Kigali", note: "In transit" },
      { stop: "Gisenyi", note: "Shipped" },
      { stop: "Katana", note: "Delivered" },
    ],
    photos: ["clinker", "cementSilos", "kivuBoats", "fleetFront"],
    strip: [
      { photo: "clinker", caption: "Clinker nodules" },
      { photo: "fleetFront", caption: "On the northern corridor" },
      { photo: "kivuBoats", caption: "Across Lake Kivu" },
      { photo: "cementSilos", caption: "Delivery at the plant" },
    ],
    projects: ["kenya-kigali", "gisenyi-katana"],
  },
  {
    slug: "truck-delivery",
    no: "04",
    group: "Logistics",
    title: "Trucks Delivery",
    summary: "Regional transport to Tanzania, Rwanda, Kenya, DRC and Uganda.",
    lead: "We have demonstrated operational excellence and precision logistics for large scale industrial projects. Regional transport to Tanzania, Rwanda, Kenya, DRC and Uganda, ensuring timely, secure, cost-effective and on-time deliveries to clients.",
    intro: "Our own fleet runs every one of our projects across the region, so we plan capacity instead of hoping to find it.",
    howSource: {
      title: "How we plan it",
      text: "Each load gets a route, a truck and a driver before it is collected. We check axle loads at the weighbridge and keep paperwork ready for every border on the way.",
    },
    howReach: {
      title: "How it reaches you",
      text: "Trucks report at each handover: loaded, at the border, cleared, arrived. You hear from one contact, not from five subcontractors.",
    },
    facts: [
      { label: "Fleet", value: "Shacman tractor units" },
      { label: "Countries", value: "TZ, RW, KE, DRC, UG" },
      { label: "Cargo", value: "Bulk and bagged" },
      { label: "Borders", value: "Cleared in-house" },
      { label: "Updates", value: "At every handover" },
      { label: "Lead time", value: "On request" },
    ],
    included: included.transport,
    route: [
      { stop: "Pickup", note: "Loaded" },
      { stop: "Weighbridge", note: "Checked" },
      { stop: "Border", note: "Cleared" },
      { stop: "Destination", note: "Arrived" },
      { stop: "Your site", note: "Delivered" },
    ],
    photos: ["fleetRow", "truckDeliveries", "fleetQuay", "fleetFront", "fleetYard"],
    strip: [
      { photo: "fleetCab", caption: "Our own fleet" },
      { photo: "truckLoading", caption: "Loading" },
      { photo: "fleetQuay", caption: "Ready to roll" },
      { photo: "hillsRoad", caption: "On the road" },
    ],
    projects: ["songea-kigali", "garissa-kigali", "kenya-kigali", "kigali-goma"],
  },
  {
    slug: "ship-delivery",
    no: "05",
    group: "Logistics",
    title: "Ship Delivery",
    summary: "Gisenyi to Katana via Lake Kivu.",
    lead: "We supplied clinker and gypsum through reliable ship deliveries from Gisenyi to Katana via Lake Kivu, ensuring steady support for cement production. This business demonstrated our capability to manage cross-border supply chains with consistency and reliability.",
    intro: "Across Lake Kivu the water is the shortest road. We run the crossing so cement plants on the far shore never run short.",
    howSource: {
      title: "How we plan it",
      text: "Loads arrive at Gisenyi by road, are weighed and transferred to the vessel, and cross to Katana on a fixed schedule agreed with the plant.",
    },
    howReach: {
      title: "How it reaches you",
      text: "At Katana our team clears the cargo and hands it to the plant with the delivery papers, so the crossing is one service, not three.",
    },
    facts: [
      { label: "Route", value: "Gisenyi → Katana" },
      { label: "Crossing", value: "Lake Kivu" },
      { label: "Cargo", value: "Clinker, gypsum" },
      { label: "Client", value: "Cement production" },
      { label: "Borders", value: "Rwanda → DRC" },
      { label: "Lead time", value: "On request" },
    ],
    included: included.transport,
    route: [
      { stop: "Gisenyi quay", note: "Loaded" },
      { stop: "Lake Kivu", note: "On the water" },
      { stop: "Katana port", note: "Cleared" },
      { stop: "Cement plant", note: "Delivered" },
    ],
    photos: ["shipKivu", "kivuBoats", "kivuHills", "kivuCoast", "cementSilos"],
    strip: [
      { photo: "kivuCoast", caption: "Gisenyi shore" },
      { photo: "kivuBoats", caption: "Loading the vessel" },
      { photo: "kivuIsland", caption: "On the lake" },
      { photo: "cementSilos", caption: "Delivery at the plant" },
    ],
    projects: ["gisenyi-katana"],
  },
  {
    slug: "train-delivery",
    no: "06",
    group: "Logistics",
    title: "Train Delivery",
    summary: "Gypsum transport by train from Dodoma to Kigoma, Tanzania.",
    lead: "Under our framework business, we manage efficient gypsum transport by train from Dodoma to Kigoma, Tanzania, ensuring reliable and consistent delivery to support cement manufacturing requirements.",
    intro: "For heavy, steady volumes, rail beats road. We book the wagons, load them and meet them at Kigoma.",
    howSource: {
      title: "How we plan it",
      text: "We secure wagon capacity on the central line, supervise loading at Dodoma and keep the consignment notes in order for the whole run.",
    },
    howReach: {
      title: "How it reaches you",
      text: "At Kigoma our trucks collect the gypsum from the railhead and carry it the last miles to the plant, with one invoice for the whole move.",
    },
    facts: [
      { label: "Route", value: "Dodoma → Kigoma" },
      { label: "Line", value: "Tanzania central line" },
      { label: "Cargo", value: "Gypsum" },
      { label: "Client", value: "Cement manufacturing" },
      { label: "Last mile", value: "By our trucks" },
      { label: "Lead time", value: "On request" },
    ],
    included: included.transport,
    route: [
      { stop: "Dodoma", note: "Loaded" },
      { stop: "Tabora", note: "In transit" },
      { stop: "Kigoma", note: "Railhead" },
      { stop: "Your site", note: "Delivered" },
    ],
    photos: ["trainWagons", "railYard", "gypsumTrucks", "gypsumLoad", "cementPlant"],
    strip: [
      { photo: "railYard", caption: "Wagons at the yard" },
      { photo: "gypsumLoad", caption: "Loaded and covered" },
      { photo: "forestRoad", caption: "The last miles" },
      { photo: "cementPlant", caption: "Delivery at the plant" },
    ],
    projects: ["dodoma-kigoma"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const nextService = (slug: string) => {
  const i = services.findIndex((s) => s.slug === slug);
  return services[(i + 1) % services.length];
};

export const whatsIncluded = [
  { icon: "BadgeCheck", title: "Vetted miners", text: "The region’s leading miners, checked before we buy." },
  { icon: "Microscope", title: "Quality checks", text: "Every load sampled against your specification." },
  { icon: "Scale", title: "Weighing and paperwork", text: "Weighbridge tickets and documents for every truck." },
  { icon: "ShieldCheck", title: "Customs clearing", text: "Our own clearing team at every border." },
  { icon: "MapPin", title: "Updates at each handover", text: "Loaded, crossed, cleared, arrived. Seamless visibility." },
  { icon: "FileCheck2", title: "Proof of delivery", text: "Signed delivery notes and one invoice per shipment." },
] as const;

export const process = [
  { no: "1", title: "Request", text: "Tell us the material, the tonnage and the destination." },
  { no: "2", title: "Quote", text: "A tailored price and lead time within one working day." },
  { no: "3", title: "Move", text: "Sourced, loaded, shipped and cleared with precision." },
  { no: "4", title: "Deliver", text: "Timely, secure and on-time delivery, with one invoice." },
];
