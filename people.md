---
title: People
---

# People

## Current Members

{% assign current_people = site.people | where: "group", "current" | where_exp: "person", "person.active != false" | sort: "name" %}
<div class="grid">
{% for p in current_people %}
  {% assign person_filename = p.path | split: "/" | last | remove: ".md" %}
  {% if p.homepage %}
  <a href="{{ p.homepage }}" target="_blank" rel="noopener noreferrer" class="card card-link" data-person="{{ person_filename }}">
    <h2 style="margin-top:0">{{ p.name }}</h2>
    <p><span class="badge">{{ p.role | default: "Member" }}</span></p>
  </a>
  {% else %}
  <div class="card" data-person="{{ person_filename }}">
    <h2 style="margin-top:0">{{ p.name }}</h2>
    <p><span class="badge">{{ p.role | default: "Member" }}</span></p>
  </div>
  {% endif %}
{% endfor %}
</div>

## Collaborators, Affiliates and Former Members

{% assign former_people = site.people | where: "group", "former" | sort: "name" %}
<div class="grid">
{% for p in former_people %}
  {% assign person_filename = p.path | split: "/" | last | remove: ".md" %}
  {% if p.homepage %}
  <a href="{{ p.homepage }}" target="_blank" rel="noopener noreferrer" class="card card-link" data-person="{{ person_filename }}">
    <h2 style="margin-top:0">{{ p.name }}</h2>
    <p><span class="badge">{{ p.role | default: "Former Member" }}</span></p>
  </a>
  {% else %}
  <div class="card" data-person="{{ person_filename }}">
    <h2 style="margin-top:0">{{ p.name }}</h2>
    <p><span class="badge">{{ p.role | default: "Former Member" }}</span></p>
  </div>
  {% endif %}
{% endfor %}
</div>

## Alumni Hall of Fame

A list of former undergraduate alumni we co-published software engineering articles with, organized by graduation year.

{% assign alumni = site.people | where: "group", "alumni" | sort: "graduation_year" | reverse %}
{% assign alumni_papers = site.data.alumni_papers %}
<div class="grid">
{% for p in alumni %}
  {% assign alumni_paper_data = alumni_papers | where: "name", p.name | first %}
  <div class="card">
    <h2 style="margin-top:0">{{ p.name }}</h2>
    {% if p.graduation_year %}<p><span class="badge">Graduated {{ p.graduation_year }}</span></p>{% endif %}
    {% if alumni_paper_data and alumni_paper_data.papers.size > 0 %}
      <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Co-authored</p>
        {% for paper in alumni_paper_data.papers %}
          {% assign is_journal = false %}
          {% if paper.venue contains "Journal" or paper.venue == "Information and Software Technology" or paper.venue == "PeerJ Computer Science" %}
            {% assign is_journal = true %}
          {% endif %}
          <div class="{% if is_journal %}paper-journal{% endif %}" style="margin-bottom: 1rem;">
            <div style="display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.5rem;">
              <p style="font-size: 0.9375rem; margin: 0; line-height: 1.4; flex: 1;">
                <em style="color: var(--text);">{{ paper.title }}</em>
              </p>
              {% if is_journal %}
                <span class="badge badge-journal" style="font-size: 0.6875rem; padding: 0.35rem 0.65rem; flex-shrink: 0; margin-top: 0.1rem;">Journal</span>
              {% endif %}
            </div>
            <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.5rem;">
              {% assign year_str = paper.year | append: '' %}
              {% assign year_short = paper.year | modulo: 100 %}
              {% assign year_short_str = year_short | append: '' %}
              {% if paper.venue contains year_str or paper.venue contains year_short_str %}
                {{ paper.venue }}
              {% else %}
                {{ paper.venue }} ({{ paper.year }})
              {% endif %}
            </p>
            <div style="font-size: 0.8125rem;">
              {% if paper.url %}
                <a href="{{ paper.url }}" target="_blank" rel="noopener noreferrer" style="color: var(--miun-blue); text-decoration: none;">DOI →</a>
              {% elsif paper.publisher_url %}
                <a href="{{ paper.publisher_url }}" target="_blank" rel="noopener noreferrer" style="color: var(--miun-blue); text-decoration: none;">Publisher →</a>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    {% endif %}
  </div>
{% endfor %}
</div>
