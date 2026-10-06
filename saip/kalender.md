---
layout: saip
bild: vinter
title: Kalender
description: Kommande evenemang om mjukvara, AI, digitalisering och teknik i Jämtlands län, och nationella webbinarier om AI, samlade på ett ställe.
permalink: /saip/kalender/
wide: true
---

# Kalender

<p>Här samlar vi kommande evenemang om mjukvara, AI, digitalisering och teknik i Jämtlands län, oavsett vem som ordnar dem. Listan har också nationella webbinarier om AI som du kan följa på nätet. Varje rad länkar till arrangörens egen sida, där du hittar program och anmälan. Saknar du något? <a href="#tipsa">Tipsa oss gärna</a>.</p>

{% assign days = site.data.saip_events | group_by_exp: "e", "e.start | date: '%Y-%m-%d'" | sort: "name" %}
{% assign month_names = "Januari,Februari,Mars,April,Maj,Juni,Juli,Augusti,September,Oktober,November,December" | split: "," %}
{% assign month_short = "jan,feb,mar,apr,maj,jun,jul,aug,sep,okt,nov,dec" | split: "," %}
{% assign weekdays = "Mån,Tis,Ons,Tors,Fre,Lör,Sön" | split: "," %}
<div markdown="0">
<p id="no-upcoming" hidden>Just nu finns inga kommande evenemang i listan.</p>
{% assign current_month = "" %}
{% for day in days %}
{% assign items = day.items | sort: "time" %}
{% assign first = items[0] %}
{% assign month_key = first.start | date: "%Y-%m" %}
{% if month_key != current_month %}
{% unless forloop.first %}</table>
</details>
{% endunless %}
{% assign current_month = month_key %}
{% assign m = first.start | date: "%-m" | minus: 1 %}
<details class="month" open data-month="{{ month_key }}" data-name="{{ month_names[m] | downcase }}">
<summary><h2>{{ month_names[m] }} {{ first.start | date: "%Y" }}</h2><span class="month-count"></span></summary>
<p class="month-past" hidden><button type="button" class="toggle-past" aria-expanded="false"></button></p>
<table class="events">
<thead><tr><th scope="col">Dag</th><th scope="col">Tid</th><th scope="col">Evenemang</th><th scope="col">Plats</th><th scope="col">Arrangör</th><th scope="col">Kostnad och anmälan</th></tr></thead>
{% endif %}
{% assign wd = first.start | date: "%u" | minus: 1 %}
{% assign m1 = first.start | date: "%-m" | minus: 1 %}
{% assign series_names = items | map: "series" | uniq %}
{% assign day_series = nil %}
{% if series_names.size == 1 and first.series %}{% assign day_series = first.series %}{% endif %}
<tbody class="day">
{% for e in items %}
{% assign last_day = e.end | default: e.start %}
<tr class="event" data-end="{{ last_day | date: '%Y-%m-%d' }}" data-time="{{ e.time | escape }}">
{% if forloop.first %}<th scope="rowgroup" class="c-day" rowspan="{{ items.size }}"><time datetime="{{ day.name }}">{{ weekdays[wd] }} {{ first.start | date: "%-d" }} {{ month_short[m1] }}</time><span class="day-in"></span>{% if day_series %}<span class="day-series">{{ day_series | escape }}</span>{% endif %}</th>{% endif %}
<td class="c-time">{{ e.time }}</td>
<td class="c-title"><a href="{{ e.url }}">{{ e.title | escape }}</a>{% if e.saip %}<span class="mark" title="Ordnas av SAIP">SAIP</span>{% endif %}{% if e.end and e.end != e.start %}{% assign d2 = e.end | date: "%-d" %}{% assign m2 = e.end | date: "%-m" | minus: 1 %}<span class="sub">Till och med {{ d2 }} {{ month_short[m2] }}</span>{% endif %}{% if e.series and day_series == nil %}<span class="sub">{{ e.series | escape }}</span>{% endif %}{% if e.note %}<span class="sub">{{ e.note | escape }}</span>{% endif %}</td>
<td class="c-place">{{ e.place }}{% if e.venue %}<span class="sub">{{ e.venue | escape }}</span>{% endif %}</td>
<td class="c-org">{{ e.organiser | escape }}</td>
<td class="c-cost">{% if e.cost %}{{ e.cost | escape }}{% endif %}{% if e.deadline %}{% assign dd = e.deadline | date: "%-d" %}{% assign dm = e.deadline | date: "%-m" | minus: 1 %}<span class="{% if e.cost %}sub{% endif %}">Anmälan senast {{ dd }} {{ month_short[dm] }}</span>{% endif %}</td>
</tr>
{% endfor %}
</tbody>
{% if forloop.last %}</table>
</details>
{% endif %}
{% endfor %}
<script>
(function () {
  var now = new Date();
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var today = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  var months = document.querySelectorAll("details.month");
  var current = null;
  var i;
  var clock = pad(now.getHours()) + ":" + pad(now.getMinutes());
  function each(list, fn) { for (var k = 0; k < list.length; k++) { fn(list[k]); } }
  // Ett evenemang är över när sista dagen har passerat, eller när sluttiden i dag har passerat.
  function isOver(row) {
    var end = row.getAttribute("data-end");
    if (end !== today) { return end < today; }
    var times = (row.getAttribute("data-time") || "").match(/\d{1,2}[:.]\d{2}/g);
    if (!times || times.length < 2) { return false; }
    var last = times[times.length - 1].replace(".", ":");
    if (last.length < 5) { last = "0" + last; }
    return last <= clock;
  }
  function setPastVisible(month, visible) {
    each(month.querySelectorAll("tr.event"), function (row) {
      row.hidden = !visible && row.getAttribute("data-end") < today;
    });
    each(month.querySelectorAll("tbody.day"), function (day) {
      day.hidden = day.querySelectorAll("tr.event:not([hidden])").length === 0;
    });
  }
  each(months, function (month) {
    var rows = month.querySelectorAll("tr.event");
    var gone = 0;
    var over = 0;
    each(rows, function (row) {
      if (row.getAttribute("data-end") < today) { gone++; }
      if (isOver(row)) { over++; row.className += " gone"; }
    });
    each(month.querySelectorAll("tbody.day"), function (day) {
      if (day.querySelectorAll("tr.event:not(.gone)").length === 0) { day.className += " gone"; }
    });
    var coming = rows.length - over;
    var count = month.querySelector(".month-count");
    month.open = false;
    if (gone === rows.length) {
      month.className += " past";
      count.textContent = rows.length + " tidigare";
      return;
    }
    count.textContent = coming + " kommande";
    if (current) { return; }
    current = month;
    month.className += " current";
    if (gone > 0) {
      var button = month.querySelector(".toggle-past");
      var shown = false;
      var label = function () {
        button.textContent = (shown ? "Dölj" : "Visa") + " tidigare i " + month.getAttribute("data-name") + " (" + gone + ")";
        button.setAttribute("aria-expanded", shown ? "true" : "false");
      };
      label();
      setPastVisible(month, false);
      month.querySelector(".month-past").hidden = false;
      button.addEventListener("click", function () {
        shown = !shown;
        setPastVisible(month, shown);
        label();
      });
    }
  });
  var midnight = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  each(document.querySelectorAll("tbody.day"), function (day) {
    var d = day.querySelector("time").getAttribute("datetime").split("-");
    var ahead = Math.round((Date.UTC(+d[0], d[1] - 1, +d[2]) - midnight) / 86400000);
    var text = "";
    if (day.className.indexOf("gone") !== -1) { text = ahead === 0 ? "tidigare i dag" : "har varit"; }
    else if (ahead === 0) { text = "i dag"; }
    else if (ahead === 1) { text = "i morgon"; }
    else if (ahead > 1 && ahead < 14) { text = "om " + ahead + " dagar"; }
    else if (ahead >= 14) { text = "om " + Math.round(ahead / 7) + " veckor"; }
    day.querySelector(".day-in").textContent = text;
  });
  if (current) { current.open = true; } else { document.getElementById("no-upcoming").hidden = false; }
  each(months, function (month) {
    month.addEventListener("toggle", function () {
      if (!month.open) { return; }
      each(months, function (other) { if (other !== month) { other.open = false; } });
    });
  });
})();
</script>
</div>

