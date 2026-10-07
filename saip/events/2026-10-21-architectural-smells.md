---
layout: saip-event
title: "Topic today: Architectural Smells (not AI)"
lead: "SAIP:s första träff. En eftermiddag om koden under allt det andra: varför den blir svår att ändra, vad man kan mäta, och vad ni själva använder. Föredrag först, sedan pizza och gott om tid att prata."
description: "SAIP:s första träff i Östersund 21 oktober 2026, 16–18. Kort om projektet, ett föredrag på engelska om arkitekturlukter, Code Health och CodeScenes AI-refaktorering av Street Fighter III, sedan pizza och samtal om vad ni mäter i er egen kod."
permalink: /saip/events/2026-10-21-architectural-smells/
bild: host
start: 2026-10-21
time: "16:00–18:00"
place: Östersund
venue: Q-huset, campus Östersund, entré B
address: "Mittuniversitetet. Vi möter upp vid entrén från 15:55."
cost: Gratis, pizza och dryck ingår
language: Föredraget på engelska, samtalet på svenska och engelska
signup: https://forms.cloud.microsoft/e/wDK96bY4Lz  # platshållare: intresseformuläret, byt till träffens egen anmälan
deadline: 2026-10-19
image: /assets/images/saip/events/2026-10-21-architectural-smells.jpg
image_alt: "Krzywy Domek i Sopot, ett hus med böjda väggar och sneda fönster, upplyst i skymningen"
image_credit: "Krzywy Domek, Sopot. Foto från Wikimedia Commons, CC0."
kalender_id: ev-20261021-topic-today-architectural-smells-not-ai
speakers:
  - name: Felix Dobslaw
    role: Docent, projektledare för SAIP
    photo: /assets/images/people/felix-dobslaw.jpg
    url: https://www.miun.se/personal/felixdobslaw/
    bio: "Felix leder forskargruppen SEE vid Mittuniversitetet och forskar om testning och kvalitet i mjukvara, på senare år med fokus på system där AI är en del. Han har arbetat med Volvo Trucks, Getinge och Statens servicecenter. Han är medförfattare till studien som kvällen utgår från."
---

Alla pratar AI. Vi också, det är halva namnet på projektet. Men första träffen handlar om det ni ska leva med i många år: koden, arkitekturen och vad som gör den lätt eller svår att ändra.

Vi vill lika gärna lyssna som prata. Hur håller ni koll på er arkitektur i dag? Använder ni verktyg som SonarQube, CodeScene eller något eget? Vet ni vad era code health-mått egentligen mäter, och litar ni på dem? Ta med era exempel, era frågor och gärna ett system ni är lite skamsna över.

## Program

**16:00 Vad är SAIP?** Tio minuter om projektet, varför Mittuniversitetet gör det, och hur ni kan påverka vad vi gör i höst.

**16:10 Architectural smells, code health, and what any of this has to do with Street Fighter 3.** Föredrag på engelska, cirka 45 minuter med frågor. En arkitekturlukt är ett återkommande mönster i hur ett system hänger ihop, till exempel paket som beror på varandra i en cirkel. Koden fungerar, men varje ändring blir lite dyrare än den borde. I en studie från 2025 följde vi sju sådana lukter genom 378 versioner av åtta öppna projekt. Sedan tar vi steget till i dag: CodeScene lät AI-agenter refaktorera 300 000 rader C-kod, Street Fighter III, med måttet Code Health som enda kvalitetssignal. Vad säger ett sådant mått, och hur långt kan man lita på det?

<img class="event-inline" src="{{ '/assets/images/saip/events/round-1-fight.png' | relative_url }}" alt="Round 1, fight, i arkadstil" width="1200" height="320" />

**17:00 Pizza, dryck och samtal.** Resten av tiden är er, och samtalet har två spår. Det ena är koden: vilka mått och verktyg använder ni, vad säger de er, och vad skulle ni vilja kunna se som ni inte ser i dag? Det andra är vad SAIP kan göra för er. Projektet pågår till 2029 och kan ordna seminarier och workshops kring det ni behöver, komma ut till er och lyssna, koppla ihop er med studenter för examensarbeten och projekt, och med forskare när ni vill prova något på allvar. Felix och kollegor från SEE-gruppen går runt och lyssnar. Berätta vad som skulle hjälpa er, så blir det en del av planeringen för våren. Vi håller på till 18:00.

## Att läsa före eller efter

Rodi Jolak, Simon Karlsson och Felix Dobslaw, *An empirical investigation of the impact of architectural smells on software maintainability*, Journal of Systems and Software, 2025. Öppet tillgänglig: [doi.org/10.1016/j.jss.2025.112382](https://doi.org/10.1016/j.jss.2025.112382).

För den som ändå inte kan hålla sig borta från AI: Adam Tornhill, *Case study: Refactoring at scale with agents*, CodeScene, september 2026. [codescene.com/blog/case-study-refactoring-at-scale-with-agents](https://codescene.com/blog/case-study-refactoring-at-scale-with-agents).
