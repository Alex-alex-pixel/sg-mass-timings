import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { editMailto, hasTimes, isComplete, type Church } from "../data/churches";

export function ChurchRow({ church }: { church: Church }) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const complete = isComplete(church);

  return (
    <li className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full cursor-pointer items-baseline justify-between gap-4 px-0.5 py-4.5 text-left transition-colors hover:bg-card/60"
      >
        <span>
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="font-serif text-[1.08rem] font-semibold">
              {church.name}
            </span>
            {complete ? (
              hasTimes(church) && (
                <span className="rounded-sm border border-olive/30 bg-olive/10 px-1.5 py-0.5 text-[0.68rem] whitespace-nowrap text-olive">
                  Mass times confirmed
                </span>
              )
            ) : (
              <span className="rounded-sm border border-brass/30 bg-brass/10 px-1.5 py-0.5 text-[0.68rem] whitespace-nowrap text-brass">
                Needs info
              </span>
            )}
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            {church.address || "Address not yet added"}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-[0.82rem] whitespace-nowrap text-muted-foreground">
            {church.area}
          </span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </span>
      </button>

      <div
        id={bodyId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-0.5 mb-4 border-t border-dashed border-border pt-3.5 text-sm leading-7">
            <Field label="Mass times">
              {church.times.length ? (
                church.times.map((t) => <div key={t}>{t}</div>)
              ) : (
                <span className="text-burgundy italic">Not yet confirmed.</span>
              )}
            </Field>
            <Field label="Confession">
              {church.confession.length ? (
                church.confession.map((t) => <div key={t}>{t}</div>)
              ) : (
                <span className="text-burgundy italic">Not yet confirmed.</span>
              )}
            </Field>
            <Field label="Parish website">
              {church.website ? (
                <a
                  className="text-brass underline-offset-2 hover:underline"
                  href={`https://${church.website}`}
                  target="_blank"
                  rel="noopener"
                >
                  {church.website}
                </a>
              ) : (
                <span className="text-burgundy italic">Not yet added.</span>
              )}
            </Field>
            <a
              className="mt-3 inline-block border-b border-brass text-[0.85rem] text-brass no-underline transition-opacity hover:opacity-75"
              href={editMailto(church)}
            >
              {complete ? "Suggest a correction" : "Add this parish's details"}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2.5 first:mt-0">
      <div className="text-[0.76rem] text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
