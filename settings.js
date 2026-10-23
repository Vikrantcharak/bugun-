/* ═══════════════════════════════════════════════════════════════════
   BUGUN HOMESTAY — SETTINGS

   This is the only file you need to change for everyday updates.

   How to edit:
     • Change only the words between the double quotes  "  "
     • Keep the quotes, and keep the comma at the end of each line
     • Save, refresh the website, and check it looks right

   If you leave something empty ("") the page keeps its default text,
   or hides that line.
   ═══════════════════════════════════════════════════════════════════ */

window.SITE = {

  /* ── NAME AND PLACE ──────────────────────────────────────────── */

  name:    "Bugun Homestay",   // the name of your homestay
  village: "Bichom",           // your village

  address: "Bichom village, Singchung circle, West Kameng, Arunachal Pradesh",


  /* ── CONTACT ─────────────────────────────────────────────────── */

  // WhatsApp number: country code + number, digits only. No +, no spaces.
  // Example: an Indian mobile 98765 43210  →  "919876543210"
  whatsapp:   "91XXXXXXXXXX",
  phone:      "91XXXXXXXXXX",      // number to call, usually the same
  phoneShown: "+91 XXXXX XXXXX",   // how the number is written on the page
  email:      "yourname@example.com",


  /* ── MAP ─────────────────────────────────────────────────────── */

  // Best: open Google Maps on your phone at the homestay, press and hold
  // on the house to drop a pin, and copy the two numbers it shows, e.g.
  // "27.1234, 92.5678". Paste them here. Until then the map shows the village.
  mapPin:   "",
  mapPlace: "27.311,92.592",   // the middle of Bichom village, by the community hall


  /* ── THE HOMESTAY ────────────────────────────────────────────── */

  homestay: {
    rooms:    "Ask us",
    sleeps:   "Ask us",
    meals:    "Ask us",
    includes: "Ask us",
  },

  rates: {
    stay: "On request",   // e.g. "₹2,000 per person per night, meals included"
    note: "",             // optional line, e.g. "Guide for the Lichini hike: ₹800 a day"
  },

  // Drive time from the plains, shown in "Getting here", e.g.
  // "About 4 hours from Tezpur, the last 30 minutes on a village road."
  driveTime: "",


  /* ── YOUR OWN WORDS ──────────────────────────────────────────── */
  // Each of these adds a line in your own words to that part of the page.
  // Leave "" and only the general text is shown.

  host: {
    note:  "",   // a short welcome from you
    names: "",   // how you sign it, e.g. "Pema and family"
  },

  stories: {
    bridge:  "",   // the old wooden bridge: who built it, when, its story
    river:   "",   // the river: where to sit, where to swim (if safe)
    fishing: "",   // which stream, nets or rods, what you catch
    lichini: "",   // the hike: how long, how steep, what is at the top
    bamboo:  "",   // what your family makes from bamboo
    food:    "",   // the dishes you cook, the rice beer
    sunrise: "",   // the best place to watch the sun come up
    sunset:  "",   // the best place to watch it go down
  },


  /* ── VIDEOS ──────────────────────────────────────────────────── */
  // Paste a YouTube link for any of these (unlisted videos work).
  // A "Watch" button then appears on that part of the page.
  // "tour" is the main video, shown at the top.

  videos: {
    tour:    "",
    bridge:  "",
    river:   "",
    fishing: "",
    lichini: "",
    bamboo:  "",
    food:    "",
    sunrise: "",
    sunset:  "",
    birds:   "",
  },


  /* ── GUEST REVIEWS ───────────────────────────────────────────── */
  // Only real reviews, copied word for word, with the guest's permission.
  // Copy the example line, remove the // at the start, and fill it in.

  reviews: [
    // { text: "What the guest wrote.", name: "First name", from: "City", when: "March 2027", stars: 5 },
  ],
  reviewsLink: "",

};
