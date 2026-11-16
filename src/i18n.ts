import { createContext, useContext } from "react";
import type { Uzavirky, Zavod, Zeme } from "./types";
import type { KlicProfilu } from "./ui";

/* Přepínání jazyka bez knihovny: slovník textů rozhraní + volitelné
   německé a italské znění datových polí (Zavod.de, Zavod.it). Typ Texty
   zajistí, že když v jednom jazyce nějaký text chybí, build spadne. */

export type Jazyk = "cs" | "de" | "it";

export interface Texty {
  htmlLang: string;
  titulekStranky: string;
  znacka: string;
  nadpis1: string;
  nadpis2: string;
  popis: string;
  vyberJazyka: string;
  vse: string;
  seznam: string;
  kalendar: string;
  prazdno: string;
  legenda: string;
  poznamka: string;
  pocetZavodu: (pocet: number) => string;
  bezTerminu: (pocet: number) => string;
  mesice: string[];
  dnyZkratky: string[];   // indexováno podle Date.getDay(), neděle = 0
  dnyMrizka: string[];    // pondělí až neděle
  profily: Record<KlicProfilu, string>;
  uzavirky: Record<Uzavirky, string>;
  uzavreno: string;
  casovka: string;
  nedoplneno: string;
  tbc: string;
  sloupecTrasa: string;
  sloupecKm: string;
  sloupecHm: string;
  sloupecProfil: string;
  jednotkaHm: string;
  trasyNedoplneny: string;
  silnice: string;
  startovne: string;
  uzaverkaPrihlasek: string;
  oficialniWeb: string;
  odkazNedoplnen: string;
  zdroj: string;
  odkazPrihlasky: string;
  kdoJede: string;
  pocetZemi: (pocet: number) => string;
  nejblizsi: string;
  zaDni: (dni: number) => string;
  probehlo: string;
  terminKOvereni: string;
  nejblizsiZavod: string;
  sezonaNadpis: string;
  zemeNadpis: string;
  zobrazeniNadpis: string;
  mesiceNadpis: string;
  nazvyZemi: Record<Zeme, string>;
}

const CS: Texty = {
  htmlLang: "cs",
  titulekStranky: "Roadbook — silniční maratony střední Evropy",
  znacka: "Roadbook · pracovní název",
  nadpis1: "Silniční maratony",
  nadpis2: "střední Evropy",
  popis:
    "Velké hobby závody v Česku a Rakousku, plus příhraniční Německo, " +
    "Slovensko a Itálie a vybrané závody v Chorvatsku. Klikni na závod " +
    "pro trasy a odkaz na pořadatele.",
  vyberJazyka: "Jazyk",
  vse: "vše",
  seznam: "seznam",
  kalendar: "kalendář",
  prazdno:
    "Pro tuhle kombinaci zatím žádné závody nemáme. Zkus jinou zemi nebo sezónu.",
  legenda: "Profil = převýšení na kilometr",
  poznamka:
    "Termíny pocházejí z rychlé rešerše — před přihlášením si je ověř " +
    "u pořadatele. U každého závodu je uveden zdroj.",
  pocetZavodu: (n) =>
    `${n} ${n === 1 ? "závod" : n >= 2 && n <= 4 ? "závody" : "závodů"}`,
  bezTerminu: (n) => `+ ${n} bez potvrzeného termínu`,
  mesice: [
    "leden", "únor", "březen", "duben", "květen", "červen",
    "červenec", "srpen", "září", "říjen", "listopad", "prosinec",
  ],
  dnyZkratky: ["ne", "po", "út", "st", "čt", "pá", "so"],
  dnyMrizka: ["po", "út", "st", "čt", "pá", "so", "ne"],
  profily: {
    rovina: "rovina",
    zvlnena: "zvlněná",
    kopcovita: "kopcovitá",
    horska: "horská",
  },
  uzavirky: {
    plna: "Plně uzavřené silnice",
    castecna: "Částečně uzavřené",
    provoz: "Za provozu",
    nezname: "Uzavírky neověřeny",
  },
  uzavreno: "uzavřeno",
  casovka: "časovka",
  nedoplneno: "nedoplněno",
  tbc: "TBC",
  sloupecTrasa: "Trasa",
  sloupecKm: "km",
  sloupecHm: "hm",
  sloupecProfil: "profil",
  jednotkaHm: "hm",
  trasyNedoplneny: "Trasy zatím nedoplněny.",
  silnice: "Silnice",
  startovne: "Startovné",
  uzaverkaPrihlasek: "Uzávěrka přihlášek",
  oficialniWeb: "Oficiální web →",
  odkazNedoplnen: "odkaz nedoplněn",
  zdroj: "zdroj:",
  odkazPrihlasky: "Kdo jede na který závod? Přihlášky (v němčině) →",
  kdoJede: "Přihlásit se · kdo jede →",
  pocetZemi: (n) => `${n} ${n === 1 ? "země" : n >= 2 && n <= 4 ? "země" : "zemí"}`,
  nejblizsi: "Nejbližší",
  zaDni: (n) =>
    n === 0 ? "dnes" : n === 1 ? "zítra" : `za ${n} ${n >= 2 && n <= 4 ? "dny" : "dní"}`,
  probehlo: "proběhlo",
  terminKOvereni: "termín k ověření",
  nejblizsiZavod: "Nejbližší závod",
  sezonaNadpis: "Sezóna",
  zemeNadpis: "Země",
  zobrazeniNadpis: "Zobrazení",
  mesiceNadpis: "Přejít na měsíc",
  nazvyZemi: {
    CZ: "Česko",
    AT: "Rakousko",
    DE: "Německo",
    SK: "Slovensko",
    IT: "Itálie",
    HR: "Chorvatsko",
  },
};

