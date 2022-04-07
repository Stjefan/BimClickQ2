// layout-baustoff-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für das Baueigenschaftsprofil "Baustoff"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften

const LayoutBaustoffBaueigenschaftsProfilFormular = [
  // layoutBaustoffBaueigenschaftsProfilFormular[0] // Tab 0
  {
    labelTab: "Wirtschaft",
    ueberschriftTab: "Wirtschaftliche Angaben",
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Handel",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          /*
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Allgemein > Test > Wertetypen > Dynamische Steifigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Die folgende optionale Property kann an allen nicht-paarigen Wertetypen verwendet werden (Kennwerte, Bezeichnungswerte, Aufzählungswerte, Wahrheitswerte):
            labelBaueigenschaft: "Dynamische Steifigkeit - Test für Label aus Layout File", // Neue optionale Property, wenn nicht vorhanden, wird stattdessen der Anzeigetext aus typbezogener Baueigenschaft entnommen
            toolTipBaueigenschaft: "Dynamische Steifigkeit - Test für Tooltip aus Layout File" // Neue optionale Property, wenn nicht vorhanden, wird stattdessen die Baueigenschaftsbemerkung aus typbezogener Baueigenschaft entnommen
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Allgemein > Test > Wertetypen > Geokoordinaten",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Die folgenden optionalen Properties können an allen Wertepaaren verwendet werden (Kennwertepaare, Bezeichnungswertepaare, Tageszeitwertepaare, Datumswertepaare):
            labelBaueigenschaft1: "Geografischer Breitengrad", // Neue optionale Property, wenn nicht vorhanden, wird stattdessen der Anzeigetext aus typbezogener Baueigenschaft entnommen
            labelBaueigenschaft2: "Geografischer Längengrad", // Neue optionale Property, wenn nicht vorhanden, wird stattdessen der Anzeigetext aus typbezogener Baueigenschaft entnommen
            toolTipBaueigenschaft1: "Geografische Breite in Grad", // Neue optionale Property
            toolTipBaueigenschaft2: "Geografische Länge in Grad", // Neue optionale Property
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung: "Allgemein > Test > Wertetypen > Gültigkeitszeitraum",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Hat Ökolabel 'Blauer Engel'?",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung: "Allgemein > Test > Wertetypen > Herstellerkurzbezeichnung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Herstellerlangbezeichnung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
          */
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Sonstige wirtschaftliche Angaben",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 6, // Neue Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          /*
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Kreditwürdigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Nutzungsbeginn",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Nutzungszeitraum",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Schallschutzklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Tageszeitwert null",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Verfügbarkeitsdatum",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Wärmedurchlasswiderstand",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Wärmeleitfähigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Wärmeleitfähigkeitsbereich",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          */
          /*
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[x]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Geometrie > Eingang > Niveau > Fertigboden > Oberkante (OKFFB EG)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "[m ü. 0.0]", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "[m ü. NHN]", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          */
        ]
      }
      /*
      {
        // rubrikenInTab[0] // Rubrik 1
        ueberschriftRubrik: "Deckenniveaus des Geschosses",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        baueigenschaftenInRubrik: [
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Niveau > Fertigdecke > Oberkante (OKFD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "[m ü. 0.0]", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "[m ü. NHN]", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Niveau > Rohdecke > Oberkante (OKRD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "[m ü. 0.0]", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "[m ü. NHN]", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Niveau > Rohdecke > Unterkante (UKRD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "[m ü. 0.0]", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "[m ü. NHN]", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Niveau > Fertigdecke > Unterkante (UKFD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "[m ü. 0.0]", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "[m ü. NHN]", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          }
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 2
        ueberschriftRubrik:
          "Berechnete Maße der Geschossdecke", // "... und Umgebunsbezüge" weggelassen wegen Umbruch auf Maske!
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Fertigdecke > Aufbauhöhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Rohdecke > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Deckenunterseite > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Gesamtdicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Räume > Lichte Höhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      */
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // Geplante Tab-Gliederung auf der untersten Tab-Ebene für Baustoffe
  // Die bisher definierten "fachlichen Rubriken" für Baueigenschaften (ohne die, die klar für Baueinheiten sind) sind hier jeweils
  // in Kommentaren hinzugefügt, damit wir die Tabs und die Rubriken begrifflich und inhaltlich konsistent kriegen:
  {
    labelTab: "Struktur", // NEU - ALT: Zusammensetzung",
    ueberschriftTab: "Angaben zur Einordnung und Zusammensetzung", // Das gibt es nicht als fachliche Rubrik und wird dort auch nicht gebraucht - OK
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab "Struktur"
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Einordnung",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Zusammensetzung",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Geometrie",
    ueberschriftTab: "Angaben zu Maßen und Mengen", // Geometrie = fachliche Rubrik. "Massen"/"Mengen" gab es früher nicht als fachliche Rubrik, erst seit #401!
    // Thematisch verwandte fachliche Rubrik: "Lastannahmen" (diese fachliche Rubrik sollte aber besser 'Nutzlasten' heißen, die Umbenennung ist ein offenes TODO)
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Maße",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Mengen", // NEU - ALT: "Massen"
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Statik", // Eventuell "Mechanik - "Mechanik" gibt es aber sonderbarerweise bei den bisherigen fachlichen Rubriken noch nicht!
    ueberschriftTab: "Angaben zu Lasten, Standsicherheit und Festigkeit",
    // Dort gibt es aber "Lastannahmen" und "Konstruktion"...
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Lasten",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Standsicherheit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Festigkeit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-indigo-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Bautenschutz",
    ueberschriftTab: "Angaben zu Abdichtungstechnik, Korrosionsschutz und Holzschutz", // NEU - ALT: Feuchteschutz/Gebrauchstagulichkeit" - beides fachliche Rubriken.
    // Zusätzliche fachliche Rubriken: "Standsicherheit", "Verkehrssicherheit", "Abdichtungstechnik" – „Gebrauchstauglichkeit“ dürfte besser zu
    // obigem „Sicherheit/Barrierefreiheit“ passen als zu „Feuchteschutz“.
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Abdichtungstechnik",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Korrosionsschutz",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-grey-4", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Holzschutz",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-brown-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Feuchteschutz",
    ueberschriftTab: "Angaben zum Feuchteschutz", // = fachliche Rubrik. Zusätzliche thematisch ähnliche fachliche Rubriken: "Abdichtungstechnik", "Holzschutz"
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Rubrik 1",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Rubrik 2",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Wärmeschutz",
    ueberschriftTab: "Angaben zum Wärmeschutz", // = fachliche Rubrik. Zusätzliche thematisch ähnliche fachliche Rubrik: "Energieeinsparung"
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Energiebedarf",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Sonstige Angaben zum Wärmeschutz",
        // hideRubrik: true, // Neue optionale Property - Default ist false
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Akustik",
    ueberschriftTab: "Angaben zu Schallschutz und Raumakustik", // = fachliche Rubrik
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Schallschutz",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Raumakustik",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Schwingungs- und Erschütterungsschutz",
    ueberschriftTab: "Angaben zum Schwingungs- und Erschütterungsschutz", // = fachliche Rubrik
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Schwingungen",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Erschütterungen",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Brandschutz",
    ueberschriftTab: "Angaben zum Brandschutz", // = fachliche Rubrik
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Rubrik 1",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Rubrik 2",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Sicherheit",
    ueberschriftTab: "Angaben zur Verkehrssicherheit, Barrierefreiheit und elektrischen Sicherheit", // Barrierefreiheit = fachliche Rubrik.
    // Zusätzliche thematisch ähnliche fachliche Rubriken: "Standsicherheit", "Verkehrssicherheit", "Gebrauchstauglichkeit"
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      /*
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Standsicherheit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      */
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Verkehrssicherheit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      /*
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Gebrauchstauglichkeit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-green-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      */
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Barrierefreiheit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-pink-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Elektrische Sicherheit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-red-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Gebrauchstauglichkeit", // TBD: Eventuell unter "Sicherheit" unterbringen?
    ueberschriftTab: "Angaben zur Gebrauchstauglichkeit", // = fachliche Rubrik
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Behaglichkeit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Sonstige Angaben zur Gebrauchstauglichkeit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Gesundheit",
    ueberschriftTab: "Angaben zu Schadstoffschutz und Radonschutz", // Fachliche Rubriken: "Schadstoffschutz", "Gesundheit und Hygiene" (leicht andere Benennung)
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Schadstoffschutz",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Radonschutz",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Sonstige Angaben zu Gesundheit und Hygiene",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-green-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Ressourcen", // Absichtliche begriffliche Zusammenfassung!
    ueberschriftTab:
      "Angaben zu Umweltverträglichkeit, Ökobilanz und Lebenszyklus", // Hieß "Ressourcen/Kreislaufwirtschaft", // Fachliche Rubriken: "Nachhaltigkeit", "Umweltverträglichkeit", "Ökobilanz"
      bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
      // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
      // Müssen mit Backticks eingegeben werden: `..`
      // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
      // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
      // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
      // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
      // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
      beschreibungTab: // NEU: Fachliche Hilfe an Tab
      `Fachliche Hilfe für Unter-Tab
      - TODO: Noch zu vervollständigen
      `,
      // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
      // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Umweltverträglichkeit",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-light-green-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Ökobilanz",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-green-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Lebenszyklus",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-lime-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  },
  {
    labelTab: "Bautechnik",
    ueberschriftTab: "Angaben zu Bauablauf, Zeitbedarf und Winterbau", // Was ist damit gemeint? Restebecken? Etwas anderes als "Konstruktion" bei den fachlichen Rubriken?
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab: // NEU: Fachliche Hilfe an Tab
    `Fachliche Hilfe für Unter-Tab
    - TODO: Noch zu vervollständigen
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Bauablauf",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Zeitbedarf",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Winterbau",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik"
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        // hideRubrik: true, // Neue optionale Property - Default ist false
        farbeRubrik: "bg-green-2", // Neue optionale Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // Neue optionale Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: []
      }
    ]
  }
];

module.exports = LayoutBaustoffBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaustoffBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
