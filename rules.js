// Pure game rules: game window, mission deck, scoring. No DOM, no database — `node check.mjs` tests this file.
import { ROSTER } from './config.js';
import { uniqueMissions } from './mission-decks.js';

export const DIFFICULTIES = ['Easy', 'Medium', 'Tricky', 'Hard'];
const HAND_SLOTS = ['say', 'act'].flatMap(kind => DIFFICULTIES.map((_, index) => `${kind}:${index + 1}`));
export const HAND = HAND_SLOTS.length;

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
const IDC = ['idc'], COUSINS = ['cousins'], WOW = ['wow'];
export const MISSIONS = [
  // IDC / design-school missions
  { id: 'kerning',       waves: ['any'], gangs: IDC, kind: 'say', difficulty: 2, text: 'Get someone to say the word "kerning".' },
  { id: 'comic-sans',    waves: ['any'], gangs: IDC, kind: 'say', difficulty: 2, text: 'Get someone to say "Comic Sans" or "Papyrus".' },
  { id: 'jury',          waves: ['any'], gangs: IDC, kind: 'say', difficulty: 1, text: 'Get someone to say "jury".' },
  { id: 'figma',         waves: ['any'], gangs: IDC, kind: 'say', difficulty: 1, text: 'Get someone to say "Figma".' },
  { id: 'affordance',    waves: ['any'], gangs: IDC, kind: 'say', difficulty: 3, text: 'Get someone to say "affordance".' },
  { id: 'design-think',  waves: ['any'], gangs: IDC, kind: 'say', difficulty: 4, text: 'Get someone to say "design thinking" with a straight face.' },
  { id: 'portfolio',     waves: ['any'], gangs: IDC, kind: 'say', difficulty: 1, text: 'Get someone to say "portfolio".' },
  { id: 'iteration',     waves: ['any'], gangs: IDC, kind: 'say', difficulty: 3, text: 'Get someone to say "iteration" or "let\'s iterate".' },
  { id: 'pantone',       waves: ['any'], gangs: IDC, kind: 'say', difficulty: 4, text: 'Get someone to name a Pantone shade or a hex code.' },
  { id: 'palette',       waves: ['any'], gangs: IDC, kind: 'say', difficulty: 2, text: 'Get someone to describe the colour palette of the stage or mandap.' },
  { id: 'rate-decor',    waves: ['any'], gangs: IDC, kind: 'say', difficulty: 1, text: 'Get someone to rate the decor out of 10.' },
  { id: 'invite-font',   waves: ['any'], gangs: IDC, kind: 'say', difficulty: 3, text: 'Get someone to critique the font on the wedding invite.' },
  { id: 'redesign',      waves: ['any'], gangs: IDC, kind: 'say', difficulty: 3, text: 'Get someone to tell you how they would redesign something at the venue.' },
  { id: 'sketch',        waves: ['any'], gangs: IDC, kind: 'act', difficulty: 3, text: 'Get someone to sketch something on a napkin, tissue or your palm.' },
  { id: 'photo-advice',  waves: ['any'], gangs: IDC, kind: 'say', difficulty: 3, text: 'Get someone to give you photography advice: framing, light or angle.' },
  { id: 'powai',         waves: ['any'], gangs: IDC, kind: 'say', difficulty: 2, text: 'Get someone to mention Powai lake.' },
  { id: 'moodi',         waves: ['any'], gangs: IDC, kind: 'say', difficulty: 2, text: 'Get someone to mention Mood Indigo.' },
  { id: 'all-nighter',   waves: ['any'], gangs: IDC, kind: 'say', difficulty: 4, text: 'Get someone to tell you about their worst submission all-nighter.' },
  { id: 'prof-quote',    waves: ['any'], gangs: IDC, kind: 'say', difficulty: 4, text: 'Get someone to quote or imitate an IDC professor.' },
  { id: 'college-photo', waves: ['any'], gangs: IDC, kind: 'act', difficulty: 2, text: 'Get someone to show you an old college photo on their phone.' },
  { id: 'plan-b',        waves: ['any'], gangs: IDC, kind: 'say', difficulty: 4, text: 'Get someone to tell you what they would be doing if they had not studied design.' },
  { id: 'dance-jury',    waves: ['night'], gangs: IDC, kind: 'say', difficulty: 4, text: 'Get someone to give a jury-style critique of a dance performance.' },
  { id: 'couple-startup',waves: ['night'], gangs: IDC, kind: 'say', difficulty: 4, text: 'Get someone to pitch a startup the couple should build together.' },

  // Cousins / family missions
  { id: 'nickname',      waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 2, text: 'Get someone to call you by your childhood nickname.' },
  { id: 'couple-nick',   waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 2, text: 'Get someone to tell you the bride or groom\'s childhood nickname.' },
  { id: 'kid-story',     waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 4, text: 'Get someone to tell a childhood story about the bride or groom.' },
  { id: 'summer-hols',   waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 3, text: 'Get someone to bring up summer holidays at ammamma\'s, nannamma\'s or paati\'s house.' },
  { id: 'your-turn',     waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 2, text: 'Get someone to say "next it\'s your turn" about getting married.' },
  { id: 'family-tree',   waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 3, text: 'Get someone to explain how two relatives here are related.' },
  { id: 'imitate-elder', waves: ['any'], gangs: COUSINS, kind: 'act', difficulty: 4, text: 'Get someone to imitate a family aunty or uncle.' },
  { id: 'family-group',  waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 1, text: 'Get someone to mention the family WhatsApp group.' },
  { id: 'cousin-fight',  waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 3, text: 'Get someone to bring up a childhood fight between cousins.' },
  { id: 'marks',         waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 1, text: 'Get someone to bring up exam marks, ranks or results.' },
  { id: 'grandma-dish',  waves: ['any'], gangs: COUSINS, kind: 'say', difficulty: 1, text: 'Get someone to name a dish nobody makes like their grandmother.' },
  { id: 'baby-photo',    waves: ['any'], gangs: COUSINS, kind: 'act', difficulty: 2, text: 'Get someone to show you a childhood photo of the bride or groom.' },
  { id: 'kolam',         waves: ['any'], gangs: COUSINS, kind: 'act', difficulty: 3, text: 'Get someone to draw a kolam or rangoli pattern on a napkin, paper or in the air.' },

  // WOW Friends
  { id: 'wow-class',       waves: ['any'], gangs: WOW, kind: 'say', difficulty: 1, text: 'Get someone to guess which WoW class the groom would play.' },
  { id: 'wow-hearthstone', waves: ['any'], gangs: WOW, kind: 'say', difficulty: 2, text: 'Get someone to pick a spot at the venue to set their hearthstone.' },
  { id: 'wow-quest',       waves: ['any'], gangs: WOW, kind: 'say', difficulty: 3, text: 'Get someone to give you a side quest you can finish at the wedding.' },
  { id: 'wow-mount',       waves: ['any'], gangs: WOW, kind: 'say', difficulty: 2, text: 'Get someone to choose a WoW mount for the groom\'s big entrance.' },
  { id: 'wow-murloc',      waves: ['any'], gangs: WOW, kind: 'act', difficulty: 3, text: 'Get someone to do their best murloc impression.' },
  { id: 'wow-achievement', waves: ['any'], gangs: WOW, kind: 'say', difficulty: 4, text: 'Get someone to invent a WoW achievement for the newlyweds.' },
  { id: 'wow-guild',       waves: ['any'], gangs: WOW, kind: 'say', difficulty: 3, text: 'Get someone to pitch a guild name for your wedding crew.' },
  { id: 'wow-gear',        waves: ['any'], gangs: WOW, kind: 'say', difficulty: 2, text: 'Get someone to give their wedding outfit an item level.' },
  { id: 'wow-raid-lead',   waves: ['any'], gangs: WOW, kind: 'say', difficulty: 3, text: 'Get someone to nominate a friend as raid leader for the wedding.' },
  { id: 'wow-expansion',   waves: ['any'], gangs: WOW, kind: 'say', difficulty: 1, text: 'Get someone to tell you which WoW expansion they would replay with this gang.' },
  { id: 'wow-dungeon',     waves: ['any'], gangs: WOW, kind: 'say', difficulty: 1, text: 'Get someone to name a WoW dungeon they could navigate from memory.' },
  { id: 'wow-pet',         waves: ['any'], gangs: WOW, kind: 'say', difficulty: 2, text: 'Get someone to pick a WoW pet they would bring as their plus-one.' },
  { id: 'wow-garland',     waves: ['reception'], gangs: WOW, kind: 'say', difficulty: 4, text: 'Get someone to invent a stat bonus for the couple\'s flower garlands.' },
  { id: 'wow-transmog',    waves: ['reception'], gangs: WOW, kind: 'say', difficulty: 3, text: 'Get someone to describe a silk saree or veshti as if it were a transmog set.' },
  { id: 'wow-ready-check', waves: ['reception'], gangs: WOW, kind: 'act', difficulty: 4, text: 'Get someone to call a ready check before a group photo.' },
  { id: 'wow-wipe',        waves: ['night'], gangs: WOW, kind: 'say', difficulty: 4, text: 'Get someone to retell the funniest raid wipe they remember.' },
  { id: 'wow-inn',         waves: ['night'], gangs: WOW, kind: 'say', difficulty: 2, text: 'Get someone to name a WoW inn where they would take this gang after the reception.' },
  { id: 'wow-dance',       waves: ['night'], gangs: WOW, kind: 'act', difficulty: 4, text: 'Get someone to do a WoW dance emote for you between songs.' },
  { id: 'wow-coffee-buff', waves: ['muhurtham'], gangs: WOW, kind: 'say', difficulty: 3, text: 'Get someone to name the buff they would give their morning filter coffee.' },
  { id: 'wow-kolam',       waves: ['muhurtham'], gangs: WOW, kind: 'act', difficulty: 3, text: 'Get someone to sketch a kolam inspired by a WoW class symbol.' },
  { id: 'wow-nadaswaram',  waves: ['muhurtham'], gangs: WOW, kind: 'say', difficulty: 2, text: 'Get someone to pick a WoW zone whose soundtrack would sound good on a nadaswaram.' },

  // Wedding missions — any wave
  { id: 'teach-word',    waves: ['any'], kind: 'say', difficulty: 2, text: 'Get someone to teach you a word in Telugu or Tamil.' },
  { id: 'machan',        waves: ['any'], kind: 'say', difficulty: 1, text: 'Get someone to call you "machan", "mama" or "bava".' },
  { id: 'groom-story',   waves: ['any'], kind: 'say', difficulty: 4, text: 'Get someone to tell you an embarrassing college story about the groom.' },
  { id: 'how-met',       waves: ['any'], kind: 'say', difficulty: 3, text: 'Get someone to tell you how the couple met.' },

  // Reception
  { id: 'payasam',       waves: ['reception'], kind: 'act', difficulty: 3, text: 'Get someone to take a second helping of payasam or dessert because you suggested it.' },
  { id: 'stage-pose',    waves: ['reception'], kind: 'act', difficulty: 2, text: 'Get someone to strike a pose you choose in a photo.' },
  { id: 'relative-selfie', waves: ['reception'], kind: 'act', difficulty: 4, text: 'Get someone to take a selfie with you and a relative of the couple they have never met.' },
  { id: 'outfit-shop',   waves: ['reception'], kind: 'say', difficulty: 1, text: 'Get someone to tell you where they bought their outfit.' },
  { id: 'fix-outfit',    waves: ['reception'], kind: 'act', difficulty: 2, text: 'Get someone to fix your hair, dupatta, pallu or veshti.' },
  { id: 'gift-guess',    waves: ['reception'], kind: 'say', difficulty: 2, text: 'Get someone to guess what is inside a wrapped gift.' },
  { id: 'banana-leaf',   waves: ['reception', 'muhurtham'], kind: 'say', difficulty: 3, text: 'Get someone to explain which way to fold the banana leaf after eating.' },
  { id: 'eat-hand',      waves: ['reception', 'muhurtham'], kind: 'act', difficulty: 2, text: 'Get someone to eat with their hand instead of a spoon.' },
  { id: 'muhurtham-word',waves: ['reception', 'night'], kind: 'say', difficulty: 1, text: 'Get someone to say "muhurtham".' },
  { id: 'thalaivar',     waves: ['reception', 'night'], kind: 'say', difficulty: 2, text: 'Get someone to say "Thalaivar" or "Mega Star".' },

  // Late night
  { id: 'hook-step',     waves: ['night'], kind: 'act', difficulty: 3, text: 'Get someone to do the hook step of a Telugu or Tamil song with you.' },
  { id: 'sing',          waves: ['night'], kind: 'act', difficulty: 4, text: 'Get someone to start singing (antakshari counts).' },
  { id: 'one-more-song', waves: ['night'], kind: 'say', difficulty: 1, text: 'Get someone to say "one more song".' },
  { id: 'not-sleepy',    waves: ['night'], kind: 'say', difficulty: 2, text: 'Get someone to say "I\'m not sleepy".' },
  { id: 'staring',       waves: ['night'], kind: 'act', difficulty: 2, text: 'Get someone into a 10-second staring contest.' },
  { id: 'last-photo',    waves: ['night'], kind: 'act', difficulty: 2, text: 'Get someone to show you the last photo on their phone.' },
  { id: 'floor-sit',     waves: ['night'], kind: 'act', difficulty: 1, text: 'Get someone to sit on the floor with you.' },
  { id: 'chai-run',      waves: ['night'], kind: 'act', difficulty: 3, text: 'Get someone to fetch you chai, coffee or water.' },
  { id: 'snack-share',   waves: ['night'], kind: 'act', difficulty: 2, text: 'Get someone to share their snack with you.' },

  // Muhurtham morning
  { id: 'subhodayam',    waves: ['muhurtham'], kind: 'say', difficulty: 1, text: 'Get someone to say "Subhodayam" or "Kaalai vanakkam".' },
  { id: 'filter-coffee', waves: ['muhurtham'], kind: 'act', difficulty: 3, text: 'Get someone to bring you filter coffee.' },
  { id: 'akshintalu',    waves: ['muhurtham'], kind: 'say', difficulty: 3, text: 'Get someone to explain what the akshintalu / akshathai rice is for.' },
  { id: 'barely-slept',  waves: ['muhurtham'], kind: 'say', difficulty: 2, text: 'Get someone to admit they barely slept.' },
  { id: 'ritual',        waves: ['muhurtham'], kind: 'say', difficulty: 4, text: 'Get someone to explain what is happening in the ritual right now.' },
  { id: 'nadaswaram',    waves: ['muhurtham'], kind: 'act', difficulty: 3, text: 'Get someone to hum along with the nadaswaram.' },
  { id: 'second-idli',   waves: ['muhurtham'], kind: 'say', difficulty: 2, text: 'Get someone to ask for a second idli, dosa or pongal.' },
  { id: 'yawn',          waves: ['muhurtham'], kind: 'act', difficulty: 1, text: 'Get someone to yawn right after you do.' },
  { id: 'mandap-photo',  waves: ['muhurtham'], kind: 'act', difficulty: 2, text: 'Get someone to take your photo with the mandap in the background.' },
  { id: 'wake-time',     waves: ['muhurtham'], kind: 'say', difficulty: 1, text: 'Get someone to tell you what time they woke up.' },
  ...uniqueMissions,
];

