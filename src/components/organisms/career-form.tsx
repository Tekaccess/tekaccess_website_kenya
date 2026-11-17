import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Check, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  CheckboxField,
  ChipGroup,
  Field,
  FileField,
  SelectField,
  TextareaField,
} from "@/components/atoms/form";
import { ErrorSummary } from "@/components/molecules/jobs";
import { StickyBar } from "@/components/organisms/careers";
import {
  MAX_ANSWER,
  MAX_CV,
  apply,
  jobPath,
  type ApplyResult,
  type JobDetail,
  type Question,
} from "@/lib/careers";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { useScrollState } from "@/hooks/use-media";

const CV_TYPES = /\.(pdf|docx)$/i;
const cvProblem = (f: File) =>
  !CV_TYPES.test(f.name)
    ? `Please upload a PDF or Word (.docx) file.${/\.(jpe?g|png|heic|webp)$/i.test(f.name) ? " Photos are not accepted." : ""}`
    : f.size > MAX_CV
      ? `This file is ${(f.size / 1048576).toFixed(1)} MB. The limit is 5 MB. Try exporting it again as PDF.`
      : null;

const KNOWN = ["text", "long_text", "number", "date", "yes_no", "choice"];
const asChips = (q: Question) =>
  q.type === "yes_no" || (q.type === "choice" && q.options.length <= 5);

/** zod rules for one HR question, mirroring checkAnswers() on the backend. */
function rule(q: Question) {
  const need = "Please answer this question.";
  let s: z.ZodType<string> = z
    .string().trim().max(MAX_ANSWER, "This answer is too long.");
  if (q.type === "number")
    s = s.refine(
      (v) => v === "" || !Number.isNaN(Number(v)),
      "Please enter a number.",
    );
  if (q.type === "date")
    s = s.refine(
      (v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v),
      "Please pick a date.",
    );
  if (q.type === "yes_no")
    s = s.refine(
      (v) => v === "" || v === "yes" || v === "no",
      "Please choose Yes or No.",
    );
  if (q.type === "choice")
    s = s.refine(
      (v) => v === "" || q.options.includes(v),
      "Please choose one of the options.",
    );
  return q.required
    ? s.refine(
        (v) => v !== "",
        q.type === "yes_no"
          ? "Please choose Yes or No."
          : q.type === "choice"
            ? "Please choose an option."
            : need,
      )
    : s;
}

function schemaFor(questions: Question[]) {
  return z.object({
    name: z.string().trim().min(2, "Please enter your full name.").max(200),
    email: z
      .string()
      .trim()
      .max(254)
      .email(
        "That email doesn't look right. Check it has a full ending like .com",
      ),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter your phone number.")
      .refine(
        (v) => /^[+()\d\s-]{7,40}$/.test(v),
        "Use digits, spaces and an optional +.",
      ),
    cv: z
      .custom<File>((v) => v instanceof File, "Please attach your CV.")
      .refine(
        (f) => !cvProblem(f),
        "Please attach a PDF or Word file under 5 MB.",
      ),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please tick the box to agree." }),
    }),
    answers: z.object(
      Object.fromEntries(questions.map((q) => [q.id, rule(q)])),
    ),
    website: z.string().max(0).optional(),
  });
}
type Values = {
  name: string;
  email: string;
  phone: string;
  cv: File | null;
  consent: boolean;
  answers: Record<string, string>;
  website?: string;
};

const SECTIONS = [
  { id: "sec-details", no: "01", title: "Your Details" },
  { id: "sec-cv", no: "02", title: "Your CV" },
  { id: "sec-questions", no: "03", title: "A Few Questions" },
  { id: "sec-consent", no: "04", title: "Consent" },
];

/** The application form. Fixed fields + HR's questions drawn by type, sent to the TekAccess system. */
/** Help lines for this country's site and the privacy link, from HR's careers settings. */
export type FormContacts = { email: string; phone: string; whatsapp: string; privacyUrl: string };
const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
const wa = (n: string) => `https://wa.me/${n.replace(/\D/g, "")}`;

