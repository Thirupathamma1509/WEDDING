// ===== EDIT THESE DETAILS =====
const WEDDING = {
  date: "2027-03-14T10:30:00",           // year-month-dayTHH:MM:SS
  dateText: "14 · 03 · 2027",
  events: [
    { name: "Haldi & Mehendi", when: "13 March 2027, 4:00 PM" },
    { name: "Wedding Muhurtham", when: "14 March 2027, 10:30 AM" },
    { name: "Reception", when: "14 March 2027, 7:00 PM" }
  ],
  venue: "Your Venue Name",
  address: "Venue address, City, Andhra Pradesh",
  phone: ""                               // WhatsApp number with country code, e.g. 919876543210
};
const PHOTOS = ["photos/1.jpg", "photos/2.jpg", "photos/3.jpg"]; // your own photos (optional)
// ==============================

const $ = s => document.querySelector(s);
const PAL = [['#ff6f00','#ffca28'],['#d81b60','#ff80ab'],['#ffb300','#fff176'],['#e91e63','#f8bbd0'],['#fb8c00','#ffe082'],['#8e24aa','#e1bee7']];
function flower(size, [a, b], n = 8) {
  let s = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" class="fs">`;
  for (let i = 0; i < n; i++) s += `<ellipse cx="50" cy="26" rx="12" ry="24" fill="${a}" transform="rotate(${i * 360 / n} 50 50)"/>`;
  for (let i = 0; i < n; i++) s += `<ellipse cx="50" cy="34" rx="8" ry="16" fill="${b}" transform="rotate(${(i + .5) * 360 / n} 50 50)"/>`;
  return s + `<circle cx="50" cy="50" r="9" fill="#7b3f00"/><circle cx="50" cy="50" r="4" fill="#ffd54f"/></svg>`;
}
function petal(size, c) {
  return `<svg width="${size}" height="${size * 1.4}" viewBox="0 0 20 28"><path d="M10 0C20 8 20 20 10 28 0 20 0 8 10 0Z" fill="${c}"/></svg>`;
}
const pc = ['#ff4081', '#ffb300', '#ff6f00', '#f8bbd0', '#e91e63', '#ffd54f', '#ba68c8'];

// seal
$('#sealf').innerHTML = flower(56, PAL[3]);

// falling petals + flowers
(function () {
  const box = $('#petals');
  for (let i = 0; i < 34; i++) {
    const d = document.createElement('div'); d.innerHTML = i % 4 === 0 ? flower(18 + Math.random() * 14, PAL[i % 6], 6) : petal(8 + Math.random() * 8, pc[i % pc.length]);
    const el = d.firstChild, fall = 8 + Math.random() * 9;
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = `${fall}s, ${2.5 + Math.random() * 3}s`;
    el.style.animationDelay = `${-Math.random() * 12}s, ${-Math.random() * 4}s`;
    box.appendChild(el);
  }
})();

// hanging garlands
(function () {
  const g = $('#garland');
  for (let i = 0; i < 7; i++) {
    const s = document.createElement('div'); s.className = 's' + i + ' str'; s.style.animationDelay = (-i * .5) + 's';
    const len = 30 + (i % 3) * 22; s.firstChild;
    s.style.setProperty('--l', len + 'px');
    s.innerHTML = `<span style="height:${len}px;width:2px;background:#2e7d32"></span>` + flower(30, PAL[i % 6], 8) + (i % 2 ? flower(22, PAL[(i + 2) % 6], 6) : '');
    s.querySelector('svg').style.marginTop = '-2px';
    g.appendChild(s);
  }
  document.querySelectorAll('.garland .str').forEach(s => s.style.setProperty('--x', 0));
})();

