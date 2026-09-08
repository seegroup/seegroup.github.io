---
title: Decision Aware Human-AI Collaboration
---

# Decision Aware Human-AI Collaboration for Industrial Digital Products

<p>The project studies how people and AI systems make decisions together in industrial digital products, and how such collaboration can be designed so that the human stays aware of, and in control of, the decisions being made.</p>

<p>The work is carried out together with <b>Volvo Trucks</b> and combines empirical studies in the industrial setting with the design and evaluation of decision-aware AI support.</p>

<p>The project runs from April 2026 to April 2028 and is led by <b>Sergio Rico</b>, with <b>Awais Ahmad</b> and <b>Felix Dobslaw</b> at Mid Sweden University. It is funded by <b>Vinnova</b>, Sweden's innovation agency (ref. 2026-00111).</p>

<img alt="Med finansiering från Vinnova" src="../assets/images/med-finansiering-fran-vinnova.svg" width="40%" style="max-width: 320px; display:block; margin: 1rem 0;">

<div id="news" class="news-section">
  <h2 data-translate="news">News</h2>
  <div class="news-list">
{% assign sorted_news = site.news | sort: "name" | reverse %}
{% assign sorted_news = sorted_news | where: "project", "decision-aware" %}
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
