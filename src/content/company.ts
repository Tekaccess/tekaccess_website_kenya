import type { PhotoKey } from "./images";

// Figures shown on Home and About. TODO(real): "500+" needs a confirmed unit.
export const figures = [
  { value: "2019", label: "Founded in Kigali" },
  { value: "5", label: "Countries served" },
  { value: "3", label: "Transport modes" },
  { value: "500+", label: "Deliveries" },
];

export const institutions = [
  { name: "CHUK", note: "Infection-prevention supplies", logo: "/images/partners/chuk.webp" },
  { name: "CHUB", note: "Infection-prevention supplies", logo: "/images/partners/chub.webp" },
  { name: "EDCL", note: "Hot-water solutions", logo: "/images/partners/edcl.webp" },
  { name: "Rwanda Agriculture Board", note: "Machinery and chemicals", logo: "/images/partners/rab.webp" },
  { name: "Rwanda National Police", note: "Supply partner", logo: "/images/partners/rnp.webp" },
  { name: "REMA", note: "Supply partner", logo: "/images/partners/rema.webp" },
  { name: "Nyaruguru District", note: "Supply partner", logo: "/images/partners/nyaruguru.webp" },
  { name: "Cheetah", note: "Supply partner", logo: "/images/partners/cheetah.webp" },
];

export const journey: { title: string; text: string; photo: PhotoKey }[] = [
  { title: "Sourcing", text: "Vetted miners in Garissa, Songea and Kenya.", photo: "gypsumExcavator" },
  { title: "Loading", text: "Weighed, sampled and documented.", photo: "truckLoading" },
  { title: "Transit", text: "By truck, ship or rail.", photo: "fleetQuay" },
  { title: "Clearing", text: "Customs handled by our own team.", photo: "railYard" },
  { title: "Delivery", text: "Proof of delivery and one invoice.", photo: "cementSilos" },
];

export const rules = [
  { title: "One contact per client", text: "You have a name and a direct line, not a queue. If your contact is away, a manager answers." },
  { title: "Costs shown at cost", text: "Supply, transport and clearing itemised on one invoice. Nothing added on the way." },
  { title: "Numbers you can check", text: "Every figure we report has a weighbridge ticket or a document behind it." },
]; // TODO(real): confirm these commitments

export const story = {
  lead: "Founded on integrity and excellence, we started with one corridor and one promise: every load arrives, and every client knows who to call.",
  body: [
    "From import to final delivery, TekAccess modernises logistics with reliable transport that connects businesses across Rwanda and beyond.",
    "Today we source gypsum, coal and clinker for cement and industrial plants, and move them by road, lake and rail across five countries, still run from one office in Kigali.",
  ],
  vision: "To drive growth and excellence, creating solutions that enrich lives and deliver lasting value.",
  mission: "To be a trusted partner delivering timely and efficient solutions, with integrity and conscious practices.",
};
