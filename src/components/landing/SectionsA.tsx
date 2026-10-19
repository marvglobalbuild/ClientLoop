import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, ClipboardList, MessageCircle, UserRound, Repeat, Download, Link2, MapPin, BarChart3, ShieldCheck, Sparkles, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dashboard } from "./Dashboard";
import { Panel, Reveal, SampleTag, Section, SectionHeader, Serif } from "./shared";
import { cn } from "@/lib/utils";

/* ---------------- HERO ---------------- */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-14 pb-20 sm:px-8 sm:pt-24">
      <div className="bg-hero pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Customer relationships, made clearer</p>
          <h1 className="display mt-6 text-[42px] text-balance sm:text-6xl lg:text-[76px]">
            Turn every customer interaction into your <Serif>next opportunity.</Serif>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Understand who comes back, what brings people in, and where to improve—then follow up thoughtfully and grow your reputation from one connected workspace.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl" className="w-full sm:w-auto"><a href="#early-access">Get early access <ArrowRight /></a></Button>
            <Button asChild variant="soft" size="xl" className="w-full sm:w-auto"><a href="#product">Explore the product</a></Button>
          </div>
          <p className="mt-6 text-[13px] text-muted-foreground">Built for service businesses of every size.</p>
        </Reveal>
        <Reveal delay={150} className="mx-auto mt-16 max-w-5xl">
          <Dashboard />
          <p className="mt-4 text-center text-[12px] text-muted-foreground">Interactive preview with illustrative sample data — try the business selector and date range.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- PRODUCT TABS ---------------- */
const TABS = [
  {
    id: "overview", label: "Overview",
    title: "One calm view of the week.",
    body: "Visits, returning customers and feedback completion side by side, so you can tell a busy week from a healthy one.",
    points: ["Business-level KPIs", "New vs returning split", "Filter by date range"],
  },
  {
    id: "insights", label: "Customer insights",
    title: "Every customer, with context.",
    body: "Profiles gather visit history, services and feedback in one place—so the next conversation starts where the last one ended.",
    points: ["Visit timeline", "Preferred services", "Discovery source"],
  },
  {
    id: "feedback", label: "Feedback",
    title: "Questions that fit your business.",
    body: "Build short questionnaires with ratings and open answers. See themes emerge without reading every reply twice.",
    points: ["Configurable questions", "Completion tracking", "Theme summaries"],
  },
  {
    id: "followups", label: "Follow-ups",
    title: "Follow up, with permission.",
    body: "Queue thoughtful messages to customers who opted in. Opt-outs are honoured automatically, and every send is logged.",
    points: ["Consent-aware queue", "Opt-out controls", "Message history"],
  },
];

