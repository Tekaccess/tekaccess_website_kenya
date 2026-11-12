// Company-wide facts. Every value marked TODO(real) is a placeholder awaiting confirmation.
export const site = {
  name: "TekAccess",
  legalName: "TekAccess Ltd",
  url: "https://tekaccess.rw",
  appUrl: "https://tekaccess.live", // staff sign-in
  ogImage: "/og/default.png",
  founded: 2019,
  tagline: "Efficient. Reliable. Scalable.",
  promise: "Your Trusted Partner in Logistics & Supply Solutions.",
  description:
    "Delivering excellence through innovative transportation and supply chain management services tailored to your business needs.",
  footer: "Empowering global trade with innovative logistics solutions, precision analytics, and unwavering reliability.",
  phone: "+250 788 320 200",
  phoneHref: "tel:+250788320200",
  whatsappHref: "https://wa.me/250788320200",
  email: "info@tekaccess.rw",
  emailHref: "mailto:info@tekaccess.rw",
  city: "Kigali, Rwanda",
  address: "Kigali, Rwanda", // TODO(real): street address
  hours: "Monday to Friday, 8:00–17:00", // TODO(real)
  replyPromise: "We reply within one working day.", // TODO(real): confirm the promise
  countries: ["Rwanda", "Tanzania", "Kenya", "DRC", "Uganda"],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.9526347545684!2d30.100397673996817!3d-1.9552070367210403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7173e3331f3%3A0xdd65098bb9fbd168!2sTekaccess%20Ltd%20Headquarters!5e1!3m2!1sen!2smu!4v1768061167506!5m2!1sen!2smu",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/tekaccess-ltd" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100043267879876" },
    { label: "X", href: "https://x.com/Tekaccessltd" },
    { label: "Instagram", href: "https://www.instagram.com/tekaccessltd" },
  ],
} as const;

export const nav = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
] as const;

// Original site copy (Services.tsx call to action + header banner).
export const closing = {
  lead: "Need custom logistics?",
  quiet: "Efficient. Reliable. Scalable.",
  text: "We provide tailored operational strategies designed to handle your most complex supply chain challenges.",
  cta: "Request a Consultation",
};
