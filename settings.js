/* ═══════════════════════════════════════════════════════════════════
   BICHOM — SETTINGS

   This is the file for everyday changes: the WhatsApp number, which
   parts of the page are open, and every fact that only the hosts can give.

   How to edit:
     • Change only the words between the double quotes  "  "
     • Keep the quotes, and keep the comma at the end of each line
     • Save, wait a minute, refresh the website, and check it

   Empty ("") means "we don't know yet". A sentence that needs an empty
   fact stays hidden from visitors until you fill it in.

   To see what is still missing, open the page with  #setup  at the end:
       https://vikrantcharak.github.io/bugun-/#setup
   Missing facts show in yellow. Visitors never see that view.

   Rules the site keeps (please keep them too):
     • No photo, name or phone number without that person's yes.
       A child's face needs a parent's yes.
     • No nest or roost places for the birds, anywhere. No drones.
     • Never say where the nettle grows.
     • The cave: a guide goes in with every visitor; no exact path.
     • Flowers and juice: visitors never pick or taste wild flowers on
       their own; no recipe is printed. Selling juice or packed food
       needs a food-business registration (FSSAI).
     • The word "organic" only where the farm holds the certificate.
     • Every part is read aloud to the community before it goes live.
   ═══════════════════════════════════════════════════════════════════ */

