import { useState, type FormEvent } from "react";
import { Scissors, UtensilsCrossed, Wrench, Leaf, Briefcase, ShieldCheck, Lock, UserCheck, LogOut, ArrowRight, Loader2, CheckCircle2, AlertCircle, ClipboardCheck, Send, BarChart3, Link2, Star, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Panel, Reveal, SampleTag, Section, SectionHeader, Serif, Wordmark } from "./shared";
import { NAV_LINKS } from "./Nav";
import { cn } from "@/lib/utils";

/* ---------------- USE CASES ---------------- */
const INDUSTRIES = [
  { id: "salon", label: "Salon & Beauty", icon: Scissors, services: ["Cut & style", "Colour", "Nails"], question: "How happy are you with your look today?", followup: "A gentle rebooking note 5 weeks after a cut.", insight: "See which stylists your returning clients ask for." },
  { id: "hosp", label: "Hospitality", icon: UtensilsCrossed, services: ["Dine-in", "Takeaway", "Events"], question: "How was your food and service tonight?", followup: "A thank-you after a private event booking.", insight: "Compare first-time and regular guests by day of week." },
  { id: "repair", label: "Repair & Home Services", icon: Wrench, services: ["Diagnosis", "Repair", "Maintenance"], question: "Was the job completed as explained?", followup: "A check-in two weeks after a repair.", insight: "Track which services lead to repeat bookings." },
  { id: "well", label: "Wellness", icon: Leaf, services: ["Massage", "Physio", "Classes"], question: "How do you feel after today's session?", followup: "A reminder when a package is nearly used.", insight: "Understand which treatments keep people returning." },
  { id: "pro", label: "Professional Services", icon: Briefcase, services: ["Consultation", "Project", "Retainer"], question: "How clear was our advice today?", followup: "A follow-up after a project milestone.", insight: "See where new clients first heard about you." },
];

export function UseCases() {
  const [a, setA] = useState(0);
  const ind = INDUSTRIES[a] ?? INDUSTRIES[0];
  if (!ind) return null;
  return (
    <Section id="use-cases" labelledBy="uc-title">
      <SectionHeader id="uc-title" eyebrow="Use cases" title={<>One product, <Serif>configured</Serif> for your trade.</>} body="The core stays the same. Services, questions and follow-ups adapt to how you work." />
      <Reveal className="mt-12 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div role="radiogroup" aria-label="Industry" className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {INDUSTRIES.map((x, i) => (
            <Button variant="ghost"
              key={x.id}
              role="radio"
              aria-checked={i === a}
              onClick={() => setA(i)}
              className={cn("flex h-auto shrink-0 items-center justify-start gap-3 whitespace-normal rounded-xl border px-4 py-3 text-left text-[14px] transition-all", i === a ? "border-primary bg-card shadow-soft" : "border-border hover:bg-card")}
            >
              <x.icon className={cn("h-4 w-4 shrink-0", i === a ? "text-primary" : "text-muted-foreground")} />
              {x.label}
            </Button>
          ))}
        </div>
        <div key={ind.id} className="animate-fade grid min-w-0 gap-4 rounded-3xl border border-border bg-surface p-6 sm:grid-cols-2 sm:p-8">
          <div className="sm:col-span-2 grid min-w-0 gap-2">
            <h3 className="display min-w-0 text-2xl sm:text-3xl">ClientLoop for {ind.label}</h3>
            <span className="font-mono text-[11px] text-muted-foreground">Example configuration</span>
          </div>
          <Panel className="p-5">
            <p className="eyebrow">Services</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{ind.services.map((s) => <span key={s} className="rounded-lg bg-secondary px-2.5 py-1 text-[13px]">{s}</span>)}</div>
          </Panel>
          <Panel className="p-5">
            <p className="eyebrow">Feedback question</p>
            <p className="mt-3 text-[15px]">“{ind.question}”</p>
          </Panel>
          <Panel className="p-5">
            <p className="eyebrow">Follow-up idea</p>
            <p className="mt-3 text-[15px]">{ind.followup}</p>
          </Panel>
          <Panel className="p-5">
            <p className="eyebrow">Insight</p>
            <p className="mt-3 text-[15px]">{ind.insight}</p>
          </Panel>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- JOURNEY ---------------- */
