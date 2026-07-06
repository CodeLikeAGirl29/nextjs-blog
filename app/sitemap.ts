import type { MetadataRoute } from "next";
import { getAllPostSlugs, getAllTags } from "@/lib/posts";

const SITE_URL = "https://field-notes-nextjs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = getAllPostSlugs().map(({ slug }) => ({
    url: `${SITE_URL}/posts/${slug}`,
    changeFrequency: "monthly" as const,
  }));

  const tagEntries = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tags/${tag}`,
    changeFrequency: "weekly" as const,
  }));

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" },
    { url: `${SITE_URL}/tags`, changeFrequency: "weekly" },
    ...postEntries,
    ...tagEntries,
  ];
}
