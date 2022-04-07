// layout-baueinheit-bauvorhaben-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für "Baueinheit > Bauvorhaben"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften

const LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular = [
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Projektbezogene Angaben",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0
        hideRubrik: true, // NEU - Property für layoutgesteuertes generisches Profilformular
        ueberschriftRubrik: "Platzhalter", // Aktuell nicht benutzt
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
        ueberschriftRubrik: "Projekt",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Bauvorhaben > Projekt > Nummer",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft: "Projektnummer"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Bauvorhaben > Projekt > Bezeichnung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft1: "Kurzbezeichnung",
            labelBaueigenschaft2: "Langbezeichnung",
            toolTipBaueigenschaft1: "Kurzbezeichnung des Projekts",
            toolTipBaueigenschaft2: "Langbezeichnung des Projekts",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung: "Baueinheit > Bauvorhaben > Projekt > Bezeichnung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft1: "Kurzbezeichnung",
            labelBaueigenschaft2: "Langbezeichnung",
            toolTipBaueigenschaft1: "Kurzbezeichnung des Projekts",
            toolTipBaueigenschaft2: "Langbezeichnung des Projekts",
          }
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Projektleiter",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baueinheit > Bauvorhaben > Projekt > Leiter > Name",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft1: "Nachname",
            labelBaueigenschaft2: "Vorname",
            toolTipBaueigenschaft1: "Nachname des Projektleiters des Projekts",
            toolTipBaueigenschaft2: "Vorame des Projektleiters des Projekts",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baueinheit > Bauvorhaben > Projekt > Leiter > Name",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft1: "Nachname",
            labelBaueigenschaft2: "Vorname",
            toolTipBaueigenschaft1: "Nachname des Projektleiters des Projekts",
            toolTipBaueigenschaft2: "Vorame des Projektleiters des Projekts",
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Leiter > Benutzerkennung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld#
            labelBaueigenschaft: "Benutzerkennung"
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
  // layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[1] // Tab 1
  {
    ueberschriftTab: "Projektbeteiligte",
    rubrikenInTab: [
      //===========================================================================================================
      // Rubrik für Projektbeteiligter 1
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 1",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 1. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 1. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 1. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 1. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 1. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 1. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 1. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 1. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 1. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 1. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 1. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 1. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 1. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (001)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 1. Projektbeteiligten am Bauvorhaben",
          }
        ]
      },
      //===========================================================================================================
      // Rubrik für Projektbeteiligter 2
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 2",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 2. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 2. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 2. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 2. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 2. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 2. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 2. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 2. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 2. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 2. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 2. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 2. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 2. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (002)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 2. Projektbeteiligten am Bauvorhaben",
          }
        ]
      }, //===========================================================================================================
      // Rubrik für Projektbeteiligter 3
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 3",
        baueigenschaftenInRubrik: [
            {
              // baueigenschaftenInRubrik[0]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft: "Rolle des 3. Projektbeteiligten am Bauvorhaben"
            },
            {
              // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
              // baueigenschaftenInRubrik[1]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
              labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft1: "Firmenname des 3. Projektbeteiligten am Bauvorhaben",
              toolTipBaueigenschaft2: "Firmenrechtsform des 3. Projektbeteiligten am Bauvorhaben",
            },
            {
              // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
              // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
              // baueigenschaftenInRubrik[2]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
              labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft1: "Firmenname des 3. Projektbeteiligten am Bauvorhaben",
              toolTipBaueigenschaft2: "Firmenrechtsform des 3. Projektbeteiligten am Bauvorhaben",
            },
            {
              // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
              // baueigenschaftenInRubrik[3]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
              labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft1: "Nachname des 3. Projektbeteiligten am Bauvorhaben",
              toolTipBaueigenschaft2: "Vorname des 3. Projektbeteiligten am Bauvorhaben",
            },
            {
              // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
              // baueigenschaftenInRubrik[4]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
              labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft1: "Nachname Ansprechpartners des 3. Projektbeteiligten am Bauvorhaben",
              toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 3. Projektbeteiligten am Bauvorhaben",
            },
            {
              // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
              // baueigenschaftenInRubrik[5]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
              labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners 1. Projektbeteiligten am Bauvorhaben",
              toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 3. Projektbeteiligten am Bauvorhaben",
            },
            {
              // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
              // baueigenschaftenInRubrik[6]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
              labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners 1. Projektbeteiligten am Bauvorhaben",
              toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 3. Projektbeteiligten am Bauvorhaben",
            },
            {
              // baueigenschaftenInRubrik[7]
              baueigenschaftsBezeichnung:
                "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (003)",
              indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
              disable: false, // Flag für Steuerung :disable am Feld
              labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
              toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 3. Projektbeteiligten am Bauvorhaben",
            }
        ]
      },
      //===========================================================================================================
      // Rubrik für Projektbeteiligter 4
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 4",
        baueigenschaftenInRubrik: [
        {
          // baueigenschaftenInRubrik[0]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft: "Rolle des 4. Projektbeteiligten am Bauvorhaben"
        },
        {
          // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
          // baueigenschaftenInRubrik[1]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
          labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft1: "Firmenname des 4. Projektbeteiligten am Bauvorhaben",
          toolTipBaueigenschaft2: "Firmenrechtsform des 4. Projektbeteiligten am Bauvorhaben",
        },
        {
          // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
          // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
          // baueigenschaftenInRubrik[2]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
          labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft1: "Firmenname des 4. Projektbeteiligten am Bauvorhaben",
          toolTipBaueigenschaft2: "Firmenrechtsform des 4. Projektbeteiligten am Bauvorhaben",
        },
        {
          // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
          // baueigenschaftenInRubrik[3]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
          labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft1: "Nachname des 4. Projektbeteiligten am Bauvorhaben",
          toolTipBaueigenschaft2: "Vorname des 4. Projektbeteiligten am Bauvorhaben",
        },
        {
          // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
          // baueigenschaftenInRubrik[4]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
          labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft1: "Nachname Ansprechpartners des 4. Projektbeteiligten am Bauvorhaben",
          toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 4. Projektbeteiligten am Bauvorhaben",
        },
        {
          // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
          // baueigenschaftenInRubrik[5]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
          labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 4. Projektbeteiligten am Bauvorhaben",
          toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 4. Projektbeteiligten am Bauvorhaben",
        },
        {
          // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
          // baueigenschaftenInRubrik[6]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
          labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 4. Projektbeteiligten am Bauvorhaben",
          toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 4. Projektbeteiligten am Bauvorhaben",
        },
        {
          // baueigenschaftenInRubrik[7]
          baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (004)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
          toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 4. Projektbeteiligten am Bauvorhaben",
        }
        ]
      }, //===========================================================================================================
      // Rubrik für Projektbeteiligter 5
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 5",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 5. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 5. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 5. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 5. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 5. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 5. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 5. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 5. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 5. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 5. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 5. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 5. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 5. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (005)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 5. Projektbeteiligten am Bauvorhaben",
          }
        ]
      }, //===========================================================================================================
      // Rubrik für Projektbeteiligter 6
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 6",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 6. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 6. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 6. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 6. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 6. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 6. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 6. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 6. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 6. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 6. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 6. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 6. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 6. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (006)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 6. Projektbeteiligten am Bauvorhaben",
          }
        ]
      }, //===========================================================================================================
      // Rubrik für Projektbeteiligter 7
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 7",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 7. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 7. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 7. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 7. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 7. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 7. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 7. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 7. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 7. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 7. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 7. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 7. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 7. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (007)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 7. Projektbeteiligten am Bauvorhaben",
          }
        ]
      }, //===========================================================================================================
      // Rubrik für Projektbeteiligter 8
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 8",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 8. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 8. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 8. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 8. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 8. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 8. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 8. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 8. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 8. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 8. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 8. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 8. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 8. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (008)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 8. Projektbeteiligten am Bauvorhaben",
          }
        ]
      }, //===========================================================================================================
      // Rubrik für Projektbeteiligter 9
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 9",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 9. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 9. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 9. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 9. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 9. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 9. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 9. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 9. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 9. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 9. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 9. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners des 9. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 9. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (009)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 9. Projektbeteiligten am Bauvorhaben",
          }
        ]
      }, //===========================================================================================================
      // Rubrik für Projektbeteiligter 10
      {
        // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Projektbeteiligter 10",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Rolle im Projekt", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "Rolle des 10. Projektbeteiligten am Bauvorhaben"
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 10. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 10. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // ========== ACHTUNG: Dieser zweite Teil des obigen Bezeichnungswertepaars wird aktuell nicht mehr als Feld angezeigt:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Firmenname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Firmenrechtsform", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Firmenname des 10. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Firmenrechtsform des 10. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname des 10. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des 10. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Nachname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Vorname Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Nachname Ansprechpartners des 10. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Vorname des Ansprechpartners des 10. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners 4. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 10. Projektbeteiligten am Bauvorhaben",
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[6]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > Telefon (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft1: "Festnetznummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            labelBaueigenschaft2: "Mobilnummer Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft1: "Festnetznummer des Ansprechpartners 4. Projektbeteiligten am Bauvorhaben",
            toolTipBaueigenschaft2: "Mobilnummer des Ansprechpartners des 10. Projektbeteiligten am Bauvorhaben",
          },
          {
            // baueigenschaftenInRubrik[7]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Projekt > Beteiligter > E-Mail (010)",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "E-Mail-Adresse Ansprechpartner", // Wird über dem q-select oder q-input als Label angezeigt
            toolTipBaueigenschaft: "E-Mail-Adresse des Ansprechpartners des 10. Projektbeteiligten am Bauvorhaben",
          }
        ]
      }
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2] // Tab 2
  {
    ueberschriftTab: "Baumaßnahmen",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Art der Baumaßnahmen an Bestandsbau/Neubau",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau/Neubau > Kombination",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Kombination von Bestands- und Neubau" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau/Neubau > Heizung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Kombination der Heizung von Bestands- und Neubau" // Wird über dem q-select oder q-input als Label angezeigt
          },
          { // NEU:
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Heizung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Heizung des Bestandsbaus" // Wird über dem q-select oder q-input als Label angezeigt
          },
          { // NEU:
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Neubau > Heizung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Heizung des Neubaus" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1 // Bestandsbau
        ueberschriftRubrik: "Angaben zum Bestandsbau",
        baueigenschaftenInRubrik: [
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Nutzung > Wohn-/Nichtwohngebäude?",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Nutzung des Bestandsbaus (Wohn-/Nichtwohngebäude)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Förderung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Förderung für die Sanierung von Bestandsbauten" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Baujahr",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Baujahr des Bestandsbaus" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Denkmal > Schutz",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Denkmalschutzanforderung des Bestandsbaus" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2 // Neubau
        ueberschriftRubrik: "Angaben zum Neubau",
        baueigenschaftenInRubrik: [
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Neubau > Nutzung > Wohn-/Nichtwohngebäude?",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Nutzung des Neubaus (Wohn-/Nichtwohngebäude)" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // ====================== ACHTUNG: Selbe Baueigenschaft 2-mal (Bezeichnungswertepaar)! ========================================
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Baumaßnahme > Neubau > Förderung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Art der Förderung für Neubauten" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      },
    ]
  },
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2] // Tab 3, NEU: #387
  {
    ueberschriftTab: "Musterhaftigkeit",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // Rubrik 0 // Kombination Bestandsbau/Neubau
        ueberschriftRubrik: "Angaben zur Musterhaftigkeit des Bauvorhabens",
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Struktur > Einordnung > Muster > Gültigkeit > Bauvorhaben",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gültigkeit als Musterbauvorhaben" // Wird über dem q-select oder q-input als Label angezeigt
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bauvorhaben > Struktur > Einordnung > Muster > Gültigkeit > Erläuterung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Erläuterung zur Gültigkeit als Musterbauvorhaben" // Wird über dem q-select oder q-input als Label angezeigt
          },
        ]
      }
    ]
  }
];

module.exports = LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
