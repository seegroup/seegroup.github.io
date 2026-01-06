# SEE Research Group Website

Static website for the Software Engineering and Education (SEE) Research Group at Mid Sweden University (MIUN).

## Setup for GitHub Pages

### Option 1: Automatic Jekyll Build (Recommended)

1. Push this repository to GitHub
2. Go to your repository Settings → Pages
3. Under "Source", select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
4. Click "Save"
5. GitHub will automatically build and deploy your site

### Option 2: Manual Build with GitHub Actions

If you prefer more control, the included `.github/workflows/jekyll.yml` will build and test your site on every push.

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

Update `_config.yml` with your GitHub Pages URL:

```yaml
url: "https://yourusername.github.io"  # or your custom domain
baseurl: ""  # or "/repository-name" if site is in a subdirectory
```

## Content Structure

- `_people/` - Individual person profiles
- `_projects/` - Project descriptions
- `_news/` - News items (date-based filenames)
- `_data/` - Data files (e.g., `alumni_papers.json`)
- `assets/` - CSS, JavaScript, and images
- `_layouts/` - Page templates
- `_includes/` - Reusable components

## Notes

- The `_site/` directory is auto-generated and should not be committed
- GitHub Pages will automatically build your site when you push to the main branch
