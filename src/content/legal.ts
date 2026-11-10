export type LegalDoc = {
  slug: "privacy" | "terms";
  title: string;
  updated: string;
  summary: string;
  sections: { id: string; title: string; body: string[] }[];
};

// TODO(real): placeholder legal text written in plain language. Have it reviewed by
// counsel before launch; it is not legal advice.
export const legal: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    updated: "November 1, 2026",
    summary: "What we collect through this website, why, and what you can ask us to do with it.",
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        body: ["TekAccess Ltd, a logistics and raw-materials supply company based in Kigali, Rwanda, is responsible for this website and the information you send through it."],
      },
      {
        id: "what-we-collect",
        title: "What we collect",
        body: [
          "Only what you type into the quote form: your name, company, email, phone number and the shipment details you choose to share.",
          "We do not use advertising cookies or tracking pixels on this website.",
        ],
      },
      {
        id: "how-we-use-it",
        title: "How we use it",
        body: ["To reply to your request, prepare a quote and, if you become a client, to run your shipments. Nothing else."],
      },
      {
        id: "who-we-share-it-with",
        title: "Who we share it with",
        body: [
          "We never sell your details. The quote form is delivered to our inbox by a form-forwarding service (FormSubmit), which processes it only to deliver the message.",
          "When you become a client, shipment details are shared with the carriers and authorities a delivery legally requires.",
        ],
      },
      {
        id: "how-long-we-keep-it",
        title: "How long we keep it",
        body: ["As long as needed to answer you and to meet record-keeping duties under Rwandan law, then deleted."],
      },
      {
        id: "your-rights",
        title: "Your rights",
        body: ["You can ask to see the details we hold about you, correct them or have them deleted, in line with Rwanda's Law N° 058/2021 on the protection of personal data and privacy."],
      },
      {
        id: "contact",
        title: "Contact",
        body: ["Questions about this page can be sent to info@tekaccess.rw."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    updated: "November 1, 2026",
    summary: "The rules for using this website. Shipments themselves are governed by the contract you sign with us.",
    sections: [
      { id: "using-this-site", title: "Using this site", body: ["You may browse and share this website for any lawful purpose. Please do not try to disrupt it or misuse the quote form."] },
      {
        id: "quotes",
        title: "Quotes are not contracts",
        body: ["A price shown or sent in reply to the form is an offer, not a contract. Work starts only once both sides agree terms in writing."],
      },
      {
        id: "content",
        title: "Content and trademarks",
        body: ["The TekAccess name, logo, text and photographs belong to TekAccess Ltd or are used under licence. Some photographs are used under the Unsplash License."],
      },
      { id: "links", title: "Links to other sites", body: ["We link to other websites for convenience. We are not responsible for their content or practices."] },
      {
        id: "liability",
        title: "Limitation of liability",
        body: ["We keep this website accurate, but figures and descriptions may change. To the extent the law allows, we are not liable for decisions made on this website alone."],
      },
      { id: "law", title: "Governing law", body: ["These terms are governed by the laws of the Republic of Rwanda."] },
      { id: "contact", title: "Contact", body: ["Questions about these terms can be sent to info@tekaccess.rw."] },
    ],
  },
];

export const legalBySlug = (slug: string) => legal.find((l) => l.slug === slug);
