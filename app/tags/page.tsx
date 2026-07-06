import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <main>
      <Link
        href="/"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        &larr; back to the log
      </Link>

      <h1 className="mb-6 font-display text-2xl font-medium text-ink">All tags</h1>

      {tags.length === 0 ? (
        <p className="font-mono text-sm text-muted">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="tag-pill font-mono">
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
