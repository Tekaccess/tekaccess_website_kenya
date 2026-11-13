import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Linkedin, X } from "lucide-react";
import { PersonCard } from "@/components/molecules/cards";
import { initials, team, type Person } from "@/content/people";

/** 4-up portrait grid (2-up on phones); each card opens a dialog with bio + LinkedIn, browsable with arrows. */
export function TeamGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const p: Person | null = open === null ? null : team[open];
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + team.length) % team.length));

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 tablet:grid-cols-3 tablet:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-6" data-reveal="stagger">
        {team.map((person, i) => (
          <li key={person.slug}>
            <PersonCard person={person} onOpen={() => setOpen(i)} />
          </li>
        ))}
      </ul>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-overlay bg-ink/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
            className="fixed inset-x-0 bottom-0 z-overlay max-h-[92dvh] overflow-y-auto rounded-t-md bg-paper data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom tablet:inset-auto tablet:left-1/2 tablet:top-1/2 tablet:w-[min(920px,calc(100vw-4rem))] tablet:-translate-x-1/2 tablet:-translate-y-1/2 tablet:rounded data-[state=open]:tablet:slide-in-from-bottom-4 data-[state=open]:tablet:zoom-in-95"
          >
            {p && (
              <div className="grid tablet:grid-cols-[5fr_7fr]">
                <div className="relative aspect-[4/5] bg-mist tablet:aspect-[4/5]">
                  {p.photo ? (
                    <img src={`${p.photo}-800.webp`} alt={p.name} className="absolute inset-0 size-full object-cover object-top" />
                  ) : (
                    <span aria-hidden className="absolute inset-0 grid place-items-center text-display-xl font-medium text-quiet">
                      {initials(p.name)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col p-7 tablet:p-10">
                  <p className="text-label font-medium text-muted">{p.role}</p>
                  <Dialog.Title className="mt-3 text-h2 font-medium text-ink">{p.name}</Dialog.Title>
                  <Dialog.Description className="mt-6 text-body text-body">{p.about}</Dialog.Description>
                  {p.bio && <p className="mt-4 text-[0.9375rem] italic text-muted">“{p.bio}”</p>}
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded border border-line-strong px-4 py-2.5 text-small font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      <Linkedin aria-hidden className="size-4" strokeWidth={1.75} /> View on LinkedIn
                    </a>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                    <p className="text-small tabular text-muted">
                      {(open ?? 0) + 1} / {team.length}
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => step(-1)} aria-label="Previous person" className="grid size-11 place-items-center rounded border border-line-strong hover:border-ink">
                        <ArrowLeft aria-hidden className="size-4" />
                      </button>
                      <button onClick={() => step(1)} aria-label="Next person" className="grid size-11 place-items-center rounded border border-line-strong hover:border-ink">
                        <ArrowRight aria-hidden className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Dialog.Close
              aria-label="Close"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
            >
              <X aria-hidden className="size-5" strokeWidth={1.75} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
