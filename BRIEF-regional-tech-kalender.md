# Brief: regional tech calendar for Jämtland Härjedalen

Written 2026-10-02 for whoever builds this. Commissioned by Felix Dobslaw as part of the SAIP project (ESF+ dnr 25-050-S07, Region Jämtland Härjedalen ärende 20379813). It corresponds to the SAIP board card "Gemensam översiktssida för SE/tech-evenemang i regionen", due 2026-11-13.

## What it is

One page that shows every software, tech and AI event happening in Jämtland Härjedalen, whoever arranges it. A developer in Östersund should be able to open one link and see what is on this month, instead of following five different communities on five different platforms.

The region has several groups running events that do not know about each other's dates: NorthernDevs, NorthernUX, NorthernTechRepublic, BRON Innovation, Samling Näringsliv, Mittuniversitetet, and SAIP's own seminar series. Collisions happen because nobody has the overview. The calendar fixes that and makes SAIP useful to the community before SAIP has delivered anything else.

The page is neutral ground. SAIP builds and hosts it, and every community's events are listed the same way. That matters: it stays useful even if people have no interest in the research project, and it gives SAIP a reason to talk to every organiser in the region.

## Where it lives and what it is built with

Build it inside this repository, `SEE-github-page`, which publishes to https://seegroup.github.io. The site is reached as saip.se for the project pages.

The stack, exactly as it already is:

- Jekyll, through the `github-pages` gem (Jekyll 3.9.x). See `Gemfile`.
- kramdown for markdown, configured in `_config.yml`.
- Plain CSS in `assets/css/style.css`, built on CSS custom properties defined in `:root`. No framework, no preprocessor.
- Vanilla JavaScript in `assets/js/`. Existing examples: `lang.js`, `lightbox.js`, `images.js`. No bundler, no npm.
- Collections and `_data` for content. There is already a `_layouts/saip.html` and a `projects/saip.md`.
- Hosted on GitHub Pages.

Keep all of that. Add no build step and no JavaScript framework. If a feature needs a Jekyll plugin that GitHub Pages does not allow, build the site with a GitHub Actions workflow instead of the default Pages build, and say so in the pull request.

Design tokens already defined in `assets/css/style.css` and to be reused:

```
--miun-blue: #0D76BD;
--miun-yellow: #F1E219;
--miun-turq: #00BFD5;
--bg, --bg-alt, --text, --text-muted, --border, --border-light
--shadow-xs, --shadow-sm, --shadow-md, --shadow-lg
```

Base font size is 18px with a system font stack. Match it.

## Data model

Put events in `_data/events.yml`. One file, easy for a person or an agent to edit, no collection boilerplate, and a Liquid loop reads it directly.

```yaml
- id: northerndevs-2026-10-21
  title: "Meetup: Rust i produktion"
  start: 2026-10-21 18:00
  end: 2026-10-21 20:30
  organiser: northerndevs
  type: meetup
  place: "Teknikdalen, Östersund"
  municipality: ostersund
  online: false
  free: true
  url: https://example.org/event
  description: "Kvällsmeetup om Rust i produktion, med efterföljande mingel."
  language: sv
  source: manual
```

Organisers live in `_data/organisers.yml` with a display name, a colour, a URL and a logo if there is one. That keeps the colour coding in one place and lets a new community be added without touching CSS.

`id` must be stable, because the `.ics` feed uses it as the UID. Changing an id makes a subscriber's calendar show the event twice.

## Pages

`/kalender/` is the calendar itself.

`/kalender.ics` is the full feed, generated at build time, so anyone can subscribe once and have every event appear in their own calendar from then on.

`/kalender/<id>.ics` is a single event, for the "add to my calendar" button.

`/kalender/feed.xml` is an RSS feed of newly added events, through `jekyll-feed`, which GitHub Pages allows.

Keep the Swedish word `kalender` in the URL. The audience is regional and Swedish-speaking, and the site already has a language switcher in `lang.js` for the interface text.

## How it should look

Slick here means fast, obvious and quiet. Someone opens it on a phone on a bus and wants to know what is on this week. No carousel, no hero image, no animation that delays anything.

The top of the page is a single line of what it is, then the subscribe button, then the filters, then the events. Nothing above the fold that is only decoration.

Default view is a vertical list grouped by month, upcoming events first, not a month grid. A grid looks like a calendar and reads badly on a phone, and most weeks have two or three events, so a grid would be mostly empty squares. Offer the grid later as a toggle if anyone asks for it.

Each event is a row with a date chip on the left: the month in small uppercase letters in `--text-muted`, the day number large and bold underneath. To the right sits the title in bold, then a line of time, place and organiser, then one line of description. A 4px left border on the row carries the organiser's colour, which is the only colour coding needed. On hover the row lifts with `--shadow-sm`. The whole row is a link.

Group headings are the month name, sticky at the top as you scroll past them, so you always know where you are in time.

Filters are pill buttons in a single scrollable row: Alla, Denna vecka, Denna månad, then one pill per organiser, then Online and Gratis. They filter the already-rendered list with a little JavaScript, which means it works without a page reload and still shows everything if JavaScript fails. Reflect the active filter in the URL as `?org=northerndevs` so a filtered view can be linked.

