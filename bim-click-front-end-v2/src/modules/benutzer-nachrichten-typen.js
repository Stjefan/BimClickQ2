// Node Module benutzer-nachrichten-typen.js
// Enum-Definitionen für Benutzernachrichtentypen - werden für Banner Messages im Footer verwendet
// Verwendung in konsumierenden Komponenten mit:
// import BenutzerNachrichtenTypen from "./benutzer-nachrichten-typen.js";
// ACHTUNG: Dabei NICHT require verwenden, sont undefined Fehler beim Zugriff:
// Also NICHT: const BenutzerNachrichtenTypen = require("./benutzer-nachrichten-typen.js");
// Zugriff z.B. mit:
// BenutzerNachrichtenTypen.INFORMATION,
// Also NICHT: this.BenutzerNachrichtenTypen.INFORMATION,
//----------------------------------------------------------------------------------------------------------------
// makeEnum Helper Funktion, siehe https://stackoverflow.com/questions/44447847/enums-in-javascript-with-es6:
function makeEnum(arr) {
  let obj = {};
  for (let val of arr) {
    obj[val] = Symbol(val);
  }
  return Object.freeze(obj);
}
// Zusammen mit: const BenutzerNachrichtenTypen = this.makeEnum (["INFORMATION", "ERFOLGSMELDUNG", "WARNUNG", "FEHLERMELDUNG"]);
// Führte ohne die Array-Klammern beim Aufruf zu Fehlermeldung Cannot read property makeEnum of undefined!!!
// ACHTUNG: Bei Verwendung von Symbol in der makeEnum-Funktion sind wohl keine Collisions bei gleichen String-Werten möglich, aber dafür werden
// die Werte nicht als lesbare/anzeigbare Strings gespeichert, sondern müssen erst rückkonvertiert werden von Symbol in passende Strings wie
// man bei Tests für Umstellung BaumKnotenTypen auf Symbol sieht.
// Daher sind auch die enums für VerzweigungsTypen, BaumKnotenTypen, Baustoffe bisher ohne Symbol implementiert!!!
// Siehe https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/
// Es kamen ursprünglich auch ohne makeEnum Fehler "Cannot assign to read only property 'exports' of....""
// Letztere gelöst durch Umstellung des Export Statements unten

//----------------------------------------------------------------------------------------------------------------
// Erzeuge Enums für BenutzerNachrichtTypen - vorläufig nicht verwendet. ACHTUNG: Array-Klammern notwendig!
/*
const BenutzerNachrichtenTypen = makeEnum([
  "INFORMATION",
  "ERFOLGSMELDUNG",
  "WARNUNG",
  "FEHLERMELDUNG"
]);
*/

// Variante ohne makeEnum und Symbol:
const BenutzerNachrichtenTypen = Object.freeze({
  INFORMATION: "Information",
  ERFOLGSMELDUNG: "Erfolgsmeldung",
  WARNUNG: "Warnung",
  FEHLERMELDUNG: "Fehlermeldung",
  AKTION: "Aktion"
});

// Exportiere die Benutzernachrichten als statische Klassen zur Verwendung durch andere
// Verwendung in konsumierenden Komponenten mit:
// import BenutzerNachrichtenTypen from "./BenutzerNachrichtenTypen.js";
export default BenutzerNachrichtenTypen;
// ACHTUNG: Hier NICHT: module.exports = BenutzerNachrichtenTypen;
// Sonst Fehler: "TypeError: Cannot assign to read only property 'exports' of object '#<Object>'"
// Siehe https://stackoverflow.com/questions/42449999/webpack-import-module-exports-in-the-same-module-caused-error
