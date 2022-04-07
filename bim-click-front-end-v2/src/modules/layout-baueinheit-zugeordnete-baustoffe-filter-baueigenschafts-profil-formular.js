// layout-baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.js
// Exportiert ein "map-artiges" JS Objekt mit Layout für das layoutgesteuerte Filter-Profilformular, welches im Tab "Bauvorhaben" > "Zugeordnete Baustoffe" > "Baustoffe filtern"
// angezeigt wird.
// ZUGRIFF auf ein Unterobjekt erfolgt per Key: layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular["Baustoff > Filter > Estrich"].ueberschriftFilter
// ACHTUNG: Es handelt sich bei diesem speziellen Layout
// a) nicht um einen Array, sondern eine "Pseudo-Map" als JS-Objekt, welche die Profilbezeichnung von speziellen, sogenannten Filterprofilen als Key verwendet.
// b) um ein File, dass die Layouts für viele/alle Filterprofilformulare spezifiziert, nicht nur für eines - deshalb auch die "Pseudo-Map"!
// c) Es hat ein spezielles Format (z.B. Objekt vs. Array), das von den übrigen Layouts abweicht!
// HINWEIS: "Echte" JS-Maps müssten mit new Map erst erzeugt werden - dies testweise versucht in baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue.
// Vorteile: Es gibt zusätzliche Funktionen für Map, die Sortierung beim Einfügen wird garantiert (wird für dieses Layout aktuell aber nicht gebraucht)
// Nachteil: new Map, teilweise Zugriff mit .get statt direkt mit map["key"]
// Filterprofile sind dabei generell reguläre Baueigenschaftsprofile, die aber für die Filterung in Baustoffen oder Baueinheiten benutzt werden.
// Sie können Baueigenschaften aus nur einem "regulären" Profil enthalten (z.B. eine Untermenge davon)
// oder auch aus mehreren "regulären" Profilen.
// Ein bestimmtes Filterprofil, welches in der Map mit seiner Profilbezeichnung angezogen wird (als Key), entspricht dabei normalerweise einem bestimmten Baustoffprofil.
// Beispiel: "Baustoff > Filter > Estrich" ist das Filterprofil für das Baustoffprofil "Baustoff > Estrich".
// In jedem Objekt für ein bestimmtes Filterprofil gibt es dann einen Unter-Array mit
// einzelnen Baueigenschaften, die dann vom layoutgesteuerten Filter-Profilformular in genau
// dieser Reihenfolge als Zeilen mit Eingabefeldern (und zusätzlichen Feldern für Vergleichsoperatoren)
// angezeigt werden, wodurch der Benutzer dann Baustoffe nach bestimmten Werten dieser Felder filtern kann.
// HINWEIS: Als Test-Layout kann layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js verwendet werden!

const LayoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = {
  // Map = JS Object, kein Array!
  // layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular["Baustoff > Filter > Estrich"]
  "Baustoff > Filter > Estrich": {
    // Key in Map: Bezeichnung für ein (spezielles) Filter-Baueigenschaftsprofil
    ueberschriftFilter: "Filter für Estriche",
    // labelFilter: "Test", // Wahrscheinlich überflüssig, da keine eigenen Tabs pro Filter geplant, sondern Auswahl per QSelect
    filterProfilBezeichnung: "Baustoff > Filter > Estrich", // Wiederholung des Keys: Wird für einfacheres Traversal per forEach verwendet
    filterProfilAnzeigeText: "Filter für Estriche",
    // TODO XXXXXX: Der Standard-Anzeigetext des Filterprofils sollte aus einer Property im Model baueigenschaftsProfilAnzeigeText entnommen werden, allerdings gibt es bei Profilen noch keine solche Property im Model!
    spaltenFilter: 6, // NEU: Optionale Property für Anzahl der Spalten des Filterprofilformulars - Default ist 6
    // Spalten im 6-spaltigen Layout: Zu filternde Baueigenschaft (Anzeigetext), Einheit, Operator 1 für Filterbedingung, Wert 1 für Filterbedingung, Operator 2 für Filterbedingung, Wert 2 für Filterbedingung,
    spaltenUeberschriftenFilter: [
      // ACHTUNG: Array-Größe hier muss übereinstimmen mit spaltenFilter!
      "<b>Zu filternde Baueigenschaft</b>",
      "<b>Einheit</b>",
      "<b>Operator</b>",
      "<b>Wert für die Filterbedingung</b>",
      "<b>Operator</b>",
      "<b>Zweiter Wert (bei Wertepaaren)</b>"
    ], // NEU: Property für Spaltenüberschriften für Filterformular, mit v-html-Content
    // ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12)
    // TODO XXXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js! -->
    hinweiseFilterAusklappbar: true, // NEU: Triggert ausklappbares QExpansionItem für die folgenden v-html-Hinweise! Bei false werden diese als v-html ohne QExpansionItem angezeigt.
    hinweiseFilterAusklappbarLabel: "Kurzanleitung: Filtern im Baustoffbaum",
    hinweiseFilterAusklappbarDefaultOpened: false, // NEU: Klappt obiges QExpansionItem auf Wunsch ein oder aus!
    // Multiline-String-Feld aus v-html:
    hinweiseFilter: `
    <ul>
      <li>
        In den Eingabefeldern unten mindestens einen
        <b>Wert für eine Filterbedingung</b> eingeben/auswählen.
        Beispiel für "Estrichbiegezugfestigkeit" als zu filternde
        Baueigenschaft: "F02 ≥ 2 N/mm2"
      </li>
      <li>
        Für jede Filterbedingung eine zugehörigen
        <b>Vergleichsoperator</b> für deren Filterung auswählen.
        Beispiel: Der Operator <b>"≥"</b> für obigen Wert "F02 ≥ 2
        N/mm2" sucht nach allen Baustoffen, die dieselbe oder eine
        größere Estrichbiegezugfestigkeit haben (d.h. "F02 ≥ 2 N/mm2",
        "F03 ≥ 3 N/mm2", "F04 ≥ 4 N/mm2", usw.). Die
        <b>Voreinstellung</b> für die Operatoren ist <b>"=".</b>
      </li>
      <li>
        Mehrere Filterbedingungen werden als
        <b>Und-Bedingungen</b> logisch verknüpft, d.h. es wird nach
        Baustoffen gesucht, die alle Filterbedingungen gleichzeitig
        erfüllen.
      </li>
      <li>
        Zusätzlich links im Baustoffbaum einen geeigneten
        <b>Startknoten</b> für die Filterung auswählen. Dieser muss vor
        Start der Filterung
        <span style="color: #ffffff; background-color: #1976d2">
          <strong>
            &nbsp; farblich markiert &nbsp;
          </strong> </span
        >&nbsp; sein. Es werden dann in allen Zweigen
        <b>unterhalb</b> dieses Startknotens Baustoffe im Baustoffbaum
        gesucht, welche die Filterbedingungen erfüllen.
      </li>
      <li>
        Anschließend unten die Schaltfläche
        <b>"Baustoffe filtern"</b> drücken, um die Filterung zu starten.
      </li>
      <li>
        <b>Hinweis:</b> Ist aktuell <b>kein Knoten</b> oder ein
        <b>Blattknoten</b> im Baustoffbaum als Startknoten ausgewählt,
        bleibt die Schaltfläche <b>"Baustoffe filtern" deaktiviert.</b>
      </li>
      <li>
        Die Ergebnisse der Filterung werden links als
        <b>gefilterter Baustoffbaum</b> angezeigt. Es werden dabei
        <b>nur solche Unterzweige angezeigt,</b> die Baustoffe
        enthalten, welche die gewählten Filterbedingungen erfüllen.
      </li>
      <li>
        Liefert die Filterung nicht die gewünschten Ergebnisse, kann
        mittels der Schaltfläche oberhalb des Baustoffbaums
        <b>"Eingaben zurücksetzen/Baum neu laden"</b> wieder der
        vollständige Baustoffbaum mit den ursprünglichen Zuordnungen von
        Baustoffen zur ausgewählten Baueinheit geladen werden.
      </li>
    </ul>
    `,
    baueigenschaftenInFilter: [
      // Bestimmt Reihenfolge der Felder im Filter-Profilformular
      // NEU - #380: BEg gelöscht
      /*
      {
        // baueigenschaftenInRubrik[0]
        baueigenschaftsBezeichnung: "Baustoff > Estrich > Bauart",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
        disable: false, // Flag für Steuerung :disable am Feld
      },
      */
      {
        // baueigenschaftenInRubrik[0]
        baueigenschaftsBezeichnung: "Baustoff > Estrich > Bindemittelart",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
        // Hier weitere Props möglich:
        // labelBaueigenschaft = "Otto" // Wird ggf. statt des Werts aus typbezogener Baueigenschaft angezeigt
        // toolTipBaueigenschaft = "Hugo" // Wird ggf. statt des Werts aus typbezogener Baueigenschaft angezeigt
      },
      {
        // baueigenschaftenInRubrik[1]
        baueigenschaftsBezeichnung: "Baustoff > Estrich > Einbauart",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
      },
      {
        // baueigenschaftenInRubrik[2]
        baueigenschaftsBezeichnung:
          "Baustoff > Estrich > Biegezugfestigkeitsklasse",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
      },
      {
        // baueigenschaftenInRubrik[3]
        baueigenschaftsBezeichnung: "Baustoff > Estrich > Härteklasse",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
      },
      {
        // baueigenschaftenInRubrik[4]
        baueigenschaftsBezeichnung:
          "Baustoff > Estrich > Druckfestigkeitsklasse",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
      },
      {
        // baueigenschaftenInRubrik[5]
        baueigenschaftsBezeichnung:
          "Baustoff > Estrich > Oberflächenhärteklasse",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
      }
      /*
      {
        // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
        // baueigenschaftenInRubrik[x]
        baueigenschaftsBezeichnung:
          "Baueinheit > Gebäude > Geometrie > Eingang > Niveau > Fertigboden > Oberkante (OKFFB EG)",
        indexInProfilModelZuFilterndeBaueigenschaften: null, // Platzhalter für Index
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
};
//------------------------------------------------------------------------------------------------------------------------------------

module.exports = LayoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
