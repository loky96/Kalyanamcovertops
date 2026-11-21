// Data layer + small UI helpers shared by the player and leaderboard pages.
import { SUPABASE, GAME_ID, GANGS, ROSTER, TEST_MODE } from './config.js';
import { HAND, GAME, phase } from './rules.js';

export const isDemo = !SUPABASE.url.startsWith('https://');

// ?now=2026-11-21T20:00:00+05:30 fakes the clock for testing; time keeps ticking from there.
const fake = Date.parse(new URLSearchParams(location.search).get('now'));
const skew = isNaN(fake) ? 0 : fake - Date.now();
export const now = () => Date.now() + skew;
export const gamePhase = () => phase(now(), TEST_MODE);

// db API (same for Supabase and demo):
//   onPlayers(cb), onEvents(cb, n)  — live lists, return unsubscribe
//   addPlayer(data) -> id
//   mutate(ids, fn) — read players `ids`, fn(playersById) returns { players: {id: data}, event };
//                     saved only if nobody else changed them meanwhile (else re-run); resolves to fn's result
export const db = isDemo ? demoDb() : await supaDb();

async function supaDb() {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm');
  const sb = createClient(SUPABASE.url, SUPABASE.key, { auth: { persistSession: false } });
  const ok = ({ data, error }) => { if (error) throw new Error(error.message); return data; };
  const asDocs = rows => rows.map(r => ({ id: r.id, ...r.data }));

  // A live list: show the last copy saved on this phone at once (bad venue signal), then fetch,
  // and fetch again whenever the table changes, the connection comes back, or the phone wakes up.
  function live(table, query, cb) {
    const KEY = `cache:${GAME_ID}:${table}`;
    try { const c = JSON.parse(localStorage.getItem(KEY)); if (c) queueMicrotask(() => cb(c)); } catch {}
    let t, gone = false;
    const pull = async () => {
      try {
        const docs = asDocs(ok(await query()));
        if (gone) return;
        try { localStorage.setItem(KEY, JSON.stringify(docs)); } catch {}
        cb(docs);
      } catch (e) { console.warn(table, e); }
    };
    const soon = () => { clearTimeout(t); t = setTimeout(pull, 250); }; // one fetch for a burst of changes
    const ch = sb.channel(`${table}:${GAME_ID}:${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table, filter: `game=eq.${GAME_ID}` }, soon)
      .subscribe(status => status === 'SUBSCRIBED' && soon());
    const wake = () => !document.hidden && soon();
    document.addEventListener('visibilitychange', wake);
    const poll = setInterval(() => !document.hidden && pull(), 60000); // safety net if a live update is missed
    pull();
    return () => { gone = true; clearInterval(poll); document.removeEventListener('visibilitychange', wake); sb.removeChannel(ch); };
  }

  return {
    onPlayers: cb => live('players', () => sb.from('players').select('id,data').eq('game', GAME_ID), cb),
    onEvents: (cb, n = 50) => live('events', () => sb.from('events').select('id,data').eq('game', GAME_ID).order('at', { ascending: false }).limit(n), cb),
    addPlayer: async p => ok(await sb.from('players').insert({ game: GAME_ID, data: p }).select('id').single()).id,
    // ponytail: version check per row, not a transaction; fine because every caller changes only its own player.
    mutate: async (ids, fn) => {
      for (let tries = 0; tries < 5; tries++) {
        const rows = ok(await sb.from('players').select('id,data,v').in('id', ids));
        const ps = {};
        for (const id of ids) {
          const row = rows.find(x => x.id === id);
          if (!row) throw new Error('Player not found.');
          ps[id] = { id, ...row.data };
        }
        const r = fn(ps) || {};
        let clash = false;
        for (const [id, { id: _, ...data }] of Object.entries(r.players || {})) {
          const v = rows.find(x => x.id === id).v;
          const saved = ok(await sb.from('players').update({ data, v: v + 1 }).eq('id', id).eq('v', v).select('id'));
          if (!saved.length) { clash = true; break; }
        }
        if (clash) continue; // another phone saved first: re-read and try again
        if (r.event) ok(await sb.from('events').insert({ game: GAME_ID, at: r.event.at, data: r.event }));
        return r;
      }
      throw new Error('The game is busy. Try again.');
    },
  };
}

// Demo: localStorage, synced across tabs of the same browser. For trying the game without Supabase.
function demoDb() {
  const KEY = 'demo:' + GAME_ID, subs = new Set();
  const load = () => { try { return JSON.parse(localStorage[KEY]) || { players: {}, events: {} }; } catch { return { players: {}, events: {} }; } };
  const emit = () => subs.forEach(f => f());
  const save = s => { localStorage[KEY] = JSON.stringify(s); emit(); };
  addEventListener('storage', e => e.key === KEY && emit());
  const sub = f => { subs.add(f); queueMicrotask(f); return () => subs.delete(f); }; // async first call, like a network fetch
  const uid = () => Math.random().toString(36).slice(2, 10);
  const rows = o => Object.entries(o).map(([id, v]) => ({ id, ...v }));
  return {
    onPlayers: cb => sub(() => cb(rows(load().players))),
    onEvents: (cb, n = 50) => sub(() => cb(rows(load().events).sort((a, b) => b.at - a.at).slice(0, n))),
    addPlayer: async p => { const s = load(), id = uid(); s.players[id] = p; save(s); return id; },
    mutate: async (ids, fn) => {
      const s = load(), ps = {};
      for (const id of ids) {
        if (!s.players[id]) throw new Error('Player not found.');
        ps[id] = { id, ...s.players[id] };
      }
      const r = fn(ps) || {};
      for (const [id, { id: _, ...data }] of Object.entries(r.players || {})) s.players[id] = data;
      if (r.event) s.events[uid()] = r.event;
      save(s);
      return r;
    },
  };
}

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function dur(ms) {
  const m = Math.max(0, Math.ceil(ms / 60000)), h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m}m`;
}

export const when = t => new Date(t).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
export const clock = t => new Date(t).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });

