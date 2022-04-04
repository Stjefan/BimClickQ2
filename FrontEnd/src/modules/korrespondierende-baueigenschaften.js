// Node Module korrespondierende-baueigenschaften.js

// Definiert Zuordnungen (Mapping, eingeteilt nach Baustoff-Baueigenschaftsprofilen) zwischen Baustoff-Baueigenschaften (Werte an einem
// einer Baueinheit zugeordneten Baustoff, z.B. einem Estrich) zu korrespondierenden Baueinheits-Baueigenschaften (Sollwerte bzw.
// Istwerte an einer Baueinheit, z.B. "Schicht" mit Schichttyp "Estrich").

// Bei Aufzählungswerten, welche bestimmte Klassen repräsentieren, werden an Baueinheiten dafür getrennte
// Baueigenschaften für die Sollwerte und Istwerte vorgehalten - Beispiel:
// - "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Sollwert"
// - "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Istwert"
// Damit kann abgebildet werden, dass z.B. ein einer Baueinheit "Schicht" zugeordneter Baustoff einen höheren Wert für die Biegezugfestigkeitsklasse
// mitbringt als der Sollwert an der Schicht. Der vom Baustoff mitgebrachte Werte kann dann in das Istwert-Feld an der Baueinheit eingetragen werden.
// Bei anderen Baueigenschaften werden keine getrennten Baueigenschaften für Soll- und Istwerte an Baueinheiten vorgehalten.
// Dies wird in der Datenstruktur unten entsprechend reflektiert.

// HINWEIS: Multiline Strings sind in ES6 mögich mit Backticks "`":  `Say hello to multiline strings!` - dieser String kann dann über mehrere Zeilen
// verteilt werden, z.B. für Markdown Content im String, siehe https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
// Dito kann mit "\r\n" ein Line Feed in den String eingfügt werden

// JS Maps dafür benutzen?
// https://2ality.com/2015/08/es6-map-json.html - JS Maps von/nach JSON

const korrespondierendeBaueigenschaften = [
  {
    baueigenschaftsProfilBezeichnung: "Baustoff > Estrich",
    baustoffZuBaueinheitZuordnungen: [
      // NEU - #380: BEg gelöscht
      /*
      { wertAnBaustoff: "Baustoff > Estrich > Bauart", // NEU - #380: Aus Baustoffprofil "Baustoff > Estrich" und hier aus korrespondierenden BEgs entfernen, gilt nur an "Baueinheit > Schicht > Estrich"!
        sollwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Bauart",
        istwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Bauart"
      },
      */
      { wertAnBaustoff: "Baustoff > Estrich > Bindemittelart",
        sollwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Bindemittelart",
        istwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Bindemittelart"
      },
      { wertAnBaustoff: "Baustoff > Estrich > Einbauart",
        sollwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Einbauart",
        istwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Einbauart"
      },
      { wertAnBaustoff: "Baustoff > Estrich > Biegezugfestigkeitsklasse",
        sollwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Sollwert",
        istwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Istwert" // ACHTUNG: BEg existiert an Schicht und wird angezeigt im Schicht-Profilformular!
      },
      { wertAnBaustoff: "Baustoff > Estrich > Härteklasse",
        sollwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Härteklasse > Sollwert",
        istwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Härteklasse > Istwert" // ACHTUNG: BEg existiert an Schicht und wird angezeigt im Schicht-Profilformular!
      },
      { wertAnBaustoff: "Baustoff > Estrich > Druckfestigkeitsklasse",
        sollwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Druckfestigkeitsklasse > Sollwert", // ACHTUNG: BEg existiert noch nicht an Schicht,
        // der Code in filter-generisches-baueigenschafts-profil-formular.ladeSollwerteAusAusgewaehlterBaueinheit() fängt es aber ab
        istwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Druckfestigkeitsklasse > Istwert" // ACHTUNG: BEg existiert noch nicht an Schicht,
        // in read-only-generisches-baueigenschafts-profil-formular.uebertrageWerteAusBaustoffInAusgewaehlteBaueinheit() fängt es aber ab!
      },
      { wertAnBaustoff: "Baustoff > Estrich > Oberflächenhärteklasse",
        sollwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Oberflächenhärteklasse > Sollwert", // ACHTUNG: BEg existiert noch nicht an Schicht,
        // der Code in filter-generisches-baueigenschafts-profil-formular.ladeSollwerteAusAusgewaehlterBaueinheit() und
        istwertAnBaueinheit: "Baueinheit > Schicht > Estrich > Oberflächenhärteklasse > Istwert" // ACHTUNG: BEg existiert noch nicht an Schicht,
        // in read-only-generisches-baueigenschafts-profil-formular.uebertrageWerteAusBaustoffInAusgewaehlteBaueinheit() fängt es aber ab!

      }
    ]
  }
];

// Exportiere die Zuordnungen zur Verwendung durch andere -- diese müssen sie mit Node "require" oder "import" bei sich inkludieren
module.exports = korrespondierendeBaueigenschaften;
