import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { AlertCircle, Check, ChevronDown, FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const control =
  "peer w-full appearance-none rounded-none border-0 border-b border-line-strong bg-transparent px-0 pb-3 pt-1 text-base text-ink placeholder:text-quiet/70 transition-colors duration-2 focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger";

type FieldShell = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (ids: { id: string; describedBy?: string }) => ReactNode;
  className?: string;
  /** Use a known id (so error summaries can focus the control). */
  fieldId?: string;
};

/** Label above, underline control, hint or error below (linked by aria-describedby). */
export function FieldShell({
  label,
  hint,
  error,
  required,
  children,
  className,
  fieldId,
}: FieldShell) {
  const auto = useId();
  const id = fieldId ?? auto;
  const msgId = `${id}-msg`;
  return (
    <div className={cn("group/field flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn("text-label font-medium transition-colors group-focus-within/field:text-ink", error ? "text-danger" : "text-muted")}
      >
        {label}
        {required && (
          <span aria-hidden className="text-accent">
            {" "}
            *
          </span>
        )}
      </label>
      {children({ id, describedBy: error || hint ? msgId : undefined })}
      {(error || hint) && (
        <p
          id={msgId}
          role={error ? "alert" : undefined}
          className={cn("text-micro", error ? "text-danger" : "text-muted")}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  hint?: string;
  error?: string;
};
export const Field = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, required, className, id: fieldId, ...p }, ref) => (
    <FieldShell
      fieldId={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
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
  ),
);
Field.displayName = "Field";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  hint?: string;
  error?: string;
};
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, required, className, id: fieldId, ...p }, ref) => (
    <FieldShell
      fieldId={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
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
  ),
);
TextareaField.displayName = "TextareaField";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
  hint?: string;
  error?: string;
  options: string[];
  placeholder?: string;
};
export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, hint, error, required, options, placeholder, className, id: fieldId, ...p },
    ref,
  ) => (
    <FieldShell
      fieldId={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      {({ id, describedBy }) => (
        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-describedby={describedBy}
            aria-invalid={!!error || undefined}
            className={cn(
              control,
              "h-11 cursor-pointer pr-8 invalid:text-quiet",
            )}
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
          <ChevronDown
            aria-hidden
            strokeWidth={1.5}
            className="pointer-events-none absolute right-0 top-2.5 size-5 text-muted"
          />
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
  required,
  id: fieldId,
  className,
  labelClassName,
}: {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
  labelClassName?: string;
}) {
  const id = useId();
  return (
    <fieldset
      id={fieldId}
      tabIndex={fieldId ? -1 : undefined}
      className={cn("flex flex-col gap-3 outline-none", className)}
      aria-describedby={error ? `${id}-err` : undefined}
      aria-invalid={!!error || undefined}
    >
      <legend
        className={cn(
          "mb-3 text-label font-medium",
          error ? "text-danger" : "text-muted",
          labelClassName,
        )}
      >
        {label}
        {required && (
          <span aria-hidden className="text-accent">
            {" "}
            *
          </span>
        )}
      </legend>
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
            <span
              className={cn(
                "inline-flex h-10 min-w-[4.5rem] cursor-pointer items-center justify-center rounded border px-4 text-small text-ink transition-colors duration-2 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-disabled:cursor-default peer-disabled:opacity-60",
                error ? "border-danger" : "border-line-strong",
              )}
            >
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

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & { label: ReactNode; error?: string };
/** Square checkbox with a label that may hold links; error below. */
export const CheckboxField = forwardRef<HTMLInputElement, CheckboxProps>(({ label, error, required, className, id: idProp, ...p }, ref) => {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            aria-invalid={!!error || undefined}
            aria-describedby={error ? `${id}-err` : undefined}
            aria-required={required || undefined}
            className={cn(
              "peer size-5 cursor-pointer appearance-none rounded-xs border bg-white transition-colors duration-2 checked:border-ink checked:bg-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-60",
              error ? "border-danger" : "border-line-strong",
            )}
            {...p}
          />
          <Check aria-hidden strokeWidth={3} className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100" />
        </span>
        <label htmlFor={id} className="cursor-pointer text-small text-body">
          {label}
          {required && <span aria-hidden className="text-accent"> *</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="flex items-center gap-1.5 text-micro text-danger">
          <AlertCircle aria-hidden className="size-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
});
CheckboxField.displayName = "CheckboxField";

const kb = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

/** CV drop zone: empty, drag-over, selected, error, disabled. Checks type and size before upload. */
export function FileField({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  required,
  disabled,
  accept = ".pdf,.docx",
  maxBytes,
  validate,
}: {
  id: string;
  label: string;
  hint: string;
  value?: File | null;
  onChange: (f: File | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  maxBytes: number;
  /** Returns a message when the picked file is not acceptable. */
  validate: (f: File) => string | null;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [local, setLocal] = useState<{ file: File; msg: string } | null>(null);
  const msg = local?.msg || error;

  const take = (f?: File) => {
    if (!f) return;
    const bad = validate(f);
    if (bad) {
      setLocal({ file: f, msg: bad });
      onChange(null);
    } else {
      setLocal(null);
      onChange(f);
    }
  };
  const pick = () => !disabled && input.current?.click();
  const ext = (f: File) => (f.name.split(".").pop() || "").toUpperCase();

  return (
    <div className="flex flex-col gap-2">
      <p id={`${id}-label`} className={cn("text-label font-medium", msg ? "text-danger" : "text-muted")}>
        {label}
        {required && <span aria-hidden className="text-accent"> *</span>}
      </p>
      <input
        ref={input}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        tabIndex={-1}
        disabled={disabled}
        aria-labelledby={`${id}-label`}
        onChange={(e) => {
          take(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {value && !local ? (
        <div className={cn("flex flex-wrap items-center gap-4 rounded border border-line bg-white p-4 tablet:p-5", disabled && "opacity-60")}>
          <span className="grid size-11 shrink-0 place-items-center rounded bg-[#E3ECFD] text-ink">
            <FileText aria-hidden className="size-5" strokeWidth={1.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium text-ink">{value.name}</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-small text-muted">
              {ext(value)} · {kb(value.size)} <Check aria-label="Ready" className="size-4 rounded-full bg-success p-0.5 text-white" strokeWidth={3} />
            </span>
          </span>
          <span className="flex w-full gap-5 pl-[3.75rem] text-small font-medium sm:w-auto sm:pl-0">
            <button type="button" disabled={disabled} onClick={pick} className="text-ink underline underline-offset-4 hover:text-accent">
              Replace
            </button>
            <button type="button" disabled={disabled} onClick={() => onChange(null)} className="text-muted underline underline-offset-4 hover:text-ink">
              Remove
            </button>
          </span>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-msg`}
          aria-invalid={!!msg || undefined}
          aria-disabled={disabled || undefined}
          onClick={pick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              pick();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            if (!disabled) take(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed px-5 py-7 text-center transition-colors duration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
            over ? "border-2 border-ink bg-[#E3ECFD]" : msg ? "border-danger bg-danger/[0.04]" : "border-line-strong bg-white hover:border-ink",
            disabled && "cursor-default opacity-60",
          )}
        >
          {local ? (
            <>
              <span className="flex items-center gap-2 font-medium text-ink">
                <FileText aria-hidden className="size-5 text-danger" strokeWidth={1.5} /> {local.file.name} · {kb(local.file.size)}
              </span>
              <span className="text-small font-medium text-ink underline underline-offset-4">Choose another file</span>
            </>
          ) : (
            <>
              <Upload aria-hidden className={cn("size-6", msg ? "text-danger" : "text-ink")} strokeWidth={1.5} />
              <span className="text-[0.9375rem] text-ink">
                {over ? "Drop to upload your CV" : (
                  <>
                    Drop your CV here or <span className="font-medium underline underline-offset-4">browse</span>
                  </>
                )}
              </span>
            </>
          )}
        </div>
      )}
      <p id={`${id}-msg`} role={msg ? "alert" : undefined} className={cn("flex items-center gap-1.5 text-micro", msg ? "text-danger" : "text-muted")}>
        {msg && <AlertCircle aria-hidden className="size-3.5 shrink-0" />}
        {msg || hint}
      </p>
    </div>
  );
}
