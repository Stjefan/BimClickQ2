// Node Module dokumentations-verzeichnis.js

// Definiert und exportiert hierarchisches dokumentationsVerzeichnis mit Dokumentationsthemen, bestehend aus id, title, icon sowie children
// Neu: Selbe Benennung der Felder hier in dokumentationsVerzeichnis.js wie in den mit QMarkdown per @data Property optional generierbaren Tables of Contents,
// siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs - aktuell werden diese nicht verwendet, weil
// dokumentationsVerzeichnis.js im Vergleich zu dem von q-markdown mit @data Property erzeugbaren ToCs ein zusätzliches optionales Feld icon hat
// Dies gilt insbesondere für das Feld id, wo <q-markdown> per toc Property eine "slugified" id erzeugt, die gleich heißt wie der Heading in :h1, :h2, etc.,
// wobei Blanks in den Headings durch "-" ersetzt werden

// ACHTUNG: Unbedingt zu beachten bzgl. Syntax der ids:
// - Die Überschriften, für die QMarkdown automatisch ToC ids generiert, dürfen NICHT enthalten:
//   Umlaute, Fragezeichen, Klammern - sonst funktionieren die aus den ids erzeugten Routes NICHT, und es kommt zu Fehlern, meist "Cannot read
//   property 'closest' of null"
// - Erlaubt sind dagegen: ".", ":", ",", "-"
// - Dafür müssen mit <div> (siehe 5.) manuell Sprungziele in den Markup und in die Heading-Tags in dokumentationsVerzeichnis.js eingefügt werden,
//   die diese Zeichen nicht enthalten!  -->
// - Zusätzliche Sprungziele können per <div id="Sprungziel-1"> in den Markup eingefügt werden -->

// HINWEIS: Multiline Strings sind in ES6 mögich mit Backticks "`":  `Say hello to multiline strings!` - dieser String kann dann über mehrere Zeilen
// verteilt werden, z.B. für Markdown Content im String, siehe https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
// Dito kann mit "\r\n" ein Line Feed in den String eingfügt werden

