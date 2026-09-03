import { churches, isComplete, hasTimes } from "../data/churches";

export function StatsBand() {
  const total = churches.length;
  const locDone = churches.filter(isComplete).length;
  const timeDone = churches.filter(hasTimes).length;

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-sm border border-border bg-card p-4">
      <StatRow
        label={`${locDone} of ${total} parishes — location confirmed`}
        value={locDone / total}
      />
      <StatRow
        label={`${timeDone} of ${total} parishes — Mass times confirmed`}
        value={timeDone / total}
        variant="olive"
      />
    </div>
  );
}

function StatRow({
  label,
  value,
  variant = "brass",
}: {
  label: string;
  value: number;
  variant?: "brass" | "olive";
}) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-3.5 text-sm">
      <span className="w-[230px] shrink-0 text-muted-foreground max-sm:w-auto max-sm:flex-1">
        {label}
      </span>
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-sm border border-border bg-background max-sm:hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full transition-[width] duration-700 ease-out ${
            variant === "brass" ? "bg-brass" : "bg-olive"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
