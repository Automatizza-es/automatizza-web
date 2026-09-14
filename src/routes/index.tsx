import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Automatizza | Automatización, software e inteligencia artificial para empresas" },
      { name: "description", content: "Automatizamos procesos y desarrollamos aplicaciones adaptadas a las necesidades reales de tu empresa, utilizando inteligencia artificial cuando aporta valor." },
      { property: "og:title", content: "Automatizza | Automatización y software para empresas" },
      { property: "og:description", content: "Automatizamos procesos y desarrollamos aplicaciones adaptadas a las necesidades reales de tu empresa, utilizando inteligencia artificial cuando aporta valor." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
