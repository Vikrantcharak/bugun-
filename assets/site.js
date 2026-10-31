/* ═══════════════════════════════════════════════════════════════════
   BICHOM — the script every page shares

   You don't need to edit this file. Words and facts go in settings.js,
   map points in places.js.

   What it does:
     • draws the menu and the footer, from the list of pages below
     • fills the [brackets] on each page from settings.js, and hides a
       sentence until all of its facts are filled in
     • builds the WhatsApp buttons with a message ready to send
     • adds a "Say the name" button wherever audio/<name>.mp3 exists
     • works out the sunrise and sunset table, and draws the map
     • the keeper's preview: open any page with #setup at the end
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var SITE = window.SITE || {};
var PLACES = (window.PLACES || []).filter(function(p){ return p && isFinite(p.lat) && isFinite(p.lng) && filled(p.name); });

/* The nine pages and the map, in menu order. The menu shows the first five
   open pages; the rest sit under "More". settings.js switches pages on and off. */
var PAGES = [
  {id:'home',    file:'index.html',       label:'Home'},
  {id:'bird',    file:'bird.html',        label:'The bird'},
  {id:'lichini', file:'lichini.html',     label:'The Lichini walk'},
  {id:'river',   file:'river.html',       label:'The river'},
  {id:'sun',     file:'sun.html',         label:'Sunrise and sunset'},
  {id:'bamboo',  file:'bamboo-food.html', label:'Bamboo and food'},
  {id:'nettle',  file:'nettle.html',      label:'Nettle cloth'},
  {id:'story',   file:'story.html',       label:'Our story'},
  {id:'visit',   file:'visit.html',       label:'Stay and visit'},
  {id:'map',     file:'map.html',         label:'Map'}
];

var $  = function(s, el){ return (el || document).querySelector(s); };
var $$ = function(s, el){ return [].slice.call((el || document).querySelectorAll(s)); };
function filled(v){
  if (Array.isArray(v)) return v.some(filled);
  if (v && typeof v === 'object') return Object.keys(v).length > 0;
  return typeof v === 'string' ? v.trim() !== '' : typeof v === 'number';
}
function setting(path){ return path.split('.').reduce(function(o, k){ return o == null ? o : o[k]; }, SITE); }
function digits(s){ return String(s || '').replace(/\D/g, ''); }
function el(tag, cls, text){ var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

var here = document.body.getAttribute('data-page') || 'home';
var village = filled(SITE.village) ? SITE.village.trim() : 'Bichom';

/* ── keeper's preview: #setup, or the page opened from your own computer ── */
var SETUP = location.protocol === 'file:' || location.hash === '#setup';
try {
  if (location.hash === '#setup') sessionStorage.setItem('setup', '1');
  if (sessionStorage.getItem('setup') === '1') SETUP = true;
} catch (e) {}
if (SETUP) document.documentElement.classList.add('setup');

function pageOpen(p){
  if (p.id === 'home') return true;
  if (p.id === 'map') return PLACES.length > 0 && !(SITE.pages && SITE.pages.map === false);
  return !(SITE.pages && SITE.pages[p.id] === false);
}
function pageById(id){ for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return PAGES[i]; }

/* ── WhatsApp ── */
var WA = digits(SITE.whatsapp);
var WA_READY = WA.length >= 10 && !/x/i.test(SITE.whatsapp || '');
function numberShown(){
  if (filled(SITE.phoneShown) && !/x/i.test(SITE.phoneShown)) return SITE.phoneShown.trim();
  if (!WA_READY) return '';
  return WA.length === 12 && WA.slice(0, 2) === '91' ? '+91 ' + WA.slice(2, 7) + ' ' + WA.slice(7) : '+' + WA;
}
function waLink(interest){
  var text = 'Hello, I would like to visit ' + village + '.\nDates: \nPeople: \nI am interested in: ' + (interest || '');
  return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
}

/* ── header and menu ── */
function link(p, cls){
  var a = el('a', cls || '', p.label);
  a.href = p.file;
  if (p.id === here) a.setAttribute('aria-current', 'page');
  if (!pageOpen(p)){ a.classList.add('off'); a.title = 'Switched off in settings.js'; }
  return a;
}
(function header(){
  var top = $('#top'); if (!top) return;
  var shown = PAGES.filter(function(p){ return SETUP || pageOpen(p); });
  var first = shown.slice(0, 5), rest = shown.slice(5);

  var bar = el('div', 'bar');
  var brand = el('a', 'brand', village); brand.href = 'index.html'; bar.appendChild(brand);

  var nav = el('nav', 'nav'); nav.setAttribute('aria-label', 'Pages');
  first.forEach(function(p){ nav.appendChild(link(p)); });
  if (rest.length){
    var more = el('details', 'more'), sum = el('summary', '', 'More'), box = el('div');
    more.appendChild(sum);
    rest.forEach(function(p){ box.appendChild(link(p)); });
    more.appendChild(box); nav.appendChild(more);
    document.addEventListener('click', function(e){ if (!more.contains(e.target)) more.open = false; });
  }
  bar.appendChild(nav);

  if (SITE.hindi === true){
    var me = pageById(here) || PAGES[0];
    var hi = el('a', 'lang', 'हिन्दी'); hi.href = 'hi/' + me.file; hi.lang = 'hi'; bar.appendChild(hi);
  }

  var btn = el('button', 'menu-btn', 'Menu');
  btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'sheet');
  bar.appendChild(btn);

  var sheet = el('nav', 'sheet'); sheet.id = 'sheet'; sheet.hidden = true; sheet.setAttribute('aria-label', 'Pages');
  first.forEach(function(p){ sheet.appendChild(link(p)); });
  if (rest.length){ sheet.appendChild(el('p', '', 'More')); rest.forEach(function(p){ sheet.appendChild(link(p)); }); }
  btn.addEventListener('click', function(){
    sheet.hidden = !sheet.hidden;
    btn.setAttribute('aria-expanded', String(!sheet.hidden));
    btn.textContent = sheet.hidden ? 'Menu' : 'Close';
  });

  top.innerHTML = ''; top.appendChild(bar); top.appendChild(sheet);
})();

