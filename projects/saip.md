---
title: SAIP
---

# SAIP – Software and AI Transformation Platform

<p>SAIP builds a regional arena for software and AI transformation in Jämtland Härjedalen. The project brings together companies, the public sector, researchers and students to develop new knowledge, build collaborations and strengthen the region's ability to plan and carry out AI-related change.</p>

<p>The primary target group is companies in the region, in particular small and medium-sized enterprises that meet growing digitalisation needs without in-house resources for advanced software development or AI. Activities include a structured needs analysis, workshops and seminars, and a recurring participant-driven unconference with engagement from the national software engineering research community.</p>

<p>The project runs from September 2026 to June 2029 and is led by <b>Felix Dobslaw</b> together with <b>Anna Sörensson</b> at Mid Sweden University. It is funded by the <b>European Social Fund Plus</b> (ESF+) through the Swedish ESF Council and co-financed by <b>Region Jämtland Härjedalen</b>.</p>

<img alt="Co-funded by the European Union" src="../assets/images/eu-medfinansieras.svg" width="45%" style="max-width: 420px; display:inline-block; vertical-align:middle; margin: 1rem 2rem 1rem 0;">
<img alt="Region Jämtland Härjedalen logotype" src="../assets/images/region-jamtland-harjedalen.svg" width="40%" style="max-width: 360px; display:inline-block; vertical-align:middle; margin: 1rem 0;">

<div id="news" class="news-section">
  <h2 data-translate="news">News</h2>
  <div class="news-list">
{% assign sorted_news = site.news | sort: "name" | reverse %}
{% assign sorted_news = sorted_news | where: "project", "saip" %}
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
