---
title: Home
---

# DO-AI

<p data-translate="intro">The main goal of the project is to contribute to the growth and development of SMEs by providing access to employees with up-to-date competence in AI, who can contribute to sustainable growth and increased competitiveness.</p>

<p data-translate="context">In the long term, this also leads to an improved ability to use AI in an ethically responsible and sustainable way.</p>

<p data-translate="context">The main objective of the project is aligned with the <b>INTERREG</b> programmes priority of creating a smarter cross-border region, developing and improving research and innovation capacity, and the use of advanced technology.</p>

<img alt="" src="https://miun.imagevault.media/publishedmedia/2geg23qr8fhy57mnxakn/Interreg-Sverige-Norge-16x9.webp">

<div class="grid">
  <div class="card">
    <div class="badge" data-translate="researchBadge">Research</div>
    <h2 data-translate="researchTitle">What we do</h2>
    <p data-translate="researchDesc">Applied research in software testing, trustworthy AI, and empirical studies of developer work and learning.</p>
    <p><a href="{{ '../publications' | relative_url }}" data-translate="researchLink">See publications →</a></p>
  </div>

  <div class="card">
    <div class="badge" data-translate="peopleBadge">People</div>
    <h2 data-translate="peopleTitle">Who we are</h2>
    <p data-translate="peopleDesc">Senior researchers, postdocs, and PhD students collaborating across software engineering and education.</p>
    <p><a href="{{ '../people' | relative_url }}" data-translate="peopleLink">Meet the group →</a></p>
  </div>

  <div class="card">
    <div class="badge" data-translate="contactBadge">Contact</div>
    <h2 data-translate="contactTitle">Collaborate</h2>
    <p data-translate="contactDesc">Interested in collaborating with us or supervising a thesis project?</p>
    <p><a href="{{ '../contact' | relative_url }}" data-translate="contactLink">Get in touch →</a></p>
  </div>
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
  <div class="news-archive-link">
    <a href="{{ '../news' | relative_url }}">All news →</a>
  </div>
</div>
