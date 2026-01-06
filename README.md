# SEE Research Group Website

This repository contains the source files for the SEE Research Group website.

## Updating Content

### Adding or Editing People

Edit files in the `_people/` directory. Each person has a Markdown file with front matter:

```markdown
---
name: Firstname Lastname
role: Position (e.g., "Associate Professor", "PhD Student")
group: current  # Options: "current", "former", or "alumni"
homepage: https://www.miun.se/en/personnel/...
graduation_year: 2024  # Only for alumni
active: false  # Set to false to hide from current members (optional)
---
```

**To add a new person:**
1. Create a new file: `_people/firstname-lastname.md`
2. Add the front matter and any content
3. Commit and push

**To comment out a person:**
- Set `active: false` in their file, or
- Change `group: "former"` to move them to former members

### Adding News

Create a new file in `_news/` with the format: `YYYY-MM-DD-title.md`

Example: `2026-01-15-hello-world.md`

```markdown
---
title: News Title
---

News content here. You can use **markdown** formatting.
```

The date is automatically extracted from the filename.

### Updating Publications

Edit `publications.md` directly. Add new publications in the appropriate year section.

Format:
```markdown
Author names (Year). Title. Venue. <a href="URL" target="_blank" rel="noopener noreferrer">DOI →</a>
```

### Updating Alumni Papers

Edit `_data/alumni_papers.json` to add or update co-authored papers for alumni.

Example entry:
```json
{
  "name": "Alumni Name",
  "graduation_year": 2024,
  "papers": [
    {
      "title": "Paper Title",
      "year": 2025,
      "venue": "Conference or Journal Name",
      "url": "https://doi.org/..."
    }
  ]
}
```

### Updating Contact Information

Edit `contact.md` to update group lead, email, location, or other contact details.

### Updating Projects

Create files in `_projects/` directory:

```markdown
---
title: Project Title
status: Active  # or "Completed", etc.
---

Project description...
```

## File Structure

- `_people/` - Person profiles
- `_projects/` - Project descriptions  
- `_news/` - News items (date-based filenames)
- `_data/alumni_papers.json` - Alumni publication data
- `contact.md` - Contact information
- `publications.md` - Publications list
- `index.md` - Homepage content
- `people.md` - People page (auto-generated from `_people/`)
- `projects.md` - Projects page (auto-generated from `_projects/`)

## Notes

- Use Markdown for formatting
- Images go in `assets/images/`
- The site supports English/Swedish - translations are handled automatically
- Changes are automatically deployed when pushed to the main branch
