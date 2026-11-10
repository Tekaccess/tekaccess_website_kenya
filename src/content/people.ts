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
  name: "Murinzi A. Bertin",
  role: "Founder & CEO",
  photo: p("murinzi-bertin"),
};

export const ceoMessage = {
  quote: "Logistics is more than movement. It is trust, precision and responsibility in action.",
  body: [
    "Every client, every delivery and every partnership is an opportunity to demonstrate excellence.",
    "We are committed to building solutions that strengthen industries, empower communities and contribute to Rwanda's growth story. Thank you for trusting us to move your world.",
  ],
};

// Names written in natural order; source spelling kept from the current site.
export const team: Person[] = [
  {
    slug: "rogers-paris-lyimo",
    name: "Rogers Paris Lyimo",
    role: "Deputy Managing Director",
    about: "Leads TekAccess country operations, driving strategic growth and operational excellence across all business units.",
    bio: "Steering TekAccess's national presence with vision, leadership and a commitment to excellence.",
    photo: p("rogers-paris-lyimo"),
  },
  {
    slug: "enock-kariuki-maina",
    name: "Enock Kariuki Maina",
    role: "Business Development Officer",
    about: "Strategic planner focused on expanding TekAccess's market reach and building strong industry partnerships.",
    bio: "Driving growth through strategic innovation and collaborative excellence.",
    photo: p("enock-kariuki-maina"),
    linkedin: "https://www.linkedin.com/in/enock-maina-b33759403/",
  },
  {
    slug: "shimwa-alban-symplice",
    name: "Shimwa Alban Symplice",
    role: "Treasurer Officer",
    about: "Ensures sound financial planning, compliance and resource management, driving financial integrity.",
    bio: "Building a robust financial foundation that supports sustainable growth.",
    photo: p("shimwa-alban-symplice"),
    linkedin: "https://www.linkedin.com/in/alban-symplice-shimwa-97b5271b3/",
  },
  {
    slug: "nasagambe-isimbi-ornella",
    name: "Nasagambe Isimbi Ornella",
    role: "Human Resources Officer",
    about: "Looks after the people behind every delivery: hiring, development and a workplace where good work is recognised.",
    photo: p("nasagambe-isimbi-ornella"),
    linkedin: "https://www.linkedin.com/in/ornella-isimbi-154b0325a/",
  },
  {
    slug: "keza-nkwaya-keyla",
    name: "Keza Nkwaya Keyla",
    role: "Administrative & Secretariat Officer",
    about: "Supports coordination and monitoring of daily operations with organisation and dedication.",
    bio: "Ensuring the heart of TekAccess beats with precision and care.",
    linkedin: "https://www.linkedin.com/in/keyla-keza-146475279/",
  },
  {
    slug: "mugabo-richard",
    name: "Mugabo Richard",
    role: "Procurement Officer",
    about: "Oversees procurement strategy and supplier relationships, ensuring quality and cost-effective sourcing.",
    bio: "Building strong partnerships and securing the best resources for TekAccess.",
    photo: p("mugabo-richard"),
    linkedin: "https://www.linkedin.com/in/richard-mugabo-645180291/",
  },
  {
    slug: "rayan-ken-nsonera",
    name: "Rayan Ken Nsonera",
    role: "Transport Procurement Officer",
    about: "Manages transport capacity and logistics workflows so every load has a truck and a plan before it is collected.",
    bio: "Bridging ambitious goals and successful deliveries.",
    photo: p("rayan-ken-nsonera"),
    linkedin: "https://www.linkedin.com/in/rayan-ken-nsonera-726510170/",
  },
  {
    slug: "uwase-murenzi-kevine",
    name: "Uwase Murenzi Kevine",
    role: "Clearing & Cashier Officer",
    about: "Handles customs clearing and cash operations so loads cross borders with their papers in order.",
    bio: "Optimising processes for exceptional service delivery.",
    photo: p("uwase-murenzi-kevine"),
    linkedin: "https://www.linkedin.com/in/uwase-murenzi-kevine-02bb18315/",
  },
  {
    slug: "caleb-asena-igambi",
    name: "Caleb Asena Igambi",
    role: "Safety & Logistics Officer",
    about: "Holds every operation to the highest standards of safety and efficiency across the supply chain.",
    bio: "Maintaining a safe, efficient logistics environment.",
    photo: p("caleb-asena-igambi"),
    linkedin: "https://www.linkedin.com/in/caleb-igambi-77093999/",
  },
  {
    slug: "thierry-gusenga",
    name: "Thierry Gusenga",
    role: "Systems Engineering Officer",
    about: "Builds the interfaces clients and staff use every day, so the digital side of TekAccess is as reliable as the trucks.",
    bio: "Crafting the digital storefront of logistics excellence.",
    photo: p("thierry-gusenga"),
    linkedin: "https://www.linkedin.com/in/gusenga-thierry-b20820297/",
  },
  {
    slug: "mbonimpaye-kaneza-kevin",
    name: "Mbonimpaye Kaneza Kevin",
    role: "Systems Engineering Officer",
    about: "Builds the server-side systems and infrastructure that power TekAccess's logistics operations.",
    bio: "Reliable, scalable backend architecture.",
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
