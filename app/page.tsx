import Link from "next/link";
import { getSortedPostsMeta } from "@/lib/posts";

export default function HomePage() {
  const posts = getSortedPostsMeta();

  return (
    <main className="flex flex-col gap-5">
      {posts.length === 0 && (
        <p className="font-mono text-sm text-muted">
          No entries filed yet. Run <code>npm run generate:post</code> to add the first one.
        </p>
      )}

      {posts.map((post, i) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="card-enter group relative block rounded-sm border border-border bg-card px-6 py-5 pl-9 shadow-[2px_2px_0_0_rgba(31,41,55,0.06)] transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(31,41,55,0.1)]"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <span className="punch-hole" aria-hidden />
          <div className="flex items-center justify-between">
            <span className="stamp font-mono text-[0.65rem]">{post.date}</span>
            {post.source && (
              <span className="font-mono text-[0.65rem] text-muted">via {post.source}</span>
            )}
          </div>
          <h2 className="mt-3 font-display text-xl font-medium leading-snug text-ink group-hover:underline">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
          )}
        </Link>
      ))}
    </main>
  );
}
