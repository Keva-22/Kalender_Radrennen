import type { Zavod } from "../types";
import { cislo, nejdelsiTrasa, profilZavodu } from "../ui";
import { useTexty } from "../i18n";
import { dnesniDatum, jeBudouci } from "../prihlasky";

interface Props {
  zavody: Zavod[];
  mesic: string; // 'YYYY-MM'
  naKlik: (id: string) => void;
}

export function Mrizka({ zavody, mesic, naKlik }: Props) {
  const t = useTexty();
  const [rok, cisloMesice] = mesic.split("-").map(Number);
  // týden začíná pondělkem
  const posun = (new Date(rok, cisloMesice - 1, 1).getDay() + 6) % 7;
  const pocetDni = new Date(rok, cisloMesice, 0).getDate();
  const bunky: (number | null)[] = [
    ...Array<null>(posun).fill(null),
    ...Array.from({ length: pocetDni }, (_, i) => i + 1),
  ];
  const bezTerminu = zavody.filter((z) => !z.datum).length;
  const dnes = dnesniDatum();

  /* Stav závodu jako třídy: barva profilu, „?" u termínu k ověření,
     ztlumení u proběhlých. */
  function stav(z: Zavod): { profil: string; nejiste: boolean; probehlo: boolean } {
    const p = profilZavodu(z);
    const probehlo = !jeBudouci(z, dnes);
    return {
      profil: p ? p.profil.klic : "",
      nejiste: z.datum !== null && z.overeno === "check" && !probehlo,
      probehlo,
    };
  }

  return (
    <div className="mrizka-obal">
      <div className="mrizka-dny">
        {t.dnyMrizka.map((den) => (
          <div key={den}>{den}</div>
        ))}
      </div>
      <div className="mrizka">
        {bunky.map((den, i) => {
          if (den === null) return <div key={`prazdna-${i}`} />;
          const dnesni = zavody.filter(
            (z) => z.datum !== null && Number(z.datum.slice(8)) === den,
          );
          return (
            <div
              key={den}
              className={"mrizka-den" + (dnesni.length ? " se-zavodem" : "")}
            >
              <div className="mrizka-cislo">{den}</div>
              {dnesni.map((z) => {
                const s = stav(z);
                return (
                  <button
                    key={z.id}
                    className={
                      "mrizka-zavod" +
                      (s.profil ? ` okraj--${s.profil}` : "") +
                      (s.nejiste ? " mrizka-zavod--nejiste" : "") +
                      (s.probehlo ? " mrizka-zavod--probehlo" : "")
                    }
                    onClick={() => naKlik(z.id)}
                    title={s.nejiste ? `${z.nazev} (${t.terminKOvereni})` : z.nazev}
                    aria-label={s.nejiste ? `${z.nazev} (${t.terminKOvereni})` : z.nazev}
                  >
                    <span className="mrizka-zavod-nazev">{z.nazev}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {bezTerminu > 0 && (
        <div className="mrizka-tbc">{t.bezTerminu(bezTerminu)}</div>
      )}

      {/* Seznam závodů měsíce pod mřížkou. Na telefonu všechny (v buňkách
          jsou jen barevné značky), na širších displejích jen ty bez termínu. */}
      <ul className="mrizka-seznam">
        {zavody.map((z) => {
          const s = stav(z);
          const nejdelsi = nejdelsiTrasa(z);
          return (
            <li
              key={z.id}
              className={
                "mrizka-polozka" +
                (z.datum === null ? " mrizka-polozka--tbc" : "") +
                (s.probehlo ? " mrizka-polozka--probehlo" : "")
              }
            >
              <button onClick={() => naKlik(z.id)}>
                <span
                  className={
                    "mrizka-polozka-den" + (s.nejiste ? " mrizka-polozka-den--nejiste" : "")
                  }
                >
                  {z.datum !== null ? `${Number(z.datum.slice(8))}.` : t.tbc}
                  {s.nejiste && <span className="jen-ctecka"> {t.terminKOvereni}</span>}
                </span>
                <span
                  className={"mrizka-polozka-tecka" + (s.profil ? ` pruh--${s.profil}` : "")}
                  aria-hidden="true"
                />
                <span className="mrizka-polozka-nazev">{z.nazev}</span>
                {nejdelsi && <span className="mrizka-polozka-km">{cislo(nejdelsi.km)} km</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
