# SK Bělá pod Bezdězem – U15 (webová stránka)

Statická stránka (funguje zdarma na GitHub Pages), která si data o zápasech
a docházce natahuje přímo z Google tabulky. Soupisku hráčů, zápasy a
docházku upravuješ **jen v Google tabulce** – na stránce nic neupravuješ.

## 1. Nahrání na GitHub

1. Vytvoř si na [github.com](https://github.com) nový repozitář, např. `sk-bela-u15`.
2. Nahraj do něj všechny soubory z této složky (`index.html`, `hraci.html`,
   `zapasy.html`, `style.css`, `app.js`, `config.js`).
3. V repozitáři jdi do **Settings → Pages**, u „Source“ vyber větev `main`
   a složku `/ (root)`, ulož.
4. Za pár minut ti GitHub vygeneruje adresu typu
   `https://tvuj-ucet.github.io/sk-bela-u15/` – to je hotová stránka.

## 2. Google tabulka – struktura

Vytvoř jednu Google tabulku se **třemi listy (záložkami)** přesně
pojmenovanými takto:

### Záložka „Hraci“
| Jméno | Ročník |
|---|---|
| Vladimír Bican | 2011 |
| Lukáš Hejcman | 2011 |

### Záložka „Zapasy“
| Datum | Čas | Soupeř | Domácí/Venku | Místo | Výsledek_My | Výsledek_Soupeř | Nominace | Střelci |
|---|---|---|---|---|---|---|---|---|
| 14.9.2026 | 10:00 | Doksy | Doma | Hřiště Bělá | | | | |
| 6.9.2026 | 10:00 | Mimoň | Venku | Mimoň | 3 | 1 | Bican;Hejcman;Novák | Bican:2;Novák:1 |

- Dokud jsou `Výsledek_My` / `Výsledek_Soupeř` prázdné, zápas se bere jako
  budoucí. Jakmile je po zápase vyplníš, přesune se mezi odehrané a na
  hlavní stránce se u posledního zápasu zobrazí zápis.
- **Nominace** a **Střelci** píšeš jako jména oddělená středníkem `;`.
  U střelců jde formát `Jméno:počet_gólů`.

### Záložka „Dochazka“
| Datum | Jméno | Stav |
|---|---|---|
| 2.9.2026 | Vladimír Bican | Přítomen |
| 2.9.2026 | Lukáš Hejcman | Omluven |
| 2.9.2026 | Lukáš Hrdina | Neomluven |
| 5.9.2026 | VŠICHNI | Zrušeno |

- Za každý trénink uděláš jeden řádek na hráče se stavem: `Přítomen`,
  `Omluven` nebo `Neomluven`.
- Pokud se trénink celý zrušil, stačí **jeden řádek** s `Jméno = VŠICHNI`
  a `Stav = Zrušeno` – ten den se pak nikomu nezapočítá do docházky.

## 3. Publikování tabulky jako CSV

Pro **každou ze 3 záložek** zvlášť:

1. Otevři danou záložku (musí být aktivní/vybraná).
2. Soubor → Sdílet → **Publikovat na web**.
3. V prvním rozbalovacím menu vyber konkrétní záložku (ne „Celý dokument“).
4. Ve druhém menu vyber **Hodnoty oddělené čárkou (.csv)**.
5. Klikni Publikovat, potvrď, a zkopíruj vygenerovaný odkaz.

## 4. Propojení stránky s tabulkou

Otevři soubor `config.js` a vlož 3 zkopírované odkazy sem:

```js
const SHEET_URLS = {
  players: "ODKAZ_NA_HRACI_CSV",
  matches: "ODKAZ_NA_ZAPASY_CSV",
  attendance: "ODKAZ_NA_DOCHAZKU_CSV"
};
```

Ulož a nahraj na GitHub – stránka se od teď automaticky aktualizuje
podle toho, co napíšeš do tabulky (může trvat pár minut, než se
publikovaná verze v Google Sheets sama obnoví).

## Poznámka

Dokud tabulku nepropojíš, stránka zobrazuje jen počáteční soupisku
hráčů (zadanou přímo v `config.js`) bez zápasů a docházky.
