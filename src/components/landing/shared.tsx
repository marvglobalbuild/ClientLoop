import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

export function LoopMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-ink" />
      <path
        d="M11.5 20.5a5 5 0 1 1 4.5-7.2m0 5.4a5 5 0 1 0 4.5-7.2"
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="stroke-ink-foreground"
      />
      <circle cx="16" cy="16" r="1.6" className="fill-teal" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LoopMark />
      <span className="text-[17px] font-semibold tracking-tight">ClientLoop</span>
    </span>
  );
}

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal min-w-0", className)}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-4 text-[32px] sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
      {body && <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground text-pretty">{body}</p>}
    </Reveal>
  );
}

export function Serif({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic tracking-normal">{children}</em>;
}

export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
      Sample data
    </span>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("min-w-0 rounded-2xl border border-border bg-card shadow-soft", className)}>{children}</div>;
}

export function Section({ id, children, className, labelledBy }: { id?: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("px-5 py-16 sm:px-8 sm:py-20 lg:py-24", className)}>
      <div className="page-container">{children}</div>
    </section>
  );
}