export function CareerForm({ job, contacts }: { job: JobDetail; contacts: FormContacts }) {
  const navigate = useNavigate();
  const schema = useMemo(() => schemaFor(job.questions), [job.questions]);
  const sections = job.questions.length
    ? SECTIONS
    : SECTIONS.filter((s) => s.id !== "sec-questions");
  const {
    register,
    control,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isSubmitting, isSubmitted, isDirty },
  } = useForm<Values>({
    resolver: zodResolver(schema) as never,
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cv: null,
      consent: false,
      website: "",
      answers: Object.fromEntries(job.questions.map((q) => [q.id, ""])),
    },
  });
  const [server, setServer] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const [sent, setSent] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const v = watch();

  // Warn before leaving with typed answers (not after a successful send).
  useEffect(() => {
    if (!isDirty || sent) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [isDirty, sent]);

  const fieldErrors: { id: string; label: string }[] = [
    errors.name && { id: "name", label: "Full name" },
    errors.email && { id: "email", label: "Email address" },
    errors.phone && { id: "phone", label: "Phone" },
    errors.cv && { id: "cv", label: "Your CV" },
    ...job.questions
      .filter((q) => errors.answers?.[q.id])
      .map((q) => ({ id: `answers.${q.id}`, label: q.label })),
    errors.consent && { id: "consent", label: "Consent" },
  ].filter(Boolean) as { id: string; label: string }[];

  const focusField = (id: string) => {
    const el =
      document.getElementById(id === "cv" ? "cv-zone" : id) ??
      document.getElementById(`q-${id.replace("answers.", "")}`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    if (el instanceof HTMLElement) el.focus({ preventScroll: true });
    else setFocus(id as never);
  };

  const onSubmit = async (val: Values) => {
    setServer(null);
    if (val.website) return; // bot
    const res = await apply(job.token, {
      name: val.name,
      email: val.email,
      phone: val.phone,
      cv: val.cv as File,
      answers: val.answers,
      website: val.website,
    });
    if (res.ok) {
      setSent(true);
      navigate("/careers/sent", {
        state: {
          name: val.name.split(" ")[0],
          email: val.email,
          title: job.title,
          location: job.location,
          type: job.employmentType,
          token: job.token,
          reference: res.reference,
          sentAt: new Date().toISOString(),
        },
      });
      return;
    }
    const fail = res as Extract<ApplyResult, { ok: false }>;
    if (fail.status === 410) return navigate(jobPath(job), { replace: true });
    setServer({ status: fail.status, message: fail.message });
    requestAnimationFrame(() => summary.current?.focus());
  };

  const onInvalid = () => requestAnimationFrame(() => summary.current?.focus());

  // Section completion for the progress guide.
  const done = {
    "sec-details":
      !!(v.name && v.email && v.phone) &&
      !errors.name &&
      !errors.email &&
      !errors.phone,
    "sec-cv": !!v.cv,
    "sec-questions":
      job.questions.every(
        (q) => !q.required || (v.answers?.[q.id] ?? "") !== "",
      ) && !errors.answers,
    "sec-consent": !!v.consent,
  } as Record<string, boolean>;

  const serverTitle = server
    ? server.status === 0
      ? "Could not connect."
      : server.status === 429
        ? "Too many attempts."
        : "Your application didn't go through."
    : "";
  const serverText = server
    ? server.status === 0
      ? "Check your internet connection and try again. Nothing you typed is lost."
      : server.status === 429
        ? "Please wait a few minutes, then try again."
        : server.message || "Please try again in a moment."
    : "";

  const heading = (i: number) => {
    const s = sections[i];
    return (
      <h2 className="flex items-baseline gap-3 text-h3 font-medium text-ink">
        <span className="tabular text-accent">
          {String(i + 1).padStart(2, "0")}.
        </span>{" "}
        {s.title}
      </h2>
    );
  };

  return (
    <>
      <Progress sections={sections} done={done} />
      <form
        id="career-form"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
        aria-label={`Application for ${job.title}`}
        className="relative"
      >
        {(server || (isSubmitted && fieldErrors.length > 0)) && (
          <div className="mb-10">
            {server ? (
              <ErrorSummary focusRef={summary} title={serverTitle}>
                <p>{serverText}</p>
                {server.status !== 0 && server.status !== 429 && (
                  <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    <a
                      href={tel(contacts.phone)}
                      className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-4"
                    >
                      <Phone aria-hidden className="size-4" /> {contacts.phone}
                    </a>
                    <a
                      href={wa(contacts.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-4"
                    >
                      <MessageCircle aria-hidden className="size-4" /> WhatsApp
                    </a>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-4"
                    >
                      <Mail aria-hidden className="size-4" /> {contacts.email}
                    </a>
                  </p>
                )}
              </ErrorSummary>
            ) : (
              <ErrorSummary
                focusRef={summary}
                title={`Please fix ${fieldErrors.length} ${fieldErrors.length === 1 ? "thing" : "things"} before sending.`}
                items={fieldErrors}
                onPick={focusField}
              />
            )}
          </div>
        )}

        <fieldset
          disabled={isSubmitting}
          className={cn(
            "space-y-14 transition-opacity duration-2",
            isSubmitting && "opacity-60",
          )}
        >
          <section
            id="sec-details"
            aria-labelledby="sec-details-h"
            className="scroll-mt-[calc(var(--header-h)+5rem)] space-y-8"
          >
            <div id="sec-details-h">{heading(0)}</div>
            <div className="grid gap-x-8 gap-y-8 tablet:grid-cols-2">
              <Field
                id="name"
                label="Full Name"
                required
                autoComplete="name"
                placeholder="Jean Mukamana"
                error={errors.name?.message}
                {...register("name")}
              />
              <Field
                id="email"
                label="Email Address"
                required
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Field
                id="phone"
                label="Phone"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+250 7XX XXX XXX"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
          </section>

          <section
            id="sec-cv"
            aria-labelledby="sec-cv-h"
            className="scroll-mt-[calc(var(--header-h)+5rem)] space-y-6 border-t border-line pt-10"
          >
            <div id="sec-cv-h">{heading(1)}</div>
            <Controller
              control={control}
              name="cv"
              render={({ field }) => (
                <div id="cv-zone" tabIndex={-1} className="outline-none">
                  <FileField
                    id="cv"
                    label="CV"
                    required
                    hint="PDF or Word (.docx), max 5 MB."
                    value={field.value}
                    onChange={(f) => field.onChange(f)}
                    error={errors.cv?.message}
                    disabled={isSubmitting}
                    maxBytes={MAX_CV}
                    validate={cvProblem}
                  />
                </div>
              )}
            />
          </section>

          {job.questions.length > 0 && (
            <section
              id="sec-questions"
              aria-labelledby="sec-questions-h"
              className="scroll-mt-[calc(var(--header-h)+5rem)] space-y-8 border-t border-line pt-10"
            >
              <div id="sec-questions-h">{heading(2)}</div>
              {job.questions.map((q) => (
                <QuestionField
                  key={q.id}
                  q={q}
                  control={control}
                  register={register}
                  error={errors.answers?.[q.id]?.message}
                  value={v.answers?.[q.id] ?? ""}
                />
              ))}
            </section>
          )}

          <section
            id="sec-consent"
            aria-labelledby="sec-consent-h"
            className="scroll-mt-[calc(var(--header-h)+5rem)] space-y-6 border-t border-line pt-10"
          >
            <div id="sec-consent-h">{heading(sections.length - 1)}</div>
            <CheckboxField
              id="consent"
              required
              error={errors.consent?.message}
              label={
                <>
                  I agree that TekAccess stores my application to assess it for
                  this role.{" "}
                  <a
                    href={contacts.privacyUrl}
                    target="_blank"
                    className="font-medium text-ink underline underline-offset-4"
                  >
                    Privacy Notice
                  </a>
                </>
              }
              {...register("consent")}
            />
          </section>

          {/* honeypot */}
          <div
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </label>
          </div>
        </fieldset>

        <div className="mt-12 border-t border-line pt-8">
          <div className="apply-cta flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              arrow
              loading={isSubmitting}
            >
              {isSubmitting
                ? "Sending…"
                : server?.status === 0
                  ? "Try Again"
                  : "Send Application"}
            </Button>
            <p className="text-small text-muted" aria-live="polite">
              {isSubmitting
                ? "Uploading your CV… please keep this page open."
                : "You will get a confirmation by email."}
            </p>
          </div>
          {isSubmitting && (
            <div
              aria-hidden
              className="relative mt-5 h-0.5 overflow-hidden bg-line"
            >
              <div className="absolute inset-y-0 w-1/3 animate-[careers-progress_1.4s_ease-in-out_infinite] bg-ink" />
            </div>
          )}
          {/* shortcut: indeterminate bar, switch to XHR upload progress if users report slow uploads. */}
        </div>
      </form>

      <StickyBar hideWhen=".apply-cta">
        <Button
          type="submit"
          form="career-form"
          variant="accent"
          size="lg"
          arrow
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Sending…" : "Send Application"}
        </Button>
      </StickyBar>
    </>
  );
}

type Ctl = ReturnType<typeof useForm<Values>>["control"];
type Reg = ReturnType<typeof useForm<Values>>["register"];

/** One HR question drawn by its type. Unknown types fall back to a text field. */
function QuestionField({
  q,
  control,
  register,
  error,
  value,
}: {
  q: Question;
  control: Ctl;
  register: Reg;
  error?: string;
  value: string;
}) {
  const name = `answers.${q.id}` as const;
  if (asChips(q)) {
    const yn = q.type === "yes_no";
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ChipGroup
            id={`q-${q.id}`}
            label={q.label}
            name={q.id}
            required={q.required}
            options={yn ? ["Yes", "No"] : q.options}
            value={
              yn
                ? field.value === "yes"
                  ? "Yes"
                  : field.value === "no"
                    ? "No"
                    : undefined
                : field.value
            }
            onChange={(o) => field.onChange(yn ? o.toLowerCase() : o)}
            error={error}
          />
        )}
      />
    );
  }
  if (q.type === "choice")
    return (
      <SelectField
        id={`q-${q.id}`}
        label={q.label}
        required={q.required}
        options={q.options}
        placeholder="Choose one"
        error={error}
        {...register(name)}
      />
    );
  if (q.type === "long_text")
    return (
      <div>
        <TextareaField
          id={`q-${q.id}`}
          label={q.label}
          required={q.required}
          rows={4}
          maxLength={MAX_ANSWER}
          error={error}
          {...register(name)}
        />
        <p className="mt-1 text-right text-micro tabular text-muted">
          {value.length} / {MAX_ANSWER}
        </p>
      </div>
    );
  const type =
    q.type === "number" ? "number" : q.type === "date" ? "date" : "text";
  return (
    <Field
      id={`q-${q.id}`}
      label={q.label}
      required={q.required}
      type={type}
      inputMode={type === "number" ? "decimal" : undefined}
      maxLength={
        KNOWN.includes(q.type) && type === "text" ? MAX_ANSWER : undefined
      }
      error={error}
      className="max-w-xl"
      {...register(name)}
    />
  );
}

