// Paste your Supabase project URL and key here (Supabase → Project Settings → API Keys / Data API).
// Use the "anon" or "publishable" key, never the secret / service_role one.
// While url still says PASTE_..., the game runs in DEMO mode: data lives only in this browser.
export const SUPABASE = {
  url: 'https://ltowznxoadjfjmofbnwt.supabase.co',
  key: 'sb_publishable_wNTKSqiw7EvT4sGVLfgExQ_4WS2PwTa',
};

export const TITLE = 'Kalyanam Covert Ops';

// One entry per gang. Missions can target a gang via `gangs: ['idc']` in rules.js.
export const GANGS = [
  { id: 'idc', name: 'Loky IDC friends' },
  { id: 'cousins', name: 'Cousins' },
  { id: 'wow', name: 'WOW Friends' },
  { id: 'somi-sis', name: 'Somi Sis friends' },
];

// Everyone who can play. Players join by tapping their photo and entering their PIN.
//   name:  shown in the game (keep it unique within each gang)
//   gang:  a gang id from GANGS
//   pin:   4 digits as a string; send it to that person privately
//   photo: optional square-ish JPG (~300px) in photos/; without it they get coloured initials
// Leave the list empty to fall back to "type your name + choose a PIN" (handy for testing).
// ponytail: PINs live in this public file; fine for a party game, not for anything secret.
export const ROSTER = [
  // { name: 'Arjun', gang: 'idc', pin: '4821', photo: 'photos/arjun.jpg' },
  // Gang 1: Loky IDC friends
  { name: 'Anurag',  gang: 'idc', pin: '3392' },
  { name: 'Krishna', gang: 'idc', pin: '8201' },
  { name: 'Parth',   gang: 'idc', pin: '5229' },
  { name: 'Somoyo',  gang: 'idc', pin: '9185' },
  { name: 'Sam',     gang: 'idc', pin: '5458' },
  { name: 'Neha',    gang: 'idc', pin: '5594' },
  { name: 'Achyuth', gang: 'idc', pin: '9580' },
  { name: 'Deepika', gang: 'idc', pin: '5038' },
  { name: 'Shobith', gang: 'idc', pin: '7152' },
  { name: 'Biren',   gang: 'idc', pin: '0332' },
  { name: 'Nikitha', gang: 'idc', pin: '2837' },
  { name: 'Suriya',  gang: 'idc', pin: '4719' },
  { name: 'Sandy',   gang: 'idc', pin: '1863' },
  { name: 'Jaanhvi', gang: 'idc', pin: '6407' },
  // Gang 2: Cousins
  { name: 'Somi',      gang: 'cousins', pin: '2746' },
  { name: 'Moni',      gang: 'cousins', pin: '8159' },
  { name: 'Giri',      gang: 'cousins', pin: '3604' },
  { name: 'Jagan',     gang: 'cousins', pin: '7281' },
  { name: 'Navya',     gang: 'cousins', pin: '9437' },
  { name: 'Govardhan', gang: 'cousins', pin: '1590' },
  { name: 'Neetra',    gang: 'cousins', pin: '6823' },
  { name: 'Chandna',   gang: 'cousins', pin: '4065' },
  { name: 'Monica',    gang: 'cousins', pin: '5917' },
  { name: 'Vaishnavi', gang: 'cousins', pin: '0748' },
  { name: 'Arujun',    gang: 'cousins', pin: '3176' },
  { name: 'Dinesh',    gang: 'cousins', pin: '8642' },
  { name: 'Pranava',   gang: 'cousins', pin: '2309' },
  { name: 'Varshita',  gang: 'cousins', pin: '7954' },
  { name: 'Tej Kiren', gang: 'cousins', pin: '6185' },
  { name: 'Logitha',   gang: 'cousins', pin: '4530' },
  // Gang 3: WOW Friends
  { name: 'Mithelesh', gang: 'wow', pin: '9044' },
  { name: 'Bharath',   gang: 'wow', pin: '7311' },
  { name: 'Ravi',      gang: 'wow', pin: '0758' },
  { name: 'Suriya',    gang: 'wow', pin: '9369' },
  { name: 'Addy',      gang: 'wow', pin: '6302' },
  { name: 'Vicky',     gang: 'wow', pin: '8036' },
  // Gang 4: Somi Sis friends
  { name: 'Suba',        gang: 'somi-sis', pin: '4898' },
  { name: 'Shruthi',     gang: 'somi-sis', pin: '5019' },
  { name: 'Nidhi',       gang: 'somi-sis', pin: '2950' },
  { name: 'Shreyas',     gang: 'somi-sis', pin: '5928' },
  { name: 'Faheem',      gang: 'somi-sis', pin: '7187' },
  { name: 'Praneeth',    gang: 'somi-sis', pin: '3223' },
  { name: 'Shashi',      gang: 'somi-sis', pin: '6248' },
  { name: 'Sid',         gang: 'somi-sis', pin: '2064' },
  { name: 'Avadi (sid)', gang: 'somi-sis', pin: '8748' },
  { name: 'Sailesh',     gang: 'somi-sis', pin: '0393' },
  { name: 'Sesha',       gang: 'somi-sis', pin: '3798' },
  { name: 'Shervin',     gang: 'somi-sis', pin: '0789' },
  { name: 'Nithesh',     gang: 'somi-sis', pin: '7686' },
  { name: 'Karthick',    gang: 'somi-sis', pin: '5751' },
  { name: 'Kaushik',     gang: 'somi-sis', pin: '3601' },
  { name: 'Keerthi',     gang: 'somi-sis', pin: '4798' },
];

// Change to start a fresh game (e.g. 'wedding' after testing). Old data stays under the old id.
export const GAME_ID = 'test1';
export const TEST_MODE = GAME_ID === 'test1';