export const ranked = ps => [...ps].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

export function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 3500);
}

// One stroke icon set (24px grid, 2px round strokes), drawn for this game.
const ICONS = {
  leaf: '<path d="M4 20C4 10.5 10.5 4 20 4c0 9.5-6.5 16-16 16Z"/><path d="M4 20 15 9"/>',
  fold: '<path d="M4 20C4 10.5 10.5 4 20 4c0 9.5-6.5 16-16 16Z"/><path d="M8.5 9.5c3 0 6 3 6 6"/>',
  podium: '<path d="M3 20h18M5 20v-6h4.5v6M9.5 20V8h5v12M14.5 20v-9H19v9"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  cards: '<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  chat: '<path d="M4 5h16v10H10l-5 4v-4H4z"/><path d="M8 10h8"/>',
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18h3"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  eyeoff: '<path d="M3 3l18 18M10.6 5.6A9 9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.2 4M6.3 6.8C3.9 8.4 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shout: '<path d="M3 10v4h3l7 4V6l-7 4H3z"/><path d="M16.5 9a4 4 0 0 1 0 6"/>',
  cross: '<path d="m6 6 12 12M18 6 6 18"/>',
  ask: '<path d="M9 9.2a3 3 0 1 1 4.2 2.7c-.7.4-1.2 1-1.2 1.8v.8"/><path d="M12 18h.01"/>',
};
export const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

export function eventHTML(e) {
  const d = Object.values(e.deltas || {})[0] ?? 0;
  const who = `<b>${esc(e.byName)}</b>`, vic = `<b>${esc(e.victimName)}</b>`;
  const [line, ic] = {
    got: [`${vic} got caught by ${who}`, 'fold'],
    failed: [e.victimName ? `${vic} saw through ${who}` : `${who} got called out`, 'eyeoff'],
  }[e.type] ?? [];
  if (!line) return ''; // retired event types (old demo data)
  // The mission stays secret in the feed: only who caught who.
  return `<li class="ev ev-${esc(e.type)}"><span class="ev-mark">${icon(ic)}</span><span class="ev-text">${line}</span>${d ? `<span class="pts">${d > 0 ? '+' : '−'}${Math.abs(d)}</span>` : '<span class="pts fail-tag">Failed</span>'}</li>`;
}

