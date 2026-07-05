// scripts/generate-feed.mjs
//
// Builds public/feed.xml from everything in /posts. Runs automatically via
// the "prebuild" npm script, so the feed is always current at deploy time.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");
const OUT_PATH = path.join(process.cwd(), "public", "feed.xml");

// Update these two for your own deployment.
const SITE_TITLE = "Field Notes";
const SITE_URL = "https://field-notes-nextjs.vercel.app"; // e.g. https://<user>.github.io/<repo>

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(POSTS_DIR, fileName);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? content.trim().slice(0, 200),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function buildRss(posts) {
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/posts/${post.slug}/`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
      return [
        "  <item>",
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link>${url}</link>`,
        `    <guid>${url}</guid>`,
        `    <pubDate>${pubDate}</pubDate>`,
        `    <description>${escapeXml(post.excerpt)}</description>`,
        "  </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `  <title>${escapeXml(SITE_TITLE)}</title>`,
    `  <link>${SITE_URL}</link>`,
    "  <description>A daily log, filed automatically.</description>",
    items,
    "</channel>",
    "</rss>",
    "",
  ].join("\n");
}

function main() {
  const posts = loadPosts();
  const rss = buildRss(posts);

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, rss, "utf8");
  console.log(`Wrote feed.xml with ${posts.length} entries.`);
}

main();
