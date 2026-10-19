import { useState } from "react";
import { ChevronDown, Calendar, LayoutGrid, Users, MessageSquareText, Send, Star, BarChart3, Settings, ArrowUpRight } from "lucide-react";
import { LoopMark, SampleTag } from "./shared";
import { cn } from "@/lib/utils";

const BUSINESSES = ["Northside Studio", "Harbor Bistro", "FixRight Repairs"];
const RANGES = ["7D", "30D", "90D"] as const;

const DATA: Record<(typeof RANGES)[number], { visits: number; returning: number; feedback: number; bars: number[] }> = {
  "7D": { visits: 214, returning: 58, feedback: 41, bars: [22, 31, 28, 36, 40, 33, 24] },
  "30D": { visits: 928, returning: 61, feedback: 44, bars: [180, 210, 240, 298] },
  "90D": { visits: 2741, returning: 63, feedback: 39, bars: [820, 910, 1011] },
};

const SOURCES = [
  { label: "Referral", pct: 38, color: "bg-primary" },
  { label: "Google search", pct: 27, color: "bg-teal" },
  { label: "Instagram", pct: 19, color: "bg-chart-3" },
  { label: "Walk-in", pct: 16, color: "bg-amber" },
];

const ACTIVITY = [
  { who: "Amara O.", what: "Completed feedback", when: "2m", tone: "bg-teal-soft text-teal" },
  { who: "Daniel K.", what: "Visit recorded · Haircut", when: "14m", tone: "bg-cobalt-soft text-primary" },
  { who: "Grace M.", what: "Opened review link", when: "38m", tone: "bg-amber-soft text-amber" },
  { who: "Tunde A.", what: "Opted out of follow-ups", when: "1h", tone: "bg-rose-soft text-rose" },
];

const NAV = [LayoutGrid, Users, MessageSquareText, Send, Star, BarChart3, Settings];

export function Dashboard() {
  const [biz, setBiz] = useState(0);
  const [range, setRange] = useState<(typeof RANGES)[number]>("30D");
  const [menu, setMenu] = useState(false);
  const d = DATA[range];
  const max = Math.max(...d.bars);
  const offset = biz * 37;

  return (
    <div className="relative rounded-[22px] border border-border bg-surface p-1.5 shadow-panel">
      <div className="flex overflow-hidden rounded-[18px] border border-border bg-background">
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-card py-4 sm:flex" aria-hidden="true">
          <LoopMark className="mb-4 h-7 w-7" />
          {NAV.map((I, i) => (
            <span key={i} className={cn("grid h-9 w-9 place-items-center rounded-lg text-muted-foreground", i === 0 && "bg-accent text-accent-foreground")}>
              <I className="h-4 w-4" />
            </span>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-3 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="relative">
              <button
                onClick={() => setMenu((m) => !m)}
                aria-haspopup="listbox"
                aria-expanded={menu}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[13px] font-medium shadow-soft hover:bg-secondary"
              >
                <span className="grid h-5 w-5 place-items-center rounded bg-teal-soft text-[10px] font-semibold text-teal">{BUSINESSES[biz][0]}</span>
                {BUSINESSES[biz]}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              {menu && (
                <ul role="listbox" className="animate-fade absolute left-0 top-10 z-10 w-52 rounded-xl border border-border bg-popover p-1 shadow-panel">
                  {BUSINESSES.map((b, i) => (
                    <li key={b}>
                      <button
                        role="option"
                        aria-selected={i === biz}
                        onClick={() => { setBiz(i); setMenu(false); }}
                        className={cn("w-full rounded-lg px-2.5 py-2 text-left text-[13px] hover:bg-secondary", i === biz && "bg-accent text-accent-foreground")}
                      >
                        {b}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center gap-2">
              <SampleTag className="hidden md:inline-flex" />
              <div className="flex items-center rounded-lg border border-border bg-card p-0.5 text-[12px]" role="group" aria-label="Date range">
                <Calendar className="mx-1.5 h-3.5 w-3.5 text-muted-foreground" />
                {RANGES.map((r) => (
                  <button key={r} aria-pressed={range === r} onClick={() => setRange(r)} className={cn("rounded-md px-2 py-1 font-mono", range === r ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground")}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "Visits", v: (d.visits + offset * 3).toLocaleString(), delta: "+8.2%" },
              { k: "Returning", v: `${d.returning - (biz ? 4 : 0)}%`, delta: "+3.1 pts" },
              { k: "Feedback done", v: `${d.feedback + biz}%`, delta: "+1.4 pts" },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-border bg-card p-2.5 sm:p-3.5">
                <p className="truncate text-[11px] text-muted-foreground sm:text-xs">{m.k}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight tabular-nums sm:text-2xl">{m.v}</p>
                <p className="mt-0.5 flex items-center gap-0.5 text-[10px] text-teal sm:text-[11px]"><ArrowUpRight className="h-3 w-3" />{m.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-5">
            <div className="rounded-xl border border-border bg-card p-3.5 md:col-span-3">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium">Visits · new vs returning</p>
                <div className="flex gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-primary" />Returning</span>
                  <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-chart-5" />New</span>
                </div>
              </div>
              <div key={range + biz} className="mt-4 flex h-28 items-end gap-2 sm:h-32">
                {d.bars.map((b, i) => {
                  const h = (b / max) * 100;
                  const ret = d.returning / 100;
                  return (
                    <div key={i} className="flex h-full flex-1 flex-col justify-end">
                      <div className="animate-grow flex flex-col overflow-hidden rounded-md" style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}>
                        <div className="bg-chart-5" style={{ flex: 1 - ret }} />
                        <div className="bg-primary" style={{ flex: ret }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-3.5 md:col-span-2">
              <p className="text-[13px] font-medium">How customers found you</p>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full">
                {SOURCES.map((s) => <div key={s.label} className={s.color} style={{ width: `${s.pct}%` }} />)}
              </div>
              <ul className="mt-3 space-y-1.5">
                {SOURCES.map((s) => (
                  <li key={s.label} className="flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-2 text-muted-foreground"><i className={cn("h-2 w-2 rounded-full", s.color)} />{s.label}</span>
                    <span className="font-mono tabular-nums">{s.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-5">
            <div className="hidden rounded-xl border border-border bg-card p-3.5 md:col-span-2 md:block">
              <p className="text-[13px] font-medium">Popular services</p>
              <ul className="mt-3 space-y-2.5">
                {[["Signature cut", 82], ["Colour & tone", 61], ["Treatment", 44], ["Consultation", 27]].map(([n, v]) => (
                  <li key={n as string}>
                    <div className="flex justify-between text-[12px]"><span>{n}</span><span className="font-mono text-muted-foreground">{v}</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-teal" style={{ width: `${v}%` }} /></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-3.5 md:col-span-3">
              <p className="text-[13px] font-medium">Recent activity</p>
              <ul className="mt-2 divide-y divide-border">
                {ACTIVITY.map((a) => (
                  <li key={a.who} className="flex items-center gap-3 py-2">
                    <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold", a.tone)}>{a.who.split(" ").map((x) => x[0]).join("")}</span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px]"><b className="font-medium">{a.who}</b> <span className="text-muted-foreground">{a.what}</span></span>
                    <span className="font-mono text-[11px] text-muted-foreground">{a.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
