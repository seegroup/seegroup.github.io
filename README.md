# SEE Research Group Website

Static website for the Software Engineering and Education (SEE) Research Group at Mid Sweden University (MIUN).

**Repository:** [seegroup/seegroup](https://github.com/seegroup/seegroup)  
**Live Site:** [https://seegroup.github.io](https://seegroup.github.io)

## Features

- Bilingual support (English/Swedish) with language switcher
- Responsive design with MIUN-inspired color scheme
- Auto-generated listings for people, projects, and publications
- News section with date-based entries
- Alumni Hall of Fame with co-authored publications
- Profile images fetched from MIUN pages with caching

## Setup for GitHub Pages

### Automatic Jekyll Build (Recommended)

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
4. Click "Save"
5. GitHub will automatically build and deploy your site

The site will be available at `https://seegroup.github.io` (configured in `_config.yml`).

### Local Development

To test locally before pushing:

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Build site
bundle exec jekyll build
```

Visit `http://localhost:4000` to preview your site.

## Configuration

The `_config.yml` is configured for the `seegroup.github.io` organization page:

```yaml
url: "https://seegroup.github.io"
baseurl: ""  # Empty for organization/user pages
```

If your repository name is different, update these values accordingly.

## Content Structure

- `_people/` - Individual person profiles (Markdown files with front matter)
- `_projects/` - Project descriptions
- `_news/` - News items (date-based filenames: `YYYY-MM-DD-title.md`)
- `_data/` - Data files (e.g., `alumni_papers.json`)
- `assets/` - CSS, JavaScript, and images
  - `assets/css/style.css` - Main stylesheet
  - `assets/js/lang.js` - Language switching functionality
  - `assets/js/images.js` - Profile image fetching and caching
  - `assets/images/see.png` - Group logo
- `_layouts/` - Page templates
- `_includes/` - Reusable components (navigation, etc.)

## Adding Content

### Adding a Person

Create a file in `_people/` with front matter:

```markdown
---
name: Firstname Lastname
role: Position
group: current  # or "former" or "alumni"
homepage: https://www.miun.se/en/personnel/...
graduation_year: 2024  # for alumni only
---
```

### Adding News

Create a file in `_news/` with date-based filename:

```markdown
---
title: News Title
date: 2026-01-15
---

News content here...
```

### Adding Publications

Edit `publications.md` directly. Links are automatically added from the ODT source file.

## Notes

- The `_site/` directory is auto-generated and should not be committed (already in `.gitignore`)
- GitHub Pages will automatically build your site when you push to the main branch
- The repository must be **public** for free GitHub accounts to use GitHub Pages
- Profile images are fetched from MIUN pages and cached in browser localStorage