const dokumentationsVerzeichnis = [
  {
    id: "1-Digitale-Bauphysik",
    title: "1 Digitale Bauphysik",
    // icon: "img:statics/icons/bim-click-lego-icon.svg", // ALT: Blau/apricot Icon
    icon: "img:statics/icons/bim-click-lego-icon-braun-gruen-transparent-rund-mittlerer-schatten-austritt-512x512.png", // NEU: Braun/grünes Icon
    children: [
      {
        id: "1.1-Einfuehrung", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im
        title: "1.1 Einführung"
      },
      {
        id: "1.2-Grundkonstrukte:-Bauvorhaben,-Baustoffe,-Bauinformationen",
        title: "1.2 Grundkonstrukte"
      }
    ]
  },
  {
    id: "2-Bauvorhaben",
    title: "2 Bauvorhaben",
    // icon: "img:statics/icons/icon-bauvorhaben.svg",
    icon: "apartment", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "2.1-Ueberblick", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
        // Ursprünglich "Was ist das?" mit Sonderzeichen "?" - muss ebenfalls manuell definiert werden im Markdown!!!
        title: "2.1 Überblick"
      },
      {
        id: "2.2-Beispiele",
        title: "2.2 Beispiele"
      },
      {
        id: "2.3-Sonstiges",
        title: "2.3 Sonstiges"
      }
    ]
  },
  {
    id: "3-Baustoffe",
    title: "3 Baustoffe",
    // icon: "img:statics/icons/icon-baustoffe.svg",
    icon: "build", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "3.1-Ueberblick", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
        // Ursprünglich "Was ist das?" mit Sonderzeichen "?" - muss ebenfalls manuell definiert werden im Markdown!!!
        title: "3.1 Überblick"
      },
      {
        id: "3.2-Gliederung",
        title: "3.2 Gliederung"
      },
      {
        id: "3.3-Sonstiges",
        title: "3.3 Sonstiges",
        children: [
          {
            id: "3.3.1-Unterabschnitt",
            title: "3.3.1 Unterabschnitt"
          }
        ]
      }
    ]
  },
  {
    id: "4-Bauinformationen",
    title: "4 Bauinformationen",
    // icon: "img:statics/icons/icon-bauinformationen.svg"
    icon: "library_books", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "4.1-Ueberblick", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
        // Ursprünglich "Was ist das?" mit Sonderzeichen "?" - muss ebenfalls manuell definiert werden im Markdown!!!
        title: "4.1 Überblick"
      },
      {
        id: "4.2-Bauinformationsprofile",
        title: "4.2 Bauinformationsprofile"
      }
    ]
  },
  {
    id: "5-Baueigenschaften",
    title: "5 Baueigenschaften",
    icon: "list", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "5.1-Ueberblick", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
        // Ursprünglich "Was ist das?" mit Sonderzeichen "?" - muss ebenfalls manuell definiert werden im Markdown!!!
        title: "5.1 Überblick"
      },
      {
        id:
          "5.2-Beispiele-fuer-Baueigenschaften-mit-unterschiedlichen-Wertetypen", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
        title: "5.2 Beispiele"
      },
      {
        id: "5-3-Aktivierung-und-Wertevererbung-von-Baueigenschaften",
        title: "5.3 Aktivierung/Wertevererbung"
      },
      {
        id: "5.4-Baueigenschaftsprofile",
        title: "5.4 Baueigenschaftsprofile",
        icon: "list_alt", // Von https://material.io/resources/icons/?style=baseline
        children: [
          {
            id: "5.4.1-Ueberblick", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
            // Ursprünglich "Was ist das?" mit Sonderzeichen "?" - muss ebenfalls manuell definiert werden im Markdown!!!
            title: "5.4.1 Überblick"
          },
          {
            id:
              "5.4.2-Beispiele-fuer-Baueigenschaftsprofile", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
            title: "5.4.2 Beispiele"
          },
          {
            id: "5.4.3-Aktivierung-und-Deaktivierung-von-Baueigenschaftsprofilen",
            title: "5.4.3 Aktivierung/Deaktivierung"
          },
          {
            id: "5.4.4-Konzeptionelle-Muster-fuer-die-Verwendung-von-Baueigenschaftsprofilen",
            title: "5.4.4 Konzeptionelle Muster"
          },
          {
            id: "5.4.5-Modellierung-von-Bauvorhaben-mit-Baueigenschaftsprofilen",
            title: "5.4.5 Modellierung"
          },
          {
            id: "5.4.6-Anzeige-und-Bearbeitung-von-Baueigenschaftsprofilen-mit-Baueigenschaftsprofilformularen",
            title: "5.4.6 Profilformulare"
          }
        ]
      },
    ]
  },
  {
    id: "6-Datenaustausch", // ALT: 6-Validierung-und-Optimierung
    // ACHTUNG: Enthielt früher Sonderzeichen "/"! Musste manuell als Sprungziel definiert werden im Markdown!!!
    title: "6 Datenaustausch",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "wb_incandescent" // Von https://material.io/resources/icons/?style=baseline
  },
  // Entfernt:
  /*
  {
    id: "X-Auswertungen",
    title: "X Auswertungen",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    // Alternativ: icon: "sync" // Von https://material.io/resources/icons/?style=baseline
    icon: "import_export" // Von https://material.io/resources/icons/?style=baseline
  },
  */
  {
    id: "7-Einstellungen",
    title: "7 Einstellungen",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "playlist_add_check" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "8-Dokumentation",
    title: "8 Dokumentation",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "menu_book" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "9-Verwaltung",
    title: "9 Verwaltung",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "airline_seat_recline_extra", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "9.1-Ueberblick", // ACHTUNG: Umlaut! Muss manuell als Sprungziel definiert werden im Markdown!!!
        title: "9.1 Überblick",
        // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
        icon: "airline_seat_recline_extra" // Von https://material.io/resources/icons/?style=baseline}
      },
      {
        id: "9.2-Benutzerkonten",
        title: "9.2 Benutzerkonten",
        // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
        icon: "supervisor_account", // Von https://material.io/resources/icons/?style=baseline}
        children: [
          {
            id: "9.2.1-Benutzerrollen",
            title: "9.2.1 Benutzerrollen",
            // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
            icon: "how_to_reg" // Von https://material.io/resources/icons/?style=baseline}
          },
        ],
      },
    ]
  },
  {
    id: "10-Hilfe",
    title: "10 Hilfe",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "contact_support" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "11-Glossar",
    title: "11 Glossar",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "assignment" // Von https://material.io/resources/icons/?style=baseline
  },
  {
    id: "12-Markdown", // ACHTUNG: Sonderzeichen "(" und ")"! Muss manuell als Sprungziel definiert werden in HTML <h4>!!!
    title: "12 Markdown",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "airline_seat_recline_extra", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "12.1-Test-Links",
        title: "12.1 Test Links",
        // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
      },
      {
        id: "12.2-Markdown-Cheat-Sheet",
        title: "12.2 Markdown Cheat Sheet",
        // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
      }
    ]
  },
  {
    id: "13-Dokumentationsgestaltung-Test", // ACHTUNG: Sonderzeichen "(" und ")"! Muss manuell als Sprungziel definiert werden in HTML <h4>!!!
    title: "13 Dokumentationsgestaltung (Test)",
    // icon: "img:statics/icons/icon-bau-verschiedenes.svg"
    icon: "airline_seat_recline_extra", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "13.1-Quasar-Gestaltungsmittel",
        title: "13.1 Quasar Gestaltungsmittel",
        children: [
          {
            id: "13.1.1-QMarkupTable",
            title: "13.1.1 QMarkupTable"
          },
          {
            id: "13.1.2-QCard",
            title: "13.1.2 QCard"
          },
          {
            id: "13.1.3-QCarousel",
            title: "13.1.3 QCarousel"
          },
          {
            id: "13.1.4-QPdfViewer",
            title: "13.1.4 QPdfViewer"
          }
        ]
      },
      {
        id: "13.2-Links",
        title: "13.2 Links/Images/PDFs",
        children: [
          {
            id: "13.2.1-Quasar-basiert",
            title: "13.2.1 Quasar-basiert"
          },
          {
            id: "13.2.2-HTML-basiert",
            title: "13.2.2 HTML-basiert"
          },
          {
            id: "13.2.3-Vue-basiert",
            title: "13.2.3 Vue-basiert"
          }
        ]
      },
      {
        id: "13.3-HTML-Gestaltungsmittel",
        title: "13.3 HTML Gestaltungsmittel"
      },
      {
        id: "13.4-Sonderzeichentabellen",
        title: "13.4 Sonderzeichentabellen"
      }
    ]
  },
  {
    id: "14-Interne-Dokumentation",
    title: "14 Interne Dokumentation",
    icon: "airline_seat_recline_extra", // Von https://material.io/resources/icons/?style=baseline
    children: [
      {
        id: "14.1-Projekt-Backlog",
        title: "14.1 Projekt-Backlog",
        children: [
          {
            id: "14.1.1-Projekt-Backlog-Ende", // NEU: Für Sprung an das Ende des Backlogs
            title: "14.1.1 Backlog-Ende"
          }
        ]
      },
      {
        id: "14.2-Design-Internals",
        title: "14.2 Internes Design"
      }
    ]
  }
];

// Exportiere das dokumentationsVerzeichnis zur Verwendung durch andere -- diese müssen sie mit Node "Requires" bei sich inkludieren
module.exports = dokumentationsVerzeichnis;
