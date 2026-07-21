# davidochoa.gt

Personal landing page for David Ochoa — Senior Software Engineer.

A single-page, single-screen static site. No build step, no dependencies, no
JavaScript framework: one `index.html` plus static assets, served directly by
GitHub Pages.

## Structure

```
index.html            The entire page — header, links, footer
CNAME                 Custom domain for GitHub Pages (davidochoa.gt)
assets/
  css/main.css        Compiled stylesheet (generated from assets/sass)
  css/ie8.css         Legacy IE fallbacks
  css/ie9.css
  css/images/bg.jpg   Scrolling background (1500px wide, horizontally tileable)
  fonts/              Font Awesome webfonts, used for the social icons
  js/ie/              html5shiv, respond.js, CSS3 PIE — legacy IE shims only
  sass/               Sass sources for the CSS above
```

## Local preview

No tooling required — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Editing content

Everything user-facing lives in `index.html`:

- **Headline and taglines** — the `<h1>` and two `<p>` elements in `#header`.
- **Social links** — the `<nav>` list. Icons come from Font Awesome class names
  (`fa-github`, `fa-linkedin-square`, …), so swapping an icon means swapping that
  class. Delete unused entries rather than pointing them at `#`.
- **Metadata** — `<title>`, `description`, and the Open Graph tags in `<head>`
  drive search results and link previews. `og:url` and `og:image` are absolute
  and hardcoded to `https://davidochoa.gt`, so they need updating if the domain
  changes.

## Editing styles

`assets/css/main.css` is compiled output. Edit `assets/sass/main.scss` and
recompile rather than patching the CSS directly:

```sh
sass assets/sass/main.scss assets/css/main.css
```

If you never plan to touch the styles, `assets/sass/` can be deleted safely.

### The scrolling background

The animation is pure CSS. A replacement for `assets/css/images/bg.jpg` should be
horizontally tileable, wide and short, roughly 1500px wide, and fade to a solid
color at the top or bottom — that color fills the empty space above and below.
Set the background color, URL, and placement via `$bg` in
`assets/sass/libs/_vars.scss`, adjusting `$bg-width` if the image isn't 1500px.

## Deployment

Pushing to `master` publishes via GitHub Pages. The custom domain comes from the
`CNAME` file, and only resolves once DNS at the registrar points at GitHub —
either an `ALIAS`/`ANAME` on the apex to `tikochato.github.io`, or `A` records to
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
