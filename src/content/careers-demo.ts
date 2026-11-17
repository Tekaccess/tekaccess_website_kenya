import type { CareersSettings, JobDetail, Question } from "@/lib/careers";

// shortcut: demo jobs and careers copy to show the flow without the API. Used only in local dev
// without VITE_CAREERS_API, or with ?demo=1 in the URL; delete when no longer needed for demos.

const day = 86400000;
const at = (days: number) => new Date(Date.now() + days * day).toISOString();

const noc: Question[] = [
  {
    id: "q_years",
    label: "Years of experience in network monitoring",
    type: "number",
    required: true,
    options: [],
  },
  {
    id: "q_nights",
    label: "Are you available for rotating night shifts?",
    type: "yes_no",
    required: true,
    options: [],
  },
  {
    id: "q_shift",
    label: "Which shift do you prefer?",
    type: "choice",
    required: false,
    options: ["Day", "Night", "Rotating", "No preference"],
  },
  {
    id: "q_qual",
    label: "Highest qualification",
    type: "choice",
    required: true,
    options: [
      "Secondary school",
      "Certificate",
      "Diploma",
      "Bachelor's degree",
      "Master's degree",
      "Other",
    ],
  },
  {
    id: "q_start",
    label: "Earliest start date",
    type: "date",
    required: false,
    options: [],
  },
  {
    id: "q_why",
    label: "Why do you want this role?",
    type: "long_text",
    required: false,
    options: [],
  },
  {
    id: "q_location",
    label: "Current location",
    type: "text",
    required: false,
    options: [],
  },
  {
    id: "q_linkedin",
    label: "LinkedIn profile (optional)",
    type: "text",
    required: false,
    options: [],
  },
];

const basic = (extra: Question[] = []): Question[] => [
  {
    id: "q_years",
    label: "Years of relevant experience",
    type: "number",
    required: true,
    options: [],
  },
  ...extra,
  {
    id: "q_why",
    label: "Why do you want this role?",
    type: "long_text",
    required: false,
    options: [],
  },
];

export const demoJobs: JobDetail[] = [
  {
    token: "noc-demo",
    title: "NOC Technician",
    summary:
      "Keep our truck network visible day and night. Monitor GPS, respond to alerts and support field teams across the corridor.",
    department: "Operations",
    location: "Kigali, Rwanda",
    employmentType: "full_time",
    postedAt: at(-7),
    closesAt: at(14),
    accepting: true,
    questions: noc,
    benefits: [],
    description: `About the Role
Our Network Operations Centre watches every TekAccess truck on the road, from Kigali to Mombasa. As a NOC Technician you make sure that picture is accurate and that problems are caught early. You work in shifts with a small team and talk every day with field officers at border posts and depots.

What You Will Do
- Monitor GPS positions and alerts for the whole truck fleet.
- Respond to stopped trucks, route deviations and device faults.
- Coordinate with field officers and drivers by phone and WhatsApp.
- Log every incident clearly and hand over at the end of each shift.
- Help keep tracking devices, SIMs and dashboards working.

What You Will Bring
- Diploma or degree in IT, networking or a related field.
- At least one year in monitoring, support or a control room.
- Calm under pressure and clear in writing.
- English required; Kinyarwanda or Swahili is a plus.
- Ready to work rotating day and night shifts.`,
  },
  {
    token: "dispatch-demo",
    title: "Truck Dispatcher",
    summary:
      "Plan and release trucks so every load leaves on time and arrives on time.",
    department: "Operations",
    location: "Kampala, Uganda",
    employmentType: "full_time",
    postedAt: at(-5),
    closesAt: at(18),
    accepting: true,
    questions: basic([
      {
        id: "q_license",
        label: "Do you hold a valid driving licence?",
        type: "yes_no",
        required: true,
        options: [],
      },
    ]),
    description: `About the Role
You assign trucks and drivers to loads out of Kampala, track them to the border and keep clients informed.

What You Will Do
- Assign trucks and drivers to daily loads.
- Check documents before every departure.
- Follow trucks to the border and solve delays early.
- Keep the dispatch log accurate.

What You Will Bring
- Two years in dispatch, fleet or transport operations.
- Strong on the phone, calm when plans change.
- English and Luganda or Swahili.`,
  },
  {
    token: "finance-demo",
    title: "Finance Officer",
    summary:
      "Keep our books right, our suppliers paid and our reports on time.",
    department: "Finance",
    location: "Kigali, Rwanda",
    employmentType: "full_time",
    postedAt: at(-10),
    closesAt: at(11),
    accepting: true,
    questions: basic([
      {
        id: "q_cpa",
        label: "Professional qualification",
        type: "choice",
        required: false,
        options: ["CPA", "ACCA", "CIMA", "In progress", "None"],
      },
    ]),
    description: `What You Will Do
- Record payables and receivables for daily operations.
- Reconcile bank accounts each week.
- Prepare month-end reports with the Finance Manager.

What You Will Bring
- Degree in finance or accounting.
- Two years of hands-on accounting.
- Careful with numbers, clear in writing.`,
  },
  {
    token: "mutukula-demo",
    title: "Field Officer, Mutukula Border",
    summary:
      "Be our eyes at the border: record every truck, speed up clearing and report problems the same hour.",
    department: "Field",
    location: "Mutukula, Uganda",
    employmentType: "contract",
    postedAt: at(-3),
    closesAt: at(23),
    accepting: true,
    questions: basic([
      {
        id: "q_border",
        label: "Can you live near the Mutukula border post?",
        type: "yes_no",
        required: true,
        options: [],
      },
    ]),
    description: `What You Will Do
- Record arrivals and departures in the field app.
- Follow up clearing documents with agents.
- Report delays and incidents immediately.

What You Will Bring
- Experience at a border, depot or weighbridge.
- A smartphone and comfort using apps.
- English and Swahili.`,
  },
  {
    token: "hr-demo",
    title: "HR Assistant",
    summary: "Support hiring, onboarding and staff records for our Kenya team.",
    department: "Human Resources",
    location: "Nairobi, Kenya",
    employmentType: "full_time",
    postedAt: at(-2),
    closesAt: at(16),
    accepting: true,
    questions: basic(),
    description: `What You Will Do
- Schedule interviews and keep candidates informed.
- Prepare onboarding documents.
- Keep staff records complete and private.

What You Will Bring
- Diploma or degree in HR or business.
- Organised, discreet and friendly.`,
  },
  {
    token: "it-intern-demo",
    title: "IT Support Intern",
    summary: "Six months learning IT support on a real logistics operation.",
    department: "IT",
    location: "Dar es Salaam, Tanzania",
    employmentType: "internship",
    postedAt: at(-1),
    closesAt: null,
    accepting: true,
    questions: basic([
      {
        id: "q_course",
        label: "What are you studying?",
        type: "text",
        required: true,
        options: [],
      },
    ]),
    description: `What You Will Do
- Set up laptops, phones and accounts.
- Help colleagues with everyday IT problems.
- Keep the equipment register up to date.

What You Will Bring
- Studying or recently finished IT or computer science.
- Curious and patient.`,
  },
  {
    token: "closed-demo",
    title: "Truck Dispatcher",
    department: "Operations",
    location: "Kampala, Uganda",
    employmentType: "full_time",
    postedAt: at(-60),
    closesAt: at(-12),
    accepting: false,
    questions: [],
    description: "",
  },
];