/* ── a page that is switched off ── */
if (!pageOpen(pageById(here) || PAGES[0])){
  var main = $('main');
  if (!SETUP && main){
    main.innerHTML = '';
    var c = el('div', 'col closed');
    c.appendChild(el('h1', '', 'This page is not open yet.'));
    var p = el('p'), a = el('a', '', 'Go to the home page'); a.href = 'index.html'; p.appendChild(a); c.appendChild(p);
    main.appendChild(c);
    var m = el('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m);
  }
}

/* ── fill the [brackets] from settings.js ── */
var gaps = [];
$$('[data-set]').forEach(function(e){
  var path = e.getAttribute('data-set'), v = setting(path);
  if (filled(v) && typeof v !== 'object'){
    var t = String(v).trim();
    if (e.hasAttribute('data-cap')) t = t.charAt(0).toUpperCase() + t.slice(1);   /* at the start of a sentence */
    e.textContent = t; e.classList.remove('gap');
  }
  else { e.classList.add('gap'); if (gaps.indexOf(path) < 0) gaps.push(path); }
});
/* lists: an array of sentences in settings.js becomes one line each */
$$('[data-list]').forEach(function(list){
  var path = list.getAttribute('data-list'), v = setting(path);
  var items = Array.isArray(v) ? v.filter(filled) : [];
  if (!items.length){ list.classList.add('gap-list'); $$('li', list).forEach(function(li){ li.classList.add('gap'); }); if (gaps.indexOf(path) < 0) gaps.push(path); return; }
  list.innerHTML = '';
  items.forEach(function(t){ list.appendChild(el('li', '', String(t).trim())); });
});
/* the WhatsApp number, written out in plain text */
$$('[data-number]').forEach(function(e){
  var n = numberShown();
  if (n){ e.textContent = n; e.classList.remove('gap'); }
  else { e.classList.add('gap'); if (gaps.indexOf('whatsapp') < 0) gaps.push('whatsapp'); }
});
/* a sentence or block marked data-need stays hidden until all its facts are in */
$$('[data-need]').forEach(function(box){
  /* a gap inside a smaller data-need belongs to that one, not to this box */
  var missing = box.classList.contains('gap') || $$('.gap', box).some(function(g){ return g.parentNode.closest('[data-need]') === box; });
  var key = box.getAttribute('data-need');
  if (key && !filled(setting(key))) missing = true;
  if (!missing) return;
  if (SETUP) box.classList.add('was-hidden'); else box.hidden = true;
});
/* data-else: what visitors see while the block just before it is still hidden */
$$('[data-else]').forEach(function(e){
  var prev = e.previousElementSibling;
  var show = prev && (prev.hidden || prev.classList.contains('was-hidden'));
  e.hidden = !show;
});

/* ── WhatsApp buttons: data-wa="what they are asking about" ── */
var WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.6 14.2c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4.2.5.8 1.8.8 1.9.1.1.1.3 0 .4l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.5 0 1z"/></svg>';
$$('[data-wa]').forEach(function(a){
  a.insertAdjacentHTML('afterbegin', WA_ICON);
  if (WA_READY){ a.href = waLink(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; }
  else a.href = here === 'visit' ? '#write' : 'visit.html#write';
});
(function waNote(){
  var n = numberShown(); if (!n) return;
  $$('.btns').forEach(function(b){
    if (!$('[data-wa]', b)) return;
    var p = el('p', 'wa-note', 'WhatsApp: ' + n);
    b.parentNode.insertBefore(p, b.nextSibling);
  });
})();

/* ── home tiles and links to pages that are switched off ── */
$$('[data-page-link]').forEach(function(e){
  var p = pageById(e.getAttribute('data-page-link'));
  if (p && !pageOpen(p) && !SETUP) e.hidden = true;
});

/* ── "Say the name": audio/<name>.mp3, recorded with the speaker's yes ── */
var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor" opacity=".15"/><path d="M10 7.5l6 4.5-6 4.5z" fill="currentColor"/></svg>';
$$('[data-say]').forEach(function(box){
  if (location.protocol === 'file:' || !window.fetch) return;
  var name = box.getAttribute('data-say'), src = 'audio/' + name + '.mp3';
  fetch(src, {method:'HEAD'}).then(function(r){
    if (!r.ok) return;
    var b = el('button', 'say'); b.type = 'button';
    b.innerHTML = PLAY + 'Say the name';
    b.setAttribute('aria-label', 'Say the name: ' + (box.getAttribute('data-say-label') || name));
    var sound;
    b.addEventListener('click', function(){ sound = sound || new Audio(src); sound.currentTime = 0; sound.play(); });
    box.appendChild(b); box.hidden = false;
  }).catch(function(){});
});

/* ── short clips: videos/<name>.mp4, shown only when the file is there ── */
$$('[data-clip]').forEach(function(fig){
  if (location.protocol === 'file:' || !window.fetch) return;
  var src = 'videos/' + fig.getAttribute('data-clip') + '.mp4';
  fetch(src, {method:'HEAD'}).then(function(r){
    if (!r.ok) return;
    var v = $('video', fig); v.src = src; fig.hidden = false;
  }).catch(function(){});
});

/* ── dishes, from settings.js ── */
$$('[data-dishes]').forEach(function(list){
  var ds = (setting(list.getAttribute('data-dishes')) || []).filter(function(d){ return d && filled(d.bugun || d.english); });
  if (!ds.length){ if (gaps.indexOf('dishes') < 0) gaps.push('dishes'); if (!SETUP) list.hidden = true; return; }
  list.innerHTML = '';
  ds.forEach(function(d){
    var li = el('li');
    if (filled(d.photo)){ var img = el('img'); img.src = 'photos/' + d.photo.trim(); img.alt = (d.bugun || d.english || '').trim(); img.loading = 'lazy'; li.appendChild(img); }
    li.appendChild(el('b', '', (d.bugun || d.english).trim()));
    if (filled(d.bugun) && filled(d.english)) li.appendChild(el('i', '', d.english.trim()));
    if (filled(d.what)) li.appendChild(el('p', '', d.what.trim()));
    if (filled(d.when)) li.appendChild(el('p', '', d.when.trim()));
    if (d.bamboo === true) li.appendChild(el('span', 'tag', 'Cooked in bamboo'));
    list.appendChild(li);
  });
});

/* ── sunrise and sunset, month by month (NOAA formula, flat horizon, IST) ── */
function coords(s){
  var m = String(s || '').replace(/\s+/g, '').match(/^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/);
  return m ? [+m[1], +m[2]] : null;
}
function sunTimes(lat, lng, month){
  var rad = Math.PI / 180, day = Math.round(30.44 * month + 15);   // the 15th, near enough
  var g = 2 * Math.PI / 365 * (day - 1);
  var eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  var dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  var ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(dec)) - Math.tan(lat * rad) * Math.tan(dec)) / rad;
  var ist = 330;
  return [720 - 4 * (lng + ha) - eqt + ist, 720 - 4 * (lng - ha) - eqt + ist];
}
function clock(min){
  min = Math.round(min);
  var h = Math.floor(min / 60), m = min % 60, ap = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
}
(function sunTable(){
  var body = $('#sunRows'); if (!body) return;
  var spot = coords(setting('sun.morningCoords')), where = $('#sunWhere');
  if (spot){ if (where && filled(setting('sun.morningSpot'))) where.textContent = setting('sun.morningSpot').trim(); }
  else spot = coords(SITE.mapPlace) || [27.311, 92.592];
  var names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  names.forEach(function(n, i){
    var t = sunTimes(spot[0], spot[1], i), tr = el('tr');
    tr.appendChild(el('td', '', n)); tr.appendChild(el('td', '', clock(t[0]))); tr.appendChild(el('td', '', clock(t[1])));
    body.appendChild(tr);
  });
})();

