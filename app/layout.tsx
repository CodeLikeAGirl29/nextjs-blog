import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://field-notes-nextjs.vercel.app"),
  title: "Field Notes",
  description: "A daily log of quotes and short reflections, auto-filed every morning.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body text-ink antialiased`}
      >
        {/* Runs before hydration so the page never flashes the wrong theme. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var stored = localStorage.getItem("theme");
                var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (stored === "dark" || (!stored && prefersDark)) {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {}
            })();
          `}
        </Script>

        <div className="mx-auto max-w-2xl px-6 py-14">
          <header className="mb-14 flex items-end justify-between border-b border-border pb-4">
            <a href="/" className="group">
              <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
                Field Notes
              </h1>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                a daily log, filed automatically
              </p>
            </a>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-3 font-mono text-xs text-muted">
                <a href="/tags" className="hover:text-ink">
                  tags
                </a>
                <a href="/about" className="hover:text-ink">
                  about
                </a>
              </nav>
              <span className="font-mono text-xs text-muted">Vol. {new Date().getFullYear()}</span>
              <ThemeToggle />
            </div>
          </header>
          {children}
          <footer className="mt-20 flex items-center justify-between border-t border-border pt-6 font-mono text-xs text-muted">
            <span>Entries are drawn and filed each morning by a scheduled job. Nothing here is edited by hand.</span>
            <a href="/feed.xml" className="shrink-0 pl-4 underline hover:text-ink">
              RSS
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