<div class="box" id="tipsa" markdown="0">
{% capture ics_url %}{{ site.url }}{{ '/saip/kalender.ics' | relative_url }}{% endcapture %}
<p><a href="{{ ics_url | replace_first: 'https://', 'webcal://' | replace_first: 'http://', 'webcal://' }}">Prenumerera i din kalender</a>. Då dyker nya evenemang upp av sig själva i din egen kalender. Fungerar inte länken, så kopiera adressen nedan och lägg till den som internetkalender: i Outlook under "Lägg till kalender" och "Från internet", i Google Kalender under "Andra kalendrar" och "Från webbadress", i Apple Kalender under "Arkiv" och "Ny kalenderprenumeration". Ladda inte ner filen och importera den, för då blir det en kopia som inte uppdateras.</p>
<p><code class="ics-url">{{ ics_url }}</code></p>
<p>Ordnar du något som borde stå här, eller känner du till ett evenemang som saknas? <a href="mailto:felix.dobslaw@miun.se?subject=SAIP%20kalender%20%E2%80%93%20tips%20om%20evenemang">Tipsa om ett evenemang</a>. Skriv vad det är, när och var, och gärna en länk.</p>
</div>

<p class="small">Listan sköts av SAIP och uppdateras löpande. Uppgifterna kommer från arrangörernas egna sidor, så titta alltid där för aktuell tid och anmälan.</p>
