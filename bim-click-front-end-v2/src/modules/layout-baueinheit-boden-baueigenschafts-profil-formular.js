// layout-baustoff-estrich-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für das Baueigenschaftsprofil "Baustoff > Estrich"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften
// HINWEIS: Als Test-Layout kann layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js verwendet werden!

const LayoutBaueinheitBodenBaueigenschaftsProfilFormular = [
  // layoutBaueinheitBodenBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Geometrie",
    labelTab: "Geometrie", // Neue Property für layoutgesteuertes generisches Profilformular
    bemerkungTab: "Default-Tooltip für Unter-Tab 'Geometrie'", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    // NEU: Fachliche Hilfe an Tab
    beschreibungTab: `Fachliche Hilfe für Unter-Tab "Geometrie"
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
    anzahlSpaltenTab: 1, // NEU: Optionale Property für Anzahl der Spalten des Tabs - 1, 2 oder 3 - Default ist 1
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Maße des Bodens",
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
          "<b>Maße des Raums</b>",
          "<b>Maße des Bodens</b>",
          "<b>Maße des Bodens auf Maße des Raums zurücksetzen</b>",
          "<b>Vergleich: Maß aus Spalte 2 vs. Spalte 5</b>",
          "<b>Berechnete Fläche aus Kindbaueinheiten</b>",
          "<b>Fläche aus Kindbaueinheiten berechnen</b>"
        ], // NEU: Optionale Property zum Test von Spaltenüberschriften für Rubrik, mit v-html-Content
        // ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12)
        // TODO XXXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js! -->
        //
        hinweiseRubrik: // Multiline-String mit v-html
        `
          <span class='text-bold color-black'>Hinweise:</span>
          <br /><span style='color: #000000; background-color: #B2EBF2'>Cyanfarbige</span> Ausgabefelder in Spalte 1: Deren Werte werden im Tab 'Raum' > 'Maße' verwaltet. Diese werden an alle Böden im Raum vererbt. Sie können hier nicht verändert werden.
          <br /><span style='color: #000000; background-color: #E1BEE7'>Lilafarbige</span> Eingabefelder Spalte 2: Deren Werte werden mit Vorgabewerten aus der ersten Spalte vorbelegt. Sie können hier bei Bedarf durch manuelle Eingabe bodenpezifisch angepasst werden.
          <br /><span style='color: #000000; background-color: #C8E6C9'>Hellgrünes</span> Ausgabefeld in Spalte 5: Dessen Werte können per Schaltfläche berechnet werden.
        `,
        // "<span class='text-bold color-red'>Testhinweise:</span> Hinweistext", // Hinweisen am Ende der Rubrik, mit v-html-Content
        // ACHTUNG: Hier <span>, nicht <div>, sonst Line Break!
        //
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue Property - Default ist bg-blue-grey-2
        // spaltenRubrik: 6, // NEU: Optionale Property für Anzahl der Spalten dieser Rubrik - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        spaltenRubrik: [ "2", "2", "2", "1", "2", "3" ], // ALT: Diese Prop hieß ursrprünglich anzahlSpaltenRubrik, umbenannt im Zuge der folgenden Erweiterung
        // NEU: spaltenRubrik kann Zahl sein wie bisher (1, 2, 3, 4, 6, 12) ODER Array!
        // Beispiel für Array: spaltenRubrik: [ "2", "2", "2", "1", "2", "3" ] - spezifiziert alternativ zu festen Spaltenbreiten potentiell unterschiedliche col-x-Werte, Summe muss 12 ergeben!
        baueigenschaftenInRubrik: [
          // Zeile 1:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Flurseite > Lichte Breite",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
           // Button-Feld:
           {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Button", // Neue optionale Prop für Füllfeld ("Filler") oder Link ("Link") oder Button ("Button"), löst in der Template-Logik entsprechendes div aus
            colorButton: "grey-4 text-black", // Farbe für den Button
            labelButton: "Breite = Raumbreite Flurseite", // Label für den Button
            iconRightButton: "settings_backup_restore", // NEU: Icon rechts für den Button
            clickAction: "Reset", // NEU: Prop, die von generalClickMethod(), der @click-Methode am Button, abgefragt wird, und steuert, was diese tun soll
            sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Flurseite > Lichte Breite", // NEU: 1. Sub-Property für die @click-Methode, bei clickAction "Reset"
            istWertBaueigenschaft: "Baueinheit > Boden > Geometrie > Maße > Breite > Istwert", // NEU: 2. Sub-Property für die @click-Methode, bei clickAction "Reset"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Zeile 2:
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Zeile 2:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Fassadenseite > Lichte Breite",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Geometrie > Maße > Breite > Istwert",
            //-----------------------------------------------------------------------------------------------------------------------------------------------
            // Testvariante - ACHTUNG: Funktioniert nur für readonly-Felder, daher wieder verworfen!
            // setValueByMethod: "sollIstWertePaarSetMethod", // Vorinitialisierung dieses Istwerts mit Sollwert! Funktioniert aber nur bei readonly-Feldern korrekt!
            // sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Flurseite > Lichte Breite", // NEU: Belegung mit diesem Sollwert!
            //-----------------------------------------------------------------------------------------------------------------------------------------------
            initializeMitSollWert: true, // NEU - optionale Prop für Vorbelegung mit Default-Wert (z.B. Sollwert), benötigt weitere Prop in nächster Zeile!
            sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Fassadenseite > Lichte Breite", // Paarig mit Prop initializeMitSollWert, gibt die BEg an, mit deren Wert die Vorbelegung erfolgt
            bgColor: "purple-2", // NEU: Vorbelegte Felder mit obigen beiden Props lilafarbig ausgeben!
            //-----------------------------------------------------------------------------------------------------------------------------------------------
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Button-Feld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Button", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            colorButton: "grey-4 text-black", // Farbe für den Button
            labelButton: "Breite = Raumbreite Fassadenseite", // Label für den Button
            iconRightButton: "settings_backup_restore", // NEU: Icon rechts für den Button
            clickAction: "Reset", // NEU: Prop, die von generalClickMethod(), der @click-Methode am Button, abgefragt wird, und steuert, was diese tun soll
            sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Fassadenseite > Lichte Breite", // NEU: 1. Sub-Property für die @click-Methode, bei clickAction "Reset"
            istWertBaueigenschaft: "Baueinheit > Boden > Geometrie > Maße > Breite > Istwert", // NEU: 2. Sub-Property für die @click-Methode, bei clickAction "Reset"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Zeile 3:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Lichte Tiefe", // Wird für Vorbelegung der "Länge" des Bodens verwendet!
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Geometrie > Maße > Länge > Istwert",
            //-----------------------------------------------------------------------------------------------------------------------------------------------
            initializeMitSollWert: true, // NEU - optionale Prop für Vorbelegung mit Default-Wert (z.B. Sollwert), benötigt weitere Prop in nächster Zeile!
            sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Lichte Tiefe", // Paarig mit Prop initializeMitSollWert, gibt die BEg an, mit deren Wert die Vorbelegung erfolgt
            bgColor: "purple-2", // NEU: Vorbelegte Felder mit obigen beiden Props lilafarbig ausgeben!
            //-----------------------------------------------------------------------------------------------------------------------------------------------
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Button-Feld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Button", // Neue optionale Prop für Füllfeld ("Filler") oder Link ("Link") oder Button ("Button"), löst in der Template-Logik entsprechendes div aus
            colorButton: "grey-4 text-black", // Farbe für den Button
            labelButton: "Länge = Raumtiefe", // Label für den Button
            iconRightButton: "settings_backup_restore", // NEU: Icon rechts für den Button
            clickAction: "Reset", // NEU: Prop, die von generalClickMethod(), der @click-Methode am Button, abgefragt wird, und steuert, was diese tun soll
            sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Lichte Tiefe", // NEU: 1. Sub-Property für die @click-Methode, bei clickAction "Reset"
            istWertBaueigenschaft: "Baueinheit > Boden > Geometrie > Maße > Länge > Istwert", // NEU: 2. Sub-Property für die @click-Methode, bei clickAction "Reset"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Zeile 4:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Maße > Grundfläche",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Geometrie > Maße > Fläche > Istwert",
            //-----------------------------------------------------------------------------------------------------------------------------------------------
            initializeMitSollWert: true, // NEU - optionale Prop für Vorbelegung mit Default-Wert (z.B. Sollwert), benötigt weitere Prop in nächster Zeile!
            sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Grundfläche", // Paarig mit Prop initializeMitSollWert, gibt die BEg an, mit deren Wert die Vorbelegung erfolgt
            bgColor: "purple-2", // NEU: Vorbelegte Felder mit obigen beiden Props lilafarbig ausgeben!
            //-----------------------------------------------------------------------------------------------------------------------------------------------
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Button-Feld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Button", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            colorButton: "grey-4 text-black", // Farbe für den Button
            labelButton: "Fläche = Grundfläche Raum", // Label für den Button
            iconRightButton: "settings_backup_restore", // Icon rechts für den Button
            clickAction: "Reset", // NEU: Prop, die von generalClickMethod(), der @click-Methode am Button, abgefragt wird, und steuert, was diese tun soll
            sollWertBaueigenschaft: "Baueinheit > Raum > Geometrie > Maße > Grundfläche", // NEU: 1. Sub-Property für die @click-Methode, bei clickAction "Reset"
            istWertBaueigenschaft: "Baueinheit > Boden > Geometrie > Maße > Fläche > Istwert", // NEU: 2. Sub-Property für die @click-Methode, bei clickAction "Reset"
          },
          // Button-Feld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Comparison", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            linkeBaueigenschaft: "Baueinheit > Boden > Geometrie > Maße > Fläche > Istwert", // NEU: 1. Sub-Property für die Vergleichsmethode, bei specialField "Comparison"
            rechteBaueigenschaft: "Baueinheit > Boden > Geometrie > Maße > Fläche > Berechneter Wert aus Kindbaueinheiten", // NEU: 2. Sub-Property für die Vergleichsmethode, bei specialField "Comparison"
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Geometrie > Maße > Fläche > Berechneter Wert aus Kindbaueinheiten",
            indexInProfilModelAusgewaehlterKnoten: null,
            // readonly: false, // Neue optionale Property, z.B. für berechnete Felder
            // ACHTUNG: Wenn true oder false, überschreibt diese readonly-Prop aus dem Layout sämtliche anderen readonly-Logiken!!!
            // Wenn nicht vorhanden, gelten die üblichen readonly-Logiken am Feld!!!
            // Daher sollte diese readonly-Prop normalerweise nicht angegeben werden, auch nicht auf false!!! (höchstens mit null?)
            bgColor: "light-green-2", // NEU: Color für berechnetes Feld
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Button-Feld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Button", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            colorButton: "grey-4 text-black", // Farbe für den Button
            labelButton: "Berechnen aus Kindbaueinheiten", // Label für den Button
            iconRightButton: "calculate", // NEU: Icon rechts für den Button
            clickAction: "Calculate", // NEU: Prop, die von generalClickMethod(), der @click-Methode am Button, abgefragt wird, und steuert, was diese tun soll
            istWertBaueigenschaft: "Baueinheit > Boden > Geometrie > Maße > Fläche > Berechneter Wert aus Kindbaueinheiten", // NEU: 1. Sub-Property für die @click-Methode, bei clickAction "Calculate"
          }
        ]
      }
    ]
  },
  {
    ueberschriftTab: "Wärmeschutz",
    labelTab: "Wärmeschutz", // Neue Property für layoutgesteuertes generisches Profilformular
    bemerkungTab: "Default-Tooltip für Unter-Tab 'Wärmeschutz'", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    // NEU: Fachliche Hilfe an Tab
    beschreibungTab: `Fachliche Hilfe für Unter-Tab "Wärmeschutz"
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
    anzahlSpaltenTab: 1, // NEU: Optionale Property für Anzahl der Spalten des Tabs - 1, 2 oder 3 - Default ist 1
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Angaben zum Wärmeschutz des Bodens [in Arbeit]",
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
        /*
        spaltenUeberschriftenRubrik: [
          // ACHTUNG: Array-Größe hier muss übereinstimmen mit spaltenRubrik!
          "<b>Testzeile: </b>Spaltenüberschrift 1",
          "<b>Spaltenüberschrift 2 fett</b>",
          "<u>Spaltenüberschrift 3 unterstrichen</u>",
          "<em>Spaltenüberschrift 4 kursiv</em>"
        ], // NEU: Optionale Property zum Test von Spaltenüberschriften für Rubrik, mit v-html-Content
        // ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12)
        // TODO XXXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js! -->
        */
        //
        hinweiseRubrik: // Multiline-String mit v-html
        `
          <span class='text-bold color-black'>Hinweise:</span>
          <br /><span style='color: #000000; background-color: #B2EBF2'>Cyanfarbige</span> Ausgabefelder: Deren Werte wurden von Elternknoten im Bauvorhabenbaum ererbt. Sie können hier nicht verändert werden.
          <br /><span style='color: #000000; background-color: #E1BEE7'>Lilafarbige</span> Eingabefelder: Deren Werte sind mit Vorgabewerten vorbelegt. Sie können hier bei Bedarf durch manuelle Eingabe angepasst werden.
          <br /><span style='color: #000000; background-color: #C8E6C9'>Hellgrüne</span> Ausgabefelder: Deren Werte sind automatisch berechnet oder können bei Bedarf per Schaltfläche berechnet werden.
        `,
        // "<span class='text-bold color-red'>Testhinweise:</span> Hinweistext", // Hinweisen am Ende der Rubrik, mit v-html-Content
        // ACHTUNG: Hier <span>, nicht <div>, sonst Line Break!
        //
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // NEU: Optionale Property für Anzahl der Spalten dieser Rubrik - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          // Zeile 1:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Wärmeschutz > Angrenzungssituation",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Wärmeschutz > Flächenheizung?",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Zeile 2:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Wärmeschutz > Mittlerer Wärmedurchlasswiderstand > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Wärmeschutz > Mittlerer Wärmedurchlasswiderstand > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Zeile 3:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          }
        ]
      }
    ]
  },
  {
    ueberschriftTab: "Schallschutz",
    labelTab: "Schallschutz", // Neue Property für layoutgesteuertes generisches Profilformular
    bemerkungTab: "Default-Tooltip für Unter-Tab 'Schallschutz'", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    // NEU: Fachliche Hilfe an Tab
    beschreibungTab: `Fachliche Hilfe für Unter-Tab "Schallschutz"
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
    anzahlSpaltenTab: 1, // NEU: Optionale Property für Anzahl der Spalten des Tabs - 1, 2 oder 3 - Default ist 1
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Angaben zum Schallschutz des Bodens [in Arbeit]",
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
        /*
        spaltenUeberschriftenRubrik: [
          // ACHTUNG: Array-Größe hier muss übereinstimmen mit spaltenRubrik!
          "<b>Testzeile: </b>Spaltenüberschrift 1",
          "<b>Spaltenüberschrift 2 fett</b>",
          "<u>Spaltenüberschrift 3 unterstrichen</u>",
          "<em>Spaltenüberschrift 4 kursiv</em>"
        ], // NEU: Optionale Property zum Test von Spaltenüberschriften für Rubrik, mit v-html-Content
        // ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12)
        // TODO XXXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js! -->
        */
        //
        hinweiseRubrik: // Multiline-String mit v-html
        `
          <span class='text-bold color-black'>Hinweise:</span>
          <br /><span style='color: #000000; background-color: #B2EBF2'>Cyanfarbige</span> Ausgabefelder: Deren Werte wurden von Elternknoten im Bauvorhabenbaum ererbt. Sie können hier nicht verändert werden.
          <br /><span style='color: #000000; background-color: #E1BEE7'>Lilafarbige</span> Eingabefelder: Deren Werte sind mit Vorgabewerten vorbelegt. Diese können hier bei Bedarf durch manuelle Eingabe angepasst werden.
          <br /><span style='color: #000000; background-color: #C8E6C9'>Hellgrüne</span> Ausgabefelder: Deren Werte sind automatisch berechnet oder können bei Bedarf per Schaltfläche berechnet werden.
        `,
        // "<span class='text-bold color-red'>Testhinweise:</span> Hinweistext", // Hinweisen am Ende der Rubrik, mit v-html-Content
        // ACHTUNG: Hier <span>, nicht <div>, sonst Line Break!
        //
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // NEU: Optionale Property für Anzahl der Spalten dieser Rubrik - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          // 1. Zeile:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Schallschutz > Bewertetes Schalldämmmaß > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Schallschutz > Bewertetes Schalldämmmaß > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // 2. Zeile:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Schallschutz > Resultierendes Schalldämmmaß > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Schallschutz > Resultierendes Schalldämmmaß > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
        ]
      }
    ]
  },
  // NEU- #387:
  {
    ueberschriftTab: "Musterhaftigkeit",
    labelTab: "Musterhaftigkeit", // Neue Property für layoutgesteuertes generisches Profilformular
    bemerkungTab: "Angaben zur Musterhaftigkeit des Bodens: Unterscheidung zwischen regulären Böden und Musterböden, die als Muster für reguläre Böden dienen", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    // NEU: Fachliche Hilfe an Tab
    beschreibungTab: `Fachliche Hilfe für Unter-Tab "Musterhaftigkeit"
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
    anzahlSpaltenTab: 1, // NEU: Optionale Property für Anzahl der Spalten des Tabs - 1, 2 oder 3 - Default ist 1
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Angaben zur Musterhaftigkeit des Bodens",
        bemerkungRubrik: "Angaben zur Musterhaftigkeit des Bodens: Unterscheidung zwischen regulären Böden und Musterböden, die als Muster für reguläre Böden dienen", // NEU: Tooltip an Rubrik
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
        /*
        spaltenUeberschriftenRubrik: [
          // ACHTUNG: Array-Größe hier muss übereinstimmen mit spaltenRubrik!
          "<b>Testzeile: </b>Spaltenüberschrift 1",
          "<b>Spaltenüberschrift 2 fett</b>",
          "<u>Spaltenüberschrift 3 unterstrichen</u>",
          "<em>Spaltenüberschrift 4 kursiv</em>"
        ], // NEU: Optionale Property zum Test von Spaltenüberschriften für Rubrik, mit v-html-Content
        // ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12)
        // TODO XXXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js! -->
        */
        //
        hinweiseRubrik: null,
        // Multiline-String mit v-html
        /*
        `
          <span class='text-bold color-black'>Hinweise:</span>
          <br /><span style='color: #000000; background-color: #B2EBF2'>Cyanfarbige</span> Ausgabefelder: Deren Werte wurden von Elternknoten im Bauvorhabenbaum ererbt. Sie können hier nicht verändert werden.
          <br /><span style='color: #000000; background-color: #E1BEE7'>Lilafarbige</span> Eingabefelder: Deren Werte sind mit Vorgabewerten vorbelegt. Diese können hier bei Bedarf durch manuelle Eingabe angepasst werden.
          <br /><span style='color: #000000; background-color: #C8E6C9'>Hellgrüne</span> Ausgabefelder: Deren Werte sind automatisch berechnet oder können bei Bedarf per Schaltfläche berechnet werden.
        `,
        */
        // "<span class='text-bold color-red'>Testhinweise:</span> Hinweistext", // Hinweisen am Ende der Rubrik, mit v-html-Content
        // ACHTUNG: Hier <span>, nicht <div>, sonst Line Break!
        //
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // NEU: Optionale Property für Anzahl der Spalten dieser Rubrik - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          // 1. Zeile:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Struktur > Einordnung > Muster > Gültigkeit > Bauvorhaben",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Struktur > Einordnung > Muster > Gültigkeit > Räume > Nutzungsnachbarschaft?",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Struktur > Einordnung > Muster > Gültigkeit > Erläuterung",
            indexInProfilModelAusgewaehlterKnoten: null,
            autogrow: true, // NEU: Optionale Property für Bezeichnungswerte
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Füllfeld:
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          // 2. Zeile: Leer
        ]
      }
    ]
  },
  // NEU- #387:
  {
    ueberschriftTab: "Raumnutzungsnachbarschaften",
    labelTab: "Raumnutzungsnachbarschaften", // Neue Property für layoutgesteuertes generisches Profilformular
    bemerkungTab: "Raumnutzungsnachbarschaften des Bodens: Diese sind relevant für den Schallschutz und für Musterböden. Sie werden festgelegt durch das Nutzungsprofil des Raums über dem Boden und ein auswählbares Nutzungsprofil des Nachbarraums unter dem Boden.", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    // NEU: Fachliche Hilfe an Tab
    beschreibungTab: `Fachliche Hilfe für Unter-Tab "Raumnutzungsnachbarschaften"
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
    anzahlSpaltenTab: 1, // NEU: Optionale Property für Anzahl der Spalten des Tabs - 1, 2 oder 3 - Default ist 1
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Angaben zu den Raumnutzungsnachbarschaften des Bodens",
        bemerkungRubrik: "Angaben zu den Raumnutzungsnachbarschaften des Bodens: Diese sind relevant für den Schallschutz und für Musterböden. Sie werden festgelegt durch das Nutzungsprofil des Raums über dem Boden und ein auswählbares Nutzungsprofil des Nachbarraums unter dem Boden.", // NEU: Tooltip an Tab
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
        /*
        spaltenUeberschriftenRubrik: [
          // ACHTUNG: Array-Größe hier muss übereinstimmen mit spaltenRubrik!
          "<b>Testzeile: </b>Spaltenüberschrift 1",
          "<b>Spaltenüberschrift 2 fett</b>",
          "<u>Spaltenüberschrift 3 unterstrichen</u>",
          "<em>Spaltenüberschrift 4 kursiv</em>"
        ], // NEU: Optionale Property zum Test von Spaltenüberschriften für Rubrik, mit v-html-Content
        // ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12)
        // TODO XXXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js! -->
        */
        //
        hinweiseRubrik: null,
        // Multiline-String mit v-html
        /*
        `
          <span class='text-bold color-black'>Hinweise:</span>
          <br /><span style='color: #000000; background-color: #B2EBF2'>Cyanfarbige</span> Ausgabefelder: Deren Werte wurden von Elternknoten im Bauvorhabenbaum ererbt. Sie können hier nicht verändert werden.
          <br /><span style='color: #000000; background-color: #E1BEE7'>Lilafarbige</span> Eingabefelder: Deren Werte sind mit Vorgabewerten vorbelegt. Diese können hier bei Bedarf durch manuelle Eingabe angepasst werden.
          <br /><span style='color: #000000; background-color: #C8E6C9'>Hellgrüne</span> Ausgabefelder: Deren Werte sind automatisch berechnet oder können bei Bedarf per Schaltfläche berechnet werden.
        `,
        */
        // "<span class='text-bold color-red'>Testhinweise:</span> Hinweistext", // Hinweisen am Ende der Rubrik, mit v-html-Content
        // ACHTUNG: Hier <span>, nicht <div>, sonst Line Break!
        //
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // NEU: Optionale Property für Anzahl der Spalten dieser Rubrik - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          // 1. Zeile:
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Profil",
            indexInProfilModelAusgewaehlterKnoten: null,
            readonly: true,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Struktur > Einordnung > Nachbarraum > Nutzungsprofil",
            indexInProfilModelAusgewaehlterKnoten: null,
            disable: false,
            labelBaueigenschaft: null,
            labelBaueigenschaft1: null,
            labelBaueigenschaft2: null,
            toolTipBaueigenschaft1: null,
            toolTipBaueigenschaft2: null,
            hintBaueigenschaft1: null,
            hintBaueigenschaft2: null
          },
          // Füllfeld:
          /*
          {
            // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
            // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit specialField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
            // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialField nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
            specialField: "Filler", // Neue optionale Prop für Füllfeld ("Filler"), Vergleich ("Comparison"), Link ("Link"), Button ("Button"), letztere 2 erzeugen in der Template-Logik entsprechenden Button mit Aktion
            fillText: "" // Wird in der Template-Logik per v-html im div angezeigt, falls specialField "Filler"
          },
          */
          // 2. Zeile: Leer
        ]
      }
    ]
  }
  //------------------------------------------------------------------------------------------------------------------------------------
];

module.exports = LayoutBaueinheitBodenBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaueinheitBodenBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