// Bottom tab bar shared by the player pages.
export const tabs = active => `<nav class="tabs" aria-label="Game">
  <a href="index.html${location.search}" ${active === 'missions' ? 'aria-current="page"' : ''}>${icon('leaf')}<span>Missions</span></a>
  <a href="board.html${location.search}" ${active === 'board' ? 'aria-current="page"' : ''}>${icon('podium')}<span>Leaderboard</span></a>
  <a href="rules.html${location.search}" ${active === 'rules' ? 'aria-current="page"' : ''}>${icon('ask')}<span>How to play</span></a>
</nav>`;

// How to play, shown on its own tab (rules.html).
export function howHTML() {
  const S = Date.parse(GAME.start), E = Date.parse(GAME.end);
  const timing = TEST_MODE
    ? 'Test mode is on. You can play at any hour.'
    : `The game runs non-stop from <b>${when(S)}</b> to <b>${when(E)}</b>.`;
  const steps = [
    ['cards', `Get ${HAND} secret missions`, 'Each one is a dare: get a friend to do something without them realising.'],
    ['chat', 'Pull it off, quietly', 'Steer the chat, act natural, keep your screen hidden.'],
    ['phone', 'Reveal it to their face', "Tap <b>Got 'em</b>, tap their photo, and show them your phone."],
  ];
  return `<section class="panel how">
    <ol class="steps">${steps.map(([ic, h, p]) => `<li class="step"><span class="step-ic">${icon(ic)}</span><div><h4>${h}</h4><p>${p}</p></div></li>`).join('')}
      <li class="step has-fork"><span class="step-ic">${icon('ask')}</span><h4>Did they see it coming?</h4>
        <div class="fork">
          <div class="branch yes"><span class="b-ic">${icon('check')}</span><b>Caught!</b><p>They tap <b>Yes, I got caught</b>. You get <b>+${GAME.points}</b> and a new mission.</p></div>
          <div class="branch no"><span class="b-ic">${icon('eyeoff')}</span><b>They say no</b><p>They tap <b>No</b>. Keep playing the same mission.</p></div>
        </div></li>
      <li class="step has-fork"><span class="step-ic">${icon('shout')}</span><h4>Smell a setup? Call it out</h4>
        <div class="fork">
          <div class="branch yes"><span class="b-ic">${icon('check')}</span><b>Right guess</b><p>Say their mission out loud. They tap <b>Failed it</b> and it stays red.</p></div>
          <div class="branch no"><span class="b-ic">${icon('cross')}</span><b>Wrong guess</b><p>No penalty. Everyone just knows you're watching.</p></div>
        </div></li></ol>
    <p class="game-time">${icon('clock')}<span>${timing} Every catch is <b>+${GAME.points} points</b>.</span></p>
  </section>`;
}


// Avatars: the photo listed in config.js ROSTER, or coloured initials as the fallback.
const norm = n => (n ?? '').trim().toLowerCase();
export const rosterOf = (name, gang = GANGS[0].id) => ROSTER.find(r =>
  (r.gang ?? GANGS[0].id) === gang && norm(r.name) === norm(name));

export function avatar(p, cls = '') {
  const src = rosterOf(p?.name, p?.gang)?.photo;
  if (src) return `<img class="av ${cls}" src="${esc(src)}" alt="">`;
  const name = (p?.name ?? '').trim() || '?';
  const ini = name.split(/\s+/).map(w => [...w][0]).join('').slice(0, 2).toUpperCase();
  let h = 0;
  for (const c of name) h = (h * 31 + c.codePointAt(0)) >>> 0;
  return `<span class="av av-c${h % 5} ${cls}" aria-hidden="true">${esc(ini)}</span>`;
}

export const demoBanner = () => isDemo
  ? '<p class="demo">Demo mode · data stays on this phone</p>' : '';
