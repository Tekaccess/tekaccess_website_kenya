import type { PhotoKey } from "./images";

// Figures shown on Home and About. TODO(real): "500+" needs a confirmed unit.
export const figures = [
  { value: "2019", label: "Founded in Kigali" },
  { value: "5", label: "Countries served" },
  { value: "3", label: "Transport modes" },
  { value: "500+", label: "Impact" },
];

export const institutions = [
  { name: "CHUK", note: "Infection-prevention supplies", logo: "/images/partners/chuk.webp" },
  { name: "CHUB", note: "Infection-prevention supplies", logo: "/images/partners/chub.webp" },
  { name: "EDCL", note: "Hot-water solutions", logo: "/images/partners/edcl.webp" },
  { name: "RAB", note: "Machinery and chemicals", logo: "/images/partners/rab.webp" },
  { name: "Rwanda National Police", note: "Supply partner", logo: "/images/partners/rnp.webp" },
  { name: "REMA", note: "Supply partner", logo: "/images/partners/rema.webp" },
  { name: "Nyaruguru", note: "Supply partner", logo: "/images/partners/nyaruguru.webp" },
  { name: "Cheetah", note: "Supply partner", logo: "/images/partners/cheetah.webp" },
];

export const journey: { title: string; text: string; photo: PhotoKey }[] = [
  { title: "Sourcing", text: "Sourced through our extensive network with the region’s leading miners in Garissa, Songea and Kenya.", photo: "gypsumExcavator" },
  { title: "Loading", text: "Weighed, sampled and documented with precision before every departure.", photo: "truckLoading" },
  { title: "Transit", text: "Reliable transport by truck, ship or train across Tanzania, Rwanda, Kenya, DRC and Uganda.", photo: "fleetQuay" },
  { title: "Clearing", text: "Cross-border clearing managed by our own team, with consistency and reliability.", photo: "railYard" },
  { title: "Delivery", text: "Timely, secure, cost-effective and on-time delivery to the client.", photo: "cementSilos" },
];

// New copy in the original site's voice (no source text exists for these).
export const rules = [
  { title: "One Trusted Contact", text: "Every client is served by a dedicated contact, ensuring seamless communication from sourcing to final delivery." },
  { title: "Transparent Costs", text: "Supply, transport and clearing are itemised on one invoice, with integrity at every step of the supply chain." },
  { title: "Precision You Can Verify", text: "Every figure we report is backed by a weighbridge ticket or a document, because trust is built on precision." },
];

// Story, vision and mission: original TekAccess site copy (AboutUs.tsx).
export const story = {
  label: "Since 2019",
  lead: "Driving Logistics",
  accent: "Excellence",
  tail: "Across Rwanda.",
  intro: "Founded on integrity and excellence, TekAccess is a trusted logistics and transport solutions provider specializing in high-performance supply chain operations.",
  storyTitle: "Our Story",
  story: "From import to final delivery, we modernize logistics operations with reliable transport solutions that connect businesses across Rwanda and beyond.",
  vision: "To drive growth and excellence, creating solutions that enrich lives and deliver lasting value.",
  // Original copy; "partner delivery" corrected to "partner delivering".
  mission: "To be a trusted partner delivering timely and efficient solutions with integrity and conscious practices.",
};
