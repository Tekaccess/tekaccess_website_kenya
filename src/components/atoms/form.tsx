import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const control =
  "peer w-full appearance-none rounded-none border-0 border-b border-line-strong bg-transparent px-0 pb-3 pt-1 text-base text-ink placeholder:text-quiet/70 transition-colors duration-2 focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger";

type FieldShell = { label: string; hint?: string; error?: string; required?: boolean; children: (ids: { id: string; describedBy?: string }) => ReactNode; className?: string };

/** Label above, underline control, hint or error below (linked by aria-describedby). */
export function FieldShell({ label, hint, error, required, children, className }: FieldShell) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div className={cn("group/field flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-label font-medium text-muted transition-colors group-focus-within/field:text-ink">
        {label}
        {required && <span aria-hidden className="text-accent"> *</span>}
      </label>
      {children({ id, describedBy: error || hint ? msgId : undefined })}
      {(error || hint) && (
        <p id={msgId} role={error ? "alert" : undefined} className={cn("text-micro", error ? "text-danger" : "text-muted")}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<"input"> & { label: string; hint?: string; error?: string };
export const Field = forwardRef<HTMLInputElement, InputProps>(({ label, hint, error, required, className, ...p }, ref) => (
  <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
    {({ id, describedBy }) => (
      <input
        ref={ref}
        id={id}
        aria-describedby={describedBy}
        aria-invalid={!!error || undefined}
        aria-required={required || undefined}
        className={cn(control, "h-11")}
        {...p}
      />
    )}
  </FieldShell>
));
Field.displayName = "Field";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & { label: string; hint?: string; error?: string };
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, hint, error, required, className, ...p }, ref) => (
  <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
    {({ id, describedBy }) => (
      <textarea
        ref={ref}
        id={id}
        rows={3}
        aria-describedby={describedBy}
        aria-invalid={!!error || undefined}
        className={cn(control, "min-h-24 resize-y leading-relaxed")}
        {...p}
      />
    )}
  </FieldShell>
));
TextareaField.displayName = "TextareaField";

type SelectProps = ComponentPropsWithoutRef<"select"> & { label: string; hint?: string; error?: string; options: string[]; placeholder?: string };
export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, required, options, placeholder, className, ...p }, ref) => (
    <FieldShell label={label} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy }) => (
        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-describedby={describedBy}
            aria-invalid={!!error || undefined}
            className={cn(control, "h-11 cursor-pointer pr-8 invalid:text-quiet")}
            defaultValue=""
            {...p}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o} value={o} className="text-ink">
                {o}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden strokeWidth={1.5} className="pointer-events-none absolute right-0 top-2.5 size-5 text-muted" />
        </div>
      )}
    </FieldShell>
  ),
);
SelectField.displayName = "SelectField";

/** Square toggle chips that behave as a radio group (keyboard: arrows via native radios). */
export function ChipGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <fieldset className="flex flex-col gap-3" aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-3 text-label font-medium text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="relative">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer absolute inset-0 cursor-pointer opacity-0"
            />
            <span className="inline-flex h-10 min-w-[4.5rem] cursor-pointer items-center justify-center rounded border border-line-strong px-4 text-small text-ink transition-colors duration-2 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="text-micro text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
