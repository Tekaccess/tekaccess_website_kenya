export type Faq = { q: string; a: string; tags: ("general" | "services" | "contact")[] };

// TODO(real): answers drafted from the current site's facts; confirm with the team.
export const faqs: Faq[] = [
  {
    q: "Which materials do you supply?",
    a: "Gypsum sourced in Garissa, Kenya; coal from Songea, Tanzania; and clinker from Kenyan producers. All three are bought from established miners and checked before loading.",
    tags: ["general", "services"],
  },
  {
    q: "Which countries do you deliver to?",
    a: "Rwanda, Tanzania, Kenya, the Democratic Republic of Congo and Uganda, by truck, by ship across Lake Kivu, and by rail on Tanzania's central line.",
    tags: ["general", "services", "contact"],
  },
  {
    q: "How do you price a load?",
    a: "Material is priced per tonne at source and transport by mode and distance. You receive one quote and, at the end, one invoice per shipment with clearing included.",
    tags: ["general", "services"],
  },
  {
    q: "Who handles customs clearing?",
    a: "Our own clearing team. Papers are prepared before the truck reaches the border, and you hear from us when each crossing is done.",
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
    a: "Within one working day, with a price, a lead time and the name of your contact. For urgent loads, call or WhatsApp +250 788 320 200 at any hour.",
    tags: ["contact"],
  },
];

export const faqsFor = (tag: Faq["tags"][number]) => faqs.filter((f) => f.tags.includes(tag));
