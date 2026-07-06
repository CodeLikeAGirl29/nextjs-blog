import { getSortedPostsMeta, getAllTags } from "@/lib/posts";
import PostExplorer from "@/components/PostExplorer";

export default function HomePage() {
  const posts = getSortedPostsMeta();
  const allTags = getAllTags();

  if (posts.length === 0) {
    return (
      <main>
        <p className="font-mono text-sm text-muted">
          No entries filed yet. Run <code>npm run generate:post</code> to add the first one.
        </p>
      </main>
    );
  }

  return (
    <main>
      <PostExplorer posts={posts} allTags={allTags} />
    </main>
  );
}
