---
title: KKS Competency Building
---

# KKS Competency Building – Adjunct Positions

<p>The Knowledge Foundation (KK-stiftelsen) funds two adjunct positions that bring industry expertise into the SEE group. Each is a 20% position that combines research, supervision and teaching, with joint publications, new grant applications and a lasting partnership between Mid Sweden University and the company as the intended outcomes.</p>

<h2>Truong Ho-Quang, Volvo Cars (June 2025 – May 2027)</h2>

<p><b>Truong Ho-Quang</b> joins from <b>Volvo Cars</b> as Adjunct Lecturer in software engineering. He brings expertise in software architecture and quality assurance to the group's work on complex, safety-critical software systems, including AI-augmented testing and verification. He co-authors research with the group, supports outreach to regional industry, and contributes to the master's programme in AI transformation.</p>

<h2>Lucas Gren, Getinge (October 2026 – September 2029)</h2>

<p><b>Lucas Gren</b> joins from <b>Getinge</b> as Adjunct Senior Lecturer. His expertise is in behavioural software engineering and the organisational side of AI transformation, with a focus on safety-critical medtech systems. Through co-produced research, case studies and student projects, the position enables the study of how AI can be introduced and governed in regulated healthcare contexts. He co-leads research, co-supervises MSc and PhD students, and contributes to advanced-level and continuing education in AI transformation.</p>

<img alt="KK-stiftelsen logotype" src="../assets/images/kk-stiftelsen.svg" width="40%" style="max-width: 320px; display:block; margin: 1rem 0;">

<div id="news" class="news-section">
  <h2 data-translate="news">News</h2>
  <div class="news-list">
{% assign sorted_news = site.news | sort: "name" | reverse %}
{% assign sorted_news = sorted_news | where: "project", "kks-competency-building" %}
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