const STAGES = [
  { icon: ClipboardCheck, label: "Visit recorded", body: "Staff log the visit. This creates or updates the customer's profile.", detail: [["Status", "Recorded"], ["Service", "Signature cut"], ["Consent", "Follow-ups: yes"]], note: "Fact: a visit happened." },
  { icon: Send, label: "Feedback invitation", body: "An invitation is queued and, if permitted, sent. Sent and delivered are tracked separately.", detail: [["Invitation", "Sent 10:42"], ["Delivery", "Delivered 10:42"], ["Opened", "Not yet"]], note: "Delivered doesn't mean read." },
  { icon: FileText, label: "Questionnaire completed", body: "The customer answers your questions. Only completed responses count toward completion rate.", detail: [["Rating", "4 / 5"], ["Source", "Referral"], ["Comment", "Yes"]], note: "Fact: the customer responded." },
  { icon: BarChart3, label: "Insights updated", body: "Dashboards refresh with the new answer—returning rate, sources and service trends.", detail: [["Returning", "58% → 58.3%"], ["Referral share", "38%"], ["Avg rating", "4.6"]], note: "Aggregated per workspace." },
  { icon: Link2, label: "Optional review link", body: "Satisfied customers may be invited to review you publicly. We can track a link click—we can't see whether a review was actually posted.", detail: [["Review link", "Clicked"], ["Public review", "Unknown"], ["Inferred?", "Never"]], note: "A click is not a review." },
];

