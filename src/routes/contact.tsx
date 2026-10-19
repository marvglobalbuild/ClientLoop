import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/landing/Placeholder";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ClientLoop" },
      { name: "description", content: "ClientLoop Contact page (to be completed)." },
      { property: "og:title", content: "Contact — ClientLoop" },
      { property: "og:description", content: "ClientLoop Contact page (to be completed)." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PlaceholderPage title="Contact" body="This page hasn't been written yet. It will be completed before launch." />,
});
