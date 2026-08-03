import type { MetadataRoute } from "next";

/**
 * robots.ts — Generated robots.txt for saiflatif.me
 *
 * Strategy: Allow ALL crawlers — including AI bots (GPTBot, Google-Extended,
 * PerplexityBot, ClaudeBot, anthropic-ai, Applebot-Extended) — to access every
 * public page. Only the private API routes (/_next/*) are excluded for
 * cleanliness, not for restriction.
 *
 * This maximises indexing surface for:
 *  - Traditional search engines: Googlebot, Bingbot, Slurp (Yahoo)
 *  - AI training crawlers: GPTBot, Google-Extended, ClaudeBot, anthropic-ai
 *  - AI retrieval/search bots: PerplexityBot, ChatGPT-User, YouBot
 *  - Discovery bots: Applebot, facebookexternalhit, Twitterbot
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Default: all standard search crawlers ───────────────────────────
      {
        userAgent: "*",
        allow: "/",
      },

      // ── Google search + AI/extended crawlers ────────────────────────────
      {
        userAgent: ["Googlebot", "Google-Extended", "Googlebot-Image"],
        allow: "/",
      },

      // ── Bing / Microsoft crawlers ───────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
      },

      // ── Yahoo / Slurp ───────────────────────────────────────────────────
      {
        userAgent: "Slurp",
        allow: "/",
      },

      // ── OpenAI / ChatGPT crawlers ───────────────────────────────────────
      // GPTBot: training data crawler
      // ChatGPT-User: browsing/retrieval crawler (Bing-powered)
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        allow: "/",
      },

      // ── Anthropic / Claude crawlers ─────────────────────────────────────
      {
        userAgent: ["ClaudeBot", "anthropic-ai", "Claude-Web"],
        allow: "/",
      },

      // ── Perplexity AI crawler ───────────────────────────────────────────
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },

      // ── Apple / Siri crawlers ───────────────────────────────────────────
      {
        userAgent: ["Applebot", "Applebot-Extended"],
        allow: "/",
      },

      // ── Social media crawlers (for rich previews) ───────────────────────
      {
        userAgent: ["facebookexternalhit", "Twitterbot", "LinkedInBot"],
        allow: "/",
      },

      // ── Other AI/LLM crawlers ───────────────────────────────────────────
      {
        userAgent: ["YouBot", "Diffbot", "DuckAssistBot"],
        allow: "/",
      },
    ],

    // ── Sitemap location ───────────────────────────────────────────────────
    sitemap: "https://saiflatif.me/sitemap.xml",

    // ── Canonical host ─────────────────────────────────────────────────────
    host: "https://saiflatif.me",
  };
}
