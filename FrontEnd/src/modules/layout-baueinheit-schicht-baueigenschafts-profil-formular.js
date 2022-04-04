// layout-baueinheit-schicht-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für "Baueinheit > Schicht"
// Besteht aus Rubriken mit Zeilen für einzelne Baueigenschaften
//---------------------------------------------------------------------------------------------------
// #360 08.10.2021
// NEU: Wegen Concurrency Problemem an Schichten im Bodenaufbau, wenn nur ein gemeinsames herkömmliches Layout LayoutBaueinheitSchichtBaueigenschaftsProfilFormular
//      importiert wird in allen Schichtformularen, ist hier eine Factory notwendig zur Erzeugung individueller Instanzen
//      des Arrays layoutBaueinheitSchichtBaueigenschaftsProfilFormular - dies erfolgt mit der folgenden Factory-Funktion:
//------------------------------------------------------------------------------------------------------------------------------------------------------------
// ACHTUNG: In diesem Layout File gibt es bisher keine Unter-Tabs auf der obersten Hierarchieebene wie in anderen Layout Files!!!
// ACHTUNG: Wegen der fehlenden Unter-Tabs kann dieses Layout aktuell nicht angezeigt werden vom layoutgesteuerten generischen Profilformular!!!
//------------------------------------------------------------------------------------------------------------------------------------------------------------
// TODO #362 - für U-Wert/R-Wert-Berechnungen sind neue Baueigenschaften erforderlich:
/*
"Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Intern", // Interner Wärmeübergangswiderstand R si des Bodenaufbaus - computed aus Angrenzungssituation und Fußbodenheizung des Bodenaufbaus - siehe PPT
"Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Extern", // Externer Wärmeübergangswiderstand R se des Bodenaufbaus - computed aus Angrenzungssituation und Fußbodenheizung des Bodenaufbaus - siehe PPT
"Baueinheit > Bodenaufbau > Wärmeschutz > Flächenheizung?", // Bodenaufbau enthält Flächenheizung? Wahrheitswert

// Die folgenden beiden BEgs sollten umbenannt werden:
// Sie sollten computed werden, da viele andere BEgs wie Angrenzungssituation, Flächenheizung, Wohn-/Nichtwohngebäude mit eingehen!
// "Baueinheit > Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert", // Muss computed werden
// "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert", // Muss ebenfalls computed werden
// Eventuell sind hier noch weitere Sollwerte notwendig bzw. Unterscheidung nach GEG, GEG Sanierung, KfW 40, KfW 55
// Diese könnten auch mit einem Aufzählungswert unterschieden werden, der dann in die Berechnung des Sollwerts eingeht
// KfW unterscheidet:
// KfW Energieefizient Bauen (dort KfW 40 Plus, 40, 55 unterschieden!) - https://www.kfw.de/PDF/Download-Center/F%C3%B6rderprogramme-(Inlandsf%C3%B6rderung)/PDF-Dokumente/6000003465_M_153_EEB_TMA_2018_04.pdf
// KfW Energieefizient Sanieren - https://www.kfw.de/PDF/Download-Center/F%C3%B6rderprogramme-(Inlandsf%C3%B6rderung)/PDF-Dokumente/6000003612_M_151_152_430_Anlage_TMA_2018_04.PDF
// KfW Energieeffizient Bauen und Sanieren - Nichtwohngebäude - https://www.kfw.de/PDF/Download-Center/F%C3%B6rderprogramme-(Inlandsf%C3%B6rderung)/PDF-Dokumente/6000003418_M_TMA_EBS_NWG.pdf
// Insofern könnte man auch für jede KfW- und GEG-Variante eine eigene BEg als Sollwert vorhalten
// und diese computen aus Angrenzungssituation, Flächenheizung, Wohn-/Nichtwohngebäude (wobei bzgl. letzerem manche Programme nicht anwendbar sind)
// Diese könnte man dann gleichzeitig anzeigen (was aber Platz kostet und eine direkte Abhängigkeit zu den Programmen schafft, die sich oft ändern)
// Insofern erscheint es besser, vorläufig nur eine Baueigenschaft für den Sollwert des Wärmedurchgangskoeffizienten vorzuhalten, und
// diese zu berechnen aus den genannten 3 Angaben - diese ist bereits vorhanden:
// "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Sollwert" // Pendant zu "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert" unten

// Für die Unterscheidung Wohn-/Nichtwohngebäude gibt es bereits BEgs am Bauvorhaben, die allerdings nach Bestandsbau/Neubau unterscheiden:
// Bauvorhaben > Baumaßnahme > Neubau > Nutzung > Wohn-/Nichtwohngebäude?
// Bauvorhaben > Baumaßnahme > Bestandsbau > Nutzung > Wohn-/Nichtwohngebäude?
// Besser müsste man diese Unterscheidung aus dem Gebäude in das Profil "Baueinheit > Bodenaufbau" als gemeinsame BEg weitervererben und für die Berechnungen dort verwenden:
"Baueinheit > Gebäude > Nutzung > Typ > EnEV/GEG"

// Weitere bereits vorhandene BEgs, die benutzt werden sollten:
// "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert", // Wärmeleitfähigkeit Lambda der Schicht (Istwert) - ggf. aus Baustoff
// "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert", // Wärmedurchlasswiderstand R Lambda der Schicht (Istwert) - computed aus Dicke / Lambda der Schicht
// Diese wurden unten in die neue Rubrik "Wärmeschutz" aufgenommen!

"Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Angrenzungssituation", // Sollte umbenannt werden nach "Baueinheit > Bodenaufbau > Wärmeschutz > Angrenzungssituation" und Optionen angepasst werden
// "Baueinheit > Bodenaufbau > Wärmeschutz > Flächenheizung > Angrenzungssituation", // So nicht erforderlich
// "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert", // Wärmedurchlasswiderstand R Lamba des Bodenaufbaus (Istwert) - computed aus der Summe der R Lambdas der Schichten sowie R si und R se
// "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert", // Wärmedurchgangskoeffizient U des Bodenaufbaus (Istwert) - computed als Kehrwert von R Lambda
*/