/** Sticky guide: desktop anchor row with ticks; phone "Step n of 4" with a bar. Current = section in view. */
function Progress({
  sections,
  done,
}: {
  sections: typeof SECTIONS;
  done: Record<string, boolean>;
}) {
  const [current, setCurrent] = useState(sections[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (vis) setCurrent(vis.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);
  const idx = Math.max(
    0,
    sections.findIndex((s) => s.id === current),
  );
  const { hidden } = useScrollState();
  return (
    <nav
      aria-label="Application sections"
      // Sits under the header while it shows; moves to the very top when the header hides.
      style={{ top: hidden ? 0 : "var(--header-h)" }}
      className="sticky z-10 transition-[top] duration-3 ease-out -mx-gutter mb-10 border-b border-line bg-paper/95 px-gutter py-3 backdrop-blur lg:mx-0 lg:px-0"
    >
      <ol className="hidden items-center gap-3 lg:flex">
        {sections.map((s, i) => (
          <li
            key={s.id}
            className="flex flex-1 items-center gap-3 last:flex-none"
          >
            <a
              href={`#${s.id}`}
              aria-current={s.id === current ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap text-small",
                s.id === current
                  ? "font-medium text-ink"
                  : done[s.id]
                    ? "text-ink"
                    : "text-muted",
              )}
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full border",
                  done[s.id]
                    ? "border-ink bg-ink text-white"
                    : s.id === current
                      ? "border-ink"
                      : "border-line-strong",
                )}
              >
                {done[s.id] ? (
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                ) : (
                  s.id === current && (
                    <span className="size-1.5 rounded-full bg-ink" />
                  )
                )}
              </span>
              {String(i + 1).padStart(2, "0")}. {s.title}
              {done[s.id] && <span className="sr-only">(done)</span>}
            </a>
            {i < sections.length - 1 && (
              <span aria-hidden className="h-px flex-1 bg-line" />
            )}
          </li>
        ))}
      </ol>
      <div className="lg:hidden">
        <p className="text-small text-ink">
          Step {idx + 1} of {sections.length} · {sections[idx].title}
        </p>
        <div aria-hidden className="mt-2 h-0.5 bg-line">
          <div
            className="h-full bg-ink transition-[width] duration-3"
            style={{ width: `${((idx + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>
    </nav>
  );
}

