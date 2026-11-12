# TekAccess website

The public site for TekAccess Ltd (tekaccess.rw): gypsum, coal and clinker supply, and truck, ship and rail
transport across Rwanda, Tanzania, Kenya, DRC and Uganda. Editorial design (Storey-style layout, TekAccess
navy/red), built with React, TypeScript, Vite, Tailwind and GSAP.

```sh
nvm use                 # Node 20
npm i
cp .env.example .env.local   # Firebase web config; Insights falls back to built-in posts without it
npm run dev             # http://localhost:8080
npm run build           # dist/ (+ sitemap.xml generated from content)
npm run preview
```

## Where things live

| Path                                                             | What                                                                                                                                |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.css`, `tailwind.config.ts`                            | Design tokens: colours, fluid type scale, spacing, breakpoints (`tablet` 810, `lg` 1024, `desktop` 1200), motion                    |
| `src/content/`                                                   | **All copy and data**: site facts, services, projects, people, FAQs, insights, legal, image registry. Edit here, not in components |
| `src/components/atoms` → `molecules` → `organisms` → `templates` | UI from smallest to largest                                                                                                         |
| `src/routes/`                                                    | One file per page; `router.tsx` lazy-loads each, `preload.ts` warms chunks on nav hover                                             |
| `src/lib/motion.ts`                                              | Scroll motion: add `data-reveal="lines                                                                                              | fade | stagger | hairline | count | sky | image | parallax"` to an element |
| `src/data/insights.ts`                                           | Firestore `blogs` + built-in posts, merged; admin HTML is sanitised                                                                 |
| `src/lib/formsubmit.ts`                                          | Quote form → FormSubmit → info@tekaccess.rw                                                                                         |
| `public/images/`                                                 | Responsive WebP (400–2400w). Unsplash images are credited in `public/credits.json`                                                  |

## Placeholders to confirm before launch

Search the code for `TODO(real)`: project distances and the Kigali → Goma project, the "500+ deliveries" figure,
FAQ answers, pricing basis, the one-working-day reply promise, office hours, street address, insurance cover,
the three "rules", and the legal text (needs counsel review).

## Notes

- FormSubmit only delivers after the info@tekaccess.rw inbox confirms its one-time activation email.
- Single-page app: hosts must rewrite unknown paths to `/index.html` (`vercel.json`, `public/_redirects` and
  `firebase.json` cover Vercel, Netlify and Firebase Hosting).
- `inspiration/` holds design references (Storey template, moodboards, generated mockups). It is not shipped.
- Pre-commit and CI run `polin-guard`.
