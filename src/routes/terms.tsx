import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/landing/Placeholder";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — ClientLoop" },
      { name: "description", content: "ClientLoop Terms page (to be completed)." },
      { property: "og:title", content: "Terms — ClientLoop" },
      { property: "og:description", content: "ClientLoop Terms page (to be completed)." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PlaceholderPage title="Terms" body="This page hasn't been written yet. It will be completed before launch." />,
});
