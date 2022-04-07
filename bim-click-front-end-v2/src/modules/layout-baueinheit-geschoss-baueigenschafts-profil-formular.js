// layout-baueinheit-geschoss-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für "Baueinheit > Geschoss"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften

const LayoutBaueinheitGeschossBaueigenschaftsProfilFormular = [
  // layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Geometrie",
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
          },
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
        ]
      },
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
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Brüstungsbezogene Maße im Geschoss",
        baueigenschaftenInRubrik: [
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
        ]
      },
      //===========================================================================================================
      // 2. Zeile von Rubriken auf Desktop
      {
        // rubrikenInTab[0] // Rubrik 4
        ueberschriftRubrik: "Bodenniveaus des Geschosses",
        baueigenschaftenInRubrik: [
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Fertigboden > Oberkante (OKFFB)",
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
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Rohboden > Oberkante (OKRFB)",
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
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Rohboden > Unterkante (UKRFB)",
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
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Fertigboden > Unterkante (UKFFB)",
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
        // rubrikenInTab[1] // Rubrik 5
        ueberschriftRubrik:
          "Berechnete Maße des Geschossbodens",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Rohboden > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Bodenunterseite > Dicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Gesamtdicke",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Angrenzungssituation > Grundwasser > Grundwasserberührt!",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Geschoss > Geometrie > Angrenzungssituation > Grundwasser > Eintauchtiefe",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 6
        ueberschriftRubrik: "Türbezogene Maße im Geschoss",
        baueigenschaftenInRubrik: [
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
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1] // Tab 1, NEU: #387
  {
    ueberschriftTab: "Musterhaftigkeit",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Angaben zur Musterhaftigkeit des Geschosses",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            "Baueinheit > Geschoss > Struktur > Einordnung > Muster > Gültigkeit > Bauvorhaben",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gültigkeit als Mustergeschoss" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Geschoss > Struktur > Einordnung > Muster > Gültigkeit > Erläuterung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erläuterung zur Gültigkeit als Mustergeschoss" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      }
    ]
  }
  //------------------------------------------------------------------------------------------------------------------------------------
];

module.exports = LayoutBaueinheitGeschossBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaueinheitGeschossBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
