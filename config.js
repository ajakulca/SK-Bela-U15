// ===================== NASTAVENÍ =====================
// Až si založíš Google tabulku (návod je v README.md), vlož sem
// 3 odkazy, které dostaneš přes „Soubor -> Sdílet -> Publikovat na web“
// pro každou ze 3 záložek (Hráči, Zápasy, Docházka), formát CSV.
//
// Dokud tu zůstanou prázdné (""), stránka použije počáteční seznam
// hráčů níže (SEED_PLAYERS) a žádné zápasy/docházku.

const SHEET_URLS = {
  players: "",     // záložka "Hraci"
  matches: "",     // záložka "Zapasy"
  attendance: ""   // záložka "Dochazka"
};

// Počáteční soupiska (použije se, dokud není napojená Google tabulka)
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