Past events collapse under a "Tidigare" heading at the bottom, closed by default, so a quiet month does not look like a broken page.

Empty state, when a filter matches nothing: "Inga event matchar just nu. Tipsa oss gärna om något som saknas." with the submit link.

Dark mode through `@media (prefers-color-scheme: dark)` by redefining the variables in `:root`. With the token setup already in place this is maybe twenty lines.

Maximum width around 820px, matching the rest of the site. Everything readable at 360px wide without zooming or sideways scrolling.

Accessibility matters here because the project has committed to tillgänglighet as a horizontal principle: real `<time>` elements with `datetime` attributes, filter buttons as real buttons with `aria-pressed`, contrast at WCAG AA, and the organiser colour never the only way to tell events apart.

## Letting people know about updates

Ranked by how well they work against how much they cost to run.

The subscribable `.ics` feed is the best answer and should ship first. Someone adds `webcal://saip.se/kalender.ics` to Outlook or Google Calendar once, and from then on every new event appears in their own calendar, with their own reminders. It needs no server, no personal data and no consent, and it makes the reminder someone else's problem. Put it behind a prominent "Prenumerera i din kalender" button with three short instructions, one each for Outlook, Google Calendar and Apple Calendar.

The RSS feed is second, free through `jekyll-feed`, and a small but real part of this audience uses it.

A webhook post to the communities' own chat is third and is probably where most of the reach is. If NorthernDevs or NorthernUX run a Slack or Discord, a GitHub Action that fires on changes to `_data/events.yml` can post new events straight into the channel where those people already are. Store the webhook URL as a repository secret. Ask the organisers before posting anything into their space.

Email is fourth and is the one with the administrative cost. A static site has no server to send mail, so it means either an external service like Buttondown or MailerLite, which raises a question about where the addresses are stored, or sending by hand from Outlook to the list SAIP already collects through its own registration form. For now, reuse the SAIP list and send by hand, perhaps once a month. It is honest and it keeps the personal data inside Mittuniversitetet. See `esf-see-rjh/genomforande/kommunikation/2026-10-02_brief-landningssida-vill-veta-mer.txt` for how that list is collected.

Browser push notifications need a service worker and a push service, and a static site can do it, but the setup is out of proportion to the audience. Skip it unless someone asks twice.

## How events get in

Three routes, in the order they are worth building.

Automatic ingest is the one that makes this survive. Most event platforms publish an `.ics` or a JSON feed for an organiser's page, including Meetup, Eventbrite and lu.ma. A scheduled GitHub Action runs once a day, fetches each configured feed, maps the entries into the same shape as `_data/events.yml`, and opens a pull request when something changed. Put the feed URLs in `_data/sources.yml`. Events that come in this way get `source: <feed name>` so a human edit can be told apart from an imported one and will not be overwritten.

A tip form for everyone else. Non-technical organisers will not open a pull request. Give them a short Microsoft Form inside Mittuniversitetet's environment, matching the decision already taken for the SAIP registration form, and have Felix or the project coordinator paste accepted tips into the YAML. Four fields: what, when, where, link.

A GitHub issue template for the technically inclined, with the fields structured so an Action can turn an accepted issue into a pull request. Cheap to add once the first two work.

## Making the focus easy to change

Put everything that defines the scope in `_data/calendar.yml`: the page title, the one-line description, the region name, the municipalities in the filter, which event types exist, and which organisers are listed. Read those values in the layout rather than writing them into the template.

Changing the calendar from "tech events in Jämtland Härjedalen" to another subject or another region should then be a matter of editing that one file and `_data/organisers.yml`, with no template or CSS changes. Build it so that is true, and write a short section in the README saying so.

## Funder requirements

The page is public project material, so both funders' rules apply.

The EU emblem with the text "Medfinansieras av Europeiska unionen" and Region Jämtland Härjedalen's logotype with the text "Medfinansieras av" must both appear. The region's logotype must be at least as large as any other funder's. Both files are already in this repository: `assets/images/eu-medfinansieras.svg` and `assets/images/region-jamtland-harjedalen.svg`.

Both funders can reduce the payment if the logotype condition is not met, so treat this as a requirement rather than a detail.

## What to build first

A first version that is useful is a list of events read from `_data/events.yml`, grouped by month, with the organiser colours, the full `.ics` feed and the subscribe button. That is worth publishing on its own.

After that, in order: the filter pills, the per-event `.ics` download, the RSS feed, the tip form, the automatic ingest from the first external feed, and the chat webhook.

## Decisions Felix still has to make

Which URL the calendar lives at, saip.se/kalender or somewhere under the research group site, and whether the page carries SAIP branding or stays visually neutral so other communities feel equally at home on it.

Which organisers to invite into it before launch, and whether to ask them first or show them a working page and then ask. My own view is that a working page with their events already in it is a much easier conversation, as long as every listing links back to their own page.

Whether the interface should be bilingual through the existing `lang.js`, or Swedish only to start with.
