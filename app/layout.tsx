import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
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
  title: "Field Notes",
  description: "A daily log of quotes and short reflections, auto-filed every morning.",
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
            <span className="font-mono text-xs text-muted">Vol. {new Date().getFullYear()}</span>
          </header>
          {children}
          <footer className="mt-20 border-t border-border pt-6 font-mono text-xs text-muted">
            Entries are drawn and filed each morning by a scheduled job. Nothing here is edited by hand.
          </footer>
        </div>
      </body>
    </html>
  );
}