// illustrated couple scenes (used as animated pictures)
function scene(v) {
  const bgs = [['#ffe0b2', '#f8bbd0'], ['#c8e6c9', '#ffe0b2'], ['#e1bee7', '#ffccbc']][v % 3];
  const hearts = [30, 90, 150, 60, 120].map((x, i) => `<path class="heart" style="animation-delay:${-i * .8}s" d="M${x} 80c-8-9-20 0-9 10l9 8 9-8c11-10-1-19-9-10z" fill="#e91e63"/>`).join('');
  const blooms = [[24, 190, 34, 1], [176, 185, 38, 3], [100, 225, 30, 5], [22, 40, 26, 2], [180, 36, 26, 4]]
    .map(([x, y, s, p]) => `<g class="fl-spin" style="animation-duration:${10 + p * 2}s" transform="translate(${x - s / 2} ${y - s / 2})">${flower(s, PAL[(p + v) % 6], 8).replace('<svg ', '<svg x="0" y="0" ')}</g>`).join('');
  return `<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="b${v}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bgs[0]}"/><stop offset="1" stop-color="${bgs[1]}"/></linearGradient></defs>
  <rect width="200" height="260" fill="url(#b${v})"/><circle cx="100" cy="95" r="62" fill="#fff" opacity=".35"/>
  <path d="M0 215c40-25 120-25 200 0V260H0Z" fill="#fff" opacity=".5"/>${hearts}
  <g><circle cx="76" cy="105" r="14" fill="#8d5a3b"/><path d="M61 102c2-14 26-14 30 0-8-6-22-6-30 0Z" fill="#1b1b1b"/>
  <path d="M58 128h36l8 90H50Z" fill="#ffb300"/><path d="M76 124v94" stroke="#fff" stroke-width="2"/><rect x="62" y="132" width="28" height="6" fill="#e91e63"/></g>
  <g><circle cx="126" cy="108" r="13" fill="#a56a45"/><path d="M111 105c2-16 28-16 30 2l-3 20c-2-10-4-18-12-18-6 0-12 6-15 8Z" fill="#1b1b1b"/>
  <path d="M112 126h28l16 92H104Z" fill="#d81b60"/><path d="M112 126l24 40 20-30" fill="none" stroke="#ffd54f" stroke-width="5"/><circle cx="126" cy="97" r="2" fill="#ffd54f"/></g>
  <path d="M70 140c14 30 44 30 58 0" fill="none" stroke="#ff6f00" stroke-width="5" stroke-dasharray="2 5" stroke-linecap="round"/>${blooms}</svg>`;
}
$('#heroart').innerHTML = scene(0);

// content
$('#dateText').textContent = WEDDING.dateText;
$('#events').innerHTML = WEDDING.events.map(e => `<div class="ev"><h3>${e.name}</h3><p>${e.when}</p></div>`).join('');
$('#venueName').textContent = WEDDING.venue; $('#venueAddr').textContent = WEDDING.address;
$('#mapBtn').href = 'https://www.google.com/maps/search/' + encodeURIComponent(WEDDING.venue + ' ' + WEDDING.address);
$('#rsvpBtn').href = `https://wa.me/${WEDDING.phone}?text=` + encodeURIComponent('Hi Surya & Joshitha, I will attend your wedding. Congratulations! 💐');

// countdown
function tick() {
  let d = Math.max(0, new Date(WEDDING.date) - new Date()) / 1000;
  const v = [['Days', 86400], ['Hours', 3600], ['Mins', 60], ['Secs', 1]].map(([l, s]) => { const n = Math.floor(d / s); d -= n * s; return `<div><b>${n}</b><span>${l}</span></div>`; });
  $('#count').innerHTML = v.join('');
}
tick(); setInterval(tick, 1000);

// gallery: real photos if present, illustrated scenes otherwise
(function () {
  const wrap = $('#slides'), dots = $('#dots');
  PHOTOS.forEach((src, i) => {
    const s = document.createElement('div'); s.className = 'sl' + (i ? '' : ' on');
    const img = new Image(); img.alt = 'Surya and Joshitha'; img.src = src;
    img.onerror = () => { s.innerHTML = scene(i + 1); };
    s.appendChild(img); wrap.appendChild(s); dots.appendChild(document.createElement('i'));
  });
  let k = 0; const sl = wrap.children, dt = dots.children;
  const show = n => { [...sl].forEach((e, j) => e.classList.toggle('on', j === n)); [...dt].forEach((e, j) => e.classList.toggle('on', j === n)); };
  show(0); setInterval(() => { k = (k + 1) % sl.length; show(k); }, 4200);
})();

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .2 });
document.querySelectorAll('.rv').forEach(e => io.observe(e));

// open envelope
$('#env').addEventListener('click', () => {
  $('#intro').classList.add('opened');
  setTimeout(() => { $('#main').hidden = false; $('#intro').classList.add('gone'); window.scrollTo(0, 0); }, 2000);
});
