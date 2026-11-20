// Pure game rules: game window, mission deck, scoring. No DOM, no database — `node check.mjs` tests this file.

export const HAND = 8;          // missions a player holds at once

// One continuous game (IST). No rounds are shown to players.
export const GAME = { start: '2026-11-21T19:00:00+05:30', end: '2026-11-22T11:00:00+05:30', points: 3 };

// Behind the scenes the mission set follows the time of day, so new missions fit the moment
// (reception jokes in the evening, filter coffee in the morning). Missions already held are kept.
export const TIMES = [
  { id: 'reception', from: '2026-11-21T19:00:00+05:30' },
  { id: 'night',     from: '2026-11-21T23:00:00+05:30' },
  { id: 'muhurtham', from: '2026-11-22T06:00:00+05:30' },
];

// waves: which time of day (TIMES id) the mission can be dealt in ('any' = all day).
// gangs: optional — only players of these gangs get it. Omit for everyone.
// Ids must stay stable once the game starts (they are saved on players).
const IDC = ['idc'], COUSINS = ['cousins'];
export const MISSIONS = [
  // IDC / design-school missions
  { id: 'kerning',       waves: ['any'], gangs: IDC, text: 'Get someone to say the word "kerning".' },
  { id: 'comic-sans',    waves: ['any'], gangs: IDC, text: 'Get someone to say "Comic Sans" or "Papyrus".' },
  { id: 'jury',          waves: ['any'], gangs: IDC, text: 'Get someone to say "jury".' },
  { id: 'figma',         waves: ['any'], gangs: IDC, text: 'Get someone to say "Figma".' },
  { id: 'affordance',    waves: ['any'], gangs: IDC, text: 'Get someone to say "affordance".' },
  { id: 'design-think',  waves: ['any'], gangs: IDC, text: 'Get someone to say "design thinking" with a straight face.' },
  { id: 'portfolio',     waves: ['any'], gangs: IDC, text: 'Get someone to say "portfolio".' },
  { id: 'iteration',     waves: ['any'], gangs: IDC, text: 'Get someone to say "iteration" or "let\'s iterate".' },
  { id: 'pantone',       waves: ['any'], gangs: IDC, text: 'Get someone to name a Pantone shade or a hex code.' },
  { id: 'palette',       waves: ['any'], gangs: IDC, text: 'Get someone to describe the colour palette of the stage or mandap.' },
  { id: 'rate-decor',    waves: ['any'], gangs: IDC, text: 'Get someone to rate the decor out of 10.' },
  { id: 'invite-font',   waves: ['any'], gangs: IDC, text: 'Get someone to critique the font on the wedding invite.' },
  { id: 'redesign',      waves: ['any'], gangs: IDC, text: 'Get someone to tell you how they would redesign something at the venue.' },
  { id: 'sketch',        waves: ['any'], gangs: IDC, text: 'Get someone to sketch something on a napkin, tissue or your palm.' },
  { id: 'photo-advice',  waves: ['any'], gangs: IDC, text: 'Get someone to give you photography advice: framing, light or angle.' },
  { id: 'powai',         waves: ['any'], gangs: IDC, text: 'Get someone to mention Powai lake.' },
  { id: 'moodi',         waves: ['any'], gangs: IDC, text: 'Get someone to mention Mood Indigo.' },
  { id: 'all-nighter',   waves: ['any'], gangs: IDC, text: 'Get someone to tell you about their worst submission all-nighter.' },
  { id: 'prof-quote',    waves: ['any'], gangs: IDC, text: 'Get someone to quote or imitate an IDC professor.' },
  { id: 'college-photo', waves: ['any'], gangs: IDC, text: 'Get someone to show you an old college photo on their phone.' },
  { id: 'plan-b',        waves: ['any'], gangs: IDC, text: 'Get someone to tell you what they would be doing if they had not studied design.' },
  { id: 'dance-jury',    waves: ['night'], gangs: IDC, text: 'Get someone to give a jury-style critique of a dance performance.' },
  { id: 'couple-startup',waves: ['night'], gangs: IDC, text: 'Get someone to pitch a startup the couple should build together.' },

  // Cousins / family missions
  { id: 'nickname',      waves: ['any'], gangs: COUSINS, text: 'Get someone to call you by your childhood nickname.' },
  { id: 'couple-nick',   waves: ['any'], gangs: COUSINS, text: 'Get someone to tell you the bride or groom\'s childhood nickname.' },
  { id: 'kid-story',     waves: ['any'], gangs: COUSINS, text: 'Get someone to tell a childhood story about the bride or groom.' },
  { id: 'summer-hols',   waves: ['any'], gangs: COUSINS, text: 'Get someone to bring up summer holidays at ammamma\'s, nannamma\'s or paati\'s house.' },
  { id: 'your-turn',     waves: ['any'], gangs: COUSINS, text: 'Get someone to say "next it\'s your turn" about getting married.' },
  { id: 'family-tree',   waves: ['any'], gangs: COUSINS, text: 'Get someone to explain how two relatives here are related.' },
  { id: 'imitate-elder', waves: ['any'], gangs: COUSINS, text: 'Get someone to imitate a family aunty or uncle.' },
  { id: 'family-group',  waves: ['any'], gangs: COUSINS, text: 'Get someone to mention the family WhatsApp group.' },
  { id: 'cousin-fight',  waves: ['any'], gangs: COUSINS, text: 'Get someone to bring up a childhood fight between cousins.' },
  { id: 'marks',         waves: ['any'], gangs: COUSINS, text: 'Get someone to bring up exam marks, ranks or results.' },
  { id: 'grandma-dish',  waves: ['any'], gangs: COUSINS, text: 'Get someone to name a dish nobody makes like their grandmother.' },
  { id: 'baby-photo',    waves: ['any'], gangs: COUSINS, text: 'Get someone to show you a childhood photo of the bride or groom.' },
  { id: 'kolam',         waves: ['any'], gangs: COUSINS, text: 'Get someone to draw a kolam or rangoli pattern on a napkin, paper or in the air.' },

  // Wedding missions — any wave
  { id: 'teach-word',    waves: ['any'], text: 'Get someone to teach you a word in Telugu or Tamil.' },
  { id: 'machan',        waves: ['any'], text: 'Get someone to call you "machan", "mama" or "bava".' },
  { id: 'groom-story',   waves: ['any'], text: 'Get someone to tell you an embarrassing college story about the groom.' },
  { id: 'how-met',       waves: ['any'], text: 'Get someone to tell you how the couple met.' },

  // Reception
  { id: 'payasam',       waves: ['reception'], text: 'Get someone to take a second helping of payasam or dessert because you suggested it.' },
  { id: 'stage-pose',    waves: ['reception'], text: 'Get someone to strike a pose you choose in a photo.' },
  { id: 'relative-selfie', waves: ['reception'], text: 'Get someone to take a selfie with you and a relative of the couple they have never met.' },
  { id: 'outfit-shop',   waves: ['reception'], text: 'Get someone to tell you where they bought their outfit.' },
  { id: 'fix-outfit',    waves: ['reception'], text: 'Get someone to fix your hair, dupatta, pallu or veshti.' },
  { id: 'gift-guess',    waves: ['reception'], text: 'Get someone to guess what is inside a wrapped gift.' },
  { id: 'banana-leaf',   waves: ['reception', 'muhurtham'], text: 'Get someone to explain which way to fold the banana leaf after eating.' },
  { id: 'eat-hand',      waves: ['reception', 'muhurtham'], text: 'Get someone to eat with their hand instead of a spoon.' },
  { id: 'muhurtham-word',waves: ['reception', 'night'], text: 'Get someone to say "muhurtham".' },
  { id: 'thalaivar',     waves: ['reception', 'night'], text: 'Get someone to say "Thalaivar" or "Mega Star".' },

  // Late night
  { id: 'hook-step',     waves: ['night'], text: 'Get someone to do the hook step of a Telugu or Tamil song with you.' },
  { id: 'sing',          waves: ['night'], text: 'Get someone to start singing (antakshari counts).' },
  { id: 'one-more-song', waves: ['night'], text: 'Get someone to say "one more song".' },
  { id: 'not-sleepy',    waves: ['night'], text: 'Get someone to say "I\'m not sleepy".' },
  { id: 'staring',       waves: ['night'], text: 'Get someone into a 10-second staring contest.' },
  { id: 'last-photo',    waves: ['night'], text: 'Get someone to show you the last photo on their phone.' },
  { id: 'floor-sit',     waves: ['night'], text: 'Get someone to sit on the floor with you.' },
  { id: 'chai-run',      waves: ['night'], text: 'Get someone to fetch you chai, coffee or water.' },
  { id: 'snack-share',   waves: ['night'], text: 'Get someone to share their snack with you.' },

  // Muhurtham morning
  { id: 'subhodayam',    waves: ['muhurtham'], text: 'Get someone to say "Subhodayam" or "Kaalai vanakkam".' },
  { id: 'filter-coffee', waves: ['muhurtham'], text: 'Get someone to bring you filter coffee.' },
  { id: 'akshintalu',    waves: ['muhurtham'], text: 'Get someone to explain what the akshintalu / akshathai rice is for.' },
  { id: 'barely-slept',  waves: ['muhurtham'], text: 'Get someone to admit they barely slept.' },
  { id: 'ritual',        waves: ['muhurtham'], text: 'Get someone to explain what is happening in the ritual right now.' },
  { id: 'nadaswaram',    waves: ['muhurtham'], text: 'Get someone to hum along with the nadaswaram.' },
  { id: 'second-idli',   waves: ['muhurtham'], text: 'Get someone to ask for a second idli, dosa or pongal.' },
  { id: 'yawn',          waves: ['muhurtham'], text: 'Get someone to yawn right after you do.' },
  { id: 'mandap-photo',  waves: ['muhurtham'], text: 'Get someone to take your photo with the mandap in the background.' },
  { id: 'wake-time',     waves: ['muhurtham'], text: 'Get someone to tell you what time they woke up.' },
];

