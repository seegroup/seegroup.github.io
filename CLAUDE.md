# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this site

Jekyll-based static website for the SEE (Software Engineering and Education) Research Group at Mid Sweden University (MIUN). Deployed automatically to GitHub Pages on push to `main`.

## Local development

```bash
bundle exec jekyll serve
```

Site served at `http://localhost:4000`. Changes to most files hot-reload; `_config.yml` changes require restart.

## Content architecture

Content lives in three Jekyll collections and a few standalone pages:

- `_news/` — News items. Filename determines date: `YYYY-MM-DD-slug.md`. No individual pages generated (`output: false`); items appear on the homepage, sorted newest-first, limited to 5.
- `_people/` — One file per person (`firstname-lastname.md`). Front matter drives display: `name`, `role`, `group` (`current`/`former`/`alumni`), `homepage`, `graduation_year` (alumni only), `active: false` to hide.
- `_projects/` — One file per project. Front matter: `title`, `status`.
- `publications.md` — Manually maintained, organized by year.
- `_data/alumni_papers.json` — Co-authored papers for alumni, consumed by `people.md`.

## Adding news

Create `_news/YYYY-MM-DD-slug.md`:

```markdown
---
title: Short descriptive title
---

News body in Markdown. Bold key names and titles with **...**, italicize journal/venue names with *...*.
```

## Design principles (from `cursor_agent_instruction_miun_inspired_site.md`)

- MIUN color palette: Blue `#0D76BD`, Yellow accent `#F1E219`, Turquoise `#00BFD5`
- No external JS, no UI frameworks — keep dependencies minimal
- Heading order must be respected (`#` → `##` → `###`) for accessibility
- Link text must be descriptive; avoid "click here"
- Images require `alt` text

## Profile images

Run `./download_profile_images.rb` to pull profile photos from MIUN homepages. Images saved as `assets/images/people/{filename}.jpg` matching the person's `_people/` filename.

## Publications format

```
Author names (Year). Title. *Venue*. <a href="URL" target="_blank" rel="noopener noreferrer">DOI →</a>
```
