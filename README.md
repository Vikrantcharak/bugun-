# Bugun Homestay website

A homestay in Bichom, a Bugun village in West Kameng, Arunachal Pradesh.

| File / folder | What it is | Do you edit it? |
|---|---|---|
| `settings.js` | Name, phone, email, map pin, rates, your own stories, YouTube links | **Yes, this is the one** |
| `photos/` | Your photos. Names are in `photos/README.txt` | **Yes** |
| `videos/` | `hero.mp4`, the moving picture at the top. See `videos/README.txt` | Optional |
| `index.html` | The website itself | Only for text changes |

---

## Publish it online for free (GitHub Pages)

1. Open **https://github.com/Vikrantcharak/bugun-** and sign in.
2. Click **Settings** (on a phone, switch the browser to "Desktop site" if you can't see it).
3. In the left menu, click **Pages**.
4. Under **Build and deployment**: Source **Deploy from a branch**, Branch **main**, folder **/ (root)**, then **Save**.
5. After 1–2 minutes it says **"Your site is live at https://vikrantcharak.github.io/bugun-/"**.

Every change you save on GitHub after that goes live within a minute or two.

## Everyday changes

**Phone, email, rates, map pin, your stories, YouTube links:**
open `settings.js` → pencil icon → change the text between the quotes → **Commit changes**.

**Photos:** open the `photos` folder → **Add file → Upload files** → **Commit changes**.

**The map pin:** in Google Maps on your phone, stand at the homestay (or find it),
press and hold to drop a pin, copy the two numbers (like `27.1234, 92.5678`)
into `mapPin` in `settings.js`.

**Check what's missing:** open the site with `#setup` at the end, e.g.
`https://vikrantcharak.github.io/bugun-/#setup`. A yellow checklist lists what
is still a placeholder. Visitors never see it.

## What the website says, and where it comes from

History, birds, permits and fishing rules come from published sources
(listed at the bottom of the History section). Anything only you know —
the bridge's story, the Lichini hike, your dishes, the best sunrise spot —
goes in `settings.js` under `stories`, in your own words.

Please don't publish exact GPS points for fishing spots, plant stands or
sacred sites.
