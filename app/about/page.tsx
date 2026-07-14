import Link from "next/link";

export const metadata = {
  title: "About",
  description: "How Field Notes works and why it exists.",
};

export default function AboutPage() {
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
        <h1 className="font-display text-2xl font-medium text-ink">About this log</h1>

        <div className="prose prose-neutral mt-5 max-w-none font-body prose-p:leading-relaxed prose-p:text-ink">
          <p>
            Field Notes is a small, mostly unattended blog. Every morning, a
            scheduled job pulls a quote from a public API, files it as a new
            entry, and pushes the commit straight to this site&apos;s
            repository. No one edits the files by hand.
          </p>
          <p>
            The build is a static-content Next.js site: entries live as
            plain markdown files, search and tag filtering happen entirely
            in the browser, and the whole thing deploys to Vercel on every
            push.
          </p>
          <p>
            Curious how a specific piece works? The repository is public —
            the daily filing job, the site itself, and this page are all in
            there.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-4">
          <a href="/feed.xml" className="tag-pill font-mono">
            RSS feed
          </a>
          <Link href="/tags" className="tag-pill font-mono">
            browse tags
          </Link>
        </div>
      </article>
    </main>
  );
}
