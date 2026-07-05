import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <main>
      <Link
        href="/"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-widest text-muted hover:text-ink"
      >
        &larr; back to the log
      </Link>

      <article className="relative rounded-sm border border-border bg-card px-8 py-8 pl-11 shadow-[2px_2px_0_0_rgba(31,41,55,0.06)]">
        <span className="punch-hole" aria-hidden />
        <div className="flex items-center justify-between">
          <span className="stamp font-mono text-[0.65rem]">{post.date}</span>
          {post.source && (
            <span className="font-mono text-[0.65rem] text-muted">via {post.source}</span>
          )}
        </div>
        <h1 className="mt-4 font-display text-3xl font-medium leading-snug text-ink">
          {post.title}
        </h1>
        <div
          className="prose prose-neutral mt-6 max-w-none font-body prose-p:leading-relaxed prose-p:text-ink"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
