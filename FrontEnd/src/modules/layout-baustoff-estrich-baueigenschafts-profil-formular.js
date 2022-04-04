// layout-baustoff-estrich-baueigenschafts-profil-formular.js
// Exportiert Array mit Layout des spezifischen Profilformulars für das Baueigenschaftsprofil "Baustoff > Estrich"
// Verschachtelter Array, enthält Strukturen für Tabs mit Rubriken mit Zeilen für einzelne Baueigenschaften
// HINWEIS: Als Test-Layout kann layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js verwendet werden!

const LayoutBaustoffEstrichBaueigenschaftsProfilFormular = [
  // layoutBaustoffEstrichBaueigenschaftsProfilFormular[0] // Tab 0
  {
    ueberschriftTab: "Estrichspezifische Daten",
    labelTab: "Estrichspezifische Daten", // Neue Property für layoutgesteuertes generisches Profilformular
    bemerkungTab: "Default-Tooltip für Unter-Tab 'Estrichspezifische Daten'", // NEU: Tooltip an Tab
    // NEU: Multiline-MString-Feld mit Markdown Content für fachliche Hilfe für dieses Tab:
    // Müssen mit Backticks eingegeben werden: `..`
    // Siehe auch https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
    // und https://jack.ofspades.com/multiline-strings-in-es6-javascript/
    // Trick: 2 (unsichtbare) Blanks am Zeilenende helfen manchmal, um Zeilen umzubrechen:
    // Siehe z.B. die 2 Blanks am Ende der Zeile "- Der Boden .. nach unten  ", vor dem Link in der nächsten Zeile:
    // Siehe https://stackoverflow.com/questions/33673639/multi-line-bullet-list-in-markdown
    // NEU: Fachliche Hilfe an Tab
    beschreibungTab: `Fachliche Hilfe für Unter-Tab "Estrichspezifische Daten"
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
        ueberschriftRubrik: "Baustoffspezifische Daten für Estriche",
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
        hinweiseRubrikAusklappbar: true, // NEU: Triggert ausklappbares QExpansionItem für die folgenden v-html-Hinweise! Bei false werden diese als v-html ohne QExpansionItem angezeigt.
        hinweiseRubrikAusklappbarLabel: "Anleitung: Werteeingabe und Wertevererbung im Baustoffbaum",
        hinweiseRubrikAusklappbarDefaultOpened: false, // NEU: Klappt obiges QExpansionItem auf Wunsch ein oder aus!
        // Multiline-String-Feld aus v-html:
        hinweiseRubrik: `
         <!-- <span class='text-bold color-black'>Anleitung: Werteeingabe und Wertevererbung im Baustoffbaum:</span> --> <!-- ALT: Nur, wenn ohne QExpansionItem -->
         <ul>
          <li><b><span style='color: #000000; background-color: #B2DFDB'>Blaugrüne</span> und <span style='color: #000000; background-color: #FFCC80'>orangefarbige</span> Felder:</b>
            <ul>
              <li>
                Reguläre Felder für Werte einer Baueigenschaft am links im Baustoffbaum ausgewählten Baustoff sind <span style='color: #000000; background-color: #B2DFDB'>blaugrün</span>
                hinterlegt. Beachten Sie bei Werteeingaben in diese Felder an <b>Verzweigungsknoten</b> im Baustoffbaum, dass
                beim <b>Speichern</b> der eingegebenen Werte durch die <b>Wertevererbung</b> die eingegebenen
                Werte automatisch auch an allen direkten und indirekten <b>Kindbaustoffen</b> des ausgewählten Baustoffs <b>weitervererbt</b> werden.
              </li>
              <li>
                Sie können die Schaltfläche <b>"Undefinierte Felder orangefarbig kennzeichnen, die definierte Werte an Kindbaustoffen haben"</b> unten rechts benutzen,
                um anfangs <span style='color: #000000; background-color: #B2DFDB'>blaugrüne</span> Felder <span style='color: #000000; background-color: #FFCC80'>orangefarbig</span>
                zu kennzeichnen, deren Wert am ausgewählten Baustoff <b>undefiniert</b> ist, für die <b>aber bereits definierte</b> Werte an <b>Kindbaustoffen</b>
                im Baustoffbaum vorhanden sind.
                Diese vorhandenen Werte an Kindbaustoffen würden beim Speichern von in diese <span style='color: #000000; background-color: #FFCC80'>orangefarbigen</span> Felder neu eingegebenen Werten <b>überschrieben</b> werden.
              </li>
              <li>
                In solche <span style='color: #000000; background-color: #FFCC80'>orangefarbig</span> Felder sollten daher <b>nur dann Werte eingegeben werden,</b>
                falls diese die vorhandenen Werte an den Kindbaustoffen beim Speichern durch die Wertevererbung automatisch <b>überschreiben</b> sollen. Beim
                <b>Speichern</b> muss zusätzlich eine Bestätigung erfolgen, dass das Überschreiben beabsichtigt ist.
              </li>
              <li>
                Ein solches <b>Überschreiben</b> von Werten an Kindbaustoffen ist <b>in den Fällen sinnvoll,</b> bei denen im gesamten, am ausgewählten Baustoff
                beginnenden Zweig im Baustoffbaum <b>derselbe, eingegebene Wert</b> des betrefffenden Feldes <b>einheitlich</b> an allen Knoten im Zweig
                gelten soll. 
              </li>
              <li>
                <b>Beispiel</b> für ein solches <b>Überschreiben</b>: An allen Baustoffen in einem Zweig im Baustoffbaum, der spezifisch für Zementestriche ist, soll der Aufzählungswert für das Feld "Estrichbindemittelart"
                mit dem Wert "CT: Zementestrich" belegt werden, und zwar unabhängig davon, ob vorhandene Kindbaustoffe in diesem Zweig möglicherweise bisher davon
                abweichende Werte aufweisen. Dieser Wert gilt dann <b>einheitlich</b> für alle Knoten (d.h. für alle Verzweigungsknoten und für alle Blattknoten) in diesem
                Zweig für Zementestriche. In <b>Nachbarzweigen</b> (welche im Baustoffbaum Zweige für andere Estrichbindemittelarten repräsentieren) können dagegen, wie beabsichtigt, <b>andere Werte</b> für diesen Aufzählungswert
                gelten (z.B. "CA: Calciumsulfatestrich"). An allen Elternknoten im Pfad oberhalb des
                ausgewählten Baustoffs ist dieser Aufzählungswert auf Grund der
                in BIM.<em>click</em> für alle Baueigenschaften stets und an allen Knoten geltenden <b>Wertevererbungsregel</b> dann <b>undefiniert</b>
                (siehe auch die <a target="_blank" href=https://bimclick.herokuapp.com/Dokumentation/5-3-Aktivierung-und-Wertevererbung-von-Baueigenschaften >Online-Dokumentation</a> zu diesem Thema).
              </li>
              <li>
                An <b>Verzweigungsknoten</b> im Baustoffbaum muss, um versehentliches Überschreiben zu vermeiden, zur <b>Eingabe von Werten</b> in das Profilformular generell zuerst die Schaltfläche
                <b>'Werteeingabe am Verzweigungsknoten temporär freischalten'</b> unten gedrückt werden. Diese schaltet alle <span style='color: #000000; background-color: #B2DFDB'>blaugrün</span>
                hinterlegten sowie ggf. <span style='color: #000000; background-color: #FFCC80'>orangefarbig</span> gekennzeichneten Felder zur Eingabe von Werten frei.
                <span style='color: #000000; background-color: #B2EBF2'>Cyanfarbige</span> Felder mit von Elternbaustoffen
                ererbten Werten werden nie zur Eingabe freigeschaltet.
              </li>
            </ul>
          </li>
           <li><b><span style='color: #000000; background-color: #B2EBF2'>Cyanfarbige</span> Felder:</b>
           <ul>
            <li>
              Felder, deren Werte von <b>Elternbaustoffen</b> im Baustoffbaum <b>ererbt</b> wurden,
              sind im Profilformular für den links im Baustoffbaum ausgewählten Baustofff <span style='color: #000000; background-color: #B2EBF2'>cyanfarbig</span> hinterlegt.
              In solche Felder können am ausgewählten Baustoff auch von Administratoren oder Redakteuren generell <b>keine Werte eingegeben</b> werden, da dies
              die in BIM.<em>click</em> für alle Baueigenschaften stets und an allen Knoten geltende <b>Wertevererbungsregel</b> verletzen würde
              (siehe auch die <a target="_blank" href=https://bimclick.herokuapp.com/Dokumentation/5-3-Aktivierung-und-Wertevererbung-von-Baueigenschaften >Online-Dokumentation</a> zu diesem Thema).
            </li>
            <li>
              Falls Sie Werte von solchen am ausgewählten Baustoff <span style='color: #000000; background-color: #B2EBF2'>cyanfarbig</span>
              hinterlegten Feldern <b>ändern</b> möchten, müssen Sie im Baustoffbaum links einen "höher gelegenen" <b>Elternbaustoff</b> auswählen: 
              <ul>
                <li>
                  Wählen Sie dazu im Baustoffbaum denjenigen <b>Elternbaustoff</b>
                  aus, an dem der betreffende Wert <b>erstmals im Baum definiert ist</b>, im Pfad vom Wurzelknoten aus
                  gesehen abwärts bis zum aktuell ausgewählten Baustoff im Baustoffbaum. Dort sind
                  die Werte dieser Felder nicht ererbt, und es können daher Werte eingegeben werden, welche vom System
                  beim Speichern automatisch an alle Kindbaustoffe weitervererbt werden. Sie können diesen Elternbaustoff
                  finden, indem Sie im Baustoffbaum, beim aktuell ausgewählten Baustoff beginnend, schrittweise "nach oben wandern", d.h.
                  in jedem Schritt den direkten Elternknoten des aktuell ausgewählten Knotens auswählen, und überprüfen, ob das betreffende Feld dort
                  <span style='color: #000000; background-color: #B2EBF2'>cyanfarbig</span> hinterlegt ist oder nicht. Der erste dabei
                  ausgewählte Elternknoten, an dem das Feld nicht mehr <span style='color: #000000; background-color: #B2EBF2'>cyanfarbig</span>
                  hinterlegt ist, ist dann derjenige, an dem dieser Wert <b>erstmals im Baum definiert ist</b>, im Pfad
                  vom Wurzelknoten aus gesehen abwärts bis zum aktuell ausgewählten Baustoff im Baustoffbaum.
                </li>
                <li>
                  Sie könnten auch einen noch "höher gelegenen" <b>Elternbaustoff</b> im Pfad vom Wurzelknoten aus
                  gesehen abwärts bis zum aktuell ausgewählten Baustoff im Baustoffbaum auswählen,
                  an dem das betreffende <span style='color: #000000; background-color: #B2EBF2'>cyanfarbig</span>
                  hinterlegte Feld zwar im aktuellen Baueigenschaftsprofil aktiviert ist,
                  aber dessen Wert noch <b>undefiniert</b> ist. Sie sollten dabei bedenken, dass auch dort nach
                  Werteeingabe beim Speichern die Werte automatisch an alle Kindbaustoffe weitervererbt
                  werden, wozu in diesem Fall auch etwaige "Geschwisterbaustoffe" mit ihren "Geschwisterzweigen" zählen,
                  die nicht auf dem aktuellen Pfad liegen, sondern auf "parallelen" Pfaden im Baum. Dadurch könnten
                  unbeabsichtigte Änderungen ausgelöst werden, weshalb diese Möglichkeit mit Vorsicht zu verwenden ist.
                </li>
              </ul>
              <li>
                Zusammengefasst: Welchen <b>Elternbaustoff</b> Sie ggf. zur Änderung von Werten in solchen am ausgewählten Baustoff <span style='color: #000000; background-color: #B2EBF2'>cyanfarbig</span>
                hinterlegten Feldern auswählen sollten, hängt davon ab, was der gewünschte <b>Zweig</b> im Baustoffbaum ist, in dem diese
                geänderten Werte dann automatisch an alle Kindbaustoffe im Zweig bis hinunter zu den Blattknoten weiterverebt werden sollen.
                Der auszuwählende Elternbaustoff sollte der <b>direkte Wurzelknoten desjenigen Zweigs</b> im Baustoffbaum sein, in dem der geänderte Wert des
                betreffenden Feldes <b>einheitlich</b> an allen Knoten im Zweig gelten soll.
              </li>
            </ul>
          </li>
        </ul>
        `,
        // "<span class='text-bold color-red'>Testhinweise:</span> Hinweistext", // NEU: Test von Hinweisen am Ende der Rubrik, mit v-html-Content
        // ACHTUNG: Hier <span>, nicht <div>, sonst Line Break!
        //
        hideRubrik: false, // Neue Property - Default ist false
        farbeRubrik: "bg-blue-grey-2", // Neue Property - Default ist bg-blue-grey-2
        spaltenRubrik: 4, // NEU: Optionale Property für Anzahl der Spalten dieser Rubrik - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          // NEU - #380: BEg gelöscht
          /*
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baustoff > Estrich > Bauart",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
          },
          */
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Baustoff > Estrich > Bindemittelart",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            optionGroup: true, // NEU: Optionales Flag für QOptionGroup statt QSelect für Aufzählungswerte
            radio: true, // NEU: Flag für Steuerung, ob QOptionGroup mit type="checkbox" (radio: false) oder type="radio" (radio: true)
            // HINWEIS: Dies könnte man auch per Prop multiple = true/false steuern (bereits vorhandene Prop für QSelects), allerdings beruht
            //          die Logik für String-Konvertierung in mounted() etc. auf der Prop radio: true/false
            labelBaueigenschaft: "Estrichbindemittelart (Test mit Radio-Buttons)",
            options: [
              // Steuert die auswählbaren Werte in der q-option-group
              // Siehe https://v1.quasar.dev/vue-components/option-group#qoptiongroup-api
              {
                label: "CA:  Calciumsulfatestrich",
                value: "CA:  Calciumsulfatestrich",
                color: "primary",
                // disable: true // Optional
              },
              {
                label:  "CAF: Calciumsulfat-Fließestrich",
                value:  "CAF: Calciumsulfat-Fließestrich",
                color: "primary",
                // disable: true // Optional
              },
              {
                label: "AS:  Gußasphaltestrich",
                value: "AS:  Gußasphaltestrich",
                color: "primary",
                // disable: true // Optional
              },
              {
                label: "MA:  Magnesiaestrich",
                value: "MA:  Magnesiaestrich",
                color: "primary",
                // disable: true // Optional
              },
              {
                label: "SR:  Kunstharzestrich",
                value: "SR:  Kunstharzestrich",
                color: "primary",
                // disable: true // Optional
              },
              {
                label: "CT:  Zementestrich",
                value: "CT:  Zementestrich",
                color: "primary",
                // disable: true // Optional
              },
            ]
          },
          {
            // baueigenschaftenInRubrik[1]
            baueigenschaftsBezeichnung: "Baustoff > Estrich > Einbauart",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            //******************************************************************************************************************************************************************************************
            // HINWEIS: Die folgenden mit //**** gekennzeichneten Properties sind für Testzwecke für Erweiterungen im Rahmen von Epic 38.o - sie werden verwendet in speziellem Testcode von
            // layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue, im Zusammenspiel mit computed Properties und Methoden in functions-baustoff-estrich baueigenschafts.profil-formular.js
            // Im Normalbetrieb ist der Testcode dafür in layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue disabled per v-if="false" in Zeile 2464! Dann sind diese Properties ohne
            // Wirkung.
            //******************************************************************************************************************************************************************************************
            // ACHTUNG: Die folgende Variante hier (Test 7) funktioniert NICHT!!! Stattdessen ist ein Methodenaufruf notwendig, siehe Test 8 mit readOnlyByMethod: "testSpecificReadonlyMethod"
            // Feld soll auf readonly gesetzt werden, wenn andere BEg einen bestimmten Aufzählungswert hat - siehe Test 7 in layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue
            // readonlyMitSteuerndemAufzaehlungsWert: "profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaft('Baustoff > Estrich > Bindemittelart')].aufzaehlungsWert.includes('CT: Zementestrich')",
            // FUNKTIONIERT SO NICHT!!!
            // Bringt zwar keinen Fehler im Browser Log, aber das Feld ist so immer auf readonly, vermutlich wird diese JS-Expresssion am :readonly gar nicht ausgewertet
            // Variante mit ternary ?-Notation:
            //******************************************************************************************************************************************************************************************
            readonlyMitSteuerndemAufzaehlungsWert:
              "profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaft('Baustoff > Estrich > Bindemittelart')].aufzaehlungsWert.includes('CT: Zementestrich') ? true : false",
            //******************************************************************************************************************************************************************************************
            // FUNKTIONIERT SO AUCH NICHT!!!
            // Fehler im Browser Log - die Variante wird als String, nicht als Boolean ausgewertet!
            // Invalid prop: type check failed for prop "readonly". Expected Boolean, got String with value
            // "profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaft('Baustoff > Estrich > Bindemittelart')].aufzaehlungsWert.includes('CT: Zementestrich') ? true : false".
            // ACHTUNG: Bei den Expressions zur Prüfung enthalten die Aufzählungwerte Arrays of String, nicht String!
            // Die Prüfung funktionierte nicht mit == ['CT: Zementestrich], sondern nur mit includes('CT: Zementestrich')
            // Vermutlich gibt es hier aus dem Layout keinen Zugriff auf die in obiger JS-Expression benutzten Daten und Funktionen aus der Vue-Komponente, auch nicht zur Laufzeit!
            // Stattdessen Prop für readonly per Methodenaufruf:
            //******************************************************************************************************************************************************************************************
            readonlyByMethod: "testSpecificReadonlyMethod" // NEU: Property, um Methode aufzurufen, in Test 8
            //******************************************************************************************************************************************************************************************
          },
          {
            // baueigenschaftenInRubrik[2]
            baueigenschaftsBezeichnung:
              "Baustoff > Estrich > Biegezugfestigkeitsklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            //*****************************************************************************************
            // setValueByMethod: "testSetMethod" // NEU: Property, um Methode aufzurufen, in Test 3
            setValueByMethod: "testGeneralSetMethod" // NEU: Property, um Methode aufzurufen, in Test 4
            //*****************************************************************************************
          },
          {
            // baueigenschaftenInRubrik[3]
            baueigenschaftsBezeichnung: "Baustoff > Estrich > Härteklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            //**********************************************************************************************
            readonlyByMethod: "testGeneralReadonlyMethod" // NEU: Property, um Methode aufzurufen, in Test 9
            //**********************************************************************************************
          },
          {
            // baueigenschaftenInRubrik[4]
            baueigenschaftsBezeichnung:
              "Baustoff > Estrich > Druckfestigkeitsklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            //******************************************************************************************
            setValueByMethod: "testSpecificSetMethod" // NEU: Property, um Methode aufzurufen, in Test 5
            //******************************************************************************************
          },
          {
            // baueigenschaftenInRubrik[5]
            baueigenschaftsBezeichnung:
              "Baustoff > Estrich > Oberflächenhärteklasse",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false, // Flag für Steuerung :disable am Feld
            //************************************************************************************************************************
            setValueByMethod: "sollIstWertePaarSetMethod", // NEU: Property, um Methode aufzurufen, in Test 11
            sollWertBaueigenschaft: "Baustoff > Estrich > Bindemittelart" // NEU: Property, um paarigen Sollwert anzugeben, in Test 11
            //************************************************************************************************************************
          }
          /*
          {
            // ACHTUNG: Wertepaar! Wird in 2 Feldern dargestellt im Profilformular!
            // baueigenschaftenInRubrik[x]
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
          */
        ]
      }
    ]
  }
  //------------------------------------------------------------------------------------------------------------------------------------
];

module.exports = LayoutBaustoffEstrichBaueigenschaftsProfilFormular; // NEU
// ACHTUNG: Mit
// export default LayoutBaustoffEstrichBaueigenschaftsProfilFormular
// kommt Fehler "SyntaxError: Unexpected token export"!!!
