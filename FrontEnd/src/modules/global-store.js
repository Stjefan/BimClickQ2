// Node Module global-store.js
// Modul für globale shared Component Daten, die von Vue-/Quasar-Komponenten gemeinsam benutzt werden können
// per import {globalStore} from "../pages/global-store";
// Exportiert: const globalStore = {state: {object1, object2, ..., objectn}, method1, method2, ..., methodm};

// Vorlage: https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87 - ACHTUNG: export const = { } verwenden!!!
// Siehe auch https://stackoverflow.com/questions/52840563/where-to-store-global-object-in-quasar-framework

// ACHTUNG: Beim Import innerhalb der den global Store konsumierenden Komponenten:
// Bevor export default:
// import { globalStore } from "../pages/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden

// Darunter in data():
// FALSCH:  localObject: globalStore.object, - damit wäre localObject nach Änderung von globalStore.object NICHT reaktiv!
// RICHTIG: localStore: globalStore, d.h. das ganze hier exportierte Modul globalStore mit state und Methoden importieren, das dadurch REAKTIV ist,
// d.h. Änderungen von Objekten in globalStore (per Aufruf von Mutator-Methoden) werden an Objekte in localStore propagiert, die diese dann sofort reaktiv
// anzeigen!

// Dies erlaubt sowohl den Zugriff auf (Unter-)Objekte von state als auch auf die Methoden von globalStore!!!
// Zugriffe auf lokale reaktive (Unter-)Objekte dann z.B. mittels: localStore.state.object (in Templates und Scripts)
// Zugriffe auf Mutator-Methoden dann z.B. mit: this.globalStore.method()
// Beispiel: this.globalStore.setBaustoffBeschreibungAusgewaehlterBaustoff(this.selectedNodeTreeBaustoffe.baustoffBeschreibung);
// Alternativ funktioniert sogar auch: locallStore.setBaustoffBeschreibungAusgewaehlterBaustoff(this.selectedNodeTreeBaustoffe.baustoffBeschreibung);

// Wäre localStore.state.object nicht reaktiv, müssten reaktive Updates von Objekten im global Store stets durch expliziten Code in den den global Store konsumierenden
// Komponenten veranlasst werden:
// a) entweder asynchron durch Events (in diesem Fall ohne Parameter, da das Objekt über den Methodennamen identifiziert wird), der per $on(eventHandler)
//    in der konsumierenden Komponente ggf. eine Event Handler Methode triggered, die
//    einen aktuellen Wert aus globalStore.state.object nach localStore.state.object propagiert (eventuell per $set, wenn es sich um ein nested
//    Objekt handelt). Damit sind auch reaktive Updates möglich, z.B. wenn ein Tab in Baustoffe ausgewählt wird
//    oder ein neuer Baustoff im Baustoffbaum ausgewählt wird. Getestet aus Datenaustausch.vue als produzierende/emittierende Komponente.
// b) oder synchron durch expliziten Methodenaufruf in der konsumierenden Komponente, z.B. wenn in MyLayout.vue der Button gedrückt wird, der den rechten
//    Drawer öffnet (@click="method(param)"), oder im mounted: Teil von MyLayout.
//    Damit sind allerdings reaktive Updates von anzuzeigenden Daten im rechten Drawer, während der Drawer bereits geladen ist, nicht möglich.

// ALT: import kontextHilfeMarkdown1 from "../markdown/KontextHilfe1.md"; // Test Kontexthilfe mit QMarkdown App Extension
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
// import { routerInstance } from "../boot/router"; // NEU: Für myRouterPush-Methode unten, diese wird aktuell allerdings nicht mehr verwendet, daher wieder disabled
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Enums zur Verwaltung der Benutzernachrichten (Banner Message im Footer)
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BenutzerNachrichtenTypen from "./benutzer-nachrichten-typen.js";
// ACHTUNG: Dabei NICHT require verwenden, sont undefined Fehler beim Zugriff:
// NICHT: const BenutzerNachrichten = require("./benutzer-nachrichten.js");
// NICHT: const BenutzerNachrichtenTypen = require("./benutzer-nachrichten-typen.js");
// Zugriff z.B. mit:
// BenutzerNachrichtenTypen.INFORMATION,
// Also NICHT: this.BenutzerNachrichtenTypen.INFORMATION,
// NEU: Zur Anzeige von Benutzernachrichten mit Quasar Notify Plugin statt als Banner Message im Footer:
import { Loading, QSpinnerGears, Notify } from "quasar";

