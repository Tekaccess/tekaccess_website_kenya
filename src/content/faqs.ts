export type Faq = { q: string; a: string; tags: ("general" | "services" | "contact")[] };

// New copy in the original site's voice, built from its own phrases. TODO: confirm with the team.
export const faqs: Faq[] = [
  {
    q: "Which materials do you supply?",
    a: "Gypsum supply sourced in Garissa, Kenya; coal supply sourced in Songea, Tanzania; and clinker supply sourced in Kenya. Our extensive network with the region’s leading miners ensures a consistent and high quality supply for industrial needs.",
    tags: ["general", "services"],
  },
  {
    q: "Which countries do you deliver to?",
    a: "Regional transport to Tanzania, Rwanda, Kenya, DRC and Uganda: by truck, by ship from Gisenyi to Katana via Lake Kivu, and by train from Dodoma to Kigoma.",
    tags: ["general", "services", "contact"],
  },
  {
    q: "How do you price a load?",
    a: "Material is priced per tonne at source and transport by mode and distance. You receive one quote and, at the end, one invoice per shipment with clearing included.",
    tags: ["general", "services"],
  },
  {
    q: "Who handles customs clearing?",
    a: "Our own clearing team, so cross border supply chains run with consistency and reliability. Papers are prepared before the truck reaches the border.",
    tags: ["general", "services"],
  },
  {
    q: "What is the minimum order?",
    a: "It depends on the material and the route. Tell us the tonnage you need and we will say plainly whether we are the right fit.",
    tags: ["general", "services", "contact"],
  },
  {
    q: "How do I follow my shipment?",
    a: "Your contact updates you at every handover: loaded, at the border, cleared and delivered, with the weighbridge ticket and proof of delivery at the end.",
    tags: ["general", "services"],
  },
  {
    q: "How fast do you reply?",
    a: "Within one working day, with a price, a lead time and the name of your contact. WhatsApp & Call +250 788 320 200, available 24/7 for urgent inquiries.",
    tags: ["contact"],
  },
];

export const faqsFor = (tag: Faq["tags"][number]) => faqs.filter((f) => f.tags.includes(tag));
