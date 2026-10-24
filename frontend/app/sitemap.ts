import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ganeshnexgen.website";

  const routes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.9, changeFrequency: "weekly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/case-studies", priority: 0.85, changeFrequency: "weekly" },
    { path: "/why-us", priority: 0.85, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.9, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
  ];

  return routes.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
