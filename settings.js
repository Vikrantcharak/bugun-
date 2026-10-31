/* ═══════════════════════════════════════════════════════════════════
   BICHOM — SETTINGS

   This is the file for everyday changes: the WhatsApp number, which
   pages are open, and every fact that only the hosts can give.

   How to edit:
     • Change only the words between the double quotes  "  "
     • Keep the quotes, and keep the comma at the end of each line
     • Save, wait a minute, refresh the website, and check it

   Empty ("") means "we don't know yet". A sentence that needs an empty
   fact stays hidden from visitors until you fill it in.

   To see what is still missing, open any page with  #setup  at the end:
       https://vikrantcharak.github.io/bugun-/#setup
   Missing facts show in yellow. Visitors never see that view.

   Rules the site keeps (please keep them too):
     • No photo, name or phone number without that person's yes.
       A child's face needs a parent's yes.
     • No nest or roost places for the birds, anywhere.
     • Never say where the nettle grows.
     • Every page is read aloud to the community before it goes live.
   ═══════════════════════════════════════════════════════════════════ */

window.SITE = {

  village: "Bichom",

  /* ── WHICH PAGES ARE OPEN ───────────────────────────────────────
     true = open to visitors,  false = not yet.
     Version 1 opens six pages. The other three are built and waiting:
     open each one when its facts are in and the community has read it. */
  pages: {
    bird:    true,
    lichini: true,
    river:   true,
    nettle:  true,
    visit:   true,
    sun:     false,   // Sunrise and sunset: open when the two spots are known
    bamboo:  false,   // Bamboo and food: open when the families and dishes are known
    story:   false,   // Our story: wait until the elders have read it
    cave:    true,    // The cave
  },

  // A Hindi version comes after the English is approved and a Hindi
  // reader has checked it. Put the Hindi pages in a folder called "hi",
  // then change this to true to show the हिन्दी switch at the top.
  hindi: false,


  /* ── WHATSAPP ───────────────────────────────────────────────────
     Country code + number, digits only. No +, no spaces.
     Example: an Indian mobile 98765 43210  →  "919876543210"            */
  whatsapp:    "91XXXXXXXXXX",
  phoneShown:  "",   // optional: how the number is written, e.g. "+91 98765 43210"
  contactName: "",   // the person who answers, e.g. "Pema"


  /* ── HOW MANY BUGUN ─────────────────────────────────────────────
     "about 1,500" is from 2018 reporting. The 2026 field record counts
     2,075 people in twelve villages (2022). Ask the community which
     number they use today, and write it here.                           */
  people: "about 1,500",


  /* ── THE BIRD (bird.html) ─────────────────────────────────────── */
  bird: {
    meet:   "",   // where the guides meet visitors, and how far that is from Bichom
                  //   e.g. "(place), about (time) by road from Bichom"
    guides: "",   // guides' names, only with their yes, e.g. "(name) and (name)"
    count:  "",   // the latest count from the patrol team, e.g. "(number) birds, in (year)"
  },


  /* ── THE LICHINI WALK (lichini.html) ──────────────────────────── */
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
    inLichini:   "",   // who you meet and what happens, e.g. "you will have tea with (who) and hear (what)"
    signal:      "",   // e.g. "The phone signal stops at the second footbridge."
  },


  /* ── THE RIVER (river.html) ───────────────────────────────────── */
  river: {
    from:   "",   // where the fishing road starts, e.g. "(place)"
    when:   "",   // "morning" or "evening"
    youCan: "",   // e.g. "watch" or "join them, with a guide"
    catch:  "",   // what is caught, Bugun name and English, and in which season
    rules:  "",   // closed season or rules for visitors, as the community decides them

    // The boat stays off the page until ALL of these are confirmed.
    boat: {
      trip:        "",   // where it goes, how long, how many people, e.g. "The boat goes ... It takes ... and carries ... people."
      boatman:     "",   // who runs it, with their yes
      price:       "",   // e.g. "₹(amount) a person"
      lifejackets: "",   // e.g. "yes, for everyone"
    },
  },


  /* ── THE CAVE (cave.html) ─────────────────────────────────────── */
  // If the cave is sacred, or its place should stay private, say only
  // what the community agrees to, and never put it on the map.
  cave: {
    name:     "",   // its name, Bugun first, then English
    where:    "",   // where it is and how far from Bichom, e.g. "(place), about (time) on foot from Bichom"
    getThere: "",   // on foot or by road, how long, how steep, one or two sentences
    inside:   "",   // what you see inside, one or two sentences
    story:    "",   // its story, only if the community wants to share it
  },


  /* ── SUNRISE AND SUNSET (sun.html) ────────────────────────────── */
  sun: {
    morningSpot:   "",   // where to stand in the morning, e.g. "the Bichom view point"
    morningTime:   "",   // when the sun clears the ridge, by season, e.g. "(time) in May, (time) in December"
    morningCoords: "",   // that spot's map numbers, two numbers like "27.31, 92.59" from Google Maps (makes the table exact)
    eveningSpot:   "",
    eveningView:   "",   // what you see from there, one sentence
  },


  /* ── BAMBOO AND FOOD (bamboo-food.html) ───────────────────────── */
  bamboo: {
    make:       "",   // what the families make, e.g. "(thing), (thing) and (thing)"
    youCan:     "",   // "watch", "try" or "buy", e.g. "watch, and buy a basket"
    vegetarian: "",   // e.g. "We can cook vegetarian food."
    // Three to five dishes. Copy the lines between { } for each one.
    // photo: the file name in the photos folder, e.g. "dish-1.jpg"
    dishes: [
      // { bugun: "", english: "", what: "What is in it.", when: "When it is made.", bamboo: true, photo: "" },
    ],
  },


  /* ── NETTLE CLOTH (nettle.html) ───────────────────────────────── */
  nettle: {
    name:        "Hanchaw",   // the Bugun name, as the field record writes it. Confirm with the makers.
    makersWords: "",          // in the makers' own words: who made nettle cloth, who remembers how, who is making it again
    makersName:  "",          // who said it, only with their yes
    forSale:     "",          // e.g. "Thread is sometimes for sale. Ask (who)."
  },


  /* ── OUR STORY (story.html) ───────────────────────────────────── */
  story: {
    ourName:    "",   // what we call ourselves, as one sentence
    elderWords: "",   // Bichom's story, in an elder's words, as they said it
    elderName:  "",   // only if they agree to be named
  },


  /* ── STAY AND VISIT (visit.html) ──────────────────────────────── */
  visit: {
    otherMonths: "",   // what the river, the walk and the light are like in the other months
    reach:       "",   // nearest town, the road, how long the last stretch takes, where the vehicle stops
  },

  homestay: {
    name:     "",   // the homestay's name
    rooms:    "",
    beds:     "",
    bathroom: "",
    included: "",   // e.g. "three meals a day"
    price:    "",   // e.g. "₹(amount) a person a night". Empty shows "Ask us".
  },

  // The official e-ILP portal. Paste the link only after a person has
  // opened it and checked it is the state's own site.
  // (The old site linked to https://eilp.arunachal.gov.in — check it first.)
  permitLink: "",

  // The middle of Bichom village, by the community hall. Used for
  // "Open in Google Maps" and for the sunrise table.
  mapPlace: "27.311,92.592",

  // Thanks in the footer, only with their yes, e.g.
  // "With the Dakshina Dvaraka Foundation and Dr Sushruti Santhanam."
  credits: "",

};