export const byId = Object.fromEntries(MISSIONS.map(m => [m.id, m]));

const T = s => Date.parse(s);

// Where the game is at time t: before | live | over. `deck` is the current time-of-day mission set.
export function phase(t, testMode = false) {
  const start = T(GAME.start), end = T(GAME.end);
  const inWindow = t >= start && t < end;
  if (!testMode && !inWindow) {
    return t < start ? { state: 'before', until: start } : { state: 'over' };
  }
  const deckTime = inWindow ? t : start;
  const deck = TIMES.filter(x => deckTime >= T(x.from)).at(-1).id;
  return testMode ? { state: 'live', deck } : { state: 'live', until: end, deck };
}

export const missionsFor = (waveId, gang) => MISSIONS.filter(m =>
  (m.waves.includes(waveId) || m.waves.includes('any')) && (!m.gangs || m.gangs.includes(gang)));

export function newPlayer(name, pin, gang, t) {
  return { name, pin, gang, score: 0, active: [], done: [], joinedAt: t };
}

const slotOf = mission => `${mission?.kind}:${mission?.difficulty}`;
const normalName = name => name.trim().toLowerCase();

// Assign each card to one roster position per gang before filtering by time.
// Separate phones can deal simultaneously without ever reserving the same card.
function eligibleMissions(p, deck, slot) {
  const roster = ROSTER.filter(player => player.gang === p.gang);
  const seat = roster.findIndex(player => normalName(player.name) === normalName(p.name));
  const offset = HAND_SLOTS.indexOf(slot) * 2;
  const bucket = uniqueMissions.filter(mission =>
    slotOf(mission) === slot && (!mission.gangs || mission.gangs.includes(p.gang)));
  return bucket.filter((mission, index) =>
    (!ROSTER.length || (index + offset) % roster.length === seat) &&
    (mission.waves.includes('any') || mission.waves.includes(deck)) &&
    !p.active.includes(mission.id) && !p.done.includes(mission.id));
}