/* ── the map: numbered pins, the list underneath ── */
function mapsLink(p){ return 'https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lng; }
function drawMap(box, pts){
  var lat0 = pts.reduce(function(s, p){ return s + p.lat; }, 0) / pts.length;
  var k = Math.cos(lat0 * Math.PI / 180);
  var xs = pts.map(function(p){ return p.lng * k; }), ys = pts.map(function(p){ return -p.lat; });
  var minX = Math.min.apply(0, xs), maxX = Math.max.apply(0, xs), minY = Math.min.apply(0, ys), maxY = Math.max.apply(0, ys);
  var dx = Math.max(maxX - minX, 0.004), dy = Math.max(maxY - minY, 0.004);
  var W = 480, H = Math.round(Math.min(560, Math.max(300, W * dy / dx))), pad = 46;
  var s = Math.min((W - 2 * pad) / dx, (H - 2 * pad) / dy);
  var ox = (W - s * (maxX - minX)) / 2, oy = (H - s * (maxY - minY)) / 2;
  function X(p){ return ox + (p.lng * k - minX) * s; }
  function Y(p){ return oy + (-p.lat - minY) * s; }
  /* scale bar: a round number of km, about a fifth of the width */
  var kmPx = s / 111.32, want = W / 5 / kmPx, steps = [0.25, 0.5, 1, 2, 5, 10, 20], km = steps[0];
  steps.forEach(function(v){ if (v <= want) km = v; });
  var bar = km * kmPx;
  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Map with numbered places; the list is below">';
  svg += '<g stroke="#5a6a72" stroke-opacity=".12">';
  for (var gx = 0; gx <= W; gx += 48) svg += '<path d="M' + gx + ' 0V' + H + '"/>';
  for (var gy = 0; gy <= H; gy += 48) svg += '<path d="M0 ' + gy + 'H' + W + '"/>';
  svg += '</g>';
  pts.forEach(function(p){
    var x = X(p).toFixed(1), y = Y(p).toFixed(1);
    svg += '<g><circle cx="' + x + '" cy="' + y + '" r="13" fill="#5a6a72" stroke="#f5f0e6" stroke-width="2.5"/>' +
           '<text x="' + x + '" y="' + y + '" dy=".35em" text-anchor="middle" font-family="Source Sans 3,sans-serif" font-weight="700" font-size="14" fill="#fff">' + p.n + '</text></g>';
  });
  svg += '<g font-family="Source Sans 3,sans-serif" font-size="13" fill="#1e1710">' +
         '<path d="M18 ' + (H - 18) + 'h' + bar.toFixed(1) + '" stroke="#1e1710" stroke-width="2.5"/>' +
         '<text x="18" y="' + (H - 26) + '">' + km + ' km</text>' +
         '<path d="M' + (W - 24) + ' 32l-7 15h14z" fill="#1e1710"/><text x="' + (W - 24) + '" y="26" text-anchor="middle" font-weight="700">N</text></g>';
  svg += '</svg>';
  box.innerHTML = svg;
}
function placeList(list, pts){
  pts.forEach(function(p){
    var li = el('li'), n = el('span', 'n', String(p.n)), body = el('div');
    var title = filled(p.bugun) ? p.bugun.trim() + ' · ' + p.name.trim() : p.name.trim();
    body.appendChild(el('b', '', title));
    if (filled(p.note)) body.appendChild(el('span', '', p.note.trim()));
    var a = el('a', '', 'Open in Google Maps'); a.href = mapsLink(p); a.target = '_blank'; a.rel = 'noopener';
    body.appendChild(a);
    li.appendChild(n); li.appendChild(body); list.appendChild(li);
  });
}
$$('[data-map]').forEach(function(sec){
  var which = sec.getAttribute('data-map'), pts;
  if (which === 'walk'){
    pts = PLACES.filter(function(p){ return isFinite(p.walk); }).sort(function(a, b){ return a.walk - b.walk; })
                .map(function(p){ return Object.assign({}, p, {n: p.walk}); });
  } else {
    pts = PLACES.map(function(p, i){ return Object.assign({}, p, {n: i + 1}); });
  }
  if (!pts.length){ var e = $('[data-map-empty]'); if (e) e.hidden = false; return; }
  sec.hidden = false;
  drawMap($('.map', sec), pts);
  placeList($('.places', sec), pts);
});

/* the village in Google Maps, for directions */
$$('[data-village-map]').forEach(function(a){
  var c = coords(SITE.mapPlace);
  a.href = c ? mapsLink({lat: c[0], lng: c[1]}) : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(village + ', West Kameng, Arunachal Pradesh');
});
/* the official e-ILP link, once a person has checked it */
$$('[data-permit-link]').forEach(function(a){
  var u = setting('permitLink');
  if (filled(u) && /^https:\/\//.test(u.trim())){ a.href = u.trim(); a.target = '_blank'; a.rel = 'noopener'; }
  else { var t = document.createTextNode(a.textContent); a.parentNode.replaceChild(t, a); if (gaps.indexOf('permitLink') < 0) gaps.push('permitLink'); }
});

/* ── footer ── */
(function footer(){
  var f = $('#foot'); if (!f) return;
  var w = el('div', 'col'), ul = el('ul');
  PAGES.forEach(function(p){ if (pageOpen(p)){ var li = el('li'); li.appendChild(link(p)); ul.appendChild(li); } });
  w.appendChild(ul);
  var n = numberShown();
  if (n){ var pn = el('p', '', 'WhatsApp: '); var a = el('a', '', n); a.href = 'https://wa.me/' + WA; a.target = '_blank'; a.rel = 'noopener'; pn.appendChild(a); w.appendChild(pn); }
  w.appendChild(el('p', 'gift', 'A gift to the Bugun people of ' + village + ', from Ricky (Vikrant Charak), IIT Delhi.'));
  if (filled(SITE.credits)) w.appendChild(el('p', '', SITE.credits.trim()));
  f.innerHTML = ''; f.appendChild(w);
})();

/* ── the keeper's preview box ── */
(function keeper(){
  if (!SETUP) return;
  var box = el('div', 'keeper'); box.setAttribute('role', 'status');
  var html = '<b>Keeper’s preview</b>';
  var me = pageById(here);
  if (me && !pageOpen(me)) html += '<p>This page is switched off. Visitors see “not open yet”. To open it, set <code>pages.' + me.id + ': true</code> in settings.js.</p>';
  if (!window.SITE) html += '<p>settings.js did not load. Keep it in the same folder as the pages.</p>';
  if (!WA_READY && gaps.indexOf('whatsapp') < 0) gaps.unshift('whatsapp');
  if (gaps.length){
    html += 'Yellow words are still in [brackets]. Visitors don’t see those sentences yet. Fill these in <code>settings.js</code>:<ul>';
    gaps.forEach(function(g){ html += '<li><code>' + g.replace(/</g, '') + '</code></li>'; });
    html += '</ul>';
  } else html += '<p>Nothing missing on this page.</p>';
  html += '<button type="button" data-k="hide">Hide</button><button type="button" data-k="leave">Leave preview</button>';
  box.innerHTML = html;
  box.addEventListener('click', function(e){
    var k = e.target.getAttribute && e.target.getAttribute('data-k');
    if (k === 'hide') box.remove();
    if (k === 'leave'){ try { sessionStorage.removeItem('setup'); } catch (er) {} location.href = location.pathname; }
  });
  document.body.appendChild(box);
})();

})();
