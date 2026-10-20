import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Wordmark } from "./shared";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function signInSoon() {
  toast("Sign in isn't open yet", { description: "ClientLoop is in early access. Join the list and we'll email you when workspaces open." });
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors",
        scrolled || open ? "border-b border-border bg-background" : "border-b border-transparent",
      )}
    >
      <nav className="page-container grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 xl:flex xl:justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#top" aria-label="ClientLoop home" className="shrink-0">
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 shadow-soft xl:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3.5 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 xl:flex">
          <Button variant="ghost" size="pill" className="rounded-full" onClick={signInSoon}>Sign in</Button>
          <Button asChild variant="ink" size="pill"><a href="#early-access">Get early access</a></Button>
        </div>
        <Button variant="ghost" size="icon"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </nav>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-background px-5 pt-6 pb-6 xl:hidden">
          <ul className="divide-y divide-border border-y border-border">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 text-xl tracking-tight">
                  {l.label}
                  <span className="text-muted-foreground">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Button asChild variant="hero" size="xl"><a href="#early-access" onClick={() => setOpen(false)}>Get early access</a></Button>
            <Button variant="soft" size="xl" onClick={() => { setOpen(false); signInSoon(); }}>Sign in</Button>
          </div>
        </div>
      )}
    </header>
  );
}