const DE: Texty = {
  htmlLang: "de",
  titulekStranky: "Roadbook — Radmarathons in Mitteleuropa",
  znacka: "Roadbook · Arbeitstitel",
  nadpis1: "Radmarathons",
  nadpis2: "in Mitteleuropa",
  popis:
    "Große Jedermannrennen in Tschechien und Österreich, dazu grenznahe " +
    "Rennen in Deutschland, der Slowakei und Italien sowie ausgewählte " +
    "Rennen in Kroatien. Klick auf ein Rennen für Strecken und den Link " +
    "zum Veranstalter.",
  vyberJazyka: "Sprache",
  vse: "alle",
  seznam: "Liste",
  kalendar: "Kalender",
  prazdno:
    "Für diese Auswahl haben wir noch keine Rennen. Probier ein anderes " +
    "Land oder eine andere Saison.",
  legenda: "Profil = Höhenmeter pro Kilometer",
  poznamka:
    "Die Termine stammen aus einer schnellen Recherche — bitte vor der " +
    "Anmeldung beim Veranstalter prüfen. Bei jedem Rennen ist die Quelle " +
    "angegeben.",
  pocetZavodu: (n) => `${n} Rennen`,
  bezTerminu: (n) => `+ ${n} ohne bestätigten Termin`,
  mesice: [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ],
  dnyZkratky: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  dnyMrizka: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  profily: {
    rovina: "flach",
    zvlnena: "wellig",
    kopcovita: "hügelig",
    horska: "bergig",
  },
  uzavirky: {
    plna: "Straßen komplett gesperrt",
    castecna: "Teilweise gesperrt",
    provoz: "Bei laufendem Verkehr",
    nezname: "Sperren nicht bestätigt",
  },
  uzavreno: "gesperrt",
  casovka: "Zeitfahren",
  nedoplneno: "keine Angabe",
  tbc: "TBC",
  sloupecTrasa: "Strecke",
  sloupecKm: "km",
  sloupecHm: "Hm",
  sloupecProfil: "Profil",
  jednotkaHm: "Hm",
  trasyNedoplneny: "Strecken noch nicht erfasst.",
  silnice: "Straßen",
  startovne: "Startgeld",
  uzaverkaPrihlasek: "Anmeldeschluss",
  oficialniWeb: "Offizielle Website →",
  odkazNedoplnen: "kein Link hinterlegt",
  zdroj: "Quelle:",
  odkazPrihlasky: "Wer fährt mit? Zu den Anmeldungen →",
  kdoJede: "Anmelden · wer fährt mit →",
  pocetZemi: (n) => `${n} ${n === 1 ? "Land" : "Länder"}`,
  nejblizsi: "Nächstes",
  zaDni: (n) => (n === 0 ? "heute" : n === 1 ? "morgen" : `in ${n} Tagen`),
  probehlo: "vorbei",
  terminKOvereni: "Termin unbestätigt",
  nejblizsiZavod: "Nächstes Rennen",
  sezonaNadpis: "Saison",
  zemeNadpis: "Länder",
  zobrazeniNadpis: "Ansicht",
  mesiceNadpis: "Zum Monat",
  nazvyZemi: {
    CZ: "Tschechien",
    AT: "Österreich",
    DE: "Deutschland",
    SK: "Slowakei",
    IT: "Italien",
    HR: "Kroatien",
  },
};

