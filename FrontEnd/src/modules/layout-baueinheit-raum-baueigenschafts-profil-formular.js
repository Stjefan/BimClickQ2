// layout-baueinheit-raum-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für "Baueinheit > Raum"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften
// =============================================================================================================================
// ACHTUNG: Eine Dublette dieser Datei wird auch im Backend unter bim-click-back-end > app > modules vorgehalten,
// zur Generierung von Reports!
// =============================================================================================================================
const LayoutBaueinheitRaumBaueigenschaftsProfilFormular = [
  // layoutBaueinheitRaumBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Boden/Decke",
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    beschreibungTab:
    `Fachliche Hilfe für Unter-Tab "Boden/Decke"
     - Die Decke begrenzt den Raum nach oben
     - Der Boden begrenzt den Raum nach unten  
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
    rubrikenInTab: [
      {
        // ACHTUNG: Rubrik 0 ist reserviert für gemeinsame Baueigenschaften mit übergeordneten Profilen, die nicht unbedingt angezeigt
        //          werden, aber zur Initialisierung und Berechnung von Feldern benötigt werden!
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik:
          "Gemeinsame Baueigenschaften mit übergeordneten Baueigenschaftsprofilen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Bemessungswasserstand",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
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
          }
          // Relikte aus "Baueinheit > Geschoss":
          /*
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Geometrie > Räume > Lichte Höhe > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Geometrie > Türen > Lichte Durchgangshöhe > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
          */
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Deckenniveaus des Geschosses und des Raums",
        baueigenschaftenInRubrik: [
          // Sollwerte aus Geschoss:
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Deckenaufbau > Niveau > Fertigdecke > Oberkante (OKFD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau der Fertigdecke im Deckenaufbau (OKFD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau der Fertigdecke im Deckenaufbau (OKFD)", // ACHTUNG: Label 2 für Wertepaar!
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
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau der Rohdecke im Deckenaufbau (OKRD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau der Rohdecke im Deckenaufbau (OKRD)", // ACHTUNG: Label 2 für Wertepaar!
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
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau der Rohdecke im Deckenaufbau (UKRD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau der Rohdecke im Deckenaufbau (UKRD)", // ACHTUNG: Label 2 für Wertepaar!
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
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau der Fertigdecke im Deckenaufbau (UKFD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau der Fertigdecke im Deckenaufbau (UKFD)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          // Istwerte für Raum:
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Niveau > Fertigdecke > Oberkante (OKFD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau der Fertigdecke im Deckenaufbau (OKFD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau der Fertigdecke im Deckenaufbau (OKFD)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Niveau > Rohdecke > Oberkante (OKRD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau der Rohdecke im Deckenaufbau (OKRD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau der Rohdecke im Deckenaufbau (OKRD)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Niveau > Rohdecke > Unterkante (UKRD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau der Rohdecke im Deckenaufbau (UKRD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau der Rohdecke im Deckenaufbau (UKRD)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Niveau > Fertigdecke > Unterkante (UKFD)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau der Fertigdecke im Deckenaufbau (UKFD)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau der Fertigdecke im Deckenaufbau (UKFD)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          }
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 2
        ueberschriftRubrik: "Berechnete Maße der Raumdecke", // "... und Umgebungsbezüge" weggelassen wegen Umbruch auf Maske!
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Fertigdecke > Aufbauhöhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Rohdecke > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Deckenunterseite > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Deckenaufbau > Gesamtdicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            //======================================================================================================
            // ACHTUNG: "Lichte Höhe" fällt aus der Reihe, wird in anderem Tab in computed-Funktion wiederverwendet!
            //======================================================================================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Geometrie > Maße > Lichte Höhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      // ACHTUNG: Nächste Rubrik ist eigentlich leer! Um Umnummerierung zu vermeiden, Rubrik beibehalten!!!
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik:
          "ACHTUNG: Zugriff auf leere Rubrik im Layout von 'Raum'!",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
          /*
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Absturzhöhe > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Brüstungen > Höhe über OKFFB > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Brüstungen > Höhe über OKRFB > Rohbaumaß",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
          */
        ]
      },
      //===========================================================================================================
      // 2. Zeile von Rubriken auf Desktop
      {
        // rubrikenInTab[4] // Rubrik 4
        ueberschriftRubrik: "Bodenniveaus des Geschosses und des Raums",
        baueigenschaftenInRubrik: [
          // Sollwerte aus Geschoss:
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Fertigboden > Oberkante (OKFFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau des Fertigbodens im Bodenaufbau (OKFFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau des Fertigbodens im Bodenaufbau (OKFFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Rohboden > Oberkante (OKRFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau des Rohbodens im Bodenaufbau (OKRFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau des Rohbodens im Bodenaufbau (OKRFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Rohboden > Unterkante (UKRFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau des Rohbodens im Bodenaufbau (UKRFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau des Rohbodens im Bodenaufbau (UKRFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Fertigboden > Unterkante (UKFFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau des Fertigbodens im Bodenaufbau (UKFFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau des Fertigbodens im Bodenaufbau (UKFFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          // Istwerte für Raum:
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Fertigboden > Oberkante (OKFFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau des Fertigbodens im Bodenaufbau (OKFFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau des Fertigbodens im Bodenaufbau (OKFFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Rohboden > Oberkante (OKRFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Oberkantenniveau des Rohbodens im Bodenaufbau (OKRFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Oberkantenniveau des Rohbodens im Bodenaufbau (OKRFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Rohboden > Unterkante (UKRFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau des Rohbodens im Bodenaufbau (UKRFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau des Rohbodens im Bodenaufbau (UKRFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Fertigboden > Unterkante (UKFFB)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Label und Tooltip für diese Niveau-Kennwertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung): Hier wird stattdessen ein gemeinsames
            // Label für "Geschoss" und "Raum" angezeigt, die in derselben Zeile dahinter stehen
            labelBaueigenschaft1:
              "Unterkantenniveau des Fertigbodens im Bodenaufbau (UKFFB)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2:
              "Unterkantenniveau des Fertigbodens im Bodenaufbau (UKFFB)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          }
        ]
      },
      {
        // rubrikenInTab[5] // Rubrik 5
        ueberschriftRubrik: "Berechnete Maße des Raumbodens",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Rohboden > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Bodenunterseite > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Gesamtdicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Angrenzungssituation > Grundwasser > Grundwasserberührt!",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Angrenzungssituation > Grundwasser > Eintauchtiefe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      // ACHTUNG: Nächste Rubrik ist eigentlich leer! Um Umnummerierung zu vermeiden, Rubrik beibehalten!!!
      {
        // rubrikenInTab[6] // Rubrik 6
        ueberschriftRubrik:
          "ACHTUNG: Zugriff auf leere Rubrik im Layout von 'Raum'!",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
          /*
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Türen > Lichte Durchgangshöhe > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Türen > Türstürze > Niveau > Unterkante (UKTS)",
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
          */
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitRaumBaueigenschaftsProfilFormular[1] // Tab 1
  {
    ueberschriftTab: "Maße",
    rubrikenInTab: [
      {
        // ACHTUNG: Rubrik 0 ist reserviert für gemeinsame Baueigenschaften mit übergeordneten Profilen, die nicht unbedingt angezeigt
        //          werden, aber zur Initialisierung und Berechnung von Feldern benötigt werden!
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik:
          "Gemeinsame Baueigenschaften mit übergeordneten Baueigenschaftsprofilen",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Die nachfolgenden 2 ererbten Baueigenschaften sind bereits in Tab 0 ("Boden/Decke"), Rubrik 0 enthalten und werden deshalb hier nicht noch einmal gebraucht!
          // Die Rubrik ist deshalb leer!
          /*
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Bemessungswasserstand",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
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
          }
          */
          // Relikte aus "Baueinheit > Geschoss":
          /*
            {
              // baueigenschaftenInRubrik[2]
              baueigenschaftsBezeichnung:
                "Baueinheit > Gebäude > Geometrie > Räume > Lichte Höhe > Sollwert",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false // Flag für Steuerung :disable am Feld
            },
            {
              // baueigenschaftenInRubrik[3]
              baueigenschaftsBezeichnung:
                "Baueinheit > Gebäude > Geometrie > Türen > Lichte Durchgangshöhe > Sollwert",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false // Flag für Steuerung :disable am Feld
            }
            */
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Raumform und Besonderheiten",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Geometrie > Form",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Raumform", // Wird über der q-option-group als Label angezeigt
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              {
                label: "Rechteckig",
                value: "rechteckig",
                color: "green"
              },
              {
                label: "Quaderförmig",
                value: "quaderförmig",
                color: "green"
              },
              {
                label: "Andere Raumform",
                value: "andere Form",
                color: "orange"
              },
              {
                label: "Unbekannte Raumform", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Besonderheiten > Ansteigende Bestuhlung?",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // ALT: Für q-option-group - mittlerweile durch q-checkbox ersetzt, daher eigentlich obsolet:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Bestuhlung", // Wird über der q-option-group als Label angezeigt
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              {
                label: "Ansteigende Bestuhlung?",
                value: true,
                color: "primary"
              }
            ]
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Besonderheiten > Podeste oder Bühnen?",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // ALT: Für q-option-group - mittlerweile durch q-checkbox ersetzt, daher eigentlich obsolet:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Podeste oder Bühnen", // Wird über der q-option-group als Label angezeigt
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              {
                label: "Podeste oder Bühnen?",
                value: true,
                color: "primary"
              }
            ]
          }
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Abmessungen", // "... und Umgebungsbezüge" weggelassen wegen Umbruch auf Maske!
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Flurseite > Lichte Breite",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Fassadenseite > Lichte Breite",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Lichte Tiefe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            //======================================================================================================
            // ACHTUNG: "Lichte Höhe" fällt aus der Reihe, wird aus Eingaben in anderem Tab computed!
            //======================================================================================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Räume > Lichte Höhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            //======================================================================================================
            // ACHTUNG: "Lichte Höhe" fällt aus der Reihe, wird aus Eingaben im anderem Tab computed!
            //======================================================================================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Geometrie > Maße > Lichte Höhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Abgeleitete Größen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Geometrie > Maße > Grundfläche",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Geometrie > Maße > Volumen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Volumen nach Abzug Einbauten",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //===========================================================================================================
      // 2. Zeile von Rubriken auf Desktop
      {
        // rubrikenInTab[4] // Rubrik 4
        ueberschriftRubrik:
          "ACHTUNG: Zugriff auf leere Rubrik im Layout von 'Raum'!",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[5] // Rubrik 5
        ueberschriftRubrik: "Brüstungen",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Reihenfolge hier zuerst nach Geschoss, dann nach Raum (spaltenwweise, im Code zeilenweise gerendert!!!)
          // ACHTUNG: Hier Labels, die angezeigt werden statt baueigenschaftsAnzeigeText!!!
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Absturzhöhe > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            labelBaueigenschaft: "Absturzhöhe über Geländeoberkante",
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Brüstungen > Höhe über OKFFB > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            labelBaueigenschaft: "Brüstungshöhe über OKFFB",
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Brüstungen > Höhe über OKRFB > Rohbaumaß",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            labelBaueigenschaft: "Rohbaumaß der Brüstungshöhe über OKFFB",
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Absturzhöhe > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Brüstungen > Höhe über OKFFB > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Brüstungen > Höhe über OKRFB > Rohbaumaß",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      // ACHTUNG: Nächste Rubrik ist leer! Um Umnummerierung zu vermeiden, Rubrik beibehalten!!!
      {
        // rubrikenInTab[6] // Rubrik 6
        ueberschriftRubrik:
          "ACHTUNG: Zugriff auf leere Rubrik im Layout von 'Raum'!",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      // ACHTUNG: Nächste Rubrik ist leer! Um Umnummerierung zu vermeiden, Rubrik beibehalten!!!
      {
        // rubrikenInTab[7] // Rubrik 7
        ueberschriftRubrik:
          "ACHTUNG: Zugriff auf leere Rubrik im Layout von 'Raum'!",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[8] // Rubrik 8
        ueberschriftRubrik: "Türen",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Reihenfolge hier zuerst nach Geschoss, dann nach Raum (spaltenwweise, im Code zeilenweise gerendert!!!)
          // ACHTUNG: Hier Labels, die angezeigt werden statt baueigenschaftsAnzeigeText!!!
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Türen > Lichte Durchgangshöhe > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Türdurchgangshöhe"
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Türen > Türstürze > Niveau > Unterkante (UKTS)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft: "Unterkante Türstürze (UKTS)",
            labelBaueigenschaft1: "[m ü. 0.0]", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "[m ü. NHN]", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Türen > Lichte Durchgangshöhe > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Türdurchgangshöhe"
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Türen > Türstürze > Niveau > Unterkante (UKTS)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft: "Unterkante Türstürze",
            labelBaueigenschaft1: "[m ü. 0.0]", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "[m ü. NHN]", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Hier sollte der reguläre Tooltip des Kennwertepaars angezeigt werden!" // ACHTUNG: Tooltip 2 für Wertepaar!
          }
        ]
      },
      // ACHTUNG: Nächste Rubrik ist leer! Um Umnummerierung zu vermeiden, Rubrik beibehalten!!!
      {
        // rubrikenInTab[9] // Rubrik 9
        ueberschriftRubrik:
          "ACHTUNG: Zugriff auf leere Rubrik im Layout von 'Raum'!",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitRaumBaueigenschaftsProfilFormular[2] // Tab 2 (Feuchte)
  {
    ueberschriftTab: "Angaben zur Luftfeuchte des Raums",
    rubrikenInTab: [
      // Hier keine leere Rubrik 0, gemeinsame Baueigenschaften mit Profil "Baueinheit > Standort" sind in Rubrik 1!
      /*
      {
        // ACHTUNG: Rubrik 0 ist reserviert für gemeinsame Baueigenschaften mit übergeordneten Profilen, die nicht unbedingt angezeigt
        //          werden, aber zur Initialisierung und Berechnung von Feldern benötigt werden!
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik:
          "Gemeinsame Baueigenschaften mit übergeordneten Baueigenschaftsprofilen",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      */
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Außenluft des Standorts und des Raums",
        baueigenschaftenInRubrik: [
          //--------------------------------------------------------------------------------------------------------------------
          // Zunächst die vom Standort ererbten Baueigenschaften ("Baueinheit > Standort > Feuchte > Außenluft > ...") in dieser Rubrik:
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Auslegungstemperatur > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Auslegungs-Außenlufttemperatur" // Gemeinsames Label für DIN 13788 und DIN 4108-2
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Auslegungstemperatur > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Jahresmittlere Temperatur > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Jahresmittlere Außenlufttemperatur (nur zur Information)" // Gemeinsames Label für DIN 13788 und DIN 4108-2
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Jahresmittlere Temperatur > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Relative Auslegungsluftfeuchte > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Relative Auslegungs-Außenluftfeuchte" // Gemeinsames Label für DIN 13788 und DIN 4108-2
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Relative Auslegungsluftfeuchte > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Sättigungsdampfdruck > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Sättigungsdampfdruck der Außenluft" // Gemeinsames Label für DIN 13788 und DIN 4108-2
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Sättigungsdampfdruck > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Wasserdampfpartialdruck > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wasserdampfpartialdruck der Außenluft" // Gemeinsames Label für DIN 13788 und DIN 4108-2
          },
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Wasserdampfpartialdruck > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Wärmeübergangswiderstand > Außen > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wärmeübergangswiderstand (außen)" // Gemeinsames Label für DIN 13788 und DIN 4108-2
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Wärmeübergangswiderstand > Außen > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          //---------------------------------------------------------------------------------------------------------
          // Nun die raumspezifischen Baueigenschaften ("Baueinheit > Raum > Feuchte > Außenluft > ...") in dieser Rubrik:
          {
            // baueigenschaftenInRubrik[12]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Auslegungstemperatur",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[13]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Jahresmittlere Temperatur",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[14]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Relative Auslegungsluftfeuchte",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[15]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Sättigungsdampfdruck",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[16]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Wasserdampfpartialdruck",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[17]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Wärmeübergangswiderstand > Außen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Innenluftfeuchte des Raums",
        radio: false,
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Winter > Geregelt?",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Winter > Eingeregelte relative Luftfeuchte",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Luftfeuchteklasse > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Luftfeuchteklasse der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Luftfeuchteklasse > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Luftfeuchteklasse der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Feuchteanhebung > Delta-v > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Feuchteanhebung (Delta-v) der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Feuchteanhebung > Delta-v > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Feuchteanhebung (Delta-v) der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Feuchteanhebung > Delta-p > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Feuchteanhebung (Delta-p) der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Feuchteanhebung > Delta-p > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Feuchteanhebung (Delta-p) der Innenluft des Raums"
          }
        ]
      },
      //===========================================================================================================
      // 2. Zeile von Rubriken auf Desktop
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Klimarandbedingungen des Raums (Winter)",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Temperatur > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Innenlufttemperatur des Raums"
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Temperatur > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Innenlufttemperatur des Raums"
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Temperatur > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Innenlufttemperatur des Raums"
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Sättigungsdampfdruck > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Sättigungsdampfdruck der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Sättigungsdampfdruck > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Sättigungsdampfdruck der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Sättigungsdampfdruck > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Sättigungsdampfdruck der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Wasserdampfpartialdruck der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Wasserdampfpartialdruck der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Wasserdampfpartialdruck der Innenluft des Raums"
          },
          //=========================================================================================================================
          // ACHTUNG: Im UI könnte die folgende Zeile mit BEgs für "Relative Luftfeuchte" eventuell auch
          // über die Zeile mit BEGs für "Wasserdampfpartialdruck" verschoben werden, da letztere (bei geregelter Luftfeuchte
          // in Spalte 2 und 4) als Produkt aus
          // dem Wert für "Relative Luftfeuchte" mal dem Wert für "Sättigungsdampfdruck" berechnet wird, nach Diskussion mit Erik.
          // Allerdings werden umgekehrt im ungeregelten Fall (Spalte 1 und 3), die Werte für "Relative Luftfeuchte" als Quotient aus
          // Wasserdampfpartialdruck und Sättigungsdampfdruck berechnet, so dass die beiden Zeilen
          // eine gegenseitige Abhängigkeit haben, abhängig davon, ob ungeregelt doer geregelt.
          //=========================================================================================================================
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Relative Innenluftfeuchte des Raums"
          },
          {
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Relative Innenluftfeuchte des Raums"
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Relative Innenluftfeuchte des Raums"
          },
          {
            // baueigenschaftenInRubrik[12]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Dichte > Trocken > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der trockenen Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[13]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Dichte > Trocken > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der trockenen Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[14]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Dichte > Trocken > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der trockenen Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[15]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Dichte > Feucht > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der feuchten Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[16]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Dichte > Feucht > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der feuchten Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[17]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Dichte > Feucht > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der feuchten Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[18]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wassergehalt > Massebezogen > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Massebezogener Wassergehalt der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[19]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wassergehalt > Massebezogen > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Massebezogener Wassergehalt der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[20]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wassergehalt > Massebezogen > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Massebezogener Wassergehalt der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[21]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wassergehalt > Volumenbezogen > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Volumenbezogener Wassergehalt der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[22]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wassergehalt > Volumenbezogen > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Volumenbezogener Wassergehalt der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[23]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wassergehalt > Volumenbezogen > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Volumenbezogener Wassergehalt der Innenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[24]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Dichte > Trocken > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der trockenen Außenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[25]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Dichte > Trocken > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der trockenen Außenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[26]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Dichte > Trocken > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dichte der trockenen Außenluft des Raums"
          },
          {
            // baueigenschaftenInRubrik[27]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Dichte > Auslegungsklima > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Dichte der Außenluft des Raums bei Auslegungsklima"
          },
          {
            // baueigenschaftenInRubrik[28]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Dichte > Auslegungsklima > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Dichte der Außenluft des Raums bei Auslegungsklima"
          },
          {
            // baueigenschaftenInRubrik[29]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Außenluft > Dichte > Auslegungsklima > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Dichte der Außenluft des Raums bei Auslegungsklima"
          },
          {
            // baueigenschaftenInRubrik[30]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Auftriebsdruck > Bei Raumhöhe > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Auftriebsdruck des Raums bei Raumhöhe (berechnetes Feld im Tab 'Standort > Decke/Boden')"
          },
          {
            // baueigenschaftenInRubrik[31]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Auftriebsdruck > Bei Raumhöhe > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Auftriebsdruck des Raums bei Raumhöhe (berechnetes Feld im Tab 'Standort > Decke/Boden')"
          },
          {
            // baueigenschaftenInRubrik[32]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Auftriebsdruck > Bei Raumhöhe > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Auftriebsdruck des Raums bei Raumhöhe (berechnetes Feld im Tab 'Standort > Decke/Boden')"
          }
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik:
          "Berechnete Mindest-Oberflächentemperaturen und Mindest-Bemessungs-Temperaturfaktoren",
        baueigenschaftenInRubrik: [
          //-----------------------------------------------------------------------------------------------
          // NEU: "Baueinheit > Raum > Feuchte": 36 Baueigenschaften
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Tauwasser > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Tauwasser > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Tauwasser > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Schimmel > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Schimmel > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Schimmel > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Korrosion > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Korrosion > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Relative Luftfeuchte > Höchstwert > Vermeidung Korrosion > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchstwert der relativen Innenluftfeuchte zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Tauwasser > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Tauwasservermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Tauwasservermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Tauwasser > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Tauwasservermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Tauwasservermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Tauwasser > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Tauwasservermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Tauwasservermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[12]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Schimmel > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Schimmelvermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Schimmelvermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[13]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Schimmel > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Schimmelvermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Schimmelvermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[14]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Schimmel > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Schimmelvermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Schimmelvermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[15]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Korrosion > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Korrosionsvermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Korrosionsvermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[16]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Korrosion > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Korrosionsvermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Korrosionsvermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[17]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Wasserdampfpartialdruck > Höchstwert > Vermeidung Korrosion > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "Mindest-Sättigungsdampfdruck zur Korrosionsvermeidung im Raum" // ALT
            labelBaueigenschaft:
              "Höchst-Wasserdampfpartialdruck zur Korrosionsvermeidung im Raum" // NEU
          },
          {
            // baueigenschaftenInRubrik[18]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Tauwasser > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[19]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Tauwasser > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[20]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Tauwasser > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[21]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Schimmel > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[22]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Schimmel > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[23]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Schimmel > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[24]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Korrosion > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[25]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Korrosion > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[26]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Oberflächentemperatur > Mindestwert > Vermeidung Korrosion > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Oberflächentemperatur zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[27]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Tauwasser > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[28]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Tauwasser > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[29]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Tauwasser > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Tauwasservermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[30]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Schimmel > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[31]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Schimmel > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[32]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Schimmel > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Schimmelvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[33]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Korrosion > Sollwert > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[34]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Korrosion > Sollwert > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Korrosionsvermeidung im Raum"
          },
          {
            // baueigenschaftenInRubrik[35]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Feuchte > Innenluft > Bemessungs-Temperaturfaktor > Mindestwert > Vermeidung Korrosion > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindest-Bemessungs-Temperaturfaktor zur Korrosionsvermeidung im Raum"
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitRaumBaueigenschaftsProfilFormular[3] // Tab 3 (Energie (ALT))/Gebäudetechnik (NEU))
  {
    ueberschriftTab: "Angaben zur Gebäudetechnik des Raums",
    // ueberschriftTab: "Angaben zur Energie des Raums", // ALT
    rubrikenInTab: [
      // Hier keine leere Rubrik 0, da keine gemeinsamen Baueigenschaften mit übergeordneten Profilen
      /*
      {
        // ACHTUNG: Rubrik 0 ist reserviert für gemeinsame Baueigenschaften mit übergeordneten Profilen, die nicht unbedingt angezeigt
        //          werden, aber zur Initialisierung und Berechnung von Feldern benötigt werden!
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik:
          "Gemeinsame Baueigenschaften mit übergeordneten Baueigenschaftsprofilen",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      */
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Tagesbezogene Nutzungszeiten des Raums",
        baueigenschaftenInRubrik: [
          //--------------------------------------------------------------------------------------------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Tag > Beginn > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Täglicher Nutzungsbeginn" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Tag > Beginn > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Tag > Ende > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Tägliches Nutzungsende" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Tag > Ende > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Tag > Stunden > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Tägliche Nutzungsstunden" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Tag > Stunden > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Jahresbezogene Nutzungszeiten des Raums",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Jahr > Tage > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Jährliche Nutzungstage" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Jahr > Tage > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Jahr > Tag > Stunden > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Jährliche Nutzungsstunden zur Tagzeit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Jahr > Tag > Stunden > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Jahr > Nacht > Stunden > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Jährliche Nutzungsstunden zur Nachtzeit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Zeit > Jahr > Nacht > Stunden > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      // rubrikenInTab[1] // Rubrik 1
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Tägliche Betriebsstunden Haustechnik",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Heizung > Zeit > Tag > Stunden > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Tägliche Betriebsstunden Heizung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Heizung > Zeit > Tag > Stunden > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Kühlung > Zeit > Tag > Stunden > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Tägliche Betriebsstunden Kühlung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Kühlung > Zeit > Tag > Stunden > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Raumlufttechnik > Zeit > Tag > Stunden > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Tägliche Betriebsstunden Raumlufttechnik" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Raumlufttechnik > Zeit > Tag > Stunden > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Jährliche Betriebstage Haustechnik",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Heizung > Zeit > Jahr > Tage > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Jährliche Betriebstage Heizung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Heizung > Zeit > Jahr > Tage > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Kühlung > Zeit > Jahr > Tage > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Jährliche Betriebstage Kühlung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Kühlung > Zeit > Jahr > Tage > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Raumlufttechnik > Zeit > Jahr > Tage > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Jährliche Betriebstage Raumlufttechnik" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Betrieb > Raumlufttechnik > Zeit > Jahr > Tage > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[4] // Rubrik 4
        ueberschriftRubrik: "Solltemperaturen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Solltemperatur > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Solltemperatur Heizung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Solltemperatur > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Kühlung > Solltemperatur > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Solltemperatur Kühlung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Kühlung > Solltemperatur > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Reduzierter Betrieb > Absenkung > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Temperatur-Absenkung Heizung im reduzierten Betrieb" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Reduzierter Betrieb > Absenkung > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[5] // Rubrik 5
        ueberschriftRubrik: "Grenztemperaturen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Auslegung > Minimaltemperatur > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Minimaltemperatur Auslegung Heizung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Auslegung > Minimaltemperatur > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Kühlung > Auslegung > Maximaltemperatur > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Maximaltemperatur Auslegung Kühlung" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Kühlung > Auslegung > Maximaltemperatur > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Zulässige Raumtemperatur > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässige Raumtemperatur Heizbetrieb" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Heizung > Zulässige Raumtemperatur > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Kühlung > Zulässige Raumtemperatur > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässige Raumtemperatur Kühlbetrieb" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Kühlung > Zulässige Raumtemperatur > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[6] // Rubrik 6
        ueberschriftRubrik: "Wärmequellen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Wärmequellen > Personen > Wärmeabgabe > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wärmeabgabe durch Personen" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Wärmequellen > Personen > Wärmeabgabe > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Wärmequellen > Arbeitshilfen > Wärmeabgabe > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wärmeabgabe durch Arbeitshilfen" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Wärmequellen > Arbeitshilfen > Wärmeabgabe > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[7] // Rubrik 7
        ueberschriftRubrik: "Außenluftanforderungen Nicht-Wohnräume",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Innerhalb Nutzungszeiten > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindestaußenluft-Volumenstrom innerhalb Nutzungszeit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Innerhalb Nutzungszeiten > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Außerhalb Nutzungszeiten > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindestaußenluft-Volumenstrom außerhalb Nutzungszeit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Außerhalb Nutzungszeiten > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Gebäude > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Mindestaußenluft-Volumenstrom für Gebäude" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Gebäude > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestaußenluftanteil > Schwimmhalle > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Mindestaußenluft-Anteil bei Schwimmhallen" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestaußenluftanteil > Schwimmhalle > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[8] // Rubrik 8
        ueberschriftRubrik: "Außenluftanforderungen Wohnräume",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Wohnräume > Nicht bedarfsgeführt > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindestaußenluft-Volumenstrom nicht bedarfsgeführte Wohnräume" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Wohnräume > Nicht bedarfsgeführt > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Wohnräume > Bedarfsgeführt > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Mindestaußenluft-Volumenstrom bedarfsgeführte Wohnräume" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Außenluft > Mindestvolumenstrom > Wohnräume > Bedarfsgeführt > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[9] // Rubrik 9
        ueberschriftRubrik: "Weitere Anforderungen Raumlufttechnik",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Luftfeuchte > Anforderungsklasse > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Luftfeuchte-Anforderungsklasse" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Luftfeuchte > Anforderungsklasse > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Relative Abwesenheit > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Relative Abwesenheit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Relative Abwesenheit > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Gebäudebetriebszeit > Teilbetriebsfaktor > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Teilbetriebsfaktor für Gebäudebetriebszeit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Klima > Raumlufttechnik > Gebäudebetriebszeit > Teilbetriebsfaktor > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      //--------------------------------------------------------------------------------------------------------------------
      {
        // rubrikenInTab[10] // Rubrik 10
        ueberschriftRubrik: "Beleuchtung",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Stärke > Wartungswert > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wartungswert der Beleuchtungsstärke" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Stärke > Wartungswert > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Nutzebene > Höhe > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Höhe der Nutzebene" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Nutzebene > Höhe > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Sehaufgabe > Minderungsfaktor > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Minderungsfaktor für Sehaufgabe" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Sehaufgabe > Minderungsfaktor > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Relative Abwesenheit > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Relative Abwesenheit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Relative Abwesenheit > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Raumindex > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Raumindex" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Raumindex > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Betriebszeit > Teilbetriebsfaktor > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Teilbetriebsfaktor für Betriebszeit" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Betriebszeit > Teilbetriebsfaktor > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[12]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Vertikale Flächen > Anpassungsfaktor > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Anpassungsfaktor für vertikale Flächen" // Gemeinsames Label
          },
          {
            // baueigenschaftenInRubrik[13]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Beleuchtung > Vertikale Flächen > Anpassungsfaktor > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitRaumBaueigenschaftsProfilFormular[4] // Tab 4 (Nutzung)
  // ACHTUNG: Dieses ist bei der Anzeige der Unter-Tabs von "Raum" ganz vorne! Reihenfolge hier im Layout ist anders!!!
  {
    ueberschriftTab: "Angaben zur Nutzung des Raum",
    rubrikenInTab: [
      // Hier keine leere Rubrik 0, da keine gemeinsamen Baueigenschaften mit übergeordneten Profilen
      /*
    {
      // ACHTUNG: Rubrik 0 ist reserviert für gemeinsame Baueigenschaften mit übergeordneten Profilen, die nicht unbedingt angezeigt
      //          werden, aber zur Initialisierung und Berechnung von Feldern benötigt werden!
      // rubrikenInTab[0] // Rubrik 0
      ueberschriftRubrik:
        "Gemeinsame Baueigenschaften mit übergeordneten Baueigenschaftsprofilen",
      baueigenschaftenInRubrik: [
        // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
      ]
    },
    */
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Nutzungsart des Raums",
        baueigenschaftenInRubrik: [
          //--------------------------------------------------------------------------------------------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzung > Profil",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Nutzung des Raums"
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitRaumBaueigenschaftsProfilFormular[5] // Tab 5 (Lasten)
  // ACHTUNG: Reihenfolge der Tabs hier im Layout ist anders als im Profilformular!!!
  {
    ueberschriftTab: "Angaben zu den Lasten des Raums",
    rubrikenInTab: [
      // Hier keine leere Rubrik 0, da keine gemeinsamen Baueigenschaften mit übergeordneten Profilen
      /*
    {
      // ACHTUNG: Rubrik 0 ist reserviert für gemeinsame Baueigenschaften mit übergeordneten Profilen, die nicht unbedingt angezeigt
      //          werden, aber zur Initialisierung und Berechnung von Feldern benötigt werden!
      // rubrikenInTab[0] // Rubrik 0
      ueberschriftRubrik:
        "Gemeinsame Baueigenschaften mit übergeordneten Baueigenschaftsprofilen",
      baueigenschaftenInRubrik: [
        // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
      ]
    },
    */
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Lotrechte Nutzlasten",
        baueigenschaftenInRubrik: [
          //--------------------------------------------------------------------------------------------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Kategorie > Vorgabewert",
            //========================================================================================================================
            radio: true, // Boolean - steuert die für das v-model notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Mit String statt Array sind somit im Profilformular-Code einfachere Abfragen auf den Wert des Felds möglich!
            //========================================================================================================================
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzlastenkategorie des Raums (Vorgabewert)"
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Kategorie > Richtwert",
            //========================================================================================================================
            radio: true, // Boolean - steuert die für das v-model notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Mit String statt Array sind somit im Profilformular-Code einfachere Abfragen auf den Wert des Felds möglich!
            //========================================================================================================================
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzlastenkategorie des Raums (Richtwert)"
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Flächenlast > Vorgabewert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Flächenlast des Raums (Vorgabewert)"
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Flächenlast > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Flächenlast des Raums (Richtwert)"
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Flächenlast > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Flächenlast des Raums (Sollwert)"
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Einzellast > Vorgabewert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Einzellast des Raums (Vorgabewert)"
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Einzellast > Richtwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Einzellast des Raums (Richtwert)"
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzlasten > Einzellast > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Einzellast des Raums (Sollwert)"
          },
        ]
      },
      {
      // rubrikenInTab[1] // Rubrik 1
      ueberschriftRubrik: "Raddrücke",
      baueigenschaftenInRubrik: [
        //--------------------------------------------------------------------------------------------------------------------
      ]
    }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[6] // Tab 6, NEU: #387
  {
    ueberschriftTab: "Musterhaftigkeit",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Angaben zur Musterhaftigkeit des Raumss",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            "Baueinheit > Raum > Struktur > Einordnung > Muster > Gültigkeit > Bauvorhaben",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gültigkeit als Musterraum" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Raum > Struktur > Einordnung > Muster > Gültigkeit > Räume > Nutzungsprofil",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gültigkeit als Musterraum für Räume mit demselben Nutzungsprofil" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
            "Baueinheit > Raum > Struktur > Einordnung > Muster > Gültigkeit > Erläuterung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erläuterung zur Gültigkeit als Musterraum" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      }
    ]
  }
];

module.exports = LayoutBaueinheitRaumBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaueinheitRaumBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
