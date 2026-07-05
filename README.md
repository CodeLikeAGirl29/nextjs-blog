# Field Notes

A minimal Next.js blog where entries are markdown files in `/posts`, and a
GitHub Actions workflow files a brand new entry every morning without any
human touching the repo.

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
  to `main`.
- `.github/workflows/deploy.yml` — builds the static site and deploys it
  to GitHub Pages after every push to `main`, including the commits the
  bot makes.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate:post   # manually file a new entry
```

## Ship it

1. Push this repo to GitHub.
2. Repo Settings → Pages → set Source to "GitHub Actions".
3. If deploying to `https://<user>.github.io/<repo>/` (not a custom domain
   or a `<user>.github.io` repo), uncomment and set `basePath` in
   `next.config.mjs`.
4. The "Daily entry" workflow needs `contents: write` permission, which is
   already set in the workflow file. Nothing else to configure — the
   built-in `GITHUB_TOKEN` handles the push.
5. Trigger the first run by hand from the Actions tab
   ("Daily entry" → "Run workflow") instead of waiting for the schedule.

## Swap the source

`scripts/generate-post.mjs` calls a free quotes API by default. To
automate something else instead, replace `fetchQuote()` with whatever you
want filed daily — GitHub trending repos, a weather summary, a stock
close, a second LLM call — and keep the same "write a markdown file with
frontmatter" shape. The rest of the site doesn't need to change.
