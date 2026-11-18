import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Check, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  CheckGroup,
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

const KNOWN = ["text", "long_text", "number", "date", "yes_no", "choice", "multi_choice", "email", "phone", "url", "file", "heading", "page_break"];
const LAYOUT = ["heading", "page_break"];
const answerable = (q: Question) => !LAYOUT.includes(q.type) && q.type !== "file";
const asChips = (q: Question) =>
  q.type === "yes_no" || (q.type === "choice" && q.options.length <= 5);

// Contract regexes (JOB_FORM_BUILDER_CONTRACT.md, Apply ▸ Validation).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9 ()-]{7,20}$/;
const URL_START = /^https?:\/\//;

const EXT: Record<string, string[]> = { pdf: ["pdf"], docx: ["docx"], image: ["png", "jpg", "jpeg", "webp"] };
const KIND_NAME: Record<string, string> = { pdf: "PDF", docx: "Word (.docx)", image: "photo (PNG, JPG or WebP)" };
const kindsOf = (q: Question) => (q.fileTypes?.length ? q.fileTypes : ["pdf", "docx", "image"]);
const acceptOf = (q: Question) => kindsOf(q).flatMap((k) => EXT[k] ?? []).map((e) => "." + e).join(",");
const kindsText = (q: Question) => kindsOf(q).map((k) => KIND_NAME[k] ?? k).join(" or ");
const fileProblem = (q: Question) => (f: File) => {
  const ext = (f.name.split(".").pop() || "").toLowerCase();
  if (!kindsOf(q).some((k) => EXT[k]?.includes(ext))) return `Please upload a ${kindsText(q)} file.`;
  return f.size > MAX_CV ? `This file is ${(f.size / 1048576).toFixed(1)} MB. The limit is 5 MB.` : null;
};