export function Journey() {
  const [s, setS] = useState(0);
  const st = STAGES[s] ?? STAGES[0];
  if (!st) return null;
  return (
    <Section className="border-y border-border bg-surface" labelledBy="journey-title">
      <SectionHeader id="journey-title" eyebrow="Customer journey" title={<>Every step, <Serif>honestly</Serif> measured.</>} body="Select a stage to see what ClientLoop records—and what it doesn't claim to know." align="center" />
      <Reveal className="mt-14">
        <ol className="grid grid-cols-5 gap-1 sm:gap-2">
          {STAGES.map((x, i) => (
            <li key={x.label} className="relative">
              {i < STAGES.length - 1 && <span className={cn("absolute left-1/2 top-5 h-px w-full", i < s ? "bg-primary" : "bg-border")} aria-hidden="true" />}
              <Button variant="ghost" onClick={() => setS(i)} aria-pressed={i === s} aria-label={x.label} className="relative z-10 mx-auto flex h-auto max-w-full flex-col items-center gap-2 whitespace-normal p-0 hover:bg-transparent">
                <span className={cn("grid h-10 w-10 place-items-center rounded-full border transition-all", i === s ? "border-primary bg-primary text-primary-foreground shadow-button" : i < s ? "border-primary bg-card text-primary" : "border-border bg-card text-muted-foreground")}>
                  <x.icon className="h-4 w-4" />
                </span>
                <span className={cn("hidden text-center text-[13px] sm:block", i === s ? "text-foreground" : "text-muted-foreground")}>{x.label}</span>
              </Button>
            </li>
          ))}
        </ol>
        <div key={s} className="animate-fade mx-auto mt-10 grid max-w-4xl gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-muted-foreground">Stage {s + 1} of 5</p>
            <h3 className="mt-2 text-2xl font-medium tracking-tight">{st.label}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{st.body}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-soft px-3 py-1.5 text-[13px]"><Star className="h-3.5 w-3.5 text-amber" />{st.note}</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <SampleTag />
            <dl className="mt-4 divide-y divide-border text-[14px]">
              {st.detail.map(([k, v]) => <div key={k} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- TRUST ---------------- */
export function Trust() {
  const items = [
    { icon: Lock, t: "A workspace per business", b: "Each business gets its own workspace. Customer records aren't shared between businesses." },
    { icon: UserCheck, t: "Permission first", b: "Follow-ups are meant for customers who agreed to hear from you. Consent is recorded with the profile." },
    { icon: LogOut, t: "Easy opt-out", b: "Customers can opt out, and opted-out profiles are excluded from future follow-ups." },
    { icon: ShieldCheck, t: "Honest metrics", b: "We report what we can observe. A link click is a click—never presented as a posted review." },
  ];
  return (
    <Section labelledBy="trust-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <SectionHeader id="trust-title" eyebrow="Product principles" title={<>Built to be <Serif>trusted</Serif> by your customers, too.</>} />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {items.map((x, i) => (
            <Reveal key={x.t} delay={i * 60} className="bg-card p-6">
              <x.icon className="h-5 w-5 text-teal" />
              <h3 className="mt-4 font-medium tracking-tight">{x.t}</h3>
              <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{x.b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- PRICING ---------------- */
export function Pricing() {
  const plans = [
    { name: "Starter", for: "Single-location businesses getting organised.", items: ["Customer profiles", "Visit recording", "Basic feedback"] },
    { name: "Growth", for: "Teams that want follow-ups and deeper insights.", items: ["Everything in Starter", "Configurable questionnaires", "Follow-up queue", "Review-link tracking"], featured: true },
    { name: "Multi-location", for: "Businesses with several branches or teams.", items: ["Everything in Growth", "Multiple locations", "Staff roles", "Data export"] },
  ];
  return (
    <Section id="pricing" className="border-y border-border bg-surface" labelledBy="pricing-title">
      <SectionHeader id="pricing-title" eyebrow="Pricing" title={<>Pricing is <Serif>coming soon.</Serif></>} body="We're finalising plans with early-access businesses. Join now to help shape them—tiers below are indicative and may change." align="center" />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <div className={cn("flex h-full flex-col rounded-2xl border p-7", p.featured ? "bg-ink-gradient border-transparent text-ink-foreground shadow-panel" : "border-border bg-card")}>
              <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                <h3 className="min-w-0 text-lg font-medium">{p.name}</h3>
                <span className={cn("rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", p.featured ? "bg-ink-foreground/10" : "bg-secondary text-muted-foreground")}>Early access</span>
              </div>
              <p className={cn("mt-2 text-[14px]", p.featured ? "text-ink-foreground/70" : "text-muted-foreground")}>{p.for}</p>
              <p className="display mt-6 text-4xl">TBA</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-[14px]">
                {p.items.map((x) => <li key={x} className="flex gap-2.5"><span className={p.featured ? "text-teal" : "text-primary"}>—</span>{x}</li>)}
              </ul>
              <Button asChild variant={p.featured ? "onInk" : "soft"} size="xl" className="mt-8"><a href="#early-access">Join early access</a></Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  ["What is ClientLoop?", "ClientLoop is a customer insights, follow-up and review management workspace for service businesses. It connects visits, feedback, follow-ups and review invitations in one place."],
  ["Which businesses can use it?", "Any service business that sees customers repeatedly—salons, barbershops, spas, restaurants, repair services, clinics, consultants and more. Services and questions are configurable."],
  ["Can I customize the questionnaire for my business?", "Yes. You choose the questions, answer types and order, so feedback fits your services."],
  ["How do WhatsApp follow-ups work?", "The plan is to let you send follow-ups only to customers who've given permission, with opt-out respected automatically. WhatsApp sending isn't connected yet in early access."],
  ["Does a review-link click mean a customer posted a Google review?", "No. ClientLoop can record that a review link was clicked, but a click alone can't tell us whether a review was actually written or published. We never report clicks as reviews."],
  ["Can multiple staff members use one workspace?", "The product is designed for multi-staff workspaces. Staff roles and permissions are part of the roadmap for early access."],
  ["Can I export my data?", "Data export is part of the planned feature set—your business data should always stay yours."],
];

export function FAQ() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <SectionHeader id="faq-title" eyebrow="FAQ" title={<>Questions, <Serif>answered.</Serif></>} />
        <Reveal>
          <Accordion type="single" collapsible className="border-t border-border">
            {FAQS.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`}>
                <AccordionTrigger className="py-5 text-left text-[16px] font-medium hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- FINAL CTA ---------------- */
export function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [err, setErr] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setState("error");
      setErr(email.trim() ? "That email doesn't look quite right." : "Please enter your work email.");
      return;
    }
    setState("loading");
    setTimeout(() => setState("success"), 700);
  };
  return (
    <section id="early-access" aria-labelledby="cta-title" className="px-5 pb-24 sm:px-8">
      <Reveal className="bg-ink-gradient relative page-container overflow-hidden rounded-[28px] px-6 py-16 text-center text-ink-foreground sm:px-12 sm:py-24">
        <h2 id="cta-title" className="display mx-auto max-w-3xl text-[36px] text-balance sm:text-6xl">
          Build stronger customer relationships, <Serif>one visit at a time.</Serif>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-ink-foreground/70">Join early access and help shape ClientLoop for businesses like yours.</p>
        {state === "success" ? (
          <div role="status" className="animate-fade mx-auto mt-10 flex max-w-md items-start gap-3 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-4 text-left">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
            <div>
              <p className="font-medium">You're on the list (demo).</p>
              <p className="mt-1 text-[13px] text-ink-foreground/60">This preview doesn't save sign-ups yet—nothing was sent anywhere. <Button variant="ghost" className="h-auto whitespace-normal p-0 text-[13px] underline" onClick={() => { setState("idle"); setEmail(""); }}>Try again</Button></p>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mx-auto mt-10 max-w-md">
            <div className="flex flex-col gap-2 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-1.5 sm:flex-row sm:rounded-full">
              <label htmlFor="email" className="sr-only">Work email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                placeholder="you@business.com"
                aria-invalid={state === "error"}
                aria-describedby="email-msg"
                className="h-11 min-w-0 flex-1 rounded-full bg-transparent px-4 text-[15px] text-ink-foreground placeholder:text-ink-foreground/40 focus:outline-none"
              />
              <Button type="submit" variant="onInk" size="xl" disabled={state === "loading"} className="h-11 shrink-0">
                {state === "loading" ? <Loader2 className="animate-spin" /> : <>Get early access <ArrowRight /></>}
              </Button>
            </div>
            <p id="email-msg" className={cn("mt-3 flex items-center justify-center gap-1.5 text-[13px]", state === "error" ? "text-rose" : "text-ink-foreground/50")} aria-live="polite">
              {state === "error" ? <><AlertCircle className="h-3.5 w-3.5" />{err}</> : "Demo form — sign-ups aren't stored yet."}
            </p>
          </form>
        )}
      </Reveal>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 sm:px-8">
      <div className="page-container grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-[14px] text-muted-foreground">Customer insights, follow-ups and reviews for service businesses.</p>
        </div>
        <div>
          <p className="eyebrow">Product</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">{NAV_LINKS.map((l) => <li key={l.href}><a href={l.href} className="text-muted-foreground hover:text-foreground">{l.label}</a></li>)}</ul>
        </div>
        <div>
          <p className="eyebrow">Use cases</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">{INDUSTRIES.map((x) => <li key={x.id}><a href="#use-cases" className="text-muted-foreground hover:text-foreground">{x.label}</a></li>)}</ul>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="page-container mt-12 flex flex-wrap justify-between gap-2 border-t border-border pt-6 text-[12px] text-muted-foreground">
        <p>© {new Date().getFullYear()} ClientLoop. All rights reserved.</p>
        <p>Product previews use illustrative sample data.</p>
      </div>
    </footer>
  );
}
