import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  source?: string;
  excerpt?: string;
  tags: string[];
  quote?: string;
  author?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function readAllPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

function toMeta(fileName: string): PostMeta {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    source: data.source ?? "",
    excerpt: data.excerpt ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    quote: data.quote ?? undefined,
    author: data.author ?? undefined,
  };
}

export function getSortedPostsMeta(): PostMeta[] {
  const posts = readAllPostFiles().map(toMeta);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  return readAllPostFiles().map((fileName) => ({ slug: fileName.replace(/\.md$/, "") }));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getSortedPostsMeta().forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getSortedPostsMeta().filter((post) => post.tags.includes(tag));
}

/**
 * Returns the chronological neighbors of a post. Posts are sorted newest
 * first, so "newer" is the previous array entry and "older" is the next one.
 */
export function getAdjacentPosts(slug: string): { older: PostMeta | null; newer: PostMeta | null } {
  const posts = getSortedPostsMeta();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { older: null, newer: null };

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    ...toMeta(`${slug}.md`),
    contentHtml,
  };
}