export const byId = Object.fromEntries(MISSIONS.map(m => [m.id, m]));

const T = s => Date.parse(s);

// Where the game is at time t: before | live | over. `deck` is the current time-of-day mission set.
export function phase(t) {
  if (t < T(GAME.start)) return { state: 'before', until: T(GAME.start) };
  if (t >= T(GAME.end)) return { state: 'over' };
  return { state: 'live', until: T(GAME.end), deck: TIMES.filter(x => t >= T(x.from)).at(-1).id };
}

export const missionsFor = (waveId, gang) => MISSIONS.filter(m =>
  (m.waves.includes(waveId) || m.waves.includes('any')) && (!m.gangs || m.gangs.includes(gang)));

export function newPlayer(name, pin, gang, t) {
  return { name, pin, gang, score: 0, active: [], done: [], joinedAt: t };
}

function dealOne(p, deck, rand) {
  const ok = missionsFor(deck, p.gang).filter(m => !p.active.includes(m.id));
  const fresh = ok.filter(m => !p.done.includes(m.id));
  const pool = fresh.length ? fresh : ok; // deck exhausted: allow repeats
  return pool[Math.floor(rand() * pool.length)].id;
}

export const needsHand = p => p.active.length < HAND;

// Top the hand up to HAND missions from the current deck. Returns null if nothing to do.
export function refresh(p, deck, rand = Math.random) {
  if (!needsHand(p)) return null;
  const q = { ...p, active: [...p.active] };
  while (q.active.length < HAND) q.active.push(dealOne(q, deck, rand));
  return q;
}

