import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { ChipGroup, Field, SelectField, TextareaField } from "@/components/atoms/form";
import { submitQuote } from "@/lib/formsubmit";
import { site } from "@/content/site";

const materials = ["Gypsum", "Coal", "Clinker", "Other"] as const;
const modes = ["Truck", "Ship", "Rail", "Not sure"] as const;
const tonnage = ["Under 100 t", "100 to 500 t", "500 to 2,000 t", "2,000 to 10,000 t", "Over 10,000 t"];

// Validation lives at the trust boundary: everything sent to FormSubmit passes this schema.
const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("That email doesn't look right."),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^[+()\d\s-]{7,}$/.test(v), "Use digits, spaces and an optional +.")
    .optional(),
  message: z.string().trim().min(10, "Tell us a little about what you need.").max(4000),
  // Shipment details: optional, behind the "Add shipment details" toggle.
  material: z.enum(materials).optional(),
  mode: z.enum(modes).optional(),
  from: z.string().trim().max(120).optional(),
  to: z.string().trim().max(120).optional(),
  tonnage: z.string().optional(),
  when: z.string().trim().refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Pick a date.").optional(),
  website: z.string().max(0).optional(), // honeypot: humans never see or fill this
});
type Values = z.infer<typeof schema>;

export function QuoteForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [more, setMore] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async (v: Values) => {
    setError(null);
    if (v.website) return; // bot: pretend nothing happened
    const { website: _bot, ...data } = v;
    const res = await submitQuote(Object.fromEntries(Object.entries(data).map(([k, val]) => [k, String(val ?? "")])));
    if ("reference" in res) navigate("/contact/sent", { state: { reference: res.reference, name: v.name.split(" ")[0] } });
    else setError(res.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="form-title" className="relative">
      <h2 id="form-title" className="text-h3 font-medium">
        Request a Consultation
      </h2>
      <p className="mt-2 text-small text-muted">Fields marked * are required. Add shipment details if you have them.</p>

      <div className="mt-10 grid gap-x-8 gap-y-9 tablet:grid-cols-2">
        <Field label="Your Name" required autoComplete="name" placeholder="Jean Mukamana" error={errors.name?.message} {...register("name")} />
        <Field label="Company Name" autoComplete="organization" placeholder="Your company" error={errors.company?.message} {...register("company")} />
        <Field label="Email Address" required type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" error={errors.email?.message} {...register("email")} />
        <Field label="Phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+250 7XX XXX XXX" error={errors.phone?.message} {...register("phone")} />
        <TextareaField
          label="Your Message"
          required
          rows={6}
          className="tablet:col-span-2"
          placeholder="Tell us what you need: the material, the route, the timing, or anything else. Write as much as you like."
          error={errors.message?.message}
          {...register("message")}
        />

        {/* Optional shipment details */}
        <div className="tablet:col-span-2">
          <button
            type="button"
            onClick={() => setMore((m) => !m)}
            aria-expanded={more}
            aria-controls="shipment-details"
            className="group/more flex w-full items-center justify-between gap-4 rounded-[10px] bg-white px-5 py-4 text-left ring-1 ring-inset ring-line transition-colors duration-3 hover:bg-[#F5F8FE]"
          >
            <span>
              <span className="block font-medium text-ink">Add shipment details</span>
              <span className="mt-0.5 block text-small text-muted">Optional: material, mode of transportation, route, tonnage and date.</span>
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#E3ECFD] text-ink transition-colors duration-3 group-hover/more:bg-ink group-hover/more:text-white">
              <ChevronDown aria-hidden className={"size-4 transition-transform duration-3 " + (more ? "rotate-180" : "")} />
            </span>
          </button>
          <div id="shipment-details" className={"grid transition-[grid-template-rows,opacity] duration-5 ease-out " + (more ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")} {...(more ? {} : { inert: "" })}>
            <div className="overflow-hidden">
              <div className="grid gap-x-8 gap-y-9 pt-9 tablet:grid-cols-2">
                <Controller
                  control={control}
                  name="material"
                  render={({ field }) => <ChipGroup label="Material" name="material" options={[...materials]} value={field.value} onChange={field.onChange} error={errors.material?.message} />}
                />
                <Controller
                  control={control}
                  name="mode"
                  render={({ field }) => <ChipGroup label="Mode of Transportation" name="mode" options={[...modes]} value={field.value} onChange={field.onChange} error={errors.mode?.message} />}
                />
                <Field label="From" placeholder="Origin, e.g. Garissa" error={errors.from?.message} {...register("from")} />
                <Field label="To" placeholder="Destination, e.g. Kigali" error={errors.to?.message} {...register("to")} />
                <SelectField label="Tonnage per month" options={tonnage} placeholder="Choose a range" {...register("tonnage")} />
                <Field label="When do you need it?" type="date" min={new Date().toISOString().slice(0, 10)} error={errors.when?.message} {...register("when")} />
              </div>
            </div>
          </div>
        </div>
        {/* honeypot */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" {...register("website")} />
          </label>
        </div>
      </div>

      {error && (
        <div role="alert" className="mt-10 flex gap-4 rounded border border-danger/30 bg-danger/[0.04] p-5">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" strokeWidth={1.75} />
          <div className="text-small">
            <p className="font-medium text-ink">Your request didn't go through.</p>
            <p className="mt-1 text-body">{error} Nothing is lost: try again, or reach us directly.</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              <a href={site.phoneHref} className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-4">
                <Phone aria-hidden className="size-4" /> {site.phone}
              </a>
              <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-4">
                <MessageCircle aria-hidden className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button type="submit" variant="accent" size="lg" arrow loading={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send Message"}
        </Button>
        <p className="text-small text-muted">Reliable communication for your business.</p>
      </div>
    </form>
  );
}
