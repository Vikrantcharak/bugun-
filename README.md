# Bichom website

A village notebook for Bichom, a Bugun place in West Kameng, Arunachal Pradesh.
Photo first, short words, one job per page, and simple enough that a young
person in Bichom can keep it alive.

**Live at:** https://vikrantcharak.github.io/bugun-/
**See what is missing:** https://vikrantcharak.github.io/bugun-/#setup

| File / folder | What it is | Do you edit it? |
|---|---|---|
| `settings.js` | WhatsApp number, which parts are open, and every fact only the hosts can give | **Yes, this is the one** |
| `index.html` | The whole site: one long page, and the words of every part | Only to change words |
| `places.js` | Points on the map | When you add map points |
| `photos/` | The photos. Names are in `photos/README.txt` | **Yes** |
| `art/` | Drawings used until real photos exist (the bird, rhododendrons, fruit, sunrise) | Replace with photos later |
| `audio/` | "Say the name" recordings. See `audio/README.txt` | Optional |
| `videos/` | Short clips of the river and the nets. See `videos/README.txt` | Optional |
| `assets/`, `fonts/`, `404.html` | The look, the shared script, old page addresses | No |

## One long page

The site is one page that you scroll. Each part has its own picture, which
stays behind the words while you read; scroll on and the next part's picture
slides up over it. Every part ends with a "Next" link, and the menu jumps
straight to any part.

| # | Part | Menu | Its one job |
|---|---|---|---|
| 1 | Home | the name "Bichom" | Where we are, and what to do here |
| 2 | The Bugun bird | Birds | The Bugun liocichla, and how we keep it |
| 3 | Bird watching | Birds | How a bird day works: where, when, rules, the other birds |
| 4 | The Lichini walk | Walks | Bichom to Lichini on foot |
| 5 | The rhododendron walk | Walks | The spring walk, and the juice |
| 6 | The cave | Walks | The cave near Bichom, and how to visit it safely |
| 7 | The river | The river | The fishing road, the nets and the boat |
| 8 | Sunrise and sunset | Walks | Where to stand and when, month by month |
| 9 | Bamboo | Made here | The craft, and cooking in bamboo |
| 10 | Fruit, food and juice | Made here | What grows here and what we eat |
| 11 | Nettle cloth | Made here | How the nettle becomes thread |
| 12 | Our story | More | Who the Bugun are, in the elders' words |
| 13 | Stay and visit | Visit | When, how to reach us, permits, rules, contact |
| | Map | More | Appears when `places.js` has a place |

All thirteen parts are open. To hold one back, change it to `false` under
`pages` in `settings.js`. The plan suggests holding the cave until someone has
checked it for safety and the community agrees, the juice until the food
registration is settled, and Our story until the elders have read it.

The old page addresses (`bird.html`, `cave.html` …) still work: they open
the same part of the long page.

## How the [brackets] work

The words on each part are the community's. Some sentences need a fact only
the hosts can give: the number of footbridges, the boatman's name, the price.
Those facts live in `settings.js`.

- While a fact is empty (`""`), the sentence that needs it **stays hidden**
  from visitors. Nothing half-written ever shows.
- Open the page with `#setup` at the end to see it as the keeper: the missing
  facts show in yellow, and a box lists what to fill in. Visitors never see
  this view. "Leave preview" turns it off.
- The boat stays off the river part until its trip, boatman, price and
  life-jacket answer are **all** filled in. Until then it says "Ask us".

## Everyday changes

**WhatsApp number, facts, opening a page:** open `settings.js` → pencil icon →
change the words between the quotes → **Commit changes**. Live in a minute or two.

**A photo:** upload it into `photos/` with the same name as the one it replaces
(see `photos/README.txt`), keeping it near 1600 px wide and 200 KB
(https://squoosh.app is free). To swap a drawing for a photo, change the
file name in `index.html` (for example `art/liocichla.svg` → `photos/liocichla.jpg`).

**Words:** open `index.html`, find the sentence, change it, commit.
Then read that part aloud to the community again.

## Publish it (GitHub Pages)

1. Open **https://github.com/Vikrantcharak/bugun-** → **Settings** → **Pages**.
2. Source **Deploy from a branch**, Branch **main**, folder **/ (root)**, **Save**.
3. After 1–2 minutes it says the site is live.

## Rules the site keeps

- **Birds:** guides only, no recorded calls, no drones, no nest or roost positions
  anywhere, including the map.
- **Nettle:** never say where it grows, never invite visitors to pick it.
- **The cave:** a guide goes in with every visitor. No exact path and no map pin
  until the community says yes.
- **Flowers and juice:** visitors never pick or taste wild flowers on their own,
  and no recipe is printed. Selling juice or packed food needs a food-business
  registration (FSSAI).
- **The word "organic":** only where the farm holds the certificate.
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
- [ ] Where bird days begin, how far that is from Bichom, and how you get there → `birding.start`
- [ ] How a bird day goes: when you leave, how long you walk, where you wait → `birding.how`
- [ ] Guides: names, numbers, and their yes to being named → `birding.guides`
- [ ] The reserve entry fee today, and whether you can lend binoculars → `birding.fee`, `birding.binoculars`
- [ ] The birds around Bichom, from the guides' own sightings → `birding.aroundBichom`
- [ ] The latest count from the patrol team → `bird.count`
- [ ] The Lichini walk: start point, time each way (walked with a watch), footbridges, what you pass, who you meet → `lichini`
- [ ] The rhododendron walk: the trail, the bloom weeks, and the flower the families use for juice → `rhododendron`
- [ ] The cave: its Bugun name, its story, how to reach it, who may go in, and a safety check → `cave`
- [ ] The fishing road and nets: where, when, what is caught, closed season, rules for visitors → `river`
- [ ] The boat: where, how long, price, boatman, life jackets → `river.boat`
- [ ] The sunrise and sunset spots, and when the sun clears the ridges → `sun`
- [ ] Bamboo families who agree to be named, what they make, what is cooked in bamboo, where it is cut → `bamboo`
- [ ] Fruit: what grows, in which months, who sells it, and which juices are made → `fruit`
- [ ] Three to five dishes with their Bugun names, which are cooked in bamboo, vegetarian options → `food`
- [ ] Food registration (FSSAI) for juice or packed food, and whether the homestay is registered under the state scheme
- [ ] The nettle part: the Bugun name, the makers' words, and what may be public → `nettle`
- [ ] How Bichom keeps Pham Kho Sowai → `visit.festival`
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

The sources the page uses are listed at the bottom of the page itself. The plan
also read: [Wikipedia: Bichom district](https://en.wikipedia.org/wiki/Bichom_district)
(the district created in March 2024, so the page says "Bichom village,
Singchung sub-division"), [India Hikes](https://indiahikes.com/a-guide-to-rhododendrons)
(the warning about pink and white flowers), [FSSAI](https://fssai.gov.in/faqs/?p=3009)
(organic needs NPOP or PGS-India certification), and *Revival of Memory*, the
field record of Bugun fibre work at Bichom (2026), for the nettle steps.

The 14 km between Bichom and the bird's forest is a straight-line distance; the road is longer.

Fonts: Source Serif 4 and Source Sans 3 (Adobe), SIL Open Font License, see `fonts/OFL.txt`.
