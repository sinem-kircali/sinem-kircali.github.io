# Sinem Kırcalı — Portfolio Site

A static site (plain HTML/CSS/JS, no build step required) — `index.html` for the main portfolio,
`notes.html` for a citation-first notes/blog page.

## Structure

```
portfolio/
├── index.html                          # main page structure / all copy (except projects, hobbies)
├── notes.html                          # notes/blog listing page
├── css/style.css                       # design tokens (colors, type, spacing) + all styling
├── js/main.js                          # hero animation, project + hobby rendering, scroll-reveal
├── js/notes.js                         # renders post cards on notes.html
├── data/projects.js                    # EDIT THIS to add/update project entries
├── data/hobbies.js                     # EDIT THIS to add/update hobby cards
├── data/posts.js                       # EDIT THIS to add/update notes/blog posts
├── notes/llm-marketing-exam-table.html # standalone resource linked from a notes post
├── assets/profile.jpg                  # portrait shown in the About section (swap in a higher-res one any time)
├── assets/hobbies/                     # drop hobby photos here (see below)
├── assets/logos/                       # company/university logos beside each experience entry (see below)
├── assets/coming-soon.gif              # optional — see "coming soon" badge below
└── README.md
```

## Preview locally

Because the data files are loaded as scripts (not fetched), you can open `index.html` or
`notes.html` directly:

```bash
open index.html
```

Or, for a closer-to-production preview with a local server:

```bash
cd portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing content

- **Projects** — edit `data/projects.js`. Each entry has `title`, `summary`, `problem`,
  `approach`, `tools`, `outcome`, `metric` (short headline stat), `icon` (one of `trend`,
  `scatter`, `bars`, `network`, `waves`, `pulse`, `cluster`, `grid`, `flow`), `github`,
  `caseStudyUrl`, plus `context`, `themes` and `featured` (below). Add new entries by copying
  the template at the bottom of the file — the grid re-renders automatically, no layout
  changes needed. The numbers on the cards come from each repo's README on GitHub. The competitor-pricing card stays anonymous (\"Company X\"), like its repo; the
  Coolblue timeline entry names the client.
  - **Filter chips** — the grid opens on "Featured" and has an "All" chip plus one chip per
    theme (the same headings as the GitHub profile README). `featured: true` puts a card in the
    default view; `themes` (`ml`, `nlp`, `marketing`, `ops`, `stats`, `data`) sets which chips
    it appears under. To open on "All" instead, change `DEFAULT_PROJECT_FILTER` in `js/main.js`.
- **Hobbies** — edit `data/hobbies.js`. Each hobby card has `name`, `caption`, `image` (a path to
  a **square** photo) and an optional `alt`. Drop a real photo at that path (e.g.
  `assets/hobbies/piano.jpg`) any time — the placeholder box is replaced automatically, no code
  changes needed. The photo wall above the cards comes from the `COLLAGE` list in the same file
  (`image`, `ratio` = width/height, `alt`); photos are packed into even rows, so list order
  matters, and the row sizing (`--units` per breakpoint in `css/style.css`) is tuned for the current
  17 photos — after adding or reordering photos, check the wall at phone, tablet and desktop widths
  and nudge the order if a row ends short. Phone photos carry GPS location in their metadata — re-save new ones as a fresh JPEG
  (or export without location) before adding them, as was done for the current photos.
- **Notes / blog posts** — edit `data/posts.js`. Each entry has `title`, `date`, `tags`, `body`
  (array of paragraphs), and either `source` (citing an external article — renders a citation
  line) or `resource` (linking to something self-authored, like the exam table — renders a
  button). Keep citing sources properly if a post reacts to someone else's work.
- **Bio / experience / skills / "why data" / "looking for" copy** — edit directly in
  `index.html`. "Open to work" appears twice: the `status-box` under the portrait in the
  About section and the `status-pill` in the hero. Reword or remove both when that changes (the
  Contact and "What I'm looking for" sections also name the target roles).
- **Profile photo** — replace `assets/profile.jpg`. It's shown in a circle, so use a **square**
  image with the face in the center. The current file is a square crop with the background
  blurred; keep the original unblurred photo somewhere that isn't published.
- **Where a project came from** — the optional `context` field in `data/projects.js` adds a
  small line above the card title (e.g. "Koç BSc · INDR 252 Applied Statistics"). Only
  fill it in when you're sure of the source. Cards render in array order, so move an entry up
  or down in the file to change its position.
- **Linking to a project from elsewhere** — each project card gets the anchor
  `#project-<id>` (set the optional `id` field in `data/projects.js`, otherwise it's a slug of
  the title). The Koç and Erasmus entries in the timeline list their courses with links to the
  matching cards; a link to a card that a filter is hiding switches the grid to "All".