/** zod rules for one HR question, mirroring the contract's server checks. */
function rule(q: Question): z.ZodTypeAny {
  if (q.type === "multi_choice") {
    let a: z.ZodType<string[]> = z.array(z.string()).refine((v) => v.every((o) => q.options.includes(o)), "Please choose from the options.");
    if (q.maxPicks) a = a.refine((v) => v.length <= q.maxPicks!, `Pick up to ${q.maxPicks}.`);
    return q.required ? a.refine((v) => v.length > 0, "Please pick at least one.") : a;
  }
  const need = "Please answer this question.";
  let s: z.ZodType<string> = z
    .string().trim().max(MAX_ANSWER, "This answer is too long.");
  const ok = (test: (v: string) => boolean, msg: string) => (s = s.refine((v) => v === "" || test(v), msg));
  if (q.type === "number") {
    ok((v) => !Number.isNaN(Number(v)), "Please enter a number.");
    if (q.min != null) ok((v) => Number(v) >= q.min!, `Enter ${q.min} or more.`);
    if (q.max != null) ok((v) => Number(v) <= q.max!, `Enter ${q.max} or less.`);
  }
  if (q.type === "date") ok((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), "Please pick a date.");
  if (q.type === "yes_no") ok((v) => v === "yes" || v === "no", "Please choose Yes or No.");
  if (q.type === "choice") ok((v) => q.options.includes(v), "Please choose one of the options.");
  if (q.type === "email") ok((v) => EMAIL.test(v), "That email doesn't look right. Check it has a full ending like .com");
  if (q.type === "phone") ok((v) => PHONE.test(v), "Use 7 to 20 digits, spaces and an optional +.");
  if (q.type === "url") ok((v) => URL_START.test(v), "Start the link with https://");
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

function fileRule(q: Question) {
  const f = z.custom<File | null>((v) => v === null || v instanceof File).refine((v) => !v || !fileProblem(q)(v), `Please attach a ${kindsText(q)} file under 5 MB.`);
  return q.required ? f.refine((v) => v instanceof File, "Please attach this file.") : f;
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
      Object.fromEntries(questions.filter(answerable).map((q) => [q.id, rule(q)])),
    ),
    files: z.object(
      Object.fromEntries(questions.filter((q) => q.type === "file").map((q) => [q.id, fileRule(q)])),
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
  answers: Record<string, string | string[]>;
  files: Record<string, File | null>;
  website?: string;
};

const SECTIONS = [
  { id: "sec-details", no: "01", title: "Your Details" },
  { id: "sec-cv", no: "02", title: "Your CV" },
  { id: "sec-questions", no: "03", title: "A Few Questions" },
  { id: "sec-consent", no: "04", title: "Consent" },
];

/** A form page: page 1 holds details + CV, the last holds consent. `single` is one page of everything. */
type Page = { intro: boolean; questions: Question[]; consent: boolean; title: string };
function pagesFor(questions: Question[], steps: boolean): Page[] {
  if (!steps || !questions.length)
    return [{ intro: true, consent: true, title: "", questions: questions.filter((q) => q.type !== "page_break") }];
  const groups: Question[][] = [[]];
  for (const q of questions) {
    if (q.type === "page_break") groups.push([]);
    else groups[groups.length - 1].push(q);
  }
  const qs = groups.filter((g) => g.length);
  return [
    { intro: true, consent: false, title: "Your Details and CV", questions: [] },
    ...qs.map((g, i) => ({
      intro: false,
      consent: i === qs.length - 1,
      questions: g,
      title: g[0]?.type === "heading" ? g[0].label : "A Few Questions",
    })),
  ];
}
const nameOf = (q: Question) => (q.type === "file" ? `files.${q.id}` : `answers.${q.id}`);
const pageNames = (p: Page) => [
  ...(p.intro ? ["name", "email", "phone", "cv"] : []),
  ...p.questions.filter((q) => !LAYOUT.includes(q.type)).map(nameOf),
  ...(p.consent ? ["consent"] : []),
];

/** Help lines for this country's site and the privacy link, from HR's careers settings. */
export type FormContacts = { email: string; phone: string; whatsapp: string; privacyUrl: string };
const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
const wa = (n: string) => `https://wa.me/${n.replace(/\D/g, "")}`;

export function CareerForm({ job, contacts }: { job: JobDetail; contacts: FormContacts }) {
  const navigate = useNavigate();
  const schema = useMemo(() => schemaFor(job.questions), [job.questions]);
  const steps = job.formLayout === "steps";
  const pages = useMemo(() => pagesFor(job.questions, steps), [job.questions, steps]);
  const hasQuestions = job.questions.some((q) => !LAYOUT.includes(q.type));
  const sections = hasQuestions
    ? SECTIONS
    : SECTIONS.filter((s) => s.id !== "sec-questions");
  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    setFocus,
    getFieldState,
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
      answers: Object.fromEntries(job.questions.filter(answerable).map((q) => [q.id, q.type === "multi_choice" ? [] : ""])),
      files: Object.fromEntries(job.questions.filter((q) => q.type === "file").map((q) => [q.id, null])),
    },
  });
  const [server, setServer] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const [sent, setSent] = useState(false);
  const [page, setPage] = useState(0);
  const [tried, setTried] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstRender = useRef(true);
  const v = watch();
  const last = page === pages.length - 1;

  // Warn before leaving with typed answers (not after a successful send).
  useEffect(() => {
    if (!isDirty || sent) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [isDirty, sent]);

  // A field showing an error re-checks on every change, so a valid answer clears it at once.
  useEffect(() => {
    const sub = watch((_, { name }) => {
      if (name && getFieldState(name).invalid) void trigger(name);
    });
    return () => sub.unsubscribe();
  }, [watch, trigger, getFieldState]);

  // New page: back to the top of the form, focus on its heading (summary wins when it shows).
  useEffect(() => {
    if (firstRender.current) return void (firstRender.current = false);
    formRef.current?.scrollIntoView({ block: "start" });
    requestAnimationFrame(() => {
      if (summary.current) return summary.current.focus({ preventScroll: true });
      pageRefs.current[page]?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    });
  }, [page]);

  const allErrors: { id: string; label: string }[] = [
    errors.name && { id: "name", label: "Full name" },
    errors.email && { id: "email", label: "Email address" },
    errors.phone && { id: "phone", label: "Phone" },
    errors.cv && { id: "cv", label: "Your CV" },
    ...job.questions
      .filter((q) => (q.type === "file" ? errors.files?.[q.id] : errors.answers?.[q.id]))
      .map((q) => ({ id: nameOf(q), label: q.label })),
    errors.consent && { id: "consent", label: "Consent" },
  ].filter(Boolean) as { id: string; label: string }[];
  const here = pageNames(pages[page]);
  const fieldErrors = allErrors.filter((e) => here.includes(e.id));
  const pageOf = (id: string) => Math.max(0, pages.findIndex((p) => pageNames(p).includes(id)));

  const focusField = (id: string) => {
    const qid = id.replace(/^(answers|files)\./, "");
    const el =
      document.getElementById(id === "cv" ? "cv-zone" : id) ??
      document.getElementById(`q-${qid}-zone`) ??
      document.getElementById(`q-${qid}`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    if (el instanceof HTMLElement) el.focus({ preventScroll: true });
    else setFocus(id as never);
  };

  const next = async () => {
    if (!(await trigger(here as never))) {
      setTried(true);
      return requestAnimationFrame(() => summary.current?.focus());
    }
    setTried(false);
    setPage((p) => p + 1);
  };
  const back = () => {
    setTried(false);
    setServer(null);
    setPage((p) => p - 1);
  };

  const onSubmit = async (val: Values) => {
    setServer(null);
    if (val.website) return; // bot
    const files = Object.fromEntries(
      Object.entries(val.files ?? {}).filter((e): e is [string, File] => e[1] instanceof File),
    );
    const res = await apply(job.token, {
      name: val.name,
      email: val.email,
      phone: val.phone,
      cv: val.cv as File,
      answers: val.answers,
      files,
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
    // The 400 names the bad item in `field`; label matching is only a fallback for older servers.
    const key = fail.field?.replace(/^file_/, "");
    const byField = key && (["cv", "name", "email", "phone", "consent"].includes(key) ? key : job.questions.find((q) => q.id === key));
    const named = job.questions.find((q) => q.label && fail.message.includes(q.label));
    const to = byField
      ? pageOf(typeof byField === "string" ? byField : nameOf(byField))
      : named ? pageOf(nameOf(named)) : /\bcv\b/i.test(fail.message) ? 0 : page;
    if (to !== page) setPage(to);
    else requestAnimationFrame(() => summary.current?.focus());
  };

  const onInvalid = () => {
    const first = allErrorsFromForm();
    const to = first ? pageOf(first) : page;
    if (to !== page) setPage(to);
    else requestAnimationFrame(() => summary.current?.focus());
  };
  // errors state lags one render inside onInvalid, so read the names straight from the schema result order.
  const allErrorsFromForm = () => {
    const r = schema.safeParse(watch());
    if (r.success) return null;
    const names = r.error.issues.map((i) => i.path.slice(0, i.path[0] === "answers" || i.path[0] === "files" ? 2 : 1).join("."));
    return pages.flatMap(pageNames).find((n) => names.includes(n)) ?? null;
  };

  // Section completion for the progress guide (single layout).
  const filled = (q: Question) =>
    q.type === "file" ? !!v.files?.[q.id] : (v.answers?.[q.id]?.length ?? 0) > 0;
  const done = {
    "sec-details":
      !!(v.name && v.email && v.phone) &&
      !errors.name &&
      !errors.email &&
      !errors.phone,
    "sec-cv": !!v.cv,
    "sec-questions":
      job.questions.every((q) => LAYOUT.includes(q.type) || !q.required || filled(q)) &&
      !errors.answers && !errors.files,
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

  const heading = (id: string) => {
    const i = sections.findIndex((s) => s.id === id);
    return (
      <h2 tabIndex={-1} className="flex items-baseline gap-3 text-h3 font-medium text-ink outline-none">
        <span className="tabular text-accent">
          {String(i + 1).padStart(2, "0")}.
        </span>{" "}
        {sections[i].title}
      </h2>
    );
  };

  return (
    <>
      <Progress
        sections={sections}
        done={done}
        step={steps ? { index: page, total: pages.length, title: pages[page].title } : undefined}
      />
      <form
        ref={formRef}
        id="career-form"
        onSubmit={last ? handleSubmit(onSubmit, onInvalid) : (e) => (e.preventDefault(), void next())}
        noValidate
        aria-label={`Application for ${job.title}`}
        className="relative scroll-mt-[calc(var(--header-h)+5rem)]"
      >
        {(server || ((isSubmitted || tried) && fieldErrors.length > 0)) && (
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
                title={`Please fix ${fieldErrors.length} ${fieldErrors.length === 1 ? "thing" : "things"} ${last ? "before sending" : "to continue"}.`}
                items={fieldErrors}
                onPick={focusField}
              />
            )}
          </div>
        )}

        <fieldset
          disabled={isSubmitting}
          className={cn(
            "transition-opacity duration-2",
            isSubmitting && "opacity-60",
          )}
        >
          {/* Every page stays mounted (hidden) so Back keeps typed answers and chosen files. */}
          {pages.map((p, pi) => (
            <div
              key={pi}
              ref={(el) => void (pageRefs.current[pi] = el)}
              hidden={pi !== page}
              className="space-y-14"
            >
              {p.intro && (
                <>
                  <section
                    id="sec-details"
                    aria-labelledby="sec-details-h"
                    className="scroll-mt-[calc(var(--header-h)+5rem)] space-y-8"
                  >
                    <div id="sec-details-h">{heading("sec-details")}</div>
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
                    <div id="sec-cv-h">{heading("sec-cv")}</div>
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
                </>
              )}

              {p.questions.length > 0 && (
                <section
                  id={pi === pages.findIndex((x) => x.questions.length) ? "sec-questions" : undefined}
                  aria-labelledby={`sec-questions-h-${pi}`}
                  className={cn(
                    "scroll-mt-[calc(var(--header-h)+5rem)] space-y-8",
                    p.intro && "border-t border-line pt-10",
                  )}
                >
                  <div id={`sec-questions-h-${pi}`}>
                    {heading("sec-questions")}
                  </div>
                  {p.questions.map((q) => (
                    <QuestionField
                      key={q.id}
                      q={q}
                      control={control}
                      register={register}
                      error={(q.type === "file" ? errors.files?.[q.id] : errors.answers?.[q.id])?.message as string | undefined}
                      value={v.answers?.[q.id] ?? ""}
                      disabled={isSubmitting}
                    />
                  ))}
                </section>
              )}

              {p.consent && (
                <section
                  id="sec-consent"
                  aria-labelledby="sec-consent-h"
                  className="scroll-mt-[calc(var(--header-h)+5rem)] space-y-6 border-t border-line pt-10"
                >
                  <div id="sec-consent-h">{heading("sec-consent")}</div>
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
              )}
            </div>
          ))}

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
            {page > 0 && (
              <Button type="button" variant="outline" size="lg" onClick={back} disabled={isSubmitting}>
                Back
              </Button>
            )}
            {last ? (
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
            ) : (
              <Button type="submit" variant="accent" size="lg" arrow>
                Next
              </Button>
            )}
            <p className="text-small text-muted" aria-live="polite">
              {!last
                ? `Step ${page + 1} of ${pages.length}. Nothing is sent until the last step.`
                : isSubmitting
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
          {!last ? "Next" : isSubmitting ? "Sending…" : "Send Application"}
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
  disabled,
}: {
  q: Question;
  control: Ctl;
  register: Reg;
  error?: string;
  value: string | string[];
  disabled?: boolean;
}) {
  const name = `answers.${q.id}` as const;
  const help = q.help || undefined;
  if (q.type === "heading")
    return (
      <div className="border-t border-line pt-8 first:border-0 first:pt-0">
        <h3 className="text-h4 font-medium text-ink">{q.label}</h3>
        {help && <p className="mt-1 text-small text-muted">{help}</p>}
      </div>
    );
  if (q.type === "page_break") return null; // single layout ignores breaks
  if (q.type === "file")
    return (
      <Controller
        control={control}
        name={`files.${q.id}`}
        render={({ field }) => (
          <div id={`q-${q.id}-zone`} tabIndex={-1} className="outline-none">
            <FileField
              id={`q-${q.id}`}
              label={q.label}
              help={help}
              required={q.required}
              hint={`${kindsText(q)}, max 5 MB.`}
              prompt="your file"
              accept={acceptOf(q)}
              value={field.value}
              onChange={(f) => field.onChange(f)}
              error={error}
              disabled={disabled}
              maxBytes={MAX_CV}
              validate={fileProblem(q)}
            />
          </div>
        )}
      />
    );
  if (q.type === "multi_choice")
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CheckGroup
            id={`q-${q.id}`}
            label={q.label}
            help={help}
            required={q.required}
            options={q.options}
            maxPicks={q.maxPicks}
            value={Array.isArray(field.value) ? field.value : []}
            onChange={(x) => {
              field.onChange(x);
              field.onBlur();
            }}
            error={error}
          />
        )}
      />
    );
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
            help={help}
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
                : (field.value as string)
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
        help={help}
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
          help={help}
          placeholder={q.placeholder}
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
  const input = INPUTS[q.type] ?? INPUTS.text;
  return (
    <Field
      id={`q-${q.id}`}
      label={q.label}
      help={help}
      placeholder={q.placeholder}
      required={q.required}
      {...input}
      min={q.type === "number" ? (q.min ?? undefined) : undefined}
      max={q.type === "number" ? (q.max ?? undefined) : undefined}
      maxLength={
        KNOWN.includes(q.type) && input.type !== "number" && input.type !== "date" ? MAX_ANSWER : undefined
      }
      error={error}
      className="max-w-xl"
      {...register(name)}
    />
  );
}

