---
layout: saip
title: Kalender
description: Kommande evenemang om mjukvara, AI, digitalisering och teknik i Jämtlands län, samlade på ett ställe.
permalink: /saip/kalender/
---

# Kalender

<p>Här samlar vi kommande evenemang om mjukvara, AI, digitalisering och teknik i Jämtlands län, oavsett vem som ordnar dem. Varje rad länkar till arrangörens egen sida, där du hittar program och anmälan. Saknar du något? <a href="#tipsa">Tipsa oss gärna</a>.</p>

{% assign days = site.data.saip_events | group_by_exp: "e", "e.start | date: '%Y-%m-%d'" | sort: "name" %}
{% assign month_names = "Januari,Februari,Mars,April,Maj,Juni,Juli,Augusti,September,Oktober,November,December" | split: "," %}
{% assign month_short = "jan,feb,mar,apr,maj,jun,jul,aug,sep,okt,nov,dec" | split: "," %}
{% assign weekdays = "Måndag,Tisdag,Onsdag,Torsdag,Fredag,Lördag,Söndag" | split: "," %}
<div markdown="0">
<p id="no-upcoming" hidden>Just nu finns inga kommande evenemang i listan.</p>
{% assign current_month = "" %}
{% for day in days %}
{% assign items = day.items | sort: "time" %}
{% assign first = items[0] %}
{% assign month_key = first.start | date: "%Y-%m" %}
{% if month_key != current_month %}
{% unless forloop.first %}</section>
{% endunless %}
{% assign current_month = month_key %}
{% assign m = first.start | date: "%-m" | minus: 1 %}
<section class="month">
<h2>{{ month_names[m] }} {{ first.start | date: "%Y" }}</h2>
{% endif %}
{% assign wd = first.start | date: "%u" | minus: 1 %}
{% assign m1 = first.start | date: "%-m" | minus: 1 %}
{% assign series_names = items | map: "series" | uniq %}
{% assign day_series = nil %}
{% if series_names.size == 1 and first.series %}{% assign day_series = first.series %}{% endif %}
<div class="day">
<h3><time datetime="{{ day.name }}">{{ weekdays[wd] }} {{ first.start | date: "%-d" }} {{ month_short[m1] }}</time>{% if day_series %}<span class="day-series">{{ day_series | escape }}</span>{% endif %}</h3>
<ul class="events">
{% for e in items %}
{% assign last_day = e.end | default: e.start %}
<li class="event" data-end="{{ last_day | date: '%Y-%m-%d' }}">
<div class="event-time">{{ e.time }}</div>
<div class="event-body">
<a class="event-title" href="{{ e.url }}">{{ e.title | escape }}</a>{% if e.saip %}<span class="mark" title="Ordnas av SAIP">SAIP</span>{% endif %}
<span class="small">{% if e.end and e.end != e.start %}{% assign d2 = e.end | date: "%-d" %}{% assign m2 = e.end | date: "%-m" | minus: 1 %}Till och med {{ d2 }} {{ month_short[m2] }} · {% endif %}{{ e.place }}{% if e.venue %}, {{ e.venue | escape }}{% endif %} · {{ e.organiser | escape }}{% if e.series and day_series == nil %} · {{ e.series | escape }}{% endif %}</span>
{% if e.cost or e.deadline %}{% assign dd = e.deadline | date: "%-d" %}{% assign dm = e.deadline | date: "%-m" | minus: 1 %}<span class="small">{% if e.cost %}{{ e.cost | escape }}{% endif %}{% if e.cost and e.deadline %} · {% endif %}{% if e.deadline %}Anmälan senast {{ dd }} {{ month_short[dm] }}{% endif %}</span>
{% endif %}{% if e.note %}<span class="small">{{ e.note | escape }}</span>{% endif %}
</div>
</li>
{% endfor %}
</ul>
</div>
{% if forloop.last %}</section>
{% endif %}
{% endfor %}
<details id="archive" hidden>
<summary>Tidigare evenemang <span id="archive-count"></span></summary>
{% assign seen = "|" %}
{% assign current_month = "" %}
{% assign days_desc = days | reverse %}
{% for day in days_desc %}
{% assign items = day.items | sort: "time" | reverse %}
{% for e in items %}
{% assign first = e %}
{% assign last = e %}
{% assign count = 1 %}
{% if e.series %}
{% assign key = "|" | append: e.series | append: "|" %}
{% if seen contains key %}{% continue %}{% endif %}
{% assign seen = seen | append: e.series | append: "|" %}
{% assign members = site.data.saip_events | where: "series", e.series | sort: "start" %}
{% assign first = members | first %}
{% assign last = members | last %}
{% assign count = members.size %}
{% endif %}
{% assign last_day = last.end | default: last.start %}
{% assign month_key = last_day | date: "%Y-%m" %}
{% if month_key != current_month %}
{% if current_month != "" %}</ul>
</div>
{% endif %}
{% assign current_month = month_key %}
{% assign m = last_day | date: "%-m" | minus: 1 %}
<div class="past-month">
<h3>{{ month_names[m] }} {{ last_day | date: "%Y" }}</h3>
<ul class="past">
{% endif %}
{% assign d1 = first.start | date: "%-d" %}
{% assign m1 = first.start | date: "%-m" | minus: 1 %}
{% assign d2 = last_day | date: "%-d" %}
{% assign m2 = last_day | date: "%-m" | minus: 1 %}
{% assign same = false %}{% if d1 == d2 and m1 == m2 %}{% assign same = true %}{% endif %}
<li data-end="{{ last_day | date: '%Y-%m-%d' }}"><span class="past-date">{% if same %}{{ d1 }} {{ month_short[m1] }}{% elsif m1 == m2 %}{{ d1 }}–{{ d2 }} {{ month_short[m1] }}{% else %}{{ d1 }} {{ month_short[m1] }}–{{ d2 }} {{ month_short[m2] }}{% endif %}</span><span>{% if e.series %}<a href="{{ e.series_url | default: e.url }}">{{ e.series | escape }}</a>, {{ count }} pass{% else %}<a href="{{ e.url }}">{{ e.title | escape }}</a>, {{ e.organiser | escape }}{% endif %}</span></li>
{% endfor %}
{% if forloop.last and current_month != "" %}</ul>
</div>
{% endif %}
{% endfor %}
</details>
<script>
(function () {
  var now = new Date();
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  var i;
  function hideEmpty(selector, rowSelector) {
    var groups = document.querySelectorAll(selector);
    for (i = 0; i < groups.length; i++) {
      groups[i].hidden = groups[i].querySelectorAll(rowSelector + ":not([hidden])").length === 0;
    }
  }
  var rows = document.querySelectorAll("li.event");
  var upcoming = 0;
  for (i = 0; i < rows.length; i++) {
    rows[i].hidden = rows[i].getAttribute("data-end") < today;
    if (!rows[i].hidden) { upcoming++; }
  }
  hideEmpty("div.day", "li.event");
  hideEmpty("section.month", "li.event");
  if (upcoming === 0) { document.getElementById("no-upcoming").hidden = false; }
  var pastRows = document.querySelectorAll("ul.past li");
  var gone = 0;
  for (i = 0; i < pastRows.length; i++) {
    pastRows[i].hidden = pastRows[i].getAttribute("data-end") >= today;
    if (!pastRows[i].hidden) { gone++; }
  }
  hideEmpty("div.past-month", "ul.past li");
  if (gone > 0) {
    document.getElementById("archive-count").textContent = "(" + gone + ")";
    document.getElementById("archive").hidden = false;
  }
})();
</script>
</div>

<div class="box" id="tipsa" markdown="0">
<p><a href="{{ '/saip/kalender.ics' | relative_url }}">Prenumerera i din kalender</a>. Lägg till länken som internetkalender i Outlook, Google Kalender eller Apple Kalender, så dyker nya evenemang upp av sig själva.</p>
<p>Ordnar du något som borde stå här, eller känner du till ett evenemang som saknas? <a href="mailto:felix.dobslaw@miun.se?subject=SAIP%20kalender%20%E2%80%93%20tips%20om%20evenemang">Tipsa om ett evenemang</a>. Skriv vad det är, när och var, och gärna en länk.</p>
</div>

<p class="small">Listan sköts av SAIP och uppdateras löpande. Uppgifterna kommer från arrangörernas egna sidor, så titta alltid där för aktuell tid och anmälan.</p>
