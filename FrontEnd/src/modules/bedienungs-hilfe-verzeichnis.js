// Node Module bedienungs-hilfe-verzeichnis.js
//
// Definiert und exportiert hierarchisches bedienungsHilfeVerzeichnis mit Kontexthilfethemen, bestehend aus id, ref, title, icon, markdown, sowie children
// Konsumierbar mit: const bedienungsHilfeVerzeichnis = require("../pages/bedienungsHilfeVerzeichnis");

// Die Inhalte für den Markdown kommen aus passend benannten .md Dateien (es sind Strings mit Markdown-Inhalt)

// ACHTUNG: Das Feld ref wird für die Identifikation der zugehörigen q-expansion-items zur Anzeige verwendet
// Es muss eindeutig sein, und darf keine "." und "-" enthalten!!!

// TODO: Import von Markdown Files direkt hier:
// Z.B. Per "require file as string: https://stackoverflow.com/questions/12752622/require-file-as-string
// Funktionierte allerdings nicht, Fehler zur Laufzeit - vermutlich weil das bedienungsHilfeVerzeichnis als const definiert wird bzw. werden muss in MyLayout.vue
// Ungelöstes Problem!!!

// Stattdessen 2 mögliche Lösungen getestet:

// a) Hier im bedienungsHilfeVerzeichnis den Markdown als Multiline String direkt einbetten mittels markdown: `==Multiline markdown string==`
//    HINWEIS: Multiline Strings sind in ES6 mögich mit Backticks "`":  `Say hello to multiline strings!` - dieser String kann dann über mehrere Zeilen
//    verteilt werden, z.B. für Markdown Content im String, siehe https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
//    Außerdem kann mit "\r\n" ein Line Feed in den String eingfügt werden!

// b) (Aktuell gewählte Variante) Per Feld "id" das zugehörige Markdown File in myLayout.vue identifizieren (alle Markdown Files müssen dann dort importiert werden)
//    und das richtige Pendant dafür in data: per v-if am <q-Markdown> selektieren

const bedienungsHilfeVerzeichnis = [
  {
    id: "1-Bauvorhaben",
    ref: "ref_1_Bauvorhaben",
    title: "Bauvorhaben",
    // icon: "img:statics/icons/Bauvorhaben-Icon.svg",
    icon: "apartment" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "1-Baustoffe",
    ref: "ref_1_Baustoffe",
    title: "Baustoffe",
    // icon: "img:statics/icons/Baustoffe-Icon.svg",
    icon: "build", // Von https://material.io/resources/icons/?style=baseline
    children: [
      // ACHTUNG: Angaben für den Baustofbaum müssen im <q-expansion-item> an dieser Stelle in eine <q-item-section>, da für alle children relevant!!!
      {
        id: "1.1-Strukturierungsangaben",
        ref: "ref_1_1_Strukturierungsangaben",
        title: "Strukturierungsangaben"
      },
      {
        id: "1.2-Baueigenschaften",
        ref: "ref_1_2_Baueigenschaften",
        title: "Baueeigenschaften",
        children: [
          {
            id: "1.2.1-Übersicht",
            ref: "ref_1_2_1_Uebersicht",
            title: "Übersicht",
            markdown: "==Hallo==" // TODO - Dummy
          },
          {
            id: "1.2.2-Auswahl",
            ref: "ref_1_2_2_Auswahl",
            title: "Auswahl",
            markdown: "==Hallo==", // TODO - Dummy
            markdownFileName: "KontextHilfe1"
            /*
            markdown: `::: tip Hinweise zu Baueigenschaften

- Die Angaben in den linken beiden Spalten beziehen sich auf den <strong>Typ</strong> der Baueigenschaft und sind im gesamten System gültig.
- Die Angaben in den rechten beiden Spalten beziehen sich auf die <strong>Werte</strong>, die die Baueigenschaft (gemäß ihrem bei Neuanlage festlegten <strong>Wertetyp)</strong> annehmen kann.
- Dazu muss sie für einen Baustoff (bzw. eine Baueinheit) <font color="text-accent"> <strong>aktiviert</strong> </font> werden (siehe dazu die Hinweise zur
  Bedienung).
- Diese Werte der Baueigenschaft sind <u>spezifisch</u> für den im Baustoffbaum ausgewählten <u>Baustoff</u> (bzw. für eine im Bauvorhabenbaum ausgewählte <u>Baueinheit)</u>.
  :::

::: tip Hinweise zur Bedienung

- In der rechten Spalte "Merkmale der Baueigenschaft..." den Schiebeschalter <font color="text-accent"><strong>"Aktiviert"</strong> </font> oben links verwenden, um eine Baueigenschaft für den im Baustoffbaum ausgewählten Baustoff zu <strong>aktivieren</strong> oder zu <strong>deaktivieren.</strong>
- Dabei zeigt der benachbarte Schiebeschalter <strong>"Aktivierbar"</strong> an, ob die Baueigenschaft aktiviert werden darf oder nicht (abhängig davon, ob sie im Elternknoten im Baustoffbaum aktiviert ist).
- Für aktivierte Baueigenschaften können <strong>Werte</strong> in der dritten Spalte "Wertbezogene Angaben..." eingegeben oder geändert werden.
  :::`
*/
          },
          {
            id: "1.2.3-Neu",
            ref: "ref_1_2_3_Neu",
            title: "Neu",
            markdown: "==Hallo==", // TODO - Dummy
            markdownFileName: "KontextHilfe2"
          }
        ]
      },
      {
        id: "1.3-Relevante Bauinformationen",
        ref: "ref_1_3_Relevante_Bauinformationen",
        title: "Relevante Bauinformationen"
      },
      {
        id: "1.4-Abhängige Baustoffe",
        ref: "ref_1_4_Abhaengige Baustoffe",
        title: "Abhängige Baustoffe"
      }
    ]
  },

  {
    id: "2-Bauinformationen",
    ref: "ref_2_Bauinformationen",
    title: "Bauinformationen",
    // icon: "img:statics/icons/Bauvorschriften-Icon.svg"
    icon: "library_books" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "3-Auswertungen", // NEU
    // ALT:
    // id: "3-Validierung-und-Optimierung", // ACHTUNG: Sonderzeichen "/"! Muss manuell als Sprungziel definiert werden im Markdown!!!
    ref: "ref_3_Auswertungen",
    title: "Auswertungen",
    // icon: "img:statics/icons/Verschiedenes-Icon.svg"
    icon: "wb_incandescent" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "4-Datenaustausch",
    ref: "ref_4_Datenaustausch",
    title: "Datenaustausch",
    // icon: "img:statics/icons/Verschiedenes-Icon.svg"
    // Alternativ: icon: "sync" // Von https://material.io/resources/icons/?style=baseline
    icon: "import_export" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "5-Einstellungen",
    ref: "ref_5_Einstellungen",
    title: "Einstellungen",
    // icon: "img:statics/icons/Verschiedenes-Icon.svg"
    icon: "playlist_add_check" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "6-Hilfe",
    ref: "ref_6_Hilfe",
    title: "Hilfe",
    // icon: "img:statics/icons/Verschiedenes-Icon.svg"
    icon: "contact_support" // Von https://material.io/resources/icons/?style=baseline
  }
];

// Exportiere das bedienungsHilfeVerzeichnis zur Verwendung durch andere -- diese müssen sie mit Node "Requires" bei sich inkludieren
module.exports = bedienungsHilfeVerzeichnis;