function dealOne(p, deck, slot, rand) {
  const pool = eligibleMissions(p, deck, slot);
  const preferred = pool.filter(mission => mission.gangs || !mission.waves.includes('any'));
  const choices = preferred.length ? preferred : pool;
  return choices[Math.floor(rand() * choices.length)]?.id ?? null;
}

export const needsHand = (p, deck) => !p.handSlots || p.active.some((id, index) =>
  !id && eligibleMissions(p, deck, p.handSlots[index]).length > 0);

// Existing test hands may contain shared cards. Keep failed cards in their original
// slots, then give the remaining slots private missions, preserving scores and history.
export function refresh(p, deck, rand = Math.random) {
  if (p.handSlots) {
    const active = p.active.map((id, index) => id ?? dealOne(p, deck, p.handSlots[index], rand));
    return active.some((id, index) => id !== p.active[index]) ? { ...p, active } : null;
  }
  const slots = [...HAND_SLOTS];
  const active = Array(HAND).fill(null);
  const handSlots = Array(HAND);
  const overflow = [];
  for (const [index, id] of p.active.entries()) {
    if (!p.failed?.includes(id)) continue;
    active[index] = id;
    const mission = byId[id];
    handSlots[index] = slotOf(mission);
    const match = slots.indexOf(handSlots[index]);
    if (match >= 0) slots.splice(match, 1);
    else overflow.push(mission?.kind);
  }
  for (const kind of overflow) {
    const sameKind = slots.findIndex(slot => slot.startsWith(`${kind}:`));
    slots.splice(Math.max(0, sameKind), 1);
  }
  const q = { ...p, active, handSlots };
  for (let index = 0; index < HAND; index++) {
    if (active[index]) continue;
    handSlots[index] = slots.shift();
    active[index] = dealOne(q, deck, handSlots[index], rand);
  }
  return q;
}

// Returns { players: {id: newData}, event } for db.mutate.
export function gotEm(ps, meId, missionId, victim, deck, t, rand = Math.random) {
  const p = ps[meId];
  if (!p.active.includes(missionId) || p.failed?.includes(missionId)) throw new Error('That mission is no longer in play.');
  if (!victim || victim.id === meId) throw new Error('Pick who you got.');
  const q = { ...p, score: p.score + GAME.points, done: [...p.done, missionId], active: [...p.active] };
  const index = p.active.indexOf(missionId);
  const replacement = dealOne(q, deck, p.handSlots?.[index] ?? slotOf(byId[missionId]), rand);
  q.active[index] = replacement;
  return {
    players: { [meId]: q },
    replacement,
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
