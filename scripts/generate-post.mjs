// scripts/generate-post.mjs
//
// Fetches one quote from a public API and files it as a new dated markdown
// post in /posts. Run manually with `npm run generate:post`, or let the
// "Daily entry" GitHub Actions workflow run it on a schedule and commit
// the result automatically.

import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "posts");

// Free, no-key-required quote API. Swap this out for any source you like:
// an RSS feed, a second Claude/OpenAI API call, a GitHub trending scrape, etc.
const QUOTE_API = "https://zenquotes.io/api/random";

// Used only if the API above is unreachable or rate-limited, so the daily
// workflow always has something to file instead of failing outright.
const FALLBACK_QUOTES = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "A good plan violently executed now is better than a perfect plan next week.", author: "George S. Patton" },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function escapeYaml(str) {
  return str.replace(/"/g, '\\"');
}

async function fetchQuote() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(QUOTE_API, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Quote API responded with ${res.status}`);
    }
    const data = await res.json();
    const entry = Array.isArray(data) ? data[0] : data;

    const text = entry.q ?? entry.content;
    const author = entry.a ?? entry.author;
    if (!text) throw new Error("Quote API returned no text");

    return { text, author: author ?? "Unknown", source: "zenquotes.io" };
  } catch (err) {
    console.warn(`Falling back to local quotes (reason: ${err.message}).`);
    const pick = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    return { ...pick, source: "local fallback" };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const date = todayISO();
  const { text, author, source } = await fetchQuote();

  const title = `Entry for ${date}`;
  const slug = `${date}-${slugify(author)}`;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`Entry for ${date} already exists at ${filePath}, skipping.`);
    return;
  }

  const frontmatter = [
    "---",
    `title: "${escapeYaml(title)}"`,
    `date: "${date}"`,
    `source: "${escapeYaml(source)}"`,
    `excerpt: "${escapeYaml(`A short note attributed to ${author}.`)}"`,
    `tags: ["quote"]`,
    "---",
    "",
  ].join("\n");

  const body = [
    `> ${text.trim()}`,
    "",
    `— ${author}`,
    "",
    `Filed automatically on ${date}. No further edits.`,
    "",
  ].join("\n");

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, frontmatter + body, "utf8");
  console.log(`Filed new entry: ${filePath}`);
}

main().catch((err) => {
  console.error("Failed to generate today's entry:", err);
  process.exit(1);
});
