/* ============================================================
   SK Bělá U15 – sdílená logika
   Data se buď natáhnou z Google tabulek (CSV export), nebo se
   použije počáteční soupiska ze SEED_PLAYERS (config.js).
   ============================================================ */

const STATUS = {
  PRITOMEN: "Přítomen",
  OMLUVEN: "Omluven",
  NEOMLUVEN: "Neomluven",
  ZRUSENO: "Zrušeno"
};

function parseDate(str) {
  if (!str) return null;
  str = str.trim();
  // D.M.YYYY nebo DD.MM.YYYY
  let m = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
  // YYYY-MM-DD
  m = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  const d = new Date(str);
  return isNaN(d) ? null : d;
}

function fmtDate(d) {
  if (!d) return "";
  return d.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" });
}

function todayMidnight() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

function fetchCSV(url) {
  return new Promise((resolve) => {
    if (!url) return resolve([]);
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data || []),
      error: () => resolve([])
    });
  });
}

async function loadAllData() {
  const [playersRaw, matchesRaw, attendanceRaw] = await Promise.all([
    fetchCSV(SHEET_URLS.players),
    fetchCSV(SHEET_URLS.matches),
    fetchCSV(SHEET_URLS.attendance)
  ]);

  const usingSheet = playersRaw.length > 0;
  const players = usingSheet
    ? playersRaw
        .filter((r) => r["Jméno"] || r["Jmeno"])
        .map((r) => ({
          jmeno: (r["Jméno"] || r["Jmeno"] || "").trim(),
          rocnik: (r["Ročník"] || r["Rocnik"] || "").toString().trim()
        }))
    : SEED_PLAYERS.map((p) => ({ jmeno: p.jmeno, rocnik: String(p.rocnik) }));

  const matches = matchesRaw
    .filter((r) => r["Datum"])
    .map((r) => ({
      datum: parseDate(r["Datum"]),
      datumRaw: r["Datum"],
      cas: (r["Čas"] || r["Cas"] || "").trim(),
      soupeř: (r["Soupeř"] || r["Souper"] || "").trim(),
      typ: (r["Domácí/Venku"] || r["Doma/Venku"] || "").trim(),
      misto: (r["Místo"] || r["Misto"] || "").trim(),
      myGoly: r["Výsledek_My"] ?? r["Vysledek_My"] ?? "",
      soupGoly: r["Výsledek_Soupeř"] ?? r["Vysledek_Souper"] ?? "",
      nominace: (r["Nominace"] || "").split(";").map((s) => s.trim()).filter(Boolean),
      strelci: (r["Střelci"] || r["Strelci"] || "").split(";").map((s) => s.trim()).filter(Boolean)
    }))
    .sort((a, b) => (a.datum && b.datum ? a.datum - b.datum : 0));

  const attendance = attendanceRaw
    .filter((r) => r["Datum"])
    .map((r) => ({
      datum: parseDate(r["Datum"]),
      jmeno: (r["Jméno"] || r["Jmeno"] || "").trim(),
      stav: (r["Stav"] || "").trim()
    }));

  return { players, matches, attendance, usingSheet };
}

// Vrátí docházkové statistiky pro daného hráče
function playerAttendanceStats(jmeno, attendance) {
  const cancelledDates = new Set(
    attendance
      .filter((a) => a.stav === STATUS.ZRUSENO && /^(všichni|vsichni|all)$/i.test(a.jmeno))
      .map((a) => a.datum && a.datum.getTime())
  );

  const rows = attendance
    .filter((a) => a.jmeno === jmeno)
    .filter((a) => a.stav !== STATUS.ZRUSENO)
    .filter((a) => !cancelledDates.has(a.datum && a.datum.getTime()))
    .sort((a, b) => (a.datum && b.datum ? a.datum - b.datum : 0));

  const total = rows.length;
  const present = rows.filter((r) => r.stav === STATUS.PRITOMEN).length;
  const pct = total > 0 ? Math.round((present / total) * 100) : null;

  const last8 = rows.slice(-8).map((r) => {
    if (r.stav === STATUS.PRITOMEN) return "p";
    if (r.stav === STATUS.OMLUVEN) return "o";
    if (r.stav === STATUS.NEOMLUVEN) return "n";
    return "c";
  });

  return { total, present, pct, form: last8 };
}

function upcomingMatches(matches, count) {
  const today = todayMidnight();
  return matches.filter((m) => m.datum && m.datum >= today).slice(0, count);
}

function pastMatches(matches) {
  const today = todayMidnight();
  return matches
    .filter((m) => m.datum && m.datum < today)
    .sort((a, b) => b.datum - a.datum);
}

function renderNav(active) {
  const links = [
    { href: "index.html", label: "Domů" },
    { href: "hraci.html", label: "Hráči" },
    { href: "zapasy.html", label: "Zápasy" }
  ];
  return links
    .map(
      (l) =>
        `<a href="${l.href}" class="${l.href === active ? "active" : ""}">${l.label}</a>`
    )
    .join("");
}
