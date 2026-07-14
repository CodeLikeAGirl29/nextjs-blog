import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import CopyQuoteButton from "@/components/CopyQuoteButton";

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const description = post.excerpt || `An entry filed on ${post.date}.`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `/posts/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  const { older, newer } = getAdjacentPosts(params.slug);

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

        {post.quote && post.author && (
          <div className="mt-4">
            <CopyQuoteButton quote={post.quote} author={post.author} />
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-4">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className="tag-pill font-mono">
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </article>

      {(older || newer) && (
        <nav className="mt-6 flex items-center justify-between font-mono text-xs text-muted">
          {older ? (
            <Link href={`/posts/${older.slug}`} className="hover:text-ink">
              &larr; {older.date}
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link href={`/posts/${newer.slug}`} className="hover:text-ink">
              {newer.date} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  );
}
