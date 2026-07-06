"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function PostExplorer({
  posts,
  allTags,
}: {
  posts: PostMeta[];
  allTags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!q) return true;

      const haystack = [post.title, post.excerpt ?? "", ...post.tags].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeTag]);

  const hasActiveFilters = query.trim().length > 0 || activeTag !== null;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entries…"
          aria-label="Search entries"
          className="w-full rounded-sm border border-border bg-card px-4 py-2 font-mono text-sm text-ink placeholder:text-muted focus:border-stamp"
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  data-active={isActive}
                  className="tag-pill font-mono"
                >
                  #{tag}
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveTag(null);
                }}
                className="font-mono text-[0.65rem] text-muted underline hover:text-ink"
              >
                clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="font-mono text-sm text-muted">
          No entries match &ldquo;{query}&rdquo;{activeTag ? ` in #${activeTag}` : ""}.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