- **Colors / type scale** — all defined as CSS variables at the top of `css/style.css` under
  `:root`.

### Experience bullets and logos

Each timeline entry in `index.html` keeps the wording of the matching CV bullets as short bullet
points (not a paragraph), and has an `<img class="timeline-logo" alt="">` next to its heading. To
change a logo, replace the file in `assets/logos/` — a transparent PNG or SVG; it is shown inside a
150×40 box, so any aspect ratio works. To drop one, delete that `<img>` line. The current files:

| File | Used for | Source |
| --- | --- | --- |
| `koc.png` | Koç University | ku.edu.tr header logo, downscaled |
| `mondelez.svg` | Mondelēz International | Wikimedia Commons (the company site only offers a white-on-purple JPG) |
| `loreal.svg` | L'Oréal | loreal.com header logo, recoloured from white to black |
| `qnb.png` | QNB Finansbank | qnb.com.tr header logo |
| `eur.svg` | Erasmus University College + Rotterdam | eur.nl header logo (the Erasmus signature) |
| `pwc.svg` | PwC Turkey | Wikimedia Commons (pwc.com blocks automated downloads) |
| `coolblue.svg` | Coolblue | coolblue.nl header logo, CSS colours baked in, full roundel |
| `bynder.svg` | Bynder | bynder.com header logo |

Logos are trademarks of their owners; the footer says so.

### The "coming soon" badge (thesis project card)

The thesis card shows an animated dot-loader with the line "Training finished. Write-up and repository coming soon." Drop a GIF at `assets/coming-soon.gif` any time and it'll replace the
loader automatically — no code changes needed.

### Remaining placeholders to fill in before publishing

Search the codebase for `[PLACEHOLDER]` and `[YOUR_` to find every spot:

- `data/projects.js`: the thesis project's `github` is `null` (the card says "Repository coming
  soon") — add the link once the thesis repository is public
- `assets/hobbies/piano.jpg`: a stand-in illustration of piano keys, not a real photo — swap in
  your own square photo any time; every other hobby card and the photo wall already have photos
- `assets/coming-soon.gif`: optional, for the thesis card

Contact info (email, LinkedIn, GitHub) is already filled in.

## Deploy (GitHub Pages — free, simplest option)

1. Create a new GitHub repository (e.g. `sinemkircali.github.io` for a root-domain site, or any name for a project site).
2. From inside the `portfolio/` folder:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

3. In the GitHub repo, go to **Settings → Pages**, set **Source** to `main` branch, `/ (root)` folder, and save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` (or `https://<your-username>.github.io/` if you named the repo `<your-username>.github.io`).

No build step, no config file needed — GitHub Pages serves the static files as-is.

## Notes

- Fonts (Newsreader, Inter, IBM Plex Mono) load from Google Fonts via `<link>` tags — free, no API key needed.
- The hero animation and timeline reveal respect `prefers-reduced-motion`.
- All colors/type are CSS custom properties in `css/style.css`, so a full re-theme only touches that one file.
- `notes/llm-marketing-exam-table.html` intentionally keeps its own dark, data-dense visual style
  rather than matching the portfolio theme — it's a functional study reference, not a showcase
  piece, and it's linked out to (opens in a new tab) rather than embedded inline.
