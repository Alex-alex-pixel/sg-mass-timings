import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { areas, churches, isComplete, CONTACT_EMAIL } from "../data/churches";
import { StatsBand } from "../components/StatsBand";
import { ChurchRow } from "../components/ChurchRow";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mass Times SG — Catholic churches in Singapore" },
      {
        name: "description",
        content:
          "All 32 parishes of the Archdiocese of Singapore in one list — verified locations, Mass and Confession times sourced directly from parish schedules.",
      },
      { property: "og:title", content: "Mass Times SG — Catholic churches in Singapore" },
      {
        property: "og:description",
        content:
          "All 32 parishes of the Archdiocese of Singapore in one list — verified locations, Mass and Confession times.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Mass Times SG",
          description:
            "Verified Mass and Confession times for all 32 parishes of the Archdiocese of Singapore.",
        }),
      },
    ],
  }),
});

function Index() {
  const [query, setQuery] = useState("");
  const [activeArea, setActiveArea] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return churches.filter((c) => {
      const matchesArea =
        activeArea === "All"
          ? true
          : activeArea === "Needs info"
            ? !isComplete(c)
            : c.area === activeArea;
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q);
      return matchesArea && matchesQuery;
    });
  }, [query, activeArea]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto max-w-3xl px-6 pt-14 pb-7">
        <svg
          className="mb-5 size-6.5 text-brass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden
        >
          <path d="M12 2v20M6 8h12" strokeLinecap="round" />
        </svg>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Mass Times SG
        </h1>
        <p className="mt-2 max-w-[58ch] text-[0.98rem] leading-relaxed text-muted-foreground">
          All 32 parishes of the Archdiocese of Singapore, in one list. Location
          is confirmed for nearly every parish; Mass and Confession times are
          added as each parish is verified.
        </p>
        <StatsBand />
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-20">
        <div className="relative mt-2">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by parish name or area…"
            aria-label="Search parishes by name or area"
            className="w-full rounded-sm border border-border bg-card py-2.5 pr-4 pl-10 text-[0.95rem] transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-brass"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by area">
          {areas.map((area) => (
            <button
              key={area}
              type="button"
              aria-pressed={area === activeArea}
              onClick={() => setActiveArea(area)}
              className={`cursor-pointer rounded-sm border px-3.5 py-2 text-[0.85rem] transition-colors ${
                area === activeArea
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground/40"
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        <p className="mt-5 mb-1.5 text-[0.82rem] text-muted-foreground" aria-live="polite">
          {filtered.length} of {churches.length} parishes
        </p>

        {filtered.length ? (
          <ul className="border-t border-border">
            {filtered.map((c) => (
              <ChurchRow key={c.name} church={c} />
            ))}
          </ul>
        ) : (
          <div className="border-t border-border px-1 py-10 text-[0.92rem] text-muted-foreground">
            No parishes match that search.
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-3xl px-6 pb-16 text-[0.8rem] leading-relaxed text-muted-foreground">
        <p>
          Addresses are sourced from the Archdiocese of Singapore and individual
          parish records; Mass and Confession times are added only once
          confirmed directly from a parish's own published schedule — nothing
          here is estimated to look more complete than it is.
        </p>
        <p className="mt-4">
          Run a parish, or spotted an error?{" "}
          <a
            className="text-brass underline-offset-2 hover:underline"
            href={`mailto:${CONTACT_EMAIL}?subject=Mass%20Times%20SG%20—%20update`}
          >
            Email an update
          </a>{" "}
          and it'll be reviewed and added.
        </p>
      </footer>
    </div>
  );
}
