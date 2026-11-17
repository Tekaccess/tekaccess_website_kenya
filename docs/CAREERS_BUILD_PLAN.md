# Careers build plan (`development/`)

> 17 Nov 2026. How the 9 generated designs in `~/Desktop/reference/Generated/` become working pages in this website, phase by phase.
> **Rule:** reuse what the site already has. Build new only where nothing fits. Every page works in **demo mode** (frontend only) and switches to the real backend by setting one setting.

---

## 0. Inputs

| Design               | File                                                | Becomes                                     |
| -------------------- | --------------------------------------------------- | ------------------------------------------- |
| 1 Careers list       | `TekAccess Careers_ Work That Moves the Region.png` | `/careers`                                  |
| 2 List states        | `TekAccess Careers UI States.png`                   | `/careers` (no results, no roles, loading)  |
| 3 Job page           | `TekAccess NOC Technician Careers Page.png`         | `/careers/:token/:slug`                     |
| 4 Application form   | `TekAccess NOC Technician Application.png`          | `/careers/:token/:slug/apply`               |
| 5 Form problems      | `TekAccess Application Error States.png`            | the form's error, upload and sending states |
| 6 Thank-you          | `TekAccess Application Success Page.png`            | `/careers/sent`                             |
| 7 Closed + not found | `TekAccess Careers Page Comparison.png`             | job page states                             |
| 8 Mobile             | `TekAccess Careers Mobile UI Showcase-2.png`        | phone layout of 1, 3, 4                     |
| 9 Components         | `TekAccess Careers UI Components Guide.png`         | the parts list for Phases 2–3               |

Backend contract: `tekaccess_backend/docs/CAREERS_WEBSITE_GUIDE.md` (endpoints, 4 fixed fields, 6 question types, error codes).

---

## 1. Design corrections (where the generated images are wrong or can be better)

