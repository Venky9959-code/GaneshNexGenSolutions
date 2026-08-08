import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ganeshnexgen.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/services/web-development",
    "/services/ecommerce-development",
    "/services/custom-software",
    "/services/ui-ux-design",
    "/services/ai-automation",
    "/services/startup-solutions",
    "/services/cloud-deployment",
    "/services/maintenance",
    "/solutions/business-growth",
    "/solutions/ai-automation",
    "/industries",
    "/portfolio",
    "/pricing",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/refund",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