const INPUTS: Record<string, { type: string; inputMode?: "decimal" | "email" | "tel" | "url"; autoComplete?: string }> = {
  text: { type: "text" },
  number: { type: "number", inputMode: "decimal" },
  date: { type: "date" },
  email: { type: "email", inputMode: "email", autoComplete: "email" },
  phone: { type: "tel", inputMode: "tel", autoComplete: "tel" },
  url: { type: "url", inputMode: "url", autoComplete: "url" },
};

/** Sticky guide: desktop anchor row with ticks; phone "Step n of 4" with a bar. Current = section in view. */
function Progress({
  sections,
  done,
  step,
}: {
  sections: typeof SECTIONS;
  done: Record<string, boolean>;
  /** steps layout: one bar for the page you are on, at every width. */
  step?: { index: number; total: number; title: string };
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
  const bar = step
    ? { n: step.index + 1, of: step.total, title: step.title }
    : { n: idx + 1, of: sections.length, title: sections[idx].title };
  return (
    <nav
      aria-label="Application sections"
      // Sits under the header while it shows; moves to the very top when the header hides.
      style={{ top: hidden ? 0 : "var(--header-h)" }}
      className="sticky z-10 transition-[top] duration-3 ease-out -mx-gutter mb-10 border-b border-line bg-paper/95 px-gutter py-3 backdrop-blur lg:mx-0 lg:px-0"
    >
      <ol className={cn("hidden items-center gap-3", !step && "lg:flex")}>
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
      <div className={step ? undefined : "lg:hidden"}>
        <p className="text-small text-ink" aria-live={step ? "polite" : undefined}>
          Step {bar.n} of {bar.of} · {bar.title}
        </p>
        <div aria-hidden className="mt-2 h-0.5 bg-line">
          <div
            className="h-full bg-ink transition-[width] duration-3"
            style={{ width: `${(bar.n / bar.of) * 100}%` }}
          />
        </div>
      </div>
    </nav>
  );
}