| #   | In the image                                                | We build                                                                                                       | Why                                                                                                  |
| --- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | "Why do you want this role?" drawn as a **boxed** textarea  | Underline `TextareaField`                                                                                      | Matches the site's form and the other fields                                                         |
| 2   | "**What You** Offer" on the job page                        | "**What We** Offer"                                                                                            | Typo                                                                                                 |
| 3   | "Current Location" and "LinkedIn" shown as **fixed** fields | Shown as **HR questions** (demo data)                                                                          | The backend only has 4 fixed fields (name, email, phone, CV). A fixed field would have nowhere to go |
| 4   | Progress row "01 → 04" looks like a 4-step wizard           | **One page**. The row is a slim sticky guide: anchor links, with a tick when a section is valid                | A wizard means more code, more clicks and lost state. One page is simpler and faster                 |
| 5   | "Posted 10 Nov", department, location and type always shown | Shown **only when the API sends them**                                                                         | The real API doesn't return them yet (backend gap #5). Demo data has them                            |
| 6   | Reference "TA-APP-2611-123"                                 | Demo makes one; the real backend's id is shown only if returned                                                | No fake data in real mode                                                                            |
| 7   | Hover row in the list = full blue fill, button turns navy   | Keep the site's existing row hover: title turns red, arrow lifts, soft `#F5F8FE` background, button fills navy | Same feel as the Services rows                                                                       |
| 8   | Closed badge differs between images 7 and 9                 | Image 9 version: grey with a lock                                                                              | One source                                                                                           |
| 9   | Error summary shows links separated by "\|"                 | A list of links that move focus to each field                                                                  | Accessibility                                                                                        |
| 10  | "Share Role" button                                         | On a phone it opens the native share sheet; on desktop it **copies the link** with a toast                     | Uses `navigator.share` and sonner, no new library                                                    |
| 11  | Thank-you "Sent 17 Nov 2026, 10:42"                         | Kept, using the browser's local time                                                                           | —                                                                                                    |
| 12  | Mobile sticky apply bar                                     | Shown only below `lg` and hidden while the apply section is on screen                                          | No double button                                                                                     |
| 13  | Head band colour drifts (#EEF3FC / #F2F6FE)                 | The site's `PageHead` colour `#F2F6FE`                                                                         | One colour                                                                                           |
| 14  | "Get in Touch" header button                                | Unchanged, as in the site                                                                                      | Header stays global                                                                                  |

---

## 2. What already exists (reuse, don't rebuild)

| Need in the designs                                                                                                 | Existing part                                                                                                                 | File                         | Change                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page shell, meta, motion                                                                                            | `Page`                                                                                                                        | `templates/page.tsx`         | none                                                                                                                                                                                         |
| Light-blue head band, two-tone title, side note with divider                                                        | `PageHead` (`lead`, `quiet`, `aside`, `crumbs`, `compact`)                                                                    | `organisms/blocks.tsx`       | none. Red words are passed as `<span className="text-accent">` (as Services does)                                                                                                            |
| Bands and grid                                                                                                      | `Section`, `Container`, `Split` (3/9), `Hairline`                                                                             | `atoms/layout.tsx`           | none                                                                                                                                                                                         |
| Labels and headings                                                                                                 | `Eyebrow`, `Heading`                                                                                                          | `atoms/typography.tsx`       | none                                                                                                                                                                                         |
| Buttons                                                                                                             | `Button`, `LinkButton`, `AnchorButton`, `TextLink`, `TextAnchor` (accent / ink / outline, sizes sm/md/lg, `loading`, `arrow`) | `atoms/button.tsx`           | none                                                                                                                                                                                         |
| Underline inputs                                                                                                    | `Field`, `TextareaField`, `SelectField`, `FieldShell`                                                                         | `atoms/form.tsx`             | none                                                                                                                                                                                         |
| Square chips                                                                                                        | `ChipGroup`                                                                                                                   | `atoms/form.tsx`             | add an optional `required` prop (red `*`)                                                                                                                                                    |
| FAQ block                                                                                                           | `FaqSection`                                                                                                                  | `organisms/sections.tsx`     | add an optional `help` prop so careers shows "Email careers@…" instead of "Call …"                                                                                                           |
| Accordion, breadcrumb, skeleton                                                                                     | `Accordion`, `Breadcrumb`, `Skeleton`                                                                                         | `molecules/misc.tsx`         | none                                                                                                                                                                                         |
| Closing call to action                                                                                              | `ClosingCta`                                                                                                                  | `organisms/blocks.tsx`       | add optional props (`lead`, `quiet`, `text`, `cta`, `href`, `aside`), with today's values as defaults                                                                                        |
| "How it works" grid (red numbers in a hairline box)                                                                 | inline in `routes/services.tsx`                                                                                               | —                            | **extract** into `StepsGrid` (molecule) and use it in Services too                                                                                                                           |
| Icon tile grid in a hairline box                                                                                    | inline in `routes/services.tsx`                                                                                               | —                            | **extract** into `IconGrid` (molecule) and use it in Services too                                                                                                                            |
| Header and footer links                                                                                             | `nav` array                                                                                                                   | `content/site.ts`            | add `{ label: "Careers", to: "/careers" }`. Header, mobile sheet and footer all read it                                                                                                      |
| Hover preloading                                                                                                    | `preloadRoute`                                                                                                                | `routes/preload.ts`          | add the careers pages                                                                                                                                                                        |
| Form pattern: zod, react-hook-form, honeypot, error box with phone and WhatsApp, navigate to a sent page with state | `QuoteForm`                                                                                                                   | `organisms/quote-form.tsx`   | copied as the model for `CareerForm`                                                                                                                                                         |
| JSON-LD injection                                                                                                   | `useDocumentMeta({ jsonLd })`                                                                                                 | `hooks/use-document-meta.ts` | small fix (Phase 8: canonical per country)                                                                                                                                                   |
| Toast                                                                                                               | `sonner` (installed)                                                                                                          | —                            | used for "Link copied"                                                                                                                                                                       |
| Icons                                                                                                               | `lucide-react`                                                                                                                | —                            | MapPin, Briefcase, CalendarDays, Clock, FileText, Upload, Check, AlertCircle, Search, X, Lock, Link2, Link2Off, Truck, Users, GraduationCap, ShieldCheck, TrendingUp, Globe, HeartPulse, Bus |

No new npm package is needed.

---

## 3. New files (the whole list)

```
src/
  content/careers.ts             copy: head, why tiles, hiring steps, offer tiles, careers FAQ, closing
  content/careers-demo.ts        6 demo jobs (+1 closed) with all 6 question types
  lib/careers.ts                 types + listJobs / getJob / apply; demo or real; slug(); source capture
  hooks/use-load.ts              tiny {data, error, loading} loader for one promise
  components/atoms/badge.tsx     Badge: type | closed | demo
  components/atoms/form.tsx      + CheckboxField, + FileField (the CV drop zone)   [added to the existing file]
  components/molecules/jobs.tsx  JobRow, KeyFacts, InfoBox, EmptyState, ErrorSummary, StepsGrid, IconGrid
  components/organisms/careers.tsx  JobBoard (filters + list + states), ApplyAside, StickyBar, DemoBar
  components/organisms/career-form.tsx  CareerForm
  routes/careers.tsx             /careers
  routes/career.tsx              /careers/:token/:slug?   (incl. closed + not found)
  routes/career-apply.tsx        /careers/:token/:slug/apply
  routes/career-sent.tsx         /careers/sent
docs/CAREERS_BUILD_PLAN.md       this file
```

Edited files: `content/site.ts` (nav), `content/faqs.ts` (adds a `careers` tag), `routes/router.tsx`, `routes/preload.ts`, `routes/services.tsx` (uses the extracted grids), `organisms/blocks.tsx` (`ClosingCta` props), `organisms/sections.tsx` (`FaqSection` help), `atoms/form.tsx`, `hooks/use-document-meta.ts`, `.env.example`.

---

## 4. Phases

Each phase ends with `npm run build` passing and a visual check in the browser at 1440px and 390px against its design image.

### Phase 1: Data and demo layer (no UI)

**`lib/careers.ts`**

- Types:
  - `Question {id,label,type:'text'|'long_text'|'number'|'date'|'yes_no'|'choice',required,options}`;
  - `JobSummary {token,title,description,closesAt, department?,location?,employmentType?,postedAt?}`;
  - `JobDetail = JobSummary & {accepting, questions}`;
  - `ApplyResult = {ok:true, reference?} | {ok:false, status, message}`.
- `mode()`: `'demo'` when `VITE_CAREERS_API` is empty **or** the URL has `?demo=1`, remembered in sessionStorage for the visit; otherwise `'live'`.
- `listJobs()`:
  - live: `GET {API}/jobs?site={siteCountry()}`;
  - demo: returns the demo jobs after 400 ms;
  - `?demo=empty` returns `[]`, to show the "no roles" state.
- `getJob(token)`:
  - live: `GET {API}/jobs/:token`, and a 404 becomes `null`;
  - demo: finds the job, after 300 ms.
- `apply(token, values, file)`:
  - builds `FormData`: `name, email, phone, cv, answers` (as JSON), `site`, `source`, `website` (the honeypot);
  - aborts after 60 s;
  - maps the server's status codes: 201 → ok, 400 / 409 / 410 / 429 → its `message`, a network failure → `{status:0}`.
  - Demo waits 1.5 s, then:
    - `dup@demo.com` → 409;
    - `fail@demo.com` → network error;
    - otherwise ok with reference `TA-APP-YYMM-nnn` (reusing `makeReference` from `formsubmit.ts`).
- `slug(title)`: lowercase, words joined by "-".
- `captureSource()`: reads `?source=` or `?utm_source=` once into sessionStorage. Called from `/careers` and the job page.

**`content/careers-demo.ts`:** 7 jobs, all with real text. The 6 from the designs, plus "Truck Dispatcher (2025)" closed. NOC Technician carries the full question set from design 4:

- years (number, required);
- night shifts (yes_no, required);
- shift (choice, 4 options);
- qualification (choice, 6 options, so it shows as a select);
- start date (date);
- why (long_text);
- current location (text);
- LinkedIn (text).

**`hooks/use-load.ts`**, about 15 lines: `useLoad(fn, deps)` returns `{data, error, loading, retry}`.

**`.env.example`:** add `VITE_CAREERS_API=` with a one-line comment.

✅ Done when calling `listJobs` or `getJob` from the browser console returns the demo data.

### Phase 2: Atoms

| Part            | Spec (from design 9)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Badge`         | `h-6 px-2 rounded text-micro font-medium`. Variants: `type` (bg `#E3ECFD`, ink text), `closed` (bg `#E8E9ED`, muted text, `Lock` icon at 12px), `demo` (white with a red border and red text)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `CheckboxField` | A native `<input type=checkbox>` hidden with `peer`, and a 20px square `rounded-xs` box with a `line-strong` border. Checked: `bg-ink` with a white `Check` icon. Focus: a 2px ink outline. Error: a danger border and a message, using the `FieldShell` message style. The label can hold links                                                                                                                                                                                                                                                                                                                                                                                                            |
| `FileField`     | A `<label>` drop zone with a 1px dashed `line-strong` border, `rounded`, padding 20px, an `Upload` icon and "Drop your CV here or **browse**", with the hint "PDF or Word (.docx), max 5 MB". It has 5 states: **empty**; **drag-over** (2px dashed ink border, fill `#E3ECFD`, "Drop to upload your CV"); **selected** (the file row: icon in a light-blue square, name, "PDF · 412 KB", a green check, and "Replace" / "Remove"); **error** (dashed danger border, faint red fill, message, "Choose another file"); **disabled** while sending. It checks type and size in the browser: `.pdf` / `.docx` only, at most 5 MB. A hidden input keeps it working by keyboard; Enter or Space opens the picker |
| `ChipGroup`     | add `required`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

✅ Done when the parts match design 9 in a temporary page; the temporary page is then deleted.

### Phase 3: Molecules (`molecules/jobs.tsx`)

| Part           | Spec                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JobRow`       | A link, the whole row clickable. Grid: `[2.5rem_1fr_auto]`, and on desktop `[3.5rem_1fr_auto]`. It holds the number, title (`text-h4 tablet:text-[1.375rem]`) with a `Badge`, a meta line (MapPin · Briefcase · CalendarDays "Closes 1 Dec 2026", each shown only if present), and an outline `sm` "View Role ↗" (desktop) or an arrow (mobile). Hover: title red, `bg-[#F5F8FE]`, the button fills ink. Focus-visible: a 2px ink outline. Hairline `border-b`, first row `border-t`. Variant `compact` (title and location only) for the side boxes |
| `KeyFacts`     | `dl`, one `rounded` box with a `line` border and cells split by hairlines: 4 across on `lg`, 2×2 below. Cell: an `Eyebrow`-style label and a `text-h4` value. A `muted` variant greys the values (closed role)                                                                                                                                                                                                                                                                                                                                       |
| `InfoBox`      | A white `rounded` box with a `line` border, padding 24–28px and an optional title (`text-h4`). A `tone="blue"` variant (`#E3ECFD`, no border) is used for "Your Data Is Safe"                                                                                                                                                                                                                                                                                                                                                                        |
| `EmptyState`   | A 48px `#E3ECFD` square with an icon, a `Heading` (lead + quiet), text and actions. Left-aligned, never centred                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `ErrorSummary` | `role="alert"`, `tabIndex=-1` and focused on show. Faint red box with a red border, an `AlertCircle`, a title and a list of buttons that focus each field. It also covers the server error, with phone, WhatsApp and email links (the pattern from `QuoteForm`)                                                                                                                                                                                                                                                                                      |
| `StepsGrid`    | Extracted from Services, unchanged visually: `items: {no,title,text}[]`, with a `cols` prop (2 for a 2×2 grid, 1 for the single column on the thank-you page, plus an optional `aside` text on the right of each row)                                                                                                                                                                                                                                                                                                                                |
| `IconGrid`     | Extracted from Services: `items:{icon,title,text}[]`, columns 2 or 3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Then switch `routes/services.tsx` to `StepsGrid` and `IconGrid`. It should look the same before and after.

✅ Done when Services looks unchanged and each part matches design 9.

### Phase 4: `/careers` (designs 1 and 2)

`routes/careers.tsx`, top to bottom:

1. `PageHead`:
   - label "Careers";
   - lead "Build Your Career" with quiet `<span class=text-accent>Across East Africa.</span>`;
   - aside: paragraph, a MapPin line "{n} open roles · Rwanda · Uganda · Kenya · Tanzania" (n comes live from the API), and an accent `LinkButton` "View Open Roles" pointing to `#roles`.
2. **`JobBoard`** organism (`id="roles"`):
   - **Filter band** (white, hairlines):
     - an underline search `Field` with a Search icon and a clear `X` button;
     - two `ChipGroup`s, Department and Type, each with "All" first. **Built from the jobs actually returned**, so there are never empty chips;
     - "Showing n roles" on the right.
   - **Filters live in the URL:** `?q=&dept=&type=`, through `useSearchParams`, so Back and sharing work. Filtering is in the browser (title, department and location contain `q`, case-insensitive).
   - **List** inside `Split`:
     - left: Eyebrow "Open Roles", Heading "Find Your" with red "Place.", and text;
     - right: a `JobRow` for each job.
   - **States:**
     - _loading_: 4 skeleton rows of the same height (design 2C), with the chips and counter as skeletons;
     - _no results_: `EmptyState` with SearchX, "No Roles Match "{q}"", "Clear Filters" and "See all roles", then "Popular right now" with 2 `JobRow`s (design 2A);
     - _no roles_: hide the filter band; `EmptyState` with Briefcase, "No Open Roles Right Now." and quiet "New Roles Are Posted Here First.", plus "Follow on LinkedIn" (`site.social` LinkedIn) and "Back to Home" (design 2B). The head aside line becomes "No open roles right now";
     - _error_: `EmptyState` with AlertCircle, "Careers is temporarily unavailable.", "Try again" (`retry`) and "Email careers@tekaccess.rw".
3. **Why TekAccess:** `Section` on `#E3ECFD` (same class string as Services "What's included"), with `Heading` "Work That Moves" / quiet "the Region." and an `IconGrid` of 6 tiles from `content/careers.ts`.
4. **How hiring works:** white `Section`, `Heading` "From Application to" / quiet "Offer.", and a `StepsGrid` of 4.
5. `FaqSection items={faqsFor("careers")} lead="Frequently Asked" quiet="Questions." help={<>Still unsure? <TextAnchor href="mailto:careers@…">Email careers@tekaccess.rw</TextAnchor></>}`. Add 5 FAQs tagged `careers` to `content/faqs.ts`.
6. `ClosingCta` with careers props: "Don't See Your Role?" / "We're Always Growing.", text, an "Or email careers@tekaccess.rw" link, and an accent "Follow on LinkedIn".

Meta: title "Careers", description, path `/careers`, JSON-LD `ItemList` of job URLs.

✅ Done when it matches design 1 at 1440px. All of design 2's states are reachable: `?q=driver`, `?demo=empty`, and the loading state when the network is throttled.

### Phase 5: `/careers/:token/:slug` (designs 3 and 7)

`routes/career.tsx`:

- Load with `getJob(token)`. If the `slug` in the address isn't the expected one, `navigate(replace)` to the correct slug.
- **Not found** (null): design 7B.
  - `PageHead`-like paper band: a `Link2Off` icon in a square, Eyebrow "Error 404", display Heading "This Role Can't Be Found." / quiet "The Link May Be Old.", text, then accent "See Open Roles" and outline "Contact Us".
  - Right side: an `InfoBox` "Quick links" with 4 rows (`/careers`, `/careers#how`, `/careers#faq`, mailto).
  - Below: "Open roles right now" with 3 compact `JobRow`s.
  - `noindex`.
- **Open job** (design 3):
  1. `PageHead compact`:
     - crumbs: Careers / {department};
     - a back `TextLink` "← All Open Roles" above;
     - lead {title} with `Badge`, then quiet in red "{location}." (shown only if present);
     - a meta row of icons;
     - aside: intro sentence (the first sentence of the description), an accent "Apply for This Role" link to `apply`, and an outline "Share Role" (`navigator.share` or copy plus a toast).
  2. `KeyFacts` (only the facts present, plus "Applications close"; "Open until filled" when `closesAt` is null).
  3. Grid with the description in 7 columns and the aside in 4 columns starting at column 9 (`lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]`):
     - **Description renderer** (inside `career.tsx`, about 25 lines). Splits the plain text into blocks:
       - a line ending in ":" or a short line in Title Case becomes an `h2` heading in `text-h3`;
       - lines starting with "-", "•" or "*" become a list with red square bullets;
       - anything else becomes paragraphs.

       It keeps line breaks and never injects HTML.

     - **What We Offer:** an `IconGrid` with 2 columns. Uses the job's `benefits` if the API ever sends them; otherwise the shared defaults from `content/careers.ts`.
     - **How to Apply:** a paragraph and an accent button.
     - **Aside:**
       - `ApplyAside` (an `InfoBox` with Clock, FileText and Calendar lines, a full-width accent "Apply Now", and the small privacy line);
       - an `InfoBox` "Share This Role" with 3 square 40px icon buttons (copy / WhatsApp `wa.me/?text=` / LinkedIn share URL) and "Copy link";
       - an `InfoBox` "Other Open Roles" with 3 compact rows and "See All Roles".
  4. `ClosingCta`: "Ready to Join the Team?" / "Applications Take 5 Minutes.", plus email and "Apply Now".
  5. **Mobile:** `StickyBar` (`lg:hidden`, fixed to the bottom, white, `border-t`, padded for the safe area: "Closes 1 Dec 2026" plus accent "Apply Now"). An IntersectionObserver hides it while `ApplyAside` or the "How to Apply" button is on screen.
- **Closed job** (`accepting === false`), design 7A:
  - same page, but the head's quiet location is grey instead of red;
  - a `Badge closed` and "Closed on {date}";
  - the aside becomes an `InfoBox` notice (Clock, "This Role Is No Longer Accepting Applications.", ink "See Open Roles");
  - `KeyFacts muted`;
  - the description is hidden (the API sends it empty) with the grey line "The full description is no longer shown.";
  - then "Still Looking?" / red "These Are Open." with 3 `JobRow`s;
  - no sticky bar, no JSON-LD, `noindex`.

Meta: title `{title}, {location}`; JSON-LD `JobPosting` (title, description, datePosted, validThrough, employmentType mapped to FULL_TIME / CONTRACTOR / INTERN / PART_TIME, hiringOrganization TekAccess + logo + `location.origin`, jobLocation (city and country), `directApply: true`), only when open.

✅ Done when it matches design 3; demo token `closed-demo` matches 7A, and a made-up token matches 7B.

### Phase 6: `/careers/:token/:slug/apply` (designs 4 and 5)

`routes/career-apply.tsx`:

- Load the job. Not found or closed redirects to the job page, which shows the right state.
- Compact head band:
  - "← Back to Role";
  - Eyebrow "Application";
  - Heading "Applying for" with red "{title}.";
  - meta icons;
  - aside "It takes about 5 minutes. Fields marked * are required."
- **Progress guide** (desktop `lg`): a sticky row under the header with 4 anchors "01 Your Details — 02 Your CV — 03 Questions — 04 Consent". Done = ink with a tick (the section passes validation); current = the section in view (IntersectionObserver); upcoming = grey. **Mobile**: "Step n of 4 · {name}" and a 2px ink bar.
- Grid: `CareerForm` in 8 columns, aside in 4 columns, sticky:
  - summary `InfoBox`: "You are applying for", title, Badge, icons and "View role details";
  - `InfoBox tone=blue` "Your Data Is Safe";
  - "Need help?" with the email and WhatsApp.

**`organisms/career-form.tsx`, `CareerForm({ job })`:**

- **The zod schema is built from the job:**
  - fixed fields: `name` (2–200), `email` (email, max 254), `phone` (`/^[+()\d\s-]{7,40}$/`), `cv` (File: type and 5 MB), `consent` (must be `true`), `website` (max 0);
  - `answers.{q.id}` for each question:
    - `text` / `long_text`: max 2000;
    - `number`: a numeric string;
    - `date`: `YYYY-MM-DD`;
    - `yes_no`: `'yes' | 'no'`;
    - `choice`: `enum(options)`;
    - required ones need a value, and messages use the question label ("Please answer this question.").
- **Sections:** each opens with a red `01.`–`04.` and an `h2` `text-h3`, with `id`s for the anchors.
  - **01 Your Details:** `Field` × 3 in 2 columns: Full Name *, Email Address *, Phone *.
  - **02 Your CV:** `FileField`.
  - **03 A Few Questions** (hidden when there are none), drawn by type:

    | type        | component                                                         |
    | ----------- | ----------------------------------------------------------------- |
    | `text`      | `Field`                                                           |
    | `long_text` | `TextareaField`, 4 rows, with a live "n / 2000" counter           |
    | `number`    | `Field type=number inputMode=numeric`                             |
    | `date`      | `Field type=date`                                                 |
    | `yes_no`    | `ChipGroup ["Yes","No"]` → sends `yes` / `no`                     |
    | `choice`    | `ChipGroup` if there are up to 5 options, otherwise `SelectField` |
    | unknown     | `Field` (safe fallback)                                           |

  - **04 Consent:** `CheckboxField` "I agree that TekAccess stores my application to assess it for this role." plus a "Privacy Notice" link to `/legal/privacy`.
- **Submit row:** accent `lg` "Send Application" plus the grey line "You will get a confirmation by email."
- Honeypot (hidden, as in `QuoteForm`).
- **On submit with errors:** show an `ErrorSummary` at the top listing each bad field. Clicking an item focuses the field; the first error gets focus automatically.
- **While sending:** fieldset `disabled`, the form dims to 60%, and the button shows `loading` with "Sending…". The line becomes "Uploading your CV… please keep this page open." with a 2px ink bar that moves as an indeterminate animation (an honest bar, because `fetch` gives no upload progress). `shortcut: indeterminate bar, use XHR upload progress if users report slow uploads.`
- **Result:**
  - ok → `navigate('/careers/sent', {state:{name, email, title, location, type, reference, sentAt}})`;
  - 409 → `ErrorSummary` server variant "You have already applied…" plus contact links;
  - 410 → navigate to the job page, which shows closed;
  - 400 → the server message;
  - 429 → "Too many attempts. Please wait a few minutes.";
  - network → "Could not connect. Check your internet connection and try again. Nothing you typed is lost." with a "Try Again" button.
  - Typed values are never cleared.
- **Leaving with unsaved input:** a `beforeunload` warning once anything is typed (it isn't fired after success).
- **Mobile:** `StickyBar` with a full-width "Send Application" (`type=submit form=career-form`).

✅ Done when it matches design 4 when filled. Each state in design 5 is reachable: submit empty; pick a 6 MB file and a `.jpg`; drag a file over; `dup@demo.com`; `fail@demo.com`; and a normal send shows "Sending…".

### Phase 7: `/careers/sent` (design 6)

`routes/career-sent.tsx` reads the navigation state. With **no state** (a reload or a direct visit), it shows the general "Application sent" version without a name or reference, with links. It never crashes.

1. Light-blue band (reuses `PageHead` structure):
   - a 64px ink square with a white Check;
   - Eyebrow "Application sent";
   - display "Thank You, {first name}." with red quiet "Your Application Is In.";
   - text with the masked email (`j••••••@gmail.com`);
   - a reference box (label, tabular value, copy button + toast).
   - aside: an `InfoBox` "You applied for" with the title, Badge, MapPin, CalendarDays "Sent 17 November 2026, 10:42", and "Keep your reference if you contact us."
2. White `Section`: Eyebrow "What happens next", Heading "From Application to" / quiet "Offer.", a `StepsGrid cols=1` of 3 with timing on the right, and the grey note under it.
3. "Other open roles" / Heading "You Might Also" with red "Like.", 3 `JobRow`s (excluding the applied job), then ink "See All Roles" and outline "Back to Home".

- `noindex`. Focus moves to the h1 on arrival, for screen readers.

✅ Done when it matches design 6.

### Phase 8: Wiring, SEO, country, demo bar

1. **Routes** in `router.tsx`, **before** `*`:
   ```
   { path: "careers", lazy: lazy(pages.careers) },
   { path: "careers/sent", lazy: lazy(pages.careerSent) },
   { path: "careers/:token/:slug?", lazy: lazy(pages.career) },
   { path: "careers/:token/:slug/apply", lazy: lazy(pages.careerApply) },
   ```
   Also add to `preload.ts` (`pages` + `byPath`: `/careers` exact, `/careers/sent`, `/careers/.+/apply`, `/careers/.+`).
2. **Nav:** `{ label: "Careers", to: "/careers" }` in `content/site.ts`, between Blog and Contact. Check that the 6 header items fit at `lg` (1024px). If they don't, reduce the item padding `px-3.5` to `px-3` at `lg` only.
3. **Canonical per country** (`use-document-meta.ts`): use `window.location.origin` instead of the hard-coded `site.url` for canonical, `og:url` and the JSON-LD organisation URL. Otherwise `.ug`, `.ke` and `.tz` job pages tell Google the page lives on `.rw`. This also fixes every other page.
4. **`DemoBar`:** in demo mode, a slim navy strip under the header ("Demo mode — nothing is sent. Applications here are examples only." with an ×; the dismissal lasts the visit). Careers routes only.
5. **robots:** apply and sent pages are `noindex`. The list and job pages are indexable.
6. `vercel.json`: nothing needed; the SPA rewrite already covers `/careers/*`.

### Phase 9: Quality pass (check, not new features)

- **Visual:**
  - screenshots of every route and state at 1440, 1024, 810 and 390px with the existing Playwright script approach, compared side by side with the 9 designs;
  - fix spacing, type and alignment drift.
- **Break test** with worst-case data in demo:
  - a 200-character title;
  - a 300-character question label;
  - 10 choice options;
  - a 10,000-character description;
  - no location or department;
  - `closesAt` null;
  - 0, 1 and 40 jobs.

  Nothing may overflow or wrap badly.

- **Keyboard:**
  - Tab through list → job → form → submit;
  - every control reachable, with a visible ink focus ring;
  - the drop zone opens with Enter;
  - the error summary takes focus;
  - chips work as radio buttons with the arrow keys.
- **Screen reader:** labels, `aria-invalid`, `aria-describedby`, `role=alert` on errors, the page h1 focused after send.
- **Motion:** reuse `data-reveal` (fade / stagger / lines), add no new animation, respect `prefers-reduced-motion` (already in `lib/motion`).
- **Performance:**
  - careers chunks lazy, as now;
  - no new dependencies;
  - the demo data file is imported only in demo mode (`await import`), so the live bundle never carries it.
- `npm run lint` and `npm run build` are clean.
- **Live switch test:** set `VITE_CAREERS_API` to the backend and confirm the list, the job and one real application from outside the VPN. This depends on backend items 1–4 in the website guide.

---

## 5. Order and size

| Phase | What                                  | Size |
| ----- | ------------------------------------- | ---- |
| 1     | Data + demo                           | S    |
| 2     | Atoms (Badge, Checkbox, FileField)    | S    |
| 3     | Molecules + Services extraction       | M    |
| 4     | `/careers` + states                   | M    |
| 5     | Job page + closed + 404               | M    |
| 6     | Apply form + all states               | L    |
| 7     | Sent page                             | S    |
| 8     | Wiring, nav, SEO, canonical, demo bar | S    |
| 9     | Quality pass                          | M    |

Each phase is built, checked against its design image, then the next one starts. Nothing is committed or pushed until you say so (this repo's remote is `tanzania/main`).

## 6. Out of scope here (backend side, already listed in the website guide)

These are backend work and stay out of this repo:

- open `/api/v1/careers/*` past the VPN gate;
- CORS for the 4 domains;
- the `?site=` filter;
- saving `site` and `source`;
- `location`, `department` and `employmentType` in the API;
- Turnstile keys.

Until they're done, the website runs in demo mode.

---

## Update, 17 Nov 2026: demo removed

- **Removed:** the demo jobs (`content/careers-demo.ts`), the built-in careers wording (`content/careers.ts`), the careers FAQ entries in `content/faqs.ts`, the demo bar and `?demo=` modes.
- **Where the data comes from now:** every careers page reads only from the TekAccess system:
  - jobs: `GET /careers/jobs?site=`, `GET /careers/jobs/:token`;
  - wording: `GET /careers/settings`, set by HR in HR ▸ Hiring ▸ Careers site.
- **Required setting:** `VITE_CAREERS_API`. Without it, or when the system can't be reached, the pages show "Careers Is Temporarily Unavailable" with Try Again.
- **Job page:** it still opens if only the wording fails to load. It then hides "What We Offer" and the email links.
