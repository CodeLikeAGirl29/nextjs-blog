# Field Notes

A minimal Next.js blog where every entry is a markdown file in `/posts` — and a GitHub Actions workflow files a brand new entry each morning without any human touching the repo. Deploys to Vercel.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

## Table of Contents

- [About](#about)
- [How It Fits Together](#how-it-fits-together)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment (Vercel)](#deployment-vercel)
- [Swapping the Source](#swapping-the-source)
- [Contributing](#contributing)

## About

Field Notes is a self-updating blog. Instead of a CMS or a database, every post is a plain markdown file with frontmatter. A scheduled GitHub Actions workflow generates a new entry every morning, commits it straight to `main`, and Vercel picks up the commit and redeploys automatically. There's no human step between "idea" and "published post."

Out of the box it files a daily quote pulled from a public API, but the generator is a drop-in — swap the fetch function and it can file anything: trending GitHub repos, a weather summary, a stock close, even a second LLM call.

**Core features:**

- 📝 Markdown-based posts with frontmatter (`title`, `date`, `source`, `excerpt`)
- 🤖 Automated daily posting via GitHub Actions (`cron` at 07:00 UTC)
- 🔍 Client-side search and tag filtering (`PostExplorer`)
- 🏷️ Tag index pages (`/tags`, `/tags/[tag]`)
- 🌗 Light/dark theme toggle with CSS-variable tokens
- 📡 Auto-generated RSS feed (`/feed.xml`) on every build
- 🗺️ Built-in sitemap and robots.txt via Next.js file conventions
- ⚙️ CI workflow that lints and builds on every push/PR to `main`
- ▲ Zero-config continuous deployment on Vercel

## How It Fits Together

| Path                                | Purpose                                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `posts/*.md`                        | One markdown file per entry (frontmatter: `title`, `date`, `source`, `excerpt`)         |
| `lib/posts.ts`                      | Reads and parses post files at build time                                               |
| `app/`                              | Next.js App Router pages that render the post list and individual entries               |
| `app/tags/`                         | `/tags` lists every tag in use; `/tags/[tag]` lists entries under one tag               |
| `components/PostExplorer.tsx`       | Client-side search box and tag filter chips shown on the home page                      |
| `components/ThemeToggle.tsx`        | Light/dark mode toggle; color tokens live as CSS variables in `globals.css`             |
| `scripts/generate-post.mjs`         | Pulls a quote from a public API and writes a new dated markdown file into `/posts`      |
| `scripts/generate-feed.mjs`         | Regenerates `public/feed.xml` from `/posts` before every build (`prebuild`)             |
| `.github/workflows/daily-entry.yml` | Runs the generator on a schedule (`cron: "0 7 * * *"`) and commits the result to `main` |
| `.github/workflows/ci.yml`          | Lints and builds on every push and pull request to `main`                               |
| `app/sitemap.ts` / `app/robots.ts`  | Next.js file conventions that auto-serve `/sitemap.xml` and `/robots.txt`               |

Each post page includes per-post SEO/Open Graph metadata (`generateMetadata`), a "copy quote" button, and older/newer navigation between entries.

## Installation

**Prerequisites:** [Node.js](https://nodejs.org/) 18 or later, and npm.

Clone the repo and install dependencies:

```bash
git clone https://github.com/CodeLikeAGirl29/nextjs-blog.git
cd nextjs-blog
npm install
```

## Usage

Run the dev server:

```bash
npm run dev
```

The site is now live at [http://localhost:3000](http://localhost:3000).

File a new entry manually (instead of waiting for the scheduled workflow):

```bash
npm run generate:post
```

Build and run a production version locally:

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it in the [Vercel dashboard](https://vercel.com/new) — the "Next.js" framework preset is auto-detected, no config needed.
3. Deploy. Every future push to `main` (including the bot's daily commits) triggers a new deployment automatically. Pull requests get their own preview deployments too.
4. Set `SITE_URL` at the top of `scripts/generate-feed.mjs` to your `*.vercel.app` domain (or custom domain) so the RSS feed's links resolve correctly.
5. The "Daily entry" workflow needs `contents: write` permission — this is already set in the workflow file, and the built-in `GITHUB_TOKEN` handles the push. Nothing else to configure.
6. Trigger the first run by hand from the **Actions** tab (**Daily entry → Run workflow**) instead of waiting for the schedule.

## Swapping the Source

`scripts/generate-post.mjs` calls a free quotes API by default. To automate something else instead, replace `fetchQuote()` with whatever you want filed daily — GitHub trending repos, a weather summary, a stock close, a second LLM call — and keep the same "write a markdown file with frontmatter" shape. The rest of the site doesn't need to change.

## Contributing

Contributions are welcome and appreciated.

1. **Fork** the repository.
2. **Create a branch** for your change: `git checkout -b feature/your-feature-name`.
3. **Make your changes.** Keep them focused — one feature or fix per pull request.
4. **Test locally**: run `npm run dev` and `npm run build` to confirm nothing breaks, and make sure `npm run lint` passes.
5. **Commit** with a clear, descriptive message: `git commit -m "Add tag cloud to homepage"`.
6. **Push** your branch: `git push origin feature/your-feature-name`.
7. **Open a pull request** against `main` describing what changed and why. CI will lint and build your PR automatically.

Please open an issue first for larger changes so we can discuss the approach before you invest the time. Bug reports, docs fixes, and small enhancements are always welcome as direct PRs.
