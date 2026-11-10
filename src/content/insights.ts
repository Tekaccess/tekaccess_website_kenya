import type { PhotoKey } from "./images";

export type Category = "Community" | "Deliveries" | "Partnerships" | "Operations";
export const categories: Category[] = ["Deliveries", "Partnerships", "Community", "Operations"];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "img"; photo: PhotoKey; caption?: string }
  | { type: "quote"; text: string }
  | { type: "tags"; text: string };

export type Insight = {
  slug: string;
  title: string;
  category: Category;
  date: number; // ms
  author: string;
  excerpt: string;
  cover?: PhotoKey;
  coverUrl?: string; // Firestore posts carry a URL instead of a local photo
  coverCaption?: string;
  blocks?: Block[];
  html?: string; // Firestore posts
  readMinutes: number;
  /** Drop this built-in post when a Firestore post title contains any of these words. */
  supersededBy?: string[];
};

const d = (s: string) => new Date(s).getTime();

// Static posts. Kwibuka 32 is the published article; the five project notes are short
// write-ups of deliveries pictured on the current site. TODO(real): dates and fuller text.
export const staticInsights: Insight[] = [
  {
    slug: "kwibuka-32",
    title: "Kwibuka 32: A journey of remembrance and resilience",
    category: "Community",
    date: d("2026-04-15"),
    author: "TekAccess Team",
    excerpt:
      "As Rwanda marks the 32nd commemoration of the 1994 Genocide against the Tutsi, our team joined the nation in honouring those lost.",
    cover: "kwibukaTeam",
    coverCaption: "Our team at the Kigali Genocide Memorial, April 2026.",
    readMinutes: 3,
    blocks: [
      {
        type: "p",
        text: "As Rwanda marks the 32nd commemoration of the 1994 Genocide against the Tutsi, the TekAccess team joined the nation in honouring the memory of those lost and reflecting on the journey of reconstruction and unity.",
      },
      {
        type: "p",
        text: "Kwibuka, which means “to remember”, is a time for us to pause and pay tribute to the more than one million lives taken during the 100 days. It is also a time to recognise the resilience of the Rwandan people and the progress our country has made in rebuilding its social fabric and economy.",
      },
      { type: "img", photo: "kwibukaGroup", caption: "The TekAccess team at the memorial." },
      { type: "h2", text: "Our visit to the memorial" },
      {
        type: "p",
        text: "During this period of reflection, our team visited the Kigali Genocide Memorial to lay wreaths and pay our respects. Standing at the site where more than 250,000 victims are laid to rest, we were reminded of “Never Again” and the responsibility we all share in building a peaceful and prosperous future.",
      },
      {
        type: "p",
        text: "At TekAccess, we believe that development and business cannot thrive without a foundation of peace, unity and social responsibility. Our commitment to Rwanda goes beyond logistics; it is rooted in being part of a community that values every human life.",
      },
      { type: "quote", text: "Remembrance is not just about looking back. It is about honouring the past to build a better future together." },
      { type: "img", photo: "kwibukaGroup2", caption: "In quiet remembrance, April 2026." },
      { type: "h2", text: "Building a brighter future" },
      {
        type: "p",
        text: "Today, Rwanda stands as a beacon of hope and transformation. The progress seen in every sector is a testament to the strength of a united people. We are proud to contribute to this transformation and remain dedicated to our role in Rwanda's continued development.",
      },
      {
        type: "p",
        text: "As we remember, we renew our commitment to integrity, excellence and community. We stand with the survivors and honour the memory of the victims by striving for a world where such atrocities never happen again.",
      },
      { type: "tags", text: "#Kwibuka32  #RememberUniteRenew" },
    ],
  },
  {
    slug: "infection-prevention-supplies-chuk-chub",
    title: "Delivering infection-prevention supplies to CHUK and CHUB",
    category: "Deliveries",
    date: d("2026-03-10"),
    author: "TekAccess Team",
    excerpt: "Hospital supplies need the same care as any industrial load: the right quantities, the right papers, on the day promised.",
    cover: "chukSupplies",
    readMinutes: 2,
    blocks: [
      {
        type: "p",
        text: "TekAccess delivered infection-prevention supplies to the University Teaching Hospitals of Kigali (CHUK) and Butare (CHUB). Health logistics leaves no room for a missing carton, so every consignment was counted at loading and signed for on arrival.",
      },
      { type: "h2", text: "Why it matters" },
      { type: "p", text: "Infection prevention depends on supplies being on the shelf before they are needed. Our job was to make sure they were." },
    ],
  },
  {
    slug: "hot-water-solutions-edcl",
    supersededBy: ["edcl", "hot water"],
    title: "Sustainable hot water for homes with EDCL",
    category: "Partnerships",
    date: d("2026-02-12"),
    author: "TekAccess Team",
    excerpt: "Working with Energy Development Corporation Limited to bring solar hot-water systems to Rwandan homes.",
    cover: "edclHotWater",
    readMinutes: 2,
    blocks: [
      {
        type: "p",
        text: "In partnership with Energy Development Corporation Limited (EDCL), TekAccess supplied solar water heaters for households, combining procurement and delivery so installers received complete kits on site.",
      },
      { type: "p", text: "Each delivery was scheduled with the installation teams, so equipment arrived ready to fit rather than waiting in storage." },
    ],
  },
  {
    slug: "laboratory-chemicals-research",
    title: "High-quality laboratory chemicals for Rwandan research",
    category: "Deliveries",
    date: d("2026-01-20"),
    author: "TekAccess Team",
    excerpt: "Sourcing and moving laboratory chemicals with the documentation and handling they require.",
    cover: "labChemicals",
    readMinutes: 2,
    blocks: [
      {
        type: "p",
        text: "Research laboratories need chemicals of a known grade, with safety data and correct packaging. TekAccess sourced and delivered laboratory chemicals with full documentation, handled to the standards they require.",
      },
    ],
  },
  {
    slug: "nourishing-rwandas-future",
    supersededBy: ["nourishing"],
    title: "Nourishing Rwanda's future",
    category: "Community",
    date: d("2025-12-08"),
    author: "TekAccess Team",
    excerpt: "Supporting school feeding, because a full plate is where learning starts.",
    cover: "schoolFeeding",
    readMinutes: 2,
    blocks: [
      {
        type: "p",
        text: "TekAccess supported a school feeding initiative, delivering food supplies so pupils could share a meal at school. It is a small part of our commitment to the communities we work in.",
      },
    ],
  },
  {
    slug: "agriculture-machinery-rab",
    title: "Agriculture machinery and chemicals for RAB",
    category: "Partnerships",
    date: d("2025-11-14"),
    author: "TekAccess Team",
    excerpt: "Supplying machinery and chemicals to the Rwanda Agriculture and Animal Resources Development Board.",
    cover: "rabMachinery",
    readMinutes: 2,
    blocks: [
      {
        type: "p",
        text: "TekAccess supplied agricultural machinery, including power tillers, and farm chemicals to the Rwanda Agriculture and Animal Resources Development Board (RAB), delivered and handed over ready for use.",
      },
    ],
  },
];