// Momentane Belegung der Baueigenschaften im Profil-Models für "Schicht" - OHNE die gemeinsamen mit "Raum", "Bauvorhaben und "Gebäude"!
/*
[
  "Baueinheit > Schicht > Estrich > Bauart",
  "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Istwert",
  "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Sollwert",
  "Baueinheit > Schicht > Estrich > Bindemittelart",
  "Baueinheit > Schicht > Estrich > Einbauart",
  "Baueinheit > Schicht > Estrich > Heizestrich > Bauart",
  "Baueinheit > Schicht > Estrich > Heizestrich > Heizrohre > Dicke",
  "Baueinheit > Schicht > Estrich > Härteklasse > Istwert",
  "Baueinheit > Schicht > Estrich > Härteklasse > Sollwert",
  "Baueinheit > Schicht > Geometrie > Dicke",
  "Baueinheit > Schicht > Mechanik > Druckspannung bei 10 % Stauchung",
  "Baueinheit > Schicht > Mechanik > Dynamische Steifigkeit",
  "Baueinheit > Schicht > Mechanik > Rohdichte",
  "Baueinheit > Schicht > Mechanik > Zusammendrückbarkeit",
  "Baueinheit > Schicht > Nutzlasten > Einzellast > Istwert",
  "Baueinheit > Schicht > Nutzlasten > Einzellast > Sollwert",
  "Baueinheit > Schicht > Nutzlasten > Flächenlast > Istwert",
  "Baueinheit > Schicht > Nutzlasten > Flächenlast > Sollwert",
  "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert",
  "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Sollwert",
  "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert",
  "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Sollwert",
  "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Paket",
  "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",
  "Baueinheit > Schicht > Zuordnung > Schichtaufbau > Index"
];
*/
//------------------------------------------------------------------------------------------------------------------------------------------------------------

