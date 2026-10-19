import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Wordmark } from "./shared";

export function PlaceholderPage({ title, body }: { title: string; body: string }) {
  return (
    <main className="bg-hero flex min-h-screen flex-col px-5 py-8 sm:px-8">
      <Link to="/" aria-label="ClientLoop home"><Wordmark /></Link>
      <div className="mx-auto my-auto max-w-lg text-center">
        <p className="eyebrow">To be completed</p>
        <h1 className="display mt-4 text-5xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">{body}</p>
        <Button asChild variant="ink" size="xl" className="mt-8"><Link to="/">Back to home</Link></Button>
      </div>
    </main>
  );
}
