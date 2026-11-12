// TekAccess photos and free Unsplash images.
// Each entry: responsive WebP widths, intrinsic size, alt text and average colour (loading placeholder).
export type Photo = { base: string; widths: number[]; width: number; height: number; alt: string; color: string };

export const photos = {
  "fleetRow": {
    "base": "/images/fleet/fleetRow",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "A row of TekAccess Shacman trucks parked in the yard",
    "color": "#9ca5b5"
  },
  "fleetFront": {
    "base": "/images/fleet/fleetFront",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "TekAccess trucks lined up, seen from the front",
    "color": "#99a5b9"
  },
  "fleetQuay": {
    "base": "/images/fleet/fleetQuay",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "TekAccess trucks lined up along a loading quay",
    "color": "#9eadbe"
  },
  "fleetYard": {
    "base": "/images/fleet/fleetYard",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "TekAccess tractor units with covered trailers",
    "color": "#96a6ba"
  },
  "fleetCab": {
    "base": "/images/fleet/fleetCab",
    "widths": [
      400,
      480
    ],
    "width": 480,
    "height": 360,
    "alt": "A close view of a TekAccess truck cab",
    "color": "#92989f"
  },
  "fleetSide": {
    "base": "/images/fleet/fleetSide",
    "widths": [
      400,
      480
    ],
    "width": 480,
    "height": 360,
    "alt": "A TekAccess tractor unit and trailer",
    "color": "#97a3af"
  },
  "railYard": {
    "base": "/images/operations/railYard",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "Freight wagons on the railway in Tanzania",
    "color": "#7f838a"
  },
  "gypsumTrucks": {
    "base": "/images/operations/gypsumTrucks",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "Trucks loaded with bagged gypsum at the quarry",
    "color": "#a7a396"
  },
  "gypsumExcavator": {
    "base": "/images/operations/gypsumExcavator",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "Excavator loading gypsum onto a truck",
    "color": "#6f7e8a"
  },
  "gypsumRock": {
    "base": "/images/operations/gypsumRock",
    "widths": [
      400,
      640,
      810
    ],
    "width": 810,
    "height": 1080,
    "alt": "Raw gypsum rock held in hand",
    "color": "#877870"
  },
  "gypsumLoad": {
    "base": "/images/operations/gypsumLoad",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 607,
    "alt": "A covered gypsum load on a TekAccess truck",
    "color": "#82807d"
  },
  "truckLoading": {
    "base": "/images/operations/truckLoading",
    "widths": [
      400,
      640,
      768
    ],
    "width": 768,
    "height": 1024,
    "alt": "Material being loaded into a truck trailer",
    "color": "#8c8a88"
  },
  "coalStockpile": {
    "base": "/images/operations/coalStockpile",
    "widths": [
      400,
      640,
      750
    ],
    "width": 750,
    "height": 1000,
    "alt": "A dark coal stockpile at the yard",
    "color": "#747883"
  },
  "coalHeap": {
    "base": "/images/operations/coalHeap",
    "widths": [
      400,
      640,
      750
    ],
    "width": 750,
    "height": 1000,
    "alt": "Coal heaped and ready for loading",
    "color": "#747883"
  },
  "clinker": {
    "base": "/images/operations/clinker",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "Grey clinker nodules close up",
    "color": "#81786f"
  },
  "office": {
    "base": "/images/operations/office",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "The TekAccess office in Kigali",
    "color": "#7f827d"
  },
  "chukSupplies": {
    "base": "/images/blog/chukSupplies",
    "widths": [
      400,
      640,
      756
    ],
    "width": 756,
    "height": 1008,
    "alt": "Infection prevention supplies delivered to CHUK",
    "color": "#716a63"
  },
  "edclHotWater": {
    "base": "/images/blog/edclHotWater",
    "widths": [
      400,
      640,
      810
    ],
    "width": 810,
    "height": 1080,
    "alt": "A solar water heater installed on a Rwandan home",
    "color": "#837468"
  },
  "labChemicals": {
    "base": "/images/blog/labChemicals",
    "widths": [
      400,
      540
    ],
    "width": 540,
    "height": 360,
    "alt": "Laboratory chemicals stacked for delivery",
    "color": "#708393"
  },
  "schoolFeeding": {
    "base": "/images/blog/schoolFeeding",
    "widths": [
      400,
      640,
      960
    ],
    "width": 960,
    "height": 540,
    "alt": "Pupils sharing a school meal",
    "color": "#6a6467"
  },
  "rabMachinery": {
    "base": "/images/blog/rabMachinery",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "A power tiller delivered to RAB",
    "color": "#98765c"
  },
  "kwibukaTeam": {
    "base": "/images/blog/kwibukaTeam",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "The TekAccess team at the memorial during Kwibuka 32",
    "color": "#7f7767"
  },
  "kwibukaGroup": {
    "base": "/images/blog/kwibukaGroup",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "The TekAccess team standing together for Kwibuka 32",
    "color": "#837970"
  },
  "kwibukaGroup2": {
    "base": "/images/blog/kwibukaGroup2",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "The team in quiet remembrance, April 2026",
    "color": "#6f6150"
  },
  "kivuBoats": {
    "base": "/images/projects/kivuBoats",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1114,
    "alt": "Boats moored on the shore of Lake Kivu",
    "color": "#cbbeae"
  },
  "kivuCoast": {
    "base": "/images/projects/kivuCoast",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1500,
    "alt": "The road along the Lake Kivu shore",
    "color": "#868b8f"
  },
  "kivuHills": {
    "base": "/images/projects/kivuHills",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1500,
    "alt": "Lake Kivu framed by hills",
    "color": "#8999a0"
  },
  "kivuIsland": {
    "base": "/images/projects/kivuIsland",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333,
    "alt": "Mist over an island on Lake Kivu",
    "color": "#94948e"
  },
  "cementSilos": {
    "base": "/images/projects/cementSilos",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1500,
    "alt": "Cement plant silos and conveyor",
    "color": "#557489"
  },
  "cementPlant": {
    "base": "/images/projects/cementPlant",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333,
    "alt": "A cement plant under a cloudy sky",
    "color": "#909f96"
  },
  "roadJunction": {
    "base": "/images/projects/roadJunction",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333,
    "alt": "A quiet rural road winding through green hills",
    "color": "#a3a99c"
  },
  "hillsRoad": {
    "base": "/images/projects/hillsRoad",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333,
    "alt": "Green hills and valleys seen from the road",
    "color": "#82826f"
  },
  "forestRoad": {
    "base": "/images/projects/forestRoad",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333,
    "alt": "A paved road through dense forest",
    "color": "#2e4e36"
  },
  "highway": {
    "base": "/images/projects/highway",
    "widths": [
      400,
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1500,
    "alt": "A highway at the edge of town under a blue sky",
    "color": "#869499"
  },

  "erpIntro": {
    "base": "/images/blog/erp/erpIntro",
    "widths": [
      400,
      640,
      1024
    ],
    "width": 1024,
    "height": 683,
    "alt": "The TekAccess media wall lit for the ERP launch celebration",
    "color": "#b3a2ac"
  },
  "erpFeature": {
    "base": "/images/blog/erp/erpFeature",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 2000,
    "alt": "A speaker opening the TekAccess ERP launch celebration",
    "color": "#41443a"
  },
  "erpGallery01": {
    "base": "/images/blog/erp/erpGallery01",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Three guests at the TekAccess media wall, in black and white",
    "color": "#a7a7a7"
  },
  "erpGallery02": {
    "base": "/images/blog/erp/erpGallery02",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Guests in evening wear at the TekAccess media wall",
    "color": "#af968d"
  },
  "erpGallery03": {
    "base": "/images/blog/erp/erpGallery03",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Guests arriving at the celebration",
    "color": "#78685c"
  },
  "erpGallery04": {
    "base": "/images/blog/erp/erpGallery04",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Guests in conversation, in black and white",
    "color": "#4a4a4a"
  },
  "erpGallery05": {
    "base": "/images/blog/erp/erpGallery05",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Three guests at the TekAccess media wall",
    "color": "#b28e78"
  },
  "erpGallery06": {
    "base": "/images/blog/erp/erpGallery06",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 2000,
    "alt": "A guest dancing, in black and white",
    "color": "#444444"
  },
  "erpGallery07": {
    "base": "/images/blog/erp/erpGallery07",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "A speaker at the podium in front of a TekAccess truck banner",
    "color": "#6d7870"
  },
  "erpGallery08": {
    "base": "/images/blog/erp/erpGallery08",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Guests in conversation at the celebration",
    "color": "#6f5948"
  },
  "erpGallery09": {
    "base": "/images/blog/erp/erpGallery09",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Guests seated at the tables, in black and white",
    "color": "#656565"
  },
  "erpGallery10": {
    "base": "/images/blog/erp/erpGallery10",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "A group of guests at the celebration",
    "color": "#7e6049"
  },
  "erpGallery11": {
    "base": "/images/blog/erp/erpGallery11",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 2000,
    "alt": "A guest speaking at the podium",
    "color": "#4b493d"
  },
  "erpGallery12": {
    "base": "/images/blog/erp/erpGallery12",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "The event hall set up for the celebration",
    "color": "#574f47"
  },
  "erpGallery13": {
    "base": "/images/blog/erp/erpGallery13",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Two guests in conversation",
    "color": "#9c807c"
  },
  "erpGallery14": {
    "base": "/images/blog/erp/erpGallery14",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "The TekAccess team at the media wall",
    "color": "#9f8d8b"
  },
  "erpGallery15": {
    "base": "/images/blog/erp/erpGallery15",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Guests gathered at the media wall",
    "color": "#8e6e64"
  },
  "erpGallery16": {
    "base": "/images/blog/erp/erpGallery16",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Three guests at the TekAccess media wall",
    "color": "#909796"
  },
  "erpGallery17": {
    "base": "/images/blog/erp/erpGallery17",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Four guests at the TekAccess media wall",
    "color": "#999286"
  },
  "erpGallery18": {
    "base": "/images/blog/erp/erpGallery18",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Two guests at the TekAccess media wall",
    "color": "#b1afa8"
  },
  "erpGallery19": {
    "base": "/images/blog/erp/erpGallery19",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1067,
    "alt": "Three guests at the TekAccess media wall",
    "color": "#8f8e8c"
  },
  "erpGallery20": {
    "base": "/images/blog/erp/erpGallery20",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Three guests at the TekAccess media wall",
    "color": "#b0a9a4"
  },
  "erpGallery21": {
    "base": "/images/blog/erp/erpGallery21",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "A presentation during the celebration",
    "color": "#64513f"
  },
  "erpGallery22": {
    "base": "/images/blog/erp/erpGallery22",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Four guests at the celebration",
    "color": "#806349"
  },
  "erpGallery23": {
    "base": "/images/blog/erp/erpGallery23",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Three guests in evening wear",
    "color": "#5d5d4a"
  },
  "erpGallery24": {
    "base": "/images/blog/erp/erpGallery24",
    "widths": [
      400,
      640,
      1024,
      1600
    ],
    "width": 1600,
    "height": 1280,
    "alt": "Two guests at the TekAccess media wall",
    "color": "#beafa2"
  },
  "communityImpact": {
    "base": "/images/blog/communityImpact",
    "widths": [
      400,
      640,
      1024,
      1050
    ],
    "width": 1050,
    "height": 1091,
    "alt": "Community impact: TekAccess teams working with local communities",
    "color": "#a3a1a4"
  },
  "edclSolarHeaters": {
    "base": "/images/blog/edclSolarHeaters",
    "widths": [
      400,
      640,
      1024,
      1133
    ],
    "width": 1133,
    "height": 1175,
    "alt": "Solar water heaters installed on Rwandan homes",
    "color": "#b2afb2"
  },
  "truckDeliveries": {
    "base": "/images/operations/truckDeliveries",
    "widths": [
      400,
      640,
      1024,
      1162
    ],
    "width": 1162,
    "height": 1204,
    "alt": "TekAccess trucks on regional deliveries",
    "color": "#aaa9ac"
  },
  "shipKivu": {
    "base": "/images/operations/shipKivu",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 809,
    "alt": "A cargo vessel on Lake Kivu",
    "color": "#838384"
  },
  "trainWagons": {
    "base": "/images/operations/trainWagons",
    "widths": [
      400,
      640,
      1024,
      1080
    ],
    "width": 1080,
    "height": 810,
    "alt": "Gypsum wagons on the railway in Tanzania",
    "color": "#707377"
  },
  "coalPile": {
    "base": "/images/operations/coalPile",
    "widths": [
      400,
      640,
      1000
    ],
    "width": 1000,
    "height": 750,
    "alt": "A stockpile of coal ready for loading",
    "color": "#7c8086"
  }
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
