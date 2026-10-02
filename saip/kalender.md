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
<p id="past-control" hidden><button type="button" class="toggle-past" id="toggle-past" aria-expanded="false">Visa tidigare evenemang</button></p>
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
<script>
(function () {
  var now = new Date();
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  var months = document.querySelectorAll("section.month");
  var past = [];
  var upcoming = 0;
  var showPast = false;
  var i, j;
  for (i = 0; i < months.length; i++) {
    var rows = months[i].querySelectorAll("li.event");
    for (j = 0; j < rows.length; j++) {
      if (rows[j].getAttribute("data-end") < today) { past.push(rows[j]); } else { upcoming++; }
    }
  }
  var days = document.querySelectorAll("div.day");
  function hideEmpty(groups) {
    for (i = 0; i < groups.length; i++) {
      groups[i].hidden = groups[i].querySelectorAll("li.event:not([hidden])").length === 0;
    }
  }
  function render() {
    for (i = 0; i < past.length; i++) { past[i].hidden = !showPast; }
    hideEmpty(days);
    hideEmpty(months);
  }
  render();
  if (upcoming === 0) { document.getElementById("no-upcoming").hidden = false; }
  if (past.length > 0) {
    var button = document.getElementById("toggle-past");
    document.getElementById("past-control").hidden = false;
    button.addEventListener("click", function () {
      showPast = !showPast;
      button.textContent = showPast ? "Dölj tidigare evenemang" : "Visa tidigare evenemang";
      button.setAttribute("aria-expanded", showPast ? "true" : "false");
      render();
    });
  }
})();
</script>
</div>

<div class="box" id="tipsa" markdown="0">
<p><a href="{{ '/saip/kalender.ics' | relative_url }}">Prenumerera i din kalender</a>. Lägg till länken som internetkalender i Outlook, Google Kalender eller Apple Kalender, så dyker nya evenemang upp av sig själva.</p>
<p>Ordnar du något som borde stå här, eller känner du till ett evenemang som saknas? <a href="mailto:felix.dobslaw@miun.se?subject=SAIP%20kalender%20%E2%80%93%20tips%20om%20evenemang">Tipsa om ett evenemang</a>. Skriv vad det är, när och var, och gärna en länk.</p>
</div>

<p class="small">Listan sköts av SAIP och uppdateras löpande. Uppgifterna kommer från arrangörernas egna sidor, så titta alltid där för aktuell tid och anmälan.</p>