function createLayoutBaueinheitSchichtBaueigenschaftsProfilFormular() {
  return [
    {
      // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[0] // Rubrik 0
      ueberschriftRubrik: "Gemeinsame Angaben für alle Schichttypen",
      baueigenschaftenInRubrik: [
        {
          // baueigenschaftenInRubrik[0]
          baueigenschaftsBezeichnung: "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft:
            "Zuordnung der Schicht zu Schichttyp im Bodenaufbau (steuert Unterrubriken der Schicht)", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[1]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Paket",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft:
            "Zuordnung der Schicht zu Schichtpaket im Bodenaufbau (steuert zukünftig Dickenberechnungen im Bodenaufbau)", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[2]
          baueigenschaftsBezeichnung: "Baueinheit > Schicht > Geometrie > Dicke",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Dicke der Schicht im Schichtaufbau", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[3]
          baueigenschaftsBezeichnung: "Baueinheit > Schicht > Mechanik > Rohdichte",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Rohdichte der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        }
      ]
    },
    {
      // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[1] // Rubrik 1
      ueberschriftRubrik: "Angaben zum Wärmeschutz für alle Schichttypen",
      baueigenschaftenInRubrik: [
        {
          // baueigenschaftenInRubrik[0]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert", // ACHTUNG: Hier Anzeige von Sollwert in erster und Istwert in zweiter Spalte!!!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Wärmeleitfähigkeit der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert:
            "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Sollwert",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: "≥",
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        // ALT - aus ursprünglichem Layout ohne zweispaltige Soll-/Istwerte:
        /*
      {
        // baueigenschaftenInRubrik[1]
        baueigenschaftsBezeichnung:
          "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Sollwert",
        indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
      },
      */
        {
          // baueigenschaftenInRubrik[1]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert", // ACHTUNG: Hier Anzeige von Sollwert in erster und Istwert in zweiter Spalte!!!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Wärmedurchlasswiderstand der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert:
            "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Sollwert",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: "≤",
          benutzeComputedWert: true, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: "waermedurchlasswiderstandSchicht", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
          // =============================================================================================================================================
          // NEU (optional):
          // benutzeComputedWertSollwert: true, zeigt an, dass der Sollwert über computed-Eigenschaften berechnet wird
          // Dann muss in bezeichnungComputedPropertySollwert die Bezeichnung der Baueigenschaft des Sollwerts angegeben werden, der computed werden soll!
          //==============================================================================================================================================
        }
        // ALT - aus ursprünglichem Layout ohne zweispaltige Soll-/Istwerte:
        /*
      {
        // baueigenschaftenInRubrik[3]
        baueigenschaftsBezeichnung:
          "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Sollwert",
        indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
        disable: false // Flag für Steuerung :disable am Feld
      },
      */
      ]
    },
    {
      // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[2] // Rubrik 2
      ueberschriftRubrik: "Spezifische Angaben für Estriche",
      baueigenschaftenInRubrik: [
        {
          // baueigenschaftenInRubrik[0]
          baueigenschaftsBezeichnung: "Baueinheit > Schicht > Estrich > Bauart", // ACHTUNG: Es gibt hier keinen Istwert, daher hilfsweise hier den Sollwert genommen, wird aber unterdrückt
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Estrichbauart der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: "Baueinheit > Schicht > Estrich > Bauart",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: true // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[1]
          baueigenschaftsBezeichnung: "Baueinheit > Schicht > Estrich > Bindemittelart", // ACHTUNG: Es gibt hier keinen Istwert, daher hilfsweise hier den Sollwert genommen, wird aber unterdrückt
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Estrichbindemittelart der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert:
            "Baueinheit > Schicht > Estrich > Bindemittelart",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: true // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[2]
          baueigenschaftsBezeichnung: "Baueinheit > Schicht > Estrich > Einbauart", // ACHTUNG: Es gibt hier keinen Istwert, daher hilfsweise hier den Sollwert genommen, wird aber unterdrückt
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Estricheinbauart der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: "Baueinheit > Schicht > Estrich > Einbauart",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: true // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[3]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Istwert", // Hier Sollwert und Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Estrichbiegezugfestigkeitsklasse der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert:
            "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Sollwert",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: "≤",
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[4]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Estrich > Härteklasse > Istwert", // Hier Sollwert und Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Estrichhärteklasse der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert:
            "Baueinheit > Schicht > Estrich > Härteklasse > Sollwert",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: "≤",
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[5]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Estrich > Heizestrich > Bauart", // Hier nur Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Heizestrichbauart der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[6]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Estrich > Heizestrich > Heizrohre > Dicke", // Hier nur Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Dicke der Heizrohre der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        }
      ]
    },
    {
      // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[3] // Rubrik 3
      ueberschriftRubrik: "Spezifische Angaben für Dämmungen",
      baueigenschaftenInRubrik: [
        {
          // baueigenschaftenInRubrik[0]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Mechanik > Dynamische Steifigkeit", // Hier vorläufig nur Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Dynamische Steifigkeit der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[1]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Mechanik > Zusammendrückbarkeit", // Hier vorläufig nur Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Zusammendrückbarkeit der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[2]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Mechanik > Druckspannung bei 10 % Stauchung", // Hier vorläufig nur Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Druckspannung bei 10 % Stauchung der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert: null,
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: null,
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        },
        {
          // baueigenschaftenInRubrik[3]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Nutzlasten > Flächenlast > Istwert", // Hier Sollwert und Istwert!
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: true, // Flag für Steuerung :disable am Feld
          //------------------------------------------------------------------------------------------------------------------
          // Start zusätzliche Props für "Schicht" seit Umstellung auf dasselbe Layout wie "Bodenaufbau":
          labelBaueigenschaft: "Flächenlast der Schicht", // NEU: #281/#302b
          baueigenschaftsBezeichnungSollwert:
            "Baueinheit > Schicht > Nutzlasten > Flächenlast > Sollwert",
          indexSollwertInProfilModelAusgewaehlterKnoten: null,
          operatorSollIstWerteVergleich: "≤",
          benutzeComputedWert: false, // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
          // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
          // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
          // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
          // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
          bezeichnungComputedProperty: null, // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          bezeichnungVergleichSollIstWert: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Schicht"!
          nurSollWertAnzeigen: false // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
          // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
          // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
        }
      ]
    },
    {
      // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[5] // Rubrik 4
      ueberschriftRubrik:
        "Spezifische Angaben für weitere Schichttypen [noch nicht implementiert]",
      baueigenschaftenInRubrik: [
        // Aktuell noch leer!
      ]
    }
  ];
}
module.exports = createLayoutBaueinheitSchichtBaueigenschaftsProfilFormular; // NEU, #360, Factory-Funktion
// ACHTUNG: Mit
// export default LayoutBaueinheitSchichtBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
