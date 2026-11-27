# sqlz website

The project site for sqlz, built with [Zine](https://zine-ssg.io) and styled
with the WeStack design system. It is published to GitHub Pages at
<https://sqlz.eu> (GitHub Pages with a custom domain) by `.github/workflows/pages.yml` on every
push to `main` that touches `site/`.

## Development

Run these from `site/`:

- `mise install`: installs Zine
- `mise dev`: runs the Zine dev server with live reload (http://localhost:1990)
- `mise build`: builds the site into `public/`
- `mise run brand`: refreshes `assets/brand/` from a local checkout of the
  WeStack design repo in `design/`

## Writing content

- Landing page: `content/index.smd`. Hero text lives in `.custom`, the proof
  strip in the `proof` section, each feature card in a `feature-*` section
  (`.data('icon','zap')` picks the icon) and the closing text in `about`.
- Docs live under `content/docs/` and must be listed in
  `assets/docs-nav.ziggy`, which defines the sidebar order.
- Changelog entries go in `content/log.smd` as
  `# [Title]($section.id('id').data('date','YYYY-MM-DD'))`. The RSS feed at
  `/log/index.xml` is generated from the same sections.
- Headings in content start at `#`, which renders as `<h2>` (the layout owns
  the `<h1>`). Give headings an id, e.g. `# [Install]($heading.id('install'))`,
  to list them in the docs "On this page" table of contents.
- Notes: `>[]($block.attrs('note'))`, also `warning` and `danger`.
- Code fences need a language Zine knows (`zig`, `sql`, `ziggy`, `console`,
  ...) or no language at all; `text` is rejected.
- Use `<ctx :if="...">` wrappers in layouts: `:if` on a regular element leaves
  an empty element behind when false.

## Domain

The site is served from the root of `sqlz.eu` (`.host_url` in `zine.ziggy`).
The custom domain is set in the repository's Pages settings; with an Actions
deploy, GitHub ignores a `CNAME` file. Link with `$site.page(...)`,
`$site.asset(...)` or `$link.page(...)` rather than hardcoded paths, so the
site keeps working if it ever moves under a path prefix.

## Layout

| Path | Content |
| --- | --- |
| `zine.ziggy` | Site config and project links |
| `content/` | SuperMD pages: landing, quickstart, docs, changelog, community |
| `layouts/` | SuperHTML layouts: `templates/base.shtml`, `index`, `page`, `docs`, `log` (+ `log.xml` RSS) |
| `assets/style.css` | Site styles, built only on design-system tokens |
| `assets/highlight.css` | Syntax highlighting with the data-palette tokens |
| `assets/site.js` | Theme toggle, mobile menu, copy buttons |
| `assets/icons/` | Vendored [lucide](https://lucide.dev) icons (ISC) |
| `assets/brand/` | Vendored WeStack fonts (OFL), logos, imagery and tokens |
| `assets/docs-nav.ziggy` | Docs sidebar |