const IT: Texty = {
  htmlLang: "it",
  titulekStranky: "Roadbook — granfondo dell'Europa centrale",
  znacka: "Roadbook · titolo provvisorio",
  nadpis1: "Granfondo",
  nadpis2: "dell'Europa centrale",
  popis:
    "Grandi gare amatoriali in Repubblica Ceca e Austria, più le zone di " +
    "confine di Germania, Slovacchia e Italia e una selezione di gare in " +
    "Croazia. Clicca su una gara per i percorsi e il link all'organizzatore.",
  vyberJazyka: "Lingua",
  vse: "tutti",
  seznam: "elenco",
  kalendar: "calendario",
  prazdno:
    "Per questa selezione non abbiamo ancora gare. Prova un altro paese " +
    "o un'altra stagione.",
  legenda: "Profilo = dislivello per chilometro",
  poznamka:
    "Le date provengono da una ricerca rapida — verificale presso " +
    "l'organizzatore prima di iscriverti. Per ogni gara è indicata la fonte.",
  pocetZavodu: (n) => `${n} ${n === 1 ? "gara" : "gare"}`,
  bezTerminu: (n) => `+ ${n} senza data confermata`,
  mesice: [
    "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
    "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
  ],
  dnyZkratky: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  dnyMrizka: ["lun", "mar", "mer", "gio", "ven", "sab", "dom"],
  profily: {
    rovina: "pianeggiante",
    zvlnena: "ondulato",
    kopcovita: "collinare",
    horska: "montagna",
  },
  uzavirky: {
    plna: "Strade completamente chiuse",
    castecna: "Strade parzialmente chiuse",
    provoz: "Strade aperte al traffico",
    nezname: "Chiusure non verificate",
  },
  uzavreno: "strade chiuse",
  casovka: "cronometro",
  nedoplneno: "n.d.",
  tbc: "TBC",
  sloupecTrasa: "Percorso",
  sloupecKm: "km",
  sloupecHm: "disl.",
  sloupecProfil: "profilo",
  jednotkaHm: "m",
  trasyNedoplneny: "Percorsi non ancora inseriti.",
  silnice: "Strade",
  startovne: "Iscrizione",
  uzaverkaPrihlasek: "Chiusura iscrizioni",
  oficialniWeb: "Sito ufficiale →",
  odkazNedoplnen: "link non disponibile",
  zdroj: "fonte:",
  odkazPrihlasky: "Chi partecipa? Iscrizioni (in tedesco) →",
  kdoJede: "Iscriviti · chi partecipa →",
  pocetZemi: (n) => `${n} ${n === 1 ? "paese" : "paesi"}`,
  nejblizsi: "Prossima",
  zaDni: (n) => (n === 0 ? "oggi" : n === 1 ? "domani" : `tra ${n} giorni`),
  probehlo: "conclusa",
  terminKOvereni: "data da confermare",
  nejblizsiZavod: "Prossima gara",
  sezonaNadpis: "Stagione",
  zemeNadpis: "Paesi",
  zobrazeniNadpis: "Vista",
  mesiceNadpis: "Vai al mese",
  nazvyZemi: {
    CZ: "Rep. Ceca",
    AT: "Austria",
    DE: "Germania",
    SK: "Slovacchia",
    IT: "Italia",
    HR: "Croazia",
  },
};

export const TEXTY: Record<Jazyk, Texty> = { cs: CS, de: DE, it: IT };

/** Každý jazyk se nabízí svým vlastním jménem. */
export const NAZVY_JAZYKU: Record<Jazyk, string> = {
  cs: "Česky",
  de: "Deutsch",
  it: "Italiano",
};

const JAZYKY_ULOZENE: readonly string[] = ["cs", "de", "it"];

const KLIC_ULOZISTE = "roadbook-jazyk";

/** Uložená volba, jinak jazyk prohlížeče (německy a italsky mluvícím
    rovnou jejich jazyk, ostatním čeština). */
export function vychoziJazyk(): Jazyk {
  try {
    const ulozeny = window.localStorage.getItem(KLIC_ULOZISTE);
    if (ulozeny && JAZYKY_ULOZENE.includes(ulozeny)) return ulozeny as Jazyk;
  } catch {
    // úložiště nedostupné (soukromé okno, zablokovaná data) — jen se nepamatuje
  }
  const prohlizec = (navigator.language || "").toLowerCase();
  if (prohlizec.startsWith("de")) return "de";
  if (prohlizec.startsWith("it")) return "it";
  return "cs";
}

export function ulozJazyk(jazyk: Jazyk): void {
  try {
    window.localStorage.setItem(KLIC_ULOZISTE, jazyk);
  } catch {
    // viz vychoziJazyk
  }
}

/** Závod s textovými poli v daném jazyce; chybějící překlad = originál. */
export function lokalizujZavod(z: Zavod, jazyk: Jazyk): Zavod {
  const d = jazyk === "cs" ? undefined : z[jazyk];
  if (d === undefined) return z;
  return {
    ...z,
    nazev: d.nazev ?? z.nazev,
    misto: d.misto ?? z.misto,
    region: d.region ?? z.region,
    startovne: d.startovne ?? z.startovne,
    zdroj: d.zdroj ?? z.zdroj,
    trasy: d.trasy
      ? z.trasy.map((t, i) => ({ ...t, nazev: d.trasy?.[i] ?? t.nazev }))
      : z.trasy,
  };
}

export const TextyContext = createContext<Texty>(CS);

export function useTexty(): Texty {
  return useContext(TextyContext);
}