function TabVisual({ id }: { id: string }) {
  if (id === "overview")
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {[["Visits this week", "214", "bg-primary", 72], ["Returning rate", "58%", "bg-teal", 58], ["Feedback completed", "41%", "bg-chart-3", 41], ["Follow-ups sent", "36", "bg-amber", 36]].map(([k, v, c, p]) => (
          <div key={k as string} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{v}</p>
            <div className="mt-3 h-1.5 rounded-full bg-secondary"><div className={cn("h-full rounded-full transition-all duration-700", c as string)} style={{ width: `${p}%` }} /></div>
          </div>
        ))}
      </div>
    );
  if (id === "insights")
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-cobalt-soft font-semibold text-primary">AO</span>
          <div className="min-w-0">
            <p className="font-medium">Amara Okafor</p>
            <p className="text-xs text-muted-foreground">Customer since Mar · found via Referral</p>
          </div>
          <span className="ml-auto rounded-md bg-teal-soft px-2 py-0.5 text-[11px] font-medium text-teal">Returning</span>
        </div>
        <ol className="mt-5 space-y-3 border-l border-border pl-4">
          {[["Oct 12", "Signature cut", "Rated 5/5"], ["Sep 03", "Colour & tone", "Feedback completed"], ["Jul 21", "Consultation", "First visit"]].map(([d, s, n]) => (
            <li key={d} className="relative">
              <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary" />
              <p className="text-[13px] font-medium">{s} <span className="font-mono text-[11px] font-normal text-muted-foreground">· {d}</span></p>
              <p className="text-xs text-muted-foreground">{n}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  if (id === "feedback")
    return (
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground">Questionnaire · After visit</p>
        <p className="mt-3 text-[14px] font-medium">How would you rate today's service?</p>
        <div className="mt-2 flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => <span key={n} className={cn("grid h-9 w-9 place-items-center rounded-lg border text-sm", n === 4 ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{n}</span>)}
        </div>
        <p className="mt-5 text-[14px] font-medium">How did you hear about us?</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Friend", "Google", "Instagram", "Walked by"].map((o, i) => <span key={o} className={cn("rounded-lg border px-3 py-1.5 text-[13px]", i === 0 ? "border-teal bg-teal-soft text-teal" : "border-border")}>{o}</span>)}
        </div>
        <div className="mt-5 rounded-lg bg-secondary p-3 text-[13px] text-muted-foreground">“Quick, friendly, would love an earlier slot on Saturdays.”</div>
      </div>
    );
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium">Follow-up queue</p>
        <span className="font-mono text-[11px] text-muted-foreground">3 ready · 1 skipped</span>
      </div>
      <ul className="mt-3 divide-y divide-border">
        {[["Daniel K.", "Thanks for visiting — how did it go?", "Opted in", true], ["Grace M.", "Your next appointment reminder", "Opted in", true], ["Tunde A.", "—", "Opted out", false]].map(([n, m, s, ok]) => (
          <li key={n as string} className="flex items-center gap-3 py-3">
            <MessageCircle className={cn("h-4 w-4 shrink-0", ok ? "text-teal" : "text-muted-foreground")} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium">{n}</p>
              <p className="truncate text-xs text-muted-foreground">{m}</p>
            </div>
            <span className={cn("rounded-md px-2 py-0.5 text-[11px]", ok ? "bg-teal-soft text-teal" : "bg-rose-soft text-rose")}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    let n = active;
    if (e.key === "ArrowRight") n = (active + 1) % TABS.length;
    else if (e.key === "ArrowLeft") n = (active - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = TABS.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    refs.current[n]?.focus();
  };
  const t = TABS[active];
  return (
    <Section id="product" labelledBy="product-title">
      <SectionHeader id="product-title" eyebrow="The product" title={<>A workspace built around <Serif>the people</Serif> you serve.</>} />
      <Reveal className="mt-12">
        <div role="tablist" aria-label="Product areas" onKeyDown={onKey} className="flex gap-1 overflow-x-auto rounded-full border border-border bg-card p-1 shadow-soft sm:inline-flex">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${tab.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn("shrink-0 rounded-full px-4 py-2 text-[13.5px] transition-colors", i === active ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} key={t.id} className="animate-fade mt-8 grid items-center gap-10 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <h3 className="display text-3xl sm:text-4xl">{t.title}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.body}</p>
            <ul className="mt-6 space-y-2.5">
              {t.points.map((p) => <li key={p} className="flex items-center gap-2.5 text-[15px]"><Check className="h-4 w-4 text-teal" />{p}</li>)}
            </ul>
            <SampleTag className="mt-8" />
          </div>
          <TabVisual id={t.id} />
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- PROBLEM ---------------- */
export function Problem() {
  return (
    <Section className="border-y border-border bg-surface" labelledBy="problem-title">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <SectionHeader
          id="problem-title"
          eyebrow="The gap"
          title={<>Know more than <Serif>how busy</Serif> you were.</>}
          body="Most service businesses can see today's transactions. Fewer can see who came back, how they found you, what they thought, and whether anyone followed up. Those answers live in notebooks, chats and memory—if at all."
        />
        <Reveal delay={100} className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-input p-5">
            <p className="eyebrow">Before</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted-foreground">
              {["Receipts in the till", "Feedback in DMs", "Regulars in someone's head", "Reviews left to chance"].map((x, i) => (
                <li key={x} className="rounded-lg bg-secondary px-3 py-2" style={{ transform: `rotate(${[-1.5, 1, -0.5, 1.5][i]}deg)` }}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="eyebrow text-primary">With ClientLoop</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {["Every visit recorded", "Feedback, structured", "Returning rate, visible", "Review invites, tracked"].map((x) => (
                <li key={x} className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-teal-soft"><Check className="h-3 w-3 text-teal" /></span>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
const STEPS = [
  { n: "01", icon: ClipboardList, title: "Record the visit", body: "Capture a customer interaction in a few moments—name, service, staff, and how they found you." },
  { n: "02", icon: BarChart3, title: "Learn what matters", body: "Collect feedback and see discovery sources and service history come together." },
  { n: "03", icon: Send2, title: "Follow up thoughtfully", body: "Send permitted follow-ups and invite customers to leave an honest review." },
];
function Send2(props: { className?: string }) { return <MessageCircle {...props} />; }

export function HowItWorks() {
  return (
    <Section id="how" labelledBy="how-title">
      <SectionHeader id="how-title" eyebrow="How it works" title={<>Three steps, <Serif>one loop.</Serif></>} align="center" />
      <ol className="relative mt-16 grid gap-6 lg:grid-cols-3">
        <div className="absolute left-0 right-0 top-[42px] hidden h-px bg-border lg:block" aria-hidden="true" />
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 120} className="relative">
            <div className="relative z-10 mb-6 flex items-center gap-3">
              <span className="grid h-[84px] w-[84px] place-items-center rounded-2xl border border-border bg-card shadow-soft">
                <s.icon className="h-6 w-6 text-primary" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
            </div>
            <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{s.body}</p>
            <Panel className="mt-6 p-4">
              {i === 0 && (
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between rounded-lg bg-secondary px-3 py-2"><span className="text-muted-foreground">Customer</span><span>Daniel K.</span></div>
                  <div className="flex justify-between rounded-lg bg-secondary px-3 py-2"><span className="text-muted-foreground">Service</span><span>Haircut</span></div>
                  <div className="flex justify-between rounded-lg bg-secondary px-3 py-2"><span className="text-muted-foreground">Source</span><span>Referral</span></div>
                  <div className="rounded-lg bg-ink py-2 text-center text-ink-foreground">Save visit</div>
                </div>
              )}
              {i === 1 && (
                <div className="flex h-[148px] items-end gap-2">
                  {[40, 62, 50, 78, 66, 90].map((h, j) => <div key={j} className={cn("flex-1 rounded-md", j % 2 ? "bg-teal" : "bg-primary")} style={{ height: `${h}%`, opacity: 0.5 + j * 0.09 }} />)}
                </div>
              )}
              {i === 2 && (
                <div className="space-y-2 text-[13px]">
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-teal-soft px-3 py-2">Thanks for coming in, Daniel! Mind sharing a quick review?</div>
                  <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"><Link2 className="h-3.5 w-3.5 text-muted-foreground" /><span className="truncate text-muted-foreground">review link</span></div>
                  <p className="font-mono text-[10.5px] text-muted-foreground">Sent to opted-in customers only · Reply STOP to opt out</p>
                </div>
              )}
            </Panel>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------- FEATURES ---------------- */
export function Features() {
  return (
    <Section className="bg-surface border-y border-border" labelledBy="features-title">
      <SectionHeader id="features-title" eyebrow="Features" title={<>Everything the loop needs, <Serif>nothing it doesn't.</Serif></>} />
      <div className="mt-14 grid gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-4">
          <Panel className="h-full p-6 sm:p-8">
            <UserRound className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-xl font-medium tracking-tight">Customer profiles & visit history</h3>
            <p className="mt-2 max-w-md text-muted-foreground">One record per customer, with every visit, service and note in order.</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {[["Amara O.", "7 visits"], ["Daniel K.", "3 visits"], ["Grace M.", "1 visit"]].map(([n, v]) => (
                <div key={n} className="flex items-center gap-2.5 rounded-xl border border-border p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-cobalt-soft text-[11px] font-semibold text-primary">{n.slice(0, 2)}</span>
                  <div><p className="text-[13px] font-medium">{n}</p><p className="text-[11px] text-muted-foreground">{v}</p></div>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
        <Reveal delay={80} className="md:col-span-2">
          <Panel className="h-full p-6 sm:p-8">
            <Repeat className="h-5 w-5 text-teal" />
            <h3 className="mt-4 text-xl font-medium tracking-tight">New vs returning</h3>
            <div className="mt-6 flex items-end gap-1">
              <span className="display text-5xl">58</span><span className="mb-1.5 text-muted-foreground">% returning</span>
            </div>
            <div className="mt-4 flex h-2 overflow-hidden rounded-full"><div className="w-[58%] bg-teal" /><div className="flex-1 bg-teal-soft" /></div>
          </Panel>
        </Reveal>
        <Reveal className="md:col-span-2">
          <Panel className="h-full p-6 sm:p-8">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-xl font-medium tracking-tight">Configurable questionnaires</h3>
            <p className="mt-2 text-muted-foreground">Ratings, choices and open answers—your questions, your order.</p>
          </Panel>
        </Reveal>
        <Reveal delay={80} className="md:col-span-4">
          <div className="bg-ink-gradient h-full rounded-2xl p-6 text-ink-foreground sm:p-8">
            <Phone className="h-5 w-5 text-teal" />
            <h3 className="mt-4 text-xl font-medium tracking-tight">WhatsApp follow-ups, with permission</h3>
            <p className="mt-2 max-w-md text-ink-foreground/70">Message only customers who agreed to hear from you. Opt-outs stop future sends. <span className="text-ink-foreground/50">(Planned — not yet connected.)</span></p>
            <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
              {["Consent recorded", "Opt-out honoured", "Send log"].map((x) => <span key={x} className="rounded-full border border-ink-foreground/20 px-3 py-1">{x}</span>)}
            </div>
          </div>
        </Reveal>
        {[
          { icon: BarChart3, t: "Source & service analytics", b: "See which channels and services bring people back." },
          { icon: Star, t: "Review-link management", b: "Share your review link and track clicks—not reviews." },
          { icon: MapPin, t: "Multi-staff, multi-location ready", b: "Foundations for teams and branches as you grow." },
          { icon: Download, t: "Dashboard & data export", b: "Your data stays yours. Export to CSV anytime." },
        ].map((f, i) => (
          <Reveal key={f.t} delay={i * 60} className="md:col-span-3 lg:col-span-3">
            <div className="flex h-full gap-4 rounded-2xl border border-border p-6">
              <f.icon className="h-5 w-5 shrink-0 text-primary" />
              <div><h3 className="font-medium tracking-tight">{f.t}</h3><p className="mt-1 text-[14px] text-muted-foreground">{f.b}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { ShieldCheck, Sparkles };
