import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/landing/Nav";
import { Hero, ProductTabs, Problem, HowItWorks, Features } from "@/components/landing/SectionsA";
import { UseCases, Journey, Trust, Pricing, FAQ, FinalCTA, Footer } from "@/components/landing/SectionsB";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClientLoop — Customer insights & follow-ups for service businesses" },
      { name: "description", content: "Understand who comes back, collect feedback, follow up with permission and grow your reputation from one workspace." },
      { property: "og:title", content: "ClientLoop — Customer insights & follow-ups" },
      { property: "og:description", content: "One connected workspace for visits, feedback, follow-ups and reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProductTabs />
        <Problem />
        <HowItWorks />
        <Features />
        <UseCases />
        <Journey />
        <Trust />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
