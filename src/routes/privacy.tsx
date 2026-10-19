import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/landing/Placeholder";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — ClientLoop" },
      { name: "description", content: "ClientLoop Privacy page (to be completed)." },
      { property: "og:title", content: "Privacy — ClientLoop" },
      { property: "og:description", content: "ClientLoop Privacy page (to be completed)." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PlaceholderPage title="Privacy" body="This page hasn't been written yet. It will be completed before launch." />,
});
