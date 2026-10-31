# Bichom website

A village notebook for Bichom, a Bugun place in West Kameng, Arunachal Pradesh.
Photo first, short words, one job per page, and simple enough that a young
person in Bichom can keep it alive.

**Live at:** https://vikrantcharak.github.io/bugun-/
**See what is missing:** https://vikrantcharak.github.io/bugun-/#setup

| File / folder | What it is | Do you edit it? |
|---|---|---|
| `settings.js` | WhatsApp number, which pages are open, and every fact only the hosts can give | **Yes, this is the one** |
| `places.js` | Points on the map | When you add map points |
| `photos/` | The photos. Names are in `photos/README.txt` | **Yes** |
| `audio/` | "Say the name" recordings. See `audio/README.txt` | Optional |
| `videos/` | Short clips of the river and the nets. See `videos/README.txt` | Optional |
| `index.html`, `bird.html` … | The pages and their words | Only to change words |
| `assets/`, `fonts/` | The look and the shared script | No |

## The pages

| Page | File | Its one job | Open? |
|---|---|---|---|
| Home | `index.html` | Where we are, and what to do here | Yes |
| The bird | `bird.html` | The Bugun liocichla, and how to meet it without harming it | Yes |
| The Lichini walk | `lichini.html` | Bichom to Lichini on foot | Yes |
| The river | `river.html` | The fishing road, the nets and the boat | Yes |
| Sunrise and sunset | `sun.html` | Where to stand and when, month by month | Built, waiting |
| Bamboo and food | `bamboo-food.html` | The craft, cooking in bamboo, who to ask | Built, waiting |
| Nettle cloth | `nettle.html` | How the nettle becomes thread | Yes |
| Our story | `story.html` | Who the Bugun are, in the elders' words | Built, waits for the elders |
| Stay and visit | `visit.html` | When, how to reach us, permits, rules, contact | Yes |
| Map | `map.html` | Numbered places, with the list underneath | Opens when `places.js` has a place |

The menu shows the first five open pages; the rest sit under **More**.
To open a waiting page, change `false` to `true` under `pages` in `settings.js`.

## How the [brackets] work

The words on each page are the community's. Some sentences need a fact only
the hosts can give: the number of footbridges, the boatman's name, the price.
Those facts live in `settings.js`.

- While a fact is empty (`""`), the sentence that needs it **stays hidden**
  from visitors. Nothing half-written ever shows.
- Open any page with `#setup` at the end to see it as the keeper: the missing
  facts show in yellow, and a box lists what to fill in. Visitors never see
  this view. "Leave preview" turns it off.
- The boat stays off the river page until its trip, boatman, price and
  life-jacket answer are **all** filled in. Until then the page says "Ask us".

## Everyday changes

**WhatsApp number, facts, opening a page:** open `settings.js` → pencil icon →
change the words between the quotes → **Commit changes**. Live in a minute or two.

**A photo:** upload it into `photos/` with the same name as the one it replaces
(see `photos/README.txt`), keeping it near 1600 px wide and 200 KB
(https://squoosh.app is free).

**Words on a page:** open the page file, find the sentence, change it, commit.
Then read the page aloud to the community again.

## Publish it (GitHub Pages)

1. Open **https://github.com/Vikrantcharak/bugun-** → **Settings** → **Pages**.
2. Source **Deploy from a branch**, Branch **main**, folder **/ (root)**, **Save**.
3. After 1–2 minutes it says the site is live.

## Rules the site keeps

- **Birds:** guides only, no recorded calls, no nest or roost positions anywhere,
  including the map.
- **Nettle:** never say where it grows, never invite visitors to pick it.
- **People:** no photo, name or phone number without a yes. A child's face
  needs a parent's yes.
- **The story:** only what the teller and the elders agree to. The Gyaptung
  part waits for the elders of Rupa.
- **The map:** no homes, no private farms, nothing a point's owner has not agreed to.
- **Permits:** link to the official pages and say "check before you travel".
  Never copy a fee or a rule as if it were ours.
- **Names:** the Dakshina Dvaraka Foundation and Dr Sushruti Santhanam appear
  in the footer (`credits` in `settings.js`) only if they say yes.
- **Words:** every page is read aloud to the community before launch.

Version 1 takes bookings by WhatsApp only. No online payment, no adverts, no
visitor tracking: the fonts are stored on the site, and there is no Google
Maps or YouTube embed (places open in Google Maps only when a visitor taps).

## What only the hosts can supply

Tick these off as the answers arrive. Each one has a place in `settings.js`.

- [ ] The name and spelling of Bichom and every place, in Bugun and in English
- [ ] Where bird days begin, and how far that is from Bichom → `bird.meet`
- [ ] Guides: names, numbers, and their yes to being named → `bird.guides`
- [ ] The latest count from the patrol team → `bird.count`
- [ ] The Lichini walk: start point, time each way (walked with a watch), footbridges, what you pass, who you meet → `lichini`
- [ ] The fishing road and nets: where, when, what is caught, closed season, rules for visitors → `river`
- [ ] The boat: where, how long, price, boatman, life jackets → `river.boat`
- [ ] The sunrise and sunset spots, and when the sun clears the ridges → `sun`
- [ ] Bamboo families who agree to be named, and what they make → `bamboo`
- [ ] Three to five dishes with their Bugun names, which are cooked in bamboo, vegetarian options → `bamboo.dishes`
- [ ] The nettle page: the Bugun name, the makers' words, and what may be public → `nettle`
- [ ] The stay: homestay name, rooms, beds, bathroom, price or "ask" → `homestay`
- [ ] How to reach: nearest town, the road, the last stretch, where the vehicle stops → `visit.reach`
- [ ] The WhatsApp number and the name of the person who answers → `whatsapp`, `contactName`
- [ ] The official e-ILP link, checked by a person → `permitLink`
- [ ] The number of Bugun the community uses today → `people`
- [ ] A keeper's name, and the community body that will own the domain
- [ ] A yes from every person shown in a photo
- [ ] The 56 points from the KML, each with its owner's yes → `places.js`

## Owning it

Ownership is the gift. Register the domain and the hosting account in the name
of a community body, such as the reserve committee or the village council.
Give two people the passwords. Name one young Bugun person as the keeper.
Review the phone number, prices, boat, permit link and house rules twice a year.

## Sources

- [Mongabay, 2018](https://news.mongabay.com/2018/12/from-a-new-bird-to-a-new-community-reserve-indias-tribe-sets-example/): the 1995 and 2006 dates, the 2017 reserve and its 17 km², the patrollers, about 1,500 Bugun, Singchung as the main village.
- [Dialogue Earth](https://dialogue.earth/en/nature/bugun-liocichla-birders-paradise/): the other birds, the October to May guiding season, the playback worry.
- [Arunachal Pradesh Police: Inner Line Permit](https://arunpol.nic.in/ilp.html): who needs an ILP or a Protected Area Permit.
- *Revival of Memory*, field record of Bugun fibre work at Bichom (2026): the nettle steps, plates and photographs.

The 14 km between Bichom and the bird's forest is a straight-line distance; the road is longer.

Fonts: Source Serif 4 and Source Sans 3 (Adobe), SIL Open Font License, see `fonts/OFL.txt`.
