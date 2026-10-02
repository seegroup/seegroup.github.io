---
layout: saip
title: Kalender
description: Kommande evenemang om mjukvara, AI, digitalisering och teknik i Jämtlands län, samlade på ett ställe.
permalink: /saip/kalender/
---

# Kalender

<p>Här samlar vi kommande evenemang om mjukvara, AI, digitalisering och teknik i Jämtlands län, oavsett vem som ordnar dem. Varje rad länkar till arrangörens egen sida, där du hittar program och anmälan. Saknar du något? <a href="#tipsa">Tipsa oss gärna</a>.</p>

{% assign events = site.data.saip_events | sort: "start" %}
{% assign month_names = "Januari,Februari,Mars,April,Maj,Juni,Juli,Augusti,September,Oktober,November,December" | split: "," %}
{% assign month_short = "jan,feb,mar,apr,maj,jun,jul,aug,sep,okt,nov,dec" | split: "," %}
{% assign weekdays = "måndag,tisdag,onsdag,torsdag,fredag,lördag,söndag" | split: "," %}
<div markdown="0">
<p id="past-control" hidden><button type="button" class="toggle-past" id="toggle-past" aria-expanded="false">Visa tidigare evenemang</button></p>
<p id="no-upcoming" hidden>Just nu finns inga kommande evenemang i listan.</p>
{% assign current_month = "" %}
{% for e in events %}
{% assign month_key = e.start | date: "%Y-%m" %}
{% if month_key != current_month %}
{% unless forloop.first %}</ul>
</section>
{% endunless %}
{% assign current_month = month_key %}
{% assign m = e.start | date: "%-m" | minus: 1 %}
<section class="month">
<h2>{{ month_names[m] }} {{ e.start | date: "%Y" }}</h2>
<ul class="events">
{% endif %}
{% assign last_day = e.end | default: e.start %}
{% assign d1 = e.start | date: "%-d" %}
{% assign m1 = e.start | date: "%-m" | minus: 1 %}
{% assign d2 = last_day | date: "%-d" %}
{% assign m2 = last_day | date: "%-m" | minus: 1 %}
{% assign wd = e.start | date: "%u" | minus: 1 %}
<li class="event" data-start="{{ e.start | date: '%Y-%m-%d' }}" data-end="{{ last_day | date: '%Y-%m-%d' }}">
<div class="event-date">
<time datetime="{{ e.start | date: '%Y-%m-%d' }}">{% if e.end == nil or e.end == e.start %}{{ d1 }} {{ month_short[m1] }}{% elsif m1 == m2 %}{{ d1 }}–{{ d2 }} {{ month_short[m1] }}{% else %}{{ d1 }} {{ month_short[m1] }}–{{ d2 }} {{ month_short[m2] }}{% endif %}</time>
{% if e.end == nil or e.end == e.start %}<span class="small">{{ weekdays[wd] }}</span>{% endif %}
</div>
<div class="event-body">
<a class="event-title" href="{{ e.url }}">{{ e.title | escape }}</a>{% if e.saip %}<span class="mark" title="Ordnas av SAIP">SAIP</span>{% endif %}
<span class="small">{{ e.time }} · {{ e.place }}{% if e.venue %}, {{ e.venue | escape }}{% endif %}</span>
<span class="small">{{ e.organiser | escape }}</span>
{% if e.cost or e.deadline %}{% assign dd = e.deadline | date: "%-d" %}{% assign dm = e.deadline | date: "%-m" | minus: 1 %}<span class="small">{% if e.cost %}{{ e.cost | escape }}{% endif %}{% if e.cost and e.deadline %} · {% endif %}{% if e.deadline %}Anmälan senast {{ dd }} {{ month_short[dm] }}{% endif %}</span>
{% endif %}{% if e.note %}<span class="small">{{ e.note | escape }}</span>{% endif %}
</div>
</li>
{% if forloop.last %}</ul>
</section>
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
  function render() {
    for (i = 0; i < past.length; i++) { past[i].hidden = !showPast; }
    for (i = 0; i < months.length; i++) {
      months[i].hidden = months[i].querySelectorAll("li.event:not([hidden])").length === 0;
    }
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
