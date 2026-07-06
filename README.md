# Field Notes

A minimal Next.js blog where entries are markdown files in `/posts`, and a
GitHub Actions workflow files a brand new entry every morning without any
human touching the repo. Deploys to Vercel.

## How it fits together

- `posts/*.md` — each file is one entry (frontmatter: `title`, `date`,
  `source`, `excerpt`).
- `lib/posts.ts` — reads and parses those files at build time.
- `app/` — Next.js App Router pages that render the list and each entry.
- `scripts/generate-post.mjs` — pulls a quote from a public API and writes
  a new dated markdown file into `/posts`. This is the piece that gets
  automated.
- `.github/workflows/daily-entry.yml` — runs the script on a schedule
  (`cron: "0 7 * * *"`, 07:00 UTC daily) and commits the new file straight
  to `main`. If the quote API is unreachable, `generate-post.mjs` falls
  back to a small local quote list instead of failing the run.
- `.github/workflows/ci.yml` — lints and builds on every push and pull
  request to `main`, so a bad entry or a bad commit never reaches
  production unnoticed. This runs independently of Vercel's own build.
- `scripts/generate-feed.mjs` — regenerates `public/feed.xml` from
  `/posts` automatically before every build (wired in as `prebuild`), so
  the RSS feed at `/feed.xml` is always current.
- `app/sitemap.ts` / `app/robots.ts` — Next.js's built-in file conventions;
  these auto-serve `/sitemap.xml` and `/robots.txt` with no extra script.
- `components/PostExplorer.tsx` — client-side search box + tag filter
  chips over the full post list, shown on the home page.
- `components/ThemeToggle.tsx` — light/dark mode toggle. Color tokens live
  as CSS variables in `globals.css` (`:root` vs `.dark`), so the rest of
  the app never references a hex value directly.
- `app/tags/` — `/tags` lists every tag in use; `/tags/[tag]` lists every
  entry under one tag.
- Each post page has per-post metadata (`generateMetadata`) for SEO/Open
  Graph, a "copy quote" button, and older/newer navigation between
  entries.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate:post   # manually file a new entry
```

## Ship it (Vercel)

1. Push this repo to GitHub.
2. In the [Vercel dashboard](https://vercel.com/new), import the repo.
   Framework preset "Next.js" is auto-detected — no config needed.
3. Deploy. Vercel builds and hosts it, and every future push to `main`
   (including the bot's daily commits) triggers a new deployment
   automatically. Pull requests get their own preview deployments too.
4. Set `SITE_URL` at the top of `scripts/generate-feed.mjs` to your
   `*.vercel.app` domain (or custom domain), so the RSS feed's links are
   correct.
5. The "Daily entry" workflow needs `contents: write` permission, which is
   already set in the workflow file. Nothing else to configure — the
   built-in `GITHUB_TOKEN` handles the push, and Vercel picks up the
   resulting commit on its own.
6. Trigger the first run by hand from the Actions tab
   ("Daily entry" → "Run workflow") instead of waiting for the schedule.

## Swap the source

`scripts/generate-post.mjs` calls a free quotes API by default. To
automate something else instead, replace `fetchQuote()` with whatever you
want filed daily — GitHub trending repos, a weather summary, a stock
close, a second LLM call — and keep the same "write a markdown file with
frontmatter" shape. The rest of the site doesn't need to change.
