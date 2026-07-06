import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);

  return (
    <main>
      <Link
        href="/"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        &larr; back to the log
      </Link>

      <h1 className="mb-6 font-display text-2xl font-medium text-ink">
        Entries tagged <span className="stamp font-mono text-base">#{params.tag}</span>
      </h1>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-muted">No entries filed under this tag yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
