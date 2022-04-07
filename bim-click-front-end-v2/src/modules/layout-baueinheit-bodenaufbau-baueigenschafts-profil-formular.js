const LayoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular = [
  //------------------------------------------------------------------------------------------------------------------------------------
  // layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Bodenaufbau",
    rubrikenInTab: [
      {
        // rubrikenInTab[0] // NEU: Rubrik 0
        ueberschriftRubrik: "Übergeordnete Angaben", // NEU!!!
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Fertigboden > Oberkante (OKFFB)", // NEU: #281/#302
            // baueigenschaftsBezeichnung: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Fertigboden > Oberkante (OKFFB)", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "OKFFB"
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Rohboden > Oberkante (OKRFB)", // NEU: #281/#302
            // baueigenschaftsBezeichnung: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Rohboden > Oberkante (OKRFB)", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "OKRFB"
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Rohboden > Unterkante (UKRFB)", // NEU: #281/#302
            // baueigenschaftsBezeichnung: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Rohboden > Unterkante (UKRFB)", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "UKRFB"
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Niveau > Fertigboden > Unterkante (UKFFB)", // NEU: #281/#302
            // baueigenschaftsBezeichnung: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Niveau > Fertigboden > Unterkante (UKFFB)", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "UKFFB"
          },
          //---------------------------------------------------------------------------------------------------------------------------------------------------
          // ALT: Die folgende Baueigenschaft vorläufig noch nicht im Layout angelegt, da noch nicht finalisiert im XLS für Baueigenschaften
          // Sie wird gebraucht, um aus den 0.0-Werten von Niveau-Eigenschaften (Kennwertepaare, kennWert1 ist 0.0-Wert, kennWert2 ist NHN-Wert)
          // den paarigen NHN-Wert (kennwert2) zu computen, indem von kennWert1 der Wert dieser Baueigenschaft
          // Sie ist ebenfalls ein Kennwertepaar, in kennWert2 steht der NHN-Wert des Niveaus der Eingangstür
          {
          // baueigenschaftenInRubrik[4]
          baueigenschaftsBezeichnung: "Baueinheit > Gebäude > Geometrie > Eingang > Niveau > Fertigboden > Oberkante (OKFFB EG)",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft: "Oberkantenniveau des Fertigbodens am Gebäudeingang (OKFFB EG)"
          }
          //=======================================================================================================================================================
          // TODO XXXXXX #302: Die folgende Baueigenschaft ebenfalls vorläufig noch nicht im Layout angelegt, da noch nicht finalisiert im XLS für Baueigenschaften
          // Sie ist ein künftiger Aufzählungswert und dient zur Auswahl eines individuellen Raumprofils (mit Vorgabewerten)
          /*
          {
          // baueigenschaftenInRubrik[5]
          baueigenschaftsBezeichnung: "Baueinheit > Raum > Nutzungsprofil",
          indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          disable: false, // Flag für Steuerung :disable am Feld
          labelBaueigenschaft: "Nutzungsprofil des Raums"
          },
          */
        ]
      },
      {
        // rubrikenInTab[1] // Rubrik 1
        ueberschriftRubrik: "Angaben zur Geometrie",
        hintergrundFarbeRubrik: "q-pa-none bg-grey-1",
        baueigenschaftenInRubrik: [
          //===================================================================================================================
          // ACHTUNG: Feld disable wird hier nicht zum Disabling verwendet, sondern per v-if zum Ausblenden der gesamten Zeile
          //          für die Baueigenschaft (Quickfix MS, um "Absenkung" auszublenden, die keine entsprechende BEg am Raum hat)
          //===================================================================================================================
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Aufbauhöhe", // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Oberboden > Aufbauhöhe > Istwert", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index,
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Aufbauhöhe des Fertigbodens", // NEU: #281/#302b
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe", // NEU: #281/#302
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe", // ALT
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "=",
            //=================================================================================================================
            // NEU:
            // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
            // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
            // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
            // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "aufbauhoeheFertigboden", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
            bezeichnungVergleichSollIstWert: "aufbauhoehe" // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Geometrie > Rohboden > Dicke", // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Rohdecke > Höhe > Istwert", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dicke des Rohbodens", // NEU: #281/#302
            // labelBaueigenschaft: "Rohdeckenhöhe", // ALT
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Rohboden > Dicke", // NEU: #281/#302
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Rohboden > Dicke", // ALT
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "=",
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "dickeRohboden", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
            bezeichnungVergleichSollIstWert: "aufbauhoehe" // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
          },
          // ===================================================================================================================-->
          // TODO XXXXXX #302:                                                                                                  -->
          // Folgende BEg wird verglichen mit Niveaudifferenz OKFFB - diese müsste erst computed werden am Raum!                -->
          // Macht aber auch so keinen Sinn - gemeint war mit dieser BEg eventuell eine "lokale" Bodenabsenkung                 -->
          // es Rohbodens, z.B. für eine Dusche. Diese vorläufig disabled im Layout File.                                       -->
          // ------------------------------------------------------------------------------------------------------------------ -->
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
            //==============================================================================================================
              "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Oberkante (OKFFB) > Absenkung", // ALT - NEU: #281/#302 - Geändert!!!
            //==============================================================================================================
            // "Baueinheit > Bodenaufbau > Geometrie > Rohdecke > Absenkung > Istwert", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: true, // Flag für Steuerung :disable am Feld - Zeile wird einstweilen ausgeblendet, da ihr Sollwert am
                           // Raum so nicht berechnet wird und so auch keinen Sinn macht!
            labelBaueigenschaft: "Absenkung der Oberkante des Fertigbodens", // NEU: #281/#302
            // labelBaueigenschaft: "Rohdeckenabsenkung", // ALT
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Fertigboden > Oberkante (OKFFB) > Niveaudifferenz Geschoss - Raum", // NEU - #281/#301:
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Rohdecke > Absenkung > Sollwert", // ALT
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "="
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Geometrie > Bodenunterseite > Dicke", // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Unterdecke > Bekleidung > Höhe > Istwert", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Dicke der Bodenunterseite", // NEU: #281/#302
            // labelBaueigenschaft: "Höhe der Rohdeckenbekleidung", // ALT
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Bodenunterseite > Dicke", // NEU: #281/#302
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Bodenunterseite > Dicke", // ALT
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "=",
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "dickeBodenunterseite", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
            bezeichnungVergleichSollIstWert: "aufbauhoehe" // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung: "Baueinheit > Bodenaufbau > Geometrie > Gesamtdicke", // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Gesamthöhe > Istwert", // ALT
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // NEU: #281/#302
            // disable: true, // ALT: Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gesamtdicke des Bodenaufbaus", // NEU: #281/#302
            // labelBaueigenschaft: "Gesamtdeckenhöhe", // ALT
            // baueigenschaftsBezeichnungSollwert: null, // ALT: Für dieses Feld war noch kein Sollwert angegeben!
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Raum > Geometrie > Bodenaufbau > Gesamtdicke", // NEU: #281/#302
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "=", // NEU
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "gesamtdickeBoden", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
            bezeichnungVergleichSollIstWert: "aufbauhoehe" // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
            // operatorSollIstWerteVergleich: "="
          }
        ]
      },
      {
        // rubrikenInTab[2] // Rubrik 2
        ueberschriftRubrik: "Angaben zu den Nutzlasten [vorläufig - noch ohne Istwert-Berechnungen]",
        hintergrundFarbeRubrik: "q-pa-none bg-grey-1",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
            //======================================================================================================
            "Baueinheit > Bodenaufbau > Nutzlasten > Kategorie > Istwert", // NEU, aus neuem Profil "Baueinheit > Bodenaufbau"
            // "Baueinheit > Raum > Nutzlasten > Kategorie > Richtwert", // NEU - ersetzt BEg in nächster Zeile (aus neuem Tab "Raum" > "Lasten")
            // "Baueinheit > Raum > Bodenaufbau > Nutzlastenkategorie > Sollwert", // ALT
            // ACHTUNG: Es gab hier keinen Ist-Wert dafür, siehe #302
            // BEg existiert: "Baueinheit > Bodenaufbau > Nutzlasten > Kategorie > Istwert"
            // Diese war aber ursprünglich noch nicht dem Profil "Baueinheit > Bodenaufbau" zugeordnet - mittlerweile zugeordnet
            //======================================================================================================
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Nutzlastenkategorie",
            baueigenschaftsBezeichnungSollwert:
              // "Baueinheit > Raum > Lastannahmen > Bodenaufbau > Nutzlastenkategorie > Sollwert", // ALT
              "Baueinheit > Raum > Nutzlasten > Kategorie > Richtwert", // NEU - ersetzt BEg in voriger Zeile (aus neuem Tab "Raum" > "Lasten")
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: null, // ?? mit welcher Ordnungsrelation?
            bezeichnungVergleichSollIstWert: "aufbauhoehe", // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
            //=======================================================================================================
            nurSollWertAnzeigen: true // NEU: Unterdrückt Anzeige des Vergleichs und des Istwerts in hinterer Spalte!
            // Default ist "false", muss also nur angegeben werden, wenn Istwertanzeige unterdrückt werden soll!
            // ACHTUNG: Gleichzeitig sollte oben operatorSollIstWerteVergleich: null, gesetzt werden!
            //=======================================================================================================
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Nutzlasten > Flächenlast > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Flächenlast",
            baueigenschaftsBezeichnungSollwert:
              // "Baueinheit > Raum > Lastannahmen > Bodenaufbau > Flächenlast > Sollwert" // ALT
              "Baueinheit > Raum > Nutzlasten > Flächenlast > Sollwert", // NEU - ersetzt BEg in voriger Zeile (aus neuem Tab "Raum" > "Lasten")
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≤", // NEU, ALT: "≥" - war falsch laut Erik!
            bezeichnungVergleichSollIstWert: "aufbauhoehe", // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
            //=======================================================================================================
            benutzeComputedWert: false // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
            //=======================================================================================================
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Nutzlasten > Einzellast > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Einzellast",
            baueigenschaftsBezeichnungSollwert:
              // "Baueinheit > Raum > Lastannahmen > Bodenaufbau > Einzellast > Sollwert", // ALT
              "Baueinheit > Raum > Nutzlasten > Einzellast > Sollwert", // NEU - ersetzt BEg in voriger Zeile (aus neuem Tab "Raum" > "Lasten")
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≤", // NEU, ALT: "≥" - war falsch laut Erik!
            bezeichnungVergleichSollIstWert: "aufbauhoehe", // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
            //=======================================================================================================
            benutzeComputedWert: false // ACHTUNG: false muss bei Feldern mit Istwerten angegeben werden, sonst wird die Ausgabe des Istwerts unterdrückt!
            //=======================================================================================================
          }
        ]
      },
      {
        // rubrikenInTab[3] // Rubrik 3
        ueberschriftRubrik: "Angaben zum Wärmeschutz",
        hintergrundFarbeRubrik: "q-pa-none bg-grey-1",
        //==================================================================================================================
        // ACHTUNG: Bei Verschiebungen von Feldern innerhalb der Rubriken müssen auch die Indizes in den computed-Funktionen
        // in baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue mit angepasst werden!!!
        //==================================================================================================================
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          /*
          {
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient (DIN 6946) > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wärmedurchgangskoeffizient (DIN 6946)", // Geforderter Wärmedurch-gangskoeffizient aus der GEG-Berechnung
            baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient (DIN 6946) > Sollwert", // Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≥"
          },
          */
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Gebäude > Nutzung > Typ > EnEV/GEG", // NEU
              // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Angrenzungssituation", // ALT - Bezeichnung geändert!
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Gebäudetyp nach EnEV/GEG",
            baueigenschaftsBezeichnungSollwert:
              // "Baueinheit > Raum > Lastannahmen > Bodenaufbau > Nutzlastenkategorie > Sollwert", // ALT
              "Baueinheit > Gebäude > Nutzung > Typ > EnEV/GEG", // NEU - ersetzt BEg in voriger Zeile (aus neuem Tab "Raum" > "Lasten")
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient (DIN 6946) > Sollwert", // Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: null,
            nurSollWertAnzeigen: true, // NEU
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Angrenzungssituation", // NEU - Bezeichnung geändert!
              // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Angrenzungssituation", // ALT - Bezeichnung geändert!
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Angrenzungssituation",
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient (DIN 6946) > Sollwert", // Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: null
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Flächenheizung?", // NEU
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Flächenheizung?",
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient (DIN 6946) > Sollwert", // Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: null
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Intern", // NEU
              // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Angrenzungssituation", // ALT - Bezeichnung geändert!
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Interner Wärmeübergangswiderstand",
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient (DIN 6946) > Sollwert", // Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: null,
            //=================================================================================================================
            // NEU:
            // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
            // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
            // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
            // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "internerWaermeuebergangswiderstand", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
            // bezeichnungVergleichSollIstWert: "aufbauhoehe" // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Extern", // NEU
              // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Angrenzungssituation", // ALT - Bezeichnung geändert!
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Externer Wärmeübergangswiderstand",
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient (DIN 6946) > Sollwert", // Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: null, // ACHTUNG: Feld wird aktuell NICHT verwendet im Profilformular "Bodenaufbau"!
            //=================================================================================================================
            // NEU:
            // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
            // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
            // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
            // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "externerWaermeuebergangswiderstand", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          },
          /*
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Angrenzungssituation",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Angrenzungssituation bei Boden ohne Flächenheizung",
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Flächenheizung > Sollwert", // Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null
          },
          */
          // Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Flächenheizung > Sollwert
          /*
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
            "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wärmedurchlasswiderstand bei Boden mit Flächenheizung",
            baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Flächenheizung > Sollwert", // Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≤"
          },
          */
          // Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Flächenheizung > Angrenzungssituation
          /*
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Flächenheizung > Angrenzungssituation",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Angrenzungssituation bei Boden mit Flächenheizung",
            // baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Flächenheizung > Sollwert", // Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null
            // operatorSollIstWerteVergleich: "≤"
          },
          */
          // Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert
          // Hier stimmte der Sollwert nicht! Es war ein mittlerer Wärmedurchgangskoeffizient aus dem Referenzgebäude,
          // dies ist allerdings der Kehrwert eines Wärmedurchlasswiderstands, passt also nicht zum Istwert!
          // ALT: "Baueinheit > Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert"
          // NEU: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Sollwert",
          // https://www.enargus.de/pub/bscw.cgi/d14099-2/*/*/W%c3%a4rmedurchlasskoeffizient.html?op=Wiki.getwiki
          // Der Wärmedurchlasskoeffizient hat die gleiche physikalische Einheit wie der Wärmedurchgangskoeffizient,
          // allerdings wird bei der Berechnung des Wärmedurchgangskoeffizienten der Wärmeübergangswiderstand mitberücksichtigt.
          // Dieser erfasst den Übergang des Wärmestroms von einem festen Baustoff in Luft oder umgekehrt.
          {
            // baueigenschaftenInRubrik[5] // ACHTUNG: Indizes ändern sich bei Disablings oben!
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wärmedurchlasswiderstand",
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Sollwert",
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≤",
            //=================================================================================================================
            // NEU:
            // benutzeComputedWert zeigt an, dass dieser Wert (der Istwert!) über computed-Eigenschaften berechnet wird
            // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
            // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
            // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "waermedurchlasswiderstand", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
            //=================================================================================================================
            // NEU:
            // benutzeComputedWertSollwert zeigt an, dass der Sollwert über computed-Eigenschaften berechnet wird
            benutzeComputedWertSollwert: true,
            bezeichnungComputedPropertySollwert: "waermedurchlasswiderstandSollwert", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          },
          {
            // baueigenschaftenInRubrik[6] // ACHTUNG: Indizes ändern sich bei Disablings oben!
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Wärmedurchgangskoeffizient", // Angestrebter Wärmedurchgangskoeffizient aus dem Referenzgebäude nach Anlage 1 zu § 15 Absatz 1 GEG
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Sollwert", // Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≥",
            //=================================================================================================================
            // NEU:
            // benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird
            // Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties
            // angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty,
            // deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
            benutzeComputedWert: true,
            bezeichnungComputedProperty: "waermedurchgangskoeffizient", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
            //=================================================================================================================
            // NEU:
            // benutzeComputedWertSollwert zeigt an, dass der Sollwert über computed-Eigenschaften berechnet wird
            benutzeComputedWertSollwert: true,
            bezeichnungComputedPropertySollwert: "waermedurchgangskoeffizientSollwert", // HINWEIS: Bezeichner für computed Property =  Key-Feld im Array mapOfComputedProperties
          },
          //=========================================================================================================================================
          // TODO XXXXXX - Die folgenden Felder müssen überabeitet werden!
          /*
          // Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert
          {
            // baueigenschaftenInRubrik[2]
            // ACHTUNG: Aktuell ist hierfür am Bodenaufbau nur ein Sollwert vorhanden! Das kann nicht stimmen!
            // Dieser heisst: "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert"
            // TODO XXXXX: Stattdessen vorläufig als Istwert den oben schon verwendeten Istwert für den Wärmedurchgangskoeefizienten am Bodenaufbau genommen
            // Verursacht aber duplicate Key Warning von Vue - daher vorläufig disabled!
            baueigenschaftsBezeichnung:
              // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert", // ALT
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert", // NEU - selbes Feld wie oben!
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Angestrebter Wärmedurchgangskoeffizient aus dem Referenzgebäude für Wohngebäude nach Anlage 1 zu § 15 Absatz 1 GEG",
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Referenzgebäude > Wohngebäude > Sollwert", // Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≥"
          },
          {
            // baueigenschaftenInRubrik[3]
            // ACHTUNG: Aktuell ist hierfür am Bodenaufbau nur ein Sollwert vorhanden! Das kann nicht stimmen!
            // Dieser heisst: "Baueinheit > Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert"
            // TODO XXXXX: Stattdessen vorläufig als Istwert den oben schon verwendeten Istwert für den Wärmedurchgangskoeefizienten am Bodenaufbau genommen
            // Verursacht aber duplicate Key Warning von Vue - daher vorläufig disabled!
            baueigenschaftsBezeichnung:
              // "Baueinheit > Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert", // ALT
              "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert", // NEU - selbes Feld wie oben!
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            eigenschaftIstwert: null,
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft:
              "Angestrebter mittlerer Wärmedurchgangskoeffizient Ū aus dem Referenzgebäude für Nichtwohngebäude nach Anlage 2 zu § 18 Absatz 1 GEG",
            baueigenschaftsBezeichnungSollwert:
              "Baueinheit > Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert", // Bodenaufbau > Wärmeschutz > Mittlerer Wärmedurchgangskoeffizient > Referenzgebäude > Nichtwohngebäude > Sollwert
            indexSollwertInProfilModelAusgewaehlterKnoten: null,
            operatorSollIstWerteVergleich: "≥"
          }
          */
        ]
      },
      {
        // rubrikenInTab[4] // Rubrik 4
        ueberschriftRubrik: "Angaben zum Schallschutz [noch nicht implementiert]",
        hintergrundFarbeRubrik: "q-pa-none bg-grey-1",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          // {
          //   // baueigenschaftenInRubrik[0]
          //   baueigenschaftsBezeichnung:
          //     "Baueinheit > Bodenaufbau > Schallschutz > Bewerteter Norm-Trittschallpegel > Istwert",
          //   indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          //   disable: false, // Flag für Steuerung :disable am Feld
          //   labelBaueigenschaft: "Bewerteter Norm-Trittschallpegel",
          //   baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Schallschutz > Bewerteter Norm-Trittschallpegel > Sollwert",
          //   indexSollwertInProfilModelAusgewaehlterKnoten: null,
          //   operatorSollIstWerteVergleich: "≥"
          // },
          // /*
          // {
          //   // baueigenschaftenInRubrik[1]
          //   baueigenschaftsBezeichnung:
          //     "Baueinheit > Bodenaufbau > Schallschutz > Bewerteter Norm-Trittschallpegel > Sollwert",
          //   indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          //   disable: false, // Flag für Steuerung :disable am Feld
          //   labelBaueigenschaft: "Bewerteter Norm-Trittschallpegel"
          // },
          // */
          // {
          //   // baueigenschaftenInRubrik[2]
          //   baueigenschaftsBezeichnung:
          //     "Baueinheit > Bodenaufbau > Schallschutz > Bewertetes Schall-Längsdämmmaß > Istwert",
          //   indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          //   disable: false, // Flag für Steuerung :disable am Feld
          //   labelBaueigenschaft: "Bewertetes Schall-Längsdämmmaß",
          //   baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Schallschutz > Bewertetes Schall-Längsdämmmaß > Sollwert",
          //   indexSollwertInProfilModelAusgewaehlterKnoten: null,
          //   operatorSollIstWerteVergleich: "≤"
          // },
          /*
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Schallschutz > Bewertetes Schall-Längsdämmmaß > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bewertetes Schall-Längsdämmmaß"
          },
          */
          // {
          //   // baueigenschaftenInRubrik[4]
          //   baueigenschaftsBezeichnung:
          //     "Baueinheit > Bodenaufbau > Schallschutz > Bewertetes Schalldämmmaß > Istwert",
          //   indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          //   disable: false, // Flag für Steuerung :disable am Feld
          //   labelBaueigenschaft: "Bewertetes Schalldämmmaß",
          //   baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Schallschutz > Bewertetes Schalldämmmaß > Sollwert",
          //   indexSollwertInProfilModelAusgewaehlterKnoten: null,
          //   operatorSollIstWerteVergleich: "≤"
          // },
          /*
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Schallschutz > Bewertetes Schalldämmmaß > Sollwert",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Bewertetes Schalldämmmaß"
          },
          */
          // {
          //   // baueigenschaftenInRubrik[5]
          //   baueigenschaftsBezeichnung:
          //     "Baueinheit > Bodenaufbau > Schallschutz > Deckenunterseite > Schallabsorptionsgrad > Istwert",
          //   indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
          //   disable: false, // Flag für Steuerung :disable am Feld
          //   labelBaueigenschaft: "Schallabsorptionsgrad der Deckenunterseite",
          //   baueigenschaftsBezeichnungSollwert: "Baueinheit > Bodenaufbau > Schallschutz > Deckenunterseite > Schallabsorptionsgrad > Sollwert",
          //   indexSollwertInProfilModelAusgewaehlterKnoten: null,
          //   operatorSollIstWerteVergleich: "≥"
          // },
        ]
      },
      {
        // rubrikenInTab[5] // Rubrik 5
        ueberschriftRubrik: "Angaben zur Musterhaftigkeit", // NEU: #387
        // hintergrundFarbeRubrik: "q-pa-none bg-grey-1",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Struktur > Einordnung > Muster > Gültigkeit > Bauvorhaben",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "",
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Struktur > Einordnung > Muster > Gültigkeit > Räume > Nutzungsnachbarschaft?",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: ""
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Struktur > Einordnung > Muster > Gültigkeit > Erläuterung",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            // labelBaueigenschaft: "",
          },
        ]
      },
      {
        // rubrikenInTab[6] // Rubrik 6
        ueberschriftRubrik: "Angaben zu den Raumnutzungsnachbarschaften", // NEU: #387
        // hintergrundFarbeRubrik: "q-pa-none bg-grey-1",
        baueigenschaftenInRubrik: [
          // ---------------------- 1. Zeile von Feldern in Rubrik 1 ------------------------------
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung:
              "Baueinheit > Raum > Nutzung > Profil",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Raumnutzungsprofil des Raums über dem Bodenaufbau",
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung:
              "Baueinheit > Boden > Struktur > Einordnung > Nachbarraum > Nutzungsprofil",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Raumnutzungsprofil des Nachbarraums unter dem Bodenaufbau (Sollwert)"
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baueinheit > Bodenaufbau > Struktur > Einordnung > Nachbarraum > Nutzungsprofil",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            labelBaueigenschaft: "Raumnutzungsprofil des Nachbarraums unter dem Bodenaufbau (Istwert)",
          },
        ]
      }
    ]
  }
];

module.exports = LayoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular; // NEU