// Returns { players: {id: newData}, event } for db.mutate.
export function gotEm(ps, meId, missionId, victim, deck, t, rand = Math.random) {
  const p = ps[meId];
  if (!p.active.includes(missionId) || p.failed?.includes(missionId)) throw new Error('That mission is no longer in play.');
  if (!victim || victim.id === meId) throw new Error('Pick who you got.');
  const q = { ...p, score: p.score + GAME.points, done: [...p.done, missionId], active: p.active.filter(x => x !== missionId) };
  q.active.push(dealOne(q, deck, rand));
  return {
    players: { [meId]: q },
    event: { type: 'got', at: t, by: meId, byName: p.name, victim: victim.id, victimName: victim.name, mission: missionId, deltas: { [meId]: GAME.points } },
  };
}

// Failed it: someone saw through you. The mission stays in its slot, marked failed, for the rest of
// the game (like the red side of the card). `by` is who saw through you, when known.
export function failIt(ps, meId, missionId, by, t) {
  const p = ps[meId];
  if (!p.active.includes(missionId) || p.failed?.includes(missionId)) throw new Error('That mission is no longer in play.');
  return {
    players: { [meId]: { ...p, failed: [...(p.failed ?? []), missionId] } },
    event: { type: 'failed', at: t, by: meId, byName: p.name, victim: by?.id ?? null, victimName: by?.name ?? null, mission: missionId, deltas: {} },
  };
}
