import type { PhotoKey } from "./images";

export type Category = "Milestones" | "Community" | "Deliveries" | "Partnerships" | "Operations";
export const categories: Category[] = ["Milestones", "Deliveries", "Partnerships", "Community", "Operations"];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "img"; photo: PhotoKey; caption?: string }
  | { type: "quote"; text: string }
  | { type: "tags"; text: string }
  | { type: "gallery"; photos: PhotoKey[] };

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
  /** Firestore posts whose title contains any of these words are this post; the built-in copy is shown instead. */
  supersededBy?: string[];
};

const d = (s: string) => new Date(s).getTime();

// Static posts. ERP launch, Kwibuka 32, Community impact, EDCL and Nourishing are the original
// posts word for word; CHUK, lab chemicals and RAB are new write-ups of photos from the old site.
export const staticInsights: Insight[] = [
  {
    // Original post, word for word (live tekaccess.rw build, static post "tekaccess-erp-launch").
    slug: "tekaccess-erp-launch",
    title: "Celebrating Progress, Innovation & the Road Ahead",
    category: "Milestones",
    date: d("2026-10-07"),
    author: "Tekaccess Team",
    excerpt: "Tekaccess celebrates a new chapter with the launch of the Tekaccess ERP and milestones.",
    cover: "erpIntro",
    readMinutes: 3,
    blocks: [
      {
        "type": "p",
        "text": "Tekaccess celebrates a new chapter with the launch of the Tekaccess ERP and milestones."
      },
      {
        "type": "img",
        "photo": "erpFeature"
      },
      {
        "type": "p",
        "text": "What started as a vision to build a more connected, efficient, and scalable operation has grown into a company continuously pushing forward, strengthening its systems, expanding its operations, and building the foundation for the future."
      },
      {
        "type": "p",
        "text": "The launch of Tekaccess ERP marks an important step in that journey."
      },
      {
        "type": "p",
        "text": "Designed to connect key areas of the business, from finance and fleet operations to procurement, human resources, sales, and field operations, the ERP brings information and processes together in one integrated system. It gives teams greater visibility, supports faster decision-making, and creates a stronger foundation for managing a growing business."
      },
      {
        "type": "p",
        "text": "But the day was about more than a new system."
      },
      {
        "type": "p",
        "text": "It was about celebrating the people, progress, and milestones that brought Tekaccess to this point."
      },
      {
        "type": "gallery",
        "photos": [
          "erpGallery01",
          "erpGallery02",
          "erpGallery03",
          "erpGallery04",
          "erpGallery05",
          "erpGallery06",
          "erpGallery07",
          "erpGallery08",
          "erpGallery09",
          "erpGallery10",
          "erpGallery11",
          "erpGallery12",
          "erpGallery13",
          "erpGallery14",
          "erpGallery15",
          "erpGallery16",
          "erpGallery17",
          "erpGallery18",
          "erpGallery19",
          "erpGallery20",
          "erpGallery21",
          "erpGallery22",
          "erpGallery23",
          "erpGallery24"
        ]
      },
      {
        "type": "p",
        "text": "From strengthening our operations to expanding our reach across markets, every milestone represents the collective effort of our teams and the vision that continues to drive the company forward."
      },
      {
        "type": "p",
        "text": "As we celebrate this achievement, we remain focused on what comes next: building stronger systems, expanding into new markets, and creating a more connected and efficient future for Tekaccess."
      },
      {
        "type": "p",
        "text": "Here's to the journey so far and to everything still ahead."
      },
      {
        "type": "p",
        "text": "Tekaccess Group\nBuilding the Future."
      }
    ],
  },
  {
    // Original post, word for word (Firestore blogs/WfjTgckGDIdR2EOtyNc4).
    slug: "community-impact",
    supersededBy: ["community impact"],
    title: "COMMUNITY IMPACT",
    category: "Community",
    date: d("2026-01-21"),
    author: "Tekaccess Team",
    excerpt: "Committed to giving back, TEKACCESS supports local communities through sustainable practices, job creation, and empowerment initiatives.",
    cover: "communityImpact",
    readMinutes: 1,
    blocks: [
      { type: "p", text: "Committed to giving back, TEKACCESS supports local communities through sustainable practices, job creation, and empowerment initiatives." },
    ],
  },
  {
    slug: "kwibuka-32",
    title: "Kwibuka 32: A Journey of Remembrance and Resilience",
    category: "Community",
    date: d("2026-04-15"),
    author: "Tekaccess Team",
    excerpt: "As Rwanda marks the 32nd commemoration of the 1994 Genocide against the Tutsi, the Tekaccess team joined the nation in honoring the memory of those lost and reflecting on the journey of reconstruction and unity.",
    cover: "kwibukaTeam",
    coverCaption: "Tekaccess Team at Memorial",
    readMinutes: 3,
    // Original article, word for word (Tekaccess1 staticBlogs.ts).
    blocks: [
      {
            "type": "p",
            "text": "As Rwanda marks the 32nd commemoration of the 1994 Genocide against the Tutsi, the Tekaccess team joined the nation in honoring the memory of those lost and reflecting on the journey of reconstruction and unity."
      },
      {
            "type": "p",
            "text": "Kwibuka, which means \"to remember,\" is a time for us to pause and pay tribute to the more than one million lives taken during the 100 days of darkness. It is also a time to recognize the incredible resilience of the Rwandan people and the progress our country has made in rebuilding its social fabric and economy."
      },
      {
            "type": "img",
            "photo": "kwibukaGroup",
            "caption": "Tekaccess Team at Memorial"
      },
      {
            "type": "h2",
            "text": "Our Visit to the Memorial"
      },
      {
            "type": "p",
            "text": "During this period of reflection, our team visited the Kigali Genocide Memorial to lay wreaths and pay our respects. Standing at the site where over 250,000 victims are laid to rest, we were reminded of the importance of \"Never Again\" and the responsibility we all share in building a peaceful and prosperous future."
      },
      {
            "type": "p",
            "text": "At Tekaccess, we believe that development and business cannot thrive without a foundation of peace, unity, and social responsibility. Our commitment to Rwanda goes beyond logistics and technology; it is rooted in being part of a community that values every human life and strives for collective growth."
      },
      {
            "type": "quote",
            "text": "Remembrance is not just about looking back; it is about honoring the past to build a better future together."
      },
      {
            "type": "img",
            "photo": "kwibukaGroup2",
            "caption": "Tekaccess Team Commemoration"
      },
      {
            "type": "h2",
            "text": "Building a Brighter Future"
      },
      {
            "type": "p",
            "text": "Today, Rwanda stands as a beacon of hope and transformation. The progress seen in every sector—from technology to logistics—is a testament to the strength of a united people. We are proud to contribute to this transformation and remain dedicated to our role in Rwanda's continued development."
      },
      {
            "type": "p",
            "text": "As we remember, we also renew our commitment to the values of integrity, excellence, and community. We stand with the survivors and honor the memory of the victims by striving for a world where such atrocities never happen again."
      },
      {
            "type": "tags",
            "text": "#Kwibuka32 #RememberUniteRenew"
      }
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
    // Original post, word for word (Firestore blogs/eUJgBH6gbfIUDuyawoyI); the live Firestore copy replaces it when connected.
    slug: "hot-water-solutions-edcl",
    supersededBy: ["edcl", "hot water"],
    title: "EMPOWERING HOMES WITH SUSTAINABLE HOT WATER SOLUTIONS IN PARTNERSHIP WITH ENERGY DEVELOPMENT CORPORATION LIMITED (EDCL)",
    category: "Partnerships",
    date: d("2026-01-23"),
    author: "Tekaccess Team",
    excerpt: "Installed 10,000+ liters of solar water heaters in Rwandan homes.",
    cover: "edclSolarHeaters",
    readMinutes: 1,
    blocks: [
      { type: "p", text: "Installed 10,000+ liters of solar water heaters in Rwandan homes." },
      { type: "p", text: "Delivering sustainable, cost-saving, and eco-friendly hot water solutions through innovative solar technology." },
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
    // Original post, word for word (Firestore blogs/oU0KPkAKqdvjlfDHFDiB).
    slug: "nourishing-rwandas-future",
    supersededBy: ["nourishing"],
    title: "NOURISHING RWANDA’S FUTURE WITH TEKACCESS",
    category: "Community",
    date: d("2026-01-21"),
    author: "Tekaccess Team",
    excerpt: "When nutrition meets education, children thrive.",
    cover: "schoolFeeding",
    readMinutes: 1,
    blocks: [
      { type: "p", text: "When nutrition meets education, children thrive." },
      { type: "p", text: "Supplied 2,961+ metric tons of quality food to 230 schools across 27 sectors in Gatsibo, Kirehe and Nyaruguru districts.\nReaching 326,000+ students." },
      { type: "p", text: "Together, we’re not just feeding students— we’re empowering Rwanda’s future" },
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
