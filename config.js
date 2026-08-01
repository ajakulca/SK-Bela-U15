// ===================== NASTAVENÍ =====================
// Odkazy na Google tabulku (publikováno jako CSV, záložky Hraci / Zapasy / Dochazka).

const SHEET_URLS = {
  players: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTV_cJS_3YQHtPVkKBVnK1r7hbc0GsZcehv1NlH4R0Rs5VLBO3qZUVaVbduY4urRQ/pub?gid=1994099146&single=true&output=csv",
  matches: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTV_cJS_3YQHtPVkKBVnK1r7hbc0GsZcehv1NlH4R0Rs5VLBO3qZUVaVbduY4urRQ/pub?gid=1262838216&single=true&output=csv",
  attendance: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTV_cJS_3YQHtPVkKBVnK1r7hbc0GsZcehv1NlH4R0Rs5VLBO3qZUVaVbduY4urRQ/pub?gid=551345061&single=true&output=csv"
};

// Počáteční soupiska – použije se jen tehdy, pokud by se z Google tabulky
// z nějakého důvodu nepodařilo hráče načíst.
const SEED_PLAYERS = [
  { jmeno: "Vladimír Bican", rocnik: 2011 },
  { jmeno: "Lukáš Hejcman", rocnik: 2011 },
  { jmeno: "Lukáš Hrdina", rocnik: 2011 },
  { jmeno: "Matěj Mencl", rocnik: 2011 },
  { jmeno: "Josef Novák", rocnik: 2011 },
  { jmeno: "Aneta Smékalová", rocnik: 2011 },
  { jmeno: "Libor Bárta", rocnik: 2012 },
  { jmeno: "Roman Beitl", rocnik: 2012 },
  { jmeno: "Jakub Bock", rocnik: 2012 },
  { jmeno: "Dominik Glaser", rocnik: 2012 },
  { jmeno: "Matěj Chocholouš", rocnik: 2012 },
  { jmeno: "Matyáš Jurička", rocnik: 2012 },
  { jmeno: "Aleš Komárek", rocnik: 2012 },
  { jmeno: "Eliáš Pičman", rocnik: 2012 },
  { jmeno: "Anežka Jirdásková", rocnik: 2012 },
  { jmeno: "Jakub Straka", rocnik: 2013 },
  { jmeno: "Šimon Bartoníček", rocnik: 2013 }
];