window.SITE = {

  village: "Bichom",

  /* ── WHICH PARTS ARE OPEN ───────────────────────────────────────
     true = visitors see it,  false = hidden.
     The plan suggests holding some parts back at first: the cave until
     someone has checked it for safety and the community agrees, the
     juice until the food registration is settled, Our story until the
     elders have read it. Change a part to false to hold it back.        */
  pages: {
    bird:         true,
    birding:      true,
    lichini:      true,
    rhododendron: true,
    cave:         true,
    river:        true,
    sun:          true,
    bamboo:       true,
    fruit:        true,
    nettle:       true,
    story:        true,
    visit:        true,
  },

  // A Hindi version comes after the English is approved and a Hindi
  // reader has checked it. Put it in a folder called "hi", then change
  // this to true to show the हिन्दी switch at the top.
  hindi: false,


  /* ── WHATSAPP ───────────────────────────────────────────────────
     Country code + number, digits only. No +, no spaces.
     Example: an Indian mobile 98765 43210  →  "919876543210"            */
  whatsapp:    "918729948632",
  phoneShown:  "+91 87299 48632",   // how the number is written on the page
  contactName: "",   // the person who answers


  /* ── HOW MANY BUGUN ─────────────────────────────────────────────
     "about 1,500" is from 2018 reporting. The 2026 field record counts
     2,075 people in twelve villages (2022). Ask the community which
     number they use today, and write it here.                           */
  people: "about 1,500",


  /* ── THE BUGUN BIRD ───────────────────────────────────────────── */
  bird: {
    count: "",   // the latest count from the patrol team, e.g. "(number) birds, in (year)"
  },


  /* ── BIRD WATCHING ────────────────────────────────────────────── */
  birding: {
    start:        "",   // where bird days begin, how far from Bichom, how you get there
    how:          "",   // when you leave, how long you walk, where you wait
    aroundBichom: "",   // the birds around Bichom, from the guides' own sightings
    fee:          "",   // reserve entry fee today, e.g. "₹(amount) a person"
    binoculars:   "",   // "we can lend a pair" — or leave empty if you can't
    guides:       "",   // guides' names, only with their yes
  },


  /* ── THE LICHINI WALK ─────────────────────────────────────────── */
  lichini: {
    start:       "",   // e.g. "the Bichom view point"
    footbridges: "",   // how many, e.g. "three"
    time:        "",   // only after someone has walked it with a watch, e.g. "about three hours"
    effort:      "",   // "easy", "steady" or "steep"
    onTheWay: [        // three things you pass, in order, one sentence each
      "",
      "",
      "",
    ],
    inLichini:   "",   // who you meet and what happens, e.g. "you will have tea with (who)"
    signal:      "",   // e.g. "The phone signal stops at the second footbridge."
  },


  /* ── THE RHODODENDRON WALK ────────────────────────────────────── */
  rhododendron: {
    place:     "",   // the hills above (place)
    trail:     "",   // where it starts, how long it takes, how steep, one or two sentences
    weeks:     "",   // the weeks at Bichom, e.g. "the last two weeks of March"
    bugunName: "",   // the Bugun name of the flower used for juice (name it with the makers first)
    tasteAt:   "",   // where visitors can taste the juice
    more:      "",   // what else you meet on the walk: other flowers, birds, the view
  },


  /* ── THE CAVE ─────────────────────────────────────────────────── */
  // Leave it off the map and give no exact path until the community says yes.
  cave: {
    name:   "",   // its Bugun name, and what it means to us, one sentence
    reach:  "",   // how you reach it: from where, how long, how steep
    inside: "",   // what you see inside
    group:  "",   // how many people at a time, what to wear, whether you need a torch
    asks:   "",   // anything the community asks of visitors there
  },


  /* ── THE RIVER ────────────────────────────────────────────────── */
  river: {
    from:   "",   // where the fishing road starts
    when:   "",   // "morning" or "evening"
    youCan: "",   // e.g. "watch" or "join them, with a guide"
    catch:  "",   // what is caught, Bugun name and English, and in which season
    rules:  "",   // closed season or rules for visitors, as the community decides them

    // The boat stays off the page until ALL of these are confirmed.
    boat: {
      trip:        "",   // where it goes, how long, how many people
      boatman:     "",   // who runs it, with their yes
      price:       "",   // e.g. "₹(amount) a person"
      lifejackets: "",   // e.g. "yes, for everyone"
    },
  },


  /* ── SUNRISE AND SUNSET ───────────────────────────────────────── */
  sun: {
    morningSpot:   "",   // where to stand in the morning, e.g. "the Bichom view point"
    morningTime:   "",   // when the sun clears the ridge, by season
    morningCoords: "",   // that spot's two map numbers, e.g. "27.31, 92.59" (makes the table exact)
    eveningSpot:   "",
    eveningView:   "",   // what you see from there, one sentence
  },


  /* ── BAMBOO ───────────────────────────────────────────────────── */
  bamboo: {
    make:    "",   // what the families make, e.g. "(thing), (thing) and (thing)"
    youCan:  "",   // "watch", "try" or "buy"
    cooked:  "",   // what is cooked inside a bamboo tube, how, and for which meals or days
    cutting: "",   // where the bamboo is cut, and who may cut it
  },


  /* ── FRUIT, FOOD AND JUICE ────────────────────────────────────── */
  // Don't write "organic" unless the farm holds the certificate.
  fruit: {
    months: "",   // the months for each fruit, and who grows them
    buy:    "",   // whether you can pick with the family, or buy at the roadside or the homestay
    juices: "",   // the juices we make and when (only once the food registration is settled)
  },
  food: {
    vegetarian: "",   // e.g. "We can cook vegetarian food."
    // Three to five dishes. Copy the line between { } for each one.
    // photo: the file name in the photos folder, e.g. "dish-1.jpg"
    dishes: [
      // { bugun: "", english: "", what: "What is in it.", when: "When it is made.", bamboo: true, photo: "" },
    ],
  },


  /* ── NETTLE CLOTH ─────────────────────────────────────────────── */
  nettle: {
    name:        "Hanchaw",   // the Bugun name, as the field record writes it. Confirm with the makers.
    makersWords: "",          // in the makers' own words: who made nettle cloth, who remembers how, who is making it again
    makersName:  "",          // who said it, only with their yes
    forSale:     "",          // e.g. "Thread is sometimes for sale. Ask (who)."
  },


  /* ── OUR STORY ────────────────────────────────────────────────── */
  story: {
    ourName:    "",   // what we call ourselves, as one sentence
    elderWords: "",   // Bichom's story, in an elder's words, as they said it
    elderName:  "",   // only if they agree to be named
  },


  /* ── STAY AND VISIT ───────────────────────────────────────────── */
  visit: {
    festival:    "",   // how Bichom keeps Pham Kho Sowai, e.g. "and in Bichom we (what)"
    otherMonths: "",   // what the river, the walk and the light are like in the other months
    reach:       "",   // nearest town, the road, how long the last stretch takes, where the vehicle stops
  },

  homestay: {
    name:     "",
    rooms:    "",
    beds:     "",
    bathroom: "",
    included: "",   // e.g. "three meals a day"
    price:    "",   // e.g. "₹(amount) a person a night". Empty shows "Ask us".
  },

  // The official e-ILP portal. Paste the link only after a person has
  // opened it and checked it is the state's own site.
  permitLink: "",

  // The middle of Bichom village, by the community hall. Used for
  // "Open in Google Maps" and for the sunrise table.
  mapPlace: "27.311,92.592",

  // Thanks in the footer, only with their yes, e.g.
  // "With the Dakshina Dvaraka Foundation and Dr Sushruti Santhanam."
  credits: "",

};