export const globalStore = {
  // kontextHilfeMarkdown1: kontextHilfeMarkdown1, // TODO - nur für Test Kontexthilfe mit QMarkdown App Extension
  //----------------------------------------------------------------------------------------------------------------
  // Es folgen globalen Daten in state Objekt - diesen unbedingt initiale Testwerte zuweisen für Debugging!!!
  //----------------------------------------------------------------------------------------------------------------
  state: {
    globalTestObject: "Hallo, ich bin ein Teststring ;-)", // global Object für Tests (hier String)
    widthLeftDrawer: 300, // Neu, für variable Breite linker Drawer, wird per QSlider im Drawer in my-layout.vue verändert
    widthRightDrawer: 300, // Neu, für variable Breite recher Drawer, wird per QSlider im Drawer in my-layout.vue verändert
    verhaltenBeiVererbungskonfliktenBeiKopierenVerschiebenVonZweig:
      "ueberschreibeAnZielknoten", // Von Stefan für Testzwecke
    // TODO XXXXXX: Welche Werte kann denn diese Variable annehmen - Kommentar fehlt!!!
    // NEU: Ersetzt durch einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig unten
    //--------------------------------------------------------------------------------------------------------------
    // Steuerung der Anzeige interner Variablen im User Interface für Debugging (in allen vue-Komponenten verwendet)
    debugMode: false,
    mitarbeiterDuerfenBearbeitenTypbezogeneBaueigenschaften: false, // globales Setting, wird in baueinheiten.vue und
    // baueigenschaften.vue verwendet, um Benutzerberechtigungen für Mitarbeiter zu steuern und Aktionen zu disablen
    // (mittels :disable = !mitarbeiterDuerfenBearbeitenTypbezogeneBaueigenschaften)
    // Wenn false, dürfen Mitarbeiter keine typbezogenen Baueigenschaften erzeugen/ändern/löschen
    // (nur Administratoren und Redakteure)
    mitarbeiterDuerfenBearbeitenBaueigenschaftsprofile: false, // globales Setting, wird in baueigenschafts-profile.vue und
    // Kindkomponenten davon verwendet, um Benutzerberechtigungen für Mitarbeiter zu steuern und Aktionen zu disablen
    // (mittels :disable = !mitarbeiterDuerfenBearbeitenBaueigenschaftsprofile)
    // Wenn false, dürfen Mitarbeiter keine Baueigenschaftsprofile erzeugen/ändern/löschen
    // (nur Administratoren und Redakteure)
    mitarbeiterDuerfenBearbeitenBauinformationsprofile: false, // globales Setting, wird in bauinformations-profile.vue und
    // Kindkomponenten davon verwendet, um Benutzerberechtigungen für Mitarbeiter zu steuern und Aktionen zu disablen
    // (mittels :disable = !mitarbeiterDuerfenBearbeitenBauinformationsprofile)
    // Wenn false, dürfen Mitarbeiter keine Bauinformationsprofile erzeugen/ändern/löschen
    // (nur Administratoren und Redakteure)
    //--------------------------------------------------------------------------------------------------------------
    // NEU: Einstellungen für den Benutzer:
    // TODO XXXXXX: Muss bei Anmeldung aus der Datenbank geladen werden für den Benutzer!
    einstellungenBenutzer: {
      debugMode: false, // Reserviertes Feld, bisher wird noch obige Variable verwendet
      tablesPaginationRowsPerPage: 25, // Anzahl Rows per Page in den QTables
      farbSchema: "blau", // NEU - Einstellbares Farbschema
      treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig: false, // NEU: Für die Steuerung der Wertevererbung in den Bäumen
      // ACHTUNG: Um nach einem Browser Refresh diese Benutzerdaten weiterhin zu haben, werden sie initial in my-layout.vue und in einstellungen.vue nach einem Update per API
      //          zusätzlich im Browser local Storage gespeichert und nach einem Refresh von dort retrieved in my-layout.vue
      //          Dabei muss eine Boolean-Variable wie treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig besonders behandelt werden mit
      //          JSON.stringify beim Speichern und JSON.parse beim Retrieven in den/aus dem local Storage, da Browser local Storage nur Strings speichert!!!
      //          Siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
      vorgabeWerteUeberschreibenVorhandeneWerte: false, // NEU: Für #262
      selectedKeyTreeBaueinheiten: null, // NEU: Für #400
      selectedKeyTreeBaustoffe: null, // NEU: Für #400
    },
    //--------------------------------------------------------------------------------------------------------------
    // NEU: Daten für an- bzw. abgemeldeten Benutzer:
    anmeldeDatenBenutzer: {
      istAbgemeldetBenutzer: true,
      eMailBenutzer: "",
      idBenutzer: null, // NEU
      tokenBenutzer: null,
      benutzerRolle: "Mitarbeiter", // NEU
      treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig: false, // NEU
      vorgabeWerteUeberschreibenVorhandeneWerte: true, // NEU: Für #262
      selectedKeyTreeBaueinheiten: null, // NEU: Für #400
      selectedKeyTreeBaustoffe: null // NEU: Für #400
    },
    //--------------------------------------------------------------------------------------------------------------
    // Steuerung der Benutzernachrichten in Banner Message im Footer von MyLayout.vue:
    showBenutzerNachricht: false, // Steuert die Sichtbarkeit des Banners im Footer
    inhaltBenutzerNachricht: BenutzerNachrichten.DEFAULT_BENUTZERNACHRICHT,
    typBenutzerNachricht: BenutzerNachrichtenTypen.INFORMATION,
    classBenutzerNachricht: "bg-secondary text-white",
    //--------------------------------------------------------------------------------------------------------------
    // Steuerung der Bedienungshilfe im rechten Drawer von MyLayout.vue:
    // NEU - obsolet, da Steuerung des Öffnens der Expansion Items über show-Methoden per Event immplementiert ist
    /*
    isSelectedBaustoffe: false,
    isSelectedStrukturierungsAngabenBaustoffe: false,
    isSelectedBaueigenschaftenBaustoffe: false,
    isSelectedUebersichtBaueigenschaftenBaustoffe: false,
    isSelectedAuswahlBaueigenschaftenBaustoffe: false,
    isSelectedNeuBaueigenschaftenBaustoffe: false,
    isSelectedZugeordneteBauinformationenBaustoffe: false,
    isSelectedAbhaengigeBaustoffeBaustoffe: false,
    */
    //--------------------------------------------------------------------------------------------------------------
    // Steuerung der fachlichen Hilfe im rechten Drawer von MyLayout.vue:
    // NEU: Felder für testweise fachliche Hilfe für Profilformulare:
    baueigenschaftsProfilBezeichnung:
      "Default-Bezeichnung ausgewähltes Profilformular",
    baueigenschaftsProfilBeschreibung:
      "Default-Beschreibung ausgewähltes Profilformular", // Markdown - wird noch nicht gesetzt
    baueigenschaftsProfilTabUeberschrift:
      "Default-Überschrift des ausgewähltes Unter-Tab des Profilformulars",
    baueigenschaftsProfilTabBeschreibung:
      "Default-Beschreibung des ausgewählten Unter-Tabs des Profilformulars", // Markdown
    //-----------------------------------------------------------------------------------------
    baustoffBeschreibungAusgewaehlterBaustoff:
      "Default-Beschreibung ausgewählter Baustoff", // global, shared Objekt (hier String)
    baueinheitsBeschreibungAusgewaehlteBaueinheit:
      "Default-Beschreibung ausgewählte Baueinheit", // global, shared Objekt (hier String)
    baustoffBezeichnungAusgewaehlterBaustoff:
      "Default-Bezeichnung ausgewählter Baustoff", // global, shared Objekt (hier String)
    baueinheitsBezeichnungAusgewaehlteBaueinheit:
      "Default-Bezeichnung ausgewählte Baueinheit", // global, shared Objekt (hier String)
    baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff:
      "Default-Bezeichnung ausgewählte Baueigenschaft in Baustoff", // global, shared Objekt (hier String)
    baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit:
      "Default-Bezeichnung ausgewählte Baueigenschaft in Baueiheit", // global, shared Objekt (hier String)
    baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff:
      "Default-Beschreibung ausgewählte Baueigenschaft in Baustoff", // global, shared Objekt (hier String)
    baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit:
      "Default-Beschreibung ausgewählte Baueigenschaft in Baueiheit", // global, shared Objekt (hier String)
    // NEU - für #353
    anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff:
      "Default-Anzeigetext für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baustoff", // global, shared Objekt (hier String)
    // NEU - für #353
    anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit:
      "Default-Anzeigetext für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baueinheit", // global, shared Objekt (hier String)
    // NEU - für #353
    internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff:
      "Interner Default-Link für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baustoff", // global, shared Objekt (hier String)
    // NEU - für #353
    internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit:
      "Externer Default-Link für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baueinheit", // global, shared Objekt (hier String)
    // NEU - für #353
    externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff:
      "Externer Default-Link für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baustoff", // global, shared Objekt (hier String)
    // NEU - für #353
    externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit:
      "Externer Default-Link für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baueinheit", // global, shared Objekt (hier String)
    // NEU - für #353
    oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff:
      "OneDrive-Default-Link für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baustoff", // global, shared Objekt (hier String)
    // NEU - für #353
    oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit:
      "oneDrive-Default-Link für zugeordnete Bauinformation an ausgewählter Baueigenschaft in Baueinheit", // global, shared Objekt (hier String)
    //---------------------------------------------------------------------------------------------------------------------------
    selectionInBodenaufbau: null // #358: Wird in baueinheiten.vue für ausgewählte Schicht im Bodenaufbau als Prop weitergegeben
    // an Komponente baueinheitBodenaufbauBaueigenschaftsProfilFormular, dort sitzt ein watch() darauf!
  }, // /state

  //-------------------------------------------------------------------------------------------------------------------
  // Methoden:
  // Es folgen Mutator-Methoden für die globalen Daten - dort unbedingt alle Werteänderungen in Konsole loggen nach
  // folgendem Muster:
  //   console.log(
  //    "In Mutator methodXYZ() - state.objectABC nach Update: ",
  //    this.state.objectABC
  //   );
  // Begründung in https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch:
  // Andernfalls ist Debugging ein Nightmare, zentrales Logging von Changes in diesen Mutators

  // Zuweisungen an obige (Unter-)Objekte von State im Store in diesen Mutator-Methoden mittels this.state.object,
  // dabei wohl kein $set nötig.
  // ACHTUNG: Wegen Vue Reactivity Restriktionen Push für Arrays verwenden!
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // NEU: Mutator-Methode für Tables Pagination (Rows per Page)
  changeRowsPerPage(tablesPaginationRowsPerPage) {
    this.state.einstellungenBenutzer.tablesPaginationRowsPerPage = tablesPaginationRowsPerPage;
    console.log(
      "In Mutator changeRowsPerPage()- state.einstellungenBenutzer.tablesPaginationRowsPerPage nach Update: ",
      this.state.einstellungenBenutzer.tablesPaginationRowsPerPage
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // NEU: Mutator-Methode für selectedKeyTreeBaueinheiten, für #400
  changeSelectedKeyTreeBaueinheiten(selectedKeyTreeBaueinheiten) {
    this.state.einstellungenBenutzer.selectedKeyTreeBaueinheiten = selectedKeyTreeBaueinheiten;
    console.log(
      "In Mutator changeSelectedKeyTreeBaueinheiten()- state.einstellungenBenutzer.selectedKeyTreeBaueinheiten nach Update: ",
      this.state.einstellungenBenutzer.selectedKeyTreeBaueinheiten
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // NEU: Mutator-Methode für selectedKeyTreeBaustoffe, für #400
  changeSelectedKeyTreeBaustoffe(selectedKeyTreeBaustoffe) {
    this.state.einstellungenBenutzer.selectedKeyTreeBaustoffe = selectedKeyTreeBaustoffe;
    console.log(
      "In Mutator changeSelectedKeyTreeBaustoffe()- state.einstellungenBenutzer.selectedKeyTreeBaustoffe nach Update: ",
      this.state.einstellungenBenutzer.selectedKeyTreeBaustoffe
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // NEU: Mutator-Methode für Farbschema
  changeFarbSchema(farbSchema) {
    this.state.einstellungenBenutzer.farbSchema = farbSchema;
    console.log(
      "In Mutator changeFarbSchema()- state.einstellungenBenutzer.farbSchema nach Update: ",
      this.state.einstellungenBenutzer.farbSchema
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // NEU: Mutator-Methode für Einstelllung für Werteverbung in Bäumen
  changeVorhandeneWerteUeberschreiben(
    treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
  ) {
    this.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig = treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig;
    console.log(
      "In Mutator changeVorhandeneWerteUeberschreiben()- state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig nach Update: ",
      this.state.einstellungenBenutzer
        .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // NEU: Mutator-Methode für Modus für Einstellung für Vorgabewerte in Bäumen (#262)
  changeVorgabeWerteUeberschreiben(vorgabeWerteUeberschreibenVorhandeneWerte) {
    this.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte = vorgabeWerteUeberschreibenVorhandeneWerte;
    console.log(
      "In Mutator changeVorhandeneWerteUeberschreiben()- state.einstellungenBenutzer. vorgabeWerteUeberschreibenVorhandeneWerte nach Update: ",
      this.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // NEU: Mutator-Methoden für Anmeldung/Abmeldung von Benutzern
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // Mutator-Methode um das Login eines Benutzers zu recorden
  // Wird aufgerufen in my-layout.vue bei Anmeldung und in created
  anmeldungBenutzer(
    eMail,
    token,
    id,
    benutzerRolle,
    tablesPaginationRowsPerPage,
    farbSchema, // NEU
    treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig,
    vorgabeWerteUeberschreibenVorhandeneWerte, // NEU: Für #262
    selectedKeyTreeBaueinheiten, // NEU: Für #400
    selectedKeyTreeBaustoffe, // NEU: Für #400
  ) {
    console.log("In Mutator anmeldungBenutzer()");
    this.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer = false;
    this.state.anmeldeDatenBenutzer.eMailBenutzer = eMail;
    this.state.anmeldeDatenBenutzer.tokenBenutzer = token;
    this.state.anmeldeDatenBenutzer.idBenutzer = id; // NEU: (Mongoose) id des Benutzers merken für spätere Updates in BenutzerCollection
    this.state.anmeldeDatenBenutzer.benutzerRolle = benutzerRolle; // NEU: Für Benutzerberechtigungen
    this.state.einstellungenBenutzer.tablesPaginationRowsPerPage = tablesPaginationRowsPerPage; // NEU
    this.state.einstellungenBenutzer.farbSchema = farbSchema; // NEU
    this.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig = treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig; // NEU
    this.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte = vorgabeWerteUeberschreibenVorhandeneWerte; // NEU: Für #262
    this.state.einstellungenBenutzer.selectedKeyTreeBaueinheiten = selectedKeyTreeBaueinheiten; // NEU: Für #400
    this.state.einstellungenBenutzer.selectedKeyTreeBaustoffe = selectedKeyTreeBaustoffe; // NEU: Für #400
    // console.log("state.anmeldeDatenBenutzer.idBenutzer: ", this.state.anmeldeDatenBenutzer.idBenutzer) // OK
    // console.log("state.einstellungenBenutzer.tablesPaginationRowsPerPage: ", this.state.einstellungenBenutzer.tablesPaginationRowsPerPage); // OK
    // Disabled aus Security-Gründen:
    /*
    console.log(
      "In Mutator anmeldungBenutzer - state.anmeldeDatenBenutzer nach Update: ",
      this.state.anmeldeDatenBenutzer
    );
    */
  },

  //----------------------------------------------------------------------------------------------------------------
  // Mutator-Methode um das Logout eines Benutzers zu recorden
  abmeldungBenutzer() {
    console.log("In Mutator abmeldungBenutzer()");
    this.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer = true;
    this.state.anmeldeDatenBenutzer.eMailBenutzer = "";
    this.state.anmeldeDatenBenutzer.tokenBenutzer = null;
    this.state.anmeldeDatenBenutzer.idBenutzer = null; // NEU: (Mongoose) id des Benutzers
    this.state.anmeldeDatenBenutzer.benutzerRolle = null; // NEU: Für Benutzerberechtigungen
    this.state.einstellungenBenutzer.tablesPaginationRowsPerPage = null; // NEU
    this.state.einstellungenBenutzer.farbSchema = null; // NEU
    this.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig = null; // NEU
    this.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte = null; // NEU: Für #262
    this.state.einstellungenBenutzer.selectedKeyTreeBaueinheiten = null; // NEU: Für #400
    this.state.einstellungenBenutzer.selectedKeyTreeBaustoffe = null; // NEU: Für #400
    // Disabled aus Security-Gründen:
    /*
    console.log(
      "In Mutator abmeldungBenutzer() - state.anmeldeDatenBenutzer nach Update: ",
      this.state.anmeldeDatenBenutzer
    );
    */
  },

  //----------------------------------------------------------------------------------------------------------------
  // Mutator Test-Methode für globalTestObject:
  changeGlobalTestObject() {
    this.state.globalTestObject = "Ich wurde geändert";
    console.log(
      "In Mutator changeGlobalTestObject() - state.globalTestObject nach Update: ",
      this.state.globalTestObject
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // Mutator-Methode für Debug Mode:
  toggleDebugMode() {
    /*
    console.log(
      "In Mutator toggleDebugMode - state.debugMode vor Togglen: ",
      this.state.debugMode
    );
    */
    this.state.debugMode = !this.state.debugMode;
    console.log(
      "In Mutator toggleDebugMode() - state.debugMode nach Togglen: ",
      this.state.debugMode
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // Mutator-Methoden zur Steuerung der Bedienungshilfe im rechten Drawer:
  // ACHTUNG: Selbst bei Steuerung der q-expansion-items für die 3 Tabs über eine gemeinsame Akkordeon-Gruppe müssen,
  // wenn der :value-Wert für eines der drei Tabs auf true gesetzt wird,
  // die :value-Werte für die andern Tabs auf false gesetzt werden, um nur eines der drei zu öffnen!!!
  // D.h. eine Steuerung dieses Verhaltens, dass immer nur eines der drei geöffnet werden soll, funktioniert NICHT
  // ausschließlich über die Akkordeon-Gruppe, sondern über das koordinierte Setzen der :value Props an den
  // q-expansion-items der Gruppe für die drei Tabs.
  // Die Akkordeon-Gruppe steuert nur, dass beim manuellen Öffnen die anderen q-expansion-items geschlossen werden,
  // macht dabei aber KEINEN Update auf die zugehörigen Variablen in :value! Diese fungieren unabhängig von
  // der Akkordeon-Gruppe für den programmatischen Update per v-bind von :value. Dieses Verhalten kann durch Anzeigen
  // der :value Props im q-epansion-item, z.B. {{ localStore.state.isSelectedUebersichtBaueigenschaftenBaustoffe }},
  // im rechten Drawer belegt werden.
  // Deshalb müssen wohl sowohl die value: Werte für die Geschwister als auch die Eltern im Menüpfad richtig gesetzt werden:
  // ACHTUNG: Die Werte für die Geschwister müssen schon deshalb auf false gesetzt werden, weil sie bisher bei sequentiellem
  // Anwählen von Tabs (z.B. in Baustoffe zunächst Auswahl, dann Neu) NICHT zurückgesetzt werden!!!
  // Allerdings funktionierte selbst mit komplettem Setzen aller dieser Boolean-Werte die Steuerung des Öffnens
  // der verschachtelten Expansion Items per :value nicht wie gewünscht, sobald manuell vom Benutzer andere Items als die
  // auf der Ebene der betroffenen Items ausgewählt wurden, funktionierte das Öffnen per :value nicht mehr.
  // Deshalb die Steuerung des Öffnens der Expansion Items umgestellt auf show-Methode am Expansion Item, die per
  // Event aufgerufen wird.

  // Daher sind folgende Mutator-Methoden nun obsolet, da die Steuerung des Öffnens der Expansion Items über show-Methoden
  // per Event immplementiert ist:
  /*

  setIsSelectedUebersichtBaueigenschaftenBaustoffe() {
    this.state.isSelectedBauvorhaben = false;
    this.state.isSelectedBaustoffe = true;
    this.state.isSelectedBaueigenschaftenBaustoffe = true;
    this.state.isSelectedUebersichtBaueigenschaftenBaustoffe = true;
    this.state.isSelectedAuswahlBaueigenschaftenBaustoffe = false;
    this.state.isSelectedNeuBaueigenschaftenBaustoffe = false;
    this.state.isSelectedBauinformationen = false;
    this.state.isSelectedValidierungOptimierung = false;
    this.state.isSelectedDatenaustausch = false;
    this.state.isSelectedEinstellungen = false;
    this.state.isSelectedDokumentation = false;
    console.log(
      "In Mutator setIsSelectedUebersichtBaueigenschaftenBaustoffe - state.isSelectedUebersichtBaueigenschaftenBaustoffe nach Update: ",
      this.state.isSelectedUebersichtBaueigenschaftenBaustoffe
    );
  },

  setIsSelectedAuswahlBaueigenschaftenBaustoffe() {
    this.state.isSelectedBauvorhaben = false;
    this.state.isSelectedBaustoffe = true;
    this.state.isSelectedBaueigenschaftenBaustoffe = true;
    this.state.isSelectedUebersichtBaueigenschaftenBaustoffe = false;
    this.state.isSelectedAuswahlBaueigenschaftenBaustoffe = true;
    this.state.isSelectedNeuBaueigenschaftenBaustoffe = false;
    this.state.isSelectedBauinformationen = false;
    this.state.isSelectedValidierungOptimierung = false;
    this.state.isSelectedDatenaustausch = false;
    this.state.isSelectedEinstellungen = false;
    this.state.isSelectedDokumentation = false;
    console.log(
      "In Mutator setIsSelectedAuswahlBaueigenschaftenBaustoffe - state.isSelectedAuswahlBaueigenschaftenBaustoffe nach Update: ",
      this.state.isSelectedAuswahlBaueigenschaftenBaustoffe
    );
  },

  setIsSelectedNeuBaueigenschaftenBaustoffe() {
    this.state.isSelectedBauvorhaben = false;
    this.state.isSelectedBaustoffe = true;
    this.state.isSelectedBaueigenschaftenBaustoffe = true;
    this.state.isSelectedUebersichtBaueigenschaftenBaustoffe = false;
    this.state.isSelectedAuswahlBaueigenschaftenBaustoffe = false;
    this.state.isSelectedNeuBaueigenschaftenBaustoffe = true;
    this.state.isSelectedBauinformationen = false;
    this.state.isSelectedValidierungOptimierung = false;
    this.state.isSelectedDatenaustausch = false;
    this.state.isSelectedEinstellungen = false;
    this.state.isSelectedDokumentation = false;
    console.log(
      "In Mutator setIsSelectedNeuBaueigenschaftenBaustoffe - state.isSelectedNeuBaueigenschaftenBaustoffe nach Update: ",
      this.state.isSelectedNeuBaueigenschaftenBaustoffe
    );
  },
  */

  //----------------------------------------------------------------------------------------------------------------
  // Mutator-Methoden zur Steuerung der fachlichen Hilfe im rechten Drawer von MyLayout.vue:

  // NEU: Zusätzliche Methoden für fachliche Hilfe für Profilformulare (bisher nur testweise für "Baueinheit > Raum"):

  setBaueigenschaftsProfilBezeichnung(newValue) {
    console.log("In Mutator setBaueigenschaftsProfilBezeichnung()");
    this.state.baueigenschaftsProfilBezeichnung = newValue;
    /*
    console.log(
      "In Mutator setBaueigenschaftsProfilBezeichnungTab() - state.baueigenschaftsProfilBezeichnungTab: ",
      this.state.baueigenschaftsProfilBezeichnungTab
    );
    */
  },

  setBaueigenschaftsProfilTabUeberschrift(newValue) {
    console.log("In Mutator setBaueigenschaftsProfilTabUeberschrift)");
    this.state.baueigenschaftsProfilTabUeberschrift = newValue;
    /*
    console.log(
      "In Mutator setBaueigenschaftsProfilTabUeberschrift() - state.baueigenschaftsProfilTabUeberschrift: ",
      this.state.baueigenschaftsProfilTabUeberschrift
    );
    */
  },

  setBaueigenschaftsProfilTabBeschreibung(newValue) {
    console.log("In Mutator setBaueigenschaftsProfilTabBeschreibung())");
    this.state.baueigenschaftsProfilTabBeschreibung = newValue;
    /*
    console.log(
      "In Mutator setBaueigenschaftsProfilBeschreibungTab() - state.baueigenschaftsProfilBeschreibungTab: ",
      this.state.baueigenschaftsProfilBeschreibungTab
    );
    */
  },

  setBaustoffBeschreibungAusgewaehlterBaustoff(newValue) {
    console.log("In Mutator setBaustoffBeschreibungAusgewaehlterBaustoff()");
    this.state.baustoffBeschreibungAusgewaehlterBaustoff = newValue;
    /*
    console.log(
      "In Mutator setBaustoffBeschreibungAusgewaehlterBaustoff - state.baustoffBeschreibungAusgewaehlterBaustoff: ",
      this.state.baustoffBeschreibungAusgewaehlterBaustoff
    );
    */
  },

  setBaueinheitsBeschreibungAusgewaehlteBaueinheit(newValue) {
    console.log(
      "In Mutator setBaueinheitsBeschreibungAusgewaehlteBaueinheit()"
    );
    this.state.baueinheitsBeschreibungAusgewaehlteBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setBaueinheitsBeschreibungAusgewaehlteBaueinheit- state.baueinheitsBeschreibungAusgewaehlteBaueinheit: ",
      this.state.baueiheitsBeschreibungAusgewaehlterBaueinheit
    );
    */
  },

  setBaustoffBezeichnungAusgewaehlterBaustoff(newValue) {
    console.log("In Mutator setBaustoffBezeichnnungAusgewaehlterBaustoff() ");
    this.state.baustoffBezeichnungAusgewaehlterBaustoff = newValue;
    /*
    console.log(
      "In Mutator setBaustoffBezeichnungAusgewaehlterBaustoff - state.baustoffBezeichnungAusgewaehlterBaustoff: ",
      this.state.baustoffBezeichnungAusgewaehlterBaustoff
    );
    */
  },

  setBaueinheitsBezeichnungAusgewaehlteBaueinheit(newValue) {
    console.log(
      "In Mutator setBaueinheitsBezeichnnungAusgewaehlteBaueinheit()"
    );
    this.state.baueinheitsBezeichnungAusgewaehlteBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setBaueinheitsBezeichnungAusgewaehlteBaueinheit - state.baueinheitsBezeichnungAusgewaehlteBaueinheit: ",
      this.state.baueinheitsBezeichnungAusgewaehlteBaueinheit
    );
    */
  },

  setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff(newValue) {
    console.log(
      "In Mutator setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff()"
    );
    this.state.baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff = newValue;
    /*
    console.log(
      "In Mutator setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff- state.baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff: ",
      this.state.baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff
    );
    */
  },

  setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit(newValue) {
    console.log(
      "In Mutator setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit()"
    );
    this.state.baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit- state.baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit: ",
      this.state.baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit
    );
    */
  },

  setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff(newValue) {
    console.log(
      "In Mutator setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff()"
    );
    this.state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff = newValue;
    /*
    console.log(
      "In Mutator setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff - state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff: ",
      this.state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff
    );
    */
  },

  setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit(newValue) {
    console.log(
      "In Mutator setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit()"
    );
    this.state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit - state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit: ",
      this.state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit
    );
    */
  },

  setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff()"
    );
    this.state.anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff = newValue;
    /*
    console.log(
      "In Mutator setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff - state.anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff: ",
      this.state.anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
    );
    */
  },

  setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit()"
    );
    this.state.anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit - state.anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit: ",
      this.state.anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
    );
    */
  },

  setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff()"
    );
    this.state.internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff = newValue;
    /*
    console.log(
      "In Mutator setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff - state.internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff: ",
      this.state.internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
    );
    */
  },

  setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff()"
    );
    this.state.idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff = newValue;
    /*
    console.log(
      "In Mutator setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff - state.idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff: ",
      this.state.idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
    );
    */
  },

  setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit()"
    );
    this.state.internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit = newValue;
    /*
      console.log(
        "In Mutator setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit - state.internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit: ",
        this.state.internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
      );
      */
  },

  setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit()"
    );
    this.state.idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit - state.idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit: ",
      this.state.idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
    );
    */
  },

  setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff()"
    );
    this.state.externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff = newValue;
    /*
    console.log(
      "In Mutator setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff - state.externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff: ",
      this.state.externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
    );
    */
  },

  setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff()"
    );
    this.state.oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff = newValue;
    /*
    console.log(
      "In Mutator setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff - state.oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff: ",
      this.state.oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
    );
    */
  },

  setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit()"
    );
    this.state.externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit - state.externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit: ",
      this.state.externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
    );
    */
  },

  setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
    newValue
  ) {
    // NEU - für #379
    console.log(
      "In Mutator setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit()"
    );
    this.state.oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit = newValue;
    /*
    console.log(
      "In Mutator setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit - state.oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit: ",
      this.state.oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
    );
    */
  },

  //----------------------------------------------------------------------------------------------------------------
  // hideBenutzerNachricht Mutator-Methode zur Steuerung der Banner Message im Footer von MyLayout.vue:
  // NEU: Banner Message durch Message mit Quasar Notify Plugin ersetzt - u.a. verschwindet diese wieder von selbst nach 5 Sekunden!
  // NEU: Notify Timeout in /src/boot/notify-default.js eingestellt, aktuell 20 Sekunden
  // Daher ist in diesem Fall die Methode hideBenutzerNachricht() eigentlich obsolet!!!
  hideBenutzerNachricht() {
    console.log("In Mutator hideBenutzerNachricht()");
    this.state.showBenutzerNachricht = false;
    console.log(
      "globalStore.state.showBenutzerNachricht nach Update: ",
      this.state.showBenutzerNachricht
    );
  },

  //----------------------------------------------------------------------------------------------------------------
  // NEU: showBenutzerAktion Mutator-Methode zur Steuerung einer Message mit Refresh-Aktion
  // Die Message wird mit Quasar Notify Plugin (mit Action Button für Refresh/Ignorieren) angezeigt
  // Notify Timeout in /src/boot/notify-default.js eingestellt, aktuell 20 Sekunden
  // Parameter: benutzerNachricht: BenutzerNachrichten (dort vordefinierte Strings)
  // NEU: 2. optionaler Parameter ignorierenNichtErlauben
  showBenutzerAktion(benutzerNachricht, ignorierenNichtErlauben) {
    console.log(
      "In Mutator showBenutzerAktion() - Parameter benutzerNachricht: ",
      benutzerNachricht
    );
    this.state.inhaltBenutzerNachricht = benutzerNachricht; // Inhalt der Benutzernachricht reaktiv updaten im Banner im Footer von MyLayout.vue
    this.state.typBenutzerNachricht = BenutzerNachrichtenTypen.AKTION;
    this.state.classBenutzerNachricht = "accent";
    // Anzeige Benutzernachricht mit Notify Quasar Plugin - diese verschwindet von selbst nach 5 Sekunden
    // (ist konfigurierbar per timeout Prop, siehe https://quasar.dev/quasar-plugins/notify#Notify-API)
    // console.log("Vor Notify.create");
    // https://quasar.dev/quasar-plugins/notify#With-actions - Mit Buttons für Actions
    Notify.create({
      message: this.state.inhaltBenutzerNachricht,
      color: this.state.classBenutzerNachricht,
      icon: "refresh",
      actions: [
        {
          label: "Neu laden",
          style: "text-transform:none;",
          color: "yellow",
          handler: () => {
            window.location.reload(true); // Siehe https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript#:
            // Variante: Reload mit Vue Router - diese Variante allerdings disabled zugunsten Browser Reload Page
            // this.myRouterPush() // Variante, benötigt Vue Router für das Reloading, allerdings kann auf diesen nur mit speziellem zusätzlichen Boot File zugegriffen werden:
            // Links zum Thema, wie auf Vue Router zugegriffen werden kann in JS-Modules:
            // Lösung: https://forum.quasar-framework.org/topic/3960/access-router-outside-vue/9
            // Per neuem Quasar Boot File router.js in /boot (siehe Kommentare dort)
            // Dieses Boot File wird oben importiert: import { routerInstance } from 'boot/router'
            // Zugriff damit auf Vue Router Funktionen:
            // - Wenn im handler eine Arrow Function benutzt wird: handler: () => { routerInstance.push({ path: '/' }) } // Ohne this. davor!!!
            // - Wenn im handler ein Funktionsaufruf, z.B. handler: () = { this.myRouterPush() } erfolgt: Dann funktioniert laut obigem Thread
            //   angeblich auch this.$router.push({ path: "/" }) in der aufgerufenen Funktion - stimmt aber nicht, es kommt Fehler  "TypeError: Cannot read property 'push' of undefined"
            // Siehe auch https://stackoverflow.com/questions/43557941/access-vuerouter-outside-vue-components/43562210#43562210
            // Siehe auch https://stackoverflow.com/questions/40736799/how-to-navigate-using-vue-router-from-vuex-actions
            // Siehe auch https://forum.quasar-framework.org/topic/2704/solved-using-router-from-vuex-action/2
          }
        },
        // noDismiss ? null : close() // Funktioniert nicht!
        // ACHTUNG: Hier auch kein Closing Button mit "X" wie in den anderen Notify.create()-Aufrufen!
        !ignorierenNichtErlauben
          ? {
              label: "Ignorieren",
              style: "text-transform:none;",
              color: "white",
              handler: () => {
                console.log("Neu laden wurde ignoriert");
              }
            }
          : {} // In diesem Fall entfällt der Button "Ignorieren"
      ]
    });
  },

  /*
  // Disabled zugunsten von obigem Browser Reload mittels window.location.reload()
  myRouterPush() {
    // Führt einen Reload der App durch
    // Zugriff auf Vue Router Funktionen:
    // - Wenn im handler eine Arrow Function benutzt wird: handler: () => { routerInstance.push({ path: '/' }) } // Ohne this. !!!
    // - Wenn im handler ein Funktionsaufruf, z.B. handler: () = { this.myRouterPush() } erfolgt: Dann funktioniert laut obigem Thread
    //   angeblich auch this.$router.push({ path: "/" }) in der aufgerufenen Funktion - stimmt aber nicht, es kommt Fehler  "TypeError: Cannot read property 'push' of undefined"
    routerInstance.push({ path: "/" }); // Ohne this. davor!!! Dies funktioniert, allerdings lädt es vermutlich wegen keep-alive nicht wirklich alles neu
    // Daher wieder disabled und stattdessen Browser Reload Page oben direkt eingefügt:
    // Per window.location.reload(true); // Siehe https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript#:
    // Siehe auch https://stackoverflow.com/questions/41301099/do-we-have-router-reload-in-vue-router - schlägt .go() vor
    // Siehe auch https://michaelnthiessen.com/force-re-render/
  },
  */

  //----------------------------------------------------------------------------------------------------------------
  // showBenutzerNachricht Mutator-Methode zur Steuerung der Banner Message im Footer im Footer von MyLayout.vue:
  // NEU: Banner Message durch Message mit Quasar Notify Plugin ersetzt - u.a. verschwindet diese wieder von selbst nach 5 Sekunden!
  // NEU: Notify Timeout in /src/boot/hotify-default.js eingestellt, aktuell 20 Sekunden
  // Parameter: benutzerNachricht: BenutzerNachrichten (dort vordefinierte Strings)
  showBenutzerNachricht(benutzerNachricht) {
    console.log(
      "In Mutator showBenutzerNachricht() - Parameter benutzerNachricht: ",
      benutzerNachricht
    );
    console.log(
      "Neue Werte für globalStore.state.inhalt/typ/class/showBenutzerNachricht werden gesetzt"
    );

    // HINWEIS: Es ginge wohl auch einfacher mit den in BenutzerNachrichten.js vordefinierten Strings für jede benutzerNachricht:
    // this.state.inhaltBenutzerNachricht = benutzerNachricht;
    // statt hier im switch inhaltBenutzerNachricht jeweils auf den in BenutzerNachrichten.js schon definierten String zu setzen!
    // ALSO:
    this.state.inhaltBenutzerNachricht = benutzerNachricht; // Inhalt der Benutzernachricht reaktiv updaten im Banner im Footer von MyLayout.vue

    // Switch, um den Typ und die CSS-Klase der Benutzernachricht zu ermitteln aus dem Inhalt:
    switch (benutzerNachricht) {
      // Erfolgsmeldungen:
      case BenutzerNachrichten.BITTE_ANMELDEN:
      case BenutzerNachrichten.DEFAULT_ERFOLGSNACHRICHT:
      case BenutzerNachrichten.AUTHORISIERUNG_REGISTRIERUNG_ERFOLG:
      case BenutzerNachrichten.AUTHORISIERUNG_VERIFIKATION_ERFOLG:
      case BenutzerNachrichten.AUTHORISIERUNG_ANMELDUNG_ERFOLG:
      case BenutzerNachrichten.AUTHORISIERUNG_ABMELDUNG_ERFOLG:
      case BenutzerNachrichten.AUTHORISIERUNG_ABMELDUNG_ERFOLG_NACH_ABLAUF:
      case BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_RESET_ANFORDERUNG_ERFOLG:
      case BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_RESET_ERFOLG:
      case BenutzerNachrichten.BENUTZER_NEUANLAGE_ERFOLG:
      case BenutzerNachrichten.BENUTZER_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_NEUANLAGE_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_LOESCHEN_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_BESCHREIBUNG_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTEN_EXPORT_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_BEZEICHNUNG_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_BAUINFORMATIONEN_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_ROHSTOFFE_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_ZWEIG_KOPIEREN_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_ZWEIG_VERSCHIEBEN_ERFOLG:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG:
      case BenutzerNachrichten.BAUSTOFFE_IMPORT_ERFOLG:
      case BenutzerNachrichten.BAUSTOFFE_FILTERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_NEUANLAGE_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_LOESCHEN_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTEN_EXPORT_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BESCHREIBUNG_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BEZEICHNUNG_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BAUINFORMATIONEN_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BAUSTOFFE_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_KOPIEREN_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_VERSCHIEBEN_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BAUVORHABEN_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFILFORMULARE_EXPORT_ERFOLG:
      case BenutzerNachrichten.BAUEINHEIT_BAUTEILKATALOG_EXPORT_ERFOLG:
      case BenutzerNachrichten.BAUEINHEITEN_IMPORT_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFT_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFT_LOESCHEN_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFT_BESCHREIBUNG_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATION_NEUANLAGE_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATION_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATION_LOESCHEN_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONEN_IMPORT_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONEN_EXPORT_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_BESCHREIBUNG_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_LOESCHEN_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_BESCHREIBUNG_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_NEUANLAGE_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_VORGABEWERTE_AENDERUNG_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_ELTERNPROFILE_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LAYOUT_EXPORT_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
        this.state.typBenutzerNachricht =
          BenutzerNachrichtenTypen.ERFOLGSMELDUNG;
        this.state.classBenutzerNachricht = "positive";
        break;
      //-----------------------------------------------------------------------------------------------------------
      // Fehler:
      case BenutzerNachrichten.DEFAULT_FEHLERNACHRICHT:
      case BenutzerNachrichten.DATEI_NICHT_OEFFENBAR:
      case BenutzerNachrichten.AUTHORISIERUNG_REGISTRIERUNG_FEHLER:
      case BenutzerNachrichten.AUTHORISIERUNG_REGISTRIERUNG_FEHLER_BENUTZERKENNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.AUTHORISIERUNG_VERIFIKATION_FEHLER:
      case BenutzerNachrichten.AUTHORISIERUNG_ANMELDUNG_FEHLER:
      case BenutzerNachrichten.AUTHORISIERUNG_ABMELDUNG_FEHLER:
      case BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_AENDERUNG_FEHLER:
      case BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_AENDERUNG_INKORREKT:
      case BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_RESET_ANFORDERUNG_FEHLER:
      case BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_RESET_FEHLER:
      case BenutzerNachrichten.AUTHORISIERUNG_BERECHTIGUNG_FEHLER:
      case BenutzerNachrichten.BENUTZER_NEUANLAGE_FEHLER: // Wird eventuell nicht gebraucht, da identisch mit AUTHORISIERUNG_REGISTRIERUNG_FEHLER
      case BenutzerNachrichten.BENUTZER_NEUANLAGE_FEHLER_BENUTZERKENNUNG_EXISTIERT_BEREITS: // Wird eventuell nicht gebraucht, da identisch mit AUTHORISIERUNG_REGISTRIERUNG_FEHLER_BENUTZERKENNUNG_EXISTIERT_BEREITS
      case BenutzerNachrichten.BENUTZER_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BENUTZER_LESEN_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_LESEN_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_NEUANLAGE_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUSTOFF_LOESCHEN_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_LOESCHEN_FEHLER_WURZELKNOTEN_NICHT_GEFUNDEN:
      case BenutzerNachrichten.BAUSTOFF_BESCHREIBUNG_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTEN_EXPORT_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_BEZEICHNUNG_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_BEZEICHNUNG_AENDERUNG_FEHLER_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUSTOFF_BAUINFORMATIONEN_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_ROHSTOFFE_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_ZWEIG_KOPIEREN_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_ZWEIG_VERSCHIEBEN_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_ZWEIG_KOPIEREN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUSTOFF_ZWEIG_VERSCHIEBEN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_FEHLER:
      case BenutzerNachrichten.BAUSTOFFE_IMPORT_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_LESEN_FEHLER:
      case BenutzerNachrichten.BAUSTOFFE_FILTERUNG_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_NEUANLAGE_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUEINHEIT_LOESCHEN_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_LOESCHEN_FEHLER_WURZELKNOTEN_NICHT_GEFUNDEN:
      case BenutzerNachrichten.BAUEINHEIT_BESCHREIBUNG_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTEN_EXPORT_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_BEZEICHNUNG_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_BEZEICHNUNG_AENDERUNG_FEHLER_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUEINHEIT_BAUINFORMATIONEN_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_BAUSTOFFE_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_KOPIEREN_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_VERSCHIEBEN_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_KOPIEREN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_VERSCHIEBEN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUEINHEIT_BAUVORHABEN_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFILFORMULARE_EXPORT_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_BAUTEILKATALOG_EXPORT_FEHLER:
      case BenutzerNachrichten.BAUEINHEIT_WERTE_AUS_BAUSTOFF_UEBERTRAGEN_FEHLER:
      case BenutzerNachrichten.BAUEINHEITEN_IMPORT_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFT_LESEN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFT_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFT_AENDERUNG_ABLEHNUNG:
      case BenutzerNachrichten.BAUEIGENSCHAFT_LOESCHEN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUEIGENSCHAFT_BESCHREIBUNG_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTEN_LESEN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER:
      case BenutzerNachrichten.BAUINFORMATION_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
      case BenutzerNachrichten.BAUINFORMATION_LOESCHEN_FEHLER:
      case BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BEZEICHNUNG_ERFORDERLICH:
      case BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN:
      case BenutzerNachrichten.BAUINFORMATIONEN_EXPORT_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONEN_IMPORT_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_BESCHREIBUNG_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER_LEERES_NAMENSFELD:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_LOESCHEN_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_LESEN_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFILE_LESEN_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFILE_ANZEIGEN_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_BAUEINHEIT_MODIFIKATION_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_FEHLER:
      case BenutzerNachrichten.BAUINFORMATIONSPROFIL_BAUSTOFF_MODIFIKATION_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_NEUANLAGE_FEHLER_LEERES_NAMENSFELD:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_NEUANLAGE_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_BESCHREIBUNG_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LESEN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_ANZEIGEN_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_VORGABEWERTE_AENDERUNG_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_BAUEINHEIT_MODIFIKATION_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_BAUSTOFF_MODIFIKATION_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_ELTERNPROFILE_AKTIVIERUNG_AN_BAUSTOFF_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LAYOUT_EXPORT_FEHLER:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_STANDORT_UNGUELTIGE_POSTLEITZAHL:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_BAUEIGENSCHAFTEN_FEHLER:
      case BenutzerNachrichten.BAUSTOFF_ODER_BAUEINHEIT_ZWEIG_BEWEGEN_ZEITUEBERSCHREITUNG_AKTION:
        this.state.typBenutzerNachricht =
          BenutzerNachrichtenTypen.FEHLERMELDUNG;
        this.state.classBenutzerNachricht = "negative";
        break;
      //--------------------------------------------------------------------------------------------------------
      // Informationen:
      case BenutzerNachrichten.WERTEEINGABE_MOEGLICH:
      case BenutzerNachrichten.WERTEEINGABE_NICHT_MOEGLICH:
      case BenutzerNachrichten.OBLIGATORISCH_AUSGELOEST:
      case BenutzerNachrichten.OBLIGATORISCH_NICHT_MOEGLICH:
      case BenutzerNachrichten.OPTIONAL_AUSGELOEST:
      case BenutzerNachrichten.OPTIONAL_NICHT_MOEGLICH:
      case BenutzerNachrichten.AKTIVIERUNG_AUSGELOEST_WERTEEINGABE_MOEGLICH:
      case BenutzerNachrichten.PFADAKTIVIERUNG_AUSGELOEST_WERTEEINGABE_MOEGLICH:
      case BenutzerNachrichten.AKTIVIERUNG_AUSGELOEST_WERTEEINGABE_NICHT_MOEGLICH:
      case BenutzerNachrichten.PFADAKTIVIERUNG_AUSGELOEST_WERTEEINGABE_NICHT_MOEGLICH:
      case BenutzerNachrichten.AKTIVIERUNG_AUSGELOEST_WURZELKNOTEN:
      case BenutzerNachrichten.AKTIVIERUNG_NICHT_MOEGLICH:
      case BenutzerNachrichten.DEAKTIVIERUNG_AUSGELOEST:
      case BenutzerNachrichten.DEAKTIVIERUNG_NICHT_MOEGLICH:
      case BenutzerNachrichten.BAUINFORMATIONEN_LESEN_KEINE_VORHANDEN:
      case BenutzerNachrichten.BAUINFORMATION_LOESCHEN_KEINE_BAUINFORMATIONEN_VORHANDEN:
      case BenutzerNachrichten.BAUINFORMATION_AENDERUNG_KEINE_BERECHTIGUNG:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_ZUM_BEWEGEN_MARKIERT:
      case BenutzerNachrichten.BAUSTOFF_ZWEIG_ZUM_BEWEGEN_MARKIERT:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_KOPIEREN_IM_GANG:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_VERSCHIEBEN_IM_GANG:
      case BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_IM_GANG:
      case BenutzerNachrichten.BAUSTOFFE_IMPORT_IM_GANG:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_KEINE_VORHANDEN:
      case BenutzerNachrichten.BROWSER_EINSTELLUNGEN:
      case BenutzerNachrichten.WAS_GIBT_ES_NEUES:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_BAUVORHABEN_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_STANDORT_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_GEBAEUDE_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_GESCHOSS_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_RAUM_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_BODENAUFBAU_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_BODENAUFBAU_NEU_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_SCHICHTAUFBAU_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_WANDAUFBAU_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_SCHICHT_ANZEIGE:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_AKTUALISIERUNG_AKTION:
      case BenutzerNachrichten.BAUINFORMATIONSPROFILE_AKTUALISIERUNG_AKTION:
      case BenutzerNachrichten.BAUSTOFFE_AKTUALISIERUNG_AKTION:
      case BenutzerNachrichten.BAUVORLAGEN_AKTUALISIERUNG_AKTION:
      case BenutzerNachrichten.BAUINFORMATIONEN_AKTUALISIERUNG_AKTION:
      case BenutzerNachrichten.BAUEIGENSCHAFTEN_AKTUALISIERUNG_AKTION:
        this.state.typBenutzerNachricht = BenutzerNachrichtenTypen.INFORMATION;
        this.state.classBenutzerNachricht = "cyan-7"; // ALT: "info"
        break;
      //----------------------------------------------------------------------------------------------------------
      // Warnungen:
      case BenutzerNachrichten.FUNKTION_NICHT_VERFUEGBAR:
      case BenutzerNachrichten.BAUSTOFF_LOESCHEN_WARNUNG_KEIN_BAUSTOFF_AUSGEWAEHLT:
      case BenutzerNachrichten.BAUSTOFF_NEUANLAGE_WARNUNG_BEZEICHNUNG_EINGEBEN:
      case BenutzerNachrichten.BAUSTOFFE_FILTERUNG_KEINE_GEFUNDEN:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_WARNUNG:
      case BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFILFORMULAR_VERZWEIGUNGSKNOTEN_WERTEEINGABE_WARNUNG:
      case BenutzerNachrichten.BAUEINHEIT_LOESCHEN_WARNUNG_KEINE_BAUEINHEIT_AUSGEWAEHLT:
      case BenutzerNachrichten.BAUEINHEIT_NEUANLAGE_WARNUNG_BEZEICHNUNG_EINGEBEN:
      case BenutzerNachrichten.BAUEINHEIT_ZUGEORDNETE_BAUSTOFFE_LADEN_WARNUNG:
      case BenutzerNachrichten.BAUEINHEIT_ANGEMELDETER_BENUTZER_ALS_AUTOR_ABGEWAEHLT_WARNUNG:
      case BenutzerNachrichten.BAUEINHEIT_ZWEIG_BEWEGEN_TIMEOUT:
      case BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BAUINFORMATION_GELOESCHT:
      case BenutzerNachrichten.BAUINFORMATION_ZURUECKSETZEN_BAUINFORMATION_GELOESCHT:
      case BenutzerNachrichten.BAUINFORMATION_ALLE_AUTOREN_ABGEWAEHLT_WARNUNG:
      case BenutzerNachrichten.BAUINFORMATION_ANGEMELDETER_BENUTZER_ALS_AUTOR_ABGEWAEHLT_WARNUNG:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_KEIN_PROFIL_AKTVIERT:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_NICHT_GEFUNDEN:
      case BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_ISTWERTE_MIT_SOLLWERTEN_INITIALISIERT:
        this.state.typBenutzerNachricht = BenutzerNachrichtenTypen.WARNUNG;
        this.state.classBenutzerNachricht = "text-white bg-orange";
        break;
      default:
        this.state.inhaltBenutzerNachricht = "Unbekannte Benutzernachricht";
        this.state.typBenutzerNachricht = BenutzerNachrichtenTypen.WARNUNG;
        this.state.classBenutzerNachricht = "text-white bg-orange";
        break;
    } // /switch

    // ALT: Anzeige mit Banner im Footer:
    // this.state.showBenutzerNachricht = true; // Das Banner anzeigen, auch wenn es vorher vom Benutzer weggeklickt wurde

    // NEU: Anzeige Benutzernachricht mit Notify Quasar Plugin - diese verschwindet von selbst nach 5 Sekunden
    // (ist konfigurierbar per timeout Prop, siehe https://quasar.dev/quasar-plugins/notify#Notify-API)

    // console.log("Vor Notify.create");
    Notify.create({
      message: this.state.inhaltBenutzerNachricht,
      color: this.state.classBenutzerNachricht,
      actions: [{ icon: "close", color: "white" }] // NEU: Action für Benutzer-Closing der Notification mit Icon "X" - diese hat keinen Handler
    });

    // Folgender Switch zum Setzen CSS-Klasse der Benutzernachrichti ist obsolet, wurde in obigen Swithc mit integriert:
    /*
    switch (this.state.typBenutzerNachricht) {
      case BenutzerNachrichtenTypen.INFORMATION:
        this.state.classBenutzerNachricht = "text-white bg-secondary";
        break;
      case BenutzerNachrichtenTypen.ERFOLGSMELDUNG:
        this.state.classBenutzerNachricht = "text-white bg-green";
        break;
      case BenutzerNachrichtenTypen.FEHLERMELDUNG:
        this.state.classBenutzerNachricht = "text-white bg-red";
        break;
      case BenutzerNachrichtenTypen.WARNUNG:
        this.state.classBenutzerNachricht = "text-black bg-yellow";
        break;
      default:
        this.state.classBenutzerNachricht = "text-white bg-red";
        break;
    }
    */
  } // showBenutzerNachricht
}; // export
