// layout-baueinheit-gebaeude-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für "Baueinheit > Gebäude"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften

const LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular = [
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Bauordnungsrechtliche Angaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Bauweise gemäß Bauordnung",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Gebäude > Recht > Bauordnung > Bauweise",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft: "Bauweise gemäß Bauordnung"
          },
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Honorarzonen nach Honorarordnung für Architekten und Ingenieure (HOAI)",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Gebäude > Recht > Honorar > HOAI > Wärmeschutz > Zone",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft: "Honorarzone für Wärmeschutz"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Gebäude > Recht > Honorar > HOAI > Schallschutz > Zone",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft: "Honorarzone für Schallschutz"
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Recht > Honorar > HOAI > Raumakustik > Zone",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft: "Honorarzone für Raumakustik"
          }
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Leere Rubrik",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
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
  // layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1] // Tab 1
  {
    ueberschriftTab: "Nutzung",
    rubrikenInTab: [
      //===========================================================================================================
      // Rubrik für Bauwerkszuordnung
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Bauwerkszuordnung",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Nutzung > Bauwerkszuordnung > BWZ",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bauwerkszuordnung (BWZ)" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
      //===========================================================================================================
      // Rubrik für Gebäudetypen
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Einordnung nach Gebäudetypen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Nutzung > Typ > EnEV/GEG",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gebäudetyp nach EnEv/GEG" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Nutzung > Typ > Schallschutz",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gebäudetyp für den Schallschutz" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
      //===========================================================================================================
      // Rubrik für Nutzungsprofile
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Anzuwendende Nutzungsprofile für nachhaltiges Bauen",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Nutzung > Profil > DGNB > Neubau",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzungsprofil für Neubau (DGNB)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Nutzung > Profil > DGNB > Sanierung und Bestand",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzungsprofil für Sanierung und Bestand (DGNB)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Nutzung > Profil > DGNB > Innenraum",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzungsprofil für Innenraum (DGNB)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Nutzung > Profil > DGNB > Quartier",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzungsprofil für Quartier (DGNB)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Nutzung > Profil > DGNB > Betrieb",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzungsprofil für Betrieb (DGNB)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Nutzung > Profil > BNB",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzungsprofil (BNB)" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2] // Tab 2
  {
    ueberschriftTab: "Anforderungen an das Gebäude",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Anforderungen ohne Regelwerksbezug",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Anforderung > Bauherr",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Besondere Anforderungen des Bauherrn", // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3] // Tab 3
  // NEU: Geometrie
  // ACHTUNG: Tab für Geometrie wurde nachträglich hinzugefügt als Tab 3, wird im Profilformular aber als erstes angezeigt!!!
  // ACHTUNG: Enthält gemeinsame Baueigenschaft mit Profil "Baueinheit > Standort"
  {
    ueberschriftTab: "Geometrische Angaben zum Gebäude",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Referenz-NHN-Niveau zur Umrechnung aller 0,0-Niveaus von Geschossen und Räumen im Gebäude in NHN-Niveaus: Oberkante des Fertigbodens am Gebäudeeingang (OKFFB EG) [m ü. NHN]",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Standort > Geografie > Grundstück > Höhenlage", // NEU: Gemeinsame Baueigenschaft mit Profil "Baueinheit > Standort" (Wert wird als Sollwert vererbt an das Gebäude)
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Höhenlage der Geländeoberkante des Grundstücks am Standort [m ü. NHN]", // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Geometrie > Eingang > Niveau > Fertigboden > Oberkante (OKFFB EG)", // NEU: Istwert, wird mit obigem Sollwert initialisiert in mounted/reset/watch (Reset)
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Oberkante des Fertigbodens am Gebäudeeingang (OKFFB EG) [m ü. NHN]", // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4] // Tab 4, NEU: #387
  {
    ueberschriftTab: "Musterhaftigkeit",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Angaben zur Musterhaftigkeit des Gebäudes",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Struktur > Einordnung > Muster > Gültigkeit > Bauvorhaben",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gültigkeit als Mustergebäude" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Gebäude > Struktur > Einordnung > Muster > Gültigkeit > Erläuterung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erläuterung zur Gültigkeit als Mustergebäude" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      }
    ]
  }
];

module.exports = LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
