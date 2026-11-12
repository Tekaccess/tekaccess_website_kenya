export type Person = {
  slug: string;
  name: string;
  role: string;
  about?: string;
  bio?: string;
  photo?: string; // base path; files are `${photo}-480.webp` and `${photo}-800.webp`
  linkedin?: string;
};

const p = (slug: string) => `/images/team/${slug}`;

export const ceo: Person = {
  slug: "murinzi-bertin",
  name: "MURINZI AHORUKOMEYE Bertin",
  role: "CEO, TekAccess Ltd",
  photo: p("murinzi-bertin"),
};

export const ceoMessage = {
  label: "CEO'S MESSAGE",
  intro: "Leading with vision, integrity, and a commitment to transforming logistics in Rwanda and beyond.",
  // Original copy; "any delivery" corrected to "every delivery".
  quote: "At TekAccess, we believe logistics is more than movement, it is trust, precision, and responsibility in action. Every client, every delivery, and every partnership is an opportunity to demonstrate excellence.",
  body: [
    "We are committed to building solutions that strengthen industries, empower communities, and contribute to Rwanda’s growth story. Thank you for trusting us to move your world.",
  ],
  impact: [
    { label: "Founded", val: "2019" },
    { label: "Impact", val: "500+" },
    { label: "Vision", val: "Excellence" },
  ],
};

// Copy is word for word from the original TekAccess site (Team.tsx); Ornella has no original bio.
export const team: Person[] = [
  {
    slug: "rogers-paris-lyimo",
    name: "Rogers PARIS LYIMO",
    role: "Deputy Managing Director",
    about: "Leads TekAccess country operations, driving strategic growth and ensuring operational excellence across all business units.",
    bio: "Steering TekAccess's national presence with vision, leadership, and a commitment to excellence.",
    photo: p("rogers-paris-lyimo"),
  },
  {
    slug: "enock-kariuki-maina",
    name: "Enock KARIUKI MAINA",
    role: "Business Development Officer",
    about: "Strategic planner and business development expert, focused on expanding TekAccess's market reach and building strong industry partnerships.",
    bio: "Driving growth through strategic innovation and collaborative excellence.",
    photo: p("enock-kariuki-maina"),
    linkedin: "https://www.linkedin.com/in/enock-maina-b33759403/",
  },
  {
    slug: "shimwa-alban-symplice",
    name: "SHIMWA Alban Symplice",
    role: "Treasurer Officer",
    about: "Ensures sound financial planning, compliance, and resource management, driving financial integrity.",
    bio: "Dedicated to building a robust financial foundation that supports sustainable growth.",
    photo: p("shimwa-alban-symplice"),
    linkedin: "https://www.linkedin.com/in/alban-symplice-shimwa-97b5271b3/",
  },
  {
    slug: "nasagambe-isimbi-ornella",
    name: "NASAGAMBE ISIMBI Ornella",
    role: "Human Resources Officer",
    about: "Looks after the people behind every delivery: hiring, development and a workplace where good work is recognised.",
    photo: p("nasagambe-isimbi-ornella"),
    linkedin: "https://www.linkedin.com/in/ornella-isimbi-154b0325a/",
  },
  {
    slug: "keza-nkwaya-keyla",
    name: "KEZA NKWAYA Keyla",
    role: "Administrative & Secretariat Officer",
    about: "Supports coordination and monitoring of daily operations, administrative efficiency with organization and dedication.",
    bio: "Ensuring that the heart of TekAccess beats with precision and care.",
    linkedin: "https://www.linkedin.com/in/keyla-keza-146475279/",
  },
  {
    slug: "mugabo-richard",
    name: "MUGABO Richard",
    role: "Procurement Officer",
    about: "Oversees procurement strategies and supplier relationships, ensuring quality and cost-effective sourcing.",
    bio: "Committed to building strong partnerships and securing the best resources for TekAccess.",
    photo: p("mugabo-richard"),
    linkedin: "https://www.linkedin.com/in/richard-mugabo-645180291/",
  },
  {
    slug: "rayan-ken-nsonera",
    name: "Rayan Ken NSONERA",
    role: "Transport Procurement Officer",
    about: "Oversees operations and business development, manages logistics workflows and premium customer experiences.",
    bio: "Commitment to operational excellence bridges the gap between ambitious goals and successful deliveries.",
    photo: p("rayan-ken-nsonera"),
    linkedin: "https://www.linkedin.com/in/rayan-ken-nsonera-726510170/",
  },
  {
    slug: "uwase-murenzi-kevine",
    name: "UWASE MURENZI Kevine",
    role: "Clearing & Cashier Officer",
    about: "Manages daily operations and ensures smooth execution of logistics workflows with precision and efficiency.",
    bio: "Dedicated to optimizing operational processes for exceptional service delivery.",
    photo: p("uwase-murenzi-kevine"),
    linkedin: "https://www.linkedin.com/in/uwase-murenzi-kevine-02bb18315/",
  },
  {
    slug: "caleb-asena-igambi",
    name: "Caleb ASENA IGAMBI",
    role: "Safety & Logistics Officer",
    about: "Ensures the highest standards of safety and operational efficiency in all logistics and supply chain activities, maintaining TekAccess's commitment to excellence.",
    bio: "Dedicated to maintaining a safe and efficient logistics environment for seamless service delivery.",
    photo: p("caleb-asena-igambi"),
    linkedin: "https://www.linkedin.com/in/caleb-igambi-77093999/",
  },
  {
    slug: "thierry-gusenga",
    name: "Thierry GUSENGA",
    role: "Systems Engineering Officer",
    about: "Focused on creating intuitive and visually stunning user interfaces, ensuring a seamless digital experience for all TekAccess clients.",
    bio: "Crafting the digital storefront of logistics excellence.",
    photo: p("thierry-gusenga"),
    linkedin: "https://www.linkedin.com/in/gusenga-thierry-b20820297/",
  },
  {
    slug: "mbonimpaye-kaneza-kevin",
    name: "MBONIMPAYE KANEZA Kevin",
    role: "Systems Engineering Officer",
    about: "Specializes in building robust server-side systems and managing the digital infrastructure that powers TekAccess's logistics solutions.",
    bio: "Powering the core of innovation through reliable and scalable backend architecture.",
    photo: p("mbonimpaye-kaneza-kevin"),
    linkedin: "https://www.linkedin.com/in/mbonikev/",
  },
];

export const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