/** Same as the system's standard careers copy (backend careers_settings DEFAULTS). */
export const demoSettings: CareersSettings = {
  hero: {
    title: "Build Your Career",
    accent: "Across East Africa.",
    intro:
      "We move gypsum, coal and clinker across five countries. Join the people who keep the region moving.",
    countriesLine: "Rwanda · Uganda · Kenya · Tanzania",
  },
  why: [
    {
      icon: "truck",
      title: "Cross-border work",
      text: "Routes through five countries, every day.",
    },
    {
      icon: "users",
      title: "Field and office roles",
      text: "From border posts to our Kigali HQ.",
    },
    {
      icon: "graduation",
      title: "Learn on real operations",
      text: "Training on the job from week one.",
    },
    {
      icon: "shield",
      title: "Safety first",
      text: "Clear rules, proper gear, no shortcuts.",
    },
    {
      icon: "trending",
      title: "Room to grow",
      text: "Clear paths from officer to manager.",
    },
    {
      icon: "globe",
      title: "One team, four countries",
      text: "Rwanda, Uganda, Kenya and Tanzania.",
    },
  ],
  steps: [
    { title: "Apply", text: "Send your details and CV in about 5 minutes." },
    {
      title: "Review",
      text: "We read every application within 10 working days.",
    },
    {
      title: "Interview",
      text: "Shortlisted candidates meet the team, in person or online.",
    },
    { title: "Offer", text: "We confirm the role, start date and next steps." },
  ],
  nextSteps: [
    {
      title: "We Review Every Application",
      text: "A real person reads your CV and answers.",
      timing: "Within 10 working days",
    },
    {
      title: "We Contact Shortlisted Candidates",
      text: "By phone or email, to arrange an interview.",
      timing: "If shortlisted",
    },
    {
      title: "Interview and Offer",
      text: "Meet the team, then we confirm role and start date.",
      timing: "1 to 3 weeks",
    },
  ],
  reviewDays: 10,
  benefits: [
    { icon: "heart", title: "Medical cover", text: "For you and your family." },
    {
      icon: "graduation",
      title: "Training",
      text: "Learn on real operations.",
    },
    { icon: "bus", title: "Transport", text: "Night-shift transport home." },
    { icon: "trending", title: "Growth", text: "Clear paths to lead roles." },
  ],
  faq: [
    {
      q: "Can I apply for more than one role?",
      a: "Yes. Apply to each role separately; we review every application on its own.",
    },
    {
      q: "What file types can I upload?",
      a: "Your CV as a PDF or Word (.docx) file, up to 5 MB. Photos of a CV are not accepted.",
    },
    {
      q: "Will I hear back if I am not selected?",
      a: "Yes. We tell every candidate by email once a decision is made, and your CV may be considered for future roles.",
    },
    {
      q: "Do you hire outside Rwanda?",
      a: "Yes. We hire in Rwanda, Uganda, Kenya and Tanzania. Each role shows where it is based.",
    },
    {
      q: "Can I apply from my phone?",
      a: "Yes. The whole application works on a phone; keep your CV saved on it as a PDF or Word file.",
    },
  ],
  notSelectedText:
    "Not selected this time? We will tell you by email, and your CV may be considered for future roles.",
  closing: {
    title: "Don't See Your Role?",
    accent: "We're Always Growing.",
    text: "Follow TekAccess on LinkedIn to hear first when new roles open.",
  },
  contacts: {
    email: "careers@tekaccess.rw",
    linkedin: "https://www.linkedin.com/company/tekaccess-ltd",
    perSite: [
      { site: "rw", phone: "+250 788 320 200", whatsapp: "+250 788 320 200" },
    ],
  },
  privacy: { retentionMonths: 12, noticeUrl: "/legal/privacy" },
};
