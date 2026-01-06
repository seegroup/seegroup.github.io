---
title: Home
---

# SEE Research Group

Software Engineering and Education (SEE) Research Group

<p data-translate="intro">We are a research group at Mid Sweden University focusing on **software engineering**, **software testing**, and **generative AI in development and education**.</p>

<p data-translate="context">Worldwide, there is an increasing demand for software professionals, and software engineers are the fifth most common profession in Sweden today. The SEE Research Group consists of social scientists and computer scientists with the goal of understanding how software is successfully created and how to best learn software development.</p>

<p data-translate="invested">We are particularly invested into:</p>

- <span data-translate="researchDir1">**The quality assurance of software and AI through testing and test augmentation** (contact <a href="mailto:felix.dobslaw@miun.se">Felix Dobslaw</a>)</span>
- <span data-translate="researchDir2">**The gap between education and industry demands and the role of life-long learning** (contact <a href="mailto:lena-maria.oberg@miun.se">Lena-Maria Öberg</a>)</span>
- <span data-translate="researchDir3">**Forms of distance collaboration and their implications for individuals and organizations** (contact <a href="mailto:thomas.persson@miun.se">Thomas Persson</a>)</span>

<div class="grid">
  <div class="card">
    <div class="badge" data-translate="researchBadge">Research</div>
    <h2 data-translate="researchTitle">What we do</h2>
    <p data-translate="researchDesc">Applied research in software testing, trustworthy AI, and empirical studies of developer work and learning.</p>
    <p><a href="{{ '/projects' | relative_url }}" data-translate="researchLink">See projects →</a></p>
  </div>

  <div class="card">
    <div class="badge" data-translate="peopleBadge">People</div>
    <h2 data-translate="peopleTitle">Who we are</h2>
    <p data-translate="peopleDesc">Senior researchers, postdocs, and PhD students collaborating across software engineering and education.</p>
    <p><a href="{{ '/people' | relative_url }}" data-translate="peopleLink">Meet the group →</a></p>
  </div>

  <div class="card">
    <div class="badge" data-translate="contactBadge">Contact</div>
    <h2 data-translate="contactTitle">Collaborate</h2>
    <p data-translate="contactDesc">Interested in collaborating with us or supervising a thesis project?</p>
    <p><a href="{{ '/contact' | relative_url }}" data-translate="contactLink">Get in touch →</a></p>
  </div>
  {% assign latest_news = site.news | sort: "name" | reverse | first %}
  {% if latest_news %}
  {% assign filepath = latest_news.path | default: latest_news.name %}
  {% assign filename = filepath | split: "/" | last | remove: ".md" %}
  {% assign date_str = filename | slice: 0, 10 %}
  {% assign date_parts = date_str | split: "-" %}
  {% if date_parts.size >= 3 %}
  {% assign year = date_parts[0] %}
  {% assign month_str = date_parts[1] %}
  {% assign day_str = date_parts[2] %}
  {% if month_str != blank and day_str != blank %}
  {% assign month_num = month_str | plus: 0 %}
  {% assign day = day_str | plus: 0 %}
  {% assign month_names = "January,February,March,April,May,June,July,August,September,October,November,December" | split: "," %}
  {% assign month_index = month_num | minus: 1 %}
  {% if month_index >= 0 and month_index < 12 %}
  {% assign month_name = month_names[month_index] %}
  {% else %}
  {% assign month_name = "Unknown" %}
  {% assign day = "?" %}
  {% endif %}
  {% else %}
  {% assign month_name = "Unknown" %}
  {% assign day = "?" %}
  {% endif %}
  {% else %}
  {% assign month_name = "Unknown" %}
  {% assign day = "?" %}
  {% assign year = "?" %}
  {% endif %}
  <div class="card news-preview-card">
    <div class="badge" data-translate="newsBadge">Latest News</div>
    <h2>{{ latest_news.title }}</h2>
    <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.75rem;">{{ month_name }} {{ day }}, {{ year }}</p>
    <p style="margin-bottom: 1rem;">{{ latest_news.content | strip_html | truncatewords: 20 }}</p>
    <p style="margin-bottom: 0;"><a href="#news" onclick="document.getElementById('news').scrollIntoView({behavior: 'smooth'}); return false;" data-translate="newsLink">Read more news →</a></p>
  </div>
  {% endif %}
</div>

<div id="news" class="news-section">
  <h2 data-translate="news">News</h2>
  <div class="news-list">
{% assign sorted_news = site.news | sort: "name" | reverse %}
{% for item in sorted_news limit: 5 %}
{% assign filepath = item.path | default: item.name %}
{% assign filename = filepath | split: "/" | last | remove: ".md" %}
{% assign date_str = filename | slice: 0, 10 %}
{% assign date_parts = date_str | split: "-" %}
{% if date_parts.size >= 3 %}
{% assign year = date_parts[0] %}
{% assign month_str = date_parts[1] %}
{% assign day_str = date_parts[2] %}
{% if month_str != blank and day_str != blank %}
{% assign month_num = month_str | plus: 0 %}
{% assign day = day_str | plus: 0 %}
{% assign month_names = "January,February,March,April,May,June,July,August,September,October,November,December" | split: "," %}
{% assign month_index = month_num | minus: 1 %}
{% if month_index >= 0 and month_index < 12 %}
{% assign month_name = month_names[month_index] %}
{% else %}
{% assign month_name = "Unknown" %}
{% assign day = "?" %}
{% endif %}
{% else %}
{% assign month_name = "Unknown" %}
{% assign day = "?" %}
{% endif %}
{% else %}
{% assign month_name = "Unknown" %}
{% assign day = "?" %}
{% assign year = "?" %}
{% endif %}
<div class="card">
  <h2 style="margin-top: 0;">{{ item.title }}</h2>
  <p style="color: var(--muted); font-size: 0.875rem; margin-bottom: 0.75rem;">{{ month_name }} {{ day }}, {{ year }}</p>
  <div>{{ item.content }}</div>
</div>
{% endfor %}
  </div>
</div>
