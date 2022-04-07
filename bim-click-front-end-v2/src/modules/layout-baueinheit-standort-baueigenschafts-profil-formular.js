// layout-baueinheit-standort-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für "Baueinheit > Standort"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften

const LayoutBaueinheitStandortBaueigenschaftsProfilFormular = [
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Lageangaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Anschrift",
        baueigenschaftenInRubrik: [
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Anschrift > Straße und Hausnummer",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Straße", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Hausnummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1: "Straße der Anschrift des Standorts", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2: "Hausnummer der Anschrift des Standorts" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Anschrift > Postleitzahl und Ort",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Postleitzahl", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Ort", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1: "Postleitzahl der Anschrift des Standorts", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2: "Ort der Anschrift des Standorts" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Anschrift > Land", // NEU
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Grundstück",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Gemarkung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flur",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (01)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 1. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 1. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 1. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 1. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (02)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 2. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 2. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 2. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 2. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (03)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 3. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 3. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 3. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 3. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (04)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 4. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 4. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 4. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 4. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (05)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 5. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 5. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 5. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 5. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (06)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 6. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 6. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 6. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 6. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (07)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 7. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 7. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 7. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 7. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (08)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 8. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 8. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 8. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 8. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (09)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 9. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 9. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 9. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 9. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Flurstück (10)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Zähler 10. Flurstücknummer", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Nenner 10. Flurstücknummer", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Zähler der 10. Flurstücknummer des Grundstücks am Standort", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Nenner der 10. Flurstücknummer des Grundstücks am Standort" // ACHTUNG: Tooltip 2 für Wertepaar!
          }
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Geokoordinaten", // ALT: "Georeferenzen"
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Geografische Koordinaten",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // NEU: Speziallösung für Labels und Tooltips für Wertepaare (diese kommen normalerweise aus den Feldern
            // typbezogenerBaueigenschaft.anzeigeText bzw. baueigenschaftsBemerkung):
            labelBaueigenschaft1: "Geografischer Breitengrad (Dezimalzahl)", // ACHTUNG: Label 1 für Wertepaar!
            labelBaueigenschaft2: "Geografischer Längengrad (Dezimalzahl)", // ACHTUNG: Label 2 für Wertepaar!
            toolTipBaueigenschaft1:
              "Geografischer Breitengrad des Grundstücks am Standort (Dezimalzahl, z.B. 48,87619)", // ACHTUNG: Tooltip 1 für Wertepaar!
            toolTipBaueigenschaft2:
              "Geografischer Längengrad des Grundstücks am Standort (Dezimalzahl, z.B. 9,389161)" // ACHTUNG: Tooltip 2 für Wertepaar!
          }
          // ACHTUNG: Diese Baueigenschaft kann hier nur einmal referenziert werden, obwohl sie als paariger Wert auf 2 Input-Felder gemapped wird!!!
          //          Sonst duplicate Keys Fehler beim v-for im Template!!!
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Kartendienste",
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
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[1] // Tab 1
  {
    ueberschriftTab: "Geopolitische Angaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Kontinent",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Welt > Kontinent",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[1] / // Rubrik 1
        ueberschriftRubrik: "Land",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Land > Europäische Union",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Land > Europa (nicht EU)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung: "Baueinheit > Standort > Geopolitik > Land > Asien",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Land > Nordamerika",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Land > Mittelamerika",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Land > Südamerika",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung: "Baueinheit > Standort > Geopolitik > Land > Afrika",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Land > Australien und Ozeanien",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[2] /] // Rubrik 2
        ueberschriftRubrik:
          "Bundesland/Region/Kanton/Überseegebiet/Bundesstaat",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Bundesland > Deutschland",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Bundesland > Österreich",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Region > Frankreich",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Überseegebiet > Frankreich (EU)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Überseegebiet > Frankreich (nicht EU)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Überseegebiet > Großbritannien",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kanton > Schweiz",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Bundesstaat > USA",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Bundesstaat > Kanada",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Bundesstaat > Australien",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[3] / // Rubrik 3
        ueberschriftRubrik: "Kreis (nur bei Land 'Deutschland')",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Baden-Württemberg",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Bayern",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Brandenburg",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Hessen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Mecklenburg-Vorpommern",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Niedersachsen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Nordrhein-Westfalen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Rheinland-Pfalz",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Saarland",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Sachsen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Sachsen-Anhalt",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Schleswig-Holstein",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[12]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kreis > Thüringen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[4] / // Rubrik 4
        ueberschriftRubrik:
          "Stadt/Gemeinde (Kommune - nur bei Land 'Deutschland')", // ACHTUNG: Überschrift wird im Profilformular-Code für "Standort" verwendet,
                                                                   // muss dort ggf.angepast werden bei Änderungen!
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Baden-Württemberg",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Bayern",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Brandenburg",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Hessen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Mecklenburg-Vorpommern",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Niedersachsen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Nordrhein-Westfalen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Rheinland-Pfalz",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Saarland",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Sachsen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Sachsen-Anhalt",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Schleswig-Holstein",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[12]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geopolitik > Kommune > Thüringen",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: true // Flag für Steuerung :disable am Feld
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[2] // Tab 2
  {
    ueberschriftTab: "Bauordnungsrechtliche Angaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Trinkwasserversorgung",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Trinkwasser > Versorger",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Versorger", // Wird über der q-option-group als Label angezeigt
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              {
                label: "Landeswasserversorgung Baden-Württemberg",
                value: "Landeswasserversorgung Baden-Württemberg",
                color: "primary"
              },
              {
                label: "Bodensee-Wasserversorgung",
                value: "Bodensee-Wasserversorgung",
                color: "primary"
              },
              {
                label: "Wasserversorgung Nordostwürttemberg",
                value: "Wasserversorgung Nordostwürttemberg",
                color: "primary"
              },
              {
                label: "Wasserversorgung Kleine Kinzig",
                value: "Wasserversorgung Kleine Kinzig",
                color: "primary"
              },
              {
                label: "Sonstiger Wasserversorger",
                value: "Sonstiger Wasserversorger",
                color: "primary"
              },
              {
                label: "Unbekannter Wasserversorger", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Trinkwasser > Herkunft",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Herkunft", // Wird über der q-option-group als Label angezeigt
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              {
                label: "Bodenseewasser",
                value: "Bodenseewasser",
                color: "primary"
              },
              {
                label: "Flusswasser",
                value: "Flusswasser",
                color: "primary"
              },
              { label: "Grundwasser", value: "Grundwasser", color: "primary" },
              {
                label: "Sonstige Trinkwasserherkunft",
                value: "Sonstige Trinkwasserherkunft",
                color: "primary"
              },
              {
                label: "Unbekannte Trinkwasserherkunft", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Trinkwasser > Härte",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Härtebereich", // Wird über der q-option-group als Label angezeigt
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              {
                label: "weich",
                value: "weich",
                color: "green"
              },
              {
                label: "mittel",
                value: "mittel",
                color: "orange"
              },
              {
                label: "hart",
                value: "hart",
                color: "red"
              },
              {
                label: "unbekannt", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Abwasserentsorgung",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Abwasser > Mischsystem",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Mischsystem an Vorflut", // Wird über der q-option-group als Label angezeigt
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              { label: "Direkt", value: "Direkt", color: "green" },
              {
                label: "Über Rückstausicherung",
                value: "Über Rückstausicherung",
                color: "green"
              },
              {
                label: "Über Hebeanlage",
                value: "Über HHebeanlage",
                color: "orange"
              },
              {
                label: "Kein Anschluss an Vorflut - Hauskläranlage",
                value: "Kein Anschluss an Vorflut - Hauskläranlage",
                color: "red"
              },
              {
                label: "Unbekanntes Mischsystem", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Abwasser > Trennsystem",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Trennsystem an Vorflut", // Wird über der q-option-group als Label angezeigt
            options: [
              { label: "Direkt", value: "Direkt", color: "green" },
              {
                label: "Über Rückstausicherung",
                value: "Über Rückstausicherung",
                color: "green"
              },
              {
                label: "Über Hebeanlage",
                value: "Über Hebeanlage",
                color: "orange"
              },
              {
                label:
                  "Kein Anschluss Schmutzwasser an Vorflut - Hauskläranlage",
                value:
                  "Kein Anschluss Schmutzwasser an Vorflut - Hauskläranlage",
                color: "red"
              },
              {
                label:
                  "Kein Anschluss Regenwasser an Vorflut - Rückhaltebecken und/oder Hebeanlage",
                value:
                  "Kein Anschluss Regenwasser an Vorflut - Rückhaltebecken und/oder Hebeanlage",
                color: "red"
              },
              {
                label: "Kein Anschluss Regenwasser an Vorflut - Versickerung",
                value: "Kein Anschluss Regenwasser an Vorflut - Versickerung",
                color: "red"
              },
              {
                label: "Unbekanntes Trennsystem", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Wärmeversorgung", // NEU: Eigene Rubrik
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Wärmeenergie > Träger",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Wärmeenergieträger", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Erdgas",
                value: "Erdgas",
                color: "green"
              },
              {
                label: "Fernwärme",
                value: "Fernwärme",
                color: "green"
              },
              {
                label: "Heizöl",
                value: "Heizöl",
                color: "orange"
              },
              {
                label: "Unbekannter Wärmeenergieträger", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3 // NEU: Umnummerierung aller Rubriken unten erforderlich!
        ueberschriftRubrik: "Stromversorgung", // NEU: Umbenannt von "Energieversorgung"
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0] // NEU
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Strom > Hausanschluss > Typ",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Typ des elektrischen Hausanschlusses", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Kabelhausanschluss",
                value: "Kabelhausanschluss",
                color: "primary"
              },
              {
                label: "Freileitungshausanschluss",
                value: "Freileitungshausanschluss",
                color: "primary"
              },
              {
                label: "Unbekannter Anschlusstyp", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // baueigenschaftenInRubrik[1]
            // *************************** ACHTUNG: q-select-Feld! *********************************
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Strom > Hausanschluss > Art",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art des elektrischen Hausanschlusses" // ************ Wird über dem q-input als Label angezeigt *************
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Strom > Hausanschluss > Ausführung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Ausführung des elektrischen Hausanschlusses", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Drehstrom",
                value: "Drehstrom",
                color: "primary"
              },
              {
                label: "Wechselstrom",
                value: "Wechselstrom",
                color: "primary"
              },
              {
                label: "Unbekannte Anschlussausführung", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // baueigenschaftenInRubrik[3]
            // ***************************** ACHTUNG: q-input-Feld! ************************************
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Strom > Hausanschluss > Nennstrom",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Nennstrom des elektrischen Hausanschlusses (Ampere)" // Wird über dem q-input als Label angezeigt
          }
        ]
      },
      {
        // rubrikenInTab[4] // Rubrik 4 // NEU
        ueberschriftRubrik: "Telekommunikationsversorgung",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Telekommunikation > Anschluss",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft:
              "Anschlüsse für Telefon/Rundfunk/Fernsehen/Internet", // Wird über der q-option-group als Label angezeigt
            options: [
              { label: "Analog-Modem", value: "Analog-Modem", color: "red" },
              {
                label: "ISDN",
                value: "ISDN",
                color: "red"
              },
              {
                label: "DSL-Kupferleitung",
                value: "DSL-Kupferleitung",
                color: "orange"
              },
              {
                label: "DSL-Glasfaser",
                value: "DSL-Glasfaser",
                color: "green"
              },
              {
                label: "TV-Kabel",
                value: "TV-Kabel",
                color: "green"
              },
              {
                label: "Satellit",
                value: "Satellit",
                color: "green"
              },
              {
                label: "Mobilfunk",
                value: "Mobilfunk",
                color: "green"
              },
              {
                label: "Unbekannte Anschlussausführung", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      },
      {
        // rubrikenInTab[5] // Rubrik 5
        ueberschriftRubrik: "Verkehrsanbindung",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Infrastruktur > Verkehrsmittel > Zugang",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Zugänge für Verkehrsmittel", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Personenkraftwagen",
                value: "Personenkraftwagen",
                color: "primary"
              },
              {
                label: "Kleinlastkraftwagen (bis 3,5 Tonnen)",
                value: "Kleinlastkraftwagen (bis 3,5 Tonnen)",
                color: "primary"
              },
              {
                label: "Leichte Lastkraftwagen (bis 7,5 Tonnen)",
                value: "Leichte Lastkraftwagen (bis 7,5 Tonnen)",
                color: "primary"
              },
              {
                label: "Mittelschwere Lastkraftwagen (bis 18 Tonnen)",
                value: "Mittelschwere Lastkraftwagen (bis 18 Tonnen)",
                color: "primary"
              },
              {
                label: "Schwere Lastkraftwagen (über 18 Tonnen)",
                value: "Schwere Lastkraftwagen (über 18 Tonnen)",
                color: "primary"
              },
              {
                label: "Busse",
                value: "Busse",
                color: "primary"
              },
              {
                label: "Krane",
                value: "Krane",
                color: "primary"
              },
              {
                label: "Feuerwehrfahrzeuge",
                value: "Feuerwehrfahrzeuge",
                color: "primary"
              },
              {
                label: "Öffentliche Verkehrsmittel",
                value: "Öffentliche Verkehrsmittel",
                color: "primary"
              },
              {
                label: "Unbekannte Zugänge", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      },
      {
        // rubrikenInTab[6] // Rubrik 6
        ueberschriftRubrik: "Gebietscharakter", // NEU
        // ueberschriftRubrik: "Anforderungen an den Schallschutz", // ALT
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Gebietscharakter > Grundstück",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gebietscharakter des Grundstücks am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Gebietscharakter > Nachbargrundstück (01)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erstes Nachbargrundstück" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Gebietscharakter > Nachbargrundstück (02)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zweites Nachbargrundstück" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Gebietscharakter > Nachbargrundstück (03)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Drittes Nachbargrundstück" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Gebietscharakter > Nachbargrundstück (04)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Viertes Nachbargrundstück" // Wird über dem q-select oder q-input als Label angezeigt
          }
        ]
      },
      {
        // rubrikenInTab[7] // Rubrik 7
        ueberschriftRubrik:
          "Auflagen und Verwendungsverbote-/gebote am Standort",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Standort > Recht > Auflage", // ALT: "Baueinheit > Standort > Recht > Immissionen und Restriktionen"
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Bauordnungsrechtliche Auflagen", // Wird über der q-option-group als Label angezeigt
            options: [
              /*
              // Verschoben!
              {
                label: "Elektrische Felder",
                value: "Elektrische Felder",
                color: "orange"
              },
              // Verschoben!
              {
                label: "Erhöhte Radonkonzentration",
                value: "Erhöhte Radonkonzentration",
                color: "orange"
              },
              {
                label: "Flugbewegungen",
                value: "Flugbewegungen",
                color: "orange"
              },
              {
                label: "Fluglärmzone",
                value: "Fluglärmzone",
                color: "orange"
              },
              */
              {
                label: "Trinkwasserschutzgebiet",
                value: "Trinkwasserschutzgebiet",
                color: "orange"
              },
              {
                label: "Landschaftsschutzgebiet",
                value: "Landschaftsschutzgebiet",
                color: "orange"
              },
              {
                label: "Naturschutzzgebiet",
                value: "Naturschutzgebiet",
                color: "red"
              },
              {
                label: "Einschränkungen auf Grund von Baulasten", // NEU
                value: "Einschränkungen auf Grund von Baulasten", // NEU
                color: "orange"
              },
              {
                label: "Abstandsgebote", // NEU
                value: "Abstandsgebote", // NEU
                color: "orange"
              },
              {
                label: "Grabungsverbote auf Grund von Trassen", // NEU
                value: "Grabungsverbote auf Grund von Trassen", // NEU
                color: "orange"
              },
              {
                label:
                  "Grabungsverbote auf Grund von archäologischen Restriktionen", // NEU
                value:
                  "Grabungsverbote auf Grund von archäologischen Restriktionen", // NEU
                color: "orange"
              },
              {
                label: "Bohrverbote auf Grund von Dolinenschutzprogrammen", // NEU
                value: "Bohrverbote auf Grund von Dolinenschutzprogrammen", // NEU
                color: "orange"
              },
              {
                label: "Beschränkungen für Blendschutz",
                value: "Beschränkungen für Blendschutz",
                color: "orange"
              },
              {
                label: "Beschränkungen für Radarreflexion",
                value: "Beschränkungen für Radarreflexion",
                color: "orange"
              },
              {
                label: "Unbekannte Auflagen", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // baueigenschaftenInRubrik[1] // NEU!
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Verwendungsverbot/-gebot",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Verwendungsverbote/-gebote", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Verbot für CKW/FCKW/HFCKW",
                value: "Verbot für CKW/FCKW/HFCKW",
                color: "red"
              },
              {
                label: "Verbot für PVC",
                value: "Verbot für PVC",
                color: "red"
              },
              {
                label: "Begrenzung für TOC-Gehalt (Beton, Zement)",
                value: "Begrenzung für TOC-Gehalt (Beton, Zement)",
                color: "orange"
              },
              {
                label: "Begrenzung für Chromatgehalt (Beton, Zement)",
                value: "Begrenzung für Chromatgehalt (Beton, Zement)",
                color: "orange"
              },
              {
                label: "Gebot für Recylingbaustoffe",
                value: "Gebot für Recylingbaustoffe",
                color: "green"
              },
              {
                label: "Gebot für regionale Baustoffe",
                value: "Gebot für regionale Baustoffe",
                color: "green"
              },
              {
                label: "Gebot für standortgerechte heimische Pflanzen",
                value: "Gebot für standortgerechte heimische Pflanzen",
                color: "green"
              },
              {
                label: "Unbekannte Verwendungsverbote/-gebote", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[3] // Tab 3
  {
    ueberschriftTab: "Umweltbezogene Angaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Klimadaten am Standort",
        hideRubrik: true, // NEU: Property für layoutgesteuertes generisches Profilformular
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik:
          "Schneelast, Windlast, Erdbebenlast und Schlagregenbeanspruchung am Standort",
        baueigenschaftenInRubrik: [
          // Neue Baueigenschaften für Schnee-, Wind- und Erdbebenlast, zusätzlich zu Schlagregenbeanspruchung für #342:
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Schnee > Lastzone",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Schneelastzone am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Wind > Lastzone",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Windlastzone am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Erdbeben > Lastzone",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erdbebenlastzone am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Schlagregen > Beanspruchungsgruppe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Schlagregenbeanspruchungsgruppe am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Schnee > Last > Charakteristischer Wert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Charakteristische Schneelast am Standort [kN/m²]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Wind > Geschwindigkeit > Bezugswert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bezugswindgeschwindigkeit am Standort [m/s]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Erdbeben > Bodenbeschleunigung > Bemessungswert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bemessungswert der Bodenbeschleunigung für die Erdbebenlast am Standort [m/s²]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Wind > Geschwindigkeitsdruck > Bezugswert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bezugswindgeschwindigkeitsdruck am Standort [kN/m²]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // Button für Dlubal // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Radioaktive Strahlungsbelastung am Standort",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // Stattdessen war hier Umnummerierung der Baueigenschaftn in der Rubrik und Anpassung Profilformular-Code notwendig!
          // ALT - FALSCH mit layoutgesteuertem generisches Profilformular - disabled:
          /*
          {
            // Kein Feld - Button für Website
          },
          {
            // Kein Feld - Button für Website
          },
          */
          {
            // baueigenschaftenInRubrik[0] // NEU - ALT: [2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Radon > Bodenluft > Konzentration",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Radon-Konzentration der Bodenluft am Standort" // Wird über dem q-input als Label angezeigt
          }
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3 // ALT: 4
        ueberschriftRubrik: "Solarstrahlung und Lärmbelastung am Standort",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[4] // Rubrik 4 // ALT: 3
        ueberschriftRubrik: "Luftqualität am Standort",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0] // NEU!
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Beton > Expositionsklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft:
              "Betonexpositionsklasse am Standort (DIN 1992 und 206)" // Wird über der q-option-group als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1] // NEU!
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Holz > Gefährdungsklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft:
              "Holzgefährdungsklasse am Standort (nach DIN 68800)" // Wird über der q-option-group als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2] // Neuer Index!!!
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Luft > Korrosivität",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: true, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Luftkorrosivitätskategorie (DIN 12944)", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "C1 - unbedeutend",
                value: "C1 - unbedeutend",
                color: "light-green"
              },
              {
                label: "C2 - gering",
                value: "C2 - gering",
                color: "green"
              },
              {
                label: "C3 - mäßig",
                value: "C3 - mäßig",
                color: "amber"
              },
              {
                label: "C4 - stark ",
                value: "c4 - stark",
                color: "orange"
              },
              {
                label: "C5-I - sehr stark (Industrie)",
                value: "C5-I - sehr stark (Industrie)",
                color: "red"
              },
              {
                label: "C5-M - sehr stark (Meer)",
                value: "C5-M - sehr stark (Meer)",
                color: "red"
              },
              {
                label: "CX - extrem (Offshore)",
                value: "CX - estrem (Offshore)",
                color: "red"
              },
              {
                label: "Unbekannte Korrosivitätskategorie", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      },
      {
        // rubrikenInTab[5] // Rubrik 5
        ueberschriftRubrik: "Lärmbelastung am Standort",
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[6] // Rubrik 6
        ueberschriftRubrik:
          "Klima- und umweltbedingte Risiken und biologische Expositionen am Standort",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Standort > Umwelt > Klima > Risiko",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Klimabedingte Risiken am Standort", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Meeresatmosphäre (Korrosivität)",
                value: "Meeresatmosphäre (Korrosivität)",
                color: "orange"
              },
              {
                label: "Wind",
                value: "Wind",
                color: "orange"
              },
              {
                label: "Sturm",
                value: "Sturm",
                color: "red"
              },
              {
                label: "Starkregen",
                value: "Starkregen",
                color: "orange"
              },
              {
                label: "Schlagregen",
                value: "Schlagregen",
                color: "orange"
              },
              {
                label: "Hagel",
                value: "Hagel",
                color: "orange"
              },
              {
                label: "Nebel",
                value: "Nebel",
                color: "orange"
              },
              {
                label: "Frost",
                value: "Frost",
                color: "orange"
              },
              {
                label: "Schnee",
                value: "Schnee",
                color: "orange"
              },
              {
                label: "Lawinen",
                value: "Lawinen",
                color: "orange"
              },
              {
                label: "Staub",
                value: "Staub",
                color: "orange"
              },
              {
                label: "Flugsand",
                value: "Flugsand",
                color: "orange"
              },
              {
                label: "Wanderdünen",
                value: "Wanderdünen",
                color: "orange"
              },
              {
                label: "Waldbrand",
                value: "Waldbrand",
                color: "orange"
              },
              {
                label: "Unbekannte klimabedingte Risiken", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },

          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Standort > Umwelt > Risiko", // NEU
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Umweltbedingte Risiken am Standort", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Industrieatmosphäre (Korrosivität)",
                value: "Industrieatmosphäre (Korrosivität)",
                color: "orange"
              },
              {
                label: "Elektrische Felder (Hochspannungsleitungen)",
                value: "Elektrische Felder (Hochspannungsleitungen)",
                color: "orange"
              },
              {
                label: "Elektrische Felder (Erdleitungen)",
                value: "Elektrische Felder (Erdleitungen)",
                color: "orange"
              },
              {
                label: "Elektrische Felder (Bahntrassen)",
                value: "Elektrische Felder (Bahntrassen)",
                color: "orange"
              },
              {
                label: "Erhöhte Radonkonzentration",
                value: "Erhöhte Radonkonzentration",
                color: "orange"
              },
              {
                label: "Erhöhte Abgaskonzentration",
                value: "Erhöhte Abgaskonzentration",
                color: "orange"
              },
              {
                label: "Erhöhte Feinstaubkonzentration",
                value: "Erhöhte Feinstaubkonzentration",
                color: "orange"
              },
              {
                label: "Erhöhte Lärmbelastung (Industrie und Gewerbe)",
                value: "Erhöhte Lärmbelastung (Industrie und Gewerbe)",
                color: "orange"
              },
              {
                label: "Erhöhte Lärmbelastung (Sport- und Freizeitanlagen)",
                value: "Erhöhte Lärmbelastung (Sport- und Freizeitanlagen)",
                color: "orange"
              },
              {
                label: "Erhöhte Lärmbelastung (Straßenverkehr)",
                value: "Erhöhte Lärmbelastung (Straßenverkehr)",
                color: "orange"
              },
              {
                label: "Erhöhte Lärmebelastung (Schienenverkehr)",
                value: "Erhöhte Lärmebelastung (Schienenverkehr)",
                color: "orange"
              },
              {
                label: "Erhöhte Lärmbelastung (Flugverkehr)",
                value: "Erhöhte Lärmbelastung (Flugverkehr)",
                color: "orange"
              },
              {
                label: "Fluglärmschutzzone",
                value: "Fluglärmschutzzone",
                color: "orange"
              },
              {
                label: "Unbekannte umweltbedingte Risiken", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },

          {
            // baueigenschaftenInRubrik[2] // NEU: Zusätzliche Baueigenschaft oben eingefügt
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Umwelt > Biologie > Exposition",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // Es folgen drei spezielle zusätzliche Felder für q-option-group:
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            // Nur auf true setzen bei Darstellung per q-option-group mit type="radio", bei type"checkbox" oder type="toggle" muss dieses Feld auf false stehen!
            labelBaueigenschaft: "Biologische Expositionen am Standort", // Wird über der q-option-group als Label angezeigt
            options: [
              {
                label: "Geschützte Arten",
                value: "Geschützte Arten",
                color: "green"
              },
              {
                label: "Vogelschutz",
                value: "Vogelschutz",
                color: "green"
              },
              {
                label: "Tauben (Vergällung)",
                value: "Tauben (Vergällung)",
                color: "orange"
              },
              {
                label: "Algen",
                value: "Algen",
                color: "orange"
              },
              {
                label: "Flechten",
                value: "Flechten",
                color: "orange"
              },
              {
                label: "Moose",
                value: "Moose",
                color: "orange"
              },
              {
                label: "Moderfäule",
                value: "Moderfäule",
                color: "orange"
              },
              {
                label: "Nager",
                value: "Nager",
                color: "orange"
              },
              {
                label: "Insekten",
                value: "Insekten",
                color: "orange"
              },
              {
                label: "Termiten",
                value: "Termiten",
                color: "orange"
              },
              {
                label: "Unbekannte biologische Expositionen", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[4] // Tab 4
  {
    ueberschriftTab: "Hydrogeologische Angaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Informationsquellen",
        hideRubrik: true, // NEU: Property für layoutgesteuertes generisches Profilformular
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Wasser am Standort",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Höchster Stand (HGW 100)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchster Grundwasserstand (HGW 100) [m über NHN]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Hochwasser > Höchster Stand (HHW 100)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höchster Hochwasserstand (HHW 100) [m über NHN]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Maximum aus HGW 100 und HHW 100",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Maximum aus HGW 100 und HHW 100 [m über NHN]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Bemessungswasserstand",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Bemessungswasserstand am Standort [m über NHN]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // --------------------- 2. Zeile von Feldern in Rubrik 1 -----------------------------------
          //========= ACHTUNG: Das nächste Feld wird als Kennwertepaar zweimal im Template referenziert!!! ===========================
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Schwankungsbereich",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            //=====================================================================================================================
            // ACHTUNG: Hier Speziallösung für Labels an paarigem Feld (Kennwertepaar):
            label1PaarigeBaueigenschaft:
              "Unterer Wert des Schwankungsbereichs des Grundwassers am Standort", // Wird über dem q-select oder q-input als Label angezeigt
            label2PaarigeBaueigenschaft:
              "Oberer Wert des Schwankungsbereichs des Grundwassers am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          //===========================================================================================================================
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Fließgeschwindigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Fließgeschwindigkeit des Grundwassers [m/s]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Fließrichtung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Fließrichtung des Grundwassers am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // --------------------- 3. Zeile von Feldern in Rubrik 1 -----------------------------------
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Temperatur",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Temperatur des Grundwassers am Standort [°C]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Herkunft",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Herkunft des Grundwassers am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Expositionsklasse/Betonaggressivität",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Expositionsklasse/Betonaggressivität des Grundwassers" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[10] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Boden am Standort",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Bodenklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Bodenklasse des Bodens am Standort (nach DIN 18196)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Wasserdurchlässigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wasserdurchlässigkeit des Bodens am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Geothermie > Tiefenstufe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Geothermische Tiefenstufe des Bodens [m/K]" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Erdbebenzone",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Erdbebenzone des Bodens am Standort (nach DIN 4149)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // --------------------- 2. Zeile von Felder in Rubrik 1 -----------------------------------
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Erdarbeiten > Bodenklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bodenklasse für Erdarbeiten (nach DIN 18300)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Bohrarbeiten > Bodenklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bodenklasse für Bohrabeiten (nach DIN 18301)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Bohrarbeiten > Zusatzbodenklasse BS bei Steinen und Blöcken",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Zusatzbodenklasse BS für Bohrarbeiten bei Steinen/Blöcken" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Bohrarbeiten > Zusatzbodenklasse FD 'Einaxiale Festigkeit' für Fels",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Zusatzbodenklasse FD 'Einaxiale Festigkeit' Felsbohrabeiten" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // --------------------- 3. Zeile von Felder in Rubrik 1 -----------------------------------
          {
            // baueigenschaftenInRubrik[8]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Nassbaggerarbeiten > Bodenklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Bodenklasse für Nassbaggerarbeiten (nach DIN 18311)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[9]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Nassbaggerarbeiten > Zusatzbodenklasse S bei Steinen und Blöcken",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Zusatzbodenklasse S Nassbaggerbeiten bei Steinen/Blöcken" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[10]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Rohrvortriebsrarbeiten > Bodenklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Bodenklasse für Rohrvortriebsarbeiten (nach DIN 18319)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Rohrvortriebsarbeiten > Zusatzbodenklasse S bei Steinen und Blöcken",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Zusatzbodenklasse S Rohrvortriebsarbeiten bei Steinen/Blöcken" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // Button für Dlubal, keine Baueigenschaft // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Baugrund, Untergrund und Baugrube am Standort",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Baugrund > Klasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Baugrundklasse des Bodens am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Baugrund > Feuchteempfindlichkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Baugrundfeuchteempfindlichkeit des Bodens" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Untergrund > Klasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Untergrundklasse des Bodens am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Baugrube > Art",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Baugrube am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          }
        ]
      },
      //===========================================================================================================
      // NEU: Zusätzliche Rubrik für Risiken:
      {
        // rubrikenInTab[4] // Rubrik 4
        ueberschriftRubrik: "Hydrogeologische Risiken am Standort",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Boden > Risiko",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bodenbedingte Risiken am Standort", // Wird über dem q-select oder q-input als Label angezeigt
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            options: [
              {
                label: "Bodenschätze",
                value: "Bodenschätze",
                color: "green"
              },
              {
                label: "Archäologische Funde im Boden",
                value: "Archäologische Funde im Boden",
                color: "orange"
              },
              {
                label: "Altlasten im Boden",
                value: "Altlasten im Boden",
                color: "red"
              },
              {
                label: "Kampfmittel im Boden",
                value: "Kampfmittel im Boden",
                color: "red"
              },
              {
                label: "Erdbeben",
                value: "Erdbeben",
                color: "red"
              },
              {
                label: "Vulkanismus",
                value: "Vulkanismus",
                color: "red"
              },
              {
                label: "Unbekannte bodenbedingte Risiken", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Hydrogeologie > Wasser > Risiko",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wasserbedingte Risiken am Standort", // Wird über dem q-select oder q-input als Label angezeigt
            radio: false, // Boolean - steuert die für das v-model bei type="radio" an q-option-group notwendige Konvertierung des Aufzählungswerts von Array nach String!
            options: [
              {
                label: "Grundwasser",
                value: "Grundwasser",
                color: "orange"
              },
              {
                label: "Hochwasser",
                value: "Hochwasser",
                color: "red"
              },
              {
                label: "Thermalwasservorkommen",
                value: "Thermalwasservorkommen",
                color: "amber"
              },
              {
                label: "Durch Wasser aufquellendes Gestein (Anhydrit)",
                value: "Durch Wasser aufquellendes Gestein (Anhydrit)",
                color: "red"
              },
              {
                label: "Unbekannte wasserbedingte Risiken", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
                value: null,
                color: "grey-9"
              }
            ]
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[5] // Tab 5
  {
    ueberschriftTab: "Angaben zur Grundstücksgeometrie",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Bisher LEER - Platzhalter!
        ueberschriftRubrik: "Platzhalter",
        hideRubrik: true, // NEU: Property für layougsteuertes generisches Profilformular
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Geometrische Angaben zum Grundstück am Standort",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Fläche",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Grundstücksfläche" // superscripted 2 = \u00B2 (Unicode, 4 hex chars)
            // Wird über dem q-select oder q-input als Label angezeigt
          },
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[1] // FALSCH, stattdessen war hier Umnummerierung der Baueigenschaftn in der Rubrik
          // und Anpassung Profilformular-Code notwendig!
          {
            // baueigenschaftenInRubrik[1] // NEU - ALT: [2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Höhenlage",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Höhenlage der Geländeoberkante des Grundstücks am Standort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2] // NEU - ALT: [3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Im Mittel gemessene Höhenlage",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Im Mittel gemessene Höhenlage an den Gebäudeecken" // Wird über dem q-select oder q-input als Label angezeigt
          }
          // --------------------- 2. Zeile von Felder in Rubrik 1 -----------------------------------
          // Leer
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[6] // Tab 6
  {
    ueberschriftTab: "Städtebauliche Kennzahlen am Standort",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Bisher LEER - Platzhalter!
        ueberschriftRubrik: "Platzhalter",
        hideRubrik: true, // NEU: Property für layougsteuertes generisches Profilformular
        baueigenschaftenInRubrik: [
          // ACHTUNG: Rubriken dürfen keine leeren Baueigenschaften enthalten (d.h. NICHT "{}" in nächster Zeile")!!!
          // Sonst rendered das layoutgesteuerte generische Profilformular nicht!!!
          // Es kommt dann ein undefined-Fehler bei Zugriff auf
          // typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for!!!
          // {} // baueigenschaftenInRubrik[0] // FALSCH, stattdessen ganz leer lassen!
        ]
      },
      {
        //----------------------------------------------------
        // Anordnung für städtebauliche Kennzahlen in Rubrik 1:
        // Zeile 1: BGF NRF _  BRI
        // Zeile 2: GRZ GFZ _  VG
        // Zeile 3: Anzahl Stellplätze
        //-----------------------------------------------------
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Städtebauliche Kennzahlen",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Städtebau > Zulässige Brutto-Grundfläche (BGF)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässige Brutto-Grundfläche (BGF)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Städtebau > Zulässige Netto-Raumfläche (NRF)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässige Netto-Raumfläche (NRF)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // ACHTUNG: Mit dem neuen layoutgesteuerten generischen Profilformular sind leere Baueigenschaften nicht mehr erlaubt!!!
          // Daher disabled und Baueigenschaften im Profilformular umnummeriert!
          /*
          {
            // baueigenschaftenInRubrik[2] // LEER!
          },
          */
          {
            // baueigenschaftenInRubrik[2] // NEU, ALT: [3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Städtebau > Zulässiger Brutto-Rauminhalt (BRI)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässiger Brutto-Rauminhalt (BRI)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // --------------------- 2. Zeile von Felder in Rubrik 1 -----------------------------------
          {
            // baueigenschaftenInRubrik[3] // NEU, ALT: [4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Städtebau > Zulässige Grundflächenzahl (GRZ)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässige Grundflächenzahl (GRZ)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[4] // NEU, ALT: [5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Städtebau > Zulässige Geschossflächenzahl (GFZ)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässige Geschossflächenzahl (GFZ)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // ACHTUNG: Mit dem neuen layoutgesteuerten generischen Profilformular sind leere Baueigenschaften nicht mehr erlaubt!!!
          // Daher disabled und Baueigenschaften im Profilformular umnummeriert!
          /*
          {
            // baueigenschaftenInRubrik[6] // LEER!
          },
          */
          {
            // baueigenschaftenInRubrik[5] // NEU, ALT: [7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Städtebau > Zulässige Anzahl der Vollgeschosse (VG)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Zulässige Anzahl der Vollgeschosse (VG)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          // --------------------- 3. Zeile von Felder in Rubrik 1 -----------------------------------
          {
            // baueigenschaftenInRubrik[6] // NEU, ALT: [7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Recht > Städtebau > Erforderliche Anzahl der Stellplätze",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erforderliche Anzahl der Stellplätze" // Wird über dem q-select oder q-input als Label angezeigt
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // NEU layoutBaueinheitStandortBaueigenschaftsProfilFormular[7] // Tab 7
  {
    ueberschriftTab: "Gemeindespezifische Angaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik:
          "Merkmale der Gemeinde aus dem amtlichen Gemeindeverzeichnis für Deutschland",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geostatistik > Deutschland > Gemeindeverzeichnis > Gemeinde > Schlüssel",
            // Siehe https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/_inhalt.html
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // NEU layoutBaueinheitStandortBaueigenschaftsProfilFormular[8] // Tab 8
  {
    ueberschriftTab: "Angaben zur Außenluft am Standort",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik:
          "Ermittelte und berechnete Werte zur Außenluft am Standort",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Auslegungstemperatur > DIN 13788",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Auslegungs-Außenlufttemperatur am Standort", // Gemeinsames Label für DIN 13788 und DIN 4108-2
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
            labelBaueigenschaft: "Jahresmittlere Außenlufttemperatur am Standort", // Gemeinsames Label für DIN 13788 und DIN 4108-2
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
            labelBaueigenschaft: "Relative Auslegungs-Außenluftfeuchte am Standort", // Gemeinsames Label für DIN 13788 und DIN 4108-2
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
            labelBaueigenschaft: "Sättigungsdampfdruck der Außenluft am Standort", // Gemeinsames Label für DIN 13788 und DIN 4108-2
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
            labelBaueigenschaft: "Wasserdampfpartialdruck der Außenluft am Standort", // Gemeinsames Label für DIN 13788 und DIN 4108-2
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
            labelBaueigenschaft: "Wärmeübergangswiderstand (außen) am Standort", // Gemeinsames Label für DIN 13788 und DIN 4108-2
          },
          {
            // baueigenschaftenInRubrik[11]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Feuchte > Außenluft > Wärmeübergangswiderstand > Außen > DIN 4108-2",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitStandortBaueigenschaftsProfilFormular[9] // Tab 9, NEU: #387
  {
    ueberschriftTab: "Musterhaftigkeit",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Angaben zur Musterhaftigkeit des Standorts",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            "Baueinheit > Standort > Struktur > Einordnung > Muster > Gültigkeit > Bauvorhaben",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gültigkeit als Musterstandort" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Standort > Struktur > Einordnung > Muster > Gültigkeit > Erläuterung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erläuterung zur Gültigkeit als Musterstandort" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      }
    ]
  }
];

module.exports = LayoutBaueinheitStandortBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaueinheitStandortBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
