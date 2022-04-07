// layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für das Baueigenschaftsprofil "Allgemein > Test > Wertetypen"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften

const LayoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular = [
  // layoutBaustoffBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Tab für Testdaten",
    labelTab: "Test", // Neue Property für layoutgesteuertes generisches Profilformular
    bemerkungTab: "Default-Tooltip für Unter-Tab", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    // NEU: Fachliche Hilfe an Tab
    beschreibungTab: `Fachliche Hilfe für Unter-Tab
     - Estriche gibt es in vielen Formen
     - Gussasphaltestriche sind eine davon
     ![Fußbodenaufbau-Cloud](https://bimclickserver.herokuapp.com/img/estrich.jpg "Fußbodenaufbau (Cloud)" =300x300)
    `,
    // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
    // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
    // Alternatives Test-Beispiel mit Containern, funktioniert nicht:
    /*
    `::: danger Embedable
      here be **dragons** with a [link](https://quasar.dev)
        ::: warning
        here be **dragons** with a [link](https://quasar.dev)
        :::
      :::
    `,
    */
    anzahlSpaltenTab: 2, // NEU: Optionale Property für Anzahl der Spalten des Tabs - 1, 2 oder 3 - Default ist 1
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Erste Rubrik mit Testdaten",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        // NEU: Fachliche Hilfe an Rubrik
        beschreibungRubrik: `Fachliche Default-Hilfe für Rubrik
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        spaltenUeberschriftenRubrik: [
          // ACHTUNG: Array-Größe hier muss übereinstimmen mit spaltenRubrik!
          "<b>Spalte 1</b>",
          "<b>Spalte 2</b>",
          "<b>Spalte 3</b>",
          "<b>Spalte 4</b>",
        ], // NEU: Optionale Property zum Test von Spaltenüberschriften für Rubrik, mit v-html-Content
        // ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12)
        // TODO XXXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js! -->
        hinweiseRubrik:
          "<span class='text-bold color-red'>Hinweis:</span> Nur für Entwickler!", // NEU: Test von Hinweisen am Ende der Rubrik, mit v-html-Content
        // ACHTUNG: Hier <span>, nicht <div>, sonst Line Break!
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // NEU: Optionale Property für Anzahl der Spalten dieser Rubrik - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
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
            disable: false, // Flag für Steuerung :disable am Feld
            hintBaueigenschaft1: "Beginn", // NEU: Optionale Property für Hint bei Wertepaaren
            hintBaueigenschaft2: "Ende", // NEU: Optionale Property für Hint bei Wertepaaren
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
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: null, // Für Test von null
            labelBaueigenschaft1: null, // Für Test von null
            labelBaueigenschaft2: null, // Für Test von null
            toolTipBaueigenschaft1: null, // Für Test von null
            toolTipBaueigenschaft2: null, // Für Test von null
            hintBaueigenschaft1: null, // Für Test von null
            hintBaueigenschaft2: null // Für Test von null
          },
          //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Test von Füllfeldern:
          { // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "<b>Fülltext: </b> Hallo!", // Wird in der Template-Logik per Moustache im div angezeigt, falls specialField "Filler"
          },
          // NEU: Test von Button-Feldern (bisher nur Link-Buttons, zukünftig auch Buttons, die Funktionen aufrufen aus functions-xyz-baueigenschafts-profil-formular.js)
          { // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Link", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            linkButton: "https://www.spiegel.de", // Wird in der Template-Logik per q-btn mit type="a" und href angezeigt, falls specialField "Link"
            colorButton: "purple-5 text-white", // Farbe für den Button
            labelButton: "SPIEGEL Online", // Label für den Button
            iconRightButton: "settings_backup_restore" // NEU: Icon rechts für den Button
          },
          //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Herstellerlangbezeichnung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Zweite Rubrik mit Testdaten",
        bemerkungRubrik: "Default-Tooltip für Rubrik", // NEU: Tooltip an Rubrik
        // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
        // Müssen mit Backticks eingegeben werden: `..`
        // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
        // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
        // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
        // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
        // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
        beschreibungRubrik: // NEU: Fachliche Hilfe an Rubrik
        `Fachliche Default-Hilfe für Rubrik
        - TODO: Noch zu vervollständigen
        `,
        // TODO: Markdown Container im Multiline Markdown String funktionieren nicht!
        // Wahrscheinlich nur per Markdown Content aus Files statt Strings lösbar - siehe die Kommentare in my-layout.vue dazu, bei fachlicher Hilfe
        spaltenUeberschriftenRubrik: null, // Für Test von null
        hinweiseRubrik: null, // Für Test von null
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-orange-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 3, // Neue Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Kreditwürdigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // multiple: true // NEU: Optionale Property für multiple Selection für Aufzählungswerte - Default ist false
          },
          //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Test von Füllfeldern:
          { // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "<b>Fülltext: </b> Hallo!", // Wird in der Template-Logik per Moustache im div angezeigt, falls specialField "Filler"
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
            hintBaueigenschaft1: "Beginn", // NEU: Optionale Property für Hint bei Wertepaaren
            hintBaueigenschaft2: "Ende", // NEU: Optionale Property für Hint bei Wertepaaren
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Allgemein > Test > Wertetypen > Schallschutzklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            multiple: true, // NEU: Optionale Property für multiple Selection für Aufzählungswerte - Default ist false
            hintBaueigenschaft: "Mehrfachauswahl mit Strg-Taste" // NEU: Optionale Property für Hint
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
  }
  //------------------------------------------------------------------------------------------------------------------------------------
];

module.exports = LayoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaustoffBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
