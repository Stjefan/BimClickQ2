// functions-baustoff-estrich-baueigenschafts-profil-formular.js
// JS-Modul, das testweise computed Properties und Methods als Functions exportiert
// Dieses JS-Modul ist ein Pendant zum Layout für das Profil "Baustoff > Estrich" (layout-baustoff-estrich-baueigenschafts-profil-formular.js)
// Die Verarbeitung dieser computed Properties/Methods erfolgt in layout-gesteuertes-generisches-baueigenschafts-profil-formular.js
//********************************************************************************************************************************** */
// HINwEIS: Enthält aktuell nur Testfunktionen, um anhand von Profil "Baustoff > Estrich" profilspezifische
//          Methoden zu testen, die dann in mounted() von layout-gesteuertes-generisches-baueigenschafts-profil-formular.js aus dem
//          Modul hier geladen werden. Siehe die zugehörigen Props im Template-Teil von
//          layout-baustoff-estrich-baueigenschafts-profil-formular.js. Diese werden allerdings nur ausgewertet, wenn in
//          layout-gesteuertes-generisches-baueigenschafts-profil-formular.js eine spezielle Test Section im Template per v-if
//          eingeschaltet wird, die die beteiligten Felder anzeigt (ca. Zeile 2648 dort)!
//          Für andere Profile wurden bisher keine solchen Methoden in einem extra Modul definiert. Der Grund dafür ist, dass alle benötigten Methoden als generische, profilübergreifende
//          Methoden inlayout-gesteuertes-generisches-baueigenschafts-profil-formular.js implementiert werden konnten, mittels
//          initializeIstWerteMitSollWerten(), generalClickMethod(), generalComparisonFunction() dort!
//********************************************************************************************************************************** */
import LayoutBaustoffEstrichBaueigenschaftsProfilFormular from "./layout-baustoff-estrich-baueigenschafts-profil-formular";
// Das Layout File für dieses Profil - wird benötigt z.B. zum Zugriff auf den Index von Baueigenschaften im Profil Model
const FunctionsBaustoffEstrichBaueigenschaftsProfilFormular = function(self) {
  // Container-Objekt für die computed Properties für dieses Layout
  // Problem: Da computed-Funktionen keine Parameter haben dürfen, können sie auch nicht self für Zugriff auf this als Parameter haben!!!
  // Lösung: Es muss diesem JS-Modul this als self übergeben werden, ähnlich wie das Objekt io im BIM.click Backend
  var that = {}; // Dummy-Objekt mit dem die folgenden Funktionen nach außen exposed werden - Vorlage sind die Controller-Modules im Backend
  const _self = self; // Laut Stefan nicht unbedingt notwendig, es könnte auch auf self = this direkt gearbeitet werden
  var layoutBaustoffEstrichBaueigenschaftsProfilFormular = LayoutBaustoffEstrichBaueigenschaftsProfilFormular; // Das Layout für dieses Profil in Variable
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  // Hilfsfunktion findeIndexVonBaueigenschaft(): Hier überflüssig - kann per _self aus der dieses Modul inkludierenden Vue-Komponente aufgerufen werden!!!
  /*
  that.findeIndexVonBaueigenschaft = function(
    // Interne Hilfsfunktion zum Zugriff auf Profil Model per Index, selber Code wie in allen Profilformularen!
    // ACHTUNG: Ohne that. scheitert der Aufruf der Funktion unten schon beim Compile!
    baueigenschaftsBezeichnung // Parameter: String
  ) {
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Generische Methode mit Parameter, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
    // Die Bezeichnung der gesuchten Baueigenschaft wird per Parameter übergeben
    // ACHTUNG: Ist KEINE computed-Funktion, kann daher Parameter haben
    //          Kann alternativ zu den computed-Funktionen verwendet werden, die statt eines Parameters die Baueigenschaftsbezeichnung aus dem Funktionsnamen ableiten!
    //          Allerdings muss dann im Template die jeweilige Baueigenschaftsbezeichnung der Funktion hier übergeben werden, was noch
    //          fehleranfälliger ist als der Aufruf der jeweiligen computed-Funktionen mit der Baueigenschaftsbezeichung im Funktionsnamen - daher
    //          im Template bislang die Variante mit den computed-Funktionen beibehalten - diese brauchen dafür viele verschieden benannte, eigentlich
    //          identische computed-Funktionen!
    // Suche Index der Bezeichnung des Aufzählungswerts im Array:
    // console.log("In findeIndexVonBaueigenschaft() - baueigenschaftsBezeichnung: ", baueigenschaftsBezeichnung);
    let index = _self.profilModelAusgewaehlterKnoten.findIndex(
      item =>
        item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
        baueigenschaftsBezeichnung
    );
    // console.log("In findeIndexVonBaueigenschaft() - index: ", index);
    if (index === -1) {
      console.log(
        "❌❌❌❌❌❌ FEHLER: Index für Baueigenschaft",
        baueigenschaftsBezeichnung,
        "im Array profilModelAusgewaehlterKnoten nicht gefunden!"
      );
      return index;
    }
  };
  */
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.testComputedProperty = function() {
    // Eine erste Computed Property für Tests - ist hier als Funktion definiert
    // Test 1 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    //================================================================================================================
    // Funktioniert zwar mit einigen im internen Design dokumentierten Vorkehrungen.
    // ABER: Da die computed Property mangels Parameter de facto nicht weiss, an welcher Baueigenschaft sie arbeitet,
    //       ist sie nicht wirklich zu gebrauchen. Versucht man, sie mit einer Property an einer Baueigenschaft
    //       im Layout zu verknüpfen, müsste man für jede Baueigenschaft eine eigene Property definieren und eine
    //       auf diese Property zugeschnittene eigene computed Property - das wäre ein Nightmare bzgl. Maintenance!
    //       Man müsste dann im Template die computed Property ermitteln und dann am :value die Property
    //       abfragen und dann per tenary ?-Operator die darauf zugeschnittene computed Property angeben - und dies
    //       per Verschachtelung dieser Abfragen  für alle Baueigenschaften, die solche computed Properties habn
    // Bessere Lösung: Methodenaufruf mit Parameter für die beteiligten Baueigenschaft(en) -diese Methoden
    //                 ebenfalls hier definieren in functions-baustoff-estrich-baueigenschafts-profil-formular.js
    //================================================================================================================
    console.log("In testComputedProperty()");
    console.log("_self: ", _self);
    console.log(
      "profilModelAusgewaehlterKnoten: , ",
      _self.profilModelAusgewaehlterKnoten
    );
    // Den folgenden Test der Aktualisierung einer anderen BEg (Zugriff per this/self auf das Profil Model) wieder disabled, um das Profilformular nicht zu sabotieren:
    //
    let result = _self.$set(
      // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
      _self.profilModelAusgewaehlterKnoten[
        layoutBaustoffEstrichBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ],
      "aufzaehlungsWert",
      ["CT: Zementestrich"] // Diese BEg mit diesem Testwert aktualisieren
    );
    console.log("Ergebnis von testComputedProperty()): ", result);
    return result;
    //
    // Als Testwert den aktuellen Wert der ersten BEg im Profil Model returnen:
    // Dieser kann reaktiv geändert werden!!!
    /*
  return _self.profilModelAusgewaehlterKnoten[
      layoutBaustoffEstrichBaueigenschaftsProfilFormular[1].rubrikenInTab[1]
        .baueigenschaftenInRubrik[1]
        .indexInProfilModelAusgewaehlterKnoten
  ].aufzaehlungsWert // computed Property muss immer Wert returnen
  */
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.testSetMethod = function(aufzaehlungsWert, baueigenschaft) {
    // Eine erste Methode für Tests - ist hier als Funktion mit Parametern definiert
    // Test 2 und 3 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    // Parameter: aufzaehlungsWert einer baueigenschaft aus dem Profil Model
    // Returned diesen aufzaehlungswert (der aus einer beliebigen Baueigenschaft stammen kann im Sinne einer Initialisierung
    // einer anderen, durch baueigenschaft bestimmten Baueigenschaft, der per :value="testSetMethod(baueigenschaft)" angezeigt werden kann
    // In einer künftigen erweiterten Version könnte der Wert auch aus mehreren anderen Baueigenschaften über weitere Parameter berechnet werden!
    // Siehe subtractNiveaus() in baueinheit-raum-baueigenschafts-profil-formular.vue
    // Aktualisiert per $set auch gleich die per Parameter baueigenschaft spezifizierte BBaueigenschaft mit em Wert
    // Da man hier auch Zugriff auf das Layout hat, könnte diese Funktion auch generisch geschrieben werden und abhängig von
    // Properties am Layout verschiedene Dinge tun. Das Layout für die Baueigenschaft könnte auch als zusätzlicher Parameter übergeben
    // werden oder mit der Hilfsfunktion _self.layoutBaueigenschaft() aus layout-gesteuertes-generisches-baueigenchafts-profil-formular.vue
    // hier ermittelt werden für die übergebene baueigenschaft
    console.log("In testSetMethod()");
    // console.log("_self: ", _self)
    // console.log("profilModelAusgewaehlterKnoten: , ", _self.profilModelAusgewaehlterKnoten)
    console.log("Parameter aufzaehlungsWert: ", aufzaehlungsWert);
    console.log("Parameter baueigenschaft: ", baueigenschaft);
    // Den folgenden Test der Aktualisierung einer anderen BEg (Zugriff per this/self auf das Profil Model) wieder disabled, um das Profilformular nicht zu sabotieren:
    //
    let result = _self.$set(
      // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
      baueigenschaft, // Diese BEg mit diesem Testwert aktualisieren
      "aufzaehlungsWert",
      aufzaehlungsWert
    );
    //
    return result;
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.sollIstWertePaarSetMethod = function(baueigenschaft1, baueigenschaft2) {
    // Eine weitere Methode für Tests - ist hier als Funktion mit Parametern definiert
    // Test 11 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    // Parameter: Zwei Baueigenschafen aus dem Profil Model
    // - baueigenschaft1: Sollwert
    // - baueigenschaft2: Istwert
    // Aktualisiert die zweite BEg, FALLS DIESE NULL ODER LEER IST, mit dem Wert der ersten.
    // Einstweilen nur für Aufzählungwerte (TODO: Wertetyp abfragen und für weitere Wertetypen verallgemeinern)
    // ACHTUNG: Diese Methode returned im Gegensatz zur alternativen Methode testGeneralInitializeMethod() diesen Wert (der aus baueigenschaft1 stammt im Sinne einer Initialisierung
    // von baueigenschaft2 aus baueigenschaft1) zur Anzeige des Werts im Feld für baueigenschaft2 per :value="testGeneralSetMethod(baueigenschaft)"
    // In einer künftigen erweiterten Version könnte der Wert auch aus mehreren anderen Baueigenschaften über weitere Parameter berechnet werden!
    // Siehe subtractNiveaus() in baueinheit-raum-baueigenschafts-profil-formular.vue
    // Aktualisiert per $set auch gleich die per Parameter baueigenschaft2 spezifizierte Baueigenschaft mit dem Wert
    // Da man hier auch Zugriff auf das Layout hat, könnte diese Funktion auch generisch geschrieben werden und abhängig von
    // Properties am Layout verschiedene Dinge tun. Das Layout für die Baueigenschaften könnte auch als zusätzlicher Parameter übergeben
    // werden oder mit der Hilfsfunktion _self.layoutBaueigenschaft() aus layout-gesteuertes-generisches-baueigenchafts-profil-formular.vue
    // hier ermittelt werden für die übergebene baueigenschaft
    console.log("In sollIstWertePaarSetMethod()");
    // console.log("_self: ", _self)
    // console.log("profilModelAusgewaehlterKnoten: , ", _self.profilModelAusgewaehlterKnoten)
    console.log("Parameter baueigenschaft1: ", baueigenschaft1);
    console.log("Parameter baueigenschaft2: ", baueigenschaft2);
    if (
      baueigenschaft2.aufzaehlungsWert != null &&
      baueigenschaft2.aufzaehlungsWert.length !== 0
    ) {
      return baueigenschaft2.aufzaehlungsWert;
    }
    // ACHTUNG: In diesem Fall muss unbedingt baueigenschaft2.aufzaehlungsWert (unverändert) RETURNED werden, sonst funktioniert es nicht!!!
    // TODO XXXXXX: Hier vollständige null-Prüfung für Aufzählungswerte (können Arrays oder Strings sein!), hier alle Wertetypen unterstützen
    //
    let result = _self.$set(
      // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
      baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
      "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen
      baueigenschaft1.aufzaehlungsWert
    );
    //
    console.log("result: ", result);
    return result;
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.testGeneralSetMethod = function(baueigenschaft1, baueigenschaft2) {
    // Eine weitere Methode für Tests - ist hier als Funktion mit Parametern definiert
    // Test 4 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    // Parameter: Zwei Baueigenschafen aus dem Profil Model
    // Aktualisiert die zweite BEg mit dem Wert der ersten. Einstweilen nur für Aufzählungwerte (TODO: Wertetyp abfragen und für weitere
    // Wertetypen verallgemeinern)
    // Returned diesen Wert (der aus baueigenschaft1 stammt im Sinne einer Initialisierung
    // von baueigenschaft2 aus baueigenschaft1) zur Anzeige des Werts im Feld für baueigenschaft2 per :value="testGeneralSetMethod(baueigenschaft)"
    // In einer künftigen erweiterten Version könnte der Wert auch aus mehreren anderen Baueigenschaften über weitere Parameter berechnet werden!
    // Siehe subtractNiveaus() in baueinheit-raum-baueigenschafts-profil-formular.vue
    // Aktualisiert per $set auch gleich die per Parameter baueigenschaft2 spezifizierte Baueigenschaft mit dem Wert
    // Da man hier auch Zugriff auf das Layout hat, könnte diese Funktion auch generisch geschrieben werden und abhängig von
    // Properties am Layout verschiedene Dinge tun. Das Layout für die Baueigenschaften könnte auch als zusätzlicher Parameter übergeben
    // werden oder mit der Hilfsfunktion _self.layoutBaueigenschaft() aus layout-gesteuertes-generisches-baueigenchafts-profil-formular.vue
    // hier ermittelt werden für die übergebene baueigenschaft
    console.log("In testGeneralSetMethod()");
    // console.log("_self: ", _self)
    // console.log("profilModelAusgewaehlterKnoten: , ", _self.profilModelAusgewaehlterKnoten)
    console.log("Parameter baueigenschaft1: ", baueigenschaft1);
    console.log("Parameter baueigenschaft2: ", baueigenschaft2);
    //
    let result = _self.$set(
      // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
      baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
      "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen
      baueigenschaft1.aufzaehlungsWert
    );
    //
    return result;
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.testSpecificSetMethod = function(baueigenschaft) {
    // Eine weitere, spezifische Methode für Tests - ist hier als Funktion mit Parameter definiert
    // Test 5 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    // Parameter: Baueigenschaft aus dem Profil Model
    // Diese könnte als Methode verwendet werden, mit der Baueigenschaften mit Werten aus anderen Baueigenschaften
    // initialisiert werden können (Z.B. als Vorgabewerte)
    // Aktualisiert diese Baueigenschaft abhängig von ihrem Wertetyp per $set mit einem Wert aus einer anderen Baueigenschaft und
    // returned diesen Wert, damit er per :value="testSpecificSetMethod" in einem readonly-Feld für die Baueigenschaft angezeigt werden kann
    // Hier könnte zusätzlich abgefragt werden, ob die zu aktualisierende Baueigenschaft null ist, andernfalls würde man
    // den bereits vorhandenen Wert returnen, d.h. diesen nicht verändern
    // In einer künftigen erweiterten Version könnte der Wert auch aus mehreren anderen Baueigenschaften über weitere Parameter berechnet werden!
    // Siehe subtractNiveaus() in baueinheit-raum-baueigenschafts-profil-formular.vue
    // Da man hier auch Zugriff auf das Layout hat, könnte diese Funktion auch generisch geschrieben werden und abhängig von
    // Properties am Layout verschiedene Dinge tun. Das Layout für die Baueigenschaft könnte auch als zusätzlicher Parameter übergeben
    // werden oder mit der Hilfsfunktion _self.layoutBaueigenschaft() aus layout-gesteuertes-generisches-baueigenchafts-profil-formular.vue
    // hier ermittelt werden für die übergebene baueigenschaft
    console.log("In testSpecificSetMethod()");
    // console.log("_self: ", _self)
    // console.log("profilModelAusgewaehlterKnoten: , ", _self.profilModelAusgewaehlterKnoten)
    console.log("Parameter baueigenschaft: ", baueigenschaft);
    //
    if (
      baueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
      "Baustoff > Estrich > Druckfestigkeitsklasse"
    ) {
      // profilModelAusgewaehlterKnoten[2], im Layout: 4
      let andereBaueigenschaft = _self.profilModelAusgewaehlterKnoten[5]; // Oberflächenhärteklasse, im Layout: 5
      // Diese andere BEg, mit deren Wert baueigenschaft initialisiert werden soll, kann,
      // abhängig von der Bezeichnung der übergebenen Baueigenschaft beliebig bestimmt werden,
      // z.B. um bestimmte Istwerte anfangs mit ihren Sollwerten zu initialisieren, etc.
      let result = _self.$set(
        // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
        baueigenschaft, // Diese BEg mit diesem Testwert aktualisieren
        "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen
        andereBaueigenschaft.aufzaehlungsWert
      );
      //
      return result;
    } else {
      console.log("Do nothing");
    }
    // Sonst nichts returnen!!!
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.testSpecificReadonlyMethod = function(baueigenschaft) {
    // Spezifische Methode für Tests des Setzens der Prop :readonly an Eingabefeld - ist hier als Funktion mit Parameter definiert
    // Test 8 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    // Parameter: Baueigenschaft aus dem Profil Model
    // Diese Testversion benutzt als steuernden Aufzählungswert hart kodiert die Baueigenschaft "Baustoff > Estrich > Bindemittelart"
    // Diese könnte als Methode verwendet werden, mit der Baueigenschaften abhängig von Werten aus anderen Baueigenschaften (z.B. Aufzählungswerte)
    // auf readonly gesetzt werden können
    // Returned true oder false, damit per :readonly="testSpecificSetMethod" ggf. das Eingabefeld auf readonly gesetzt werden kann
    // In einer künftigen erweiterten Version könnte der Wert auch aus mehreren anderen Baueigenschaften über weitere Parameter berechnet werden!
    // Da man hier auch Zugriff auf das Layout hat, könnte diese Funktion auch generisch geschrieben werden und abhängig von
    // Properties am Layout verschiedene Dinge tun. Das Layout für die Baueigenschaft könnte auch als zusätzlicher Parameter übergeben
    // werden oder mit der Hilfsfunktion _self.layoutBaueigenschaft() aus layout-gesteuertes-generisches-baueigenchafts-profil-formular.vue
    // hier ermittelt werden für die übergebene baueigenschaft
    console.log("In testSpecificReadonlyMethod()");
    // console.log("_self: ", _self)
    // console.log("profilModelAusgewaehlterKnoten: , ", _self.profilModelAusgewaehlterKnoten)
    console.log("Parameter baueigenschaft: ", baueigenschaft);
    //
    if (
      baueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
      "Baustoff > Estrich > Einbauart"
    ) {
      // profilModelAusgewaehlterKnoten[3], im Layout: 1
      let andereBaueigenschaft = _self.profilModelAusgewaehlterKnoten[1]; // Bindemittelart, im Layout: 0
      // Diese andere BEg, kann abhängig von der Bezeichnung der übergebenen Baueigenschaft, beliebig bestimmt werden,
      // z.B. um abhängig vom Wert eines Aufzählungswerts true oder false zu returnen für :readonly an übergebener Baueigenschaft
      if (andereBaueigenschaft.aufzaehlungsWert.includes("CT: Zementestrich")) {
        // TODO XXXXXX: Hier alle Wertetypen unterstützen
        return true; // Eingabefeld für übergebene Baueigenschaft auf readonly schalten
      } else {
        return false; // Eingabefeld für übergebene Baueigenschaft nicht auf readonly schalten
      }
    } else return false; // Aktuell readonly nur für diese eine Test-Baueigenschaft unterstüzt!
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.testGeneralReadonlyMethod = function(
    baueigenschaftsBezeichnung1,
    aufzaehlungsWert1
  ) {
    // Generelle Methode für Tests des Setzens der Prop :readonly an Eingabefeld - ist hier als Boolean-Funktion mit Parametern definiert
    // Test 9 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    // Parameter:
    // - baueigenschaftsBezeichnung1 - die Bezeichnung der Baueigenschaft, die den steuernden Aufzählungswert enthält
    // - aufzaehlungsWert1 - der Wert des steuernden Aufzählungswerts aus dem Profil Model
    // Returned true oder false für Steuerung :readonly an einer Baueigenschaft
    // Diese könnte als universelle Methode verwendet werden, mit der Baueigenschaften abhängig von Werten aus anderen Baueigenschaften (z.B. Aufzählungswerte)
    // auf readonly gesetzt werden können
    // Returned true oder false, damit per :readonly="testSpecificSetMethod" ggf. das Eingabefeld auf readonly gesetzt werden kann
    // In einer künftigen erweiterten Version könnte der Wert auch aus mehreren anderen Baueigenschaften über weitere Parameter berechnet werden!
    // Da man hier auch Zugriff auf das Layout hat, könnte diese Funktion auch generisch geschrieben werden und abhängig von
    // Properties am Layout verschiedene Dinge tun. Das Layout für die Baueigenschaft könnte auch als zusätzlicher Parameter übergeben
    // werden oder mit der Hilfsfunktion _self.layoutBaueigenschaft() aus layout-gesteuertes-generisches-baueigenchafts-profil-formular.vue
    // hier ermittelt werden für die übergebene baueigenschaft
    console.log("In testGeneralReadonlyMethod()");
    // console.log("_self: ", _self)
    // console.log("profilModelAusgewaehlterKnoten: , ", _self.profilModelAusgewaehlterKnoten)
    console.log(
      "Parameter baueigenschaftsBezeichnung1: ",
      baueigenschaftsBezeichnung1
    );
    console.log("Parameter aufzaehlungsWert1: ", aufzaehlungsWert1);
    // console.log("Parameter baueigenschaft2: ", baueigenschaft2);
    //
    let andereBaueigenschaft =
      _self.profilModelAusgewaehlterKnoten[
        _self.findeIndexVonBaueigenschaft(baueigenschaftsBezeichnung1)
      ];
    // Andere BEg, deren Aufzaehlungswert das :readonly an baueigenschaft2 steuern soll, mit deren Bezeichnung im Profil Model finden
    if (andereBaueigenschaft.aufzaehlungsWert.includes(aufzaehlungsWert1)) {
      // TODO XXXXXX: Hier alle Wertetypen unterstützen
      return true; // Eingabefeld für übergebene Baueigenschaft auf readonly schalten
    } else {
      return false; // Eingabefeld für übergebene Baueigenschaft nicht auf readonly schalten
    }
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  that.testGeneralInitializeMethod = function(
    baueigenschaftsBezeichnung1,
    baueigenschaft2
  ) {
    // Generelle Methode für Initialisierung von Eingabefeldern - ist hier als Funktion mit Parametern definiert
    // Test 10 in layoutgesteuertes-generisches-baueigenschafts-profil-formular.vue
    // Parameter:
    // - baueigenschaftsBezeichnung1 aus dem Layout - die Bezeichnung der Baueigenschaft, mit deren Wert baueigenschaft 2 zu initialisieren ist, falls nicht null (z.B. Sollwertfeld)
    // - baueigenschaft2 aus dem Profil Model - die zu initialisierende Baueigenschaft (z.B. Istwertfeld)
    // Diese könnte als universelle Methode verwendet werden, mit der Baueigenschaften mit Werten aus anderen Baueigenschaften initialisiert werden können
    // Könnte
    // Da man hier auch Zugriff auf das Layout hat, könnte diese Funktion auch generisch geschrieben werden und abhängig von
    // Properties am Layout verschiedene Dinge tun. Das Layout für die Baueigenschaft könnte auch als zusätzlicher Parameter übergeben
    // werden oder mit der Hilfsfunktion _self.layoutBaueigenschaft() aus layout-gesteuertes-generisches-baueigenchafts-profil-formular.vue
    // hier ermittelt werden für die übergebene baueigenschaft
    console.log("In testGeneralInitializeMethod()");
    // console.log("_self: ", _self)
    // console.log("profilModelAusgewaehlterKnoten: , ", _self.profilModelAusgewaehlterKnoten)
    console.log(
      "Parameter baueigenschaftsBezeichnung1: ",
      baueigenschaftsBezeichnung1
    );
    console.log("Parameter baueigenschaft2: ", baueigenschaft2); // Biegezugfestigkeitsklasse
    //
    if (
      baueigenschaft2.aufzaehlungsWert != null &&
      baueigenschaft2.aufzaehlungsWert.length !== 0
    ) {
      return;
    } // TODO XXXXXX: Hier vollständige null-Prüfung für Aufzählungswerte (können Arrays oder Strings sein!), hier alle Wertetypen unterstützen
    let andereBaueigenschaft =
      _self.profilModelAusgewaehlterKnoten[
        _self.findeIndexVonBaueigenschaft(baueigenschaftsBezeichnung1)
      ]; //"
    console.log("andereBaueigenschaft: ", andereBaueigenschaft); // Bindemittelart
    // Diese andere BEg, mit deren Wert baueigenschaft2 initialisiert werden soll, wird hier
    // aus der übergebenen Bezeichnung der Baueigenschaft bestimmt
    // TODO XXXXXX: Index dieser BEg ebenfalls im Layout speichern und übergeben statt der Bezeichnung, eventuell auch per map?
    //
    // ACHTUNG: Hier keine Zuweisung per $set, da der andere Aufzählunswert ein Array ist!!!
    let result = _self.$set(
      // baueigenschaft2 updaten im Profil Model, Vue $set returns the set value
      baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
      "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen, eventuell null-Prüfung!
      andereBaueigenschaft.aufzaehlungsWert
    );
    console.log("result: ", result);
    console.log(
      "baueigenschaft2.aufzaehlungsWert nach $set: ",
      baueigenschaft2.aufzaehlungsWert
    );
  };
  //-------------------------------------------------------------------------------------------------------------------------
  return that; // Exposed alle obigen Funktionen/computed Properties nach außen
};
export default FunctionsBaustoffEstrichBaueigenschaftsProfilFormular;
// ACHTUNG: Hier statt module.exports = FunctionsBaustoffEstrichBaueigenschaftsProfilFormular;
// Sonst Compile-Fehler!!!
