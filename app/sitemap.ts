import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/data/caseStudies";

const BASE_URL = "https://saiflatif.me";

/**
 * Dynamic sitemap covering every page on saiflatif.me.
 * Consumed by Google, Bing, Yahoo, and AI crawlers via /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllCaseStudies();
  const now = new Date();

  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // ── Dynamic work/case-study routes ────────────────────────────────────────
  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${BASE_URL}/work/${study.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    images: study.thumbnailUrl.startsWith("http")
      ? [study.thumbnailUrl]
      : [`${BASE_URL}${study.thumbnailUrl}`],
  }));

  return [...staticRoutes, ...workRoutes];
}
