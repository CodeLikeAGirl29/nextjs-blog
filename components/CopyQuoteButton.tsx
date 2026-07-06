"use client";

import { useState } from "react";

export default function CopyQuoteButton({ quote, author }: { quote: string; author: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = `"${quote}" — ${author}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API needs a permission we may not have (e.g. insecure
      // context or user denial). Fail quietly rather than showing an error
      // for something this low-stakes.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-sm border border-border px-2 py-1 font-mono text-[0.65rem] text-muted transition hover:border-stamp hover:text-ink"
    >
      {copied ? "copied ✓" : "copy quote"}
    </button>
  );
}
