---
layout: saip
title: Vill du veta mer om AI i din verksamhet?
description: Lämna namn och e-post så bjuder SAIP in dig till seminarier och träffar om mjukvara och AI i Jämtlands län.
permalink: /saip/villvetamer/
# Länk till anmälningsformuläret i Microsoft Forms (Mittuniversitetets miljö).
# Tom form_url gör att knappen i stället öppnar ett mejl till Felix.
form_url: "https://forms.cloud.microsoft/e/wDK96bY4Lz"
# Valfria förifyllda länkar per utdelningstillfälle. Nyckeln är värdet på ?k= i QR-koden.
form_urls:
  lantbruk: ""
  turistdagen: ""
  techveckan: ""
---

# Vill du veta mer om AI i din verksamhet?

<p>Vi är en forskningsmiljö vid Mittuniversitetet som har arbetat med organisatorisk AI-transformation i drygt två år, tillsammans med stora organisationer.</p>

<p>Nu driver vi SAIP, ett projekt som ska hjälpa företag och offentliga verksamheter i Jämtlands län att använda mjukvara och AI i praktiken. Projektet pågår 2026 till 2029.</p>

<p>Vi vill höra vad ni faktiskt behöver. Under projektet ordnar vi seminarier, workshops, träffar och öppna möten för att lyssna på intressen och behov inom ramen för projektets.</p>

<p>Låter det intressant? Hör av dig till oss så håller vi dig uppdaterat.</p>

{% assign form_href = page.form_url %}{% if form_href == "" %}{% assign form_href = "mailto:felix.dobslaw@miun.se?subject=SAIP%20%E2%80%93%20jag%20vill%20veta%20mer" %}{% endif %}
<div markdown="0">
<a id="form-link" class="cta" href="{{ form_href }}" {% for pair in page.form_urls %}{% if pair[1] != "" %}data-k-{{ pair[0] }}="{{ pair[1] }}" {% endif %}{% endfor %}>Intressforfrågan</a>
<script>
(function () {
  var k = new URLSearchParams(location.search).get("k");
  var a = document.getElementById("form-link");
  if (!k) { return; }
  if (!a) { return; }
  var url = a.dataset["k" + k.charAt(0).toUpperCase() + k.slice(1)];
  if (url) { a.href = url; }
})();
</script>
</div>

<details>
  <summary>Så hanterar vi dina personuppgifter</summary>
  <p>Mittuniversitetet är personuppgiftsansvarig. Vi använder ditt namn, din e-postadress och din organisation för att skicka information och inbjudningar från projektet SAIP. Du kan när som helst be oss ta bort dig från listan genom att mejla <a href="mailto:felix.dobslaw@miun.se">felix.dobslaw@miun.se</a>. Uppgifterna sparas som längst till projektets slut den 30 juni 2029.</p>
  <p>Mittuniversitetet är en myndighet, vilket betyder att det du skickar in blir en allmän handling. Projektets finansiärer, Svenska ESF-rådet och Region Jämtland Härjedalen, kan få ta del av uppgifterna när de följer upp projektet. Läs mer på <a href="https://www.miun.se/kontakt/personuppgifter">www.miun.se/kontakt/personuppgifter</a>. Dataskyddsombudet nås på <a href="mailto:dataskyddsombud@miun.se">dataskyddsombud@miun.se</a>.</p>
</details>

<p class="small">Vill du läsa mer om projektet? <a href="{{ '/saip/' | relative_url }}">Om SAIP</a>. Du kan också mejla Felix Dobslaw, projektledare, på <a href="mailto:felix.dobslaw@miun.se">felix.dobslaw@miun.se</a>.</p>
