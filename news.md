---
title: News
---

# News

<div class="news-list">
{% assign sorted_news = site.news | sort: "name" | reverse %}
{% assign current_year = "" %}
{% for item in sorted_news %}
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
{% if year != current_year %}
{% assign current_year = year %}
<h2 class="news-year-heading">{{ year }}</h2>
{% endif %}
<div class="card news-archive-card">
  <div class="news-archive-meta">{{ month_name }} {{ day }}, {{ year }}</div>
  <h3 style="margin-top: 0.25rem;">{{ item.title }}</h3>
  <div class="news-archive-body">{{ item.content }}</div>
</div>
{% endfor %}
</div>
