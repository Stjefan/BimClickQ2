// layout-baueinheit-schicht-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für "Baueinheit > Schicht"
// Besteht aus Rubriken mit Zeilen für einzelne Baueigenschaften
//---------------------------------------------------------------------------------------------------
// #360 08.10.2021
// NEU: Wegen Concurrency Problemem an Schichten im Bodenaufbau, wenn nur ein gemeinsames herkömmliches Layout LayoutBaueinheitSchichtBaueigenschaftsProfilFormular
//      importiert wird in allen Schichtformularen, ist hier eine Factory notwendig zur Erzeugung individueller Instanzen
//      des Arrays layoutBaueinheitSchichtBaueigenschaftsProfilFormular - dies erfolgt mit der folgenden Factory-Funktion:

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
//------------------------------------------------------------------------------------------------------------------------------------------------------------

function createLayoutBaueinheitSchichtBaueigenschaftsProfilFormular() {
    return [
      { // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[0] // Rubrik 0
        ueberschriftRubrik: "Gemeinsame Angaben für alle Schichttypen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Paket",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Geometrie > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Mechanik > Rohdichte",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      { // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[1] // Rubrik 1
        ueberschriftRubrik: "Angaben zum Wärmeschutz für alle Schichttypen",
        baueigenschaftenInRubrik: [
        {
          // baueigenschaftenInRubrik[0]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Sollwert",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false // Flag für Steuerung :disable am Feld
        },
        {
          // baueigenschaftenInRubrik[1]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false // Flag für Steuerung :disable am Feld
        },
        {
          // baueigenschaftenInRubrik[2]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Sollwert",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false // Flag für Steuerung :disable am Feld
        },
        {
          // baueigenschaftenInRubrik[3]
          baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false // Flag für Steuerung :disable am Feld
        },
      ]
      },
      { // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[2] // Rubrik 2
        ueberschriftRubrik: "Spezifische Angaben für Estriche",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Estrich > Bauart",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:  "Baueinheit > Schicht > Estrich > Bindemittelart",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:  "Baueinheit > Schicht > Estrich > Einbauart",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
            "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Schicht > Estrich > Härteklasse > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Estrich > Heizestrich > Bauart",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Estrich > Heizestrich > Heizrohre > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
        ]
      },
      { // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[3] // Rubrik 3
        ueberschriftRubrik: "Spezifische Angaben für Dämmungen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Mechanik > Dynamische Steifigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Mechanik > Zusammendrückbarkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Mechanik > Druckspannung bei 10 % Stauchung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung: "Baueinheit > Schicht > Nutzlasten > Flächenlast > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
        ]
      },
      { // layoutBaueinheitSchichtBaueigenschaftsProfilFormular[5] // Rubrik 4
        ueberschriftRubrik: "Spezifische Angaben für weitere Schichttypen [noch nicht implementiert]",
        baueigenschaftenInRubrik: [
          // Aktuell noch leer!
        ]
      }
    ];
  }
  module.exports = createLayoutBaueinheitSchichtBaueigenschaftsProfilFormular // NEU, #360, Factory-Funktion
  // ACHTUNG: Mit
  // export default LayoutBaueinheitSchichtBaueigenschaftsProfilFormular
  // kommt Fehler "SyntaxError: Unexpected token export"!!!