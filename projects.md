---
title: Projects
---

# Projects

{% assign sorted_projects = site.projects | sort: "title" %}
<div class="grid">
{% for pr in sorted_projects %}
  <div class="card">
    <h2 style="margin-top:0">{{ pr.title }}</h2>
    {% if pr.status %}<p><span class="badge">{{ pr.status }}</span></p>{% endif %}
    <p>{{ pr.excerpt | strip_html | truncate: 140 }}</p>
    <p><a href="{{ pr.url | relative_url }}">Read more →</a></p>
  </div>
{% endfor %}
</div>
